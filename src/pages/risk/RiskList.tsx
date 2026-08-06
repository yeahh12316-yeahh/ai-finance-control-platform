import { useEffect, useState, useCallback, useRef } from 'react';
import {
  Table, Button, Space, Modal, Form, Drawer, Descriptions, Tag, message,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import SearchForm from '@/components/SearchForm';
import StatusTag from '@/components/StatusTag';
import ConfirmButton from '@/components/ConfirmButton';
import RiskFormFields from './components/RiskForm';
import { getRisks, createRisk, updateRisk, deleteRisk, getRiskCategories } from '@/services/risk';
import type { RiskItem, RiskCategory } from '@/types/risk';
import { riskLevelOptions, riskStatusOptions, calculateRiskLevel } from '@/types/risk';

const riskStatusTagOptions = riskStatusOptions.map((s) => ({
  value: s.value,
  label: s.label,
  color: s.color,
}));

const riskLevelTagOptions = riskLevelOptions.map((l) => ({
  value: l.value,
  label: l.label,
  color: l.color,
}));

function RiskList() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<RiskItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchValues, setSearchValues] = useState<Record<string, unknown>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingRisk, setEditingRisk] = useState<RiskItem | null>(null);
  const [viewingRisk, setViewingRisk] = useState<RiskItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);

  const [form] = Form.useForm();

  useEffect(() => {
    getRiskCategories().then((res) => {
      if (res.data) {
        const flatten = (list: RiskCategory[]): { label: string; value: string }[] => {
          return list.flatMap((c) => [
            { label: c.categoryName, value: c.id },
            ...(c.children ? flatten(c.children) : []),
          ]);
        };
        setCategoryOptions(flatten(res.data));
      }
    });
  }, []);

  const fetchData = useCallback(
    async (params?: Record<string, unknown>) => {
      setLoading(true);
      try {
        const queryParams = {
          page,
          pageSize,
          ...searchValues,
          ...(params || {}),
        };
        const res = await getRisks(queryParams);
        if (res.data) {
          setDataSource(res.data.list || []);
          setTotal(res.data.total || 0);
        }
      } catch {
        message.error('获取风险列表失败');
      } finally {
        setLoading(false);
      }
    },
    [page, pageSize, searchValues],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (values: Record<string, unknown>) => {
    const cleaned: Record<string, unknown> = {};
    Object.entries(values).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        cleaned[k] = v;
      }
    });
    setSearchValues(cleaned);
    setPage(1);
  };

  const handleReset = () => {
    setSearchValues({});
    setPage(1);
  };

  const handleAdd = () => {
    setEditingRisk(null);
    form.resetFields();
    form.setFieldsValue({
      status: 'active',
      inherentImpact: 3,
      inherentLikelihood: 3,
      residualImpact: 2,
      residualLikelihood: 2,
    });
    setModalVisible(true);
  };

  const handleEdit = (record: RiskItem) => {
    setEditingRisk(record);
    form.setFieldsValue({
      riskName: record.riskName,
      categoryId: record.categoryId,
      processId: record.processId,
      riskDescription: record.riskDescription,
      inherentImpact: record.inherentImpact,
      inherentLikelihood: record.inherentLikelihood,
      residualImpact: record.residualImpact,
      residualLikelihood: record.residualLikelihood,
      status: record.status,
    });
    setModalVisible(true);
  };

  const handleView = (record: RiskItem) => {
    setViewingRisk(record);
    setDrawerVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRisk(id);
      message.success('删除成功');
      fetchData();
    } catch {
      message.error('删除失败');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      const inherentRiskLevel = calculateRiskLevel(values.inherentImpact, values.inherentLikelihood);
      const residualRiskLevel = calculateRiskLevel(values.residualImpact, values.residualLikelihood);

      const payload = {
        ...values,
        inherentRiskLevel,
        residualRiskLevel,
      };

      if (editingRisk) {
        await updateRisk(editingRisk.id, payload);
        message.success('更新成功');
      } else {
        await createRisk(payload);
        message.success('创建成功');
      }

      setModalVisible(false);
      fetchData();
    } catch (err) {
      if (err && typeof err === 'object' && 'errorFields' in err) return;
      message.error('操作失败');
    } finally {
      setSubmitting(false);
    }
  };

  const searchFields = [
    {
      name: 'keyword',
      label: '风险名称',
      placeholder: '请输入风险名称或代码',
    },
    {
      name: 'categoryId',
      label: '风险分类',
      type: 'select' as const,
      placeholder: '请选择风险分类',
      options: categoryOptions,
    },
    {
      name: 'riskLevel',
      label: '风险等级',
      type: 'select' as const,
      placeholder: '请选择风险等级',
      options: riskLevelOptions.map((o) => ({ label: o.label, value: o.value })),
    },
    {
      name: 'status',
      label: '状态',
      type: 'select' as const,
      placeholder: '请选择状态',
      options: riskStatusOptions.map((o) => ({ label: o.label, value: o.value })),
    },
  ];

  const columns: ColumnsType<RiskItem> = [
    {
      title: '风险代码',
      dataIndex: 'riskCode',
      key: 'riskCode',
      width: 110,
    },
    {
      title: '风险名称',
      dataIndex: 'riskName',
      key: 'riskName',
      width: 200,
      ellipsis: true,
    },
    {
      title: '风险分类',
      dataIndex: 'categoryId',
      key: 'categoryId',
      width: 120,
      render: (id: string) => {
        const cat = categoryOptions.find((c) => c.value === id);
        return cat?.label || id;
      },
    },
    {
      title: '关联流程',
      dataIndex: 'processId',
      key: 'processId',
      width: 120,
      ellipsis: true,
    },
    {
      title: '固有风险等级',
      dataIndex: 'inherentRiskLevel',
      key: 'inherentRiskLevel',
      width: 110,
      align: 'center',
      render: (level: string) => (
        <StatusTag status={level} options={riskLevelTagOptions} />
      ),
    },
    {
      title: '剩余风险等级',
      dataIndex: 'residualRiskLevel',
      key: 'residualRiskLevel',
      width: 110,
      align: 'center',
      render: (level: string) => (
        <StatusTag status={level} options={riskLevelTagOptions} />
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      align: 'center',
      render: (status: string) => (
        <StatusTag status={status} options={riskStatusTagOptions} />
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right',
      render: (_: unknown, record: RiskItem) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            详情
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <ConfirmButton
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
            title="删除风险"
            description={`确定要删除风险"${record.riskName}"吗？`}
            onConfirm={() => handleDelete(record.id)}
          >
            删除
          </ConfirmButton>
        </Space>
      ),
    },
  ];

  const getLevelColor = (level: string) => {
    const opt = riskLevelOptions.find((o) => o.value === level);
    return opt?.color || '#d9d9d9';
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <SearchForm fields={searchFields} onSearch={handleSearch} onReset={handleReset} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增风险
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        loading={loading}
        scroll={{ x: 1200 }}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (t) => `共 ${t} 条`,
          onChange: (p, ps) => {
            setPage(p);
            setPageSize(ps);
          },
        }}
      />

      {/* Add/Edit Modal */}
      <Modal
        title={editingRisk ? '编辑风险' : '新增风险'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        confirmLoading={submitting}
        width={800}
        destroyOnClose
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <RiskFormFields isEdit={!!editingRisk} />
        </Form>
      </Modal>

      {/* Detail Drawer */}
      <Drawer
        title="风险详情"
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={640}
      >
        {viewingRisk && (
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="风险代码">{viewingRisk.riskCode}</Descriptions.Item>
            <Descriptions.Item label="风险名称">{viewingRisk.riskName}</Descriptions.Item>
            <Descriptions.Item label="风险分类">
              {categoryOptions.find((c) => c.value === viewingRisk.categoryId)?.label || viewingRisk.categoryId}
            </Descriptions.Item>
            <Descriptions.Item label="关联流程">{viewingRisk.processId}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <StatusTag status={viewingRisk.status} options={riskStatusTagOptions} />
            </Descriptions.Item>
            <Descriptions.Item label="风险描述" span={2}>
              {viewingRisk.riskDescription}
            </Descriptions.Item>
            <Descriptions.Item label="固有影响评分">{viewingRisk.inherentImpact}</Descriptions.Item>
            <Descriptions.Item label="固有可能性评分">{viewingRisk.inherentLikelihood}</Descriptions.Item>
            <Descriptions.Item label="固有风险等级">
              <Tag color={getLevelColor(viewingRisk.inherentRiskLevel)}>
                {viewingRisk.inherentRiskLevel}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="固有风险评分">
              {viewingRisk.inherentImpact * viewingRisk.inherentLikelihood}
            </Descriptions.Item>
            <Descriptions.Item label="剩余影响评分">{viewingRisk.residualImpact}</Descriptions.Item>
            <Descriptions.Item label="剩余可能性评分">{viewingRisk.residualLikelihood}</Descriptions.Item>
            <Descriptions.Item label="剩余风险等级">
              <Tag color={getLevelColor(viewingRisk.residualRiskLevel)}>
                {viewingRisk.residualRiskLevel}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="剩余风险评分">
              {viewingRisk.residualImpact * viewingRisk.residualLikelihood}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间" span={2}>
              {new Date(viewingRisk.createdAt).toLocaleString('zh-CN')}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间" span={2}>
              {new Date(viewingRisk.updatedAt).toLocaleString('zh-CN')}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </div>
  );
}

export default RiskList;
