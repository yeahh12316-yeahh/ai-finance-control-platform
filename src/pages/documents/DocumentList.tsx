import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Space, message } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import SearchForm from '@/components/SearchForm';
import StatusTag from '@/components/StatusTag';
import ConfirmButton from '@/components/ConfirmButton';
import { seedDocuments } from '@/mocks/data/documents';
import type { DocumentRecord } from '@/types/document';
import type { SearchField } from '@/components/SearchForm';

const DOC_CATEGORIES = [
  { label: '管理制度', value: '管理制度' },
  { label: '操作规程', value: '操作规程' },
  { label: '工作指引', value: '工作指引' },
];

const DOC_STATUS_OPTIONS = [
  { value: 'draft', label: '草稿', color: 'default' },
  { value: 'published', label: '已发布', color: 'green' },
  { value: 'archived', label: '已归档', color: 'orange' },
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const searchFields: SearchField[] = [
  { name: 'keyword', label: '文档名称', type: 'input', placeholder: '请输入文档名称' },
  {
    name: 'docCategory',
    label: '分类',
    type: 'select',
    placeholder: '请选择分类',
    options: DOC_CATEGORIES,
  },
  {
    name: 'status',
    label: '状态',
    type: 'select',
    placeholder: '请选择状态',
    options: DOC_STATUS_OPTIONS.map((s) => ({ label: s.label, value: s.value })),
  },
];

function DocumentList() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [filters, setFilters] = useState<Record<string, unknown>>({});

  const fetchDocuments = useCallback(async (page: number, pageSize: number, searchValues: Record<string, unknown>) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    let filtered = [...seedDocuments];

    if (searchValues.keyword) {
      const kw = String(searchValues.keyword).toLowerCase();
      filtered = filtered.filter(
        (d) => d.docName.toLowerCase().includes(kw) || d.docCode.toLowerCase().includes(kw)
      );
    }
    if (searchValues.docCategory) {
      filtered = filtered.filter((d) => d.docCategory === searchValues.docCategory);
    }
    if (searchValues.status) {
      filtered = filtered.filter((d) => d.status === searchValues.status);
    }

    setPagination({ page, pageSize, total: filtered.length });
    const start = (page - 1) * pageSize;
    setDocuments(filtered.slice(start, start + pageSize));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDocuments(pagination.page, pagination.pageSize, filters);
  }, []);

  const handleSearch = (values: Record<string, unknown>) => {
    setFilters(values);
    fetchDocuments(1, pagination.pageSize, values);
  };

  const handleReset = () => {
    setFilters({});
    fetchDocuments(1, pagination.pageSize, {});
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    message.success('删除成功');
  };

  const columns: ColumnsType<DocumentRecord> = [
    {
      title: '文档编码',
      dataIndex: 'docCode',
      key: 'docCode',
      width: 140,
    },
    {
      title: '文档名称',
      dataIndex: 'docName',
      key: 'docName',
      ellipsis: true,
    },
    {
      title: '分类',
      dataIndex: 'docCategory',
      key: 'docCategory',
      width: 100,
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      width: 80,
    },
    {
      title: '文件大小',
      dataIndex: 'fileSize',
      key: 'fileSize',
      width: 100,
      render: (size: number) => formatFileSize(size),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: (status: string) => <StatusTag status={status} options={DOC_STATUS_OPTIONS} />,
    },
    {
      title: '上传时间',
      dataIndex: 'uploadAt',
      key: 'uploadAt',
      width: 160,
      render: (val: string) => formatDate(val),
    },
    {
      title: '操作',
      key: 'actions',
      width: 240,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/documents/${record.id}`)}
          >
            预览
          </Button>
          <Button
            type="link"
            size="small"
            icon={<HistoryOutlined />}
            onClick={() => navigate(`/documents/${record.id}/versions`)}
          >
            版本历史
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => message.info('编辑功能')}
          >
            编辑
          </Button>
          <ConfirmButton
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
            title="删除文档"
            description={`确定要删除文档 "${record.docName}" 吗？`}
            onConfirm={() => handleDelete(record.id)}
          >
            删除
          </ConfirmButton>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <SearchForm fields={searchFields} onSearch={handleSearch} onReset={handleReset} />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={documents}
        loading={loading}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (page, pageSize) => fetchDocuments(page, pageSize, filters),
        }}
      />
    </div>
  );
}

export default DocumentList;
