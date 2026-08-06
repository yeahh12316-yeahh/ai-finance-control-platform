import { useState, useEffect, useCallback } from 'react';
import { Card, Spin, Typography, message } from 'antd';
import { getDefects, updateDefect } from '@/services/defect';
import type { DefectRecord } from '@/types/defect';
import { REMEDIATION_STATUS_MAP } from '@/types/defect';
import type { RemediationStatus } from '@/types/defect';
import TaskKanban from './components/TaskKanban';

const { Title } = Typography;

const KANBAN_COLUMNS: Array<{
  status: RemediationStatus;
  title: string;
  color: string;
}> = [
  { status: 'pending', title: '待整改', color: '#d9d9d9' },
  { status: 'in_progress', title: '整改中', color: '#1890ff' },
  { status: 'completed', title: '待验证', color: '#722ed1' },
  { status: 'closed', title: '已关闭', color: '#52c41a' },
];

export default function TaskBoardPage() {
  const [loading, setLoading] = useState(false);
  const [defects, setDefects] = useState<DefectRecord[]>([]);
  const [dragging, setDragging] = useState(false);

  const fetchDefects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getDefects({ page: 1, pageSize: 1000 });
      setDefects(res.data.list);
    } catch {
      // mock data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDefects();
  }, [fetchDefects]);

  const getDefectsByStatus = (status: RemediationStatus) => {
    return defects.filter((d) => d.remediationStatus === status);
  };

  const handleDragEnd = async (defectId: string, targetStatus: RemediationStatus) => {
    setDragging(true);
    try {
      // Optimistic update
      setDefects((prev) =>
        prev.map((d) =>
          d.id === defectId ? { ...d, remediationStatus: targetStatus } : d
        )
      );
      await updateDefect(defectId, { remediationStatus: targetStatus } as Partial<DefectRecord>);
      message.success(`缺陷状态已更新为"${REMEDIATION_STATUS_MAP[targetStatus].label}"`);
    } catch {
      message.error('状态更新失败');
      fetchDefects(); // Rollback on error
    } finally {
      setDragging(false);
    }
  };

  const columnData = KANBAN_COLUMNS.map((col) => ({
    ...col,
    items: getDefectsByStatus(col.status),
  }));

  return (
    <Spin spinning={loading || dragging}>
      <div style={{ padding: '0 0 16px 0' }}>
        <Title level={5} style={{ marginBottom: 16 }}>
          任务看板
        </Title>
        <TaskKanban
          columns={columnData}
          onDragEnd={handleDragEnd}
        />
      </div>
    </Spin>
  );
}
