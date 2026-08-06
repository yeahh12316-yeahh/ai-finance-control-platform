import type { EvaluationPlan, EvaluationScope, TestWorksheet, EvaluationReport } from '@/services/evaluation';

export type {
  EvaluationPlan,
  EvaluationScope,
  TestWorksheet,
  EvaluationReport,
};

export type PlanStatus = 'draft' | 'submitted' | 'approved' | 'in_progress' | 'completed' | 'closed';
export type WorksheetStatus = 'draft' | 'submitted' | 'reviewed';
export type TestMethod = 'inspection' | 'observation' | 'inquiry' | 'reperformance' | 'recalculation' | 'analysis';
export type TestConclusion = 'effective' | 'partially_effective' | 'ineffective' | 'not_applicable';
export type ReportStatus = 'draft' | 'submitted' | 'approved' | 'published';
export type PlanType = 'annual' | 'semi_annual' | 'quarterly' | 'special';
export type EvaluationFramework = 'COSO' | 'BASEL' | 'SOX' | 'custom';
export type ScopeType = 'business_line' | 'risk_type' | 'support_function' | 'entity';

export const PLAN_STATUS_MAP: Record<PlanStatus, { label: string; color: string }> = {
  draft: { label: '草稿', color: 'default' },
  submitted: { label: '已提交', color: 'blue' },
  approved: { label: '已批准', color: 'cyan' },
  in_progress: { label: '执行中', color: 'processing' },
  completed: { label: '已完成', color: 'success' },
  closed: { label: '已关闭', color: 'default' },
};

export const WORKSHEET_STATUS_MAP: Record<WorksheetStatus, { label: string; color: string }> = {
  draft: { label: '草稿', color: 'default' },
  submitted: { label: '已提交', color: 'blue' },
  reviewed: { label: '已复核', color: 'success' },
};

export const TEST_METHOD_MAP: Record<TestMethod, string> = {
  inspection: '检查',
  observation: '观察',
  inquiry: '询问',
  reperformance: '重新执行',
  recalculation: '重新计算',
  analysis: '分析性复核',
};

export const TEST_CONCLUSION_MAP: Record<TestConclusion, { label: string; color: string }> = {
  effective: { label: '有效', color: 'success' },
  partially_effective: { label: '部分有效', color: 'warning' },
  ineffective: { label: '无效', color: 'error' },
  not_applicable: { label: '不适用', color: 'default' },
};

export const REPORT_STATUS_MAP: Record<ReportStatus, { label: string; color: string }> = {
  draft: { label: '草稿', color: 'default' },
  submitted: { label: '已提交', color: 'blue' },
  approved: { label: '已批准', color: 'cyan' },
  published: { label: '已发布', color: 'success' },
};

export const PLAN_TYPE_MAP: Record<PlanType, string> = {
  annual: '年度评价',
  semi_annual: '半年度评价',
  quarterly: '季度评价',
  special: '专项评价',
};

export const EVALUATION_FRAMEWORK_MAP: Record<EvaluationFramework, string> = {
  COSO: 'COSO框架',
  BASEL: '巴塞尔框架',
  SOX: 'SOX框架',
  custom: '自定义框架',
};
