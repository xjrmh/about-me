import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Linkedin, Github, Mail } from 'lucide-react';

export function ProfileSection() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 space-y-6">
      {/* Profile Photo */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/10">
        <Image
          src="/profile.jpg"
          alt="Li Zheng"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Name and Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Li Zheng</h1>
        <p className="text-xl text-muted-foreground">Senior Data Scientist</p>
      </div>

      {/* Social Links */}
      <Card className="p-4 w-full max-w-xs">
        <div className="flex flex-col space-y-3">
          <a
            href="https://www.linkedin.com/in/li-zheng/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent transition-colors"
          >
            <Linkedin className="w-5 h-5 text-[#0A66C2]" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>

          <a
            href="https://github.com/xjrmh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm font-medium">GitHub</span>
          </a>

          <a
            href="mailto:li_zheng@outlook.com"
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent transition-colors"
          >
            <Mail className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium">Email</span>
          </a>
        </div>
      </Card>

      {/* Optional: About snippet */}
      <div className="text-center text-sm text-muted-foreground max-w-xs">
        <p>
          Ask me anything about my professional experience, skills, and projects!
        </p>
      </div>
    </div>
  );
}
