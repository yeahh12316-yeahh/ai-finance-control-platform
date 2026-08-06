import { useState, useEffect, useCallback } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Select,
  Input,
  message,
  Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import SearchForm from '@/components/SearchForm';
import EmptyState from '@/components/EmptyState';
import {
  getDefects,
  updateDefect,
} from '@/services/defect';
import type { DefectRecord } from '@/types/defect';
import {
  SEVERITY_MAP,
  REMEDIATION_STATUS_MAP,
} from '@/types/defect';
import type { DefectSeverity, RemediationStatus } from '@/types/defect';

const VERIFY_TYPES = [
  { label: '桌面复核', value: 'desk_review' },
  { label: '现场验证', value: 'onsite_verification' },
  { label: '重新测试', value: 'retest' },
  { label: '抽样验证', value: 'sampling' },
];

export default function ClosureVerifyPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DefectRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [verifyingRecord, setVerifyingRecord] = useState<DefectRecord | null>(null);
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [form] = Form.useForm();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getDefects({
        ...filters,
        ...pagination,
        remediationStatus: 'completed',
      });
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

  const handleVerify = (record: DefectRecord) => {
    setVerifyingRecord(record);
    form.resetFields();
    setVerifyModalOpen(true);
  };

  const handleVerifySubmit = async () => {
    try {
      const values = await form.validateFields();
      const { verifyType, conclusion, comment } = values;

      if (conclusion === 'pass') {
        // Pass: completed -> verified -> closed
        await updateDefect(verifyingRecord!.id, {
          remediationStatus: 'closed',
        } as Partial<DefectRecord>);
        message.success('验证通过，缺陷已关闭');
      } else {
        // Fail: rollback to in_progress
        await updateDefect(verifyingRecord!.id, {
          remediationStatus: 'in_progress',
        } as Partial<DefectRecord>);
        message.warning('验证不通过，缺陷已退回整改中');
      }

      setVerifyModalOpen(false);
      setVerifyingRecord(null);
      fetchData();
    } catch {
      // validation failed
    }
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
      title: '负责人',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      width: 90,
    },
    {
      title: '截止日期',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 110,
      render: (date: string) => new Date(date).toLocaleDateString('zh-CN'),
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
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<SafetyCertificateOutlined />}
          onClick={() => handleVerify(record)}
        >
          验证
        </Button>
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
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <SearchForm fields={searchFields} onSearch={handleSearch} onReset={() => setFilters({})} />
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 900 }}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total,
          showSizeChanger: true,
          showTotal: (t) => `共 ${t} 条`,
          onChange: (page, pageSize) => setPagination({ page, pageSize }),
        }}
        locale={{
          emptyText: <EmptyState description="暂无待验证的缺陷" />,
        }}
      />

      {/* Verify Modal */}
      <Modal
        title={`闭环验证 - ${verifyingRecord?.defectName || ''}`}
        open={verifyModalOpen}
        onOk={handleVerifySubmit}
        onCancel={() => {
          setVerifyModalOpen(false);
          setVerifyingRecord(null);
        }}
        width={600}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="verifyType"
            label="验证类型"
            rules={[{ required: true, message: '请选择验证类型' }]}
          >
            <Select placeholder="选择验证类型" options={VERIFY_TYPES} />
          </Form.Item>
          <Form.Item
            name="conclusion"
            label="验证结论"
            rules={[{ required: true, message: '请选择验证结论' }]}
          >
            <Select
              placeholder="选择验证结论"
              options={[
                {
                  label: (
                    <span>
                      <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                      通过 - 整改措施有效，可以关闭
                    </span>
                  ),
                  value: 'pass',
                },
                {
                  label: (
                    <span>
                      <CloseCircleOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
                      不通过 - 整改措施不足，退回继续整改
                    </span>
                  ),
                  value: 'fail',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="comment"
            label="验证说明"
            rules={[{ required: true, message: '请输入验证说明' }]}
          >
            <Input.TextArea rows={4} placeholder="详细描述验证过程和发现..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
