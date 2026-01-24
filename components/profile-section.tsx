'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';

export function ProfileSection() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col h-full p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Profile Photo */}
        <div className="flex justify-center pt-1 sm:pt-0">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden">
            <Image
              src="/profile.jpg"
              alt="Li Zheng"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Name and Title */}
        <div className="text-center space-y-1">
          <h1 className="text-xl sm:text-2xl font-medium">{t('profile.name')}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground/80">{t('profile.title')}</p>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 pb-3 sm:pb-4 lg:pb-6 border-b border-border/40">
          <a
            href="https://www.linkedin.com/in/li-zheng/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/60 hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          <a
            href="https://github.com/xjrmh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/60 hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>

          <a
            href="https://drive.google.com/file/d/1HIRGguTe5fRtfkaszFQq2KSxCqCu5JAo/view"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/60 hover:text-foreground transition-colors"
            aria-label="Resume PDF"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </a>

          <a
            href="mailto:li_zheng@outlook.com"
            className="text-muted-foreground/60 hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
        </div>

        {/* Experience Section */}
        <div className="space-y-2.5 sm:space-y-3 lg:space-y-4">
          <h2 className="text-xs sm:text-sm font-bold text-foreground/90 uppercase tracking-wide">{t('profile.experience')}</h2>
          <div className="space-y-3 sm:space-y-4 lg:space-y-5">
            <div className="space-y-1">
              <h3 className="text-xs sm:text-sm font-medium text-foreground">{t('exp.cofounder')}</h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground/70">{t('exp.cofounder.company')} • {t('exp.cofounder.date')}</p>
              <p className="text-[11px] sm:text-xs text-muted-foreground/60 leading-relaxed pt-0.5 sm:pt-1">
                {t('exp.cofounder.desc')}
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xs sm:text-sm font-medium text-foreground">{t('exp.meta.title')}</h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground/70">{t('exp.meta.company')} • {t('exp.meta.date')}</p>
              <p className="text-[11px] sm:text-xs text-muted-foreground/60 leading-relaxed pt-0.5 sm:pt-1">
                {t('exp.meta.desc')}
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xs sm:text-sm font-medium text-foreground">{t('exp.pwc.title')}</h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground/70">{t('exp.pwc.company')} • {t('exp.pwc.date')}</p>
              <p className="text-[11px] sm:text-xs text-muted-foreground/60 leading-relaxed pt-0.5 sm:pt-1">
                {t('exp.pwc.desc')}
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xs sm:text-sm font-medium text-foreground">{t('exp.her.title')}</h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground/70">{t('exp.her.company')} • {t('exp.her.date')}</p>
              <p className="text-[11px] sm:text-xs text-muted-foreground/60 leading-relaxed pt-0.5 sm:pt-1">
                {t('exp.her.desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-2.5 sm:space-y-3 lg:space-y-4">
          <h2 className="text-xs sm:text-sm font-bold text-foreground/90 uppercase tracking-wide">{t('profile.education')}</h2>
          <div className="space-y-3 sm:space-y-4 lg:space-y-5">
            <div className="space-y-1">
              <h3 className="text-xs sm:text-sm font-medium text-foreground">{t('edu.duke.degree')}</h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground/70">{t('edu.duke.school')} • {t('edu.duke.date')}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-xs sm:text-sm font-medium text-foreground">{t('edu.osu.degree')}</h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground/70">{t('edu.osu.school')} • {t('edu.osu.date')}</p>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="space-y-2.5 sm:space-y-3 lg:space-y-4 pb-3 sm:pb-4 lg:pb-6">
          <h2 className="text-xs sm:text-sm font-bold text-foreground/90 uppercase tracking-wide">{t('profile.projects')}</h2>
          <div className="space-y-3 sm:space-y-4 lg:space-y-5">
            <div className="space-y-1">
              <a
                href="https://apps.apple.com/us/app/go-moku/id6755308947"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-medium text-foreground hover:text-foreground/70 transition-colors inline-flex items-center gap-1"
              >
                {t('proj.gomoku')}
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
              <p className="text-[11px] sm:text-xs text-muted-foreground/60 leading-relaxed">
                {t('proj.gomoku.desc')}
              </p>
            </div>
            <div className="space-y-1">
              <a
                href="https://xjrmh.github.io/work-focus-timer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-medium text-foreground hover:text-foreground/70 transition-colors inline-flex items-center gap-1"
              >
                {t('proj.timer')}
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
              <p className="text-[11px] sm:text-xs text-muted-foreground/60 leading-relaxed">
                {t('proj.timer.desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
