import { ProfileSection } from '@/components/profile-section';
import { ChatSection } from '@/components/chat-section';

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Left Panel - Profile Section */}
      <div className="w-full lg:w-1/3 xl:w-1/4 border-b lg:border-b-0 lg:border-r overflow-y-auto">
        <ProfileSection />
      </div>

      {/* Right Panel - Chat Section */}
      <div className="flex-1 overflow-hidden">
        <ChatSection />
      </div>
    </div>
  );
}
