import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { getColors } from '../theme/colors';
import { LANGUAGES } from '../shared/languages';

// Map language id → display name (must match LANG_CODES keys in translator.js)
const LANG_ID_TO_NAME = {
  en: 'English', hi: 'Hindi', bn: 'Bengali', te: 'Telugu',
  mr: 'Marathi', ta: 'Tamil', gu: 'Gujarati', kn: 'Kannada',
  ml: 'Malayalam', pa: 'Punjabi', or: 'Odia', as: 'Assamese',
  mai: 'Maithili', ur: 'Urdu', ks: 'Kashmiri', doi: 'Dogri',
  kok: 'Konkani', mni: 'Manipuri', ne: 'Nepali', brx: 'Bodo',
  sa: 'Sanskrit', sat: 'Santali', sd: 'Sindhi',
};

// All 28 states + 8 UTs grouped by region, each with their most spoken language
const STATES_BY_REGION = [
  {
    region: '🏔️ North India',
    states: [
      { name: 'Delhi',              icon: '🏛️', language_id: 'hi',  note: 'Hindi' },
      { name: 'Haryana',            icon: '🌾', language_id: 'hi',  note: 'Hindi' },
      { name: 'Himachal Pradesh',   icon: '🏔️', language_id: 'hi',  note: 'Hindi' },
      { name: 'Jammu & Kashmir',    icon: '❄️', language_id: 'ks',  note: 'Kashmiri · Dogri' },
      { name: 'Ladakh',             icon: '🦅', language_id: 'hi',  note: 'Hindi' },
      { name: 'Punjab',             icon: '🌻', language_id: 'pa',  note: 'Punjabi' },
      { name: 'Rajasthan',          icon: '🐫', language_id: 'hi',  note: 'Hindi' },
      { name: 'Uttar Pradesh',      icon: '🕌', language_id: 'hi',  note: 'Hindi' },
      { name: 'Uttarakhand',        icon: '🌊', language_id: 'hi',  note: 'Hindi' },
      { name: 'Chandigarh (UT)',    icon: '🌹', language_id: 'pa',  note: 'Punjabi · Hindi' },
    ],
  },
  {
    region: '☀️ South India',
    states: [
      { name: 'Andhra Pradesh',         icon: '🌶️', language_id: 'te',  note: 'Telugu' },
      { name: 'Karnataka',              icon: '🐘', language_id: 'kn',  note: 'Kannada' },
      { name: 'Kerala',                 icon: '🛶', language_id: 'ml',  note: 'Malayalam' },
      { name: 'Tamil Nadu',             icon: '🏯', language_id: 'ta',  note: 'Tamil' },
      { name: 'Telangana',              icon: '💎', language_id: 'te',  note: 'Telugu' },
      { name: 'Puducherry (UT)',        icon: '🏖️', language_id: 'ta',  note: 'Tamil' },
      { name: 'Lakshadweep (UT)',       icon: '🏝️', language_id: 'ml',  note: 'Malayalam' },
      { name: 'Andaman & Nicobar (UT)', icon: '🐠', language_id: 'bn',  note: 'Bengali · Hindi' },
    ],
  },
  {
    region: '🌊 East India',
    states: [
      { name: 'Bihar',       icon: '☸️', language_id: 'hi',  note: 'Hindi · Maithili' },
      { name: 'Jharkhand',   icon: '⛏️', language_id: 'hi',  note: 'Hindi · Santali' },
      { name: 'Odisha',      icon: '🎨', language_id: 'or',  note: 'Odia' },
      { name: 'West Bengal', icon: '🐯', language_id: 'bn',  note: 'Bengali' },
    ],
  },
  {
    region: '🌄 West India',
    states: [
      { name: 'Goa',                         icon: '🎉', language_id: 'kok', note: 'Konkani' },
      { name: 'Gujarat',                     icon: '🦁', language_id: 'gu',  note: 'Gujarati' },
      { name: 'Maharashtra',                 icon: '🎭', language_id: 'mr',  note: 'Marathi' },
      { name: 'Dadra & Nagar Haveli (UT)',   icon: '🌿', language_id: 'gu',  note: 'Gujarati' },
      { name: 'Daman & Diu (UT)',            icon: '⚓', language_id: 'gu',  note: 'Gujarati' },
    ],
  },
  {
    region: '🌿 Central India',
    states: [
      { name: 'Chhattisgarh',   icon: '🌳', language_id: 'hi',  note: 'Hindi' },
      { name: 'Madhya Pradesh', icon: '🐅', language_id: 'hi',  note: 'Hindi' },
    ],
  },
  {
    region: '🌱 Northeast India',
    states: [
      { name: 'Arunachal Pradesh', icon: '🌄', language_id: 'en',  note: 'English (official)' },
      { name: 'Assam',             icon: '🍵', language_id: 'as',  note: 'Assamese' },
      { name: 'Manipur',           icon: '🥊', language_id: 'mni', note: 'Manipuri' },
      { name: 'Meghalaya',         icon: '☁️', language_id: 'en',  note: 'English · Khasi' },
      { name: 'Mizoram',           icon: '🌸', language_id: 'en',  note: 'English · Mizo' },
      { name: 'Nagaland',          icon: '🦜', language_id: 'en',  note: 'English (official)' },
      { name: 'Sikkim',            icon: '🌺', language_id: 'ne',  note: 'Nepali' },
      { name: 'Tripura',           icon: '🏯', language_id: 'bn',  note: 'Bengali' },
    ],
  },
];

