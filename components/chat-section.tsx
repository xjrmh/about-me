'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from '@/components/chat-message';
import { Send, Loader2 } from 'lucide-react';

export function ChatSection() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: '/api/chat',
    });

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="border-b p-4 bg-background">
        <h2 className="text-2xl font-semibold">Chat with Li Zheng</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Ask me about my experience, skills, and projects
        </p>
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center p-8">
              <div className="space-y-4">
                <p className="text-lg font-medium text-muted-foreground">
                  Welcome! 👋
                </p>
                <p className="text-sm text-muted-foreground max-w-md">
                  I&apos;m Li Zheng, a Senior Data Scientist. Feel free to ask me
                  about my work experience, technical skills, projects, or
                  anything related to my professional background.
                </p>
                <div className="pt-4 space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Try asking:
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• &quot;What technologies do you work with?&quot;</li>
                    <li>• &quot;Tell me about your recent projects&quot;</li>
                    <li>• &quot;What&apos;s your experience with machine learning?&quot;</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
              />
            ))
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-sm">
              <p className="font-medium">Error</p>
              <p className="mt-1">{error.message}</p>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t p-4 bg-background">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything about my professional background..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
