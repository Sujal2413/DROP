import { NextResponse } from 'next/server';
import { ErrorCode } from '../errors/error-codes';
import { ApplicationError } from '../errors/application-error';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
  requestId: string;
}

export function sendSuccess<T = unknown>(
  data: T,
  message: string,
  requestId: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
      requestId,
    },
    { status }
  );
}

export function sendError(
  error: Error | ApplicationError,
  requestId: string
): NextResponse<ApiResponse<never>> {
  let statusCode = 500;
  let code = ErrorCode.INTERNAL_ERROR;
  let message = 'An unexpected error occurred.';
  let fields: Record<string, string> | undefined;

  if (error instanceof ApplicationError) {
    statusCode = error.statusCode;
    code = error.code;
    message = error.message;
    fields = error.fields;
  } else {
    // Log unexpected errors safely
    console.error(`[Request ${requestId}] Unhandled Error:`, error.message);
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(fields ? { fields } : {}),
      },
      requestId,
    },
    { status: statusCode }
  );
}
