import { get, post, put, del } from '@/utils/request';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api';

export interface ControlRecord {
  id: string;
  controlCode: string;
  controlName: string;
  controlType: 'preventive' | 'detective' | 'corrective';
  controlNature: 'manual' | 'semi_automated' | 'automated';
  controlFrequency: string;
  processId: string;
  description: string;
  status: string;
  effectivenessRating: string;
  createdAt: string;
  updatedAt: string;
}

export interface ControlFilterParams extends PaginationParams {
  controlType?: string;
  controlNature?: string;
  status?: string;
  processId?: string;
}

export function getControls(params: ControlFilterParams): Promise<ApiResponse<PaginatedResponse<ControlRecord>>> {
  return get<PaginatedResponse<ControlRecord>>('/ic-control/controls', params as Record<string, unknown>);
}

export function getControlById(id: string): Promise<ApiResponse<ControlRecord>> {
  return get<ControlRecord>(`/ic-control/controls/${id}`);
}

export function createControl(params: Partial<ControlRecord>): Promise<ApiResponse<ControlRecord>> {
  return post<ControlRecord>('/ic-control/controls', params as unknown as Record<string, unknown>);
}

export function updateControl(id: string, params: Partial<ControlRecord>): Promise<ApiResponse<ControlRecord>> {
  return put<ControlRecord>(`/ic-control/controls/${id}`, params as unknown as Record<string, unknown>);
}

export function deleteControl(id: string): Promise<ApiResponse<null>> {
  return del<null>(`/ic-control/controls/${id}`);
}
