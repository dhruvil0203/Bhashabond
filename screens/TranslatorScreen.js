import React, { useState, useCallback, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, ScrollView,
  ToastAndroid, Platform, Alert, ActivityIndicator, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useTheme } from '../context/ThemeContext';
import { getColors } from '../theme/colors';
import { translate, getQuickPhrasesForLang } from '../services/translator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGES } from '../shared/languages';


export default function TranslatorScreen({
  onBack,
  sourceLang = "English",
  targetLang = "Hindi",
  initialText = '',
  onSwapLanguages,
  onChangeLanguages,
}) {
  const [sourceText, setSourceText] = useState(initialText);
  const [translatedText, setTranslatedText] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [translationSource, setTranslationSource] = useState('offline'); // 'offline' | 'google'
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Language picker state
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [pickerType, setPickerType] = useState('source'); // 'source' | 'target'
  const [searchQuery, setSearchQuery] = useState('');
  const [localSourceLang, setLocalSourceLang] = useState(sourceLang);
  const [localTargetLang, setLocalTargetLang] = useState(targetLang);

  // Sync local state when props change (e.g., language picked from HomeScreen)
  useEffect(() => {
    setLocalSourceLang(sourceLang);
  }, [sourceLang]);

  useEffect(() => {
    setLocalTargetLang(targetLang);
  }, [targetLang]);

  const { isDark } = useTheme();
  const c = getColors(isDark);

  const handleTranslate = useCallback(async (text) => {
    const textToTranslate = text || sourceText;
    if (!textToTranslate.trim()) return;

    if (localTargetLang === 'Select City / Language') {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please select a target language first', ToastAndroid.SHORT);
      } else {
        Alert.alert('Select Language', 'Please choose a target language first.');
      }
      return;
    }

    setIsTranslating(true);

    try {
      const result = await translate(textToTranslate, localSourceLang, localTargetLang);
      setTranslatedText(result.translatedText);
      setPronunciation(result.pronunciation);
      setTranslationSource(result.source || 'google');
      setIsSaved(false);
    } catch (error) {
      setTranslatedText('');
      setPronunciation('');
      
      let errorTitle = 'Translation Failed';
      let errorMessage = 'Could not translate this phrase.';
      
      if (error.message === 'OFFLINE_PIVOT_FAILED_STAGE1') {
        errorTitle = 'Translation Not Available Offline';
        errorMessage = `This phrase is not available for offline translation from ${localSourceLang}.\n\n` +
          `🔌 Offline Translation Tips:\n` +
          `• Use common phrases (Hello, Thank you, Help me, etc.)\n` +
          `• Or translate via English first\n` +
          `• Connect to internet for unlimited translations`;
      } else if (error.message === 'OFFLINE_PIVOT_FAILED_STAGE2') {
        errorTitle = 'Translation Not Available Offline';
        errorMessage = `This phrase is not available for offline translation to ${localTargetLang}.\n\n` +
          `🔌 Offline Translation Tips:\n` +
          `• Use common phrases (Hello, Thank you, Help me, etc.)\n` +
          `• Or translate via English first\n` +
          `• Connect to internet for unlimited translations`;
      } else if (error.message === 'TRANSLATION_FAILED') {
        if (localSourceLang !== 'English' && localTargetLang !== 'English') {
          errorTitle = 'Translation Unavailable';
          errorMessage = `Cannot translate between ${localSourceLang} and ${localTargetLang} offline for this phrase.\n\n` +
            `🌐 Options:\n` +
            `• Connect to internet for full translation support\n` +
            `• Use common offline phrases (Hello, Thank you, etc.)\n` +
            `• Translate to/from English instead`;
        } else {
          errorMessage = 'Could not translate this phrase.\n\n• Common phrases work offline (Hello, Thank you, Help me, etc.)\n• For other phrases, connect to the internet\n• Make sure the backend server is running';
        }
      }
      
      if (Platform.OS === 'android') {
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      } else {
        Alert.alert(errorTitle, errorMessage);
      }
      
      console.warn('[Translator]', error.message);
    } finally {
      setIsTranslating(false);
    }
  }, [sourceText, localSourceLang, localTargetLang]);

  const openLanguagePicker = (type) => {
    setPickerType(type);
    setSearchQuery('');
    setShowLanguagePicker(true);
  };

  const selectLanguage = (langName) => {
    if (pickerType === 'source') {
      setLocalSourceLang(langName);
      if (onChangeLanguages) {
        onChangeLanguages(langName, localTargetLang);
      }
    } else {
      setLocalTargetLang(langName);
      if (onChangeLanguages) {
        onChangeLanguages(localSourceLang, langName);
      }
    }
    setShowLanguagePicker(false);
    setTranslatedText('');
    setPronunciation('');
  };

  const swapLanguages = () => {
    const temp = localSourceLang;
    setLocalSourceLang(localTargetLang);
    setLocalTargetLang(temp);
    if (onChangeLanguages) {
      onChangeLanguages(localTargetLang, temp);
    }
    if (onSwapLanguages) {
      onSwapLanguages();
    }
    setTranslatedText('');
    setPronunciation('');
    setSourceText('');
  };

  const filteredLanguages = LANGUAGES.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.native.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Guard against rapid concurrent saves (AsyncStorage read-modify-write race)
  const saveMutex = React.useRef(false);

  const handleSave = async () => {
    if (!translatedText) return;
    if (saveMutex.current) return; // Avoid concurrent save race
    saveMutex.current = true;
    setIsSaved(true);

    // Save to local AsyncStorage phrasebook
    try {
      const raw = await AsyncStorage.getItem('@saved_phrases');
      const saved = raw ? JSON.parse(raw) : [];
      saved.unshift({
        id: Date.now().toString(),
        sourceLang: localSourceLang,
        targetLang: localTargetLang,
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
    } finally {
      saveMutex.current = false;
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

        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 12, justifyContent: 'space-between' }}>
          {/* Source Language Dropdown */}
          <TouchableOpacity
            onPress={() => openLanguagePicker('source')}
            activeOpacity={0.7}
            style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, backgroundColor: c.card, borderRadius: 12, borderWidth: 1, borderColor: c.cardBorder, maxWidth: '40%' }}
          >
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: c.textPrimary, marginRight: 4 }} numberOfLines={1}>{localSourceLang}</Text>
            <Ionicons name="chevron-down" size={14} color={c.textSecondary} />
          </TouchableOpacity>

          {/* Swap Button */}
          <TouchableOpacity
            onPress={swapLanguages}
            activeOpacity={0.7}
            style={{ width: 36, height: 36, backgroundColor: c.iconBg, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginHorizontal: 8, borderWidth: 1, borderColor: '#F97316' }}
          >
            <Ionicons name="swap-horizontal" size={18} color="#F97316" />
          </TouchableOpacity>

          {/* Target Language Dropdown */}
          <TouchableOpacity
            onPress={() => openLanguagePicker('target')}
            activeOpacity={0.7}
            style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, backgroundColor: c.card, borderRadius: 12, borderWidth: 1, borderColor: c.cardBorder, maxWidth: '40%' }}
          >
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: localTargetLang === 'Select City / Language' ? c.textMuted : c.textPrimary, marginRight: 4 }} numberOfLines={1}>
              {localTargetLang === 'Select City / Language' ? 'Select Lang' : localTargetLang}
            </Text>
            <Ionicons name="chevron-down" size={14} color={c.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 16 }} showsVerticalScrollIndicator={false}>
        {/* Text Input */}
        <View style={{ backgroundColor: c.card, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: c.cardBorder, minHeight: 120 }}>
          <View style={{ alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, backgroundColor: c.iconBg, borderRadius: 999, marginBottom: 12, borderWidth: 1, borderColor: c.iconBgAlt }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#F97316' }}>{localSourceLang}</Text>
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
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>{localTargetLang}</Text>
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
              {getQuickPhrasesForLang(localSourceLang).map((phrase) => (
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

      {/* Language Picker Modal */}
      <Modal
        visible={showLanguagePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguagePicker(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: c.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%', paddingTop: 16 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingBottom: 16 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: c.textPrimary }}>
                Select {pickerType === 'source' ? 'Source' : 'Target'} Language
              </Text>
              <TouchableOpacity onPress={() => setShowLanguagePicker(false)}>
                <Ionicons name="close" size={28} color={c.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: c.card, borderRadius: 16, padding: 12, borderWidth: 1, borderColor: c.cardBorder }}>
                <Ionicons name="search" size={20} color={c.textMuted} style={{ marginRight: 8 }} />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search languages..."
                  placeholderTextColor={c.textMuted}
                  style={{ flex: 1, fontSize: 16, color: c.textPrimary }}
                />
              </View>
            </View>

            {/* Language List */}
            <ScrollView style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
              {filteredLanguages.map((lang) => (
                <TouchableOpacity
                  key={lang.id}
                  onPress={() => selectLanguage(lang.name)}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 16,
                    paddingHorizontal: 16,
                    backgroundColor: (pickerType === 'source' ? localSourceLang : localTargetLang) === lang.name ? 'rgba(249,115,22,0.1)' : c.card,
                    borderRadius: 16,
                    marginBottom: 8,
                    borderWidth: 1,
                    borderColor: (pickerType === 'source' ? localSourceLang : localTargetLang) === lang.name ? '#F97316' : c.cardBorder,
                  }}
                >
                  <Text style={{ fontSize: 28, marginRight: 16 }}>{lang.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: c.textPrimary }}>{lang.name}</Text>
                    <Text style={{ fontSize: 14, color: c.textSecondary, marginTop: 2 }}>{lang.native}</Text>
                  </View>
                  {(pickerType === 'source' ? localSourceLang : localTargetLang) === lang.name && (
                    <Ionicons name="checkmark-circle" size={24} color="#F97316" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
