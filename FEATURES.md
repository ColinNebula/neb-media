# Advanced Features Setup Guide

## 🚀 Table of Contents

1. [Rate Limiting](#rate-limiting)
2. [HTTPS Configuration](#https-configuration)
3. [Monitoring with Sentry](#monitoring-with-sentry)
4. [Service Worker & Offline Support](#service-worker--offline-support)
5. [Performance Optimization](#performance-optimization)

---

## 🛡️ Rate Limiting

### Overview
Client-side rate limiting prevents API abuse and protects your backend from excessive requests.

### Implementation

The rate limiter is automatically enabled on all API calls. Default limits:
- **API calls**: 100 requests per minute
- **File uploads**: 10 requests per minute
- **Login attempts**: 5 requests per 5 minutes

### Usage

```javascript
import { rateLimitMiddleware } from './utils/rateLimit';

// Check if request is allowed
const limit = rateLimitMiddleware.api();
if (!limit.allowed) {
  console.log(`Rate limited. Retry after ${limit.retryAfter} seconds`);
}

// Custom rate limit
const customLimit = rateLimitMiddleware.custom('myFeature', 20, 60000); // 20 per minute
```

### React Hook

```javascript
import { useRateLimit } from './utils/rateLimit';

function MyComponent() {
  const { checkLimit, getRemaining } = useRateLimit('api', 100, 60000);
  
  const handleClick = () => {
    const limit = checkLimit();
    if (limit.allowed) {
      // Make API call
    } else {
      alert(`Rate limited. ${limit.retryAfter}s remaining`);
    }
  };
}
```

### Configuration

Edit `src/config/security.js` to customize limits:

```javascript
export const RATE_LIMITS = {
  api: {
    maxRequests: 100,
    windowMs: 60000 // 1 minute
  },
  upload: {
    maxRequests: 10,
    windowMs: 60000
  }
};
```

---

## 🔒 HTTPS Configuration

### Local Development (Optional)

#### Option 1: Using mkcert (Recommended)

```bash
# Install mkcert
brew install mkcert  # macOS
choco install mkcert # Windows

# Generate certificates
mkcert -install
mkcert localhost 127.0.0.1 ::1

# Create .env.local
echo "HTTPS=true" > .env.local
echo "SSL_CRT_FILE=localhost+2.pem" >> .env.local
echo "SSL_KEY_FILE=localhost+2-key.pem" >> .env.local

# Start with HTTPS
npm start
```

#### Option 2: Using OpenSSL

```bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Create .env.local
echo "HTTPS=true" > .env.local
echo "SSL_CRT_FILE=cert.pem" >> .env.local
echo "SSL_KEY_FILE=key.pem" >> .env.local
```

### Production Deployment

#### Netlify

Create `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"

[[redirects]]
  from = "http://yourdomain.com/*"
  to = "https://yourdomain.com/:splat"
  status = 301
  force = true
```

#### Vercel

Create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        }
      ]
    }
  ]
}
```

#### Cloudflare

1. Go to SSL/TLS settings
2. Set mode to "Full (strict)"
3. Enable "Always Use HTTPS"
4. Enable "Automatic HTTPS Rewrites"
5. Enable HSTS with 12-month max age
6. Set minimum TLS version to 1.2

#### Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers on;
    
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    
    # Your app configuration
    location / {
        root /var/www/neb-media/build;
        try_files $uri /index.html;
    }
}
```

---

## 📊 Monitoring with Sentry

### Setup

