# 🚀 HostPapa Deployment Guide

## Prerequisites Checklist

✅ **Website Status:** Production Ready  
✅ **HostPapa Account:** Active hosting plan  
✅ **Domain:** Registered (can use HostPapa's free domain or your own)  
✅ **Build Files:** Ready to upload  

---

## Step 1: Build Your Website

Open PowerShell in your project directory and run:

```powershell
npm run build
```

This creates a production-optimized `build` folder with all your website files.

**What happens:**
- React code is compiled and optimized
- Files are minified for faster loading
- Assets are bundled efficiently
- Total build size: ~2-5 MB

---

## Step 2: Prepare Files for Upload

### A. Create a ZIP file (Recommended)

**Option 1 - PowerShell:**
```powershell
# Navigate to build folder
cd build

# Create ZIP file
Compress-Archive -Path * -DestinationPath ..\neb-media-build.zip

# Go back to project root
cd ..
```

**Option 2 - Windows Explorer:**
1. Open the `build` folder
2. Select all files (Ctrl + A)
3. Right-click → Send to → Compressed (zipped) folder
4. Name it `neb-media-build.zip`

### B. Files to Upload

Your `build` folder contains:
```
build/
├── index.html          ← Main entry point
├── .htaccess          ← Apache configuration (IMPORTANT!)
├── favicon.ico
├── manifest.json
├── robots.txt
├── sitemap.xml
├── static/
│   ├── css/           ← Stylesheets
│   ├── js/            ← JavaScript bundles
│   └── media/         ← Images, icons
└── icons/             ← SVG icons
```

---

## Step 3: Access HostPapa cPanel

1. **Login to HostPapa:**
   - Go to https://www.hostpapa.com
   - Click "Login" → "My HostPapa"
   - Enter your credentials

2. **Access cPanel:**
   - Click "cPanel" or "Manage Hosting"
   - You'll see the cPanel dashboard

3. **Locate File Manager:**
   - Scroll to "Files" section
   - Click "File Manager"

---

## Step 4: Upload Your Website

### Method A: Using cPanel File Manager (Recommended)

1. **Navigate to public_html:**
   - In File Manager, double-click `public_html` folder
   - This is your website's root directory

2. **Clear existing files (if any):**
   - Select all files in `public_html` (Ctrl + A)
   - Click "Delete" button
   - Confirm deletion

3. **Upload ZIP file:**
   - Click "Upload" button at the top
   - Click "Select File"
   - Choose `neb-media-build.zip`
   - Wait for upload to complete (should be quick)
   - Close the upload dialog

4. **Extract ZIP file:**
   - Go back to File Manager
   - Right-click `neb-media-build.zip`
   - Click "Extract"
   - Select "Extract to current directory"
   - Click "Extract File(s)"
   - Delete the ZIP file after extraction

### Method B: Using FTP (Alternative)

1. **Get FTP credentials from HostPapa:**
   - In cPanel, go to "FTP Accounts"
   - Note your FTP hostname, username, password

2. **Use FileZilla or WinSCP:**
   - Download FileZilla: https://filezilla-project.org/
   - Host: Your HostPapa FTP hostname
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21

3. **Upload files:**
   - Navigate to `/public_html` on remote side
   - Upload all files from your `build` folder
   - Ensure `.htaccess` is uploaded (it's hidden by default)

---

## Step 5: Verify .htaccess File

**CRITICAL:** The `.htaccess` file enables your React app to work correctly.

1. **Check if .htaccess is visible:**
   - In File Manager, click "Settings" (top right)
   - Check "Show Hidden Files (dotfiles)"
   - Click "Save"

2. **Verify .htaccess exists:**
   - Look for `.htaccess` in `public_html`
   - If missing, upload it manually from `build/.htaccess`

3. **Check .htaccess permissions:**
   - Right-click `.htaccess`
   - Click "Change Permissions"
   - Set to `644` (Owner: Read/Write, Group: Read, World: Read)
   - Click "Change Permissions"

---

## Step 6: Configure Domain

### Option A: Using HostPapa's Free Domain

If you got a free domain with HostPapa:
1. Your site will be live at: `https://yourdomain.com`
2. Wait 15-30 minutes for DNS propagation
3. Test your site in a browser

### Option B: Using Your Own Domain

1. **Point domain to HostPapa:**
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Update nameservers to HostPapa's:
     ```
     ns1.hostpapa.com
     ns2.hostpapa.com
     ```

2. **Add domain in cPanel:**
   - Go to cPanel → "Domains"
   - Click "Create a New Domain"
   - Enter your domain name
   - Set document root to `public_html`
   - Click "Submit"

3. **Wait for DNS propagation:**
   - Can take 4-48 hours
   - Check status: https://www.whatsmydns.net/

### Option C: Using Subdomain

1. **Create subdomain:**
   - cPanel → "Domains" → "Create a New Domain"
   - Enter: `app.yourdomain.com` (or any subdomain)
   - Document root: `public_html`
   - Click "Submit"

---

## Step 7: Enable SSL (HTTPS)

**HostPapa offers FREE SSL certificates!**

1. **Install SSL via cPanel:**
   - Go to cPanel → "Security" section
   - Click "SSL/TLS Status"
   - Find your domain
   - Click "Run AutoSSL"
   - Wait 1-2 minutes for installation

2. **Force HTTPS redirect:**
   - Edit `.htaccess` in File Manager
   - Uncomment these lines (remove the `#`):
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```
   - Save file
   - Now all HTTP traffic redirects to HTTPS

---

## Step 8: Test Your Website

### Basic Tests

1. **Visit your domain:**
   - Open browser
   - Go to `https://yourdomain.com`
   - Should see your homepage

2. **Test navigation:**
   - Click "Dashboard"
   - Click "Our Work"
   - Click "Contact"
   - All pages should load without errors

3. **Test direct URLs:**
   - Visit `https://yourdomain.com/our-work`
   - Visit `https://yourdomain.com/contact`
   - Should load correctly (not 404)

4. **Test dark mode:**
   - Toggle theme switcher
   - Check all pages in both modes

### Advanced Tests

1. **Mobile responsiveness:**
   - Open on phone/tablet
   - Test all features

2. **Performance:**
   - Visit https://pagespeed.web.dev/
   - Test your domain
   - Should score 90+

3. **Security headers:**
   - Visit https://securityheaders.com/
   - Test your domain
   - Check for A rating

---

## Step 9: Post-Deployment Setup

### A. Setup Email (Optional)

1. **Create email accounts:**
   - cPanel → "Email Accounts"
   - Create: `info@yourdomain.com`
   - Create: `contact@yourdomain.com`

2. **Update contact form:**
   - Point form submissions to your new email
   - Configure in your domain settings

### B. Setup Analytics

1. **Google Analytics:**
   - Create account at https://analytics.google.com/
   - Get tracking ID
   - Add to your `.env` file and rebuild

2. **Update .env:**
   ```env
   REACT_APP_ANALYTICS_ENABLED=true
   REACT_APP_GA_TRACKING_ID=your-tracking-id
   ```

### C. Monitor Performance

1. **Setup Google Search Console:**
   - Go to https://search.google.com/search-console
   - Add your domain
   - Verify ownership
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`

2. **Monitor Uptime:**
   - UptimeRobot (free): https://uptimerobot.com/
   - Add your domain for monitoring

---

## Common Issues & Solutions

### Issue 1: 404 Error on Page Refresh

**Problem:** Clicking links works, but refreshing gives 404.

**Solution:**
- Check `.htaccess` exists in `public_html`
- Verify `.htaccess` has correct rewrite rules
- Check Apache `mod_rewrite` is enabled (contact HostPapa if needed)

### Issue 2: Blank White Page

**Problem:** Website shows blank white page.

**Solution:**
1. Check browser console for errors (F12)
2. Verify `homepage` in `package.json` is set to `"."`
3. Rebuild: `npm run build`
4. Re-upload all files

### Issue 3: Images/CSS Not Loading

**Problem:** Page loads but styles/images missing.

**Solution:**
1. Check paths are relative (not absolute)
2. Verify `static` folder uploaded correctly
3. Check file permissions (644 for files, 755 for folders)

### Issue 4: SSL Not Working

**Problem:** HTTPS shows security warning.

**Solution:**
1. Wait 15-30 minutes after SSL installation
2. Clear browser cache
3. Check SSL status in cPanel
4. Contact HostPapa support if persists

### Issue 5: Slow Loading

**Problem:** Website loads slowly.

**Solution:**
1. Verify `.htaccess` compression is enabled
2. Check caching headers are working
3. Optimize images before upload
4. Consider HostPapa's CDN (if available)

---

## HostPapa-Specific Tips

### Performance Optimization

1. **Enable caching:**
   - Already configured in `.htaccess`
   - HostPapa automatically caches static files

2. **Use PHP version 8.x:**
   - cPanel → "MultiPHP Manager"
   - Select latest PHP version
   - Click "Apply"

3. **Check resource usage:**
   - cPanel → "Resource Usage"
   - Monitor CPU/Memory
   - Upgrade plan if needed

### Security Best Practices

1. **Enable ModSecurity:**
   - cPanel → "ModSecurity"
   - Turn on for your domain

2. **Setup backups:**
   - cPanel → "Backup Wizard"
   - Schedule weekly backups
   - Download backups monthly

3. **Update regularly:**
   - Rebuild and re-upload when updating React app
   - Keep dependencies updated

### Customer Support

HostPapa offers 24/7 support:
- **Phone:** 1-800-894-4678
- **Live Chat:** Available in cPanel
- **Tickets:** Submit via customer portal
- **Knowledge Base:** https://hostpapa.com/knowledgebase/

---

## Quick Reference Commands

```powershell
# Build production files
npm run build

# Create ZIP for upload
cd build
Compress-Archive -Path * -DestinationPath ..\neb-media-build.zip
cd ..

# Test build locally before upload
npx serve -s build
# Visit: http://localhost:3000
```

---

## Deployment Checklist

Before going live:

- [ ] Run `npm run build` successfully
- [ ] Verify all files in `build` folder
- [ ] Upload all files to `public_html`
- [ ] Verify `.htaccess` uploaded correctly
- [ ] Configure domain/subdomain
- [ ] Install SSL certificate
- [ ] Enable HTTPS redirect
- [ ] Test all pages and navigation
- [ ] Test on mobile devices
- [ ] Verify dark mode works
- [ ] Submit sitemap to Google
- [ ] Setup email accounts
- [ ] Configure analytics (optional)
- [ ] Setup monitoring (optional)

---

## Expected Timeline

- **Build:** 2-3 minutes
- **Upload:** 5-10 minutes
- **SSL Setup:** 5 minutes
- **DNS Propagation:** 15 minutes - 48 hours
- **Total:** 30 minutes (if domain already pointed)

---

## Need Help?

1. **HostPapa Documentation:**
   - https://hostpapa.com/knowledgebase/

2. **React Deployment Issues:**
   - Check `DEPLOYMENT.md` in project root
   - Review Create React App docs

3. **Contact Support:**
   - HostPapa: 24/7 phone/chat support
   - GitHub Issues: Post in your repository

---

**Last Updated:** October 8, 2025  
**Status:** ✅ Ready for HostPapa Deployment  
**Estimated Setup Time:** 30 minutes
