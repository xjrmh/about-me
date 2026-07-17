'use client';

import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { localize, profileData } from '@/lib/profile-data';

const iconById = {
  linkedin: Linkedin,
  github: Github,
  resume: FileText,
  email: Mail,
};

export function SocialLinks({ className = '' }: { className?: string }) {
  const { language } = useLanguage();

  return (
    <nav className={`flex items-center gap-1 ${className}`} aria-label="Social links">
      {profileData.socialLinks.map((link) => {
        const Icon = iconById[link.id];
        const external = link.id !== 'email';
        return (
          <a
            key={link.id}
            href={link.url}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:h-9 lg:w-9"
            aria-label={localize(link.label, language)}
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        );
      })}
    </nav>
  );
}
