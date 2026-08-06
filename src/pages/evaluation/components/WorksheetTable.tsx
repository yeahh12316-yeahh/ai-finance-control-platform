import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TestWorksheet } from '@/types/evaluation';
import { TEST_METHOD_MAP, TEST_CONCLUSION_MAP, WORKSHEET_STATUS_MAP } from '@/types/evaluation';
import type { TestMethod, TestConclusion, WorksheetStatus } from '@/types/evaluation';

interface WorksheetTableProps {
  dataSource: TestWorksheet[];
  loading?: boolean;
  compact?: boolean;
}

export default function WorksheetTable({ dataSource, loading, compact }: WorksheetTableProps) {
  const columns: ColumnsType<TestWorksheet> = [
    {
      title: '控制名称',
      dataIndex: 'controlName',
      key: 'controlName',
      width: compact ? 150 : 200,
      ellipsis: true,
    },
    {
      title: '测试步骤',
      dataIndex: 'testStep',
      key: 'testStep',
      width: compact ? 180 : 250,
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
      align: 'center' as const,
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
      width: 80,
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
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      size={compact ? 'small' : 'middle'}
      pagination={compact ? false : { pageSize: 10, showTotal: (t) => `共 ${t} 条` }}
      scroll={{ x: compact ? 800 : 1000 }}
    />
  );
}
