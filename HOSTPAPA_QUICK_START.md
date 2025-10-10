# 🚀 HostPapa Quick Start (10 Minutes)

## What You Need
- ✅ HostPapa account with active hosting
- ✅ Your domain name (or use HostPapa's free domain)
- ✅ This project on your computer

---

## Step 1: Build (2 minutes)

```powershell
# In your project folder
npm run build
```

**Creates:** `build` folder with your website

---

## Step 2: Create ZIP (1 minute)

```powershell
cd build
Compress-Archive -Path * -DestinationPath ..\neb-media.zip
cd ..
```

**Creates:** `neb-media.zip` ready to upload

---

## Step 3: Upload to HostPapa (5 minutes)

1. **Login:** https://www.hostpapa.com → My HostPapa → cPanel
2. **File Manager:** Click "File Manager" under Files
3. **Go to public_html:** Double-click `public_html` folder
4. **Clear old files:** Select all → Delete
5. **Upload:** Click Upload → Select `neb-media.zip` → Wait
6. **Extract:** Right-click ZIP → Extract → Confirm
7. **Delete ZIP:** Delete the ZIP file

---

## Step 4: Enable SSL (2 minutes)

1. **cPanel:** Security → SSL/TLS Status
2. **Run AutoSSL:** Click "Run AutoSSL" next to your domain
3. **Wait:** 1-2 minutes for installation

---

## Step 5: Force HTTPS (1 minute)

1. **Edit .htaccess:** File Manager → Find `.htaccess`
   - Click Settings (top right) → Check "Show Hidden Files" if not visible
2. **Edit file:** Right-click `.htaccess` → Edit
3. **Uncomment these lines** (remove the `#`):
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```
4. **Save:** Click Save Changes

---

## Step 6: Test! ✅

Visit: `https://yourdomain.com`

**Check:**
- ✅ Homepage loads
- ✅ Click Dashboard → works
- ✅ Click Our Work → works
- ✅ Click Contact → works
- ✅ Refresh page → still works (no 404)
- ✅ Dark mode toggle → works

---

## Done! 🎉

Your website is now live on HostPapa!

**Next Steps (Optional):**
- Setup email: cPanel → Email Accounts
- Add Google Analytics: See `HOSTPAPA_DEPLOYMENT.md`
- Submit to Google: https://search.google.com/search-console

---

## Troubleshooting

**Blank page?**
- Check browser console (F12)
- Verify all files uploaded

**404 on refresh?**
- Check `.htaccess` exists
- Verify Settings → Show Hidden Files is ON

**Slow loading?**
- Wait 5 minutes for cache to warm up
- Clear browser cache

**Still stuck?**
- See full guide: `HOSTPAPA_DEPLOYMENT.md`
- Contact HostPapa support: 1-800-894-4678

---

**Total Time:** 10-15 minutes  
**Difficulty:** Easy ⭐⭐☆☆☆
