import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { getColors } from '../theme/colors';

export default function HomeScreen({
  selectedSourceLang = "English",
  selectedTargetLang = "Select City / Language",
  onOpenLanguagePicker,
  onPressMic
}) {
  const { isDark } = useTheme();
  const c = getColors(isDark);

  return (
    <View style={{ flex: 1, backgroundColor: c.bg, paddingHorizontal: 24, paddingTop: 48 }}>
      <View style={{ alignItems: 'center', marginTop: 24, marginBottom: 32 }}>
        <View style={{
          width: 64, height: 64, backgroundColor: c.iconBg, borderRadius: 32,
          alignItems: 'center', justifyContent: 'center', marginBottom: 12,
        }}>
          <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <Circle cx="12" cy="8" r="3.5" stroke="#F97316" strokeWidth="2.5" />
            <Circle cx="8.5" cy="14" r="3.5" stroke="#F97316" strokeWidth="2.5" />
            <Circle cx="15.5" cy="14" r="3.5" stroke="#F97316" strokeWidth="2.5" />
            <Circle cx="12" cy="13.5" r="1.5" fill="#F97316" />
          </Svg>
        </View>
        <Text style={{ fontSize: 30, fontWeight: '900', color: c.textPrimary, letterSpacing: -0.5 }}>
          BhaashaBond
        </Text>
        <Text style={{ fontSize: 14, fontStyle: 'italic', color: '#F97316', fontWeight: '500', marginTop: 4 }}>
          Speak Local, Feel Local
        </Text>
      </View>

      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: c.textPrimary, textAlign: 'center' }}>
          Namaste 🙏 Where are you headed?
        </Text>
      </View>

      <View style={{ gap: 16, marginBottom: 40 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onOpenLanguagePicker('source')}
          style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: c.card, padding: 20, borderRadius: 24,
            borderWidth: 1, borderColor: c.cardBorder,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={{ width: 48, height: 48, backgroundColor: c.iconBg, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
              <Ionicons name="chatbubble-outline" size={24} color="#F97316" />
            </View>
            <View>
              <Text style={{ fontSize: 11, fontWeight: '600', color: c.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>I Speak</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: c.textPrimary, marginTop: 2 }}>{selectedSourceLang}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#F97316" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onOpenLanguagePicker('target')}
          style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: c.card, padding: 20, borderRadius: 24,
            borderWidth: 1, borderColor: c.cardBorder,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={{ width: 48, height: 48, backgroundColor: c.iconBg, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
              <Ionicons name="location-outline" size={24} color="#F97316" />
            </View>
            <View>
              <Text style={{ fontSize: 11, fontWeight: '600', color: c.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>I'm Visiting</Text>
              <Text style={{
                fontSize: 18, fontWeight: 'bold', marginTop: 2,
                color: selectedTargetLang === "Select City / Language" ? c.textMuted : c.textPrimary,
              }}>
                {selectedTargetLang}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#F97316" />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 32 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 176, height: 176, backgroundColor: isDark ? 'rgba(249,115,22,0.15)' : 'rgba(255,232,214,0.4)', borderRadius: 88, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 144, height: 144, backgroundColor: isDark ? 'rgba(249,115,22,0.25)' : 'rgba(255,232,214,0.85)', borderRadius: 72, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onPressMic}
                style={{ width: 112, height: 112, backgroundColor: '#F97316', borderRadius: 56, alignItems: 'center', justifyContent: 'center' }}
              >
                <Ionicons name="mic-outline" size={48} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
