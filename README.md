# Li Zheng — Personal Website

A bilingual, accessible portfolio for Li Zheng, Founder of Flatre.ai. The site combines a compact professional profile, selected projects, and a first-person AI chatbot grounded in the same typed profile source.

## Features

- English and Chinese profile content
- Typed canonical profile data shared by the UI, SEO metadata, structured data, projects, and chatbot
- Responsive three-rail desktop layout and tabbed mobile layout
- Accessible mobile chat dialog with keyboard and focus management
- Claude-powered first-person professional chatbot
- Optional Resend contact delivery
- Google Analytics support

## Local development

Requirements: Node.js 18+ and an Anthropic API key.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
SITE_URL=http://localhost:3000

# Optional
NEXT_PUBLIC_GA_ID=
RESEND_API_KEY=
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_EMAIL=li_zheng@outlook.com
```

When `RESEND_API_KEY` is absent, the contact endpoint returns HTTP 503 and does not retain or log the submitted contact payload.

## Content updates

Edit [`lib/profile-data.ts`](lib/profile-data.ts) to update professional content, experience, projects, skills, recognition, social links, or the résumé URL. Both English and Chinese values are required by TypeScript.

Interface-only translations such as tab, dialog, form, and status labels live in [`lib/language-context.tsx`](lib/language-context.tsx).

## Validation

```bash
npm run check:content
npx tsc --noEmit
npm run build
```

## Deployment

Deploy as a standard Next.js project on Vercel. Configure `ANTHROPIC_API_KEY` and, if contact delivery is enabled, the Resend variables above. `SITE_URL` should be the public canonical origin.

## Stack

- Next.js 15 and React 19
- TypeScript and Tailwind CSS
- Radix Dialog
- Anthropic API through Vercel AI SDK
- Resend
