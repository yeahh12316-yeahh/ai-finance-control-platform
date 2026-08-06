import { useState } from 'react';
import { Card, Tag, Typography, Badge, Empty } from 'antd';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HolderOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { DefectRecord } from '@/types/defect';
import { SEVERITY_MAP, REMEDIATION_STATUS_MAP } from '@/types/defect';
import type { DefectSeverity, RemediationStatus } from '@/types/defect';

const { Text } = Typography;

interface KanbanColumn {
  status: RemediationStatus;
  title: string;
  color: string;
  items: DefectRecord[];
}

interface TaskKanbanProps {
  columns: KanbanColumn[];
  onDragEnd: (defectId: string, targetStatus: RemediationStatus) => void;
}

function SortableCard({ defect }: { defect: DefectRecord }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: defect.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    marginBottom: 8,
  };

  const severityConfig = SEVERITY_MAP[defect.severity as DefectSeverity];

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card
        size="small"
        hoverable
        extra={
          <HolderOutlined
            {...listeners}
            style={{ cursor: 'grab', color: '#999' }}
          />
        }
      >
        <div style={{ marginBottom: 8 }}>
          <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
            {defect.defectCode}
          </Text>
          <Text style={{ fontSize: 13 }}>{defect.defectName}</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tag color={severityConfig?.color} style={{ fontSize: 11 }}>
            {severityConfig?.label || defect.severity}
          </Tag>
          <div>
            <Text type="secondary" style={{ fontSize: 11 }}>
              <UserOutlined style={{ marginRight: 2 }} />
              {defect.assignedTo}
            </Text>
          </div>
        </div>
        {defect.dueDate && (
          <div style={{ marginTop: 6 }}>
            <Text
              type={new Date(defect.dueDate) < new Date() ? 'danger' : 'secondary'}
              style={{ fontSize: 11 }}
            >
              <ClockCircleOutlined style={{ marginRight: 4 }} />
              {new Date(defect.dueDate).toLocaleDateString('zh-CN')}
            </Text>
          </div>
        )}
      </Card>
    </div>
  );
}

export default function TaskKanban({ columns, onDragEnd }: TaskKanbanProps) {
  const [activeDefect, setActiveDefect] = useState<DefectRecord | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: { active: { id: string } }) => {
    const defect = columns
      .flatMap((col) => col.items)
      .find((d) => d.id === event.active.id);
    setActiveDefect(defect || null);
  };

  const handleDragEnd = (event: { active: { id: string }; over: { id: string } | null }) => {
    const { active, over } = event;

    if (!over) {
      setActiveDefect(null);
      return;
    }

    const activeId = active.id as string;

    // Check if dropped into a column
    const targetColumn = columns.find((col) => col.status === over.id);
    if (targetColumn) {
      const sourceColumn = columns.find((col) =>
        col.items.some((item) => item.id === activeId)
      );

      if (sourceColumn && sourceColumn.status !== targetColumn.status) {
        onDragEnd(activeId, targetColumn.status);
      }
    } else {
      // Check if dropped onto another card (find target column)
      const overColumn = columns.find((col) =>
        col.items.some((item) => item.id === over.id)
      );
      if (overColumn) {
        const sourceColumn = columns.find((col) =>
          col.items.some((item) => item.id === activeId)
        );
        if (sourceColumn && sourceColumn.status !== overColumn.status) {
          onDragEnd(activeId, overColumn.status);
        }
      }
    }

    setActiveDefect(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          minHeight: 400,
        }}
      >
        {columns.map((column) => (
          <SortableContext
            key={column.status}
            id={column.status}
            items={column.items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div>
              <div
                style={{
                  background: column.color,
                  color: '#fff',
                  padding: '8px 12px',
                  borderRadius: '6px 6px 0 0',
                  fontWeight: 600,
                  fontSize: 14,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{column.title}</span>
                <Badge
                  count={column.items.length}
                  style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                />
              </div>
              <div
                style={{
                  background: '#fafafa',
                  border: '1px solid #f0f0f0',
                  borderTop: 'none',
                  borderRadius: '0 0 6px 6px',
                  padding: '8px',
                  minHeight: 300,
                }}
              >
                {column.items.length === 0 ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 280,
                      color: '#d9d9d9',
                    }}
                  >
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="暂无任务"
                      style={{ fontSize: 12 }}
                    />
                  </div>
                ) : (
                  column.items.map((item) => (
                    <SortableCard key={item.id} defect={item} />
                  ))
                )}
              </div>
            </div>
          </SortableContext>
        ))}
      </div>

      <DragOverlay>
        {activeDefect ? (
          <Card size="small" style={{ width: 240, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <div style={{ marginBottom: 8 }}>
              <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
                {activeDefect.defectCode}
              </Text>
              <Text style={{ fontSize: 13 }}>{activeDefect.defectName}</Text>
            </div>
            <Tag
              color={SEVERITY_MAP[activeDefect.severity as DefectSeverity]?.color}
              style={{ fontSize: 11 }}
            >
              {SEVERITY_MAP[activeDefect.severity as DefectSeverity]?.label}
            </Tag>
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
