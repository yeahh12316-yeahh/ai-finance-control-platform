import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';
import DocumentList from './DocumentList';

function DocumentsPage() {
  const navigate = useNavigate();
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <PageContainer
      title="制度文档管理"
      extra={
        <Space>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={() => navigate('/documents/upload')}
          >
            上传文档
          </Button>
        </Space>
      }
    >
      <DocumentList />
    </PageContainer>
  );
}

export default DocumentsPage;
