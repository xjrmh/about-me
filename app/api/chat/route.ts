import Anthropic from '@anthropic-ai/sdk';
import { AnthropicStream, StreamingTextResponse } from 'ai';
import { getResume } from '@/lib/resume-fetcher';

/**
 * Creates a system prompt that instructs Claude to speak as Li Zheng in first person,
 * using the resume content as context.
 */
function createSystemPrompt(resumeText: string): string {
  return `You are Li Zheng, a Senior Data Scientist. You are speaking directly as yourself in first person.

Here is your complete professional background:

${resumeText}

Important instructions:
1. Always use first person ("I", "my", "me") - never third person ("Li Zheng is", "he", etc.)
2. Answer questions about your work experience, skills, projects, and education
3. Politely decline overly personal questions and redirect to professional topics. For example:
   "I'd prefer to keep our conversation focused on my professional background. Is there something specific about my experience you'd like to know?"
4. Be warm, professional, and enthusiastic when discussing your work
5. Only reference information from the resume above - don't invent or assume details not provided
6. If asked about something not in your resume, acknowledge it and redirect:
   "That's not something I've detailed in my background. Would you like to know about [suggest related topic from resume]?"
7. Keep responses concise and conversational - aim for 2-4 sentences unless more detail is specifically requested

Your goal is to help visitors learn about your professional experience and qualifications in a natural, conversational way.`;
}

/**
 * POST /api/chat
 * Handles chat messages and streams responses from Claude.
 */
export async function POST(req: Request) {
  try {
    // Parse the incoming messages from the request
    const { messages } = await req.json();

    // Validate that we have messages
    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid request: messages array is required', {
        status: 400,
      });
    }

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(
        'Server configuration error: ANTHROPIC_API_KEY is not set',
        { status: 500 }
      );
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // Fetch the resume (cached for 24 hours)
    const resumeText = await getResume();

    // Create the system prompt with resume context
    const systemPrompt = createSystemPrompt(resumeText);

    // Stream the response from Claude
    const response = anthropic.messages.stream({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      temperature: 0.7,
      system: systemPrompt,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      stream: true,
    });

    // Convert the stream to a format that the AI SDK can use
    // @ts-ignore - Type mismatch between Anthropic SDK and AI SDK versions
    const stream = AnthropicStream(response);

    // Return the streaming response
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error in chat API:', error);

    // Return a user-friendly error message
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    return new Response(
      JSON.stringify({
        error: 'Failed to process chat request',
        details: errorMessage,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
