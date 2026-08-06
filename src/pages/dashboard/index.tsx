import { useState, useEffect } from 'react';
import { Row, Col, Spin, Card } from 'antd';
import PageContainer from '@/components/PageContainer';
import {
  getHealth,
  getRiskTrend,
  getSummary,
  getAlerts,
} from '@/services/dashboard';
import type {
  HealthData,
  RiskTrendData,
  SummaryData,
  AlertItem,
} from '@/types/dashboard';
import type { MetricCardData } from '@/types/dashboard';
import HealthGauge from './components/HealthGauge';
import KeyMetricsCards from './components/KeyMetricsCards';
import RiskTrendChart from './components/RiskTrendChart';
import AlertTimeline from './components/AlertTimeline';
import RiskDistributionChart from './components/RiskDistributionChart';
import DefectStatusChart from './components/DefectStatusChart';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [riskTrend, setRiskTrend] = useState<RiskTrendData | null>(null);
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [healthRes, trendRes, summaryRes, alertsRes] = await Promise.all([
        getHealth(),
        getRiskTrend('12m'),
        getSummary(),
        getAlerts({ page: 1, pageSize: 5 }),
      ]);
      setHealthData(healthRes.data);
      setRiskTrend(trendRes.data);
      setSummary(summaryRes.data);
      setAlerts(alertsRes.data.list);
    } catch {
      // mock data handled by MSW
    } finally {
      setLoading(false);
    }
  };

  const metrics: MetricCardData[] = [
    {
      title: '内控健康度',
      value: healthData?.overallScore || 0,
      suffix: '%',
      trend: 'up',
      trendValue: 3.2,
      color: '#1890ff',
    },
    {
      title: '风险总数',
      value: summary?.riskStats?.total || 0,
      suffix: '个',
      trend: 'down',
      trendValue: 5,
      color: '#faad14',
    },
    {
      title: '评价完成率',
      value: summary?.evaluationStats?.completionRate || 0,
      suffix: '%',
      trend: 'up',
      trendValue: 12,
      color: '#52c41a',
    },
    {
      title: '待整改缺陷数',
      value: summary?.defectStats?.pending || 0,
      suffix: '个',
      trend: 'down',
      trendValue: 3,
      color: '#ff4d4f',
    },
  ];

  return (
    <PageContainer
      title="管理驾驶舱"
      breadcrumb={[
        { title: '首页', path: '/' },
        { title: '管理驾驶舱' },
      ]}
    >
      <Spin spinning={loading}>
        {/* Key Metrics */}
        <KeyMetricsCards metrics={metrics} />

        {/* Charts Row */}
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={8}>
            <Card title="内控健康度">
              <HealthGauge value={healthData?.overallScore || 0} />
            </Card>
          </Col>
          <Col span={16}>
            <Card title="风险趋势">
              <RiskTrendChart data={riskTrend?.overallRiskScore || []} />
            </Card>
          </Col>
        </Row>

        {/* Bottom Row */}
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={12}>
            <Card title="风险分布">
              <RiskDistributionChart stats={summary?.riskStats} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="缺陷状态统计">
              <DefectStatusChart stats={summary?.defectStats} />
            </Card>
          </Col>
        </Row>

        {/* Alerts Timeline */}
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={24}>
            <Card title="最近预警">
              <AlertTimeline alerts={alerts} />
            </Card>
          </Col>
        </Row>
      </Spin>
    </PageContainer>
  );
}
