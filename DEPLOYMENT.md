# Deployment Guide for Neb Media

This guide covers multiple deployment options for the Neb Media website.

## Table of Contents
- [Current Setup (GitHub Pages)](#current-setup-github-pages)
- [Netlify Deployment](#netlify-deployment)
- [Vercel Deployment](#vercel-deployment)
- [Custom Domain Setup](#custom-domain-setup)
- [Pre-Deployment Checklist](#pre-deployment-checklist)

---

## Current Setup (GitHub Pages)

### Already Configured ✅
Your site is currently set up for GitHub Pages deployment.

**Current URL:** https://colinnebula.github.io/neb-media

### Deploy Command
```bash
npm run deploy
```

This command:
1. Builds the production bundle (`npm run build`)
2. Deploys to GitHub Pages (`gh-pages -d build`)

### GitHub Pages Settings
- **Repository:** ColinNebula/neb-media
- **Branch:** gh-pages
- **Homepage:** Configured in package.json

---

## Netlify Deployment

### Why Netlify?
- ✅ Free tier with generous limits
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Continuous deployment from Git
- ✅ Build previews for pull requests
- ✅ Form handling
- ✅ Serverless functions support

### Quick Deploy (3 Steps)

#### Option 1: Drag & Drop
1. Build your site: `npm run build`
2. Visit https://app.netlify.com/drop
3. Drag the `build` folder

#### Option 2: Git Integration (Recommended)
1. Visit https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select `neb-media` repository
4. Netlify will auto-detect settings from `netlify.toml`
5. Click "Deploy site"

### Configuration
The `netlify.toml` file is already configured with:
- Build command: `npm run build`
- Publish directory: `build`
- Client-side routing redirects
- Security headers
- Cache optimization

### Custom Domain on Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records (provided by Netlify)
4. SSL certificate auto-provisioned

---

## Vercel Deployment

### Why Vercel?
- ✅ Built by Next.js team (excellent React support)
- ✅ Zero configuration
- ✅ Automatic HTTPS
- ✅ Edge network (fast global performance)
- ✅ Preview deployments
- ✅ Serverless functions

### Quick Deploy (2 Steps)

#### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel
```

#### Option 2: Git Integration (Recommended)
1. Visit https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Vercel auto-detects Create React App
5. Click "Deploy"

### Configuration
The `vercel.json` file is configured with:
- Framework detection
- Client-side routing
- Security headers
- Cache optimization

### Custom Domain on Vercel
1. Go to Project Settings → Domains
2. Add domain
3. Configure DNS records
4. SSL auto-provisioned

---

## Custom Domain Setup

### Purchase a Domain
Popular registrars:
- Namecheap (affordable)
- Google Domains (simple)
- Cloudflare (with free CDN)

### DNS Configuration

#### For Netlify:
```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     your-site.netlify.app
```

#### For Vercel:
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

#### For GitHub Pages (with custom domain):
1. Add `CNAME` file to `/public` with your domain
2. Configure DNS:
```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     colinnebula.github.io
```

---

## Pre-Deployment Checklist

### ✅ Code Quality
- [x] No console errors
- [x] All features working
- [x] Responsive on mobile/tablet/desktop
- [x] Dark/light theme working
- [x] All links functional

### ✅ Performance
- [x] Images optimized
- [x] Code splitting enabled (Create React App default)
- [x] Service worker configured (PWA)
- [ ] Consider lazy loading for heavy components

### ✅ SEO
- [x] Meta tags configured
- [x] robots.txt present
- [x] sitemap.xml created
- [x] Proper page titles
- [x] Social media meta tags
- [ ] Google Analytics (optional - add to .env)

### ✅ Security
- [x] Content Security Policy headers
- [x] XSS protection enabled
- [x] HTTPS enforced
- [x] No sensitive data in code
- [x] .env example provided
- [x] .gitignore configured

### ✅ Browser Compatibility
- [x] Chrome/Edge (Chromium)
- [x] Firefox
- [x] Safari
- [x] Mobile browsers

---

## Environment Variables

### For Production
Create `.env.production` file (don't commit):
```bash
REACT_APP_API_URL=https://your-api.com/api
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_SENTRY_DSN=your-sentry-dsn
```

### Platform-Specific
**Netlify:** Add in Site Settings → Environment Variables
**Vercel:** Add in Project Settings → Environment Variables
**GitHub Pages:** Not supported (client-side only)

---

## Build & Test

### Test Production Build Locally
```bash
# Build
npm run build

# Serve locally (install serve globally)
npm install -g serve
serve -s build -p 3000
```

Visit http://localhost:3000 to test production build

---

## Monitoring & Analytics

### Error Tracking (Sentry)
Already configured! Just add DSN:
1. Sign up at https://sentry.io
2. Create project
3. Add DSN to `.env`:
```bash
REACT_APP_SENTRY_DSN=your-dsn-here
```

### Analytics Options
- Google Analytics (free)
- Plausible (privacy-focused)
- Netlify Analytics (built-in, paid)
- Vercel Analytics (built-in)

---

## Recommended Hosting Choice

### For Your Site: **Netlify** or **Vercel** (Recommended)

**Why not stick with GitHub Pages?**
- ❌ No custom redirect rules
- ❌ No environment variables
- ❌ No serverless functions (if needed later)
- ❌ No form handling
- ✅ But it's free and simple!

**Netlify Advantages:**
- ✅ Free tier: 100GB bandwidth, 300 build minutes
- ✅ Form handling (useful for contact form)
- ✅ Serverless functions
- ✅ Split testing
- ✅ Better for teams

**Vercel Advantages:**
- ✅ Superior edge network performance
- ✅ Better for Next.js (if you migrate)
- ✅ Excellent DX (developer experience)
- ✅ Built-in analytics

---

## Quick Start: Deploy Now!

### Keep GitHub Pages (Current)
```bash
npm run deploy
```

### Try Netlify (Recommended)
1. Push code to GitHub
2. Visit https://app.netlify.com
3. Import repository
4. Done! ✨

### Try Vercel (Alternative)
1. Visit https://vercel.com
2. Import repository
3. Done! ✨

---

## Support

### Issues?
- Check browser console for errors
- Verify all environment variables set
- Test production build locally first
- Check deployment logs in platform dashboard

### Need Help?
- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
- GitHub Pages: https://docs.github.com/en/pages

---

**Last Updated:** October 7, 2025
**Status:** ✅ Production Ready
