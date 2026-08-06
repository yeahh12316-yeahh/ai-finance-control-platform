import { get, post } from '@/utils/request';
import type { ApiResponse } from '@/types/api';

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  agentType: string;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  title: string;
  agentType: string;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatParams {
  agentType: string;
  message: string;
  sessionId?: string;
}

/**
 * Send a chat message and receive streaming response.
 * Returns the raw Response for SSE consumption.
 */
export async function chatStream(params: ChatParams): Promise<Response> {
  const token = localStorage.getItem('ic_platform_token');
  const response = await fetch('/api/v1/ai-copilot/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(`Chat request failed with status ${response.status}`);
  }

  return response;
}

export function getSessions(agentType?: string): Promise<ApiResponse<ChatSession[]>> {
  const params: Record<string, unknown> = {};
  if (agentType) params.agentType = agentType;
  return get<ChatSession[]>('/ai-copilot/sessions', params);
}

export function createSession(params: { title: string; agentType: string }): Promise<ApiResponse<ChatSession>> {
  return post<ChatSession>('/ai-copilot/sessions', params as unknown as Record<string, unknown>);
}

export function getSessionMessages(sessionId: string): Promise<ApiResponse<ChatMessage[]>> {
  return get<ChatMessage[]>(`/ai-copilot/sessions/${sessionId}/messages`);
}
