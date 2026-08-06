import { Timeline, Tag, Typography } from 'antd';
import {
  AlertOutlined,
  WarningOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import type { AlertItem } from '@/types/dashboard';
import { ALERT_LEVEL_MAP } from '@/types/dashboard';
import type { AlertLevel } from '@/types/dashboard';

const { Text } = Typography;

interface AlertTimelineProps {
  alerts: AlertItem[];
}

const LEVEL_ICONS: Record<AlertLevel, React.ReactNode> = {
  info: <InfoCircleOutlined />,
  warning: <WarningOutlined />,
  critical: <AlertOutlined />,
};

export default function AlertTimeline({ alerts }: AlertTimelineProps) {
  if (!alerts || alerts.length === 0) {
    return <Text type="secondary">暂无预警信息</Text>;
  }

  const items = alerts.map((alert) => {
    const levelConfig = ALERT_LEVEL_MAP[alert.alertLevel as AlertLevel];

    return {
      color: levelConfig?.color || 'blue',
      dot: LEVEL_ICONS[alert.alertLevel as AlertLevel],
      children: (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Text strong style={{ fontSize: 13 }}>{alert.title}</Text>
            <Tag color={levelConfig?.color} style={{ fontSize: 11 }}>
              {levelConfig?.label || alert.alertLevel}
            </Tag>
            <Text type="secondary" style={{ fontSize: 11 }}>
              {new Date(alert.createdAt).toLocaleString('zh-CN')}
            </Text>
          </div>
          <Text style={{ fontSize: 12 }}>{alert.description}</Text>
        </div>
      ),
    };
  });

  return <Timeline items={items} />;
}
