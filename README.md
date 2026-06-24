# BhashaBond 🌍

A React Native offline-first translation app supporting 23 Indian languages + English with smart offline capabilities and Google Translate API integration.

## Screenshots

<div align="center">
  <img src="assets/screenshots/home.png" alt="Home Screen" width="250"/>
  <img src="assets/screenshots/translator.png" alt="Translator" width="250"/>
  <img src="assets/screenshots/phrasebook.png" alt="Phrasebook" width="250"/>
</div>

<div align="center">
  <img src="assets/screenshots/greetings.png" alt="Festival Greetings" width="250"/>
  <img src="assets/screenshots/food.png" alt="Local Food Guide" width="250"/>
  <img src="assets/screenshots/emergency.png" alt="Emergency Numbers" width="250"/>
</div>

> **Note**: Add your app screenshots to `assets/screenshots/` directory

## Features

✨ **Offline Translation**
- 40+ common travel phrases work instantly without internet
- Pivot translation: Translate between Indian languages offline (e.g., Gujarati → Bengali via English)
- Perfect for travelers and offline scenarios

🌐 **Dynamic Translation**
- Any phrase, any language pair via Google Translate API
- Smart caching for better performance
- Support for all 23 scheduled Indian languages

💾 **Smart Features**
- Persistent translation cache
- Save favorite translations to phrasebook
- Romanization for non-Latin scripts
- Speech-to-text input support
- Text-to-speech output

## Supported Languages

English, Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, Maithili, Urdu, Sindhi, Konkani, Nepali, Manipuri, Bodo, Sanskrit, Kashmiri, Dogri, Santali

## Architecture

```
React Native App (Expo)
    ↓
Translation Service
    ├── Offline Dictionary (40+ phrases)
    ├── Pivot Translation (Indian ↔ Indian via English)
    ├── Local Cache (Previously translated)
    └── Backend API (FastAPI on Render)
            ↓
        Google Translate API
```

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Android Studio (for Android builds) or Xcode (for iOS builds)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/BhashaBond.git
cd BhashaBond
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your credentials
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
EXPO_PUBLIC_API_URL=https://bhashabond-api.onrender.com
```

4. **Start the development server**
```bash
npm start
```

5. **Run on device/emulator**
```bash
# Android
npm run android

# iOS
npm run ios
```

## Backend Setup

The backend is deployed on Render at `https://bhashabond-api.onrender.com`

To deploy your own instance:

1. **Setup backend locally**
```bash
cd backend
pip install -r requirements.txt
```

2. **Configure environment**
```bash
# Create backend/.env
GOOGLE_TRANSLATE_API_KEY=your_google_api_key  # Optional
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_key
```

3. **Run backend locally**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

4. **Deploy to Render**
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`
   - Set environment variables in Render dashboard
   - Deploy!

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

## Building APK for Distribution

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build APK
eas build --platform android --profile preview

# Download and share the APK
```

## Project Structure

```
BhashaBond/
├── screens/          # React Native screens
│   ├── TranslatorScreen.js
│   ├── PhrasebookScreen.js
│   └── ...
├── services/         # Core services
│   ├── translator.js    # Translation logic with offline support
│   ├── cache.js         # Persistent caching
│   └── romanizer.js     # Script romanization
├── backend/          # FastAPI backend
│   ├── main.py
│   ├── routers/
│   │   ├── translate.py  # Translation endpoint
│   │   └── ...
│   └── requirements.txt
├── assets/           # App assets
└── ...
```

## How Translation Works

### 1. Offline Dictionary
- 40+ common phrases stored locally
- Instant translation without internet
- Works for all supported languages

### 2. Pivot Translation (NEW!)
- Translates between Indian languages offline
- Example: Gujarati → English → Bengali
- Uses offline dictionary as intermediary

### 3. Dynamic Translation
- For non-dictionary phrases
- Routes through backend API to Google Translate
- Automatically caches results for offline reuse

### 4. Smart Caching
- Stores all translations locally
- Reduces API calls and costs
- Works offline after first translation

## Configuration

### App Configuration

**`.env`**
```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
EXPO_PUBLIC_API_URL=https://your-backend-url.com
```

### Backend Configuration

**`backend/.env`**
```bash
# Optional: For better reliability and higher quotas
GOOGLE_TRANSLATE_API_KEY=your_google_api_key

# For user data sync
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_key
```

## Performance

- **Offline translations**: < 100ms
- **Pivot translations**: < 200ms  
- **Online translations**: 2-3 seconds (after backend warmup)
- **Cold start** (Render free tier): 30-60 seconds (first request only)

## Cost Estimation

### Free Tier
- Render: Free (with 15min cold start)
- Google Translate: Free unofficial endpoint
- **Total: $0/month**

### Recommended for Production
- Render: $7/month (always-on, no cold starts)
- Google Translate API: ~$20/month for moderate use
- **Total: ~$27/month for 100+ users**

## Development

### Running Tests
```bash
npm test
```

### Code Style
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Translate API for translation services
- Expo for the amazing React Native framework
- Render for free backend hosting
- Supabase for database services

## Support

For issues and questions:
- Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for setup help
- Open an issue on GitHub
- Check backend health: https://bhashabond-api.onrender.com/api/health

## Roadmap

- [ ] Add IndicTrans2 ML model for true offline translation
- [ ] Implement offline language packs
- [ ] Add community-contributed phrases
- [ ] Support for more languages
- [ ] Progressive Web App version
- [ ] iOS version optimization

---

**Made with ❤️ for breaking language barriers in India**
