import { Table, Tag, Button, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EyeOutlined } from '@ant-design/icons';
import type { AuditLogRecord } from '@/types/audit';
import { AUDIT_MODULE_MAP, AUDIT_OPERATION_MAP } from '@/types/audit';
import EmptyState from '@/components/EmptyState';

const { Text } = Typography;

interface LogTableProps {
  dataSource: AuditLogRecord[];
  loading: boolean;
  total: number;
  pagination: { page: number; pageSize: number };
  onPaginationChange: (page: number, pageSize: number) => void;
  onViewDetail: (record: AuditLogRecord) => void;
}

export default function LogTable({
  dataSource,
  loading,
  total,
  pagination,
  onPaginationChange,
  onViewDetail,
}: LogTableProps) {
  const columns: ColumnsType<AuditLogRecord> = [
    {
      title: '时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 170,
      render: (date: string) => new Date(date).toLocaleString('zh-CN'),
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      defaultSortOrder: 'descend',
    },
    {
      title: '用户',
      dataIndex: 'userName',
      key: 'userName',
      width: 90,
    },
    {
      title: '模块',
      dataIndex: 'moduleName',
      key: 'moduleName',
      width: 110,
      render: (name: string) => <Tag color="blue">{name}</Tag>,
    },
    {
      title: '操作',
      dataIndex: 'operationDesc',
      key: 'operationDesc',
      width: 120,
      render: (desc: string) => <Tag>{desc}</Tag>,
    },
    {
      title: '目标类型',
      dataIndex: 'module',
      key: 'targetType',
      width: 110,
      render: (mod: string) => AUDIT_MODULE_MAP[mod] || mod,
    },
    {
      title: '目标ID',
      dataIndex: 'id',
      key: 'targetId',
      width: 100,
      render: (id: string) => <Text code>{id}</Text>,
    },
    {
      title: '详情',
      dataIndex: 'detail',
      key: 'detail',
      width: 250,
      ellipsis: true,
      render: (text: string) => (
        <Text style={{ fontSize: 12 }}>{text}</Text>
      ),
    },
    {
      title: '结果',
      dataIndex: 'result',
      key: 'result',
      width: 70,
      render: (result: string) => (
        <Tag color={result === '成功' ? 'success' : 'error'}>{result}</Tag>
      ),
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
      width: 130,
      render: (ip: string) => <Text code style={{ fontSize: 12 }}>{ip}</Text>,
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      fixed: 'right',
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => onViewDetail(record)}
        >
          详情
        </Button>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      scroll={{ x: 1400 }}
      pagination={{
        current: pagination.page,
        pageSize: pagination.pageSize,
        total,
        showSizeChanger: true,
        showTotal: (t) => `共 ${t} 条`,
        onChange: onPaginationChange,
        pageSizeOptions: ['10', '20', '50', '100'],
      }}
      locale={{
        emptyText: <EmptyState description="暂无审计日志" />,
      }}
    />
  );
}