export default function LanguagePickerScreen({
  onClose,
  onSelectLanguage,
  initialSelectedLanguage = 'English',
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState(() => {
    const match = LANGUAGES.find(
      (l) => l.name.toLowerCase() === initialSelectedLanguage.toLowerCase()
    );
    return match ? match.id : 'en';
  });
  const [viewMode, setViewMode] = useState('languages');
  const { isDark } = useTheme();
  const c = getColors(isDark);

  const filteredLanguages = LANGUAGES.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lang.native || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Flatten all states for search
  const allStates = STATES_BY_REGION.flatMap((r) =>
    r.states.map((s) => ({ ...s, region: r.region }))
  );
  const filteredStates = allStates.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (LANG_ID_TO_NAME[s.language_id] || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirm = () => {
    const selected = LANGUAGES.find((l) => l.id === selectedId);
    if (selected) onSelectLanguage(selected.name);
    onClose();
  };

  const handleStateSelect = (stateItem) => {
    const langName = LANG_ID_TO_NAME[stateItem.language_id];
    if (langName) {
      onSelectLanguage(langName, stateItem.name);
    }
    onClose();
  };

  // Render states view — either grouped (no search) or flat list (search active)
  const renderStates = () => {
    if (searchQuery.trim()) {
      return (
        <View style={{ gap: 10 }}>
          {filteredStates.map((s, idx) => renderStateCard(s, idx))}
          {filteredStates.length === 0 && renderEmpty()}
        </View>
      );
    }
    return STATES_BY_REGION.map((group) => (
      <View key={group.region} style={{ marginBottom: 24 }}>
        <View style={{
          flexDirection: 'row', alignItems: 'center', marginBottom: 12,
          paddingHorizontal: 4,
        }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: c.textPrimary }}>
            {group.region}
          </Text>
          <View style={{
            marginLeft: 8, paddingHorizontal: 8, paddingVertical: 2,
            backgroundColor: 'rgba(249,115,22,0.12)', borderRadius: 999,
            borderWidth: 1, borderColor: 'rgba(249,115,22,0.25)',
          }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#F97316' }}>
              {group.states.length} states
            </Text>
          </View>
        </View>
        <View style={{ gap: 8 }}>
          {group.states.map((s, idx) => renderStateCard(s, idx))}
        </View>
      </View>
    ));
  };

  const renderStateCard = (s, idx) => {
    const lang = LANGUAGES.find((l) => l.id === s.language_id);
    return (
      <TouchableOpacity
        key={`${s.name}-${idx}`}
        onPress={() => handleStateSelect(s)}
        activeOpacity={0.8}
        style={{
          flexDirection: 'row', alignItems: 'center',
          backgroundColor: c.card, borderRadius: 14, padding: 14,
          borderWidth: 1, borderColor: c.cardBorder,
        }}
      >
        {/* State emoji badge */}
        <View style={{
          width: 44, height: 44, backgroundColor: c.iconBg, borderRadius: 12,
          alignItems: 'center', justifyContent: 'center', marginRight: 12,
        }}>
          <Text style={{ fontSize: 22 }}>{s.icon || '🌐'}</Text>
        </View>

        {/* State name + language note */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: c.textPrimary }}>
            {s.name}
          </Text>
          <Text style={{ fontSize: 12, color: c.textSecondary, marginTop: 2 }}>
            {s.note}
          </Text>
        </View>

        {/* Language pill */}
        <View style={{
          paddingHorizontal: 10, paddingVertical: 4,
          backgroundColor: 'rgba(249,115,22,0.12)', borderRadius: 999,
          borderWidth: 1, borderColor: 'rgba(249,115,22,0.3)',
        }}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#F97316' }}>
            {LANG_ID_TO_NAME[s.language_id] || '—'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmpty = () => (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 48 }}>
      <Ionicons name="sad-outline" size={48} color={c.textMuted} />
      <Text style={{ color: c.textSecondary, fontWeight: 'bold', marginTop: 16, fontSize: 16 }}>
        No results found
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: c.bg, paddingTop: 48 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16 }}>
        <TouchableOpacity
          onPress={onClose}
          style={{
            width: 40, height: 40, backgroundColor: c.card, borderRadius: 20,
            alignItems: 'center', justifyContent: 'center',
            borderWidth: 1, borderColor: c.cardBorder, marginRight: 16,
          }}
        >
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: c.textPrimary }}>
          Choose Language
        </Text>
      </View>

      {/* English quick-select */}
      <TouchableOpacity
        onPress={() => { onSelectLanguage('English'); onClose(); }}
        activeOpacity={0.8}
        style={{
          flexDirection: 'row', alignItems: 'center',
          marginHorizontal: 24, marginBottom: 14,
          backgroundColor: isDark ? 'rgba(249,115,22,0.18)' : '#FFF3E8',
          borderRadius: 16, padding: 14,
          borderWidth: 1.5, borderColor: '#F97316',
        }}
      >
        <Text style={{ fontSize: 22, marginRight: 10 }}>🌐</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '800', color: '#F97316' }}>English</Text>
          <Text style={{ fontSize: 12, color: c.textSecondary, marginTop: 1 }}>
            Common language across all states
          </Text>
        </View>
        <View style={{
          paddingHorizontal: 10, paddingVertical: 4,
          backgroundColor: '#F97316', borderRadius: 999,
        }}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: 'white' }}>Universal</Text>
        </View>
      </TouchableOpacity>

      {/* Tab Toggle */}
      <View style={{ paddingHorizontal: 24, marginBottom: 12 }}>
        <View style={{
          flexDirection: 'row', backgroundColor: c.card,
          borderRadius: 12, padding: 3, borderWidth: 1, borderColor: c.cardBorder,
        }}>
          {[
            { key: 'languages', label: '🗣️ Languages' },
            { key: 'states',    label: '🗺️ States' },
          ].map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              onPress={() => setViewMode(key)}
              style={{
                flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: 'center',
                backgroundColor: viewMode === key ? '#F97316' : 'transparent',
              }}
            >
              <Text style={{
                fontWeight: 'bold', fontSize: 13,
                color: viewMode === key ? 'white' : c.textSecondary,
              }}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Search */}
      <View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
        <View style={{
          flexDirection: 'row', alignItems: 'center', backgroundColor: c.card,
          borderWidth: 1, borderColor: c.cardBorder, borderRadius: 16,
          paddingHorizontal: 16, paddingVertical: 12,
        }}>
          <Ionicons name="search-outline" size={20} color="#F97316" style={{ marginRight: 12 }} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={viewMode === 'languages' ? 'Search language...' : 'Search state or language...'}
            placeholderTextColor={c.textMuted}
            style={{ flex: 1, color: c.textPrimary, fontWeight: '500', fontSize: 16, paddingVertical: 0 }}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={c.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 24 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {viewMode === 'languages' ? (
          /* Language Grid */
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {filteredLanguages
              .filter((l) => l.id !== 'en') // English already shown as quick-select
              .map((lang) => {
                const isSelected = lang.id === selectedId;
                return (
                  <TouchableOpacity
                    key={lang.id}
                    onPress={() => setSelectedId(lang.id)}
                    activeOpacity={0.8}
                    style={{
                      width: '48%', borderRadius: 16, padding: 14, marginBottom: 12,
                      borderWidth: 1.5, position: 'relative',
                      backgroundColor: isSelected ? c.accentBg : c.card,
                      borderColor: isSelected ? '#F97316' : c.cardBorder,
                    }}
                  >
                    {isSelected && (
                      <View style={{
                        position: 'absolute', top: 8, right: 8,
                        width: 20, height: 20, backgroundColor: '#F97316',
                        borderRadius: 10, alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Ionicons name="checkmark" size={12} color="white" />
                      </View>
                    )}
                    <Text style={{ fontSize: 26, marginBottom: 6 }}>{lang.icon}</Text>
                    <Text style={{ fontWeight: 'bold', color: c.textPrimary, fontSize: 14 }}>
                      {lang.name}
                    </Text>
                    <Text style={{ fontSize: 12, color: c.textSecondary, marginTop: 2 }}>
                      {lang.native}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            {filteredLanguages.filter((l) => l.id !== 'en').length === 0 && renderEmpty()}
          </View>
        ) : (
          /* States View */
          renderStates()
        )}
      </ScrollView>

      {/* Confirm Button (languages mode only) */}
      {viewMode === 'languages' && (
        <View style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
          <TouchableOpacity
            onPress={handleConfirm}
            activeOpacity={0.9}
            style={{
              backgroundColor: '#F97316', paddingVertical: 16,
              borderRadius: 16, alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Confirm Selection
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
