import { NextRequest } from 'next/server';
import { generateRequestId } from '@/shared/http/request-id';
import { sendSuccess, sendError } from '@/shared/http/api-response';
import { rateLimit } from '@/infrastructure/redis/rate-limiter';
import { interestInputSchema } from '@/modules/interest/interest.schema';
import { interestService } from '@/modules/interest/interest.service';
import { ValidationError } from '@/shared/errors/application-error';

export async function POST(req: NextRequest) {
  const requestId = generateRequestId();
  
  try {
    // 1. Rate Limiting
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    await rateLimit(`interest:${clientIp}`, { windowMs: 60 * 1000, max: 5 });

    // 2. Parse and Validate Request Body
    const body = await req.json().catch(() => ({}));
    const parsed = interestInputSchema.safeParse(body);
    
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
        'Thank you for your interest. We will keep you updated!',
        requestId,
        201
      );
    }

    // 4. Express interest (upserting if email already exists)
    const { lead, isNew } = await interestService.expressInterest({
      email: data.email,
      leadSource: data.leadSource,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
    });

    const responseMessage = isNew
      ? 'Thank you for your interest. We will keep you updated!'
      : 'You are already registered. We will keep you updated!';

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
