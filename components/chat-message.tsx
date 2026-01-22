import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
        'flex w-full gap-3 mb-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {/* Assistant avatar (left side) */}
      {!isUser && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarFallback className="text-xs bg-primary text-primary-foreground">
            LZ
          </AvatarFallback>
        </Avatar>
      )}

      {/* Message content */}
      <div
        className={cn(
          'rounded-lg px-4 py-2 max-w-[80%] break-words',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>
      </div>

      {/* User avatar (right side) - optional */}
      {isUser && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarFallback className="text-xs bg-secondary">U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
