# Update PWA Icons - Nebula Dev Logo

## Current Status
The SVG icon has been updated to use `nebula-dev-icon.svg` (the new Nebula Dev logo).

## To-Do: Create High-Quality PNG Icons

For the best PWA and iOS home screen experience, we need to create PNG versions of the new logo:

### Required PNG Files:
1. **nebula-dev-icon-192.png** - 192x192 pixels
2. **nebula-dev-icon-512.png** - 512x512 pixels

### How to Create Them:

#### Option 1: Using Online Converter
1. Go to https://cloudconvert.com/svg-to-png
2. Upload `public/nebula-dev-icon.svg`
3. Set dimensions to:
   - First conversion: 192x192 → Save as `nebula-dev-icon-192.png`
   - Second conversion: 512x512 → Save as `nebula-dev-icon-512.png`
4. Place both files in the `public/` folder

#### Option 2: Using Figma/Adobe Illustrator
1. Open `nebula-dev-icon.svg`
2. Export as PNG:
   - 192x192 @ 2x resolution (384x384 actual)
   - 512x512 @ 2x resolution (1024x1024 actual)
3. Save both files in the `public/` folder

#### Option 3: Using ImageMagick (Command Line)
```bash
# Install ImageMagick first
# Then run:
magick convert -density 300 -resize 192x192 public/nebula-dev-icon.svg public/nebula-dev-icon-192.png
magick convert -density 300 -resize 512x512 public/nebula-dev-icon.svg public/nebula-dev-icon-512.png
```

## Notes
- Current PNG files may be using old logo
- SVG will work but PNG provides better iOS compatibility
- After creating new PNGs, rebuild: `npm run build`
- Then redeploy: `npm run deploy`
- Clear browser cache and re-add to home screen to see new logo

## Verification
After updating:
1. Build the app: `npm run build`
2. Deploy: `npm run deploy`
3. On iPhone:
   - Remove old app from home screen
   - Clear Safari cache
   - Visit the site
   - Add to home screen
   - New logo should appear!
