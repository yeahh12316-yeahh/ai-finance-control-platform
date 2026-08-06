import { get, post, put, del } from '@/utils/request';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api';

export interface DefectTask {
  id: string;
  taskName: string;
  assignee: string;
  priority: string;
  status: string;
  dueDate: string;
}

export interface DefectRecord {
  id: string;
  defectCode: string;
  defectName: string;
  description: string;
  severity: string;
  deficiencyType: string;
  deficiencyCategory: string;
  sourceType: string;
  sourceId: string;
  processId: string;
  controlId: string;
  riskId: string;
  remediationStatus: string;
  remediationPlan: string;
  assignedTo: string;
  dueDate: string;
  closedDate: string;
  isOverdue: boolean;
  rootCause: string;
  tasks: DefectTask[];
  createdAt: string;
  updatedAt: string;
}

export interface DefectFilterParams extends PaginationParams {
  severity?: string;
  remediationStatus?: string;
  sourceType?: string;
  assignedTo?: string;
}

export interface TransitionParams {
  targetStatus: string;
  comment?: string;
}

export function getDefects(params: DefectFilterParams): Promise<ApiResponse<PaginatedResponse<DefectRecord>>> {
  return get<PaginatedResponse<DefectRecord>>('/ic-defect/defects', params as Record<string, unknown>);
}

export function getDefectById(id: string): Promise<ApiResponse<DefectRecord>> {
  return get<DefectRecord>(`/ic-defect/defects/${id}`);
}

export function createDefect(params: Partial<DefectRecord>): Promise<ApiResponse<DefectRecord>> {
  return post<DefectRecord>('/ic-defect/defects', params as unknown as Record<string, unknown>);
}

export function updateDefect(id: string, params: Partial<DefectRecord>): Promise<ApiResponse<DefectRecord>> {
  return put<DefectRecord>(`/ic-defect/defects/${id}`, params as unknown as Record<string, unknown>);
}

export function deleteDefect(id: string): Promise<ApiResponse<null>> {
  return del<null>(`/ic-defect/defects/${id}`);
}

export function transitionDefect(id: string, params: TransitionParams): Promise<ApiResponse<DefectRecord>> {
  return post<DefectRecord>(`/ic-defect/defects/${id}/transition`, params as unknown as Record<string, unknown>);
}

export function getDefectTasks(id: string): Promise<ApiResponse<DefectTask[]>> {
  return get<DefectTask[]>(`/ic-defect/defects/${id}/tasks`);
}

export function createDefectTask(id: string, params: Partial<DefectTask>): Promise<ApiResponse<DefectTask>> {
  return post<DefectTask>(`/ic-defect/defects/${id}/tasks`, params as unknown as Record<string, unknown>);
}

export function updateDefectTask(defectId: string, taskId: string, params: Partial<DefectTask>): Promise<ApiResponse<DefectTask>> {
  return put<DefectTask>(`/ic-defect/defects/${defectId}/tasks/${taskId}`, params as unknown as Record<string, unknown>);
}
