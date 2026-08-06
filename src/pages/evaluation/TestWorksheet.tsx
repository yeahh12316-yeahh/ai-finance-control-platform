import { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  message,
  Tag,
  Popconfirm,
  Row,
  Col,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SendOutlined,
  CheckOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import SearchForm from '@/components/SearchForm';
import EmptyState from '@/components/EmptyState';
import {
  getWorksheets,
  createWorksheet,
  updateWorksheet,
  deleteWorksheet,
  getPlans,
  getScopes,
} from '@/services/evaluation';
import type { TestWorksheet, EvaluationPlan, EvaluationScope } from '@/types/evaluation';
import {
  WORKSHEET_STATUS_MAP,
  TEST_METHOD_MAP,
  TEST_CONCLUSION_MAP,
} from '@/types/evaluation';
import type { WorksheetStatus, TestMethod, TestConclusion } from '@/types/evaluation';
import WorksheetTable from './components/WorksheetTable';

export default function TestWorksheetPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TestWorksheet[]>([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<TestWorksheet | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewingRecord, setViewingRecord] = useState<TestWorksheet | null>(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [plans, setPlans] = useState<EvaluationPlan[]>([]);
  const [scopes, setScopes] = useState<EvaluationScope[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [selectedScopeId, setSelectedScopeId] = useState<string>('');
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [form] = Form.useForm();

  const fetchPlans = async () => {
    try {
      const res = await getPlans({ page: 1, pageSize: 100 });
      setPlans(res.data.list);
    } catch {
      // mock data
    }
  };

  const fetchScopes = async (planId: string) => {
    if (!planId) return;
    try {
      const res = await getScopes(planId);
      setScopes(res.data);
    } catch {
      // mock data
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchData = useCallback(async () => {
    if (!selectedPlanId && !selectedScopeId) return;
    setLoading(true);
    try {
      const params: Record<string, unknown> = { ...filters, ...pagination };
      if (selectedScopeId) {
        params.programId = selectedScopeId;
      }
      const res = await getWorksheets(params as Parameters<typeof getWorksheets>[0]);
      setData(res.data.list);
      setTotal(res.data.total);
    } catch {
      // mock data
    } finally {
      setLoading(false);
    }
  }, [filters, pagination, selectedPlanId, selectedScopeId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (values: Record<string, unknown>) => {
    setFilters(values);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (record: TestWorksheet) => {
    setEditingRecord(record);
    form.setFieldsValue({
      controlName: record.controlName,
      testStep: record.testStep,
      testMethod: record.testMethod,
      sampleSize: record.sampleSize,
      sampleDescription: record.sampleDescription,
    });
    setModalOpen(true);
  };

  const handleView = (record: TestWorksheet) => {
    setViewingRecord(record);
    setViewModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingRecord) {
        await updateWorksheet(editingRecord.id, values);
        message.success('更新成功');
      } else {
        await createWorksheet({
          ...values,
          programId: selectedScopeId || selectedPlanId,
        });
        message.success('创建成功');
      }
      setModalOpen(false);
      setEditingRecord(null);
      form.resetFields();
      fetchData();
    } catch {
      // validation failed
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWorksheet(id);
      message.success('删除成功');
      fetchData();
    } catch {
      message.error('删除失败');
    }
  };

  const handleStatusTransition = async (record: TestWorksheet, targetStatus: WorksheetStatus) => {
    try {
      await updateWorksheet(record.id, { status: targetStatus } as Partial<TestWorksheet>);
      message.success('状态更新成功');
      fetchData();
    } catch {
      message.error('状态更新失败');
    }
  };

  const handleAiAssist = async () => {
    setAiLoading(true);
    setAiResult('');
    setAiModalOpen(true);
    // Simulate AI API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const mockSteps = [
      '1. 确认控制措施设计文档的完整性和准确性，包括控制目标、控制活动描述、执行频率等关键要素。',
      '2. 抽取样本，样本量根据控制执行频率确定：每日执行控制至少25个样本，每周执行控制至少10个样本，每月执行控制至少5个样本。',
      '3. 对抽取的样本逐一检查控制执行证据，包括审批记录、操作日志、系统截图等。',
      '4. 验证控制执行是否遵循设计规范，重点关注异常情况处理和越权操作。',
      '5. 记录测试发现，对控制偏差进行分类统计并评估偏差影响。',
    ];
    setAiResult(mockSteps.join('\n\n'));
    setAiLoading(false);
  };

  const columns: ColumnsType<TestWorksheet> = [
    {
      title: '控制名称',
      dataIndex: 'controlName',
      key: 'controlName',
      width: 200,
      ellipsis: true,
    },
    {
      title: '测试步骤',
      dataIndex: 'testStep',
      key: 'testStep',
      width: 250,
      ellipsis: true,
    },
    {
      title: '测试方法',
      dataIndex: 'testMethod',
      key: 'testMethod',
      width: 100,
      render: (method: TestMethod) => (
        <Tag>{TEST_METHOD_MAP[method] || method}</Tag>
      ),
    },
    {
      title: '样本量',
      dataIndex: 'sampleSize',
      key: 'sampleSize',
      width: 80,
      align: 'center',
    },
    {
      title: '测试结论',
      dataIndex: 'testConclusion',
      key: 'testConclusion',
      width: 110,
      render: (conclusion: TestConclusion) => {
        const config = TEST_CONCLUSION_MAP[conclusion];
        return config ? <Tag color={config.color}>{config.label}</Tag> : <Tag>{conclusion}</Tag>;
      },
    },
    {
      title: '测试人',
      dataIndex: 'testedBy',
      key: 'testedBy',
      width: 90,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: (status: WorksheetStatus) => {
        const config = WORKSHEET_STATUS_MAP[status];
        return <Tag color={config?.color}>{config?.label || status}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 220,
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
          {record.status === 'draft' && (
            <>
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
                icon={<SendOutlined />}
                onClick={() => handleStatusTransition(record, 'submitted')}
              >
                提交
              </Button>
            </>
          )}
          {record.status === 'submitted' && (
            <Button
              type="link"
              size="small"
              icon={<CheckOutlined />}
              onClick={() => handleStatusTransition(record, 'reviewed')}
            >
              复核
            </Button>
          )}
          <Popconfirm
            title="确定删除该底稿？"
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

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Row gutter={16} align="middle">
          <Col>
            <span style={{ marginRight: 8 }}>评价计划：</span>
            <Select
              placeholder="选择评价计划"
              style={{ width: 250 }}
              value={selectedPlanId || undefined}
              onChange={(val) => {
                setSelectedPlanId(val);
                setSelectedScopeId('');
                fetchScopes(val);
              }}
              allowClear
              options={plans.map((p) => ({
                label: p.planName,
                value: p.id,
              }))}
            />
          </Col>
          <Col>
            <span style={{ marginRight: 8 }}>评价范围：</span>
            <Select
              placeholder="选择评价范围"
              style={{ width: 250 }}
              value={selectedScopeId || undefined}
              onChange={setSelectedScopeId}
              allowClear
              disabled={!selectedPlanId}
              options={scopes.map((s) => ({
                label: s.scopeName,
                value: s.id,
              }))}
            />
          </Col>
          <Col flex="auto" style={{ textAlign: 'right' }}>
            <Space>
              <Button icon={<RobotOutlined />} onClick={handleAiAssist}>
                AI辅助
              </Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                新增底稿
              </Button>
            </Space>
          </Col>
        </Row>
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
          emptyText: (
            <EmptyState
              description={!selectedPlanId ? '请先选择评价计划和范围' : '暂无底稿数据'}
              actionText="新增底稿"
              onAction={handleAdd}
            />
          ),
        }}
      />

      {/* Add/Edit Modal */}
      <Modal
        title={editingRecord ? '编辑底稿' : '新增底稿'}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => {
          setModalOpen(false);
          setEditingRecord(null);
          form.resetFields();
        }}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="controlName"
            label="控制措施"
            rules={[{ required: true, message: '请选择控制措施' }]}
          >
            <Select
              placeholder="选择控制措施"
              showSearch
              options={[
                { label: '客户身份识别与尽职调查', value: '客户身份识别与尽职调查' },
                { label: '授信审批权限分级', value: '授信审批权限分级' },
                { label: '反洗钱交易监控', value: '反洗钱交易监控' },
                { label: '抵质押物价值定期重估', value: '抵质押物价值定期重估' },
                { label: '放款双人复核机制', value: '放款双人复核机制' },
                { label: '贷后资金用途监控', value: '贷后资金用途监控' },
                { label: '集中度指标监控', value: '集中度指标监控' },
                { label: '合同合规审查', value: '合同合规审查' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="testStep"
            label="测试步骤"
            rules={[{ required: true, message: '请输入测试步骤' }]}
          >
            <Input.TextArea rows={3} placeholder="描述测试步骤" />
          </Form.Item>
          <Form.Item
            name="testMethod"
            label="测试方法"
            rules={[{ required: true, message: '请选择测试方法' }]}
          >
            <Select
              placeholder="选择测试方法"
              options={Object.entries(TEST_METHOD_MAP).map(([value, label]) => ({
                label,
                value,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="sampleSize"
            label="样本量"
            rules={[{ required: true, message: '请输入样本量' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} placeholder="样本数量" />
          </Form.Item>
          <Form.Item
            name="sampleDescription"
            label="样本描述"
            rules={[{ required: true, message: '请输入样本描述' }]}
          >
            <Input.TextArea rows={2} placeholder="描述抽样范围和样本特征" />
          </Form.Item>
        </Form>
      </Modal>

      {/* View Detail Modal */}
      <Modal
        title="底稿详情"
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
            <p><strong>控制名称：</strong>{viewingRecord.controlName}</p>
            <p><strong>测试步骤：</strong>{viewingRecord.testStep}</p>
            <p><strong>测试方法：</strong><Tag>{TEST_METHOD_MAP[viewingRecord.testMethod as TestMethod]}</Tag></p>
            <p><strong>样本量：</strong>{viewingRecord.sampleSize}</p>
            <p><strong>样本描述：</strong>{viewingRecord.sampleDescription}</p>
            <p><strong>测试结果：</strong>{viewingRecord.testResult}</p>
            <p><strong>测试结论：</strong>
              <Tag color={TEST_CONCLUSION_MAP[viewingRecord.testConclusion as TestConclusion]?.color}>
                {TEST_CONCLUSION_MAP[viewingRecord.testConclusion as TestConclusion]?.label}
              </Tag>
            </p>
            {viewingRecord.finding && <p><strong>发现问题：</strong>{viewingRecord.finding}</p>}
            <p><strong>测试人：</strong>{viewingRecord.testedBy}</p>
            <p><strong>测试日期：</strong>{viewingRecord.testDate ? new Date(viewingRecord.testDate).toLocaleDateString('zh-CN') : '-'}</p>
            <p><strong>复核人：</strong>{viewingRecord.reviewedBy || '-'}</p>
            <p><strong>状态：</strong>
              <Tag color={WORKSHEET_STATUS_MAP[viewingRecord.status as WorksheetStatus]?.color}>
                {WORKSHEET_STATUS_MAP[viewingRecord.status as WorksheetStatus]?.label}
              </Tag>
            </p>
          </div>
        )}
      </Modal>

      {/* AI Assist Modal */}
      <Modal
        title="AI辅助 - 测试步骤建议"
        open={aiModalOpen}
        onCancel={() => setAiModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setAiModalOpen(false)}>
            关闭
          </Button>,
        ]}
        width={600}
      >
        {aiLoading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <RobotOutlined style={{ fontSize: 40, color: '#1890ff' }} />
            <p style={{ marginTop: 16 }}>AI正在生成测试步骤建议...</p>
          </div>
        ) : (
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: 2 }}>
            {aiResult}
          </div>
        )}
      </Modal>
    </div>
  );
}
