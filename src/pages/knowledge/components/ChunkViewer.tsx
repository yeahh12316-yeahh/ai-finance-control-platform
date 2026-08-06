import { Modal, Typography, Tag, Descriptions, Space } from 'antd';
import { FileTextOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { SearchResult } from '@/types/knowledge';

const { Title, Paragraph, Text } = Typography;

interface ChunkViewerProps {
  result: SearchResult | null;
  onClose: () => void;
}

function ChunkViewer({ result, onClose }: ChunkViewerProps) {
  if (!result) return null;

  return (
    <Modal
      title={
        <Space>
          <FileTextOutlined />
          <span>知识片段详情</span>
        </Space>
      }
      open={!!result}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <div style={{ marginBottom: 24 }}>
        <Title level={5} style={{ marginBottom: 8 }}>
          {result.documentName}
        </Title>
        <Space>
          <Tag>片段 #{result.chunkIndex + 1}</Tag>
          <Tag color="blue">
            相似度：{(result.score * 100).toFixed(1)}%
          </Tag>
        </Space>
      </div>

      <Descriptions column={1} size="small" bordered style={{ marginBottom: 24 }}>
        <Descriptions.Item label="来源文档">{result.documentName}</Descriptions.Item>
        <Descriptions.Item label="片段序号">{result.chunkIndex + 1}</Descriptions.Item>
        <Descriptions.Item label="创建时间">
          <Space>
            <ClockCircleOutlined />
            {new Date(result.createdAt).toLocaleString('zh-CN')}
          </Space>
        </Descriptions.Item>
        {result.score !== undefined && (
          <Descriptions.Item label="相似度分数">
            <Text strong style={{ color: '#1a365d' }}>
              {(result.score * 100).toFixed(2)}%
            </Text>
          </Descriptions.Item>
        )}
      </Descriptions>

      <div style={{ marginTop: 16 }}>
        <Text strong style={{ fontSize: 14, marginBottom: 12, display: 'block' }}>
          片段内容
        </Text>
        <div
          style={{
            background: '#fafafa',
            border: '1px solid #f0f0f0',
            borderRadius: 8,
            padding: 16,
            maxHeight: 300,
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: 14,
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
          }}
        >
          {result.content}
        </div>
      </div>
    </Modal>
  );
}

export default ChunkViewer;
