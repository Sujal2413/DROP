import { emailService } from '@/infrastructure/email/email.service';
import { env } from '@/shared/config/env';
import {
  ConsumerWaitlistNotificationPayload,
  BusinessEnquiryNotificationPayload,
} from './notification.types';

export class NotificationService {
  /**
   * Send confirmation to a consumer who joined the waitlist
   */
  public async sendConsumerWaitlistConfirmation(
    payload: ConsumerWaitlistNotificationPayload
  ): Promise<void> {
    const greeting = payload.name ? `Hi ${payload.name},` : 'Hello,';
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 8px;">
        <h2 style="color: #111; margin-top: 0;">DROP.</h2>
        <p>${greeting}</p>
        <p>Thank you for joining the DROP waitlist. We will contact you when the first batch is ready.</p>
        <p style="margin-top: 30px; font-size: 12px; color: #999;">This is an automated message. Please do not reply directly.</p>
      </div>
    `;

    await emailService.send({
      to: payload.email,
      subject: 'Welcome to the DROP Waitlist',
      html,
    });
  }

  /**
   * Send confirmation to a business contact who submitted an enquiry
   */
  public async sendBusinessEnquiryConfirmation(
    payload: BusinessEnquiryNotificationPayload
  ): Promise<void> {
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 8px;">
        <h2 style="color: #111; margin-top: 0;">DROP.</h2>
        <p>Hi ${payload.contactName},</p>
        <p>Thank you for reaching out to DROP. We have received your enquiry for <strong>${payload.businessName}</strong> and will contact you shortly.</p>
        <p style="margin-top: 30px; font-size: 12px; color: #999;">This is an automated message. Please do not reply directly.</p>
      </div>
    `;

    await emailService.send({
      to: payload.email,
      subject: 'Your Business Enquiry to DROP',
      html,
    });
  }

  /**
   * Send internal notification to the DROP team
   */
  public async sendInternalBusinessEnquiryAlert(
    payload: BusinessEnquiryNotificationPayload
  ): Promise<void> {
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 8px;">
        <h2 style="color: #111; margin-top: 0; border-bottom: 2px solid #111; padding-bottom: 10px;">New B2B Lead Alert</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 40%;">Business Name:</td>
            <td style="padding: 8px 0;">${payload.businessName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Contact Name:</td>
            <td style="padding: 8px 0;">${payload.contactName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;">${payload.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0;">${payload.phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Business Type:</td>
            <td style="padding: 8px 0;">${payload.businessType}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">City:</td>
            <td style="padding: 8px 0;">${payload.city || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Monthly Requirement:</td>
            <td style="padding: 8px 0;">${payload.monthlyRequirement || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td>
            <td style="padding: 8px 0; white-space: pre-wrap;">${payload.message || 'N/A'}</td>
          </tr>
        </table>
      </div>
    `;

    await emailService.send({
      to: env.TEAM_EMAIL,
      subject: `🚨 New B2B Enquiry: ${payload.businessName}`,
      html,
    });
  }
}

export const notificationService = new NotificationService();
