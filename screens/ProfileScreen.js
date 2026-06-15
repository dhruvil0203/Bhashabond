import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { getColors } from '../theme/colors';

export default function ProfileScreen() {
  const [audioSpeed, setAudioSpeed] = useState('Normal');
  const [savedCount, setSavedCount] = useState(0);
  const { isDark, toggleTheme } = useTheme();
  const c = getColors(isDark);

  useEffect(() => {
    async function loadStats() {
      try {
        const raw = await AsyncStorage.getItem('@saved_phrases');
        const saved = raw ? JSON.parse(raw) : [];
        setSavedCount(saved.length);
      } catch {}
    }
    loadStats();
  }, []);

  const handleClearSaved = () => {
    Alert.alert(
      'Clear Saved Phrases',
      'This will delete all your saved phrases. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('@saved_phrases');
            setSavedCount(0);
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: c.bg, paddingTop: 48 }}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={{ alignItems: 'center', paddingHorizontal: 24, paddingVertical: 24, marginBottom: 16 }}>
        <View style={{
          width: 96, height: 96, backgroundColor: c.iconBg, borderRadius: 48,
          alignItems: 'center', justifyContent: 'center', marginBottom: 16,
          borderWidth: 1, borderColor: c.iconBgAlt,
        }}>
          <Ionicons name="person" size={56} color="#F97316" />
        </View>
        <Text style={{ fontSize: 24, fontWeight: '900', color: c.textPrimary }}>Namaste, Traveler!</Text>
        <Text style={{ fontSize: 14, color: c.textSecondary, marginTop: 4 }}>
          Exploring India, one phrase at a time.
        </Text>
        <View style={{
          marginTop: 8, paddingHorizontal: 12, paddingVertical: 4,
          backgroundColor: 'rgba(22,163,74,0.1)', borderRadius: 999,
          borderWidth: 1, borderColor: 'rgba(22,163,74,0.3)',
        }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#16a34a' }}>📱 100% Offline</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, marginBottom: 24, gap: 8 }}>
        {[
          { value: '21', label: 'Languages' },
          { value: '35+', label: 'Phrases' },
          { value: String(savedCount), label: 'Saved' },
        ].map(({ value, label }) => (
          <View key={label} style={{ flex: 1, backgroundColor: c.card, padding: 16, borderRadius: 24, borderWidth: 1, borderColor: c.cardBorder, alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: '900', color: '#F97316' }}>{value}</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: c.textSecondary, marginTop: 4, textAlign: 'center' }}>{label}</Text>
          </View>
        ))}
      </View>

      <View style={{ paddingHorizontal: 24, gap: 20 }}>
        {/* Settings */}
        <Text style={{ fontSize: 18, fontWeight: '900', color: c.textPrimary, marginBottom: 4 }}>App Settings</Text>

        <View style={{ backgroundColor: c.card, borderRadius: 24, borderWidth: 1, borderColor: c.cardBorder, overflow: 'hidden' }}>
          {/* Dark Mode */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: c.sectionBg }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={{ width: 40, height: 40, backgroundColor: c.iconBg, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <Ionicons name={isDark ? 'moon' : 'sunny-outline'} size={20} color="#F97316" />
              </View>
              <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: c.textPrimary }}>Dark Mode</Text>
                <Text style={{ fontSize: 12, color: c.textSecondary, marginTop: 2 }}>{isDark ? 'Dark theme enabled' : 'Light theme enabled'}</Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: c.switchTrackOff, true: '#F97316' }}
              thumbColor={'white'}
            />
          </View>

          {/* Audio Speed */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setAudioSpeed(audioSpeed === 'Normal' ? 'Slow' : 'Normal')}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: c.sectionBg }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 40, height: 40, backgroundColor: c.iconBg, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <Ionicons name="speedometer-outline" size={20} color="#F97316" />
              </View>
              <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: c.textPrimary }}>Pronunciation Speed</Text>
                <Text style={{ fontSize: 12, color: c.textSecondary, marginTop: 2 }}>Control audio playback speed</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: c.accentBg, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999, borderWidth: 1, borderColor: c.accentBorder }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#F97316' }}>{audioSpeed}</Text>
            </View>
          </TouchableOpacity>

          {/* Clear Saved */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleClearSaved}
            style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}
          >
            <View style={{ width: 40, height: 40, backgroundColor: c.iconBg, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
              <Ionicons name="trash-outline" size={20} color="#F97316" />
            </View>
            <View>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: c.textPrimary }}>Clear Saved Phrases</Text>
              <Text style={{ fontSize: 12, color: c.textSecondary, marginTop: 2 }}>{savedCount} phrases saved locally</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* About */}
        <Text style={{ fontSize: 18, fontWeight: '900', color: c.textPrimary, marginTop: 8, marginBottom: 4 }}>About</Text>

        <View style={{ backgroundColor: c.card, borderRadius: 24, borderWidth: 1, borderColor: c.cardBorder, padding: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: c.textPrimary, marginBottom: 8 }}>
            🇮🇳 BhashaBond — Speak Local, Feel Local
          </Text>
          <Text style={{ fontSize: 13, color: c.textSecondary, lineHeight: 20 }}>
            A 100% offline translation app for travelers in India. Translate between English and 20+ Indian languages without internet, API keys, or cloud services.
          </Text>
          <Text style={{ fontSize: 13, color: c.textSecondary, lineHeight: 20, marginTop: 8 }}>
            All translations run entirely on your device. Your data never leaves your phone.
          </Text>
        </View>

        <Text style={{ textAlign: 'center', color: c.textMuted, fontSize: 12, fontWeight: '600', marginTop: 16 }}>
          BhashaBond v1.0.0 • Made with ❤️ in India
        </Text>
      </View>
    </ScrollView>
  );
}
