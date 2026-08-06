import { useState, useMemo, useCallback } from 'react';
import {
  Table,
  Tag,
  Tooltip,
  Popconfirm,
  Button,
  Modal,
  Select,
  Form,
  message,
} from 'antd';
import { PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { RCMMapping, MappingType } from '@/types/rcm';
import { MAPPING_TYPE_MAP } from '@/types/rcm';
import type { ControlRecord } from '@/types/control';
import { CONTROL_TYPE_MAP } from '@/types/control';

export interface RiskRow {
  id: string;
  riskCode: string;
  riskName: string;
  riskLevel: string;
  categoryName: string;
  controlMappings: Map<string, RCMMapping>;
}

interface RCMMatrixTableProps {
  risks: RiskRow[];
  controls: ControlRecord[];
  mappings: RCMMapping[];
  loading?: boolean;
  onAddMapping?: (riskId: string, controlId: string, mappingType: MappingType) => void;
  onDeleteMapping?: (mapping: RCMMapping) => void;
}

const RISK_LEVEL_COLOR: Record<string, string> = {
  '高': '#ff4d4f',
  '中': '#fa8c16',
  '低': '#52c41a',
};

const MAPPING_COLORS: Record<string, string> = {
  'direct': '#52c41a',
  'indirect': '#1890ff',
  'compensating': '#fa8c16',
};

function RCMMatrixTable({
  risks,
  controls,
  mappings,
  loading,
  onAddMapping,
  onDeleteMapping,
}: RCMMatrixTableProps) {
  const [mappingModalOpen, setMappingModalOpen] = useState(false);
  const [currentRiskId, setCurrentRiskId] = useState<string>('');
  const [currentControlId, setCurrentControlId] = useState<string>('');
  const [currentMapping, setCurrentMapping] = useState<RCMMapping | null>(null);
  const [selectedMappingType, setSelectedMappingType] = useState<MappingType>('direct');
  const [form] = Form.useForm();

  // Build a mapping lookup: riskId -> controlId -> mapping
  const mappingLookup = useMemo(() => {
    const lookup = new Map<string, Map<string, RCMMapping>>();
    mappings.forEach((m) => {
      if (!lookup.has(m.riskId)) {
        lookup.set(m.riskId, new Map());
      }
      lookup.get(m.riskId)!.set(m.controlId, m);
    });
    return lookup;
  }, [mappings]);

  const handleCellClick = useCallback(
    (riskId: string, controlId: string) => {
      const riskMap = mappingLookup.get(riskId);
      const mapping = riskMap?.get(controlId);
      if (mapping) {
        // Show mapping detail
        setCurrentMapping(mapping);
        setCurrentRiskId(riskId);
        setCurrentControlId(controlId);
      } else {
        // Show add mapping modal
        setCurrentMapping(null);
        setCurrentRiskId(riskId);
        setCurrentControlId(controlId);
        setSelectedMappingType('direct');
        form.resetFields();
        setMappingModalOpen(true);
      }
    },
    [mappingLookup, form],
  );

  const handleAddMapping = () => {
    onAddMapping?.(currentRiskId, currentControlId, selectedMappingType);
    setMappingModalOpen(false);
    message.success('映射添加成功');
  };

  const handleDeleteMapping = () => {
    if (currentMapping) {
      onDeleteMapping?.(currentMapping);
      setCurrentMapping(null);
      message.success('映射已删除');
    }
  };

  // Build columns: fixed risk info columns + dynamic control columns
  const columns: ColumnsType<RiskRow> = useMemo(() => {
    const fixedCols: ColumnsType<RiskRow> = [
      {
        title: '风险代码',
        dataIndex: 'riskCode',
        key: 'riskCode',
        width: 110,
        fixed: 'left',
      },
      {
        title: '风险名称',
        dataIndex: 'riskName',
        key: 'riskName',
        width: 180,
        fixed: 'left',
        ellipsis: true,
      },
      {
        title: '风险等级',
        dataIndex: 'riskLevel',
        key: 'riskLevel',
        width: 90,
        fixed: 'left',
        render: (level: string) => (
          <Tag color={RISK_LEVEL_COLOR[level] || '#d9d9d9'}>{level}</Tag>
        ),
      },
    ];

    const controlCols: ColumnsType<RiskRow> = controls.map((ctrl) => ({
      title: (
        <Tooltip title={`${CONTROL_TYPE_MAP[ctrl.controlType]?.label || ctrl.controlType} - ${ctrl.controlName}`}>
          <div style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', height: 120, fontSize: 12, padding: 4 }}>
            {ctrl.controlCode}
          </div>
        </Tooltip>
      ),
      dataIndex: ctrl.id,
      key: ctrl.id,
      width: 70,
      align: 'center',
      render: (_: unknown, record: RiskRow) => {
        const mapping = record.controlMappings.get(ctrl.id);
        if (mapping) {
          return (
            <Tooltip
              title={
                <div>
                  <div>
                    映射类型：
                    <Tag color={MAPPING_TYPE_MAP[mapping.mappingType]?.color}>
                      {MAPPING_TYPE_MAP[mapping.mappingType]?.label}
                    </Tag>
                  </div>
                  <div>有效性：{mapping.effectivenessRating}</div>
                  <div>
                    测试日期：
                    {new Date(mapping.lastTestedDate).toLocaleDateString('zh-CN')}
                  </div>
                  <div style={{ marginTop: 4 }}>点击查看详情或删除</div>
                </div>
              }
            >
              <CheckCircleOutlined
                style={{
                  fontSize: 20,
                  color: MAPPING_COLORS[mapping.mappingType] || '#52c41a',
                  cursor: 'pointer',
                }}
                onClick={() => handleCellClick(record.id, ctrl.id)}
              />
            </Tooltip>
          );
        }
        return (
          <Tooltip title={`添加映射：${record.riskCode} ← ${ctrl.controlCode}`}>
            <PlusOutlined
              style={{
                fontSize: 18,
                color: '#d9d9d9',
                cursor: 'pointer',
              }}
              onClick={() => handleCellClick(record.id, ctrl.id)}
            />
          </Tooltip>
        );
      },
    }));

    return [...fixedCols, ...controlCols];
  }, [controls, handleCellClick]);

  return (
    <>
      <Table<RiskRow>
        columns={columns}
        dataSource={risks}
        rowKey="id"
        loading={loading}
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条风险`,
        }}
        bordered
      />

      {/* Add mapping modal */}
      <Modal
        title="添加映射"
        open={mappingModalOpen}
        onOk={handleAddMapping}
        onCancel={() => setMappingModalOpen(false)}
        width={400}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item label="风险">
            <InputDisplay
              value={
                risks.find((r) => r.id === currentRiskId)?.riskCode +
                ' - ' +
                risks.find((r) => r.id === currentRiskId)?.riskName
              }
            />
          </Form.Item>
          <Form.Item label="控制措施">
            <InputDisplay
              value={
                controls.find((c) => c.id === currentControlId)?.controlCode +
                ' - ' +
                controls.find((c) => c.id === currentControlId)?.controlName
              }
            />
          </Form.Item>
          <Form.Item label="映射类型" required>
            <Select
              value={selectedMappingType}
              onChange={(v) => setSelectedMappingType(v)}
              options={Object.entries(MAPPING_TYPE_MAP).map(([value, item]) => ({
                label: item.label,
                value,
              }))}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Mapping detail modal */}
      <Modal
        title="映射详情"
        open={!!currentMapping}
        onCancel={() => setCurrentMapping(null)}
        footer={[
          <Button key="cancel" onClick={() => setCurrentMapping(null)}>
            关闭
          </Button>,
          <Popconfirm
            key="delete"
            title="确认删除"
            description="确定要删除该映射吗？"
            onConfirm={handleDeleteMapping}
            okText="确定"
            cancelText="取消"
          >
            <Button danger>删除映射</Button>
          </Popconfirm>,
        ]}
        width={400}
      >
        {currentMapping && (
          <div style={{ padding: '8px 0' }}>
            <p>
              <strong>映射类型：</strong>
              <Tag color={MAPPING_TYPE_MAP[currentMapping.mappingType]?.color}>
                {MAPPING_TYPE_MAP[currentMapping.mappingType]?.label}
              </Tag>
            </p>
            <p>
              <strong>有效性评级：</strong>
              {currentMapping.effectivenessRating}
            </p>
            <p>
              <strong>最近测试日期：</strong>
              {new Date(currentMapping.lastTestedDate).toLocaleDateString('zh-CN')}
            </p>
            <p>
              <strong>风险：</strong>
              {risks.find((r) => r.id === currentMapping.riskId)?.riskCode} -{' '}
              {risks.find((r) => r.id === currentMapping.riskId)?.riskName}
            </p>
            <p>
              <strong>控制措施：</strong>
              {controls.find((c) => c.id === currentMapping.controlId)?.controlCode} -{' '}
              {controls.find((c) => c.id === currentMapping.controlId)?.controlName}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}

function InputDisplay({ value }: { value: string }) {
  return (
    <div
      style={{
        padding: '4px 11px',
        border: '1px solid #d9d9d9',
        borderRadius: 6,
        backgroundColor: '#f5f5f5',
        color: '#595959',
      }}
    >
      {value}
    </div>
  );
}

export default RCMMatrixTable;
