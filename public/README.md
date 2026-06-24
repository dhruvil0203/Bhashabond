# Screenshots for GitHub README

This folder contains app screenshots displayed in the main README.md file.

## Required Screenshots

Add these 6 screenshots to display in the README:

1. **home.jpg** - Home screen with language selection
2. **translator.jpg** - Translation screen in action  
3. **phrasebook.jpg** - Phrasebook tab overview
4. **food.jpg** - Local food discovery cards
5. **emergency.jpg** - Emergency numbers screen
6. **profile.jpg** - Profile/settings screen

## How to Take Screenshots

### Android Device:
1. Open app: `npm run android`
2. Navigate to each screen
3. Take screenshot: **Power + Volume Down**
4. Transfer screenshots to computer

### Android Emulator:
1. Open emulator: `npm run android`
2. Navigate to each screen
3. Take screenshot: Click **📷 camera icon** in emulator toolbar

### iOS Device:
1. Open app: `npm run ios`
2. Navigate to each screen
3. Take screenshot: **Side Button + Volume Up**

### iOS Simulator:
1. Open simulator: `npm run ios`
2. Navigate to each screen
3. Take screenshot: **Cmd + S**

## Image Requirements

- **Format**: JPG (for smaller file size) or PNG
- **Orientation**: Portrait (phone screen)
- **Size**: Recommended < 300KB per image
- **Quality**: Clear and readable

## Adding Screenshots to GitHub

1. Take 6 screenshots using steps above
2. Rename files exactly as:
   - `home.jpg`
   - `translator.jpg`
   - `phrasebook.jpg`
   - `food.jpg`
   - `emergency.jpg`
   - `profile.jpg`

3. Copy files to this `public/` folder

4. Commit and push:
```bash
git add public/*.jpg
git commit -m "docs: Add app screenshots"
git push origin main
```

5. Check your GitHub repo - images will display automatically!

## Tips for Great Screenshots

✅ **DO:**
- Use light mode for better visibility
- Show actual translations (not empty screens)
- Capture key features
- Keep UI clean and uncluttered

❌ **DON'T:**
- Include personal data
- Show error states
- Use blurry images

## Current Status

The README is configured to display images from:
```
public/home.jpg
public/translator.jpg
public/phrasebook.jpg
public/food.jpg
public/emergency.jpg
public/profile.jpg
```

Once you add these files, they'll appear in a 2-row grid on your GitHub README! 🎉
