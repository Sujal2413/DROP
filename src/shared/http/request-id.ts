export function generateRequestId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    // Fallback if randomUUID is not available in environment
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}
