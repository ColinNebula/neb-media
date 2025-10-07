/**
 * HTTPS Configuration
 * Enforces HTTPS in production and provides secure connection utilities
 */

/**
 * Redirect HTTP to HTTPS in production
 */
export const enforceHTTPS = () => {
  if (
    process.env.NODE_ENV === 'production' &&
    window.location.protocol === 'http:' &&
    !window.location.hostname.includes('localhost')
  ) {
    window.location.href = window.location.href.replace('http://', 'https://');
  }
};

/**
 * Check if connection is secure
 */
export const isSecureConnection = () => {
  return (
    window.location.protocol === 'https:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '[::1]'
  );
};

/**
 * Get secure WebSocket URL
 */
export const getSecureWebSocketUrl = (path) => {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = window.location.host;
  return `${protocol}//${host}${path}`;
};

/**
 * Security headers configuration for nginx/apache
 */
export const getSecurityHeadersConfig = () => {
  return {
    nginx: `
# Nginx Security Headers Configuration
# Add this to your nginx server block

add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

# HSTS (HTTP Strict Transport Security)
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

# Content Security Policy
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://player.vimeo.com https://w.soundcloud.com https://open.spotify.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; media-src 'self' https: blob:; connect-src 'self' https://www.youtube.com https://player.vimeo.com https://api.soundcloud.com https://api.spotify.com; frame-src 'self' https://www.youtube.com https://player.vimeo.com https://w.soundcloud.com https://open.spotify.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests;" always;

# SSL Configuration
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
ssl_prefer_server_ciphers on;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
`,
    apache: `
# Apache Security Headers Configuration
# Add this to your .htaccess or apache config

<IfModule mod_headers.c>
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
    
    # HSTS
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    
    # CSP
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://player.vimeo.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; connect-src 'self' https://www.youtube.com https://player.vimeo.com; frame-src 'self' https://www.youtube.com https://player.vimeo.com; object-src 'none'"
</IfModule>

# Redirect HTTP to HTTPS
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
`,
    cloudflare: `
# Cloudflare SSL/TLS Settings
# Set in Cloudflare Dashboard > SSL/TLS

1. SSL/TLS encryption mode: Full (strict)
2. Enable "Always Use HTTPS"
3. Enable "Automatic HTTPS Rewrites"
4. Enable "HSTS" with:
   - Max Age: 12 months
   - Include subdomains: Yes
   - Preload: Yes
5. Minimum TLS Version: TLS 1.2
6. Enable "Opportunistic Encryption"
`,
    netlify: `
# Netlify Configuration
# Create netlify.toml in root directory

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://www.youtube.com; frame-src 'self' https://www.youtube.com; object-src 'none'"

# Force HTTPS
[[redirects]]
  from = "http://yourdomain.com/*"
  to = "https://yourdomain.com/:splat"
  status = 301
  force = true
`,
    vercel: `
# Vercel Configuration
# Create vercel.json in root directory

{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        }
      ]
    }
  ]
}
`
  };
};

/**
 * Display security warning if not using HTTPS in production
 */
export const checkSecureConnection = () => {
  if (!isSecureConnection() && process.env.NODE_ENV === 'production') {
    console.warn(
      '⚠️ WARNING: Connection is not secure! ' +
      'Your application should be served over HTTPS in production. ' +
      'See HTTPS_CONFIG.md for setup instructions.'
    );
  }
};

/**
 * Generate self-signed certificate for local development (instructions)
 */
export const getLocalHTTPSInstructions = () => {
  return `
# Local HTTPS Development Setup

## Option 1: Using mkcert (Recommended)

1. Install mkcert:
   - macOS: brew install mkcert
   - Windows: choco install mkcert
   - Linux: See https://github.com/FiloSottile/mkcert

2. Generate certificates:
   mkcert -install
   mkcert localhost 127.0.0.1 ::1

3. Create .env.local:
   HTTPS=true
   SSL_CRT_FILE=localhost+2.pem
   SSL_KEY_FILE=localhost+2-key.pem

4. Start dev server:
   npm start

## Option 2: Using OpenSSL

1. Generate certificate:
   openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

2. Create .env.local:
   HTTPS=true
   SSL_CRT_FILE=cert.pem
   SSL_KEY_FILE=key.pem

3. Start dev server:
   npm start

## Production HTTPS

For production, use:
- Let's Encrypt (free SSL certificates)
- Cloudflare SSL
- AWS Certificate Manager
- Your hosting provider's SSL

Never commit SSL certificates to git!
`;
};

export default {
  enforceHTTPS,
  isSecureConnection,
  getSecureWebSocketUrl,
  getSecurityHeadersConfig,
  checkSecureConnection,
  getLocalHTTPSInstructions,
};
