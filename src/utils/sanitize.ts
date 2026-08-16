import DOMPurify from 'dompurify';

/**
 * Sanitizes an HTML string to prevent XSS attacks.
 * @param dirty HTML string to sanitize
 * @returns Sanitized clean HTML string
 */
export const sanitizeHTML = (dirty: string): string => {
  return DOMPurify.sanitize(dirty);
};
