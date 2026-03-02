'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';

export function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-full">
      <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8 pt-4 pb-2 px-5 sm:pt-6 sm:pb-2 sm:px-4 lg:pt-8 lg:pb-3 lg:pl-3 lg:pr-3">
        <div className="space-y-2.5 sm:space-y-3 lg:space-y-4">
          <h2 className="text-sm font-bold text-foreground/90 uppercase tracking-wide">{t('profile.projects')}</h2>
          <div className="space-y-3 sm:space-y-4 lg:space-y-5">
            <div className="space-y-1">
              <a
                href="https://experimentdesigner.xjrmh.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors inline-flex items-center gap-1"
              >
                {t('proj.experimentdesigner')}
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                {t('proj.experimentdesigner.desc')}
              </p>
              <a href="https://experimentdesigner.xjrmh.com" target="_blank" rel="noopener noreferrer" className="relative block w-full aspect-video rounded-md overflow-hidden border border-border/40 mt-1.5 hover:opacity-80 transition-opacity">
                <Image
                  src="/project_screenshots/experiment-designer.png"
                  alt="Experiment Designer screenshot"
                  fill
                  className="object-cover"
                />
              </a>
            </div>
            <div className="space-y-1">
              <a
                href="https://northstar.xjrmh.com/auth/signin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors inline-flex items-center gap-1"
              >
                {t('proj.northstar')}
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                {t('proj.northstar.desc')}
              </p>
              <a href="https://northstar.xjrmh.com/auth/signin" target="_blank" rel="noopener noreferrer" className="relative block w-full aspect-video rounded-md overflow-hidden border border-border/40 mt-1.5 hover:opacity-80 transition-opacity">
                <Image
                  src="/project_screenshots/northstar.png"
                  alt="NorthStar screenshot"
                  fill
                  className="object-cover"
                />
              </a>
            </div>
            <div className="space-y-1">
              <a
                href="https://www.closewithflat.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors inline-flex items-center gap-1"
              >
                {t('proj.flat')}
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                {t('proj.flat.desc')}
              </p>
              <a href="https://www.closewithflat.com" target="_blank" rel="noopener noreferrer" className="relative block w-full aspect-video rounded-md overflow-hidden border border-border/40 mt-1.5 hover:opacity-80 transition-opacity">
                <Image
                  src="/project_screenshots/close-with-flat.png"
                  alt="Close with Flat screenshot"
                  fill
                  className="object-cover"
                />
              </a>
            </div>
            <div className="space-y-1">
              <a
                href="https://aterminal.xjrmh.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors inline-flex items-center gap-1"
              >
                {t('proj.aterminal')}
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                {t('proj.aterminal.desc')}
              </p>
              <a href="https://aterminal.xjrmh.com" target="_blank" rel="noopener noreferrer" className="relative block w-full aspect-video rounded-md overflow-hidden border border-border/40 mt-1.5 hover:opacity-80 transition-opacity">
                <Image
                  src="/project_screenshots/alpha-terminal.png"
                  alt="Alpha Terminal screenshot"
                  fill
                  className="object-cover"
                />
              </a>
            </div>
            <div className="space-y-1">
              <a
                href="https://apps.apple.com/us/app/go-moku/id6755308947"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors inline-flex items-center gap-1"
              >
                {t('proj.gomoku')}
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                {t('proj.gomoku.desc')}
              </p>
            </div>
            <div className="space-y-1">
              <a
                href="https://xjrmh.github.io/work-focus-timer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors inline-flex items-center gap-1"
              >
                {t('proj.timer')}
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                {t('proj.timer.desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
