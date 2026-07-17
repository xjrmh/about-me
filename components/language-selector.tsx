'use client';

import { useLanguage } from '@/lib/language-context';

export function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      className="inline-flex items-center rounded-full border border-border/70 bg-background p-0.5"
      role="group"
      aria-label={t('language.selectorLabel')}
    >
      <button
        type="button"
        lang="en"
        aria-pressed={language === 'en'}
        aria-label={t('language.english')}
        onClick={() => setLanguage('en')}
        className={`${compact ? 'px-2' : 'px-2.5'} h-11 min-w-11 rounded-full text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:h-8 lg:min-w-10 ${
          language === 'en'
            ? 'bg-foreground text-background'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        lang="zh-CN"
        aria-pressed={language === 'zh'}
        aria-label={t('language.chinese')}
        onClick={() => setLanguage('zh')}
        className={`${compact ? 'px-2' : 'px-2.5'} h-11 min-w-11 rounded-full text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:h-8 lg:min-w-10 ${
          language === 'zh'
            ? 'bg-foreground text-background'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        中文
      </button>
    </div>
  );
}
