import { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  message,
  Tag,
  Tooltip,
  Popconfirm,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SendOutlined,
  CheckOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';
import SearchForm from '@/components/SearchForm';
import EmptyState from '@/components/EmptyState';
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
  getScopes,
} from '@/services/evaluation';
import type { EvaluationPlan, EvaluationScope } from '@/types/evaluation';
import {
  PLAN_STATUS_MAP,
  PLAN_TYPE_MAP,
  EVALUATION_FRAMEWORK_MAP,
} from '@/types/evaluation';
import type { PlanStatus, PlanType, EvaluationFramework } from '@/types/evaluation';
import PlanForm from './components/PlanForm';

export default function EvaluationPlanPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<EvaluationPlan[]>([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<EvaluationPlan | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewingRecord, setViewingRecord] = useState<EvaluationPlan | null>(null);
  const [scopeModalOpen, setScopeModalOpen] = useState(false);
  const [scopes, setScopes] = useState<EvaluationScope[]>([]);
  const [filters, setFilters] = useState<Record<string, unknown>>({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPlans({ ...filters, ...pagination });
      setData(res.data.list);
      setTotal(res.data.total);
    } catch {
      // mock data already handled by MSW
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

  const handleReset = () => {
    setFilters({});
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleAdd = () => {
    setEditingRecord(null);
    setModalOpen(true);
  };

  const handleEdit = (record: EvaluationPlan) => {
    setEditingRecord(record);
    setModalOpen(true);
  };

  const handleView = (record: EvaluationPlan) => {
    setViewingRecord(record);
    setViewModalOpen(true);
  };

  const handleViewScopes = async (record: EvaluationPlan) => {
    try {
      const res = await getScopes(record.id);
      setScopes(res.data);
      setScopeModalOpen(true);
    } catch {
      message.error('获取评价范围失败');
    }
  };

  const handleSubmit = async (values: Partial<EvaluationPlan>) => {
    try {
      if (editingRecord) {
        await updatePlan(editingRecord.id, values);
        message.success('更新成功');
      } else {
        await createPlan(values);
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
      await deletePlan(id);
      message.success('删除成功');
      fetchData();
    } catch {
      message.error('删除失败');
    }
  };

  const handleStatusTransition = async (record: EvaluationPlan, targetStatus: PlanStatus) => {
    try {
      await updatePlan(record.id, { status: targetStatus } as Partial<EvaluationPlan>);
      message.success('状态更新成功');
      fetchData();
    } catch {
      message.error('状态更新失败');
    }
  };

  const getStatusActions = (record: EvaluationPlan) => {
    const status = record.status as PlanStatus;
    const actions: React.ReactNode[] = [];
    const btnStyle: React.CSSProperties = { fontSize: 12 };

    if (status === 'draft') {
      actions.push(
        <Tooltip key="submit" title="提交">
          <Button
            type="link"
            size="small"
            icon={<SendOutlined />}
            style={btnStyle}
            onClick={() => handleStatusTransition(record, 'submitted')}
          />
        </Tooltip>
      );
    }
    if (status === 'submitted') {
      actions.push(
        <Tooltip key="approve" title="批准">
          <Button
            type="link"
            size="small"
            icon={<CheckOutlined />}
            style={btnStyle}
            onClick={() => handleStatusTransition(record, 'approved')}
          />
        </Tooltip>
      );
    }
    if (status === 'approved') {
      actions.push(
        <Tooltip key="start" title="开始执行">
          <Button
            type="link"
            size="small"
            icon={<PlayCircleOutlined />}
            style={btnStyle}
            onClick={() => handleStatusTransition(record, 'in_progress')}
          />
        </Tooltip>
      );
    }
    if (status === 'in_progress') {
      actions.push(
        <Tooltip key="complete" title="完成">
          <Button
            type="link"
            size="small"
            icon={<CheckOutlined />}
            style={btnStyle}
            onClick={() => handleStatusTransition(record, 'completed')}
          />
        </Tooltip>
      );
    }

    return actions;
  };

  const columns: ColumnsType<EvaluationPlan> = [
    {
      title: '计划编号',
      dataIndex: 'planCode',
      key: 'planCode',
      width: 140,
    },
    {
      title: '计划名称',
      dataIndex: 'planName',
      key: 'planName',
      width: 250,
      ellipsis: true,
    },
    {
      title: '评价年度',
      dataIndex: 'planYear',
      key: 'planYear',
      width: 90,
      align: 'center',
    },
    {
      title: '计划类型',
      dataIndex: 'planType',
      key: 'planType',
      width: 110,
      render: (type: PlanType) => (
        <Tag>{PLAN_TYPE_MAP[type] || type}</Tag>
      ),
    },
    {
      title: '评价框架',
      dataIndex: 'evaluationFramework',
      key: 'evaluationFramework',
      width: 110,
      render: (fw: EvaluationFramework) => (
        <Tag color="blue">{EVALUATION_FRAMEWORK_MAP[fw] || fw}</Tag>
      ),
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 110,
      render: (date: string) => new Date(date).toLocaleDateString('zh-CN'),
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 110,
      render: (date: string) => new Date(date).toLocaleDateString('zh-CN'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: (status: PlanStatus) => {
        const config = PLAN_STATUS_MAP[status];
        return <Tag color={config?.color}>{config?.label || status}</Tag>;
      },
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
          {record.status !== 'completed' && record.status !== 'closed' && (
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            >
              编辑
            </Button>
          )}
          {getStatusActions(record)}
          <Popconfirm
            title="确定删除该计划？"
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
      name: 'planYear',
      label: '评价年度',
      type: 'select' as const,
      options: [
        { label: '2026', value: '2026' },
        { label: '2025', value: '2025' },
        { label: '2024', value: '2024' },
      ],
    },
    {
      name: 'status',
      label: '状态',
      type: 'select' as const,
      options: Object.entries(PLAN_STATUS_MAP).map(([value, { label }]) => ({
        label,
        value,
      })),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <SearchForm fields={searchFields} onSearch={handleSearch} onReset={handleReset} />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增评价计划
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 1300 }}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total,
          showSizeChanger: true,
          showTotal: (t) => `共 ${t} 条`,
          onChange: (page, pageSize) => setPagination({ page, pageSize }),
        }}
        locale={{
          emptyText: <EmptyState description="暂无评价计划" actionText="新增计划" onAction={handleAdd} />,
        }}
      />

      <PlanForm
        open={modalOpen}
        record={editingRecord}
        onCancel={() => {
          setModalOpen(false);
          setEditingRecord(null);
        }}
        onSubmit={handleSubmit}
      />

      {/* View detail modal */}
      <Modal
        title="计划详情"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalOpen(false)}>
            关闭
          </Button>,
        ]}
        width={700}
      >
        {viewingRecord && (
          <div>
            <p><strong>计划编号：</strong>{viewingRecord.planCode}</p>
            <p><strong>计划名称：</strong>{viewingRecord.planName}</p>
            <p><strong>评价年度：</strong>{viewingRecord.planYear}</p>
            <p><strong>计划类型：</strong>{PLAN_TYPE_MAP[viewingRecord.planType as PlanType]}</p>
            <p><strong>评价框架：</strong>{EVALUATION_FRAMEWORK_MAP[viewingRecord.evaluationFramework as EvaluationFramework]}</p>
            <p><strong>开始日期：</strong>{new Date(viewingRecord.startDate).toLocaleDateString('zh-CN')}</p>
            <p><strong>结束日期：</strong>{new Date(viewingRecord.endDate).toLocaleDateString('zh-CN')}</p>
            <p><strong>状态：</strong><Tag color={PLAN_STATUS_MAP[viewingRecord.status as PlanStatus]?.color}>{PLAN_STATUS_MAP[viewingRecord.status as PlanStatus]?.label}</Tag></p>
            <p><strong>描述：</strong>{viewingRecord.description}</p>
            <p><strong>创建人：</strong>{viewingRecord.createdBy}</p>
            <p><strong>创建时间：</strong>{new Date(viewingRecord.createdAt).toLocaleString('zh-CN')}</p>
            <p><strong>更新时间：</strong>{new Date(viewingRecord.updatedAt).toLocaleString('zh-CN')}</p>
            <Button onClick={() => handleViewScopes(viewingRecord)}>查看评价范围</Button>
          </div>
        )}
      </Modal>

      {/* Scopes modal */}
      <Modal
        title="评价范围"
        open={scopeModalOpen}
        onCancel={() => setScopeModalOpen(false)}
        footer={null}
        width={800}
      >
        <Table
          rowKey="id"
          dataSource={scopes}
          columns={[
            { title: '范围名称', dataIndex: 'scopeName', key: 'scopeName' },
            { title: '范围类型', dataIndex: 'scopeType', key: 'scopeType' },
            { title: '进度', dataIndex: 'progress', key: 'progress', render: (v: number) => `${v}%` },
            {
              title: '状态',
              dataIndex: 'status',
              key: 'status',
              render: (s: string) => <Tag>{s}</Tag>,
            },
            { title: '负责人', dataIndex: 'assignedTo', key: 'assignedTo' },
          ]}
          pagination={false}
        />
      </Modal>
    </div>
  );
}
