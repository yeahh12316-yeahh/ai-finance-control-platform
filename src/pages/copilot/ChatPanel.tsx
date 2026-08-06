import { useState, useRef, useEffect, useCallback } from 'react';
import { Input, Button, Space, Empty, Card, Typography } from 'antd';
import {
  SendOutlined,
  RobotOutlined,
  UserOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import { useSSE } from '@/hooks/useSSE';
import { copilotPrompts } from '@/mocks/data/copilotPrompts';
import MessageBubble from './components/MessageBubble';
import PromptTemplates from './components/PromptTemplates';
import type { ChatMessage, AgentType } from '@/types/copilot';

const { TextArea } = Input;

interface ChatPanelProps {
  agentType: AgentType | null;
  sessionId?: string;
  onSessionCreated: (sessionId: string) => void;
}

function ChatPanel({ agentType, sessionId, onSessionCreated }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage, isStreaming } = useSSE();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, scrollToBottom]);

  const handleSend = async () => {
    if (!inputValue.trim() || !agentType || sending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sessionId: sessionId || '',
      role: 'user',
      content: inputValue.trim(),
      agentType,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setSending(true);

    if (!sessionId) {
      const newSessionId = `session-${Date.now()}`;
      onSessionCreated(newSessionId);
    }

    // Simulate streaming response
    const promptCategory = agentType;
    const promptKey = inputValue.includes('反洗钱')
      ? '反洗钱'
      : inputValue.includes('合规')
        ? '合规'
        : inputValue.includes('风险评估')
          ? '风险评估'
          : inputValue.includes('测试') || inputValue.includes('底稿')
            ? '底稿分析'
            : inputValue.includes('整改')
              ? '整改跟踪'
              : inputValue.includes('趋势')
                ? '趋势分析'
                : inputValue.includes('流程')
                  ? '流程梳理'
                  : 'default';

    const responseText =
      copilotPrompts[promptCategory]?.[promptKey] ||
      copilotPrompts[promptCategory]?.['default'] ||
      '已收到您的消息，正在处理中...';

    // Simulate streaming character by character
    let currentIndex = 0;
    setStreamingContent('');
    const streamInterval = setInterval(() => {
      currentIndex++;
      setStreamingContent(responseText.slice(0, currentIndex));
      if (currentIndex >= responseText.length) {
        clearInterval(streamInterval);
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sessionId: sessionId || '',
          role: 'assistant',
          content: responseText,
          agentType,
          references: [
            {
              documentId: '1',
              documentName: '银行信贷业务管理办法',
              chunkIndex: 0,
              snippet: '规范全行信贷业务操作流程和管理要求的基本制度文件',
              score: 0.95,
            },
          ],
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setStreamingContent('');
        setSending(false);
      }
    }, 30);
  };

  const handleClear = () => {
    setMessages([]);
    setStreamingContent('');
  };

  const handleTemplateSelect = (template: string) => {
    setInputValue(template);
  };

  if (!agentType) {
    return (
      <Card
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Empty description="请从左侧选择一个 Agent 开始对话" />
      </Card>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 200px)',
        background: '#fff',
        borderRadius: 8,
        border: '1px solid #f0f0f0',
      }}
    >
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Space>
          <RobotOutlined style={{ color: '#1a365d' }} />
          <Typography.Text strong>AI 对话</Typography.Text>
          {sessionId && (
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Session: {sessionId.slice(0, 8)}...
            </Typography.Text>
          )}
        </Space>
        <Button
          size="small"
          icon={<ClearOutlined />}
          onClick={handleClear}
          disabled={messages.length === 0}
        >
          清空对话
        </Button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '16px 24px' }}>
        {messages.length === 0 && !streamingContent && (
          <PromptTemplates agentType={agentType} onSelect={handleTemplateSelect} />
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {streamingContent && (
          <MessageBubble
            message={{
              id: 'streaming',
              sessionId: sessionId || '',
              role: 'assistant',
              content: streamingContent,
              agentType,
              createdAt: new Date().toISOString(),
            }}
            isStreaming
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #f0f0f0',
        }}
      >
        <Space.Compact style={{ width: '100%' }}>
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="输入您的问题，按 Enter 发送，Shift+Enter 换行..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            disabled={sending}
            style={{ resize: 'none' }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            loading={sending}
            disabled={!inputValue.trim()}
            style={{ height: 'auto' }}
          >
            发送
          </Button>
        </Space.Compact>
      </div>
    </div>
  );
}

export default ChatPanel;
