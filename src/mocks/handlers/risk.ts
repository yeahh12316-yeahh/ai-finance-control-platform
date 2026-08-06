import { http, HttpResponse } from 'msw';
import { v4 as uuid } from 'uuid';
import { seedRiskCategories } from '../data/riskCategories';
import { seedRisks } from '../data/risks';
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

function paginatedResponse<T>(list: T[], total: number, page: number, pageSize: number) {
  return successResponse({
    list,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}

let risks = [...seedRisks];
let nextRiskId = risks.length + 1;

const assessments: Array<Record<string, unknown>> = [];

function buildCategoryTree(parentId: string): Array<Record<string, unknown>> {
  return seedRiskCategories
    .filter((c) => c.parentId === parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((c) => ({
      ...c,
      children: buildCategoryTree(c.id),
    }));
}

export const riskHandlers = [
  // GET /api/v1/ic-risk/categories
  http.get('/api/v1/ic-risk/categories', () => {
    const tree = buildCategoryTree('0');
    return HttpResponse.json(successResponse(tree));
  }),

  // GET /api/v1/ic-risk/risks
  http.get('/api/v1/ic-risk/risks', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);
    const keyword = url.searchParams.get('keyword') || '';
    const categoryId = url.searchParams.get('categoryId') || '';
    const status = url.searchParams.get('status') || '';
    const riskLevel = url.searchParams.get('riskLevel') || '';

    let filtered = risks;
    if (keyword) {
      filtered = filtered.filter(
        (r) => r.riskName.includes(keyword) || r.riskCode.includes(keyword),
      );
    }
    if (categoryId) {
      filtered = filtered.filter((r) => r.categoryId === categoryId);
    }
    if (status) {
      filtered = filtered.filter((r) => r.status === status);
    }
    if (riskLevel) {
      filtered = filtered.filter((r) => r.residualRiskLevel === riskLevel);
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return HttpResponse.json(paginatedResponse(paged, total, page, pageSize));
  }),

  // GET /api/v1/ic-risk/risks/:id
  http.get('/api/v1/ic-risk/risks/:id', async ({ params }) => {
    const { id } = params;
    const risk = risks.find((r) => r.id === id);

    if (!risk) {
      return HttpResponse.json(errorResponse('风险不存在'), { status: 404 });
    }

    return HttpResponse.json(successResponse(risk));
  }),

  // POST /api/v1/ic-risk/risks
  http.post('/api/v1/ic-risk/risks', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    if (!body.riskName) {
      return HttpResponse.json(errorResponse('风险名称不能为空'), { status: 400 });
    }

    const riskCount = risks.length + 1;
    const newRisk = {
      id: String(nextRiskId++),
      riskCode: `R${String(riskCount).padStart(3, '0')}`,
      riskName: body.riskName as string,
      categoryId: (body.categoryId as string) || '',
      processId: (body.processId as string) || '',
      riskDescription: (body.riskDescription as string) || '',
      inherentImpact: (body.inherentImpact as number) || 1,
      inherentLikelihood: (body.inherentLikelihood as number) || 1,
      inherentRiskLevel: (body.inherentRiskLevel as string) || '低',
      residualImpact: (body.residualImpact as number) || 1,
      residualLikelihood: (body.residualLikelihood as number) || 1,
      residualRiskLevel: (body.residualRiskLevel as string) || '低',
      controlId: (body.controlId as string) || '',
      status: (body.status as string) || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    risks.push(newRisk);

    return HttpResponse.json(successResponse(newRisk), { status: 201 });
  }),

  // PUT /api/v1/ic-risk/risks/:id
  http.put('/api/v1/ic-risk/risks/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Record<string, unknown>;

    const index = risks.findIndex((r) => r.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('风险不存在'), { status: 404 });
    }

    risks[index] = {
      ...risks[index],
      ...body,
      id: risks[index].id,
      riskCode: risks[index].riskCode,
      createdAt: risks[index].createdAt,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(successResponse(risks[index]));
  }),

  // DELETE /api/v1/ic-risk/risks/:id
  http.delete('/api/v1/ic-risk/risks/:id', async ({ params }) => {
    const { id } = params;

    const index = risks.findIndex((r) => r.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('风险不存在'), { status: 404 });
    }

    risks.splice(index, 1);

    return HttpResponse.json(successResponse(null));
  }),

  // POST /api/v1/ic-risk/assessments
  http.post('/api/v1/ic-risk/assessments', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    const assessment = {
      id: `asmt-${uuid().slice(0, 8)}`,
      riskId: body.riskId as string,
      inherentImpact: body.inherentImpact as number,
      inherentLikelihood: body.inherentLikelihood as number,
      inherentRiskLevel: body.inherentRiskLevel as string,
      residualImpact: body.residualImpact as number,
      residualLikelihood: body.residualLikelihood as number,
      residualRiskLevel: body.residualRiskLevel as string,
      controlEffectiveness: body.controlEffectiveness as string,
      assessedBy: body.assessedBy as string,
      assessedAt: new Date().toISOString(),
      comments: (body.comments as string) || '',
    };

    assessments.push(assessment);

    // Update the risk's residual values
    const riskIndex = risks.findIndex((r) => r.id === body.riskId);
    if (riskIndex !== -1) {
      risks[riskIndex] = {
        ...risks[riskIndex],
        residualImpact: assessment.residualImpact,
        residualLikelihood: assessment.residualLikelihood,
        residualRiskLevel: assessment.residualRiskLevel,
        updatedAt: new Date().toISOString(),
      };
    }

    return HttpResponse.json(successResponse(assessment), { status: 201 });
  }),

  // GET /api/v1/ic-risk/assessments
  http.get('/api/v1/ic-risk/assessments', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);

    const total = assessments.length;
    const start = (page - 1) * pageSize;
    const paged = assessments.slice(start, start + pageSize);

    return HttpResponse.json(paginatedResponse(paged, total, page, pageSize));
  }),

  // GET /api/v1/ic-risk/heatmap
  http.get('/api/v1/ic-risk/heatmap', () => {
    const heatmapData = seedRiskCategories.map((category) => {
      const categoryRisks = risks.filter((r) => r.categoryId === category.id);
      return {
        categoryId: category.id,
        categoryName: category.categoryName,
        riskCount: categoryRisks.length,
        highRiskCount: categoryRisks.filter((r) => r.residualRiskLevel === '高').length,
        mediumRiskCount: categoryRisks.filter((r) => r.residualRiskLevel === '中').length,
        lowRiskCount: categoryRisks.filter((r) => r.residualRiskLevel === '低').length,
      };
    });

    return HttpResponse.json(successResponse(heatmapData));
  }),

  // GET /api/v1/ic-risk/kri
  http.get('/api/v1/ic-risk/kri', () => {
    const kriList = [
      {
        id: 'kri-001',
        indicatorName: '不良贷款率',
        indicatorCode: 'KRI-NPL-001',
        category: '信用风险',
        currentValue: 1.85,
        unit: '%',
        threshold: 2.0,
        direction: 'higher_is_worse',
        status: 'normal',
        trend: 'down',
        lastUpdated: '2026-08-05T00:00:00Z',
      },
      {
        id: 'kri-002',
        indicatorName: '授信集中度（房地产）',
        indicatorCode: 'KRI-CON-001',
        category: '集中度风险',
        currentValue: 30.0,
        unit: '%',
        threshold: 15.0,
        direction: 'higher_is_worse',
        status: 'breach',
        trend: 'down',
        lastUpdated: '2026-08-05T00:00:00Z',
      },
      {
        id: 'kri-003',
        indicatorName: '控制测试通过率',
        indicatorCode: 'KRI-CT-001',
        category: '操作风险',
        currentValue: 87.5,
        unit: '%',
        threshold: 90.0,
        direction: 'higher_is_better',
        status: 'warning',
        trend: 'up',
        lastUpdated: '2026-08-05T00:00:00Z',
      },
      {
        id: 'kri-004',
        indicatorName: '缺陷整改及时率',
        indicatorCode: 'KRI-DEF-001',
        category: '操作风险',
        currentValue: 75.0,
        unit: '%',
        threshold: 85.0,
        direction: 'higher_is_better',
        status: 'warning',
        trend: 'stable',
        lastUpdated: '2026-08-05T00:00:00Z',
      },
      {
        id: 'kri-005',
        indicatorName: '制度更新及时率',
        indicatorCode: 'KRI-DOC-001',
        category: '合规风险',
        currentValue: 92.0,
        unit: '%',
        threshold: 90.0,
        direction: 'higher_is_better',
        status: 'normal',
        trend: 'stable',
        lastUpdated: '2026-08-05T00:00:00Z',
      },
      {
        id: 'kri-006',
        indicatorName: '流动性覆盖率',
        indicatorCode: 'KRI-LCR-001',
        category: '流动性风险',
        currentValue: 145.0,
        unit: '%',
        threshold: 100.0,
        direction: 'higher_is_better',
        status: 'normal',
        trend: 'stable',
        lastUpdated: '2026-08-05T00:00:00Z',
      },
      {
        id: 'kri-007',
        indicatorName: '反洗钱可疑交易报告及时率',
        indicatorCode: 'KRI-AML-001',
        category: '洗钱风险',
        currentValue: 98.5,
        unit: '%',
        threshold: 95.0,
        direction: 'higher_is_better',
        status: 'normal',
        trend: 'stable',
        lastUpdated: '2026-08-05T00:00:00Z',
      },
      {
        id: 'kri-008',
        indicatorName: '系统可用率',
        indicatorCode: 'KRI-IT-001',
        category: '信息科技风险',
        currentValue: 99.95,
        unit: '%',
        threshold: 99.9,
        direction: 'higher_is_better',
        status: 'normal',
        trend: 'stable',
        lastUpdated: '2026-08-05T00:00:00Z',
      },
    ];

    return HttpResponse.json(successResponse(kriList));
  }),
];
