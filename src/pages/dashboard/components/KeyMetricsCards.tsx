import { Row, Col, Card, Statistic } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import type { MetricCardData } from '@/types/dashboard';

interface KeyMetricsCardsProps {
  metrics: MetricCardData[];
}

export default function KeyMetricsCards({ metrics }: KeyMetricsCardsProps) {
  const getTrendIcon = (trend?: 'up' | 'down' | 'stable', color?: string) => {
    if (trend === 'up') {
      return <ArrowUpOutlined style={{ color: color || '#52c41a', fontSize: 14 }} />;
    }
    if (trend === 'down') {
      return <ArrowDownOutlined style={{ color: color || '#ff4d4f', fontSize: 14 }} />;
    }
    return null;
  };

  return (
    <Row gutter={16}>
      {metrics.map((metric, index) => (
        <Col span={6} key={index}>
          <Card hoverable>
            <Statistic
              title={metric.title}
              value={metric.value}
              prefix={metric.prefix}
              suffix={metric.suffix}
              valueStyle={{
                color: metric.color || '#1890ff',
                fontSize: 28,
                fontWeight: 600,
              }}
            />
            {metric.trend && metric.trendValue !== undefined && (
              <div style={{ marginTop: 8, fontSize: 13, color: '#666' }}>
                {getTrendIcon(metric.trend, metric.color)}
                <span style={{ marginLeft: 4 }}>
                  较上月
                  {metric.trend === 'up' ? '增长' : '下降'}
                  {metric.trendValue}%
                </span>
              </div>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
}
