# Li Zheng - Personal Website

A clean, minimalistic personal website featuring an AI chatbot powered by Claude Sonnet 4.5 that speaks as Li Zheng in first person.

## Features

- **Minimalistic Design**: Ultra-clean interface focused on the conversation
- **Split-screen Layout**: Compact profile sidebar with AI chatbot as the main feature
- **AI Chatbot**: Powered by Claude Sonnet 4.5 API via Vercel AI SDK, speaks in first person
- **Resume Integration**: Fetches resume from Google Drive with 24-hour server-side caching
- **Responsive Design**: Mobile-friendly layout that adapts seamlessly
- **Social Links**: Icon-only links to LinkedIn, GitHub, Resume PDF, and Email
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Claude API key from [Anthropic Console](https://console.anthropic.com)
- Google Doc with your resume published as plain text

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
ANTHROPIC_API_KEY=your_claude_api_key_here
GOOGLE_DOC_URL=https://docs.google.com/document/d/YOUR_DOC_ID/export?format=txt
```

#### How to get your Claude API key:
1. Go to [https://console.anthropic.com](https://console.anthropic.com)
2. Sign in or create an account
3. Navigate to API Keys
4. Create a new API key
5. Copy and paste it into `.env.local`

#### How to publish your Google Doc:
1. Open your resume in Google Docs
2. Click **File → Share → Publish to web**
3. In the dropdown, select **Plain text**
4. Click **Publish**
5. Copy the URL (should look like: `https://docs.google.com/document/d/YOUR_DOC_ID/export?format=txt`)
6. Paste it into `.env.local`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

### Option 1: Deploy with Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables in Vercel dashboard:
   - `ANTHROPIC_API_KEY`
   - `GOOGLE_DOC_URL`
6. Deploy!

### Custom Domain

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions provided by Vercel

## Customization

### Update Personal Information

Edit [components/profile-section.tsx](components/profile-section.tsx):
- Change name, title, and social links
- Update profile photo by replacing `public/profile.jpg`
- Add or remove social links (LinkedIn, GitHub, Resume PDF, Email)

### Modify Chatbot Persona

Edit [app/api/chat/route.ts](app/api/chat/route.ts):
- Update the `createSystemPrompt` function
- Adjust tone, boundaries, and instructions

### Styling

Edit [app/globals.css](app/globals.css):
- Modify CSS variables for colors
- Customize the minimalistic theme
- Adjust border radius and spacing

## Project Structure

```
about-me/
├── app/
│   ├── api/chat/route.ts       # Chat API endpoint
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   └── globals.css             # Global styles
├── components/
│   ├── profile-section.tsx     # Profile display
│   ├── chat-section.tsx        # Chat interface
│   ├── chat-message.tsx        # Message component
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── resume-fetcher.ts       # Resume fetching with cache
│   └── utils.ts                # Utility functions
├── .env.local                  # Environment variables (not committed)
├── .env.example                # Environment template
└── package.json
```

## Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **AI**: [Claude Sonnet 4.5](https://www.anthropic.com/api) via [Vercel AI SDK](https://sdk.vercel.ai/)
- **Icons**: Inline SVG (LinkedIn, GitHub, Document, Mail)

## Cost Estimation

Claude Sonnet 4.5 API pricing:
- **Input**: $3 per million tokens
- **Output**: $15 per million tokens
- **Typical conversation**: ~$0.02 - $0.10 per session
- **Monthly estimate**: $5 - $30 (depending on traffic)

Monitor your usage at [console.anthropic.com](https://console.anthropic.com).

## Features to Add

- [ ] Markdown rendering for formatted responses
- [ ] Conversation history persistence
- [ ] Dark mode toggle
- [ ] Analytics integration (Vercel Analytics)
- [ ] Rate limiting for chat API
- [ ] Additional sections (projects, blog)
- [ ] File upload for resume instead of Google Doc

## Troubleshooting

### Chat not responding

- Check that `ANTHROPIC_API_KEY` is set correctly in `.env.local`
- Verify API key is valid at [console.anthropic.com](https://console.anthropic.com)
- Check browser console for error messages

### Resume not loading

- Verify `GOOGLE_DOC_URL` is correct
- Ensure Google Doc is published as "Plain text"
- Check that the URL ends with `/export?format=txt`

### Build errors

- Run `npm install` to ensure all dependencies are installed
- Delete `.next` folder and rebuild: `rm -rf .next && npm run build`
- Check Node.js version is 18 or higher: `node --version`

## License

MIT

## Contact

- **Email**: [li_zheng@outlook.com](mailto:li_zheng@outlook.com)
- **LinkedIn**: [linkedin.com/in/li-zheng](https://www.linkedin.com/in/li-zheng/)
- **GitHub**: [github.com/xjrmh](https://github.com/xjrmh)
