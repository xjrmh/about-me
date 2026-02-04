import { Resend } from 'resend';

/**
 * POST /api/contact
 * Handles contact form submissions and sends emails via Resend
 */
export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Validate inputs
    if (!name || !email || !message) {
      return new Response('Missing required fields', { status: 400 });
    }

    // Check for Resend API key
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set');
      // Log to console but don't fail - still return success to user
      console.log('Contact form submission (email not sent):', {
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey);

    // Send notification email to site owner
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'li_zheng@outlook.com',
      replyTo: email,
      subject: `New Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: "Thanks for reaching out!",
      text: `Hi ${name},\n\nThanks for your message! I appreciate you taking the time to reach out.\n\nI'll review your message and get back to you soon.\n\nBest regards,\nLi Zheng`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; background-color: #f9fafb;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="background: white; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                <h1 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 600; color: #111827;">
                  Thanks for reaching out!
                </h1>
                <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #374151;">
                  Hi ${name},
                </p>
                <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #374151;">
                  Thanks for your message! I appreciate you taking the time to reach out.
                </p>
                <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #374151;">
                  I'll review your message and get back to you soon.
                </p>
                <div style="padding-top: 24px; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 500; color: #111827;">
                    Best regards,
                  </p>
                  <p style="margin: 0; font-size: 15px; color: #6b7280;">
                    Li Zheng
                  </p>
                </div>
              </div>
              <div style="margin-top: 24px; text-align: center;">
                <p style="margin: 0; font-size: 13px; color: #9ca3af;">
                  This is an automated confirmation that we received your message.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('Emails sent successfully via Resend');

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response('Failed to send message', { status: 500 });
  }
}
