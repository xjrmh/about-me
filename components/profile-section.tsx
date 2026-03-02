'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { useEffect, useState, useRef, useCallback } from 'react';

const companyLogos: Record<string, React.ReactNode> = {
  'exp.meta': (
    <svg className="w-3 h-3 inline-block" viewBox="0 0 24 24" fill="#0081FB" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"/>
    </svg>
  ),
  'exp.cofounder': (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logos/flat-strategy.png" alt="Flat Strategy" className="w-3 h-3 inline-block rounded-sm" />
  ),
  'exp.pwc': (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logos/pwc.png" alt="PwC" className="w-3 h-3 inline-block rounded-sm" />
  ),
  'exp.duke': (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logos/duke-health.png" alt="Duke Health" className="w-3 h-3 inline-block rounded-sm" />
  ),
  'exp.her': (
    <svg className="w-3 h-3 inline-block" viewBox="0 0 24 24" fill="#E31837" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3l-3-2.7zm-9 .7c0-1.1.9-2 2-2s2 .9 2 2h-4z"/>
    </svg>
  ),
};

function ExperienceItem({ prefix, t }: { prefix: string; t: (key: string) => string }) {
  const titleKey = prefix === 'exp.cofounder' ? prefix : `${prefix}.title`;
  const companyKey = `${prefix}.company`;
  const dateKey = `${prefix}.date`;
  const descKey = `${prefix}.desc`;
  const logo = companyLogos[prefix];

  // Collect bullets
  const bullets: string[] = [];
  for (let i = 1; i <= 10; i++) {
    const key = `${prefix}.bullet${i}`;
    const val = t(key);
    if (val === key) break;
    bullets.push(val);
  }

  // Collect links
  const links: { text: string; url: string }[] = [];
  for (let i = 1; i <= 5; i++) {
    const textKey = `${prefix}.link${i}.text`;
    const urlKey = `${prefix}.link${i}.url`;
    const text = t(textKey);
    const url = t(urlKey);
    if (text === textKey) break;
    links.push({ text, url });
  }

  return (
    <div className="space-y-1">
      <h3 className="text-sm font-medium text-foreground">{t(titleKey)}</h3>
      <p className="text-xs text-muted-foreground/70 flex items-center gap-1">
        {logo && <span className="flex-shrink-0">{logo}</span>}
        <span>{t(companyKey)} • {t(dateKey)}</span>
      </p>
      <p className="text-xs text-muted-foreground/60 leading-relaxed pt-0.5 sm:pt-1">
        {t(descKey)}
        {links.length > 0 && (
          <>
            {' '}
            {links.map((link, i) => (
              <span key={i}>
                {i > 0 && ' • '}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 text-muted-foreground/70 hover:text-foreground transition-colors"
                >
                  {link.text}
                </a>
              </span>
            ))}
          </>
        )}
      </p>
      {bullets.length > 0 && (
        <ul className="text-xs text-muted-foreground/55 leading-relaxed space-y-0.5 pt-0.5 pl-3.5 list-disc marker:text-muted-foreground/30">
          {bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ProfileSection({ showStickyHeader = true }: { showStickyHeader?: boolean } = {}) {
  const { t, language } = useLanguage();
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<string>('');
  const [spinAnim, setSpinAnim] = useState<string | null>(null);
  const [continuousSpin, setContinuousSpin] = useState<string | null>(null);
  const [stickyOpacity, setStickyOpacity] = useState(0);
  const nameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPress = useRef(false);
  const profilePhotoRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const spinAngle = useRef(0);
  const spinSpeed = useRef(0);
  const spinDirection = useRef(1);
  const lastFrameTime = useRef(0);

  const stopContinuousSpin = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    spinAngle.current = 0;
    spinSpeed.current = 0;
    setContinuousSpin(null);
    if (profilePhotoRef.current) {
      profilePhotoRef.current.style.transform = '';
    }
  }, []);

  const animateSpin = useCallback((timestamp: number) => {
    if (!lastFrameTime.current) lastFrameTime.current = timestamp;
    const delta = (timestamp - lastFrameTime.current) / 1000;
    lastFrameTime.current = timestamp;

    // Accelerate: increase speed by 120 deg/s², cap at 2400 deg/s
    spinSpeed.current = Math.min(2400, spinSpeed.current + 120 * delta);
    spinAngle.current += spinDirection.current * spinSpeed.current * delta;

    if (profilePhotoRef.current) {
      profilePhotoRef.current.style.transform = `rotate(${spinAngle.current}deg)`;
    }
    rafId.current = requestAnimationFrame(animateSpin);
  }, []);

  useEffect(() => {
    // Fetch last updated date from API
    fetch('/api/last-updated')
      .then(res => res.json())
      .then(data => setLastUpdatedTimestamp(data.timestamp))
      .catch(err => console.error('Failed to fetch last updated date:', err));
  }, []);

  const handleScroll = useCallback(() => {
    if (!nameRef.current || !containerRef.current) return;
    const scrollParent = containerRef.current.closest('.overflow-y-auto');
    if (!scrollParent) return;
    const nameRect = nameRef.current.getBoundingClientRect();
    const containerRect = scrollParent.getBoundingClientRect();
    const nameBottom = nameRect.bottom - containerRect.top;
    const fadeStart = 40;
    const fadeEnd = 0;
    if (nameBottom <= fadeEnd) {
      setStickyOpacity(1);
    } else if (nameBottom >= fadeStart) {
      setStickyOpacity(0);
    } else {
      setStickyOpacity(1 - (nameBottom - fadeEnd) / (fadeStart - fadeEnd));
    }
  }, []);

  useEffect(() => {
    const scrollParent = containerRef.current?.closest('.overflow-y-auto');
    if (!scrollParent) return;
    scrollParent.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollParent.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const lastUpdated = lastUpdatedTimestamp
    ? new Date(lastUpdatedTimestamp).toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      })
    : '';

  return (
    <div ref={containerRef} className="flex flex-col min-h-full relative">
      {/* Sticky name header */}
      {showStickyHeader && (
        <div
          className="sticky top-0 z-10 px-4 sm:px-6 lg:px-8 py-3 bg-background/95 backdrop-blur-sm border-b border-border/40 pointer-events-none"
          style={{ opacity: stickyOpacity, transition: 'opacity 0.1s ease-out' }}
        >
          <h1 className="text-2xl font-medium text-center">{t('profile.name')}</h1>
        </div>
      )}
      <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8 pt-4 pb-2 px-5 sm:pt-6 sm:pb-2 sm:px-4 lg:pt-8 lg:pb-3 lg:pl-3 lg:pr-3">
        {/* Profile Photo */}
        <div className="flex justify-center pt-1 sm:pt-0">
          <div
            ref={profilePhotoRef}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden cursor-pointer select-none"
            style={
              spinAnim && !continuousSpin
                ? { animation: `${spinAnim} 0.7s ease-in-out` }
                : undefined
            }
            onClick={() => {
              if (isLongPress.current) return;
              if (!spinAnim && !continuousSpin) {
                const anim = Math.random() < 0.5 ? 'spin-once-cw' : 'spin-once-ccw';
                setSpinAnim(anim);
                setTimeout(() => setSpinAnim(null), 700);
              }
            }}
            onPointerDown={() => {
              isLongPress.current = false;
              longPressTimer.current = setTimeout(() => {
                isLongPress.current = true;
                setSpinAnim(null);
                spinAngle.current = 0;
                spinSpeed.current = 0;
                lastFrameTime.current = 0;
                spinDirection.current = Math.random() < 0.5 ? 1 : -1;
                setContinuousSpin('active');
                rafId.current = requestAnimationFrame(animateSpin);
              }, 500);
            }}
            onPointerUp={() => {
              if (longPressTimer.current) {
                clearTimeout(longPressTimer.current);
                longPressTimer.current = null;
              }
              stopContinuousSpin();
            }}
            onPointerLeave={() => {
              if (longPressTimer.current) {
                clearTimeout(longPressTimer.current);
                longPressTimer.current = null;
              }
              stopContinuousSpin();
            }}
            onContextMenu={(e) => e.preventDefault()}
          >
            <Image
              src="/profile.jpg"
              alt="Li Zheng"
              fill
              className="object-cover pointer-events-none"
              priority
            />
          </div>
        </div>

        {/* Name and Title */}
        <div ref={nameRef} className="text-center space-y-1">
          <h1 className="text-2xl font-medium">{t('profile.name')}</h1>
          <p className="text-sm text-muted-foreground/80">{t('profile.title')}</p>
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
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
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
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
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
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
        </div>

        {/* Experience Section */}
        <div className="space-y-2.5 sm:space-y-3 lg:space-y-4">
          <h2 className="text-sm font-bold text-foreground/90 uppercase tracking-wide">{t('profile.experience')}</h2>
          <div className="space-y-3 sm:space-y-4 lg:space-y-5">
            <ExperienceItem prefix="exp.meta" t={t} />
            <ExperienceItem prefix="exp.cofounder" t={t} />
            <ExperienceItem prefix="exp.pwc" t={t} />
            <ExperienceItem prefix="exp.duke" t={t} />
            <ExperienceItem prefix="exp.her" t={t} />
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-2.5 sm:space-y-3 lg:space-y-4">
          <h2 className="text-sm font-bold text-foreground/90 uppercase tracking-wide">{t('profile.education')}</h2>
          <div className="space-y-3 sm:space-y-4 lg:space-y-5">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-foreground">{t('edu.duke.degree')}</h3>
              <p className="text-xs text-muted-foreground/70 flex items-center gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/duke-university.png" alt="Duke University" className="w-3 h-3 inline-block rounded-sm flex-shrink-0" />
                <span>{t('edu.duke.school')} • {t('edu.duke.date')}</span>
              </p>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-foreground">{t('edu.osu.degree')}</h3>
              <p className="text-xs text-muted-foreground/70 flex items-center gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/osu.png" alt="The Ohio State University" className="w-3 h-3 inline-block rounded-sm flex-shrink-0" />
                <span>{t('edu.osu.school')} • {t('edu.osu.date')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="space-y-2.5 sm:space-y-3 lg:space-y-4">
          <h2 className="text-sm font-bold text-foreground/90 uppercase tracking-wide">{t('profile.activity')}</h2>
          <div className="space-y-3 sm:space-y-4 lg:space-y-5">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-foreground">{t('activity.pilot.title')}</h3>
              <p className="text-xs text-muted-foreground/70 flex items-center gap-1">
                <svg className="w-3 h-3 inline-block flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.5l-7-3.5V5a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v8L2 16.5l1 2 6-2v3l-1.5 1.5V23l3.5-1 3.5 1v-2L13 19.5v-3l6 2 1-2z" fill="#3B82F6" stroke="none"/>
                </svg>
                <span>{t('activity.pilot.org')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {lastUpdated && (
        <div className="w-full max-w-2xl mx-auto mt-auto pt-3 sm:pt-4 pb-4 px-5 sm:px-4 lg:pl-3 lg:pr-3">
          <p className="text-[11px] text-muted-foreground/40">
            {t('proj.lastFetched')} {lastUpdated}
          </p>
        </div>
      )}
    </div>
  );
}
