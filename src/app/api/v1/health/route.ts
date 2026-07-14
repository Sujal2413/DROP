import { generateRequestId } from '@/shared/http/request-id';
import { sendSuccess } from '@/shared/http/api-response';

export async function GET() {
  const requestId = generateRequestId();
  return sendSuccess(
    { status: 'healthy', uptime: process.uptime() },
    'DROP API is healthy.',
    requestId
  );
}
export const dynamic = 'force-dynamic';
export const revalidate = 0;
