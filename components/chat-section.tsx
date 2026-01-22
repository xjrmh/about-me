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
      {/* Messages area */}
      <ScrollArea className="flex-1 px-6 py-8" ref={scrollAreaRef}>
        <div className="space-y-6 max-w-2xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-6 max-w-md">
                <p className="text-sm text-muted-foreground/70">
                  Hi, I'm Li. Ask me anything about my work.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const inputElement = document.querySelector('input') as HTMLInputElement;
                      if (inputElement) {
                        const value = 'What technologies do you work with?';
                        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
                        nativeInputValueSetter?.call(inputElement, value);
                        const event = new Event('input', { bubbles: true });
                        inputElement.dispatchEvent(event);
                        inputElement.focus();
                      }
                    }}
                    className="px-3 py-1.5 text-xs text-muted-foreground/70 hover:text-foreground border border-border/50 hover:border-border rounded-full transition-colors"
                  >
                    Technologies
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const inputElement = document.querySelector('input') as HTMLInputElement;
                      if (inputElement) {
                        const value = 'Tell me about your recent projects';
                        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
                        nativeInputValueSetter?.call(inputElement, value);
                        const event = new Event('input', { bubbles: true });
                        inputElement.dispatchEvent(event);
                        inputElement.focus();
                      }
                    }}
                    className="px-3 py-1.5 text-xs text-muted-foreground/70 hover:text-foreground border border-border/50 hover:border-border rounded-full transition-colors"
                  >
                    Projects
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const inputElement = document.querySelector('input') as HTMLInputElement;
                      if (inputElement) {
                        const value = "What's your experience with machine learning?";
                        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
                        nativeInputValueSetter?.call(inputElement, value);
                        const event = new Event('input', { bubbles: true });
                        inputElement.dispatchEvent(event);
                        inputElement.focus();
                      }
                    }}
                    className="px-3 py-1.5 text-xs text-muted-foreground/70 hover:text-foreground border border-border/50 hover:border-border rounded-full transition-colors"
                  >
                    ML Experience
                  </button>
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
            <div className="flex items-center gap-2 text-muted-foreground/50 text-sm">
              <Loader2 className="w-3 h-3 animate-spin" />
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="text-destructive/80 text-sm">
              {error.message}
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t px-6 py-4">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-2xl mx-auto">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="flex-1 border-0 bg-muted/30 focus-visible:ring-0 focus-visible:bg-muted/50 transition-colors"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            size="icon"
            className="shrink-0"
          >
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
