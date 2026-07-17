'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { localize, profileData } from '@/lib/profile-data';

export function ProjectsSection() {
  const { language, t } = useLanguage();

  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto w-full max-w-2xl px-5 pb-8 pt-5 sm:px-6 sm:pt-7 lg:px-5 lg:pb-10 lg:pt-8">
        <section aria-labelledby="projects-heading" className="space-y-5">
          <h2
            id="projects-heading"
            className="text-sm font-bold uppercase tracking-wide text-foreground/90"
          >
            {t('section.projects')}
          </h2>

          <div className="space-y-7">
            {profileData.projects.map((project) => (
              <article key={project.id} className="space-y-2">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-semibold text-foreground transition-colors hover:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:min-h-8"
                >
                  {localize(project.title, language)}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>

                {project.secondaryLink ? (
                  <p className="text-xs text-foreground/65">
                    <a
                      href={project.secondaryLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded-sm underline decoration-border underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:min-h-8"
                    >
                      {localize(project.secondaryLink.label, language)}
                    </a>
                  </p>
                ) : null}

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {localize(project.description, language)}
                </p>

                {project.image && project.imageAlt ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mt-3 block aspect-video w-full overflow-hidden rounded-lg border border-border/60 bg-muted/30 transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={`${localize(project.title, language)} — ${localize(project.imageAlt, language)}`}
                  >
                    <Image
                      src={project.image}
                      alt={localize(project.imageAlt, language)}
                      fill
                      priority={
                        project.id === 'flatre' ||
                        project.id === 'listing-photo-ranker'
                      }
                      sizes="(max-width: 1023px) calc(100vw - 2.5rem), 31vw"
                      className="object-cover"
                    />
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
