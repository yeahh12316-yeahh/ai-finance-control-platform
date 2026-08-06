import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Timeline, Button, Space, Card, message, Modal, Tag } from 'antd';
import { RollbackOutlined, ArrowLeftOutlined, ClockCircleOutlined } from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';
import { seedDocuments } from '@/mocks/data/documents';
import type { DocumentVersion } from '@/types/document';

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

function VersionHistory() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [versions, setVersions] = useState<DocumentVersion[]>([]);
  const [docName, setDocName] = useState('');

  useEffect(() => {
    const found = seedDocuments.find((d) => d.id === id);
    if (found) {
      setVersions(found.versions);
      setDocName(found.docName);
    } else {
      message.error('文档不存在');
      navigate('/documents');
    }
  }, [id, navigate]);

  const handleRollback = (version: DocumentVersion) => {
    Modal.confirm({
      title: '确认回滚',
      content: `确定要将文档回滚到版本 ${version.version} 吗？回滚后将生成新版本。`,
      okText: '确认回滚',
      cancelText: '取消',
      onOk: () => {
        message.success(`已成功回滚到版本 ${version.version}`);
      },
    });
  };

  return (
    <PageContainer
      title={`版本历史 - ${docName}`}
      onBack={() => navigate(-1)}
    >
      <Card style={{ maxWidth: 700 }}>
        <Timeline
          mode="left"
          items={versions.map((v, idx) => ({
            color: idx === 0 ? 'green' : 'gray',
            dot: idx === 0 ? <ClockCircleOutlined style={{ fontSize: 16 }} /> : undefined,
            children: (
              <Card
                size="small"
                style={{ marginBottom: 8 }}
                title={
                  <Space>
                    <span>{v.version}</span>
                    {idx === 0 && <Tag color="green">当前版本</Tag>}
                  </Space>
                }
                extra={
                  idx !== 0 && (
                    <Button
                      size="small"
                      icon={<RollbackOutlined />}
                      onClick={() => handleRollback(v)}
                    >
                      回滚到此版本
                    </Button>
                  )
                }
              >
                <div style={{ color: '#666' }}>
                  <div>上传人：{v.uploadBy}</div>
                  <div>上传时间：{formatDate(v.uploadAt)}</div>
                  <div>文件大小：{formatFileSize(v.fileSize)}</div>
                </div>
              </Card>
            ),
          }))}
        />
      </Card>
    </PageContainer>
  );
}

export default VersionHistory;
