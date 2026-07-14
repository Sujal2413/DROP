import { ErrorCode } from './error-codes';

export class ApplicationError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly fields?: Record<string, string>;

  constructor(message: string, code: ErrorCode = ErrorCode.INTERNAL_ERROR, statusCode: number = 500, fields?: Record<string, string>) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.fields = fields;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string, fields?: Record<string, string>) {
    super(message, ErrorCode.VALIDATION_ERROR, 400, fields);
  }
}

export class DuplicateResourceError extends ApplicationError {
  constructor(message: string) {
    super(message, ErrorCode.DUPLICATE_RESOURCE, 409);
  }
}

export class RateLimitError extends ApplicationError {
  constructor(message: string = 'Too many requests. Please try again later.') {
    super(message, ErrorCode.RATE_LIMIT_EXCEEDED, 429);
  }
}

export class BadRequestError extends ApplicationError {
  constructor(message: string) {
    super(message, ErrorCode.BAD_REQUEST, 400);
  }
}
