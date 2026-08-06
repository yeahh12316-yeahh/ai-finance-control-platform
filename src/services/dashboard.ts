import { get } from '@/utils/request';
import type { ApiResponse, PaginatedResponse } from '@/types/api';

export interface HealthDimension {
  name: string;
  score: number;
  status: string;
  indicators: Array<{ name: string; value: number }>;
}

export interface HealthData {
  overallScore: number;
  overallStatus: string;
  dimensions: HealthDimension[];
  lastUpdated: string;
}

export interface TrendDataPoint {
  month: string;
  monthLabel: string;
  score?: number;
  highRiskCount?: number;
  mediumRiskCount?: number;
  lowRiskCount?: number;
  newDefects?: number;
  closedDefects?: number;
  openDefects?: number;
  passRate?: number;
}

export interface RiskTrendData {
  overallRiskScore: TrendDataPoint[];
  riskByCategory: Array<{
    category: string;
    data: TrendDataPoint[];
  }>;
  defectTrend: TrendDataPoint[];
  controlTestPassRate: TrendDataPoint[];
}

export interface SummaryData {
  processStats: Record<string, number>;
  riskStats: Record<string, number>;
  controlStats: Record<string, number>;
  evaluationStats: Record<string, number>;
  defectStats: Record<string, number>;
  documentStats: Record<string, number>;
}

export interface AlertItem {
  id: string;
  alertType: string;
  alertLevel: string;
  title: string;
  description: string;
  source: string;
  relatedDefectId: string;
  createdAt: string;
  status: string;
}

export function getHealth(): Promise<ApiResponse<HealthData>> {
  return get<HealthData>('/ic-dashboard/health');
}

export function getRiskTrend(period?: string): Promise<ApiResponse<RiskTrendData>> {
  const params: Record<string, unknown> = {};
  if (period) params.period = period;
  return get<RiskTrendData>('/ic-dashboard/risk-trend', params);
}

export function getSummary(): Promise<ApiResponse<SummaryData>> {
  return get<SummaryData>('/ic-dashboard/summary');
}

export function getAlerts(params?: { page?: number; pageSize?: number }): Promise<ApiResponse<PaginatedResponse<AlertItem>>> {
  return get<PaginatedResponse<AlertItem>>('/ic-dashboard/alerts', params as Record<string, unknown>);
}
