import { cn } from '@/lib/utils';

interface ChatMessageProps {
  role: string;
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'flex gap-3 items-start group',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity',
          isUser
            ? 'bg-foreground/5 text-foreground/40'
            : 'bg-foreground/5 text-foreground/40'
        )}
      >
        {isUser ? 'Y' : 'L'}
      </div>

      {/* Message content */}
      <div
        className={cn(
          'rounded-2xl px-3.5 py-2 max-w-[80%]',
          isUser
            ? 'bg-foreground text-background'
            : 'bg-transparent text-foreground'
        )}
      >
        <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
