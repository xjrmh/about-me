'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { ChatSection } from '@/components/chat-section';
import { LanguageSelector } from '@/components/language-selector';
import { ProfileSection } from '@/components/profile-section';
import { ProjectsSection } from '@/components/projects-section';
import { SocialLinks } from '@/components/social-links';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { localize, profileData } from '@/lib/profile-data';

type MobileTab = 'experience' | 'projects';

const mobileTabs: MobileTab[] = ['experience', 'projects'];

export function HomeClient() {
  const [activeTab, setActiveTab] = useState<MobileTab>('experience');
  const [showChat, setShowChat] = useState(false);
  const { language, t } = useLanguage();
  const tabRefs = useRef<Record<MobileTab, HTMLButtonElement | null>>({
    experience: null,
    projects: null,
  });
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const selectAndFocusTab = useCallback((tab: MobileTab) => {
    setActiveTab(tab);
    tabRefs.current[tab]?.focus();
  }, []);

  const handleTabKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, tab: MobileTab) => {
      const index = mobileTabs.indexOf(tab);
      let target: MobileTab | undefined;

      if (event.key === 'ArrowRight') {
        target = mobileTabs[(index + 1) % mobileTabs.length];
      } else if (event.key === 'ArrowLeft') {
        target = mobileTabs[(index - 1 + mobileTabs.length) % mobileTabs.length];
      } else if (event.key === 'Home') {
        target = mobileTabs[0];
      } else if (event.key === 'End') {
        target = mobileTabs[mobileTabs.length - 1];
      }

      if (target) {
        event.preventDefault();
        selectAndFocusTab(target);
      }
    },
    [selectAndFocusTab],
  );

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((event: React.TouchEvent) => {
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    const deltaY = event.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      setActiveTab(deltaX < 0 ? 'projects' : 'experience');
    }
  }, []);

  return (
    <div className="h-dvh overflow-hidden bg-background">
      <div className="flex h-full flex-col lg:hidden">
        <header className="shrink-0 border-b border-border/50 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/profile2.png"
                  alt={language === 'zh' ? '郑理的头像' : 'Portrait of Li Zheng'}
                  fill
                  sizes="48px"
                  className="object-cover"
                  priority
                />
              </div>
              <h1 className="truncate text-lg font-semibold tracking-tight">
                {localize(profileData.name, language)}
              </h1>
            </div>
            <LanguageSelector compact />
          </div>
          <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/75">
            {localize(profileData.headline, language)}
          </p>
          <SocialLinks className="mt-1" />
        </header>

        <div
          className="flex shrink-0 border-b border-border/50"
          role="tablist"
          aria-label={language === 'zh' ? '内容栏目' : 'Profile sections'}
        >
          {mobileTabs.map((tab) => {
            const selected = activeTab === tab;
            return (
              <button
                key={tab}
                id={`mobile-tab-${tab}`}
                ref={(element) => {
                  tabRefs.current[tab] = element;
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`mobile-panel-${tab}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(tab)}
                onKeyDown={(event) => handleTabKeyDown(event, tab)}
                className={`min-h-11 flex-1 border-b-2 px-3 text-xs font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
                  selected
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-foreground/65 hover:text-foreground'
                }`}
              >
                {t(`tab.${tab}`)}
              </button>
            );
          })}
        </div>

        <div
          id={`mobile-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`mobile-tab-${activeTab}`}
          tabIndex={0}
          className="flex-1 overflow-y-auto overflow-x-hidden pb-[calc(6rem+env(safe-area-inset-bottom))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {activeTab === 'experience' ? (
            <ProfileSection experienceOnly />
          ) : (
            <ProjectsSection />
          )}
        </div>

        <Dialog.Root open={showChat} onOpenChange={setShowChat}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={t('chat.open')}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm" />
            <Dialog.Content className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-background focus:outline-none">
              <div className="flex min-h-14 shrink-0 items-center justify-between border-b border-border/60 px-4 pt-[env(safe-area-inset-top)]">
                <div>
                  <Dialog.Title className="text-sm font-semibold">
                    {t('chat.header')}
                  </Dialog.Title>
                  <Dialog.Description className="sr-only">
                    {t('chat.description')}
                  </Dialog.Description>
                </div>
                <Dialog.Close asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11"
                    aria-label={t('chat.close')}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Dialog.Close>
              </div>
              <div className="min-h-0 flex-1">
                <ChatSection />
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <div
        className="hidden h-full lg:grid"
        style={{
          gridTemplateColumns:
            'minmax(0, 1.1fr) minmax(0, 1.1fr) minmax(320px, 0.8fr)',
        }}
      >
        <section
          className="overflow-y-auto overflow-x-hidden border-r border-border/50"
          aria-label={t('section.experience')}
        >
          <ProfileSection />
        </section>
        <section
          className="overflow-y-auto overflow-x-hidden border-r border-border/50"
          aria-label={t('section.projects')}
        >
          <ProjectsSection />
        </section>
        <section className="flex min-w-0 flex-col overflow-hidden" aria-label={t('chat.header')}>
          <div className="border-b border-border/50 px-5 py-4">
            <h2 className="text-sm font-semibold">{t('chat.header')}</h2>
          </div>
          <div className="min-h-0 flex-1">
            <ChatSection />
          </div>
        </section>
      </div>
    </div>
  );
}
