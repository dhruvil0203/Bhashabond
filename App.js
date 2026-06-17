import "./global.css";
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ClerkProvider, ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from '@clerk/clerk-expo';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import { getColors } from './theme/colors';
import { tokenCache } from './lib/tokenCache';

import HomeScreen from './screens/HomeScreen';
import LanguagePickerScreen from './screens/LanguagePickerScreen';
import TranslatorScreen from './screens/TranslatorScreen';
import PhrasebookScreen from './screens/PhrasebookScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignInScreen from './screens/SignInScreen';

function AppContent() {
  const [currentTab, setCurrentTab] = useState('Home');
  const [selectedSourceLang, setSelectedSourceLang] = useState('English');
  const [selectedTargetLang, setSelectedTargetLang] = useState('Select City / Language');
  const [selectedCity, setSelectedCity] = useState(null);
  const [isLanguagePickerOpen, setIsLanguagePickerOpen] = useState(false);
  const [pickerType, setPickerType] = useState('source');
  const [translationSource, setTranslationSource] = useState('');

  const { isDark } = useTheme();
  const c = getColors(isDark);

  const handleOpenLanguagePicker = (type) => {
    setPickerType(type);
    setIsLanguagePickerOpen(true);
  };

  const handleSelectLanguage = (language, city = null) => {
    if (pickerType === 'source') {
      setSelectedSourceLang(language);
    } else {
      setSelectedTargetLang(language);
      if (city) {
        setSelectedCity(city);
      } else {
        const defaultCities = {
          'Marathi': 'Mumbai',
          'Hindi': 'Delhi',
          'Kannada': 'Bengaluru',
          'Tamil': 'Chennai',
          'Bengali': 'Kolkata',
          'Telugu': 'Hyderabad',
          'Gujarati': 'Ahmedabad',
          'Malayalam': 'Kochi',
          'Punjabi': 'Chandigarh',
          'Odia': 'Bhubaneswar',
          'Assamese': 'Guwahati',
          'Sanskrit': 'Varanasi',
        };
        setSelectedCity(defaultCities[language] || null);
      }
    }
  };

  const handleStartTranslation = (initialText = '') => {
    setTranslationSource(initialText);
    setCurrentTab('Translate');
  };

  const handleSwapLanguages = () => {
    const prevSource = selectedSourceLang;
    const prevTarget = selectedTargetLang;
    setSelectedSourceLang(prevTarget === 'Select City / Language' ? 'English' : prevTarget);
    setSelectedTargetLang(prevSource);
  };

  // Language picker overlay
  if (isLanguagePickerOpen) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }}>
          <StatusBar barStyle={c.statusBar} backgroundColor={c.bg} />
          <LanguagePickerScreen
            initialSelectedLanguage={pickerType === 'source' ? selectedSourceLang : selectedTargetLang}
            onSelectLanguage={handleSelectLanguage}
            onClose={() => setIsLanguagePickerOpen(false)}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const renderScreen = () => {
    switch (currentTab) {
      case 'Home':
        return (
          <HomeScreen
            selectedSourceLang={selectedSourceLang}
            selectedTargetLang={selectedTargetLang}
            onOpenLanguagePicker={handleOpenLanguagePicker}
            onPressMic={() => handleStartTranslation()}
          />
        );
      case 'Phrasebook':
        return (
          <PhrasebookScreen
            sourceLang={selectedSourceLang}
            targetLang={selectedTargetLang}
            selectedCity={selectedCity}
          />
        );
      case 'Translate':
        return (
          <TranslatorScreen
            sourceLang={selectedSourceLang}
            targetLang={selectedTargetLang}
            initialText={translationSource}
            onBack={() => setCurrentTab('Home')}
            onSwapLanguages={handleSwapLanguages}
          />
        );
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }}>
        <StatusBar barStyle={c.statusBar} backgroundColor={c.bg} />
        <View style={{ flex: 1 }}>
          {renderScreen()}
        </View>

        {/* Bottom Navigation */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: c.navBg,
          borderTopWidth: 1,
          borderTopColor: c.navBorder,
          paddingTop: 8,
          paddingBottom: 20,
          paddingHorizontal: 24,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {[
            { tab: 'Home', icon: 'home' },
            { tab: 'Phrasebook', icon: 'book' },
            { tab: 'Translate', icon: 'language' },
            { tab: 'Profile', icon: 'person' },
          ].map(({ tab, icon }) => {
            const isActive = currentTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setCurrentTab(tab)}
                activeOpacity={0.8}
                style={{ alignItems: 'center', flex: 1, justifyContent: 'center', paddingVertical: 4 }}
              >
                <Ionicons
                  name={isActive ? icon : `${icon}-outline`}
                  size={24}
                  color={isActive ? '#F97316' : c.textMuted}
                />
                <Text style={{
                  fontSize: 12,
                  marginTop: 4,
                  color: isActive ? '#F97316' : c.textSecondary,
                  fontWeight: isActive ? 'bold' : '500',
                }}>
                  {tab}
                </Text>
                {isActive && (
                  <View style={{ width: 6, height: 6, backgroundColor: '#F97316', borderRadius: 3, marginTop: 4 }} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <AuthGate />
      </ClerkProvider>
    </ThemeProvider>
  );
}

// Branded full-screen loader shown while Clerk restores the cached session.
function AuthLoading() {
  const { isDark } = useTheme();
  const c = getColors(isDark);
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: c.bg, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar barStyle={c.statusBar} backgroundColor={c.bg} />
        <Text style={{ fontSize: 28, fontWeight: '900', color: c.textPrimary, letterSpacing: -0.5, marginBottom: 16 }}>
          BhaashaBond
        </Text>
        <ActivityIndicator size="large" color="#F97316" />
      </View>
    </SafeAreaProvider>
  );
}

// Gates the app: loading → spinner, signed out → sign in, signed in → app.
function AuthGate() {
  return (
    <>
      <ClerkLoading>
        <AuthLoading />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <AppContent />
        </SignedIn>
        <SignedOut>
          <SafeAreaProvider>
            <SignInGate />
          </SafeAreaProvider>
        </SignedOut>
      </ClerkLoaded>
    </>
  );
}

// Wraps SignInScreen in a themed SafeAreaView + status bar.
function SignInGate() {
  const { isDark } = useTheme();
  const c = getColors(isDark);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }}>
      <StatusBar barStyle={c.statusBar} backgroundColor={c.bg} />
      <SignInScreen />
    </SafeAreaView>
  );
}
