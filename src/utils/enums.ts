export const RISK_LEVEL = {
  extreme: {
    label: '极高风险',
    color: '#ff4d4f',
    value: 'extreme',
  },
  high: {
    label: '高风险',
    color: '#fa8c16',
    value: 'high',
  },
  medium: {
    label: '中风险',
    color: '#faad14',
    value: 'medium',
  },
  low: {
    label: '低风险',
    color: '#52c41a',
    value: 'low',
  },
} as const

export type RiskLevel = keyof typeof RISK_LEVEL

export const RISK_LEVEL_LIST = Object.values(RISK_LEVEL)

export const DEFECT_SEVERITY = {
  critical: {
    label: '严重缺陷',
    color: '#ff4d4f',
    value: 'critical',
  },
  major: {
    label: '重大缺陷',
    color: '#fa8c16',
    value: 'major',
  },
  minor: {
    label: '一般缺陷',
    color: '#1890ff',
    value: 'minor',
  },
} as const

export type DefectSeverity = keyof typeof DEFECT_SEVERITY

export const EVALUATION_CONCLUSION = {
  effective: {
    label: '有效',
    color: '#52c41a',
    value: 'effective',
  },
  partially_effective: {
    label: '部分有效',
    color: '#faad14',
    value: 'partially_effective',
  },
  ineffective: {
    label: '无效',
    color: '#ff4d4f',
    value: 'ineffective',
  },
} as const

export type EvaluationConclusion = keyof typeof EVALUATION_CONCLUSION

export const CONTROL_TYPE = {
  preventive: {
    label: '预防性控制',
    color: '#1a365d',
    value: 'preventive',
  },
  detective: {
    label: '检测性控制',
    color: '#1890ff',
    value: 'detective',
  },
  corrective: {
    label: '纠正性控制',
    color: '#722ed1',
    value: 'corrective',
  },
} as const

export type ControlType = keyof typeof CONTROL_TYPE

export const DOCUMENT_STATUS = {
  draft: {
    label: '草稿',
    color: '#d9d9d9',
    value: 'draft',
  },
  published: {
    label: '已发布',
    color: '#52c41a',
    value: 'published',
  },
  archived: {
    label: '已归档',
    color: '#8c8c8c',
    value: 'archived',
  },
} as const

export type DocumentStatus = keyof typeof DOCUMENT_STATUS

export const RECTIFICATION_STATUS = {
  pending: {
    label: '待整改',
    color: '#faad14',
    value: 'pending',
  },
  in_progress: {
    label: '整改中',
    color: '#1890ff',
    value: 'in_progress',
  },
  completed: {
    label: '已完成',
    color: '#52c41a',
    value: 'completed',
  },
  verified: {
    label: '已验证',
    color: '#13c2c2',
    value: 'verified',
  },
  closed: {
    label: '已关闭',
    color: '#8c8c8c',
    value: 'closed',
  },
} as const

export type RectificationStatus = keyof typeof RECTIFICATION_STATUS
