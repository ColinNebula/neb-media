/**
 * Rate Limiting Utility
 * Client-side rate limiting to prevent API abuse
 */

import { RATE_LIMITS } from '../config/security';

class RateLimiter {
  constructor() {
    this.requests = new Map();
  }

  /**
   * Check if request should be allowed
   * @param {string} key - Unique identifier for the rate limit (e.g., 'api', 'upload', 'login')
   * @param {number} maxRequests - Maximum number of requests allowed
   * @param {number} windowMs - Time window in milliseconds
   * @returns {boolean} - True if request is allowed, false if rate limited
   */
  checkLimit(key, maxRequests = RATE_LIMITS.api.maxRequests, windowMs = RATE_LIMITS.api.windowMs) {
    const now = Date.now();
    
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }

    const timestamps = this.requests.get(key);
    
    // Remove old timestamps outside the window
    const validTimestamps = timestamps.filter(timestamp => now - timestamp < windowMs);
    
    // Check if limit exceeded
    if (validTimestamps.length >= maxRequests) {
      const oldestTimestamp = Math.min(...validTimestamps);
      const retryAfter = Math.ceil((oldestTimestamp + windowMs - now) / 1000);
      
      console.warn(`Rate limit exceeded for ${key}. Retry after ${retryAfter} seconds.`);
      return {
        allowed: false,
        retryAfter,
        remaining: 0
      };
    }

    // Add current timestamp
    validTimestamps.push(now);
    this.requests.set(key, validTimestamps);

    return {
      allowed: true,
      retryAfter: 0,
      remaining: maxRequests - validTimestamps.length
    };
  }

  /**
   * Reset rate limit for a specific key
   * @param {string} key - The key to reset
   */
  reset(key) {
    this.requests.delete(key);
  }

  /**
   * Clear all rate limits
   */
  clearAll() {
    this.requests.clear();
  }

  /**
   * Get remaining requests for a key
   * @param {string} key - The key to check
   * @param {number} maxRequests - Maximum requests allowed
   * @param {number} windowMs - Time window in milliseconds
   */
  getRemaining(key, maxRequests = RATE_LIMITS.api.maxRequests, windowMs = RATE_LIMITS.api.windowMs) {
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];
    const validTimestamps = timestamps.filter(timestamp => now - timestamp < windowMs);
    return Math.max(0, maxRequests - validTimestamps.length);
  }
}

// Create singleton instance
const rateLimiter = new RateLimiter();

/**
 * Rate limiting middleware for API calls
 */
export const rateLimitMiddleware = {
  /**
   * Check if API request is allowed
   */
  api: () => {
    return rateLimiter.checkLimit('api', RATE_LIMITS.api.maxRequests, RATE_LIMITS.api.windowMs);
  },

  /**
   * Check if upload request is allowed
   */
  upload: () => {
    return rateLimiter.checkLimit('upload', RATE_LIMITS.upload.maxRequests, RATE_LIMITS.upload.windowMs);
  },

  /**
   * Check if login attempt is allowed
   */
  login: () => {
    return rateLimiter.checkLimit('login', 5, 300000); // 5 attempts per 5 minutes
  },

  /**
   * Custom rate limit check
   */
  custom: (key, maxRequests, windowMs) => {
    return rateLimiter.checkLimit(key, maxRequests, windowMs);
  },

  /**
   * Reset specific rate limit
   */
  reset: (key) => {
    rateLimiter.reset(key);
  },

  /**
   * Get remaining requests
   */
  getRemaining: (key, maxRequests, windowMs) => {
    return rateLimiter.getRemaining(key, maxRequests, windowMs);
  }
};

/**
 * Decorator for rate-limited functions
 */
export const withRateLimit = (fn, key, maxRequests, windowMs) => {
  return async (...args) => {
    const limit = rateLimiter.checkLimit(key, maxRequests, windowMs);
    
    if (!limit.allowed) {
      throw new Error(`Rate limit exceeded. Please try again in ${limit.retryAfter} seconds.`);
    }

    return await fn(...args);
  };
};

/**
 * React hook for rate limiting
 */
export const useRateLimit = (key, maxRequests, windowMs) => {
  const checkLimit = () => {
    return rateLimiter.checkLimit(key, maxRequests, windowMs);
  };

  const getRemaining = () => {
    return rateLimiter.getRemaining(key, maxRequests, windowMs);
  };

  const reset = () => {
    rateLimiter.reset(key);
  };

  return { checkLimit, getRemaining, reset };
};

export default rateLimiter;
