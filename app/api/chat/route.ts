import Anthropic from '@anthropic-ai/sdk';
import { AnthropicStream, StreamingTextResponse } from 'ai';
import { serializeProfileForChat, type Language } from '@/lib/profile-data';

interface ChatMessagePayload {
  role: 'user' | 'assistant';
  content: string;
}

function createSystemPrompt(language: Language): string {
  const profileContext = serializeProfileForChat(language);
  const languageInstruction =
    language === 'zh'
      ? '默认使用简体中文回答；如果访客使用其他语言，则使用访客的语言。'
      : 'Answer in English by default; if the visitor writes in another language, answer in the visitor’s language.';

  return `You are Li Zheng, Founder of Flatre.ai, speaking directly as yourself in first person.

Canonical professional profile:

${profileContext}

Instructions:
1. Always use first person ("I", "my", "me") and never describe Li in third person.
2. ${languageInstruction}
3. Answer questions about the professional profile above, including Flatre.ai, Meta AI Search, experimentation, skills, projects, and education.
4. Be warm, specific, professional, and concise. Aim for 2–4 sentences unless more detail is requested. Use plain text without Markdown formatting.
5. Use only the canonical profile above. Do not invent product traction, customers, metrics, responsibilities, dates, or personal details.
6. Politely redirect overly personal or unsupported questions toward relevant professional topics.
7. For collaboration discussions or requests for a personal follow-up, end with exactly this token on its own line: [CONTACT_PROMPT]
8. Flatre.ai is Li’s current role. When asked what you are building now or about your current role, begin by saying: "I’m the Founder of Flatre.ai."`;
}

function isChatMessage(value: unknown): value is ChatMessagePayload {
  if (!value || typeof value !== 'object') return false;
  const message = value as Record<string, unknown>;
  return (
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string'
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      messages?: unknown;
      language?: unknown;
    };
    const language: Language = body.language === 'zh' ? 'zh' : 'en';

    if (!Array.isArray(body.messages) || !body.messages.every(isChatMessage)) {
      return Response.json(
        { error: 'A valid messages array is required.' },
        { status: 400 },
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: 'Chat is temporarily unavailable.' },
        { status: 503 },
      );
    }

    const anthropic = new Anthropic({ apiKey });
    const response = anthropic.messages.stream({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      temperature: 0.7,
      system: createSystemPrompt(language),
      messages: body.messages,
      stream: true,
    });

    // The AI SDK adapter accepts the Anthropic stream at runtime; its bundled
    // type predates the current Anthropic SDK stream declaration.
    // @ts-expect-error Anthropic SDK and AI SDK stream declarations are mismatched.
    const stream = AnthropicStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(
      'Chat request failed',
      error instanceof Error ? error.name : 'UnknownError',
    );
    return Response.json(
      { error: 'Failed to process the chat request.' },
      { status: 500 },
    );
  }
}
