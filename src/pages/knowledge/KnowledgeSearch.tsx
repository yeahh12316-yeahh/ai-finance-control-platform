import { useState } from 'react';
import { Input, Button, Space, Spin, Empty, Typography, Tag } from 'antd';
import { SearchOutlined, ExperimentOutlined } from '@ant-design/icons';
import SearchResultItem from './components/SearchResult';
import ChunkViewer from './components/ChunkViewer';
import type { SearchResult } from '@/types/knowledge';

const { Title, Text } = Typography;

const MOCK_SEARCH_RESULTS: SearchResult[] = [
  {
    id: '1',
    documentId: '1',
    documentName: '银行信贷业务管理办法',
    chunkIndex: 0,
    content: '本文档为银行信贷业务管理办法正文内容，规范全行信贷业务操作流程和管理要求的基本制度文件。明确了客户准入的审查标准和审批流程，建立了分级审批体系，设置了各层级审批限额。',
    score: 0.98,
    highlight: '信贷业务**操作流程**和**管理要求**',
    metadata: {},
    createdAt: '2026-07-01T14:00:00Z',
  },
  {
    id: '2',
    documentId: '2',
    documentName: '授信审批操作规程',
    chunkIndex: 1,
    content: '详细规定各类授信业务的审批权限、流程和操作要求。实行分级审批制度，各级审批人员应在授权范围内行使审批权限，不得越权审批。',
    score: 0.92,
    highlight: '**审批权限**、**流程**和操作要求',
    metadata: {},
    createdAt: '2026-06-15T11:00:00Z',
  },
  {
    id: '3',
    documentId: '5',
    documentName: '内控评价工作指引',
    chunkIndex: 2,
    content: '指导全行内控评价工作的开展，包括评价方法、测试程序和报告模板。采用穿行测试和抽样检查相结合的方式，确保评价的全面性和有效性。',
    score: 0.85,
    highlight: '**评价方法**、**测试程序**和报告模板',
    metadata: {},
    createdAt: '2026-03-15T10:00:00Z',
  },
  {
    id: '4',
    documentId: '1',
    documentName: '银行信贷业务管理办法',
    chunkIndex: 3,
    content: '贷后监控要求：规定了贷后检查的频率、内容和报告要求。客户经理应按月进行贷后检查，重点监控资金用途、经营状况和担保物变化情况。',
    score: 0.78,
    metadata: {},
    createdAt: '2026-07-01T14:00:00Z',
  },
  {
    id: '5',
    documentId: '3',
    documentName: '反洗钱内控管理制度',
    chunkIndex: 0,
    content: '建立反洗钱内控管理框架，明确各部门反洗钱职责和工作要求。客户身份识别制度明确了不同风险等级客户的识别标准和程序。',
    score: 0.71,
    metadata: {},
    createdAt: '2026-08-01T16:00:00Z',
  },
];

function KnowledgeSearch() {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedChunk, setSelectedChunk] = useState<SearchResult | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const filtered = MOCK_SEARCH_RESULTS.filter(
      (r) =>
        r.content.toLowerCase().includes(query.toLowerCase()) ||
        r.documentName.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered.length > 0 ? filtered : MOCK_SEARCH_RESULTS);
    setHasSearched(true);
    setSearching(false);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <Title level={3} style={{ color: '#1a365d' }}>
          <SearchOutlined style={{ marginRight: 8 }} />
          知识检索
        </Title>
        <Text type="secondary">
          基于向量相似度检索，快速找到最相关的制度文档内容
        </Text>
        <div style={{ marginTop: 24, maxWidth: 600, margin: '24px auto 0' }}>
          <Space.Compact style={{ width: '100%' }}>
            <Input
              size="large"
              placeholder="输入您的问题或关键词，如: 信贷审批流程..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onPressEnter={handleSearch}
              prefix={<SearchOutlined />}
            />
            <Button
              type="primary"
              size="large"
              onClick={handleSearch}
              loading={searching}
            >
              搜索
            </Button>
          </Space.Compact>
        </div>
      </div>

      {searching && (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <Spin size="large" tip="正在检索知识库..." />
        </div>
      )}

      {!searching && hasSearched && results.length === 0 && (
        <Empty description="未找到相关结果，请尝试其他关键词" />
      )}

      {!searching && results.length > 0 && (
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ marginBottom: 16 }}>
            <Text type="secondary">
              共找到 <Text strong>{results.length}</Text> 条相关结果
            </Text>
          </div>
          {results.map((result) => (
            <SearchResultItem
              key={result.id}
              result={result}
              onClick={() => setSelectedChunk(result)}
            />
          ))}
        </div>
      )}

      <ChunkViewer
        result={selectedChunk}
        onClose={() => setSelectedChunk(null)}
      />
    </div>
  );
}

export default KnowledgeSearch;
