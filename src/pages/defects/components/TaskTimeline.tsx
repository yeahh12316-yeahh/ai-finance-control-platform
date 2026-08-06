import { Timeline, Tag, Typography } from 'antd';
import {
  BugOutlined,
  ToolOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import type { DefectTask } from '@/types/defect';
import { TASK_STATUS_MAP, TASK_PRIORITY_MAP } from '@/types/defect';
import type { TaskStatus, TaskPriority } from '@/types/defect';

const { Text } = Typography;

interface TaskTimelineProps {
  tasks: DefectTask[];
}

const STATUS_ICONS: Record<TaskStatus, React.ReactNode> = {
  pending: <BugOutlined />,
  in_progress: <ToolOutlined />,
  completed: <CheckCircleOutlined />,
};

export default function TaskTimeline({ tasks }: TaskTimelineProps) {
  if (!tasks || tasks.length === 0) {
    return <Text type="secondary">暂无任务</Text>;
  }

  const items = tasks.map((task) => {
    const statusConfig = TASK_STATUS_MAP[task.status as TaskStatus];
    const priorityConfig = TASK_PRIORITY_MAP[task.priority as TaskPriority];

    return {
      color: statusConfig?.color === 'success' ? 'green' :
             statusConfig?.color === 'processing' ? 'blue' :
             'gray',
      dot: STATUS_ICONS[task.status as TaskStatus],
      children: (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Text strong style={{ fontSize: 13 }}>{task.taskName}</Text>
            <Tag color={statusConfig?.color} style={{ fontSize: 11 }}>
              {statusConfig?.label}
            </Tag>
            <Tag color={priorityConfig?.color} style={{ fontSize: 11 }}>
              {priorityConfig?.label}
            </Tag>
          </div>
          <div style={{ marginTop: 4 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              负责人: {task.assignee} | 截止: {new Date(task.dueDate).toLocaleDateString('zh-CN')}
            </Text>
          </div>
        </div>
      ),
    };
  });

  return <Timeline items={items} />;
}
