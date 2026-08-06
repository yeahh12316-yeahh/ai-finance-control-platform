import { useState, useEffect } from 'react';
import { Table, Button, Space, message, Tag, Modal } from 'antd';
import {
  ReloadOutlined,
  DeleteOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ConfirmButton from '@/components/ConfirmButton';
import { seedDocuments } from '@/mocks/data/documents';

interface IndexedDocument {
  id: string;
  documentName: string;
  docCategory: string;
  chunkCount: number;
  indexStatus: 'indexed' | 'indexing' | 'failed' | 'not_indexed';
  lastIndexedAt?: string;
}

const INDEX_STATUS_OPTIONS = [
  { value: 'indexed', label: '已索引', color: 'green' },
  { value: 'indexing', label: '索引中', color: 'processing' },
  { value: 'failed', label: '失败', color: 'error' },
  { value: 'not_indexed', label: '未索引', color: 'default' },
];

const STATUS_ICON_MAP: Record<string, React.ReactNode> = {
  indexed: <CheckCircleOutlined />,
  indexing: <SyncOutlined spin />,
  failed: <CloseCircleOutlined />,
  not_indexed: null,
};

function formatDate(dateStr?: string): string {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function DocumentIndex() {
  const [documents, setDocuments] = useState<IndexedDocument[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDocuments = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const indexed: IndexedDocument[] = seedDocuments.map((doc) => ({
      id: doc.id,
      documentName: doc.docName,
      docCategory: doc.docCategory,
      chunkCount: Math.floor(Math.random() * 20) + 5,
      indexStatus: (['indexed', 'indexing', 'not_indexed'][
        Math.floor(Math.random() * 3)
      ] as IndexedDocument['indexStatus']),
      lastIndexedAt:
        doc.indexStatus === 'indexed' ? doc.updatedAt : undefined,
    }));
    setDocuments(indexed);
    setLoading(false);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleReindex = (id: string) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, indexStatus: 'indexing' } : d
      )
    );
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === id
            ? { ...d, indexStatus: 'indexed', lastIndexedAt: new Date().toISOString() }
            : d
        )
      );
      message.success('重新索引完成');
    }, 2000);
  };

  const handleDeleteIndex = (id: string) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, indexStatus: 'not_indexed' } : d
      )
    );
    message.success('索引已删除');
  };

  const columns: ColumnsType<IndexedDocument> = [
    {
      title: '文档名称',
      dataIndex: 'documentName',
      key: 'documentName',
      ellipsis: true,
    },
    {
      title: '分类',
      dataIndex: 'docCategory',
      key: 'docCategory',
      width: 100,
    },
    {
      title: '切片数',
      dataIndex: 'chunkCount',
      key: 'chunkCount',
      width: 80,
      align: 'center',
    },
    {
      title: '索引状态',
      dataIndex: 'indexStatus',
      key: 'indexStatus',
      width: 110,
      render: (status: string) => {
        const opt = INDEX_STATUS_OPTIONS.find((o) => o.value === status);
        const icon = STATUS_ICON_MAP[status];
        return (
          <Tag color={opt?.color} icon={icon}>
            {opt?.label || status}
          </Tag>
        );
      },
    },
    {
      title: '最近索引时间',
      dataIndex: 'lastIndexedAt',
      key: 'lastIndexedAt',
      width: 160,
      render: (val?: string) => formatDate(val),
    },
    {
      title: '操作',
      key: 'actions',
      width: 160,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<ReloadOutlined />}
            onClick={() => handleReindex(record.id)}
            disabled={record.indexStatus === 'indexing'}
          >
            重新索引
          </Button>
          <ConfirmButton
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
            title="删除索引"
            description={`确定要删除文档 "${record.documentName}" 的索引吗？`}
            onConfirm={() => handleDeleteIndex(record.id)}
            disabled={record.indexStatus === 'not_indexed'}
          >
            删除索引
          </ConfirmButton>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={documents}
      loading={loading}
      pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条` }}
    />
  );
}

export default DocumentIndex;
