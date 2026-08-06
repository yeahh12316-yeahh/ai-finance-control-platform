import { get } from '@/utils/request';
import type { ApiResponse, PaginatedResponse } from '@/types/api';

export interface AuditLogRecord {
  id: string;
  userId: string;
  userName: string;
  module: string;
  moduleName: string;
  operation: string;
  operationDesc: string;
  detail: string;
  ip: string;
  userAgent: string;
  result: string;
  createdAt: string;
}

export interface AuditLogFilterParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  userId?: string;
  module?: string;
  operation?: string;
  result?: string;
  startDate?: string;
  endDate?: string;
}

export interface AuditLogStats {
  totalLogs: number;
  moduleStats: Record<string, number>;
  operationStats: Record<string, number>;
}

export function getAuditLogs(params: AuditLogFilterParams): Promise<ApiResponse<PaginatedResponse<AuditLogRecord>>> {
  return get<PaginatedResponse<AuditLogRecord>>('/audit-logs', params as Record<string, unknown>);
}

export function getAuditLogStats(): Promise<ApiResponse<AuditLogStats>> {
  return get<AuditLogStats>('/audit-logs/stats');
}
