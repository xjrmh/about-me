'use client';

import { useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/lib/language-context';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const { t } = useLanguage();
  const id = useId();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    const normalized = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    if (!normalized.name || !normalized.email || !normalized.message) {
      setError(t('contact.error.required'));
      return;
    }

    if (!emailPattern.test(normalized.email)) {
      setError(t('contact.error.email'));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalized),
      });

      if (!response.ok) {
        setError(
          response.status === 503
            ? t('contact.error.unavailable')
            : t('contact.error.generic'),
        );
        return;
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setError(t('contact.error.generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-lg bg-muted/40 p-4 text-center" role="status" aria-live="polite">
        <p className="text-sm text-foreground/80">{t('contact.success')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-lg bg-muted/40 p-4">
      <p className="text-sm leading-relaxed text-foreground/80">
        {t('contact.prompt')}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <label htmlFor={`${id}-name`} className="text-xs font-medium text-foreground/75">
            {t('contact.name')}
          </label>
          <Input
            id={`${id}-name`}
            type="text"
            value={formData.name}
            onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
            required
            autoComplete="name"
            className="h-11 text-base sm:text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor={`${id}-email`} className="text-xs font-medium text-foreground/75">
            {t('contact.email')}
          </label>
          <Input
            id={`${id}-email`}
            type="email"
            value={formData.email}
            onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
            required
            autoComplete="email"
            className="h-11 text-base sm:text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor={`${id}-message`} className="text-xs font-medium text-foreground/75">
            {t('contact.message')}
          </label>
          <textarea
            id={`${id}-message`}
            value={formData.message}
            onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
            required
            className="min-h-24 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-sm"
          />
        </div>

        <div aria-live="assertive">
          {error ? <p className="text-sm text-destructive" role="alert">{error}</p> : null}
        </div>

        <Button type="submit" disabled={isSubmitting} className="h-11 w-full">
          {isSubmitting ? t('contact.sending') : t('contact.submit')}
        </Button>
        <p className="sr-only" role="status" aria-live="polite">
          {isSubmitting ? t('contact.sending') : ''}
        </p>
      </form>
    </div>
  );
}
