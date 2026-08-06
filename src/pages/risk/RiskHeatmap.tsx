import { useEffect, useState, useMemo } from 'react';
import { Card, Select, Row, Col, Statistic, Modal, Table, Spin } from 'antd';
import { WarningOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { getRisks, getRiskCategories } from '@/services/risk';
import { getProcesses } from '@/services/process';
import type { RiskItem, RiskCategory } from '@/types/risk';
import { riskLevelOptions } from '@/types/risk';
import StatusTag from '@/components/StatusTag';

interface ProcessItem {
  id: string;
  processName: string;
}

const riskLevelTagOptions = riskLevelOptions.map((l) => ({
  value: l.value,
  label: l.label,
  color: l.color,
}));

function RiskHeatmap() {
  const [allRisks, setAllRisks] = useState<RiskItem[]>([]);
  const [categories, setCategories] = useState<RiskCategory[]>([]);
  const [processes, setProcesses] = useState<ProcessItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [drillModalVisible, setDrillModalVisible] = useState(false);
  const [drillRisks, setDrillRisks] = useState<RiskItem[]>([]);
  const [drillTitle, setDrillTitle] = useState('');

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
        if (procRes.data) setProcesses(procRes.data as ProcessItem[]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredRisks = useMemo(() => {
    return allRisks.filter((r) => {
      if (selectedCategory && r.categoryId !== selectedCategory) return false;
      return true;
    });
  }, [allRisks, selectedCategory]);

  const flattenCategories = (list: RiskCategory[]): { label: string; value: string }[] => {
    return list.flatMap((c) => [
      { label: c.categoryName, value: c.id },
      ...(c.children ? flattenCategories(c.children) : []),
    ]);
  };

  const categoryList = useMemo(() => {
    const flat = flattenCategories(categories);
    // Get categories that have risks
    return flat.filter((cat) =>
      filteredRisks.some((r) => r.categoryId === cat.value),
    );
  }, [categories, filteredRisks]);

  // Use processes that have risks for the Y axis
  const processList = useMemo(() => {
    const procIds = new Set(filteredRisks.map((r) => r.processId));
    return processes.filter((p) => procIds.has(p.id));
  }, [processes, filteredRisks]);

  const heatmapData = useMemo(() => {
    const data: [number, number, number][] = [];
    const xData = categoryList.map((c) => c.value);
    const yData = processList.map((p) => p.id);

    yData.forEach((processId, yIdx) => {
      xData.forEach((categoryId, xIdx) => {
        const risks = filteredRisks.filter(
          (r) => r.categoryId === categoryId && r.processId === processId,
        );
        // Calculate a weighted score based on risk levels
        const score = risks.reduce((sum, r) => {
          const s = r.residualImpact * r.residualLikelihood;
          return sum + s;
        }, 0);
        data.push([xIdx, yIdx, score]);
      });
    });

    return data;
  }, [filteredRisks, categoryList, processList]);

  const maxScore = Math.max(...heatmapData.map((d) => d[2]), 1);

  const stats = useMemo(() => {
    const extreme = filteredRisks.filter((r) => r.residualRiskLevel === '极高').length;
    const high = filteredRisks.filter((r) => r.residualRiskLevel === '高').length;
    const medium = filteredRisks.filter((r) => r.residualRiskLevel === '中').length;
    const low = filteredRisks.filter((r) => r.residualRiskLevel === '低').length;
    return { extreme, high, medium, low, total: filteredRisks.length };
  }, [filteredRisks]);

  const chartOption: EChartsOption = useMemo(() => {
    return {
      tooltip: {
        position: 'top',
        formatter: (params: unknown) => {
          const p = params as { value: [number, number, number] };
          if (!p?.value) return '';
          const catIdx = p.value[0];
          const procIdx = p.value[1];
          const score = p.value[2];
          const catName = categoryList[catIdx]?.label || '';
          const procName = processList[procIdx]?.processName || '';

          const risksInCell = filteredRisks.filter(
            (r) =>
              r.categoryId === categoryList[catIdx]?.value &&
              r.processId === processList[procIdx]?.id,
          );

          const highCount = risksInCell.filter((r) => r.residualRiskLevel === '高' || r.residualRiskLevel === '极高').length;

          return `
            <div style="padding:8px">
              <strong>${catName} - ${procName}</strong><br/>
              风险总数：${risksInCell.length} 条<br/>
              其中高风险：${highCount} 条<br/>
              综合评分：${score}<br/>
              <em>点击查看详情</em>
            </div>
          `;
        },
      },
      grid: {
        left: 120,
        right: 40,
        top: 40,
        bottom: 80,
      },
      xAxis: {
        type: 'category',
        data: categoryList.map((c) => c.label),
        name: '风险分类',
        nameLocation: 'center',
        nameGap: 35,
        axisLabel: {
          rotate: 30,
          interval: 0,
          fontSize: 11,
        },
        splitArea: { show: true },
      },
      yAxis: {
        type: 'category',
        data: processList.map((p) => p.processName),
        name: '业务流程',
        nameLocation: 'center',
        nameGap: 80,
        axisLabel: {
          fontSize: 11,
          width: 100,
          overflow: 'truncate',
        },
        splitArea: { show: true },
      },
      visualMap: {
        min: 0,
        max: maxScore,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
        inRange: {
          color: ['#f0f5ff', '#bae7ff', '#69c0ff', '#ffd666', '#ff7a45', '#ff4d4f'],
        },
        text: ['高', '低'],
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
            fontSize: 11,
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
  }, [heatmapData, categoryList, processList, filteredRisks, maxScore]);

  const handleChartClick = (params: Record<string, unknown>) => {
    if (params.value && Array.isArray(params.value)) {
      const catIdx = params.value[0] as number;
      const procIdx = params.value[1] as number;
      const cat = categoryList[catIdx];
      const proc = processList[procIdx];

      if (cat && proc) {
        const risksInCell = filteredRisks.filter(
          (r) => r.categoryId === cat.value && r.processId === proc.id,
        );

        if (risksInCell.length > 0) {
          setDrillTitle(`${cat.label} - ${proc.processName}`);
          setDrillRisks(risksInCell);
          setDrillModalVisible(true);
        }
      }
    }
  };

  const drillColumns = [
    { title: '风险代码', dataIndex: 'riskCode', width: 100 },
    { title: '风险名称', dataIndex: 'riskName', width: 200 },
    {
      title: '固有风险等级',
      dataIndex: 'inherentRiskLevel',
      width: 110,
      render: (level: string) => (
        <StatusTag status={level} options={riskLevelTagOptions} />
      ),
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
      {/* Stats */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card size="small">
            <Statistic title="风险总数" value={stats.total} prefix={<WarningOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="极高+高风险"
              value={stats.extreme + stats.high}
              prefix={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="中风险"
              value={stats.medium}
              prefix={<WarningOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
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

      {/* Filter */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Select
            placeholder="选择风险分类（可选筛选）"
            allowClear
            style={{ width: '100%' }}
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={flattenCategories(categories)}
          />
        </Col>
      </Row>

      {/* Heatmap */}
      <Card title="风险热力图（分类 × 流程）" loading={loading}>
        <ReactECharts
          option={chartOption}
          style={{ height: 600, width: '100%' }}
          onEvents={{ click: handleChartClick }}
          opts={{ renderer: 'canvas' }}
        />
        <div style={{ marginTop: 16, textAlign: 'center', color: '#999' }}>
          提示：颜色越深代表风险评分越高，点击单元格可查看该分类-流程下的风险详情
        </div>
      </Card>

      {/* Drill-down Modal */}
      <Modal
        title={`风险详情 - ${drillTitle}`}
        open={drillModalVisible}
        onCancel={() => setDrillModalVisible(false)}
        footer={null}
        width={800}
      >
        <Table
          columns={drillColumns}
          dataSource={drillRisks}
          rowKey="id"
          pagination={false}
          size="small"
        />
      </Modal>
    </div>
  );
}

export default RiskHeatmap;
