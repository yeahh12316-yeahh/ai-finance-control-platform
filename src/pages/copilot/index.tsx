import { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import AgentSelector from './AgentSelector';
import ChatPanel from './ChatPanel';
import type { AgentType } from '@/types/copilot';

function CopilotPage() {
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
  const [sessionId, setSessionId] = useState<string | undefined>();

  return (
    <PageContainer title="AI 智能工作台">
      <div style={{ display: 'flex', gap: 24, minHeight: 'calc(100vh - 200px)' }}>
        <div style={{ width: 280, flexShrink: 0 }}>
          <AgentSelector
            selectedAgent={selectedAgent}
            onSelect={(agent) => {
              setSelectedAgent(agent);
              setSessionId(undefined);
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <ChatPanel
            agentType={selectedAgent}
            sessionId={sessionId}
            onSessionCreated={setSessionId}
          />
        </div>
      </div>
    </PageContainer>
  );
}

export default CopilotPage;
