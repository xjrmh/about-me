'use client';

import { useState } from 'react';
import { ProfileSection } from '@/components/profile-section';
import { ChatSection } from '@/components/chat-section';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [showProfile, setShowProfile] = useState(false);
  const [hasMessages, setHasMessages] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden overflow-x-hidden bg-background relative fixed inset-0 lg:static w-full max-w-full">
      {/* Left Panel - Profile Section (Desktop: always visible, Mobile: conditional) */}
      <div className={`
        w-full max-w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-border/40 overflow-y-auto overflow-x-hidden
        ${hasMessages ? 'max-h-0 lg:max-h-none' : 'max-h-[70vh] lg:max-h-none'}
        lg:block
      `}>
        <ProfileSection />
      </div>

      {/* Mobile Profile Overlay (slides in from bottom) */}
      {hasMessages && (
        <>
          {/* Backdrop */}
          <div
            className={`
              lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm
              transition-opacity duration-300
              ${showProfile ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
            onClick={() => setShowProfile(false)}
          />

          {/* Profile Panel */}
          <div className={`
            lg:hidden fixed inset-0 z-50 bg-background overflow-x-hidden
            transition-transform duration-300 ease-in-out
            ${showProfile ? 'translate-y-0' : 'translate-y-full'}
          `}>
            <div className="h-full overflow-y-auto">
              <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border/40 px-4 py-3 flex items-center justify-between z-10">
                <h2 className="text-sm font-medium">Profile</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProfile(false)}
                  className="h-8 w-8 p-0"
                  aria-label="Close profile"
                >
                  ✕
                </Button>
              </div>
              <ProfileSection />
            </div>
          </div>
        </>
      )}

      {/* Right Panel - Chat Section */}
      <div className="flex-1 overflow-hidden overflow-x-hidden w-full max-w-full lg:w-auto">
        <ChatSection
          onMessagesChange={setHasMessages}
          showProfile={showProfile}
          onToggleProfile={() => setShowProfile(!showProfile)}
        />
      </div>
    </div>
  );
}
