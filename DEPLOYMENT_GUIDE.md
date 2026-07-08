# BhashaBond - Deployment Guide

Quick guide to deploy and distribute BhashaBond app to users.

## Overview

The app consists of:
1. **React Native App** (Expo) - Frontend
2. **FastAPI Backend** (Python) - Deployed on Render
3. **Google Translate API** - Translation service

## Quick Deployment

### 1. Backend Setup (Already Deployed)

Backend URL: `https://bhashabond-api.onrender.com`

Verify it's working:
```bash
curl https://bhashabond-api.onrender.com/api/health
# Should return: {"status":"healthy","service":"bhashabond-api"}
```

### 2. Configure App

Edit `.env`:
```bash
EXPO_PUBLIC_API_URL=https://bhashabond-api.onrender.com
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

### 3. Test Locally

```bash
npm start -- --clear
npm run android  # or press 'a' in terminal
```

Test translations:
- ✅ English "hello" → Hindi (instant, offline)
- ✅ Gujarati "નમસ્તે" → Bengali (instant, pivot translation)
- ✅ Complex phrases (2-3 seconds via backend)

### 4. Build APK

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

Wait ~10-15 minutes, download APK from link.

### 5. Test & Share

1. Install APK on your device
2. Test all features
3. Upload to Google Drive/Dropbox
4. Share link with users

## Backend Configuration (Render)

### Environment Variables

Set these in Render Dashboard:

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_TRANSLATE_API_KEY` | Optional | Google Cloud Translation API key (better reliability) |

### Without API Key
Backend automatically uses free Google Translate endpoint (less reliable but unlimited).

### With API Key
Get from https://console.cloud.google.com:
1. Enable "Cloud Translation API"
2. Create API Key
3. Add to Render environment variables

## Building APK

### EAS Build Configuration

**`eas.json`**:
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

### Build Commands

```bash
# Preview APK (for testing/distribution)
eas build --platform android --profile preview

# Production build (for Play Store)
eas build --platform android --profile production
```

## User Installation Guide

Share this with your users:

---

### 📱 BhashaBond Installation

1. **Download APK** from the shared link

2. **Enable Unknown Sources**:
   - Settings → Security → Install unknown apps
   - Select your browser → Allow

3. **Install**: Open APK file and tap "Install"

4. **Use**: Open app and start translating!

**Features:**
- ✅ 40+ phrases work offline
- ✅ 23 Indian languages supported
- ✅ Internet needed for complex phrases only

---

## Troubleshooting

### "Translation failed" error

**Check:**
1. Backend running: https://bhashabond-api.onrender.com/api/health
2. User has internet connection
3. Try common phrase first (hello, thank you)

**Note:** First request after 15min may take 30-60 seconds (Render free tier waking up)

### APK won't install

- Enable "Unknown Sources" in Android settings
- Check device storage space
- Try redownloading APK

### Slow translations

- First translation: 30-60 seconds (backend waking up)
- Subsequent: 2-3 seconds (normal)
- Upgrade Render to $7/month for always-on service

## Updating the App

1. Update version in `app.json`:
```json
{
  "expo": {
    "version": "1.0.1",
    "android": {
      "versionCode": 2
    }
  }
}
```

2. Rebuild APK
3. Share new version with users
4. Users install over old version

## Cost Estimation

### Free Tier (Current)
- Render: $0/month (with cold starts)
- Google API: $0/month (free endpoint)
- **Total: $0/month**

### Recommended (100+ users)
- Render: $7/month (always-on)
- Google API: $20/month
- **Total: $27/month**

## Performance Tips

1. **Offline Dictionary**: Add more common phrases to reduce API calls
2. **Caching**: Already implemented, reduces repeated translations
3. **Pivot Translation**: Enabled, reduces API dependency
4. **Keep-Alive**: Use cron-job.org to ping backend every 10 minutes (prevents cold starts)

## Monitoring

### Backend Health
```bash
curl https://bhashabond-api.onrender.com/api/health
```

### View Logs
Render Dashboard → Your Service → Logs tab

### Check Usage
Google Cloud Console → APIs & Services → Quotas

## Support

- Backend health check: https://bhashabond-api.onrender.com/api/health
- GitHub issues: [your-repo-url]
- Check logs: Render Dashboard or `npx react-native log-android`

## Next Steps

- [ ] Test APK on multiple devices
- [ ] Set up analytics (Firebase/Sentry)
- [ ] Add crash reporting
- [ ] Prepare for Play Store (optional)
- [ ] Set up automated builds (CI/CD)

---

**Backend**: https://bhashabond-api.onrender.com
**Status**: ✅ Live and ready for production
