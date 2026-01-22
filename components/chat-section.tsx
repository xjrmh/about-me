'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from '@/components/chat-message';
import { Send, Loader2, User } from 'lucide-react';

interface ChatSectionProps {
  onMessagesChange: (hasMessages: boolean) => void;
  showProfile: boolean;
  onToggleProfile: () => void;
}

export function ChatSection({ onMessagesChange, showProfile, onToggleProfile }: ChatSectionProps) {
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

  // Notify parent when messages change
  useEffect(() => {
    onMessagesChange(messages.length > 0);
  }, [messages.length, onMessagesChange]);

  return (
    <div className="flex flex-col h-full w-full overflow-x-hidden">
      {/* Header with profile toggle (mobile only, shown when messages exist) */}
      {messages.length > 0 && (
        <div className="lg:hidden border-b border-border/40 px-4 py-3 flex items-center justify-between">
          <h2 className="text-sm font-medium">Chat</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleProfile}
            className="h-8 w-8 p-0"
            aria-label="Toggle profile"
          >
            <User className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Messages area */}
      <ScrollArea className={`flex-1 ${messages.length === 0 ? 'px-4 py-3 sm:px-6 sm:py-4' : 'px-4 py-6 sm:px-6 sm:py-8'} overflow-x-hidden`} ref={scrollAreaRef}>
        <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto w-full">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full min-h-[80px] sm:min-h-[100px] lg:min-h-[200px]">
              <div className="text-center space-y-2.5 sm:space-y-3 lg:space-y-6 max-w-md px-4">
                <p className="text-xs sm:text-sm text-muted-foreground/70">
                  Hi, I&apos;m Li. Ask me anything about my work.
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
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
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs text-muted-foreground/70 hover:text-foreground border border-border/50 hover:border-border rounded-full transition-colors"
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
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs text-muted-foreground/70 hover:text-foreground border border-border/50 hover:border-border rounded-full transition-colors"
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
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs text-muted-foreground/70 hover:text-foreground border border-border/50 hover:border-border rounded-full transition-colors"
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
          {isLoading && messages.length > 0 && (
            <div className="flex items-center gap-2 text-muted-foreground/50 text-sm">
              <Loader2 className="w-3 h-3 animate-spin" />
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="text-destructive/80 text-xs sm:text-sm">
              {error.message}
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t px-4 py-3 sm:px-6 sm:py-4 w-full">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-2xl mx-auto w-full">
          <Input
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="flex-1 border-0 bg-muted/30 focus-visible:ring-0 focus-visible:bg-muted/50 transition-colors text-sm"
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
