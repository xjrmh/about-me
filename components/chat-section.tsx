'use client';

import { useChat } from 'ai/react';
import { useCallback, useEffect, useId, useRef } from 'react';
import { Loader2, Send } from 'lucide-react';
import { ChatMessage } from '@/components/chat-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/lib/language-context';

interface ChatSectionProps {
  onMessagesChange?: (hasMessages: boolean) => void;
}

const suggestions = [
  ['chat.suggestion.flatre', 'chat.query.flatre'],
  ['chat.suggestion.aiSearch', 'chat.query.aiSearch'],
  ['chat.suggestion.experimentation', 'chat.query.experimentation'],
  ['chat.suggestion.collaborate', 'chat.query.collaborate'],
] as const;

export function ChatSection({ onMessagesChange }: ChatSectionProps) {
  const { language, t } = useLanguage();
  const inputId = useId();
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: '/api/chat',
      body: { language },
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const setSuggestion = useCallback(
    (value: string) => {
      handleInputChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
      inputRef.current?.focus();
    },
    [handleInputChange],
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    onMessagesChange?.(messages.length > 0);
  }, [messages.length, onMessagesChange]);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <ScrollArea
        className={`flex-1 overflow-x-hidden ${
          messages.length === 0 ? 'px-4 py-5' : 'px-4 py-6'
        } sm:px-6`}
      >
        <div
          className="mx-auto w-full max-w-2xl space-y-5"
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          aria-label={t('chat.header')}
        >
          {messages.length === 0 ? (
            <div className="flex min-h-[180px] items-center justify-center lg:min-h-[260px]">
              <div className="max-w-md space-y-5 text-center">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t('chat.welcome')}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestions.map(([label, query]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setSuggestion(t(query))}
                      className="min-h-11 rounded-full border border-border px-3 text-xs font-medium text-foreground/75 transition-colors hover:border-foreground/30 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:min-h-9"
                    >
                      {t(label)}
                    </button>
                  ))}
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

          {isLoading ? (
            <div
              className="flex items-center gap-2 text-sm text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>{t('chat.loading')}</span>
            </div>
          ) : null}

          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {t('chat.error')}
            </p>
          ) : null}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t border-border/70 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:py-4">
        <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-2xl gap-2">
          <label htmlFor={inputId} className="sr-only">
            {t('chat.inputLabel')}
          </label>
          <Input
            id={inputId}
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder={t('chat.placeholder')}
            disabled={isLoading}
            autoComplete="off"
            className="h-11 flex-1 bg-muted/30 text-base transition-colors focus-visible:bg-background sm:text-sm"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            size="icon"
            className="h-11 w-11 shrink-0"
            aria-label={t('chat.send')}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
