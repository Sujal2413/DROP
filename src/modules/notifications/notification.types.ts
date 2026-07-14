export interface ConsumerWaitlistNotificationPayload {
  email: string;
  name?: string;
}

export interface BusinessEnquiryNotificationPayload {
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  businessType: string;
  city?: string;
  monthlyRequirement?: string;
  message?: string;
}
