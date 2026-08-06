import { get, post, put, del } from '@/utils/request';
import type { ApiResponse } from '@/types/api';

export interface ProcessRecord {
  id: string;
  processCode: string;
  processName: string;
  parentId: string;
  processLevel: number;
  description: string;
  status: string;
  sortOrder: number;
  riskCount: number;
  controlCount: number;
  children?: ProcessRecord[];
  createdAt: string;
  updatedAt: string;
}

export interface ProcessCreateParams {
  processName: string;
  parentId?: string;
  description?: string;
  status?: string;
  sortOrder?: number;
}

export interface ProcessUpdateParams extends Partial<ProcessCreateParams> {
  id: string;
}

export function getProcesses(tree?: boolean): Promise<ApiResponse<ProcessRecord[]>> {
  const params: Record<string, unknown> = {};
  if (tree !== undefined) {
    params.tree = String(tree);
  }
  return get<ProcessRecord[]>('/ic-system/processes', params);
}

export function getProcessById(id: string): Promise<ApiResponse<ProcessRecord>> {
  return get<ProcessRecord>(`/ic-system/processes/${id}`);
}

export function createProcess(params: ProcessCreateParams): Promise<ApiResponse<ProcessRecord>> {
  return post<ProcessRecord>('/ic-system/processes', params as unknown as Record<string, unknown>);
}

export function updateProcess(params: ProcessUpdateParams): Promise<ApiResponse<ProcessRecord>> {
  const { id, ...data } = params;
  return put<ProcessRecord>(`/ic-system/processes/${id}`, data as Record<string, unknown>);
}

export function deleteProcess(id: string): Promise<ApiResponse<null>> {
  return del<null>(`/ic-system/processes/${id}`);
}
