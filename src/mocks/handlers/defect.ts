import { http, HttpResponse } from 'msw';
import { v4 as uuid } from 'uuid';
import { defects } from '../data/defects';

function successResponse<T>(data: T) {
  return {
    code: 0,
    message: 'success',
    data,
    timestamp: Date.now(),
    requestId: uuid(),
  };
}

function errorResponse(message: string, code = 1) {
  return {
    code,
    message,
    data: null,
    timestamp: Date.now(),
    requestId: uuid(),
  };
}

function paginatedResponse<T>(list: T[], total: number, page: number, pageSize: number) {
  return successResponse({
    list,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}

let defectList = [...defects];
let nextDefectId = defectList.length + 1;

// Valid status transitions
const statusTransitions: Record<string, string[]> = {
  pending: ['in_progress'],
  in_progress: ['pending_verification'],
  pending_verification: ['verified', 'in_progress'],
  verified: ['closed'],
  closed: [],
};

export const defectHandlers = [
  // GET /api/v1/ic-defect/defects
  http.get('/api/v1/ic-defect/defects', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);
    const keyword = url.searchParams.get('keyword') || '';
    const severity = url.searchParams.get('severity') || '';
    const remediationStatus = url.searchParams.get('remediationStatus') || '';
    const sourceType = url.searchParams.get('sourceType') || '';
    const assignedTo = url.searchParams.get('assignedTo') || '';

    let filtered = defectList;
    if (keyword) {
      filtered = filtered.filter(
        (d) =>
          d.defectName.includes(keyword) || d.defectCode.includes(keyword) || d.description.includes(keyword),
      );
    }
    if (severity) {
      filtered = filtered.filter((d) => d.severity === severity);
    }
    if (remediationStatus) {
      filtered = filtered.filter((d) => d.remediationStatus === remediationStatus);
    }
    if (sourceType) {
      filtered = filtered.filter((d) => d.sourceType === sourceType);
    }
    if (assignedTo) {
      filtered = filtered.filter((d) => d.assignedTo === assignedTo);
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return HttpResponse.json(paginatedResponse(paged, total, page, pageSize));
  }),

  // GET /api/v1/ic-defect/defects/:id
  http.get('/api/v1/ic-defect/defects/:id', async ({ params }) => {
    const { id } = params;
    const defect = defectList.find((d) => d.id === id);

    if (!defect) {
      return HttpResponse.json(errorResponse('缺陷不存在'), { status: 404 });
    }

    return HttpResponse.json(successResponse(defect));
  }),

  // POST /api/v1/ic-defect/defects
  http.post('/api/v1/ic-defect/defects', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    if (!body.defectName) {
      return HttpResponse.json(errorResponse('缺陷名称不能为空'), { status: 400 });
    }

    const now = new Date().toISOString();
    const newDefect = {
      id: `def-${String(nextDefectId++).padStart(3, '0')}`,
      defectCode: `DEF-${new Date().getFullYear()}-${String(nextDefectId - 1).padStart(3, '0')}`,
      defectName: body.defectName as string,
      description: (body.description as string) || '',
      severity: (body.severity as string) || 'minor',
      deficiencyType: (body.deficiencyType as string) || 'execution_deficiency',
      deficiencyCategory: (body.deficiencyCategory as string) || 'control_insufficient',
      sourceType: (body.sourceType as string) || 'evaluation',
      sourceId: (body.sourceId as string) || '',
      processId: (body.processId as string) || '',
      controlId: (body.controlId as string) || '',
      riskId: (body.riskId as string) || '',
      remediationStatus: 'pending',
      remediationPlan: (body.remediationPlan as string) || '',
      assignedTo: (body.assignedTo as string) || '',
      dueDate: (body.dueDate as string) || '',
      closedDate: '',
      isOverdue: false,
      rootCause: (body.rootCause as string) || '',
      tasks: [],
      createdAt: now,
      updatedAt: now,
    };

    defectList.push(newDefect);

    return HttpResponse.json(successResponse(newDefect), { status: 201 });
  }),

  // PUT /api/v1/ic-defect/defects/:id
  http.put('/api/v1/ic-defect/defects/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Record<string, unknown>;

    const index = defectList.findIndex((d) => d.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('缺陷不存在'), { status: 404 });
    }

    defectList[index] = {
      ...defectList[index],
      ...body,
      id: defectList[index].id,
      defectCode: defectList[index].defectCode,
      createdAt: defectList[index].createdAt,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(successResponse(defectList[index]));
  }),

  // DELETE /api/v1/ic-defect/defects/:id
  http.delete('/api/v1/ic-defect/defects/:id', async ({ params }) => {
    const { id } = params;

    const index = defectList.findIndex((d) => d.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('缺陷不存在'), { status: 404 });
    }

    defectList.splice(index, 1);

    return HttpResponse.json(successResponse(null));
  }),

  // POST /api/v1/ic-defect/defects/:id/transition
  http.post('/api/v1/ic-defect/defects/:id/transition', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as { targetStatus?: string; comment?: string };

    const index = defectList.findIndex((d) => d.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('缺陷不存在'), { status: 404 });
    }

    const currentStatus = defectList[index].remediationStatus;
    const targetStatus = body.targetStatus;

    if (!targetStatus) {
      return HttpResponse.json(errorResponse('目标状态不能为空'), { status: 400 });
    }

    const allowedTransitions = statusTransitions[currentStatus] || [];
    if (!allowedTransitions.includes(targetStatus)) {
      return HttpResponse.json(
        errorResponse(`不允许从 ${currentStatus} 转换到 ${targetStatus}`),
        { status: 400 },
      );
    }

    const now = new Date().toISOString();
    defectList[index].remediationStatus = targetStatus;
    defectList[index].updatedAt = now;

    if (targetStatus === 'closed') {
      defectList[index].closedDate = now;
    }

    return HttpResponse.json(successResponse(defectList[index]));
  }),

  // ========== Defect Tasks ==========

  // GET /api/v1/ic-defect/defects/:id/tasks
  http.get('/api/v1/ic-defect/defects/:id/tasks', async ({ params }) => {
    const { id } = params;
    const defect = defectList.find((d) => d.id === id);

    if (!defect) {
      return HttpResponse.json(errorResponse('缺陷不存在'), { status: 404 });
    }

    return HttpResponse.json(successResponse(defect.tasks));
  }),

  // POST /api/v1/ic-defect/defects/:id/tasks
  http.post('/api/v1/ic-defect/defects/:id/tasks', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Record<string, unknown>;

    const index = defectList.findIndex((d) => d.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('缺陷不存在'), { status: 404 });
    }

    const newTask = {
      id: `task-${uuid().slice(0, 8)}`,
      taskName: (body.taskName as string) || '',
      assignee: (body.assignee as string) || '',
      priority: (body.priority as string) || 'medium',
      status: 'pending',
      dueDate: (body.dueDate as string) || '',
    };

    defectList[index].tasks.push(newTask);
    defectList[index].updatedAt = new Date().toISOString();

    return HttpResponse.json(successResponse(newTask), { status: 201 });
  }),

  // PUT /api/v1/ic-defect/defects/:id/tasks/:taskId
  http.put('/api/v1/ic-defect/defects/:id/tasks/:taskId', async ({ params, request }) => {
    const { id, taskId } = params;
    const body = (await request.json()) as Record<string, unknown>;

    const defectIndex = defectList.findIndex((d) => d.id === id);
    if (defectIndex === -1) {
      return HttpResponse.json(errorResponse('缺陷不存在'), { status: 404 });
    }

    const taskIndex = defectList[defectIndex].tasks.findIndex(
      (t: Record<string, unknown>) => t.id === taskId,
    );
    if (taskIndex === -1) {
      return HttpResponse.json(errorResponse('任务不存在'), { status: 404 });
    }

    defectList[defectIndex].tasks[taskIndex] = {
      ...defectList[defectIndex].tasks[taskIndex],
      ...body,
      id: defectList[defectIndex].tasks[taskIndex].id,
    };
    defectList[defectIndex].updatedAt = new Date().toISOString();

    return HttpResponse.json(successResponse(defectList[defectIndex].tasks[taskIndex]));
  }),
];
