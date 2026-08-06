import { http, HttpResponse } from 'msw';
import { v4 as uuid } from 'uuid';

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

const mockChunks = [
  {
    id: 'chunk-001',
    documentId: '1',
    documentName: '银行信贷业务管理办法',
    chunkIndex: 1,
    content: '第一章 总则\n第一条 为规范本行信贷业务管理，有效防范信贷风险，促进信贷业务健康发展，根据《商业银行法》、《贷款通则》等法律法规，制定本办法。',
    embedding: [],
    metadata: { section: '第一章', page: 1 },
    createdAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'chunk-002',
    documentId: '1',
    documentName: '银行信贷业务管理办法',
    chunkIndex: 2,
    content: '第二章 客户准入管理\n第五条 客户准入应遵循"了解你的客户"原则，对客户进行全面的尽职调查，包括但不限于：经营状况、财务状况、信用记录、行业前景等。',
    embedding: [],
    metadata: { section: '第二章', page: 3 },
    createdAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'chunk-003',
    documentId: '1',
    documentName: '银行信贷业务管理办法',
    chunkIndex: 3,
    content: '第三章 授信审批\n第十二条 授信审批实行分级授权管理。根据授信金额和风险程度设置不同审批层级：单户授信500万元以下由分行审批；500万-2000万元由区域审批中心审批；2000万元以上由总行审批。',
    embedding: [],
    metadata: { section: '第三章', page: 7 },
    createdAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'chunk-004',
    documentId: '2',
    documentName: '授信审批操作规程',
    chunkIndex: 1,
    content: '第一章 总则\n为规范授信审批操作流程，明确各岗位职责和操作标准，特制定本规程。本规程适用于全行各类授信业务的审批操作。',
    embedding: [],
    metadata: { section: '第一章', page: 1 },
    createdAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'chunk-005',
    documentId: '3',
    documentName: '反洗钱内控管理制度',
    chunkIndex: 1,
    content: '第一章 总则\n为建立健全反洗钱内控管理体系，有效履行反洗钱法定义务，根据《反洗钱法》及相关监管规定，制定本制度。',
    embedding: [],
    metadata: { section: '第一章', page: 1 },
    createdAt: '2026-08-01T00:00:00Z',
  },
];

export const knowledgeHandlers = [
  // POST /api/v1/knowledge/search
  http.post('/api/v1/knowledge/search', async ({ request }) => {
    const body = (await request.json()) as { query?: string; topK?: number };

    if (!body.query) {
      return HttpResponse.json(errorResponse('查询内容不能为空'), { status: 400 });
    }

    const query = body.query.toLowerCase();
    const topK = body.topK || 5;

    // Simple keyword-based filtering
    const results = mockChunks
      .filter((c) => c.content.toLowerCase().includes(query) || c.documentName.toLowerCase().includes(query))
      .slice(0, topK)
      .map((c) => ({
        ...c,
        score: 0.85 + Math.random() * 0.14,
        highlight: c.content.replace(
          new RegExp(query, 'gi'),
          (match) => `<mark>${match}</mark>`,
        ),
      }));

    return HttpResponse.json(successResponse(results));
  }),

  // POST /api/v1/knowledge/index
  http.post('/api/v1/knowledge/index', async ({ request }) => {
    const body = (await request.json()) as { documentId?: string; documentName?: string; content?: string };

    if (!body.documentId || !body.content) {
      return HttpResponse.json(errorResponse('文档ID和内容不能为空'), { status: 400 });
    }

    const newChunks: Array<Record<string, unknown>> = [];
    const paragraphs = body.content.split('\n\n').filter((p) => p.trim());

    paragraphs.forEach((para, idx) => {
      if (para.trim().length > 50) {
        newChunks.push({
          id: `chunk-${uuid().slice(0, 8)}`,
          documentId: body.documentId,
          documentName: body.documentName || '未知文档',
          chunkIndex: idx + 1,
          content: para.trim(),
          embedding: [],
          metadata: { chunkIndex: idx + 1 },
          createdAt: new Date().toISOString(),
        });
      }
    });

    return HttpResponse.json(
      successResponse({
        documentId: body.documentId,
        chunkCount: newChunks.length,
        status: 'completed',
      }),
    );
  }),

  // GET /api/v1/knowledge/chunks
  http.get('/api/v1/knowledge/chunks', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);
    const documentId = url.searchParams.get('documentId') || '';

    let filtered = mockChunks;
    if (documentId) {
      filtered = mockChunks.filter((c) => c.documentId === documentId);
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return HttpResponse.json(paginatedResponse(paged, total, page, pageSize));
  }),
];
