export type MappingType = 'direct' | 'indirect' | 'compensating';

export interface RCMMapping {
  id: string;
  riskId: string;
  controlId: string;
  mappingType: MappingType;
  effectivenessRating: string;
  lastTestedDate: string;
  riskCode?: string;
  riskName?: string;
  controlCode?: string;
  controlName?: string;
}

export const MAPPING_TYPE_MAP: Record<MappingType, { label: string; color: string }> = {
  direct: { label: '直接控制', color: '#52c41a' },
  indirect: { label: '间接控制', color: '#1890ff' },
  compensating: { label: '补偿性控制', color: '#fa8c16' },
};
