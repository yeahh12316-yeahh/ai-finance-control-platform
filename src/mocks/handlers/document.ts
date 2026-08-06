import { http, HttpResponse } from 'msw';
import { v4 as uuid } from 'uuid';
import { seedDocuments } from '../data/documents';

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

let documents = [...seedDocuments];
let nextDocId = documents.length + 1;

export const documentHandlers = [
  // GET /api/v1/ic-document/documents
  http.get('/api/v1/ic-document/documents', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);
    const keyword = url.searchParams.get('keyword') || '';
    const docCategory = url.searchParams.get('docCategory') || '';
    const status = url.searchParams.get('status') || '';
    const tag = url.searchParams.get('tag') || '';

    let filtered = documents;
    if (keyword) {
      filtered = filtered.filter(
        (d) => d.docName.includes(keyword) || d.docCode.includes(keyword),
      );
    }
    if (docCategory) {
      filtered = filtered.filter((d) => d.docCategory === docCategory);
    }
    if (status) {
      filtered = filtered.filter((d) => d.status === status);
    }
    if (tag) {
      filtered = filtered.filter((d) => d.tags.includes(tag));
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return HttpResponse.json(paginatedResponse(paged, total, page, pageSize));
  }),

  // GET /api/v1/ic-document/documents/:id
  http.get('/api/v1/ic-document/documents/:id', async ({ params }) => {
    const { id } = params;
    const document = documents.find((d) => d.id === id);

    if (!document) {
      return HttpResponse.json(errorResponse('文档不存在'), { status: 404 });
    }

    return HttpResponse.json(successResponse(document));
  }),

  // POST /api/v1/ic-document/documents
  http.post('/api/v1/ic-document/documents', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    if (!body.docName) {
      return HttpResponse.json(errorResponse('文档名称不能为空'), { status: 400 });
    }

    const docCount = documents.length + 1;
    const now = new Date().toISOString();
    const newDocument = {
      id: String(nextDocId++),
      docCode: `DOC-${new Date().getFullYear()}-${String(docCount).padStart(3, '0')}`,
      docName: body.docName as string,
      docCategory: (body.docCategory as string) || '',
      docType: (body.docType as string) || '',
      version: 'V1.0',
      fileSize: (body.fileSize as number) || 0,
      fileType: (body.fileType as string) || 'pdf',
      tags: (body.tags as string[]) || [],
      description: (body.description as string) || '',
      status: (body.status as string) || 'draft',
      content: (body.content as string) || '',
      uploadBy: (body.uploadBy as string) || '',
      uploadAt: now,
      updatedAt: now,
      versions: [
        {
          version: 'V1.0',
          uploadBy: (body.uploadBy as string) || '',
          uploadAt: now,
          fileSize: (body.fileSize as number) || 0,
        },
      ],
    };

    documents.push(newDocument);

    return HttpResponse.json(successResponse(newDocument), { status: 201 });
  }),

  // PUT /api/v1/ic-document/documents/:id
  http.put('/api/v1/ic-document/documents/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Record<string, unknown>;

    const index = documents.findIndex((d) => d.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('文档不存在'), { status: 404 });
    }

    documents[index] = {
      ...documents[index],
      ...body,
      id: documents[index].id,
      docCode: documents[index].docCode,
      uploadAt: documents[index].uploadAt,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(successResponse(documents[index]));
  }),

  // DELETE /api/v1/ic-document/documents/:id
  http.delete('/api/v1/ic-document/documents/:id', async ({ params }) => {
    const { id } = params;

    const index = documents.findIndex((d) => d.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('文档不存在'), { status: 404 });
    }

    documents.splice(index, 1);

    return HttpResponse.json(successResponse(null));
  }),

  // GET /api/v1/ic-document/documents/:id/versions
  http.get('/api/v1/ic-document/documents/:id/versions', async ({ params }) => {
    const { id } = params;
    const document = documents.find((d) => d.id === id);

    if (!document) {
      return HttpResponse.json(errorResponse('文档不存在'), { status: 404 });
    }

    return HttpResponse.json(successResponse(document.versions));
  }),

  // POST /api/v1/ic-document/documents/:id/versions
  http.post('/api/v1/ic-document/documents/:id/versions', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Record<string, unknown>;

    const index = documents.findIndex((d) => d.id === id);
    if (index === -1) {
      return HttpResponse.json(errorResponse('文档不存在'), { status: 404 });
    }

    const versions = documents[index].versions;
    const latestVersion = versions[versions.length - 1];
    const versionNum = parseFloat(latestVersion.version.replace('V', '')) + 0.1;
    const newVersion = `V${versionNum.toFixed(1)}`;

    const versionRecord = {
      version: newVersion,
      uploadBy: (body.uploadBy as string) || '',
      uploadAt: new Date().toISOString(),
      fileSize: (body.fileSize as number) || 0,
    };

    versions.push(versionRecord);
    documents[index].version = newVersion;
    documents[index].updatedAt = new Date().toISOString();
    documents[index].fileSize = versionRecord.fileSize || documents[index].fileSize;

    return HttpResponse.json(successResponse(versionRecord), { status: 201 });
  }),
];
