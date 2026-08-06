import { http, HttpResponse } from 'msw';
import { v4 as uuid } from 'uuid';
import { seedRCMMappings } from '../data/rcm';
import { seedRisks } from '../data/risks';
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

let rcmMappings = [...seedRCMMappings];
let nextRcmId = rcmMappings.length + 1;

export const rcmHandlers = [
  // GET /api/v1/ic-control/rcm
  http.get('/api/v1/ic-control/rcm', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);

    // Enrich RCM mappings with risk and control details
    const enriched = rcmMappings.map((mapping) => {
      const risk = seedRisks.find((r) => r.id === mapping.riskId);
      const control = seedControls.find((c) => c.id === mapping.controlId);
      return {
        ...mapping,
        riskCode: risk?.riskCode || '',
        riskName: risk?.riskName || '',
        controlCode: control?.controlCode || '',
        controlName: control?.controlName || '',
      };
    });

    const total = enriched.length;
    const start = (page - 1) * pageSize;
    const paged = enriched.slice(start, start + pageSize);

    return HttpResponse.json(paginatedResponse(paged, total, page, pageSize));
  }),

  // POST /api/v1/ic-control/rcm
  http.post('/api/v1/ic-control/rcm', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    if (!body.riskId || !body.controlId) {
      return HttpResponse.json(errorResponse('风险ID和控制ID不能为空'), { status: 400 });
    }

    const newMapping = {
      id: String(nextRcmId++),
      riskId: body.riskId as string,
      controlId: body.controlId as string,
      mappingType: (body.mappingType as 'direct' | 'indirect' | 'compensating') || 'direct',
      effectivenessRating: (body.effectivenessRating as string) || '待评估',
      lastTestedDate: (body.lastTestedDate as string) || new Date().toISOString(),
    };

    rcmMappings.push(newMapping);

    const risk = seedRisks.find((r) => r.id === newMapping.riskId);
    const control = seedControls.find((c) => c.id === newMapping.controlId);

    return HttpResponse.json(
      successResponse({
        ...newMapping,
        riskCode: risk?.riskCode || '',
        riskName: risk?.riskName || '',
        controlCode: control?.controlCode || '',
        controlName: control?.controlName || '',
      }),
      { status: 201 },
    );
  }),

  // PUT /api/v1/ic-control/rcm/:id
  http.put('/api/v1/ic-control/rcm/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Record<string, unknown>;

    const index = rcmMappings.findIndex((m) => m.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('RCM映射不存在'), { status: 404 });
    }

    rcmMappings[index] = {
      ...rcmMappings[index],
      ...body,
      id: rcmMappings[index].id,
    };

    const risk = seedRisks.find((r) => r.id === rcmMappings[index].riskId);
    const control = seedControls.find((c) => c.id === rcmMappings[index].controlId);

    return HttpResponse.json(
      successResponse({
        ...rcmMappings[index],
        riskCode: risk?.riskCode || '',
        riskName: risk?.riskName || '',
        controlCode: control?.controlCode || '',
        controlName: control?.controlName || '',
      }),
    );
  }),

  // DELETE /api/v1/ic-control/rcm/:id
  http.delete('/api/v1/ic-control/rcm/:id', async ({ params }) => {
    const { id } = params;

    const index = rcmMappings.findIndex((m) => m.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('RCM映射不存在'), { status: 404 });
    }

    rcmMappings.splice(index, 1);

    return HttpResponse.json(successResponse(null));
  }),
];
