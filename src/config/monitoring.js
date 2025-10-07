/**
 * Sentry Configuration
 * Error tracking and performance monitoring
 */

import * as Sentry from '@sentry/react';

// Determine if Sentry should be enabled
const isSentryEnabled = () => {
  return (
    process.env.NODE_ENV === 'production' &&
    process.env.REACT_APP_SENTRY_DSN
  );
};

/**
 * Initialize Sentry
 */
export const initializeSentry = () => {
  if (!isSentryEnabled()) {
    console.log('Sentry is disabled (development mode or missing DSN)');
    return;
  }

  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    
    // Environment
    environment: process.env.NODE_ENV || 'development',
    
    // Release tracking
    release: `neb-media@${process.env.REACT_APP_VERSION || '0.1.0'}`,
    
    // Performance Monitoring
    integrations: [
      new Sentry.BrowserTracing({
        // Track navigation and user interactions
        tracingOrigins: ['localhost', /^\//],
      }),
    ],
    
    // Set sample rates
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0, // 10% in production, 100% in dev
    
    // Only send errors in production
    beforeSend(event, hint) {
      // Don't send errors in development unless explicitly enabled
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_SENTRY_DEBUG) {
        return null;
      }
      
      // Filter out certain errors
      const error = hint.originalException;
      
      // Ignore network errors
      if (error && error.message && error.message.includes('Network Error')) {
        return null;
      }
      
      // Ignore rate limit errors (they're expected)
      if (error && error.message && error.message.includes('Rate limit exceeded')) {
        return null;
      }
      
      // Ignore cancelled requests
      if (error && error.message && error.message.includes('Request aborted')) {
        return null;
      }
      
      return event;
    },
    
    // Ignore certain URLs
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      'chrome-extension://',
      'moz-extension://',
      
      // Random plugins/extensions
      'Can\'t find variable: ZiteReader',
      'jigsaw is not defined',
      'ComboSearch is not defined',
      
      // Third-party scripts
      'google',
      'gapi',
      'fb_xd_fragment',
    ],
    
    // Privacy: don't send PII
    sendDefaultPii: false,
    
    // Attach stack traces
    attachStacktrace: true,
    
    // Max breadcrumbs
    maxBreadcrumbs: 50,
    
    // Debug mode
    debug: process.env.REACT_APP_SENTRY_DEBUG === 'true',
  });

  console.log('Sentry initialized successfully');
};

/**
 * Log custom error to Sentry
 */
export const logError = (error, context = {}) => {
  if (!isSentryEnabled()) {
    console.error('Error:', error, context);
    return;
  }

  Sentry.captureException(error, {
    extra: context,
  });
};

/**
 * Log custom message to Sentry
 */
export const logMessage = (message, level = 'info', context = {}) => {
  if (!isSentryEnabled()) {
    console.log(`[${level}]`, message, context);
    return;
  }

  Sentry.captureMessage(message, {
    level,
    extra: context,
  });
};

/**
 * Set user context
 */
export const setUserContext = (user) => {
  if (!isSentryEnabled()) return;

  Sentry.setUser({
    id: user?.id,
    username: user?.username,
    email: user?.email,
  });
};

/**
 * Clear user context (on logout)
 */
export const clearUserContext = () => {
  if (!isSentryEnabled()) return;

  Sentry.setUser(null);
};

/**
 * Add breadcrumb
 */
export const addBreadcrumb = (message, category = 'custom', level = 'info', data = {}) => {
  if (!isSentryEnabled()) return;

  Sentry.addBreadcrumb({
    message,
    category,
    level,
    data,
  });
};

/**
 * Set custom tag
 */
export const setTag = (key, value) => {
  if (!isSentryEnabled()) return;

  Sentry.setTag(key, value);
};

/**
 * Set custom context
 */
export const setContext = (name, context) => {
  if (!isSentryEnabled()) return;

  Sentry.setContext(name, context);
};

/**
 * Performance monitoring - Start transaction
 */
export const startTransaction = (name, op = 'pageload') => {
  if (!isSentryEnabled()) return null;

  return Sentry.startTransaction({
    name,
    op,
  });
};

/**
 * Error boundary fallback component
 */
export const ErrorFallback = ({ error, resetError }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '2rem',
    textAlign: 'center'
  }}>
    <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#dc3545' }}>
      Oops! Something went wrong
    </h1>
    <p style={{ marginBottom: '2rem', color: '#6c757d' }}>
      We've been notified of this error and will fix it soon.
    </p>
    <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', maxWidth: '600px' }}>
      <code style={{ color: '#dc3545', fontSize: '0.875rem' }}>
        {error?.message || 'Unknown error'}
      </code>
    </div>
    <button
      onClick={resetError}
      style={{
        padding: '0.75rem 1.5rem',
        background: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.3s'
      }}
      onMouseOver={(e) => e.target.style.background = '#5568d3'}
      onMouseOut={(e) => e.target.style.background = '#667eea'}
    >
      Try Again
    </button>
  </div>
);

/**
 * Sentry Error Boundary HOC
 */
export const withSentryErrorBoundary = (Component) => {
  return Sentry.withErrorBoundary(Component, {
    fallback: ErrorFallback,
    showDialog: false,
  });
};

export default {
  initialize: initializeSentry,
  logError,
  logMessage,
  setUserContext,
  clearUserContext,
  addBreadcrumb,
  setTag,
  setContext,
  startTransaction,
  ErrorBoundary: Sentry.ErrorBoundary,
  ErrorFallback,
  withSentryErrorBoundary,
};
