import { useState, useCallback } from 'react';

export function useSSE() {
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = useCallback(async (
    url: string,
    body: unknown,
    onChunk: (chunk: string) => void,
    onDone: () => void
  ) => {
    setIsStreaming(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: streamDone } = await reader.read();
        if (streamDone) break;
        const chunk = decoder.decode(value, { stream: true });
        onChunk(chunk);
      }
      onDone();
    } finally {
      setIsStreaming(false);
    }
  }, []);

  return { sendMessage, isStreaming };
}
