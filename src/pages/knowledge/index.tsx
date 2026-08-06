import { useState } from 'react';
import { Tabs } from 'antd';
import { SearchOutlined, FileTextOutlined } from '@ant-design/icons';
import PageContainer from '@/components/PageContainer';
import KnowledgeSearch from './KnowledgeSearch';
import DocumentIndex from './DocumentIndex';

function KnowledgePage() {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <PageContainer title="知识库管理">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'search',
            label: (
              <span>
                <SearchOutlined />
                知识检索
              </span>
            ),
            children: <KnowledgeSearch />,
          },
          {
            key: 'index',
            label: (
              <span>
                <FileTextOutlined />
                文档索引管理
              </span>
            ),
            children: <DocumentIndex />,
          },
        ]}
      />
    </PageContainer>
  );
}

export default KnowledgePage;
