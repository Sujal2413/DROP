export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
}

export interface EmailProvider {
  send(payload: SendEmailPayload): Promise<void>;
}
