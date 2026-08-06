import { get, post, put, del } from '@/utils/request';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api';

export interface EvaluationPlan {
  id: string;
  planCode: string;
  planName: string;
  planYear: number;
  planType: string;
  evaluationFramework: string;
  startDate: string;
  endDate: string;
  status: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface EvaluationScope {
  id: string;
  planId: string;
  scopeName: string;
  scopeType: string;
  processIds: string[];
  controlIds: string[];
  riskIds: string[];
  description: string;
  status: string;
  progress: number;
  assignedTo: string;
  createdAt: string;
}

export interface TestWorksheet {
  id: string;
  programId: string;
  controlId: string;
  controlName: string;
  testStep: string;
  testMethod: string;
  sampleSize: number;
  sampleDescription: string;
  testResult: string;
  testConclusion: string;
  finding: string;
  testedBy: string;
  testDate: string;
  reviewedBy: string;
  reviewDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface EvaluationReport {
  id: string;
  reportCode: string;
  reportName: string;
  planId: string;
  planName: string;
  reportPeriod: string;
  overallConclusion: string;
  summary: string;
  status: string;
  createdBy: string;
  createdAt: string;
  approvedBy: string;
  approvedAt: string;
}

export interface PlanFilterParams extends PaginationParams {
  planYear?: string;
  status?: string;
}

// ========== Plans ==========

export function getPlans(params: PlanFilterParams): Promise<ApiResponse<PaginatedResponse<EvaluationPlan>>> {
  return get<PaginatedResponse<EvaluationPlan>>('/ic-evaluation/plans', params as Record<string, unknown>);
}

export function getPlanById(id: string): Promise<ApiResponse<EvaluationPlan>> {
  return get<EvaluationPlan>(`/ic-evaluation/plans/${id}`);
}

export function createPlan(params: Partial<EvaluationPlan>): Promise<ApiResponse<EvaluationPlan>> {
  return post<EvaluationPlan>('/ic-evaluation/plans', params as unknown as Record<string, unknown>);
}

export function updatePlan(id: string, params: Partial<EvaluationPlan>): Promise<ApiResponse<EvaluationPlan>> {
  return put<EvaluationPlan>(`/ic-evaluation/plans/${id}`, params as unknown as Record<string, unknown>);
}

export function deletePlan(id: string): Promise<ApiResponse<null>> {
  return del<null>(`/ic-evaluation/plans/${id}`);
}

// ========== Scopes ==========

export function getScopes(planId?: string): Promise<ApiResponse<EvaluationScope[]>> {
  const params: Record<string, unknown> = {};
  if (planId) params.planId = planId;
  return get<EvaluationScope[]>('/ic-evaluation/scopes', params);
}

export function createScope(params: Partial<EvaluationScope>): Promise<ApiResponse<EvaluationScope>> {
  return post<EvaluationScope>('/ic-evaluation/scopes', params as unknown as Record<string, unknown>);
}

// ========== Worksheets ==========

export function getWorksheets(params: PaginationParams & { programId?: string; status?: string }): Promise<ApiResponse<PaginatedResponse<TestWorksheet>>> {
  return get<PaginatedResponse<TestWorksheet>>('/ic-evaluation/worksheets', params as Record<string, unknown>);
}

export function getWorksheetById(id: string): Promise<ApiResponse<TestWorksheet>> {
  return get<TestWorksheet>(`/ic-evaluation/worksheets/${id}`);
}

export function createWorksheet(params: Partial<TestWorksheet>): Promise<ApiResponse<TestWorksheet>> {
  return post<TestWorksheet>('/ic-evaluation/worksheets', params as unknown as Record<string, unknown>);
}

export function updateWorksheet(id: string, params: Partial<TestWorksheet>): Promise<ApiResponse<TestWorksheet>> {
  return put<TestWorksheet>(`/ic-evaluation/worksheets/${id}`, params as unknown as Record<string, unknown>);
}

export function deleteWorksheet(id: string): Promise<ApiResponse<null>> {
  return del<null>(`/ic-evaluation/worksheets/${id}`);
}

// ========== Reports ==========

export function getReports(params: PaginationParams): Promise<ApiResponse<PaginatedResponse<EvaluationReport>>> {
  return get<PaginatedResponse<EvaluationReport>>('/ic-evaluation/reports', params as Record<string, unknown>);
}