1. **Create Sentry Account**
   - Go to [sentry.io](https://sentry.io)
   - Create a new project (React)
   - Copy your DSN

2. **Configure Environment**

Add to `.env`:

```bash
REACT_APP_SENTRY_DSN=https://your-dsn@sentry.io/project-id
REACT_APP_SENTRY_DEBUG=false
```

3. **Automatic Integration**

Sentry is already integrated! It will:
- ✅ Capture all unhandled errors
- ✅ Track performance metrics
- ✅ Monitor route changes
- ✅ Filter sensitive data

### Usage

#### Log Custom Errors

```javascript
import { logError, logMessage } from './config/monitoring';

try {
  // Your code
} catch (error) {
  logError(error, { userId: user.id, action: 'upload' });
}
```

#### Log Messages

```javascript
import { logMessage } from './config/monitoring';

logMessage('Payment processed', 'info', { amount: 100, currency: 'USD' });
```

#### Set User Context

```javascript
import { setUserContext, clearUserContext } from './config/monitoring';

// On login
setUserContext({
  id: user.id,
  username: user.username,
  email: user.email
});

// On logout
clearUserContext();
```

#### Add Breadcrumbs

```javascript
import { addBreadcrumb } from './config/monitoring';

addBreadcrumb('User clicked button', 'user', 'info', {
  buttonId: 'submit',
  page: '/checkout'
});
```

#### Performance Monitoring

```javascript
import { startTransaction } from './config/monitoring';

const transaction = startTransaction('checkout-flow', 'pageload');

// Your code here

if (transaction) {
  transaction.finish();
}
```

#### Error Boundary

Wrap components with error boundary:

```javascript
import { ErrorBoundary } from './config/monitoring';

function App() {
  return (
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>
  );
}
```

### Dashboard Features

Once configured, your Sentry dashboard will show:
- Error frequency and trends
- Affected users
- Stack traces
- Breadcrumbs (user actions before error)
- Performance metrics
- Release tracking

---

## 📴 Service Worker & Offline Support

### Features

- ✅ Offline page viewing
- ✅ Asset caching (images, CSS, JS)
- ✅ API response caching
- ✅ Background sync for failed requests
- ✅ Update notifications
- ✅ Progressive Web App (PWA) ready

### How It Works

The service worker is automatically registered in production. It:

1. **Caches static assets** on first load
2. **Serves from cache** when offline
3. **Updates in background** when online
4. **Shows offline page** for new pages

### Update Strategy

- **Static assets**: Stale-while-revalidate (instant load, update in background)
- **Images**: Cache-first (instant load from cache)
- **API calls**: Network-first (fresh data, fallback to cache)
- **Fonts**: Cache-first (1 year cache)

### Cache Durations

- **Images**: 60 days
- **Static assets**: 30 days
- **Fonts**: 1 year
- **API responses**: 5 minutes
- **Media platforms**: 24 hours

### Manual Control

```javascript
// Unregister service worker
import { unregister } from './serviceWorkerRegistration';
unregister();

// Skip waiting for new version
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
  });
}
```

### Testing Offline Mode

1. Open DevTools → Application → Service Workers
2. Check "Offline"
3. Refresh the page
4. Navigate around (cached pages work!)

### PWA Installation

Users can install your app:

1. **Chrome**: Click install icon in address bar
2. **Safari**: Share → Add to Home Screen
3. **Edge**: Settings → Apps → Install this site as an app

### Manifest Configuration

Edit `public/manifest.json` to customize:

```json
{
  "short_name": "Neb Media",
  "name": "Neb Media Platform",
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#667eea",
  "background_color": "#ffffff"
}
```

---

## ⚡ Performance Optimization

### Current Performance

- **Bundle Size**: ~210 KB (gzipped)
- **First Load**: < 2s (on 3G)
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 90+ (all metrics)

### Automatic Optimizations

✅ Code splitting by route  
✅ Tree shaking (unused code removed)  
✅ Minification  
✅ Gzip compression  
✅ Image lazy loading  
✅ Service worker caching  
✅ CDN-ready static assets  

### Manual Optimizations

#### Lazy Load Components

```javascript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

#### Optimize Images

```bash
# Install image optimization tools
npm install -g sharp-cli

# Optimize all images
sharp -i public/images/*.jpg -o public/images/optimized/ -q 80
```

#### Analyze Bundle

```bash
# Install analyzer
npm install --save-dev webpack-bundle-analyzer

# Build with analysis
npm run build -- --stats

# View bundle composition
npx webpack-bundle-analyzer build/bundle-stats.json
```

### Monitoring Performance

The app automatically tracks:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
- Time to First Byte (TTFB)

Metrics are sent to Sentry and console in development.

---

## 🎯 Quick Start Checklist

- [ ] Copy `.env.example` to `.env`
- [ ] Add Sentry DSN to `.env`
- [ ] Test rate limiting in DevTools
- [ ] Test offline mode (DevTools → Offline)
- [ ] Configure HTTPS for production
- [ ] Deploy with security headers
- [ ] Monitor Sentry dashboard
- [ ] Test PWA installation
- [ ] Run Lighthouse audit
- [ ] Check bundle size

---

## 📞 Support

For issues or questions:
- GitHub Issues: https://github.com/ColinNebula/neb-media/issues
- Security: See SECURITY.md
- Documentation: See README.md

---

**Built with ❤️ by Nebula Dev**
