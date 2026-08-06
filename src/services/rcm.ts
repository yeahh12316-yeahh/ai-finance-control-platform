import { get, post, put, del } from '@/utils/request';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api';

export interface RCMMapping {
  id: string;
  riskId: string;
  controlId: string;
  mappingType: 'direct' | 'indirect' | 'compensating';
  effectivenessRating: string;
  lastTestedDate: string;
  riskCode?: string;
  riskName?: string;
  controlCode?: string;
  controlName?: string;
}

export interface RCMMappingCreateParams {
  riskId: string;
  controlId: string;
  mappingType?: string;
  effectivenessRating?: string;
  lastTestedDate?: string;
}

export function getRCMList(params: PaginationParams): Promise<ApiResponse<PaginatedResponse<RCMMapping>>> {
  return get<PaginatedResponse<RCMMapping>>('/ic-control/rcm', params as Record<string, unknown>);
}

export function createRCMMapping(params: RCMMappingCreateParams): Promise<ApiResponse<RCMMapping>> {
  return post<RCMMapping>('/ic-control/rcm', params as unknown as Record<string, unknown>);
}

export function updateRCMMapping(id: string, params: Partial<RCMMappingCreateParams>): Promise<ApiResponse<RCMMapping>> {
  return put<RCMMapping>(`/ic-control/rcm/${id}`, params as unknown as Record<string, unknown>);
}

export function deleteRCMMapping(id: string): Promise<ApiResponse<null>> {
  return del<null>(`/ic-control/rcm/${id}`);
}
