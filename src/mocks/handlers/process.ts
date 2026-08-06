import { http, HttpResponse } from 'msw';
import { v4 as uuid } from 'uuid';
import { seedProcesses } from '../data/processes';

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

let processes = [...seedProcesses];
let nextProcessId = processes.length + 1;

function generateProcessCode(parentId: string): string {
  const parent = processes.find((p) => p.id === parentId);
  if (!parent || parentId === '0') {
    const count = processes.filter((p) => p.parentId === '0').length;
    return `P${String(count + 1).padStart(3, '0')}`;
  }
  const siblings = processes.filter((p) => p.parentId === parentId);
  const seq = String(siblings.length + 1).padStart(2, '0');
  return `${parent.processCode}-${seq}`;
}

function buildProcessTree(parentId: string): Array<Record<string, unknown>> {
  return processes
    .filter((p) => p.parentId === parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((p) => ({
      ...p,
      children: buildProcessTree(p.id),
    }));
}

export const processHandlers = [
  // GET /api/v1/ic-system/processes
  http.get('/api/v1/ic-system/processes', async ({ request }) => {
    const url = new URL(request.url);
    const treeMode = url.searchParams.get('tree') !== 'false';

    if (treeMode) {
      const tree = buildProcessTree('0');
      return HttpResponse.json(successResponse(tree));
    }

    const keyword = url.searchParams.get('keyword') || '';
    let filtered = processes;
    if (keyword) {
      filtered = processes.filter(
        (p) => p.processName.includes(keyword) || p.processCode.includes(keyword),
      );
    }

    return HttpResponse.json(successResponse(filtered));
  }),

  // GET /api/v1/ic-system/processes/:id
  http.get('/api/v1/ic-system/processes/:id', async ({ params }) => {
    const { id } = params;
    const process = processes.find((p) => p.id === id);

    if (!process) {
      return HttpResponse.json(errorResponse('流程不存在'), { status: 404 });
    }

    return HttpResponse.json(successResponse(process));
  }),

  // POST /api/v1/ic-system/processes
  http.post('/api/v1/ic-system/processes', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    if (!body.processName) {
      return HttpResponse.json(errorResponse('流程名称不能为空'), { status: 400 });
    }

    const parentId = (body.parentId as string) || '0';
    const parentProcess = parentId !== '0' ? processes.find((p) => p.id === parentId) : null;
    const processLevel = parentProcess ? parentProcess.processLevel + 1 : 1;

    const newProcess = {
      id: String(nextProcessId++),
      processCode: generateProcessCode(parentId),
      processName: body.processName as string,
      parentId,
      processLevel,
      description: (body.description as string) || '',
      status: (body.status as string) || 'active',
      sortOrder: (body.sortOrder as number) || 1,
      riskCount: 0,
      controlCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    processes.push(newProcess);

    return HttpResponse.json(successResponse(newProcess), { status: 201 });
  }),

  // PUT /api/v1/ic-system/processes/:id
  http.put('/api/v1/ic-system/processes/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Record<string, unknown>;

    const index = processes.findIndex((p) => p.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('流程不存在'), { status: 404 });
    }

    processes[index] = {
      ...processes[index],
      ...body,
      id: processes[index].id,
      processCode: processes[index].processCode,
      createdAt: processes[index].createdAt,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(successResponse(processes[index]));
  }),

  // DELETE /api/v1/ic-system/processes/:id
  http.delete('/api/v1/ic-system/processes/:id', async ({ params }) => {
    const { id } = params;

    const index = processes.findIndex((p) => p.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('流程不存在'), { status: 404 });
    }

    const hasChildren = processes.some((p) => p.parentId === id);
    if (hasChildren) {
      return HttpResponse.json(errorResponse('存在子流程，无法删除'), { status: 409 });
    }

    processes.splice(index, 1);

    return HttpResponse.json(successResponse(null));
  }),
];
