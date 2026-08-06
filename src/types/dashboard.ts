import type {
  HealthData,
  HealthDimension,
  TrendDataPoint,
  RiskTrendData,
  SummaryData,
  AlertItem,
} from '@/services/dashboard';

export type {
  HealthData,
  HealthDimension,
  TrendDataPoint,
  RiskTrendData,
  SummaryData,
  AlertItem,
};

export type HealthStatus = 'healthy' | 'warning' | 'danger' | 'critical';
export type AlertLevel = 'info' | 'warning' | 'critical';
export type AlertType = 'risk_exceed' | 'defect_overdue' | 'control_failure' | 'evaluation_reminder' | 'system_alert';
export type TrendPeriod = '6m' | '12m' | '24m';

export const HEALTH_STATUS_MAP: Record<HealthStatus, { label: string; color: string }> = {
  healthy: { label: '健康', color: '#52c41a' },
  warning: { label: '关注', color: '#faad14' },
  danger: { label: '危险', color: '#ff7a45' },
  critical: { label: '严重', color: '#ff4d4f' },
};

export const ALERT_LEVEL_MAP: Record<AlertLevel, { label: string; color: string }> = {
  info: { label: '信息', color: 'blue' },
  warning: { label: '警告', color: 'orange' },
  critical: { label: '严重', color: 'red' },
};

export const ALERT_TYPE_MAP: Record<AlertType, string> = {
  risk_exceed: '风险超标',
  defect_overdue: '缺陷逾期',
  control_failure: '控制失效',
  evaluation_reminder: '评价提醒',
  system_alert: '系统告警',
};

export interface MetricCardData {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  color?: string;
}

export interface GaugeConfig {
  value: number;
  min: number;
  max: number;
  thresholds: Array<{
    range: [number, number];
    color: string;
    label: string;
  }>;
}
