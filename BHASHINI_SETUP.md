# Bhashini API Integration Setup

## Overview
BhashaBond now uses **Bhashini API** (India's government AI platform) for dynamic translation when phrases aren't in the offline dictionary.

## Features
- ✅ **Offline-first**: Dictionary phrases work without internet
- ✅ **Dynamic fallback**: Any text translates via Bhashini API
- ✅ **22 Indian languages**: Full support for all scheduled languages
- ✅ **Free tier**: Government-provided API access

---

## Setup Instructions

### Step 1: Get Bhashini API Credentials

1. Visit: https://bhashini.gov.in/ulca/user/register
2. Register/Login with your email
3. Go to **Profile** → **API Keys**
4. Copy your:
   - **User ID** (ulca-user-id)
   - **API Key** (ulca-api-key)

### Step 2: Configure Backend

1. Create `.env` file in `backend/` folder (if not exists):
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Add your Bhashini credentials to `.env`:
   ```env
   BHASHINI_USER_ID=your-user-id-here
   BHASHINI_API_KEY=your-api-key-here
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

### Step 3: Update Frontend API URL

1. Open `services/translator.js`
2. Find this line (around line 66):
   ```javascript
   const API_BASE = 'http://localhost:8000';
   ```
3. **For development**: Keep as is
4. **For production**: Change to your Railway backend URL:
   ```javascript
   const API_BASE = 'https://your-app.up.railway.app';
   ```

### Step 4: Test Translation

1. Start Expo app:
   ```bash
   npm start
   ```

2. Try translating:
   - **Dictionary phrase** (e.g., "hello"): Works offline ⚡
   - **Custom text** (e.g., "I love coding"): Uses Bhashini API 🌐

---

## How It Works

```
User enters text
      ↓
Try offline dictionary
      ↓
   Found? → Return immediately (offline)
      ↓
   Not found? → Call Bhashini API (requires internet)
      ↓
Return translated text
```

---

## Production Deployment

### Railway Backend

1. Push backend to Railway
2. Add environment variables in Railway dashboard:
   - `BHASHINI_USER_ID`
   - `BHASHINI_API_KEY`
3. Note your Railway URL: `https://your-app.up.railway.app`

### Update Mobile App

Update `API_BASE` in `services/translator.js` to your Railway URL.

---

## API Limits

**Bhashini Free Tier:**
- **Rate limit**: 10 requests/minute
- **Daily limit**: 100 requests/day
- **Character limit**: 500 characters per request

For production apps with high traffic, consider:
1. Caching translations in AsyncStorage
2. Expanding offline dictionary
3. Requesting higher API limits from Bhashini

---

## Troubleshooting

### "Bhashini API not configured"
- Check `.env` file has correct credentials
- Restart backend after adding credentials

### "Network error" / Timeout
- Check internet connection
- Verify backend is running
- Check `API_BASE` URL is correct

### "API_ERROR" / 429 Rate Limit
- You've exceeded API limits
- Wait 1 minute and try again
- Consider expanding offline dictionary

---

## Supported Language Pairs

All 22 scheduled Indian languages + English:
- Hindi, Bengali, Telugu, Marathi, Tamil
- Gujarati, Kannada, Malayalam, Punjabi, Odia
- Assamese, Maithili, Urdu, Sindhi, Konkani
- Nepali, Manipuri, Bodo, Sanskrit, Kashmiri
- Dogri, Santali, English

**Any ↔ Any translation supported!**

