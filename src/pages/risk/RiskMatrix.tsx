import { useEffect, useState, useMemo } from 'react';
import {
  Row, Col, Card, Statistic, Select, Modal, Table, Space, Tag,
} from 'antd';
import {
  WarningOutlined, CloseCircleOutlined, CheckCircleOutlined,
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { getRisks, getRiskCategories } from '@/services/risk';
import { getProcesses } from '@/services/process';
import type { RiskItem, RiskCategory } from '@/types/risk';
import { riskLevelOptions } from '@/types/risk';
import StatusTag from '@/components/StatusTag';

const impactLabels = ['极低', '低', '中', '高', '极高'];
const likelihoodLabels = ['极低', '低', '中', '高', '极高'];

interface MatrixCellData {
  impact: number;
  likelihood: number;
  count: number;
  riskLevel: string;
  risks: RiskItem[];
}

function calculateCellLevel(impact: number, likelihood: number): string {
  const score = impact * likelihood;
  if (score >= 20) return '极高';
  if (score >= 12) return '高';
  if (score >= 6) return '中';
  return '低';
}

const riskLevelTagOptions = riskLevelOptions.map((l) => ({
  value: l.value,
  label: l.label,
  color: l.color,
}));

function RiskMatrix() {
  const [allRisks, setAllRisks] = useState<RiskItem[]>([]);
  const [categories, setCategories] = useState<RiskCategory[]>([]);
  const [processes, setProcesses] = useState<Array<{ id: string; processName: string }>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedProcess, setSelectedProcess] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [detailRisks, setDetailRisks] = useState<RiskItem[]>([]);
  const [detailCell, setDetailCell] = useState<{ impact: number; likelihood: number } | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getRisks({ page: 1, pageSize: 200 }),
      getRiskCategories(),
      getProcesses(),
    ])
      .then(([risksRes, catRes, procRes]) => {
        if (risksRes.data?.list) setAllRisks(risksRes.data.list);
        if (catRes.data) setCategories(catRes.data);
        if (procRes.data) setProcesses(procRes.data as Array<{ id: string; processName: string }>);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredRisks = useMemo(() => {
    return allRisks.filter((r) => {
      if (selectedCategory && r.categoryId !== selectedCategory) return false;
      if (selectedProcess && r.processId !== selectedProcess) return false;
      return true;
    });
  }, [allRisks, selectedCategory, selectedProcess]);

  const matrixData = useMemo(() => {
    const matrix: Record<string, MatrixCellData> = {};

    for (let impact = 1; impact <= 5; impact++) {
      for (let likelihood = 1; likelihood <= 5; likelihood++) {
        const key = `${impact}_${likelihood}`;
        matrix[key] = {
          impact,
          likelihood,
          count: 0,
          riskLevel: calculateCellLevel(impact, likelihood),
          risks: [],
        };
      }
    }

    filteredRisks.forEach((risk) => {
      const key = `${risk.residualImpact}_${risk.residualLikelihood}`;
      if (matrix[key]) {
        matrix[key].count++;
        matrix[key].risks.push(risk);
      }
    });

    return Object.values(matrix);
  }, [filteredRisks]);

  const stats = useMemo(() => {
    const extreme = filteredRisks.filter((r) => r.residualRiskLevel === '极高').length;
    const high = filteredRisks.filter((r) => r.residualRiskLevel === '高').length;
    const medium = filteredRisks.filter((r) => r.residualRiskLevel === '中').length;
    const low = filteredRisks.filter((r) => r.residualRiskLevel === '低').length;
    return { extreme, high, medium, low, total: filteredRisks.length };
  }, [filteredRisks]);

  const chartOption: EChartsOption = useMemo(() => {
    const heatmapData: [number, number, number][] = matrixData.map((cell) => [
      cell.likelihood - 1,
      4 - (cell.impact - 1), // Reverse Y axis: 极高 on top
      cell.count,
    ]);

    const maxCount = Math.max(...matrixData.map((c) => c.count), 1);

    return {
      tooltip: {
        position: 'top',
        formatter: (params: unknown) => {
          const p = params as { value: [number, number, number] };
          if (!p?.value) return '';
          const likelihoodIdx = p.value[0];
          const impactIdx = 4 - p.value[1];
          const count = p.value[2];
          const impact = impactIdx + 1;
          const likelihood = likelihoodIdx + 1;
          const cell = matrixData.find(
            (c) => c.impact === impact && c.likelihood === likelihood,
          );
          const level = cell?.riskLevel || '';
          return `
            <div style="padding:8px">
              <strong>影响程度：${impactLabels[impactIdx]} | 可能性：${likelihoodLabels[likelihoodIdx]}</strong><br/>
              风险等级：<span style="color:${riskLevelOptions.find((o) => o.value === level)?.color || '#333'}">${level}</span><br/>
              风险数量：${count} 条<br/>
              <em>点击查看详情</em>
            </div>
          `;
        },
      },
      grid: {
        left: 80,
        right: 40,
        top: 60,
        bottom: 40,
      },
      xAxis: {
        type: 'category',
        data: likelihoodLabels,
        name: '可能性',
        nameLocation: 'center',
        nameGap: 30,
        position: 'bottom',
        splitArea: { show: true },
      },
      yAxis: {
        type: 'category',
        data: [...impactLabels].reverse(), // 极高 on top
        name: '影响程度',
        nameLocation: 'center',
        nameGap: 50,
        splitArea: { show: true },
      },
      visualMap: {
        min: 0,
        max: maxCount,
        calculable: true,
        orient: 'vertical',
        left: 0,
        top: 'center',
        inRange: {
          color: ['#52c41a', '#a0d911', '#faad14', '#ff7a45', '#ff4d4f'],
        },
        text: ['多', '少'],
      },
      series: [
        {
          type: 'heatmap',
          data: heatmapData,
          label: {
            show: true,
            color: '#000',
            formatter: (params: unknown) => {
              const p = params as { value: [number, number, number] };
              return p.value[2] > 0 ? String(p.value[2]) : '';
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              borderColor: '#333',
              borderWidth: 2,
            },
          },
        },
      ],
    };
  }, [matrixData]);

  const handleChartClick = (params: Record<string, unknown>) => {
    if (params.value && Array.isArray(params.value)) {
      const likelihoodIdx = params.value[0] as number;
      const impactIdx = 4 - (params.value[1] as number);
      const impact = impactIdx + 1;
      const likelihood = likelihoodIdx + 1;
      const cell = matrixData.find(
        (c) => c.impact === impact && c.likelihood === likelihood,
      );

      if (cell && cell.risks.length > 0) {
        setDetailCell({ impact, likelihood });
        setDetailRisks(cell.risks);
        setDetailModalVisible(true);
      }
    }
  };

  const flattenCategories = (list: RiskCategory[]): { label: string; value: string }[] => {
    return list.flatMap((c) => [
      { label: c.categoryName, value: c.id },
      ...(c.children ? flattenCategories(c.children) : []),
    ]);
  };

  const detailColumns = [
    { title: '风险代码', dataIndex: 'riskCode', width: 100 },
    { title: '风险名称', dataIndex: 'riskName', width: 200 },
    {
      title: '风险分类',
      dataIndex: 'categoryId',
      width: 100,
      render: (id: string) => {
        const cat = flattenCategories(categories).find((c) => c.value === id);
        return cat?.label || id;
      },
    },
    {
      title: '剩余风险等级',
      dataIndex: 'residualRiskLevel',
      width: 110,
      render: (level: string) => (
        <StatusTag status={level} options={riskLevelTagOptions} />
      ),
    },
    {
      title: '评分',
      key: 'score',
      width: 60,
      render: (_: unknown, record: RiskItem) => record.residualImpact * record.residualLikelihood,
    },
  ];

  return (
    <div>
      {/* Stats Summary */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={4}>
          <Card size="small">
            <Statistic
              title="风险总数"
              value={stats.total}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card size="small">
            <Statistic
              title="极高风险"
              value={stats.extreme}
              prefix={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card size="small">
            <Statistic
              title="高风险"
              value={stats.high}
              prefix={<WarningOutlined style={{ color: '#ff7a45' }} />}
              valueStyle={{ color: '#ff7a45' }}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card size="small">
            <Statistic
              title="中风险"
              value={stats.medium}
              prefix={<WarningOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card size="small">
            <Statistic
              title="低风险"
              value={stats.low}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Select
            placeholder="选择风险分类"
            allowClear
            style={{ width: '100%' }}
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={flattenCategories(categories)}
          />
        </Col>
        <Col span={8}>
          <Select
            placeholder="选择关联流程"
            allowClear
            style={{ width: '100%' }}
            value={selectedProcess}
            onChange={setSelectedProcess}
            options={processes.map((p) => ({ label: p.processName, value: p.id }))}
            showSearch
            filterOption={(input, option) =>
              (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Col>
      </Row>

      {/* Matrix Chart */}
      <Card title="风险评估矩阵（影响 × 可能性）" loading={loading}>
        <ReactECharts
          option={chartOption}
          style={{ height: 500, width: '100%' }}
          onEvents={{
            click: handleChartClick,
          }}
          opts={{ renderer: 'canvas' }}
        />
        <div style={{ marginTop: 16, textAlign: 'center', color: '#999' }}>
          提示：点击单元格查看该区域的风险详情列表
        </div>
      </Card>

      {/* Detail Modal */}
      <Modal
        title={
          detailCell
            ? `风险详情 - 影响程度：${impactLabels[detailCell.impact - 1]} | 可能性：${likelihoodLabels[detailCell.likelihood - 1]}`
            : '风险详情'
        }
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        <Table
          columns={detailColumns}
          dataSource={detailRisks}
          rowKey="id"
          pagination={false}
          size="small"
        />
      </Modal>
    </div>
  );
}

export default RiskMatrix;
