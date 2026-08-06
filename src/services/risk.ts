import { get, post, put, del } from '@/utils/request';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api';

export interface RiskRecord {
  id: string;
  riskCode: string;
  riskName: string;
  categoryId: string;
  processId: string;
  riskDescription: string;
  inherentImpact: number;
  inherentLikelihood: number;
  inherentRiskLevel: string;
  residualImpact: number;
  residualLikelihood: number;
  residualRiskLevel: string;
  controlId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface RiskCategory {
  id: string;
  categoryCode: string;
  categoryName: string;
  parentId: string;
  description: string;
  sortOrder: number;
  children?: RiskCategory[];
}

export interface AssessmentRecord {
  id: string;
  riskId: string;
  inherentImpact: number;
  inherentLikelihood: number;
  inherentRiskLevel: string;
  residualImpact: number;
  residualLikelihood: number;
  residualRiskLevel: string;
  controlEffectiveness: string;
  assessedBy: string;
  assessedAt: string;
  comments: string;
}

export interface HeatmapItem {
  categoryId: string;
  categoryName: string;
  riskCount: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
}

export interface KriItem {
  id: string;
  indicatorName: string;
  indicatorCode: string;
  category: string;
  currentValue: number;
  unit: string;
  threshold: number;
  direction: string;
  status: string;
  trend: string;
  lastUpdated: string;
}

export interface RiskFilterParams extends PaginationParams {
  categoryId?: string;
  status?: string;
  riskLevel?: string;
}

export function getRiskCategories(): Promise<ApiResponse<RiskCategory[]>> {
  return get<RiskCategory[]>('/ic-risk/categories');
}

export function getRisks(params: RiskFilterParams): Promise<ApiResponse<PaginatedResponse<RiskRecord>>> {
  return get<PaginatedResponse<RiskRecord>>('/ic-risk/risks', params as Record<string, unknown>);
}

export function getRiskById(id: string): Promise<ApiResponse<RiskRecord>> {
  return get<RiskRecord>(`/ic-risk/risks/${id}`);
}

export function createRisk(params: Partial<RiskRecord>): Promise<ApiResponse<RiskRecord>> {
  return post<RiskRecord>('/ic-risk/risks', params as unknown as Record<string, unknown>);
}

export function updateRisk(id: string, params: Partial<RiskRecord>): Promise<ApiResponse<RiskRecord>> {
  return put<RiskRecord>(`/ic-risk/risks/${id}`, params as unknown as Record<string, unknown>);
}

export function deleteRisk(id: string): Promise<ApiResponse<null>> {
  return del<null>(`/ic-risk/risks/${id}`);
}

export function submitAssessment(params: Partial<AssessmentRecord>): Promise<ApiResponse<AssessmentRecord>> {
  return post<AssessmentRecord>('/ic-risk/assessments', params as unknown as Record<string, unknown>);
}

export function getAssessments(params: PaginationParams): Promise<ApiResponse<PaginatedResponse<AssessmentRecord>>> {
  return get<PaginatedResponse<AssessmentRecord>>('/ic-risk/assessments', params as Record<string, unknown>);
}

export function getHeatmap(): Promise<ApiResponse<HeatmapItem[]>> {
  return get<HeatmapItem[]>('/ic-risk/heatmap');
}

export function getKri(): Promise<ApiResponse<KriItem[]>> {
  return get<KriItem[]>('/ic-risk/kri');
}
