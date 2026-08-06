import type { AuditLogRecord, AuditLogFilterParams, AuditLogStats } from '@/services/audit';

export type {
  AuditLogRecord,
  AuditLogFilterParams,
  AuditLogStats,
};

export type AuditModule = 'auth' | 'process' | 'risk' | 'control' | 'document' | 'evaluation' | 'defect' | 'system';
export type AuditOperation = 'LOGIN' | 'LOGOUT' | 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'EXPORT' | 'APPROVE' | 'SUBMIT';

export const AUDIT_MODULE_MAP: Record<string, string> = {
  auth: '用户认证',
  process: '业务流程',
  risk: '风险管理',
  control: '控制措施',
  document: '制度文档',
  evaluation: '内控评价',
  defect: '缺陷管理',
  system: '系统管理',
};

export const AUDIT_OPERATION_MAP: Record<string, string> = {
  LOGIN: '用户登录',
  LOGOUT: '用户退出',
  CREATE: '创建记录',
  UPDATE: '更新记录',
  DELETE: '删除记录',
  VIEW: '查看详情',
  EXPORT: '导出数据',
  APPROVE: '审批通过',
  SUBMIT: '提交记录',
};
