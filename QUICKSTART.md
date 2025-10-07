# 🚀 Quick Start Guide

## Immediate Next Steps

### 1. Configure Environment (1 minute)

```bash
# Copy example to create your own .env
cp .env.example .env

# Edit .env and add (optional):
# REACT_APP_SENTRY_DSN=your-sentry-dsn-here
```

### 2. Test Everything (2 minutes)

```bash
# Start development server
npm start

# Open http://localhost:3000
# Check console for:
# ✓ "Sentry is disabled (development mode or missing DSN)"
# ✓ "Service worker is ready (localhost mode)"  
# ✓ No errors
```

### 3. Test Features

**Rate Limiting:**
```javascript
// Open DevTools Console, run:
for(let i = 0; i < 105; i++) {
  fetch('/api/test').catch(() => {});
}
// Should see: "Rate limit exceeded"
```

**Offline Mode:**
1. Open DevTools → Application → Service Workers
2. Check "Offline"
3. Refresh page
4. See offline.html page
5. Navigate to cached pages (they work!)

**HTTPS (Production Only):**
- Deploy to hosting
- Visit https://yourdomain.com
- Check for 🔒 icon in address bar

**Sentry Monitoring:**
1. Sign up at https://sentry.io
2. Create React project
3. Copy DSN to .env
4. Build and deploy
5. Trigger an error
6. See it in Sentry dashboard

---

## Common Tasks

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

### Test Production Build Locally
```bash
npm run build
npx serve -s build
# Open http://localhost:3000
```

### Check Bundle Size
```bash
npm run build
# See output: ~200 KB gzipped
```

### Update Dependencies
```bash
npm update
npm audit fix
```

---

## Feature Toggle

### Disable Service Worker
In `src/index.js`, change:
```javascript
serviceWorkerRegistration.register({...});
```
to:
```javascript
serviceWorkerRegistration.unregister();
```

### Disable Sentry
Remove from `.env`:
```bash
REACT_APP_SENTRY_DSN=
```

### Adjust Rate Limits
Edit `src/config/security.js`:
```javascript
export const RATE_LIMITS = {
  api: {
    maxRequests: 100, // Change this
    windowMs: 60000   // Or this
  }
};
```

---

## Verify Implementation

Run this checklist:

- [ ] `npm install` completed without errors
- [ ] `npm run build` succeeds
- [ ] Build size is ~200 KB (gzipped)
- [ ] No console errors on `npm start`
- [ ] Service worker registered in DevTools
- [ ] Offline mode works
- [ ] App installs as PWA
- [ ] Rate limiting works
- [ ] HTTPS redirect works (production)
- [ ] Sentry captures errors (if configured)

---

## File Structure

```
neb-media/
├── src/
│   ├── config/
│   │   ├── https.js          ← HTTPS utilities
│   │   ├── monitoring.js     ← Sentry configuration
│   │   └── security.js       ← Security utilities
│   ├── utils/
│   │   └── rateLimit.js      ← Rate limiting
│   ├── service-worker.js     ← Service worker
│   ├── serviceWorkerRegistration.js
│   └── index.js              ← All features initialized here
├── public/
│   ├── offline.html          ← Offline fallback
│   └── manifest.json         ← PWA manifest
├── .env.example              ← Environment template
├── FEATURES.md               ← Complete guide
├── SECURITY.md               ← Security documentation
└── IMPLEMENTATION_COMPLETE.md ← Implementation summary
```

---

## Key Files to Know

| File | Purpose | When to Edit |
|------|---------|--------------|
| `.env` | Configuration | Add Sentry DSN, API URL |
| `src/index.js` | App initialization | Rarely |
| `src/config/security.js` | Rate limits, validation | Adjust limits |
| `src/config/monitoring.js` | Sentry settings | Custom error handling |
| `src/service-worker.js` | Caching strategies | Change cache durations |
| `public/manifest.json` | PWA settings | App name, colors, icons |

---

## Emergency Rollback

If something breaks, restore previous version:

```bash
# Uninstall new dependencies
npm uninstall @sentry/react workbox-*

# Restore package.json
git checkout package.json

# Reinstall
npm install

# Remove new files
rm -rf src/config/https.js
rm -rf src/config/monitoring.js
rm -rf src/utils/rateLimit.js
rm -rf src/service-worker.js
rm -rf src/serviceWorkerRegistration.js

# Restore index.js
git checkout src/index.js

# Build
npm run build
```

---

## Performance Monitoring

### Monitor in Production

1. Open deployed site
2. Open DevTools → Lighthouse
3. Run audit
4. Check scores:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 100
   - SEO: 95+
   - PWA: ✓

### Check Service Worker Status

```javascript
navigator.serviceWorker.ready.then(registration => {
  console.log('SW registered:', registration);
  console.log('SW active:', registration.active);
  console.log('SW scope:', registration.scope);
});
```

### Check Cache Status

```javascript
caches.keys().then(names => {
  console.log('Caches:', names);
  names.forEach(name => {
    caches.open(name).then(cache => {
      cache.keys().then(keys => {
        console.log(`${name}: ${keys.length} items`);
      });
    });
  });
});
```

---

## Support

**Documentation:**
- `FEATURES.md` - Complete feature guide
- `SECURITY.md` - Security best practices
- `IMPLEMENTATION_COMPLETE.md` - Implementation summary

**Get Help:**
- GitHub Issues: https://github.com/ColinNebula/neb-media/issues
- Sentry Docs: https://docs.sentry.io
- Workbox Docs: https://developers.google.com/web/tools/workbox

**Quick Links:**
- Sentry Dashboard: https://sentry.io
- Lighthouse: https://web.dev/measure/
- PWA Checklist: https://web.dev/pwa-checklist/

---

**Ready to deploy? Run `npm run build` and you're good to go! 🚀**
