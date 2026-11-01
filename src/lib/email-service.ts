/**
 * Email Service for Wix
 * Uses Wix's native email capabilities through the Wix SDK
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Send email using Wix's native email service
 * This integrates with Wix's email infrastructure for reliable delivery
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    // Use Wix's native email API endpoint
    const response = await fetch('/_api/web/v1/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: options.to,
        subject: options.subject,
        html: options.html,
        replyTo: options.replyTo,
        from: 'noreply@wix.com', // Wix default sender
      }),
    });

    if (!response.ok) {
      throw new Error(`Email service error: ${response.statusText}`);
    }

    console.log(`Email sent successfully to ${options.to}`);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
