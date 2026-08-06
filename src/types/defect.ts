import type { DefectRecord, DefectTask } from '@/services/defect';

export type {
  DefectRecord,
  DefectTask,
};

export type DefectSeverity = 'critical' | 'major' | 'minor' | 'observation';
export type DeficiencyType = 'design_deficiency' | 'execution_deficiency';
export type DeficiencyCategory = 'control_absence' | 'control_failure' | 'control_insufficient' | 'control_timing' | 'control_documentation';
export type RemediationStatus = 'pending' | 'in_progress' | 'completed' | 'verified' | 'closed';
export type SourceType = 'evaluation' | 'audit' | 'incident' | 'self_check' | 'external';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';

export const SEVERITY_MAP: Record<DefectSeverity, { label: string; color: string }> = {
  critical: { label: '严重', color: 'red' },
  major: { label: '重要', color: 'orange' },
  minor: { label: '一般', color: 'gold' },
  observation: { label: '观察项', color: 'blue' },
};

export const DEFICIENCY_TYPE_MAP: Record<DeficiencyType, string> = {
  design_deficiency: '设计缺陷',
  execution_deficiency: '执行缺陷',
};

export const DEFICIENCY_CATEGORY_MAP: Record<DeficiencyCategory, string> = {
  control_absence: '控制缺失',
  control_failure: '控制失效',
  control_insufficient: '控制不足',
  control_timing: '控制时效',
  control_documentation: '制度文档',
};

export const REMEDIATION_STATUS_MAP: Record<RemediationStatus, { label: string; color: string }> = {
  pending: { label: '待整改', color: 'default' },
  in_progress: { label: '整改中', color: 'processing' },
  completed: { label: '待验证', color: 'blue' },
  verified: { label: '已验证', color: 'cyan' },
  closed: { label: '已关闭', color: 'success' },
};

export const SOURCE_TYPE_MAP: Record<SourceType, string> = {
  evaluation: '内控评价',
  audit: '内部审计',
  incident: '风险事件',
  self_check: '自查发现',
  external: '外部检查',
};

export const TASK_STATUS_MAP: Record<TaskStatus, { label: string; color: string }> = {
  pending: { label: '待开始', color: 'default' },
  in_progress: { label: '进行中', color: 'processing' },
  completed: { label: '已完成', color: 'success' },
};

export const TASK_PRIORITY_MAP: Record<TaskPriority, { label: string; color: string }> = {
  critical: { label: '紧急', color: 'red' },
  high: { label: '高', color: 'orange' },
  medium: { label: '中', color: 'blue' },
  low: { label: '低', color: 'default' },
};
