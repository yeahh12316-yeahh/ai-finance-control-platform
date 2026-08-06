import { http, HttpResponse } from 'msw';
import { v4 as uuid } from 'uuid';
import { seedControls } from '../data/controls';

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

let controls = [...seedControls];
let nextControlId = controls.length + 1;

export const controlHandlers = [
  // GET /api/v1/ic-control/controls
  http.get('/api/v1/ic-control/controls', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);
    const keyword = url.searchParams.get('keyword') || '';
    const controlType = url.searchParams.get('controlType') || '';
    const controlNature = url.searchParams.get('controlNature') || '';
    const status = url.searchParams.get('status') || '';
    const processId = url.searchParams.get('processId') || '';

    let filtered = controls;
    if (keyword) {
      filtered = filtered.filter(
        (c) => c.controlName.includes(keyword) || c.controlCode.includes(keyword),
      );
    }
    if (controlType) {
      filtered = filtered.filter((c) => c.controlType === controlType);
    }
    if (controlNature) {
      filtered = filtered.filter((c) => c.controlNature === controlNature);
    }
    if (status) {
      filtered = filtered.filter((c) => c.status === status);
    }
    if (processId) {
      filtered = filtered.filter((c) => c.processId === processId);
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return HttpResponse.json(paginatedResponse(paged, total, page, pageSize));
  }),

  // GET /api/v1/ic-control/controls/:id
  http.get('/api/v1/ic-control/controls/:id', async ({ params }) => {
    const { id } = params;
    const control = controls.find((c) => c.id === id);

    if (!control) {
      return HttpResponse.json(errorResponse('控制措施不存在'), { status: 404 });
    }

    return HttpResponse.json(successResponse(control));
  }),

  // POST /api/v1/ic-control/controls
  http.post('/api/v1/ic-control/controls', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    if (!body.controlName) {
      return HttpResponse.json(errorResponse('控制名称不能为空'), { status: 400 });
    }

    const controlCount = controls.length + 1;
    const newControl = {
      id: String(nextControlId++),
      controlCode: `C${String(controlCount).padStart(3, '0')}`,
      controlName: body.controlName as string,
      controlType: body.controlType as 'preventive' | 'detective' | 'corrective',
      controlNature: body.controlNature as 'manual' | 'semi_automated' | 'automated',
      controlFrequency: (body.controlFrequency as string) || '',
      processId: (body.processId as string) || '',
      description: (body.description as string) || '',
      status: (body.status as string) || 'active',
      effectivenessRating: (body.effectivenessRating as string) || '待评估',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    controls.push(newControl);

    return HttpResponse.json(successResponse(newControl), { status: 201 });
  }),

  // PUT /api/v1/ic-control/controls/:id
  http.put('/api/v1/ic-control/controls/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Record<string, unknown>;

    const index = controls.findIndex((c) => c.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('控制措施不存在'), { status: 404 });
    }

    controls[index] = {
      ...controls[index],
      ...body,
      id: controls[index].id,
      controlCode: controls[index].controlCode,
      createdAt: controls[index].createdAt,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(successResponse(controls[index]));
  }),

  // DELETE /api/v1/ic-control/controls/:id
  http.delete('/api/v1/ic-control/controls/:id', async ({ params }) => {
    const { id } = params;

    const index = controls.findIndex((c) => c.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('控制措施不存在'), { status: 404 });
    }

    controls.splice(index, 1);

    return HttpResponse.json(successResponse(null));
  }),
];
