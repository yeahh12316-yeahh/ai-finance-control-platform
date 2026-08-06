export type ControlType = 'preventive' | 'detective' | 'corrective';
export type ControlNature = 'manual' | 'semi_automated' | 'automated';

export interface ControlRecord {
  id: string;
  controlCode: string;
  controlName: string;
  controlType: ControlType;
  controlNature: ControlNature;
  controlFrequency: string;
  processId: string;
  description: string;
  status: string;
  effectivenessRating: string;
  createdAt: string;
  updatedAt: string;
}

export const CONTROL_TYPE_MAP: Record<ControlType, { label: string; color: string }> = {
  preventive: { label: '预防性控制', color: '#1a365d' },
  detective: { label: '检测性控制', color: '#1890ff' },
  corrective: { label: '纠正性控制', color: '#722ed1' },
};

export const CONTROL_NATURE_MAP: Record<ControlNature, string> = {
  manual: '人工',
  semi_automated: '半自动',
  automated: '自动',
};
