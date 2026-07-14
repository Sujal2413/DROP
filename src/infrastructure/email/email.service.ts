import { EmailProvider, SendEmailPayload } from './email.provider';
import { env } from '@/shared/config/env';

// Mock Email Provider that logs locally (development/test fallback)
class MockEmailProvider implements EmailProvider {
  async send(payload: SendEmailPayload): Promise<void> {
    console.info('========================================');
    console.info(`📬 [MOCK EMAIL SENT]`);
    console.info(`To: ${payload.to}`);
    console.info(`Subject: ${payload.subject}`);
    console.info(`HTML Content length: ${payload.html.length} chars`);
    console.info('========================================');
  }
}

// SMTP Provider (lazy initialized if nodemailer is installed and configured)
class SmtpEmailProvider implements EmailProvider {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private transporter: any = null;

  constructor() {
    this.init();
  }

  private async init() {
    if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
      return;
    }
    try {
      // Lazy import nodemailer so it's not a hard build dependency if not needed
      const nodemailer = await import('nodemailer');
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT || 587,
        secure: env.SMTP_PORT === 465,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      });
    } catch (err) {
      console.warn('⚠️ Failed to initialize nodemailer SMTP transport:', err);
    }
  }

  async send(payload: SendEmailPayload): Promise<void> {
    if (!this.transporter) {
      // Fallback to console log if SMTP is misconfigured or nodemailer import fails
      console.warn('⚠️ SMTP Transporter not initialized. Logging email content instead:');
      console.info(`To: ${payload.to} | Subject: ${payload.subject}`);
      return;
    }

    await this.transporter.sendMail({
      from: env.SMTP_FROM,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
    });
  }
}

// Export active provider based on environment config
const hasSmtpConfig = !!(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);
export const emailService: EmailProvider = hasSmtpConfig
  ? new SmtpEmailProvider()
  : new MockEmailProvider();
