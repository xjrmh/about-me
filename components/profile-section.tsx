'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { LanguageSelector } from '@/components/language-selector';
import { SocialLinks } from '@/components/social-links';
import { useLanguage } from '@/lib/language-context';
import {
  formatDateRange,
  localize,
  profileData,
  type Experience,
} from '@/lib/profile-data';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-wide text-foreground/90">
      {children}
    </h2>
  );
}

function ExperienceItem({ item }: { item: Experience }) {
  const { language, t } = useLanguage();
  const featuredCount = item.featuredBulletCount ?? item.bullets.length;
  const featured = item.bullets.slice(0, featuredCount);
  const additional = item.bullets.slice(featuredCount);

  return (
    <article className="space-y-2">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground">
          {localize(item.role, language)}
        </h3>
        <p className="flex flex-wrap items-center gap-x-1.5 text-xs text-foreground/65">
          {item.logo ? (
            // Official or employer-provided marks are displayed without alteration.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.logo}
              alt=""
              className="h-4 w-4 shrink-0 rounded-sm object-contain"
              aria-hidden="true"
            />
          ) : null}
          <span>{localize(item.company, language)}</span>
          <span aria-hidden="true">•</span>
          <span>{formatDateRange(item.startDate, item.endDate, language)}</span>
        </p>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {localize(item.summary, language)}
      </p>

      {item.links?.length ? (
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {item.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-xs font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:min-h-8"
            >
              {localize(link.label, language)}
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          ))}
        </div>
      ) : null}

      {featured.length ? (
        <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-foreground/35">
          {featured.map((bullet) => (
            <li key={bullet.en}>{localize(bullet, language)}</li>
          ))}
        </ul>
      ) : null}

      {additional.length ? (
        <details className="group rounded-lg border border-border/60 bg-muted/20 px-3">
          <summary className="flex min-h-11 cursor-pointer list-none items-center text-xs font-semibold text-foreground/75 outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring lg:min-h-9 [&::-webkit-details-marker]:hidden">
            <span>{t('experience.moreImpact')}</span>
            <span className="ml-auto text-base leading-none transition-transform group-open:rotate-45" aria-hidden="true">
              +
            </span>
          </summary>
          <ul className="list-disc space-y-1.5 border-t border-border/50 py-3 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-foreground/35">
            {additional.map((bullet) => (
              <li key={bullet.en}>{localize(bullet, language)}</li>
            ))}
          </ul>
        </details>
      ) : null}
    </article>
  );
}

export function ProfileSection({
  experienceOnly = false,
}: {
  experienceOnly?: boolean;
} = {}) {
  const { language, t } = useLanguage();

  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto w-full max-w-2xl space-y-8 px-5 pb-8 pt-5 sm:px-6 sm:pt-7 lg:px-5 lg:pb-10 lg:pt-8">
        {!experienceOnly ? (
          <header className="space-y-5 border-b border-border/50 pb-7">
            <div className="flex items-start justify-between gap-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/profile2.png"
                  alt={language === 'zh' ? '郑理的头像' : 'Portrait of Li Zheng'}
                  fill
                  sizes="96px"
                  className="object-cover"
                  priority
                />
              </div>
              <LanguageSelector compact />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                {localize(profileData.name, language)}
              </h1>
              <p className="max-w-xl text-sm font-medium leading-relaxed text-foreground/75">
                {localize(profileData.headline, language)}
              </p>
            </div>
            <SocialLinks />
          </header>
        ) : null}

        <section aria-labelledby="summary-heading" className="space-y-3">
          <SectionHeading>
            <span id="summary-heading">{t('section.summary')}</span>
          </SectionHeading>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {localize(profileData.summary, language)}
          </p>
        </section>

        <section aria-labelledby="experience-heading" className="space-y-5">
          <SectionHeading>
            <span id="experience-heading">{t('section.experience')}</span>
          </SectionHeading>
          <div className="space-y-7">
            {profileData.experience.map((item) => (
              <ExperienceItem key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section aria-labelledby="education-heading" className="space-y-4">
          <SectionHeading>
            <span id="education-heading">{t('section.education')}</span>
          </SectionHeading>
          <div className="space-y-4">
            {profileData.education.map((item) => (
              <article key={item.degree.en} className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground">
                  {localize(item.degree, language)}
                </h3>
                <p className="flex items-center gap-1.5 text-xs text-foreground/65">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.logo}
                    alt=""
                    className="h-4 w-4 rounded-sm object-contain"
                    aria-hidden="true"
                  />
                  <span>{localize(item.school, language)}</span>
                  <span aria-hidden="true">•</span>
                  <span>{item.startYear}–{item.endYear}</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="skills-heading" className="space-y-4">
          <SectionHeading>
            <span id="skills-heading">{t('section.skills')}</span>
          </SectionHeading>
          <dl className="space-y-3">
            {profileData.skills.map((group) => (
              <div key={group.name.en} className="grid gap-1 sm:grid-cols-[7.5rem_1fr]">
                <dt className="text-xs font-semibold text-foreground/75">
                  {localize(group.name, language)}
                </dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">
                  {group.items.map((item) => localize(item, language)).join(' · ')}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="recognition-heading" className="space-y-4">
          <SectionHeading>
            <span id="recognition-heading">{t('section.recognition')}</span>
          </SectionHeading>
          <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-foreground/35">
            {profileData.recognition.map((item) => (
              <li key={item.en}>{localize(item, language)}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="activity-heading" className="space-y-3">
          <SectionHeading>
            <span id="activity-heading">{t('section.activity')}</span>
          </SectionHeading>
          <ul className="text-sm text-muted-foreground">
            {profileData.activity.map((item) => (
              <li key={item.en}>{localize(item, language)}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
