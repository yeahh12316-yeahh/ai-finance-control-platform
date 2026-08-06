import { useState } from 'react';
import { Typography } from 'antd';

const { Paragraph } = Typography;

interface DocumentViewerProps {
  content: string;
  title?: string;
}

function DocumentViewer({ content, title }: DocumentViewerProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        background: '#fafafa',
        border: '1px solid #f0f0f0',
        borderRadius: 8,
        padding: 24,
        maxHeight: expanded ? 'none' : 500,
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'monospace',
        fontSize: 14,
        lineHeight: 1.8,
        whiteSpace: 'pre-wrap',
      }}
    >
      {title && (
        <h3 style={{ marginTop: 0, marginBottom: 16, color: '#1a365d' }}>{title}</h3>
      )}
      <Paragraph style={{ marginBottom: 0 }}>{content}</Paragraph>
      {content.length > 1000 && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background: 'linear-gradient(transparent, #fafafa)',
            display: expanded ? 'none' : 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: 12,
          }}
        >
          <span
            style={{
              cursor: 'pointer',
              color: '#1890ff',
              fontWeight: 500,
            }}
            onClick={() => setExpanded(true)}
          >
            展开全部内容
          </span>
        </div>
      )}
    </div>
  );
}

export default DocumentViewer;
