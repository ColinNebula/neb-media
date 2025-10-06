/**
 * Security Configuration
 * Centralized security settings and utilities
 */

// Input Sanitization
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Remove potentially dangerous characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
};

// URL Validation
export const isValidUrl = (url) => {
  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Allowed video platforms for embedding
export const ALLOWED_PLATFORMS = [
  'youtube.com',
  'youtu.be',
  'vimeo.com',
  'twitch.tv',
  'dailymotion.com',
  'wistia.com',
  'soundcloud.com',
  'spotify.com',
  'bandcamp.com'
];

// Check if URL is from allowed platform
export const isAllowedPlatform = (url) => {
  try {
    const urlObj = new URL(url);
    return ALLOWED_PLATFORMS.some(platform => urlObj.hostname.includes(platform));
  } catch {
    return false;
  }
};

// Rate Limiting Configuration
export const RATE_LIMITS = {
  api: {
    maxRequests: 100,
    windowMs: 60000 // 1 minute
  },
  upload: {
    maxRequests: 10,
    windowMs: 60000 // 1 minute
  }
};

// Local Storage Security
export const secureStorage = {
  setItem: (key, value) => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },
  
  getItem: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage retrieval error:', error);
      return null;
    }
  },
  
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage removal error:', error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }
};

// Token Validation
export const isValidToken = (token) => {
  if (!token || typeof token !== 'string') return false;
  
  // Basic JWT structure check (3 parts separated by dots)
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  
  try {
    // Check if payload is valid JSON
    const payload = JSON.parse(atob(parts[1]));
    
    // Check if token is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
};

// Environment-based API URL
export const getApiUrl = () => {
  // In production, use relative path to prevent CORS issues
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL || '/api';
  }
  // In development, use environment variable or localhost
  return process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
};

// Security Headers for API Requests
export const getSecurityHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  };
  
  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token && isValidToken(token)) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// File Upload Validation
export const ALLOWED_FILE_TYPES = {
  video: ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'],
  audio: ['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/flac', 'audio/aac'],
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
};

export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const validateFile = (file, type = 'video') => {
  if (!file) return { valid: false, error: 'No file provided' };
  
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File too large (max 100MB)' };
  }
  
  // Check file type
  const allowedTypes = ALLOWED_FILE_TYPES[type] || [];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` };
  }
  
  return { valid: true };
};

// XSS Prevention
export const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
};

// CSRF Token Management (if needed)
export const csrfToken = {
  generate: () => {
    const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    sessionStorage.setItem('csrfToken', token);
    return token;
  },
  
  get: () => {
    return sessionStorage.getItem('csrfToken');
  },
  
  validate: (token) => {
    return token === sessionStorage.getItem('csrfToken');
  }
};

export default {
  sanitizeInput,
  isValidUrl,
  isAllowedPlatform,
  secureStorage,
  isValidToken,
  getApiUrl,
  getSecurityHeaders,
  validateFile,
  escapeHtml,
  csrfToken
};
