export type AgentType =
  | 'regulation_parser'
  | 'risk_identifier'
  | 'control_designer'
  | 'control_tester'
  | 'deficiency_analyzer'
  | 'process_optimizer'
  | 'risk_monitor';

export interface ChatSession {
  id: string;
  title: string;
  agentType: string;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  agentType: string;
  references?: ReferenceSource[];
  createdAt: string;
}

export interface ReferenceSource {
  documentId: string;
  documentName: string;
  chunkIndex: number;
  snippet: string;
  score: number;
}

export interface AgentInfo {
  type: AgentType;
  name: string;
  description: string;
  icon: string;
}
