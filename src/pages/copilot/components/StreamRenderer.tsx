import { useEffect, useState } from 'react';

interface StreamRendererProps {
  content: string;
}

function StreamRenderer({ content }: StreamRendererProps) {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span>
      {content}
      <span
        style={{
          display: 'inline-block',
          width: 2,
          height: '1em',
          backgroundColor: '#1a365d',
          marginLeft: 1,
          verticalAlign: 'text-bottom',
          opacity: showCursor ? 1 : 0,
          transition: 'opacity 0.1s',
        }}
      />
    </span>
  );
}

export default StreamRenderer;
