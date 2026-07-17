import { cn } from '@/lib/utils';
import { ContactForm } from '@/components/contact-form';

interface ChatMessageProps {
  role: string;
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  // Check if this message should show a contact form
  const showContactForm = !isUser && content.includes('[CONTACT_PROMPT]');
  const displayContent = content.replace('[CONTACT_PROMPT]', '').trim();

  return (
    <article
      className={cn(
        'flex gap-3 items-start group',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
      aria-label={isUser ? 'You' : 'Li Zheng'}
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
          'max-w-[85%] sm:max-w-[80%] overflow-hidden break-words space-y-3',
          !isUser && 'w-full'
        )}
      >
        <div
          className={cn(
            'rounded-2xl px-3 py-1.5 sm:px-3.5 sm:py-2',
            isUser
              ? 'bg-foreground text-background'
              : 'bg-transparent text-foreground'
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{displayContent}</p>
        </div>

        {/* Show contact form if triggered */}
        {showContactForm && (
          <div className="mt-3">
            <ContactForm />
          </div>
        )}
      </div>
    </article>
  );
}
