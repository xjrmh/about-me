'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ProfileSection } from '@/components/profile-section';
import { ProjectsSection } from '@/components/projects-section';
import { ChatSection } from '@/components/chat-section';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/language-selector';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function Home() {
  const [showProfile, setShowProfile] = useState(false);
  const [hasMessages, setHasMessages] = useState(false);
  const [activeTab, setActiveTab] = useState<'experience' | 'projects'>('experience');
  const [showChat, setShowChat] = useState(false);
  const { t } = useLanguage();

  // Swipe tracking
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only trigger if horizontal swipe is dominant and exceeds threshold
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        // Swipe left → Projects
        setActiveTab('projects');
      } else {
        // Swipe right → Experience
        setActiveTab('experience');
      }
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden overflow-x-hidden bg-background relative fixed inset-0 lg:static w-full max-w-full">
      {/* Language selector — desktop: always visible; mobile: visible when no chat overlay */}
      <div className={`${hasMessages ? 'hidden lg:block' : ''} ${showChat ? 'hidden lg:block' : ''}`}>
        <LanguageSelector />
      </div>

      {/* ===== MOBILE LAYOUT (below lg) ===== */}
      <div className="lg:hidden flex flex-col h-full w-full">
        {/* Compact Profile Header */}
        <div className="border-b border-border/40 px-4 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/profile.jpg"
                alt="Li Zheng"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-medium leading-tight">{t('profile.name')}</h1>
              <p className="text-xs text-muted-foreground/70">{t('profile.title')}</p>
            </div>
          </div>
          {/* Social Links */}
          <div className="flex items-center gap-3 mt-2.5 pl-[60px]">
            <a href="https://www.linkedin.com/in/li-zheng/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/50 hover:text-foreground transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://github.com/xjrmh" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/50 hover:text-foreground transition-colors" aria-label="GitHub">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://drive.google.com/file/d/1HIRGguTe5fRtfkaszFQq2KSxCqCu5JAo/view" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/50 hover:text-foreground transition-colors" aria-label="Resume PDF">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </a>
            <a href="mailto:li_zheng@outlook.com" className="text-muted-foreground/50 hover:text-foreground transition-colors" aria-label="Email">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Tab Indicators */}
        <div className="flex border-b border-border/40">
          <button
            onClick={() => setActiveTab('experience')}
            className={`flex-1 py-2.5 text-xs font-medium uppercase tracking-wide transition-colors ${
              activeTab === 'experience'
                ? 'text-foreground border-b-2 border-foreground'
                : 'text-muted-foreground/50'
            }`}
          >
            {t('tab.experience')}
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-2.5 text-xs font-medium uppercase tracking-wide transition-colors ${
              activeTab === 'projects'
                ? 'text-foreground border-b-2 border-foreground'
                : 'text-muted-foreground/50'
            }`}
          >
            {t('tab.projects')}
          </button>
        </div>

        {/* Swipeable Content Area */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {activeTab === 'experience' ? (
            <ProfileSection experienceOnly showStickyHeader={false} />
          ) : (
            <ProjectsSection />
          )}
        </div>

        {/* Swipe hint dots */}
        <div className="flex justify-center gap-1.5 py-2 border-t border-border/40">
          <div className={`w-1.5 h-1.5 rounded-full transition-colors ${activeTab === 'experience' ? 'bg-foreground' : 'bg-muted-foreground/30'}`} />
          <div className={`w-1.5 h-1.5 rounded-full transition-colors ${activeTab === 'projects' ? 'bg-foreground' : 'bg-muted-foreground/30'}`} />
        </div>

        {/* Chat FAB */}
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-4 z-40 w-12 h-12 rounded-full bg-foreground text-background shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
          aria-label="Open chat"
        >
          <MessageCircle className="w-5 h-5" />
        </button>

        {/* Chat Modal Overlay */}
        {showChat && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setShowChat(false)}
            />
            <div className="fixed inset-0 z-50 bg-background flex flex-col">
              <div className="border-b border-border/40 px-4 py-3 flex items-center justify-between">
                <h2 className="text-sm font-medium">{t('chat.header')}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChat(false)}
                  className="h-8 w-8 p-0"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-hidden">
                <ChatSection
                  onMessagesChange={setHasMessages}
                  showProfile={showProfile}
                  onToggleProfile={() => setShowProfile(!showProfile)}
                  hideHeader
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* ===== DESKTOP LAYOUT (lg and above) ===== */}
      {/* Left Panel - Profile/Experience Section */}
      <div className="hidden lg:block w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-border/40 overflow-y-auto overflow-x-hidden lg:px-2">
        <ProfileSection />
      </div>

      {/* Middle Panel - Projects Section */}
      <div className="hidden lg:block w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-border/40 overflow-y-auto overflow-x-hidden lg:px-2">
        <ProjectsSection />
      </div>

      {/* Right Panel - Chat Section */}
      <div className="hidden lg:flex flex-1 overflow-hidden overflow-x-hidden w-full lg:w-1/3 lg:px-2">
        <ChatSection
          onMessagesChange={setHasMessages}
          showProfile={showProfile}
          onToggleProfile={() => setShowProfile(!showProfile)}
        />
      </div>
    </div>
  );
}
