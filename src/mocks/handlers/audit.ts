import { http, HttpResponse } from 'msw';
import { v4 as uuid } from 'uuid';
import { auditLogs } from '../data/auditLogs';

function successResponse<T>(data: T) {
  return {
    code: 0,
    message: 'success',
    data,
    timestamp: Date.now(),
    requestId: uuid(),
  };
}

export const auditHandlers = [
  // GET /api/v1/audit-logs
  http.get('/api/v1/audit-logs', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);
    const keyword = url.searchParams.get('keyword') || '';
    const userId = url.searchParams.get('userId') || '';
    const module = url.searchParams.get('module') || '';
    const operation = url.searchParams.get('operation') || '';
    const result = url.searchParams.get('result') || '';
    const startDate = url.searchParams.get('startDate') || '';
    const endDate = url.searchParams.get('endDate') || '';

    let filtered = auditLogs;

    if (keyword) {
      filtered = filtered.filter(
        (log) =>
          log.userName.includes(keyword) ||
          log.detail.includes(keyword) ||
          log.moduleName.includes(keyword),
      );
    }
    if (userId) {
      filtered = filtered.filter((log) => log.userId === userId);
    }
    if (module) {
      filtered = filtered.filter((log) => log.module === module);
    }
    if (operation) {
      filtered = filtered.filter((log) => log.operation === operation);
    }
    if (result) {
      filtered = filtered.filter((log) => log.result === result);
    }
    if (startDate) {
      filtered = filtered.filter((log) => new Date(log.createdAt) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter((log) => new Date(log.createdAt) <= new Date(endDate + 'T23:59:59Z'));
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return HttpResponse.json({
      code: 0,
      message: 'success',
      data: {
        list: paged,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
      timestamp: Date.now(),
      requestId: uuid(),
    });
  }),

  // GET /api/v1/audit-logs/stats
  http.get('/api/v1/audit-logs/stats', () => {
    const moduleStats: Record<string, number> = {};
    const operationStats: Record<string, number> = {};

    for (const log of auditLogs) {
      moduleStats[log.module] = (moduleStats[log.module] || 0) + 1;
      operationStats[log.operation] = (operationStats[log.operation] || 0) + 1;
    }

    return HttpResponse.json(
      successResponse({
        totalLogs: auditLogs.length,
        moduleStats,
        operationStats,
      }),
    );
  }),
];
