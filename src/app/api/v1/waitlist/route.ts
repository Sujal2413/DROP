import { NextRequest } from 'next/server';
import { generateRequestId } from '@/shared/http/request-id';
import { sendSuccess, sendError } from '@/shared/http/api-response';
import { rateLimit } from '@/infrastructure/redis/rate-limiter';
import { waitlistInputSchema } from '@/modules/waitlist/waitlist.schema';
import { waitlistService } from '@/modules/waitlist/waitlist.service';
import { ValidationError } from '@/shared/errors/application-error';

export async function POST(req: NextRequest) {
  const requestId = generateRequestId();
  
  try {
    // 1. Rate Limiting based on IP
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    await rateLimit(`waitlist:${clientIp}`, { windowMs: 60 * 1000, max: 5 });

    // 2. Parse and Validate Request Body
    const body = await req.json().catch(() => ({}));
    const parsed = waitlistInputSchema.safeParse(body);
    
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
        'Thank you for joining the DROP waitlist. We will contact you when the first batch is ready.',
        requestId,
        201
      );
    }

    // 4. Register waitlist entry
    const { lead, isNew } = await waitlistService.register({
      name: data.name,
      email: data.email,
      city: data.city,
      drinkContext: data.drinkContext,
      leadSource: data.leadSource,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
    });

    const responseMessage = isNew
      ? 'Thank you for joining the DROP waitlist. We will contact you when the first batch is ready.'
      : 'You are already registered on our waitlist. We will keep you updated!';

    return sendSuccess(
      { email: lead.email, isNew },
      responseMessage,
      requestId,
      201
    );

  } catch (error) {
    return sendError(error as Error, requestId);
  }
}
