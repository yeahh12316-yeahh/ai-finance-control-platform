import { http, HttpResponse } from 'msw';
import { v4 as uuid } from 'uuid';
import { evaluationPlans, testWorksheets, evaluationScopes } from '../data/evaluations';

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

let plans = [...evaluationPlans];
let worksheets = [...testWorksheets];
let scopes = [...evaluationScopes];
let nextPlanId = plans.length + 1;
let nextWorksheetId = worksheets.length + 1;
let nextScopeId = scopes.length + 1;

export const evaluationHandlers = [
  // ========== Evaluation Plans ==========

  // GET /api/v1/ic-evaluation/plans
  http.get('/api/v1/ic-evaluation/plans', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);
    const keyword = url.searchParams.get('keyword') || '';
    const planYear = url.searchParams.get('planYear') || '';
    const status = url.searchParams.get('status') || '';

    let filtered = plans;
    if (keyword) {
      filtered = filtered.filter((p) => p.planName.includes(keyword));
    }
    if (planYear) {
      filtered = filtered.filter((p) => p.planYear === parseInt(planYear, 10));
    }
    if (status) {
      filtered = filtered.filter((p) => p.status === status);
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return HttpResponse.json(paginatedResponse(paged, total, page, pageSize));
  }),

  // GET /api/v1/ic-evaluation/plans/:id
  http.get('/api/v1/ic-evaluation/plans/:id', async ({ params }) => {
    const { id } = params;
    const plan = plans.find((p) => p.id === id);

    if (!plan) {
      return HttpResponse.json(errorResponse('评价计划不存在'), { status: 404 });
    }

    return HttpResponse.json(successResponse(plan));
  }),

  // POST /api/v1/ic-evaluation/plans
  http.post('/api/v1/ic-evaluation/plans', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    if (!body.planName) {
      return HttpResponse.json(errorResponse('计划名称不能为空'), { status: 400 });
    }

    const planCount = plans.length + 1;
    const newPlan = {
      id: `ep-${String(planCount).padStart(3, '0')}`,
      planCode: `EP-${body.planYear || new Date().getFullYear()}-${String(planCount).padStart(3, '0')}`,
      planName: body.planName as string,
      planYear: (body.planYear as number) || new Date().getFullYear(),
      planType: (body.planType as string) || 'annual',
      evaluationFramework: (body.evaluationFramework as string) || 'COSO',
      startDate: (body.startDate as string) || '',
      endDate: (body.endDate as string) || '',
      status: (body.status as string) || 'draft',
      description: (body.description as string) || '',
      createdBy: (body.createdBy as string) || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    plans.push(newPlan);

    return HttpResponse.json(successResponse(newPlan), { status: 201 });
  }),

  // PUT /api/v1/ic-evaluation/plans/:id
  http.put('/api/v1/ic-evaluation/plans/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Record<string, unknown>;

    const index = plans.findIndex((p) => p.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('评价计划不存在'), { status: 404 });
    }

    plans[index] = {
      ...plans[index],
      ...body,
      id: plans[index].id,
      planCode: plans[index].planCode,
      createdAt: plans[index].createdAt,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(successResponse(plans[index]));
  }),

  // DELETE /api/v1/ic-evaluation/plans/:id
  http.delete('/api/v1/ic-evaluation/plans/:id', async ({ params }) => {
    const { id } = params;

    const index = plans.findIndex((p) => p.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('评价计划不存在'), { status: 404 });
    }

    plans.splice(index, 1);

    return HttpResponse.json(successResponse(null));
  }),

  // ========== Evaluation Scopes ==========

  // GET /api/v1/ic-evaluation/scopes
  http.get('/api/v1/ic-evaluation/scopes', async ({ request }) => {
    const url = new URL(request.url);
    const planId = url.searchParams.get('planId') || '';

    let filtered = scopes;
    if (planId) {
      filtered = scopes.filter((s) => s.planId === planId);
    }

    return HttpResponse.json(successResponse(filtered));
  }),

  // POST /api/v1/ic-evaluation/scopes
  http.post('/api/v1/ic-evaluation/scopes', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    if (!body.planId || !body.scopeName) {
      return HttpResponse.json(errorResponse('计划ID和范围名称不能为空'), { status: 400 });
    }

    const newScope = {
      id: `es-${String(nextScopeId++).padStart(3, '0')}`,
      planId: body.planId as string,
      scopeName: body.scopeName as string,
      scopeType: (body.scopeType as string) || 'business_line',
      processIds: (body.processIds as string[]) || [],
      controlIds: (body.controlIds as string[]) || [],
      riskIds: (body.riskIds as string[]) || [],
      description: (body.description as string) || '',
      status: (body.status as string) || 'planned',
      progress: (body.progress as number) || 0,
      assignedTo: (body.assignedTo as string) || '',
      createdAt: new Date().toISOString(),
    };

    scopes.push(newScope);

    return HttpResponse.json(successResponse(newScope), { status: 201 });
  }),

  // ========== Test Worksheets ==========

  // GET /api/v1/ic-evaluation/worksheets
  http.get('/api/v1/ic-evaluation/worksheets', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);
    const programId = url.searchParams.get('programId') || '';
    const status = url.searchParams.get('status') || '';

    let filtered = worksheets;
    if (programId) {
      filtered = filtered.filter((w) => w.programId === programId);
    }
    if (status) {
      filtered = filtered.filter((w) => w.status === status);
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return HttpResponse.json(paginatedResponse(paged, total, page, pageSize));
  }),

  // GET /api/v1/ic-evaluation/worksheets/:id
  http.get('/api/v1/ic-evaluation/worksheets/:id', async ({ params }) => {
    const { id } = params;
    const worksheet = worksheets.find((w) => w.id === id);

    if (!worksheet) {
      return HttpResponse.json(errorResponse('测试底稿不存在'), { status: 404 });
    }

    return HttpResponse.json(successResponse(worksheet));
  }),

  // POST /api/v1/ic-evaluation/worksheets
  http.post('/api/v1/ic-evaluation/worksheets', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    if (!body.controlId) {
      return HttpResponse.json(errorResponse('控制措施ID不能为空'), { status: 400 });
    }

    const newWorksheet = {
      id: `tw-${String(nextWorksheetId++).padStart(3, '0')}`,
      programId: (body.programId as string) || '',
      controlId: body.controlId as string,
      controlName: (body.controlName as string) || '',
      testStep: (body.testStep as string) || '',
      testMethod: (body.testMethod as string) || 'inspection',
      sampleSize: (body.sampleSize as number) || 0,
      sampleDescription: (body.sampleDescription as string) || '',
      testResult: (body.testResult as string) || '',
      testConclusion: (body.testConclusion as string) || '',
      finding: (body.finding as string) || '',
      testedBy: (body.testedBy as string) || '',
      testDate: (body.testDate as string) || '',
      reviewedBy: (body.reviewedBy as string) || '',
      reviewDate: (body.reviewDate as string) || '',
      status: (body.status as string) || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    worksheets.push(newWorksheet);

    return HttpResponse.json(successResponse(newWorksheet), { status: 201 });
  }),

  // PUT /api/v1/ic-evaluation/worksheets/:id
  http.put('/api/v1/ic-evaluation/worksheets/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Record<string, unknown>;

    const index = worksheets.findIndex((w) => w.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('测试底稿不存在'), { status: 404 });
    }

    worksheets[index] = {
      ...worksheets[index],
      ...body,
      id: worksheets[index].id,
      createdAt: worksheets[index].createdAt,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(successResponse(worksheets[index]));
  }),

  // DELETE /api/v1/ic-evaluation/worksheets/:id
  http.delete('/api/v1/ic-evaluation/worksheets/:id', async ({ params }) => {
    const { id } = params;

    const index = worksheets.findIndex((w) => w.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('测试底稿不存在'), { status: 404 });
    }

    worksheets.splice(index, 1);

    return HttpResponse.json(successResponse(null));
  }),

  // ========== Evaluation Reports ==========

  // GET /api/v1/ic-evaluation/reports
  http.get('/api/v1/ic-evaluation/reports', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);

    // Mock reports data
    const reports = [
      {
        id: 'er-001',
        reportCode: 'ER-2025-001',
        reportName: '2025年度内部控制评价报告',
        planId: 'ep-002',
        planName: '2025年度内部控制评价计划',
        reportPeriod: '2025年度',
        overallConclusion: '有效',
        summary: '经全面评价，2025年度内部控制体系运行有效，未发现重大缺陷。共发现重要缺陷2项、一般缺陷10项，已全部完成整改。',
        status: 'approved',
        createdBy: '1',
        createdAt: '2026-01-20T00:00:00Z',
        approvedBy: '1',
        approvedAt: '2026-01-25T00:00:00Z',
      },
      {
        id: 'er-002',
        reportCode: 'ER-2026-001',
        reportName: '2026年信贷业务专项内控评价报告',
        planId: 'ep-003',
        planName: '2026年信贷业务专项内控评价计划',
        reportPeriod: '2026年Q1-Q2',
        overallConclusion: '',
        summary: '评价工作正在进行中',
        status: 'draft',
        createdBy: '2',
        createdAt: '2026-04-01T00:00:00Z',
        approvedBy: '',
        approvedAt: '',
      },
    ];

    const total = reports.length;
    const start = (page - 1) * pageSize;
    const paged = reports.slice(start, start + pageSize);

    return HttpResponse.json(paginatedResponse(paged, total, page, pageSize));
  }),
];
