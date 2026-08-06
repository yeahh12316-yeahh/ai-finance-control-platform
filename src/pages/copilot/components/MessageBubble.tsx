import { Avatar, Card, Typography } from 'antd';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import StreamRenderer from './StreamRenderer';
import type { ChatMessage } from '@/types/copilot';

const { Text } = Typography;

interface MessageBubbleProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 16,
        }}
      >
        <div style={{ maxWidth: '80%' }}>
          <div
            style={{
              background: '#1a365d',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: '12px 12px 4px 12px',
              lineHeight: 1.6,
              wordBreak: 'break-word',
            }}
          >
            {message.content}
          </div>
          <div style={{ textAlign: 'right', marginTop: 4 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {new Date(message.createdAt).toLocaleTimeString('zh-CN')}
            </Text>
          </div>
        </div>
        <Avatar
          icon={<UserOutlined />}
          style={{ marginLeft: 8, flexShrink: 0 }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: 16,
      }}
    >
      <Avatar
        icon={<RobotOutlined />}
        style={{
          marginRight: 8,
          flexShrink: 0,
          backgroundColor: '#52c41a',
        }}
      />
      <div style={{ maxWidth: '80%' }}>
        <div
          style={{
            background: '#f5f5f5',
            padding: '10px 16px',
            borderRadius: '12px 12px 12px 4px',
            lineHeight: 1.6,
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >
          {isStreaming ? (
            <StreamRenderer content={message.content} />
          ) : (
            message.content
          )}
        </div>
        {message.references && message.references.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              参考来源：
            </Text>
            {message.references.map((ref, idx) => (
              <Card
                key={idx}
                size="small"
                style={{ marginTop: 4 }}
                styles={{ body: { padding: '6px 12px' } }}
              >
                <Text style={{ fontSize: 12 }}>
                  <strong>{ref.documentName}</strong>
                  {ref.snippet && ` - ${ref.snippet}`}
                </Text>
                <br />
                <Text type="secondary" style={{ fontSize: 11 }}>
                  相似度：{(ref.score * 100).toFixed(1)}%
                </Text>
              </Card>
            ))}
          </div>
        )}
        {!isStreaming && (
          <div style={{ marginTop: 4 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {new Date(message.createdAt).toLocaleTimeString('zh-CN')}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
