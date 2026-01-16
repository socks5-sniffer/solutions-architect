/**
 * Input Validation and Sanitization Utilities
 * Provides security measures for user input processing
 */

export interface ValidationResult {
  isValid: boolean;
  sanitizedInput: string;
  error?: string;
}

export class InputValidator {
  private static readonly MAX_INPUT_LENGTH = 10000;
  private static readonly MIN_INPUT_LENGTH = 1;
  
  // Patterns to detect potential security threats
  private static readonly SUSPICIOUS_PATTERNS = [
    /<script[^>]*>.*?<\/script>/gi,  // Script tags
    /javascript:/gi,                  // JavaScript protocol
    /on\w+\s*=/gi,                   // Event handlers
    /<iframe[^>]*>/gi,               // iFrame tags
    /eval\s*\(/gi,                   // eval() calls
    /expression\s*\(/gi,             // CSS expressions
  ];

  // SQL injection patterns (even though we're using API, good practice)
  private static readonly SQL_INJECTION_PATTERNS = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
    /(--|;|\/\*|\*\/)/g,
    /(\bOR\b|\bAND\b)\s+\d+\s*=\s*\d+/gi,
  ];

  /**
   * Validates and sanitizes user input
   */
  static validate(input: string): ValidationResult {
    // Check if input exists
    if (!input || typeof input !== 'string') {
      return {
        isValid: false,
        sanitizedInput: '',
        error: 'Input is required'
      };
    }

    // Trim whitespace
    const trimmedInput = input.trim();

    // Check length constraints
    if (trimmedInput.length < this.MIN_INPUT_LENGTH) {
      return {
        isValid: false,
        sanitizedInput: '',
        error: 'Input is too short'
      };
    }

    if (trimmedInput.length > this.MAX_INPUT_LENGTH) {
      return {
        isValid: false,
        sanitizedInput: '',
        error: `Input exceeds maximum length of ${this.MAX_INPUT_LENGTH} characters`
      };
    }

    // Sanitize input
    const sanitizedInput = this.sanitize(trimmedInput);

    // Check for suspicious patterns
    const threatDetection = this.detectThreats(sanitizedInput);
    if (!threatDetection.isValid) {
      return threatDetection;
    }

    return {
      isValid: true,
      sanitizedInput,
    };
  }

  /**
   * Sanitizes input by removing/escaping dangerous characters
   */
  private static sanitize(input: string): string {
    return input
      // Remove null bytes
      .replace(/\0/g, '')
      // Normalize line breaks
      .replace(/\r\n/g, '\n')
      // Remove excessive whitespace
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Detects potential security threats in input
   */
  private static detectThreats(input: string): ValidationResult {
    // Check for XSS patterns
    for (const pattern of this.SUSPICIOUS_PATTERNS) {
      if (pattern.test(input)) {
        return {
          isValid: false,
          sanitizedInput: '',
          error: 'Input contains potentially malicious content'
        };
      }
    }

    // Check for SQL injection patterns (defense in depth)
    for (const pattern of this.SQL_INJECTION_PATTERNS) {
      if (pattern.test(input)) {
        console.warn('Potential SQL injection attempt detected');
        // For technical queries, SQL keywords might be legitimate
        // So we log but don't block - adjust based on your security requirements
      }
    }

    return {
      isValid: true,
      sanitizedInput: input
    };
  }

  /**
   * Escapes HTML special characters to prevent XSS
   */
  static escapeHtml(text: string): string {
    const htmlEscapeMap: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
    };
    
    return text.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char]);
  }

  /**
   * Rate limiting check (implement with your rate limiting solution)
   */
  static checkRateLimit(userId: string): boolean {
    // Implement rate limiting logic here
    // For now, return true (allowed)
    return true;
  }
}
