import { http, HttpResponse } from 'msw';
import { v4 as uuid } from 'uuid';
import { copilotPrompts } from '../data/copilotPrompts';

function successResponse<T>(data: T) {
  return {
    code: 0,
    message: 'success',
    data,
    timestamp: Date.now(),
    requestId: uuid(),
  };
}

function errorResponse(message: string, code = 1) {
  return {
    code,
    message,
    data: null,
    timestamp: Date.now(),
    requestId: uuid(),
  };
}

const agentTypes = [
  'regulation_parser',
  'risk_identifier',
  'control_designer',
  'control_tester',
  'deficiency_analyzer',
  'process_optimizer',
  'risk_monitor',
] as const;

function getMockResponse(agentType: string, message: string): string {
  const prompts = copilotPrompts[agentType];
  if (!prompts) {
    return '抱歉，我暂时无法处理您的请求。请尝试切换其他智能体。';
  }

  // Match keywords to specific responses
  const lowerMessage = message.toLowerCase();
  for (const [key, response] of Object.entries(prompts)) {
    if (key !== 'default' && lowerMessage.includes(key.toLowerCase())) {
      return response;
    }
  }

  return prompts.default || '正在为您分析，请稍候...';
}

interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  agentType: string;
  createdAt: string;
}

interface ChatSession {
  id: string;
  title: string;
  agentType: string;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

const sessions: ChatSession[] = [];
const messages: ChatMessage[] = [];

// Pre-populate some sessions
sessions.push({
  id: 'session-001',
  title: '信贷业务流程风险分析',
  agentType: 'risk_identifier',
  messageCount: 4,
  createdAt: '2026-08-05T09:00:00Z',
  updatedAt: '2026-08-05T09:30:00Z',
});
messages.push(
  {
    id: 'msg-001',
    sessionId: 'session-001',
    role: 'user',
    content: '帮我分析信贷业务流程的风险',
    agentType: 'risk_identifier',
    createdAt: '2026-08-05T09:00:00Z',
  },
  {
    id: 'msg-002',
    sessionId: 'session-001',
    role: 'assistant',
    content: copilotPrompts.risk_identifier.default,
    agentType: 'risk_identifier',
    createdAt: '2026-08-05T09:00:30Z',
  },
);

sessions.push({
  id: 'session-002',
  title: '房地产行业集中度风险分析',
  agentType: 'risk_monitor',
  messageCount: 2,
  createdAt: '2026-08-06T10:00:00Z',
  updatedAt: '2026-08-06T10:15:00Z',
});
messages.push(
  {
    id: 'msg-003',
    sessionId: 'session-002',
    role: 'user',
    content: '分析最近的趋势',
    agentType: 'risk_monitor',
    createdAt: '2026-08-06T10:00:00Z',
  },
  {
    id: 'msg-004',
    sessionId: 'session-002',
    role: 'assistant',
    content: copilotPrompts.risk_monitor['趋势分析'],
    agentType: 'risk_monitor',
    createdAt: '2026-08-06T10:00:30Z',
  },
);

export const copilotHandlers = [
  // POST /api/v1/ai-copilot/chat — SSE streaming response
  http.post('/api/v1/ai-copilot/chat', async ({ request }) => {
    const body = (await request.json()) as {
      agentType?: string;
      message?: string;
      sessionId?: string;
    };

    const { agentType = 'risk_identifier', message = '', sessionId } = body;

    if (!message) {
      return HttpResponse.json(errorResponse('消息不能为空'), { status: 400 });
    }

    if (!agentTypes.includes(agentType as (typeof agentTypes)[number])) {
      return HttpResponse.json(errorResponse('无效的智能体类型'), { status: 400 });
    }

    const responseText = getMockResponse(agentType, message);

    // Save user message
    const userMsg: ChatMessage = {
      id: `msg-${uuid().slice(0, 8)}`,
      sessionId: sessionId || 'temp',
      role: 'user',
      content: message,
      agentType,
      createdAt: new Date().toISOString(),
    };
    messages.push(userMsg);

    // Create SSE stream
    const stream = new ReadableStream({
      async start(controller) {
        // Send SSE metadata first
        const msgId = `msg-${uuid().slice(0, 8)}`;
        const metadata = JSON.stringify({
          id: msgId,
          sessionId: sessionId || `session-${uuid().slice(0, 8)}`,
          agentType,
          timestamp: Date.now(),
        });
        controller.enqueue(new TextEncoder().encode(`data: ${metadata}\n\n`));

        // Stream the response character by character
        for (let i = 0; i < responseText.length; i++) {
          const chunk = JSON.stringify({ content: responseText[i], done: false });
          controller.enqueue(new TextEncoder().encode(`data: ${chunk}\n\n`));
          await new Promise((r) => setTimeout(r, 30 + Math.random() * 50));
        }

        // Send completion
        const done = JSON.stringify({ content: '', done: true });
        controller.enqueue(new TextEncoder().encode(`data: ${done}\n\n`));

        // Save assistant message
        const assistantMsg: ChatMessage = {
          id: msgId,
          sessionId: sessionId || `session-${uuid().slice(0, 8)}`,
          role: 'assistant',
          content: responseText,
          agentType,
          createdAt: new Date().toISOString(),
        };
        messages.push(assistantMsg);

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  }),

  // GET /api/v1/ai-copilot/sessions
  http.get('/api/v1/ai-copilot/sessions', async ({ request }) => {
    const url = new URL(request.url);
    const agentType = url.searchParams.get('agentType') || '';

    let filtered = sessions;
    if (agentType) {
      filtered = sessions.filter((s) => s.agentType === agentType);
    }

    return HttpResponse.json(successResponse(filtered));
  }),

  // POST /api/v1/ai-copilot/sessions
  http.post('/api/v1/ai-copilot/sessions', async ({ request }) => {
    const body = (await request.json()) as { title?: string; agentType?: string };

    if (!body.title || !body.agentType) {
      return HttpResponse.json(errorResponse('标题和智能体类型不能为空'), { status: 400 });
    }

    const now = new Date().toISOString();
    const newSession: ChatSession = {
      id: `session-${uuid().slice(0, 8)}`,
      title: body.title,
      agentType: body.agentType,
      messageCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    sessions.push(newSession);

    return HttpResponse.json(successResponse(newSession), { status: 201 });
  }),

  // GET /api/v1/ai-copilot/sessions/:id/messages
  http.get('/api/v1/ai-copilot/sessions/:id/messages', async ({ params }) => {
    const { id } = params;
    const session = sessions.find((s) => s.id === id);

    if (!session) {
      return HttpResponse.json(errorResponse('会话不存在'), { status: 404 });
    }

    const sessionMessages = messages.filter((m) => m.sessionId === id);

    return HttpResponse.json(successResponse(sessionMessages));
  }),
];
