import { unstable_cache } from 'next/cache';

/**
 * Fetches resume from Google Doc published as plain text.
 * Results are cached for 24 hours (86400 seconds).
 */
export const getResume = unstable_cache(
  async (): Promise<string> => {
    const googleDocUrl = process.env.GOOGLE_DOC_URL;

    if (!googleDocUrl) {
      throw new Error(
        'GOOGLE_DOC_URL environment variable is not set. Please add it to .env.local'
      );
    }

    try {
      const response = await fetch(googleDocUrl, {
        cache: 'no-store', // Don't use fetch cache, rely on Next.js cache
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch resume: ${response.status} ${response.statusText}`
        );
      }

      let resumeText = await response.text();

      // If the response is HTML (Google Doc published format), extract text content
      if (resumeText.includes('<html') || resumeText.includes('<!DOCTYPE')) {
        // Simple HTML stripping - remove scripts, styles, and HTML tags
        resumeText = resumeText
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/\s+/g, ' ')
          .trim();
      }

      if (!resumeText || resumeText.trim().length === 0) {
        throw new Error('Resume document is empty');
      }

      return resumeText;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching resume: ${error.message}`);
      }
      throw new Error('Unknown error fetching resume');
    }
  },
  ['resume-cache'], // Cache key
  {
    revalidate: 86400, // 24 hours in seconds
    tags: ['resume'], // Tag for manual revalidation if needed
  }
);
