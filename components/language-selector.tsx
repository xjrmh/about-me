'use client';

import { useLanguage } from '@/lib/language-context';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-3 left-3 z-50">
      <div className="flex items-center text-xs sm:text-sm text-muted-foreground/70">
        <button
          onClick={() => setLanguage('en')}
          className={`px-1.5 py-0.5 transition-colors ${
            language === 'en'
              ? 'text-foreground font-medium'
              : 'hover:text-foreground/80'
          }`}
        >
          Eng
        </button>
        <span className="text-border">|</span>
        <button
          onClick={() => setLanguage('zh')}
          className={`px-1.5 py-0.5 transition-colors ${
            language === 'zh'
              ? 'text-foreground font-medium'
              : 'hover:text-foreground/80'
          }`}
        >
          中文
        </button>
      </div>
    </div>
  );
}
