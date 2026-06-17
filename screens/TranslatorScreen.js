import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, ScrollView,
  ToastAndroid, Platform, Alert, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useTheme } from '../context/ThemeContext';
import { getColors } from '../theme/colors';
import { translate, getQuickPhrasesForLang } from '../services/translator';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TranslatorScreen({
  onBack,
  sourceLang = "English",
  targetLang = "Hindi",
  initialText = '',
  onSwapLanguages,
}) {
  const [sourceText, setSourceText] = useState(initialText);
  const [translatedText, setTranslatedText] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [translationSource, setTranslationSource] = useState('offline'); // 'offline' | 'google'
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const { isDark } = useTheme();
  const c = getColors(isDark);

  const handleTranslate = useCallback(async (text) => {
    const textToTranslate = text || sourceText;
    if (!textToTranslate.trim()) return;

    if (targetLang === 'Select City / Language') {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please select a target language first', ToastAndroid.SHORT);
      } else {
        Alert.alert('Select Language', 'Please choose a target language first.');
      }
      return;
    }

    setIsTranslating(true);

    try {
      const result = await translate(textToTranslate, sourceLang, targetLang);
      setTranslatedText(result.translatedText);
      setPronunciation(result.pronunciation);
      setTranslationSource(result.source || 'google');
      setIsSaved(false);
    } catch (error) {
      if (error.message === 'TRANSLATION_FAILED') {
        setTranslatedText('');
        setPronunciation('');
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            'Translation failed. Check your internet connection and try again.',
            ToastAndroid.LONG
          );
        } else {
          Alert.alert(
            'Translation Failed',
            'Could not translate this phrase.\n\n• Make sure you are connected to the internet\n• The backend server must be running\n• Common phrases work offline: Hello, Thank you, Help me...'
          );
        }
      } else {
        console.warn('[Translator]', error.message);
      }
    } finally {
      setIsTranslating(false);
    }
  }, [sourceText, sourceLang, targetLang]);

  const handleSave = async () => {
    if (!translatedText) return;
    setIsSaved(true);

    // Save to local AsyncStorage phrasebook
    try {
      const raw = await AsyncStorage.getItem('@saved_phrases');
      const saved = raw ? JSON.parse(raw) : [];
      saved.unshift({
        id: Date.now().toString(),
        sourceLang,
        targetLang,
        sourceText,
        translatedText,
        pronunciation,
        savedAt: new Date().toISOString(),
      });
      await AsyncStorage.setItem('@saved_phrases', JSON.stringify(saved.slice(0, 200)));

      if (Platform.OS === 'android') {
        ToastAndroid.show('Saved to Phrasebook!', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.warn('[Save]', error.message);
    }
  };

  const playAudio = () => {
    if (!translatedText) return;
    setIsPlayingAudio(true);
    Speech.speak(translatedText, {
      onDone: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
      rate: 0.8,
    });
  };

  const handleCopy = () => {
    if (!translatedText) return;
    try {
      const { setStringAsync } = require('expo-clipboard');
      setStringAsync(`${translatedText}\n${pronunciation}`);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Copied!', ToastAndroid.SHORT);
      }
    } catch {
      // Clipboard may not be available
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.bg, paddingHorizontal: 24, paddingTop: 48 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, marginBottom: 8 }}>
        <TouchableOpacity
          onPress={onBack}
          style={{ width: 40, height: 40, backgroundColor: c.card, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: c.cardBorder }}
        >
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: c.textPrimary }}>{sourceLang}</Text>
          <TouchableOpacity
            onPress={() => {
              setTranslatedText('');
              setPronunciation('');
              setSourceText('');
              if (onSwapLanguages) onSwapLanguages();
            }}
            activeOpacity={0.7}
            style={{ width: 36, height: 36, backgroundColor: c.iconBg, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10, borderWidth: 1, borderColor: '#F97316' }}
          >
            <Ionicons name="swap-horizontal" size={18} color="#F97316" />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: c.textPrimary }}>{targetLang}</Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 16 }} showsVerticalScrollIndicator={false}>
        {/* Text Input */}
        <View style={{ backgroundColor: c.card, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: c.cardBorder, minHeight: 120 }}>
          <View style={{ alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, backgroundColor: c.iconBg, borderRadius: 999, marginBottom: 12, borderWidth: 1, borderColor: c.iconBgAlt }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#F97316' }}>{sourceLang}</Text>
          </View>
          <TextInput
            value={sourceText}
            onChangeText={setSourceText}
            placeholder="Type a phrase to translate..."
            placeholderTextColor={c.textMuted}
            multiline
            style={{
              fontSize: 20, fontWeight: 'bold', color: c.textPrimary,
              lineHeight: 30, paddingHorizontal: 4, minHeight: 60,
            }}
            onSubmitEditing={() => handleTranslate()}
          />
          {sourceText.length > 0 && (
            <TouchableOpacity
              onPress={() => handleTranslate()}
              disabled={isTranslating}
              activeOpacity={0.8}
              style={{
                alignSelf: 'flex-end', paddingHorizontal: 20, paddingVertical: 10,
                backgroundColor: '#F97316', borderRadius: 12, marginTop: 8,
                opacity: isTranslating ? 0.6 : 1,
              }}
            >
              {isTranslating ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Translate</Text>
              )}
            </TouchableOpacity>
          )}
        </View>

        {/* Translation Result */}
        {(translatedText || isTranslating) && (
          <View style={{ backgroundColor: c.accentBg, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: c.accentBorder, minHeight: 120, justifyContent: 'space-between' }}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 }}>
                <View style={{ paddingHorizontal: 12, paddingVertical: 4, backgroundColor: '#F97316', borderRadius: 999 }}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>{targetLang}</Text>
                </View>
                {translationSource === 'offline' ? (
                  <View style={{ paddingHorizontal: 8, paddingVertical: 2, backgroundColor: 'rgba(22,163,74,0.15)', borderRadius: 999, borderWidth: 1, borderColor: 'rgba(22,163,74,0.3)' }}>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#16a34a' }}>📱 Offline</Text>
                  </View>
                ) : (
                  <View style={{ paddingHorizontal: 8, paddingVertical: 2, backgroundColor: 'rgba(59,130,246,0.15)', borderRadius: 999, borderWidth: 1, borderColor: 'rgba(59,130,246,0.3)' }}>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#3b82f6' }}>🌐 Google Translate</Text>
                  </View>
                )}
              </View>

              {isTranslating ? (
                <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                  <ActivityIndicator size="large" color="#F97316" />
                  <Text style={{ color: c.textSecondary, marginTop: 8, fontSize: 14 }}>Translating...</Text>
                </View>
              ) : (
                <>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: c.textPrimary, lineHeight: 36, paddingHorizontal: 4, marginBottom: 8 }}>
                    {translatedText}
                  </Text>
                  {pronunciation ? (
                    <Text style={{ fontSize: 14, fontStyle: 'italic', color: c.textSecondary, paddingHorizontal: 4, marginBottom: 8 }}>
                      {pronunciation}
                    </Text>
                  ) : null}
                </>
              )}
            </View>

            {translatedText && !isTranslating && (
              <TouchableOpacity
                onPress={playAudio}
                activeOpacity={0.7}
                style={{
                  alignSelf: 'flex-end', width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', borderWidth: 1,
                  backgroundColor: isPlayingAudio ? '#F97316' : c.card,
                  borderColor: '#F97316',
                }}
              >
                <Ionicons
                  name={isPlayingAudio ? "volume-high" : "volume-high-outline"}
                  size={22}
                  color={isPlayingAudio ? "white" : "#F97316"}
                />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Quick Phrases */}
        {!translatedText && !isTranslating && (
          <View style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: c.textSecondary, marginBottom: 12 }}>
              ⚡ Quick Phrases
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {getQuickPhrasesForLang(sourceLang).map((phrase) => (
                <TouchableOpacity
                  key={phrase}
                  onPress={() => { setSourceText(phrase); handleTranslate(phrase); }}
                  activeOpacity={0.8}
                  style={{
                    paddingHorizontal: 14, paddingVertical: 8, backgroundColor: c.card,
                    borderRadius: 999, borderWidth: 1, borderColor: c.cardBorder,
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: '600', color: c.textPrimary }}>{phrase}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Actions */}
      {translatedText && !isTranslating && (
        <View style={{ flexDirection: 'row', marginBottom: 32, paddingTop: 16, gap: 16 }}>
          <TouchableOpacity
            onPress={handleSave}
            activeOpacity={0.8}
            style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 16, backgroundColor: isSaved ? '#16a34a' : '#F97316' }}
          >
            <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={20} color="white" style={{ marginRight: 8 }} />
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              {isSaved ? "Saved" : "Save"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCopy}
            activeOpacity={0.8}
            style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, backgroundColor: c.card, borderWidth: 1, borderColor: c.textPrimary, borderRadius: 16 }}
          >
            <Ionicons name="copy-outline" size={20} color={c.textPrimary} style={{ marginRight: 8 }} />
            <Text style={{ color: c.textPrimary, fontSize: 16, fontWeight: 'bold' }}>Copy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={playAudio}
            activeOpacity={0.8}
            style={{ width: 56, alignItems: 'center', justifyContent: 'center', paddingVertical: 16, backgroundColor: c.card, borderWidth: 1, borderColor: '#F97316', borderRadius: 16 }}
          >
            <Ionicons name="volume-high-outline" size={22} color="#F97316" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
