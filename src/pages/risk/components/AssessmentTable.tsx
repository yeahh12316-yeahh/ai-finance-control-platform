import { Table, Tag } from 'antd';
import type { RiskAssessment } from '@/types/risk';
import { riskLevelOptions } from '@/types/risk';

interface AssessmentTableProps {
  dataSource: RiskAssessment[];
  loading?: boolean;
  pagination?: object | false;
}

const columns = [
  {
    title: '风险ID',
    dataIndex: 'riskId',
    key: 'riskId',
    width: 120,
  },
  {
    title: '固有影响评分',
    dataIndex: 'inherentImpact',
    key: 'inherentImpact',
    width: 110,
    align: 'center' as const,
  },
  {
    title: '固有可能性评分',
    dataIndex: 'inherentLikelihood',
    key: 'inherentLikelihood',
    width: 120,
    align: 'center' as const,
  },
  {
    title: '固有风险等级',
    dataIndex: 'inherentRiskLevel',
    key: 'inherentRiskLevel',
    width: 110,
    render: (level: string) => {
      const opt = riskLevelOptions.find((o) => o.value === level);
      return <Tag color={opt?.color}>{level}</Tag>;
    },
  },
  {
    title: '控制有效性',
    dataIndex: 'controlEffectiveness',
    key: 'controlEffectiveness',
    width: 110,
    render: (val: string) => {
      const colorMap: Record<string, string> = {
        effective: '#52c41a',
        partially_effective: '#faad14',
        ineffective: '#ff4d4f',
      };
      const labelMap: Record<string, string> = {
        effective: '有效',
        partially_effective: '部分有效',
        ineffective: '无效',
      };
      return <Tag color={colorMap[val] || '#d9d9d9'}>{labelMap[val] || val}</Tag>;
    },
  },
  {
    title: '剩余影响评分',
    dataIndex: 'residualImpact',
    key: 'residualImpact',
    width: 110,
    align: 'center' as const,
  },
  {
    title: '剩余可能性评分',
    dataIndex: 'residualLikelihood',
    key: 'residualLikelihood',
    width: 120,
    align: 'center' as const,
  },
  {
    title: '剩余风险等级',
    dataIndex: 'residualRiskLevel',
    key: 'residualRiskLevel',
    width: 110,
    render: (level: string) => {
      const opt = riskLevelOptions.find((o) => o.value === level);
      return <Tag color={opt?.color}>{level}</Tag>;
    },
  },
  {
    title: '评估人',
    dataIndex: 'assessedBy',
    key: 'assessedBy',
    width: 100,
  },
  {
    title: '评估时间',
    dataIndex: 'assessedAt',
    key: 'assessedAt',
    width: 160,
    render: (val: string) => new Date(val).toLocaleString('zh-CN'),
  },
  {
    title: '备注',
    dataIndex: 'comments',
    key: 'comments',
    ellipsis: true,
  },
];

function AssessmentTable({ dataSource, loading = false, pagination = false }: AssessmentTableProps) {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      loading={loading}
      pagination={pagination}
      scroll={{ x: 1400 }}
      size="middle"
    />
  );
}

export default AssessmentTable;
