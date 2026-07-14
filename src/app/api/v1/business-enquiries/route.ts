import { NextRequest } from 'next/server';
import { generateRequestId } from '@/shared/http/request-id';
import { sendSuccess, sendError } from '@/shared/http/api-response';
import { rateLimit } from '@/infrastructure/redis/rate-limiter';
import { businessEnquiryInputSchema } from '@/modules/business-enquiries/business-enquiry.schema';
import { businessEnquiryService } from '@/modules/business-enquiries/business-enquiry.service';
import { ValidationError } from '@/shared/errors/application-error';

export async function POST(req: NextRequest) {
  const requestId = generateRequestId();
  
  try {
    // 1. Rate Limiting (lower max frequency for B2B forms to prevent spam)
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    await rateLimit(`business-enquiries:${clientIp}`, { windowMs: 60 * 1000, max: 3 });

    // 2. Parse and Validate Request Body
    const body = await req.json().catch(() => ({}));
    const parsed = businessEnquiryInputSchema.safeParse(body);
    
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        const path = err.path.join('.');
        if (path) fields[path] = err.message;
      });
      throw new ValidationError('Validation failed.', fields);
    }

    const data = parsed.data;

    // 3. Honeypot check for bots
    if (data.website) {
      // Fake successful response to reject spam silently
      return sendSuccess(
        { email: data.email },
        'Thank you for reaching out to DROP. We have received your enquiry and will contact you shortly.',
        requestId,
        201
      );
    }

    // 4. Submit enquiry
    const enquiry = await businessEnquiryService.submitEnquiry({
      businessName: data.businessName,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone,
      businessType: data.businessType,
      city: data.city,
      monthlyRequirement: data.monthlyRequirement,
      message: data.message,
      enquirySource: data.enquirySource,
    });

    return sendSuccess(
      { id: enquiry.id, businessName: enquiry.businessName },
      'Thank you for reaching out to DROP. We have received your enquiry and will contact you shortly.',
      requestId,
      201
    );

  } catch (error) {
    return sendError(error as Error, requestId);
  }
}
