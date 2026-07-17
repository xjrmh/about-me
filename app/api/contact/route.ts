import { Resend } from 'resend';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 },
      );
    }

    if (
      name.length > 120 ||
      email.length > 254 ||
      message.length > 5000 ||
      !emailPattern.test(email)
    ) {
      return Response.json(
        { error: 'One or more fields are invalid.' },
        { status: 400 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return Response.json(
        { error: 'Message delivery is temporarily unavailable.' },
        { status: 503 },
      );
    }

    const resend = new Resend(resendApiKey);
    const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const contactEmail = process.env.CONTACT_EMAIL || 'li_zheng@outlook.com';
    const safeName = name.replace(/[\r\n]+/g, ' ');

    const ownerDelivery = await resend.emails.send({
      from,
      to: contactEmail,
      replyTo: email,
      subject: `New contact from ${safeName}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    if (ownerDelivery.error) {
      throw new Error('OwnerDeliveryFailed');
    }

    const confirmationDelivery = await resend.emails.send({
      from,
      to: email,
      subject: 'Thanks for reaching out',
      text: `Hi ${name},\n\nThanks for your message. I’ll review it and get back to you soon.\n\nBest,\nLi Zheng`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.6;color:#111827">
          <h1 style="font-size:24px">Thanks for reaching out</h1>
          <p>Hi ${escapeHtml(name)},</p>
          <p>Thanks for your message. I’ll review it and get back to you soon.</p>
          <p>Best,<br>Li Zheng</p>
        </div>
      `,
    });

    if (confirmationDelivery.error) {
      throw new Error('ConfirmationDeliveryFailed');
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(
      'Contact delivery failed',
      error instanceof Error ? error.name : 'UnknownError',
    );
    return Response.json(
      { error: 'Failed to send the message.' },
      { status: 502 },
    );
  }
}
