import { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  message,
  Tag,
  Popconfirm,
  Descriptions,
  Card,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import SearchForm from '@/components/SearchForm';
import EmptyState from '@/components/EmptyState';
import {
  getDefects,
  createDefect,
  updateDefect,
  deleteDefect,
} from '@/services/defect';
import type { DefectRecord } from '@/types/defect';
import {
  SEVERITY_MAP,
  DEFICIENCY_TYPE_MAP,
  DEFICIENCY_CATEGORY_MAP,
  REMEDIATION_STATUS_MAP,
  SOURCE_TYPE_MAP,
} from '@/types/defect';
import type {
  DefectSeverity,
  DeficiencyType,
  DeficiencyCategory,
  RemediationStatus,
  SourceType,
} from '@/types/defect';
import DefectForm from './components/DefectForm';

const { Paragraph } = Typography;

export default function DefectRegisterPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DefectRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DefectRecord | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewingRecord, setViewingRecord] = useState<DefectRecord | null>(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiResult, setAiResult] = useState<Array<{ why: number; answer: string }>>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTargetDefect, setAiTargetDefect] = useState<DefectRecord | null>(null);
  const [filters, setFilters] = useState<Record<string, unknown>>({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getDefects({ ...filters, ...pagination });
      setData(res.data.list);
      setTotal(res.data.total);
    } catch {
      // mock data
    } finally {
      setLoading(false);
    }
  }, [filters, pagination]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (values: Record<string, unknown>) => {
    setFilters(values);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleAdd = () => {
    setEditingRecord(null);
    setModalOpen(true);
  };

  const handleEdit = (record: DefectRecord) => {
    setEditingRecord(record);
    setModalOpen(true);
  };

  const handleView = (record: DefectRecord) => {
    setViewingRecord(record);
    setViewModalOpen(true);
  };

  const handleSubmit = async (values: Partial<DefectRecord>) => {
    try {
      if (editingRecord) {
        await updateDefect(editingRecord.id, values);
        message.success('更新成功');
      } else {
        await createDefect(values);
        message.success('创建成功');
      }
      setModalOpen(false);
      setEditingRecord(null);
      fetchData();
    } catch {
      message.error('操作失败');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDefect(id);
      message.success('删除成功');
      fetchData();
    } catch {
      message.error('删除失败');
    }
  };

  const handleAiAnalysis = async (record: DefectRecord) => {
    setAiTargetDefect(record);
    setAiResult([]);
    setAiLoading(true);
    setAiModalOpen(true);
    // Simulate 5-Why analysis
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const results = [
      {
        why: 1,
        answer: `为什么会出现"${record.defectName}"？—— 因为相关控制措施的设计或执行存在不足，未能有效防范该风险。`,
      },
      {
        why: 2,
        answer: `为什么控制措施存在不足？—— 因为控制措施的设计没有充分覆盖所有业务场景，部分场景下控制点缺失。`,
      },
      {
        why: 3,
        answer: `为什么控制设计未覆盖所有场景？—— 因为在控制设计阶段未进行充分的业务场景梳理和风险评估，导致控制盲区。`,
      },
      {
        why: 4,
        answer: `为什么未进行充分的业务场景梳理？—— 因为内控管理部门与业务部门之间的沟通协调机制不健全，未能及时同步业务变化。`,
      },
      {
        why: 5,
        answer: `为什么沟通协调机制不健全？—— 根本原因：缺少定期风险评估和内部控制评审制度，未建立业务变更对内控影响的触发评估机制。`,
      },
    ];
    setAiResult(results);
    setAiLoading(false);
  };

  const columns: ColumnsType<DefectRecord> = [
    {
      title: '缺陷编号',
      dataIndex: 'defectCode',
      key: 'defectCode',
      width: 140,
    },
    {
      title: '缺陷名称',
      dataIndex: 'defectName',
      key: 'defectName',
      width: 220,
      ellipsis: true,
    },
    {
      title: '严重等级',
      dataIndex: 'severity',
      key: 'severity',
      width: 90,
      render: (s: DefectSeverity) => {
        const config = SEVERITY_MAP[s];
        return <Tag color={config?.color}>{config?.label || s}</Tag>;
      },
    },
    {
      title: '缺陷类型',
      dataIndex: 'deficiencyType',
      key: 'deficiencyType',
      width: 100,
      render: (t: DeficiencyType) => (
        <Tag>{DEFICIENCY_TYPE_MAP[t] || t}</Tag>
      ),
    },
    {
      title: '来源',
      dataIndex: 'sourceType',
      key: 'sourceType',
      width: 100,
      render: (s: SourceType) => (
        <Tag color="blue">{SOURCE_TYPE_MAP[s] || s}</Tag>
      ),
    },
    {
      title: '整改状态',
      dataIndex: 'remediationStatus',
      key: 'remediationStatus',
      width: 100,
      render: (s: RemediationStatus) => {
        const config = REMEDIATION_STATUS_MAP[s];
        return <Tag color={config?.color}>{config?.label || s}</Tag>;
      },
    },
    {
      title: '截止日期',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 110,
      render: (date: string) => (
        <span style={{ color: new Date(date) < new Date() ? '#ff4d4f' : undefined }}>
          {new Date(date).toLocaleDateString('zh-CN')}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            查看
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            size="small"
            icon={<RobotOutlined />}
            onClick={() => handleAiAnalysis(record)}
          >
            AI分析
          </Button>
          <Popconfirm
            title="确定删除该缺陷？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const searchFields = [
    {
      name: 'severity',
      label: '严重等级',
      type: 'select' as const,
      options: Object.entries(SEVERITY_MAP).map(([value, { label }]) => ({
        label,
        value,
      })),
    },
    {
      name: 'remediationStatus',
      label: '整改状态',
      type: 'select' as const,
      options: Object.entries(REMEDIATION_STATUS_MAP).map(([value, { label }]) => ({
        label,
        value,
      })),
    },
    {
      name: 'sourceType',
      label: '来源类型',
      type: 'select' as const,
      options: Object.entries(SOURCE_TYPE_MAP).map(([value, label]) => ({
        label,
        value,
      })),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <SearchForm fields={searchFields} onSearch={handleSearch} onReset={() => setFilters({})} />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增缺陷
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 1200 }}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total,
          showSizeChanger: true,
          showTotal: (t) => `共 ${t} 条`,
          onChange: (page, pageSize) => setPagination({ page, pageSize }),
        }}
        locale={{
          emptyText: <EmptyState description="暂无缺陷记录" actionText="新增缺陷" onAction={handleAdd} />,
        }}
      />

      <DefectForm
        open={modalOpen}
        record={editingRecord}
        onCancel={() => {
          setModalOpen(false);
          setEditingRecord(null);
        }}
        onSubmit={handleSubmit}
      />

      {/* View Detail Modal */}
      <Modal
        title="缺陷详情"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalOpen(false)}>
            关闭
          </Button>,
        ]}
        width={750}
      >
        {viewingRecord && (
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="缺陷编号">{viewingRecord.defectCode}</Descriptions.Item>
            <Descriptions.Item label="缺陷名称">{viewingRecord.defectName}</Descriptions.Item>
            <Descriptions.Item label="严重等级">
              <Tag color={SEVERITY_MAP[viewingRecord.severity as DefectSeverity]?.color}>
                {SEVERITY_MAP[viewingRecord.severity as DefectSeverity]?.label}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="缺陷类型">
              {DEFICIENCY_TYPE_MAP[viewingRecord.deficiencyType as DeficiencyType]}
            </Descriptions.Item>
            <Descriptions.Item label="缺陷分类">
              {DEFICIENCY_CATEGORY_MAP[viewingRecord.deficiencyCategory as DeficiencyCategory]}
            </Descriptions.Item>
            <Descriptions.Item label="来源类型">
              {SOURCE_TYPE_MAP[viewingRecord.sourceType as SourceType]}
            </Descriptions.Item>
            <Descriptions.Item label="整改状态">
              <Tag color={REMEDIATION_STATUS_MAP[viewingRecord.remediationStatus as RemediationStatus]?.color}>
                {REMEDIATION_STATUS_MAP[viewingRecord.remediationStatus as RemediationStatus]?.label}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="负责人">{viewingRecord.assignedTo}</Descriptions.Item>
            <Descriptions.Item label="截止日期" span={2}>
              {new Date(viewingRecord.dueDate).toLocaleDateString('zh-CN')}
            </Descriptions.Item>
            <Descriptions.Item label="缺陷描述" span={2}>
              {viewingRecord.description}
            </Descriptions.Item>
            <Descriptions.Item label="根因分析" span={2}>
              {viewingRecord.rootCause}
            </Descriptions.Item>
            <Descriptions.Item label="整改方案" span={2}>
              {viewingRecord.remediationPlan}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* AI Analysis Modal */}
      <Modal
        title={`AI根因分析 - ${aiTargetDefect?.defectName || ''}`}
        open={aiModalOpen}
        onCancel={() => setAiModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setAiModalOpen(false)}>
            关闭
          </Button>,
        ]}
        width={700}
      >
        {aiLoading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <RobotOutlined style={{ fontSize: 40, color: '#722ed1' }} />
            <p style={{ marginTop: 16 }}>AI正在进行5-Why根因分析...</p>
          </div>
        ) : (
          <div>
            <Paragraph strong>使用5-Why分析法进行根因追溯：</Paragraph>
            {aiResult.map((item) => (
              <Card
                key={item.why}
                size="small"
                style={{ marginBottom: 12 }}
                title={`第 ${item.why} 层追问`}
              >
                {item.answer}
              </Card>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
