// Risk Level enum
export enum RiskLevel {
  Extreme = '极高',
  High = '高',
  Medium = '中',
  Low = '低',
}

// Risk Status enum
export enum RiskStatus {
  Active = 'active',
  Inactive = 'inactive',
  Archived = 'archived',
}

// Risk Record interface
export interface RiskItem {
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

// Risk Category interface
export interface RiskCategory {
  id: string;
  categoryCode: string;
  categoryName: string;
  parentId: string;
  description: string;
  sortOrder: number;
  children?: RiskCategory[];
}

// Risk Assessment Record
export interface RiskAssessment {
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

// Heatmap Data Item
export interface HeatmapItem {
  categoryId: string;
  categoryName: string;
  riskCount: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
}

// KRI (Key Risk Indicator)
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

// Matrix cell data
export interface MatrixCell {
  impact: number;
  likelihood: number;
  riskLevel: string;
  count: number;
  riskIds: string[];
}

// Questionnaire item
export interface QuestionnaireItem {
  riskDescription: string;
  impactScore: number;
  likelihoodScore: number;
  riskLevel: string;
  notes: string;
}

// Risk filter params
export interface RiskFilterParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  categoryId?: string;
  status?: string;
  riskLevel?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

// Risk form values
export interface RiskFormValues {
  riskName: string;
  categoryId: string;
  processId: string;
  riskDescription: string;
  inherentImpact: number;
  inherentLikelihood: number;
  controlId: string;
  controlMeasures: string;
  residualImpact: number;
  residualLikelihood: number;
  status: string;
}

// Helper: calculate risk level from impact × likelihood
export function calculateRiskLevel(impact: number, likelihood: number): string {
  const score = impact * likelihood;
  if (score >= 20) return RiskLevel.Extreme;
  if (score >= 12) return RiskLevel.High;
  if (score >= 6) return RiskLevel.Medium;
  return RiskLevel.Low;
}

// Risk level color mapping
export const riskLevelColorMap: Record<string, string> = {
  [RiskLevel.Extreme]: '#ff4d4f',
  [RiskLevel.High]: '#ff7a45',
  [RiskLevel.Medium]: '#faad14',
  [RiskLevel.Low]: '#52c41a',
};

// Risk level status options
export const riskLevelOptions = [
  { value: RiskLevel.Extreme, label: '极高', color: '#ff4d4f' },
  { value: RiskLevel.High, label: '高', color: '#ff7a45' },
  { value: RiskLevel.Medium, label: '中', color: '#faad14' },
  { value: RiskLevel.Low, label: '低', color: '#52c41a' },
];

// Risk status options
export const riskStatusOptions = [
  { value: RiskStatus.Active, label: '启用', color: '#52c41a' },
  { value: RiskStatus.Inactive, label: '停用', color: '#d9d9d9' },
  { value: RiskStatus.Archived, label: '已归档', color: '#8c8c8c' },
];

// Likelihood labels
export const likelihoodLabels = ['极低', '低', '中', '高', '极高'];

// Impact labels
export const impactLabels = ['极低', '低', '中', '高', '极高'];
