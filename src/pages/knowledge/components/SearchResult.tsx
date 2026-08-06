import { Card, Typography, Tag, Space, Progress } from 'antd';
import { FileTextOutlined, RightOutlined } from '@ant-design/icons';
import type { SearchResult } from '@/types/knowledge';

const { Text, Paragraph } = Typography;

interface SearchResultItemProps {
  result: SearchResult;
  onClick: () => void;
}

function getScoreColor(score: number): string {
  if (score >= 0.9) return '#52c41a';
  if (score >= 0.7) return '#faad14';
  return '#ff4d4f';
}

function SearchResultItem({ result, onClick }: SearchResultItemProps) {
  return (
    <Card
      hoverable
      onClick={onClick}
      style={{ marginBottom: 12 }}
      styles={{ body: { padding: '16px 20px' } }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <Space style={{ marginBottom: 8 }}>
            <FileTextOutlined style={{ color: '#1a365d' }} />
            <Text strong style={{ fontSize: 16 }}>
              {result.documentName}
            </Text>
            <Tag>片段 #{result.chunkIndex + 1}</Tag>
          </Space>

          <Paragraph
            ellipsis={{ rows: 2 }}
            style={{ margin: '8px 0', color: '#666', lineHeight: 1.6 }}
          >
            {result.content}
          </Paragraph>

          <Space>
            <Text type="secondary" style={{ fontSize: 12 }}>
              来源：{result.documentName}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {new Date(result.createdAt).toLocaleDateString('zh-CN')}
            </Text>
          </Space>
        </div>

        <div style={{ textAlign: 'center', marginLeft: 24, minWidth: 100 }}>
          <div style={{ marginBottom: 8 }}>
            <Text strong style={{ color: getScoreColor(result.score), fontSize: 24 }}>
              {(result.score * 100).toFixed(0)}%
            </Text>
          </div>
          <Text type="secondary" style={{ fontSize: 11 }}>
            相似度
          </Text>
          <Progress
            percent={Math.round(result.score * 100)}
            showInfo={false}
            size="small"
            strokeColor={getScoreColor(result.score)}
            style={{ marginTop: 4 }}
          />
          <div style={{ marginTop: 12 }}>
            <RightOutlined style={{ color: '#999' }} />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default SearchResultItem;
