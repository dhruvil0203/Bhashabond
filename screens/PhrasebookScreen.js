import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ToastAndroid, Platform, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useTheme } from '../context/ThemeContext';
import { getColors } from '../theme/colors';
import { getLangCode } from '../services/translator';
import { CITY_GUIDE_DATA } from './cityGuideData';

// Wikimedia returns HTTP 403 to React Native's default okhttp user-agent, so
// route those images through an image proxy that fetches them server-side.
const proxiedImage = (url) => {
  if (!url) return url;
  if (url.includes('upload.wikimedia.org')) {
    const stripped = url.replace(/^https?:\/\//, '');
    return `https://images.weserv.nl/?url=${encodeURIComponent(stripped)}&w=500`;
  }
  return url;
};

const STATE_TO_CITY_MAP = {
  'Delhi': 'Delhi',
  'Haryana': 'Delhi',
  'Himachal Pradesh': 'Delhi',
  'Jammu & Kashmir': 'Delhi',
  'Ladakh': 'Delhi',
  'Punjab': 'Chandigarh',
  'Rajasthan': 'Jaipur',
  'Uttar Pradesh': 'Lucknow',
  'Uttarakhand': 'Delhi',
  'Chandigarh (UT)': 'Chandigarh',
  'Andhra Pradesh': 'Hyderabad',
  'Karnataka': 'Bengaluru',
  'Kerala': 'Kochi',
  'Tamil Nadu': 'Chennai',
  'Telangana': 'Hyderabad',
  'Puducherry (UT)': 'Chennai',
  'Lakshadweep (UT)': 'Kochi',
  'Andaman & Nicobar (UT)': 'Kolkata',
  'Bihar': 'Patna',
  'Jharkhand': 'Patna',
  'Odisha': 'Bhubaneswar',
  'West Bengal': 'Kolkata',
  'Goa': 'Mumbai',
  'Gujarat': 'Ahmedabad',
  'Maharashtra': 'Mumbai',
  'Dadra & Nagar Haveli (UT)': 'Ahmedabad',
  'Daman & Diu (UT)': 'Ahmedabad',
  'Chhattisgarh': 'Delhi',
  'Madhya Pradesh': 'Delhi',
  'Arunachal Pradesh': 'Delhi',
  'Assam': 'Guwahati',
  'Manipur': 'Guwahati',
  'Meghalaya': 'Delhi',
  'Mizoram': 'Delhi',
  'Nagaland': 'Delhi',
  'Sikkim': 'Delhi',
  'Tripura': 'Kolkata',
};

const CATEGORIES = ["Greetings", "Food", "Travel", "Emergency", "Shopping"];

// Hardcoded phrasebook — fully offline, no API needed
const PHRASEBOOK_DATA = {
  Greetings: [
    { id: 1, english: 'Hello / Good Morning', translations: {
      kan_Knda: { text: 'ನಮಸ್ಕಾರ', pronunciation: 'Namaskāra' },
      hin_Deva: { text: 'नमस्ते', pronunciation: 'Namaste' },
      tam_Taml: { text: 'வணக்கம்', pronunciation: 'Vanakkam' },
      guj_Gujr: { text: 'નમસ્તે', pronunciation: 'Namaste' },
      ben_Beng: { text: 'নমস্কার', pronunciation: 'Nomoshkar' },
      tel_Telu: { text: 'నమస్కారం', pronunciation: 'Namaskāram' },
      mal_Mlym: { text: 'നമസ്കാരം', pronunciation: 'Namaskāram' },
      mar_Deva: { text: 'नमस्कार', pronunciation: 'Namaskār' },
    }},
    { id: 2, english: 'Thank you', translations: {
      kan_Knda: { text: 'ಧನ್ಯವಾದ', pronunciation: 'Dhanyavāda' },
      hin_Deva: { text: 'धन्यवाद', pronunciation: 'Dhanyavād' },
      tam_Taml: { text: 'நன்றி', pronunciation: 'Nandri' },
      guj_Gujr: { text: 'આભાર', pronunciation: 'Aabhaar' },
      ben_Beng: { text: 'ধন্যবাদ', pronunciation: 'Dhonnobad' },
      tel_Telu: { text: 'ధన్యవాదాలు', pronunciation: 'Dhanyavādālu' },
      mal_Mlym: { text: 'നന്ദി', pronunciation: 'Nandi' },
    }},
    { id: 3, english: 'Good night', translations: {
      kan_Knda: { text: 'ಶುಭ ರಾತ್ರಿ', pronunciation: 'Śubha rātri' },
      hin_Deva: { text: 'शुभ रात्रि', pronunciation: 'Shubh rātri' },
      tam_Taml: { text: 'இனிய இரவு', pronunciation: 'Iniya iravu' },
      guj_Gujr: { text: 'શુભ રાત્રી', pronunciation: 'Shubh rātrī' },
    }},
    { id: 4, english: 'How are you?', translations: {
      kan_Knda: { text: 'ಹೇಗಿದ್ದೀರಾ?', pronunciation: 'Hēgiddīrā?' },
      hin_Deva: { text: 'आप कैसे हैं?', pronunciation: 'Aap kaise hain?' },
      tam_Taml: { text: 'எப்படி இருக்கீர்கள்?', pronunciation: 'Eppadi irukkīrgal?' },
      guj_Gujr: { text: 'તમે કેમ છો?', pronunciation: 'Tame kem chho?' },
      ben_Beng: { text: 'কেমন আছেন?', pronunciation: 'Kemon āchhen?' },
      tel_Telu: { text: 'ఎలా ఉన్నారు?', pronunciation: 'Elā unnāru?' },
    }},
    { id: 20, english: 'Goodbye', translations: {
      kan_Knda: { text: 'ವಿದಾಯ', pronunciation: 'Vidāya' },
      hin_Deva: { text: 'अलविदा', pronunciation: 'Alvidā' },
      tam_Taml: { text: 'விடைபெறுகிறேன்', pronunciation: 'Vidaiperukirēn' },
      guj_Gujr: { text: 'આવજો', pronunciation: 'Āvjo' },
      ben_Beng: { text: 'বিদায়', pronunciation: 'Bidāy' },
    }},
  ],
  Food: [
    { id: 5, english: 'I am hungry', translations: {
      kan_Knda: { text: 'ನನಗೆ ಹಸಿವಾಗಿದೆ', pronunciation: 'Nanage hasivāgide' },
      hin_Deva: { text: 'मुझे भूख लगी है', pronunciation: 'Mujhe bhookh lagi hai' },
      tam_Taml: { text: 'எனக்கு பசிக்கிறது', pronunciation: 'Enakku pasikkiradhu' },
      guj_Gujr: { text: 'મને ભૂખ લાગી છે', pronunciation: 'Mane bhookh lāgī chhe' },
      ben_Beng: { text: 'আমার খিদে পেয়েছে', pronunciation: 'Āmār khide peyechhe' },
      tel_Telu: { text: 'నాకు ఆకలిగా ఉంది', pronunciation: 'Nāku ākaligā undi' },
    }},
    { id: 6, english: 'Give me water', translations: {
      kan_Knda: { text: 'ನನಗೆ ನೀರು ಕೊಡಿ', pronunciation: 'Nanage nīru koḍi' },
      hin_Deva: { text: 'मुझे पानी दो', pronunciation: 'Mujhe pānī do' },
      tam_Taml: { text: 'எனக்கு தண்ணீர் கொடுங்கள்', pronunciation: 'Enakku thannīr kodungal' },
      guj_Gujr: { text: 'મને પાણી આપો', pronunciation: 'Mane pāṇī āpo' },
    }},
    { id: 7, english: 'Is it spicy?', translations: {
      kan_Knda: { text: 'ಇದು ಖಾರವೇ?', pronunciation: 'Idu khāravē?' },
      hin_Deva: { text: 'क्या यह तीखा है?', pronunciation: 'Kya yah tīkhā hai?' },
      tam_Taml: { text: 'இது காரமா?', pronunciation: 'Idhu kāramā?' },
    }},
    { id: 21, english: 'I am thirsty', translations: {
      kan_Knda: { text: 'ನನಗೆ ಬಾಯಾರಿಕೆ ಆಗಿದೆ', pronunciation: 'Nanage bāyārike āgide' },
      hin_Deva: { text: 'मुझे प्यास लगी है', pronunciation: 'Mujhe pyās lagī hai' },
      tam_Taml: { text: 'எனக்கு தாகமாக இருக்கிறது', pronunciation: 'Enakku dhāgamāga irukkuradhu' },
    }},
  ],
  Travel: [
    { id: 8, english: 'Where is the temple?', translations: {
      kan_Knda: { text: 'ದೇವಸ್ಥಾನ ಎಲ್ಲಿದೆ?', pronunciation: 'Dēvasthāna ellide?' },
      hin_Deva: { text: 'मंदिर कहाँ है?', pronunciation: 'Mandir kahān hai?' },
      tam_Taml: { text: 'கோவில் எங்கே?', pronunciation: 'Kōvil engkē?' },
      tel_Telu: { text: 'గుడి ఎక్కడ?', pronunciation: 'Gudi ekkada?' },
    }},
    { id: 9, english: 'Go left', translations: {
      kan_Knda: { text: 'ಎಡಕ್ಕೆ ಹೋಗಿ', pronunciation: 'Eḍakke hōgi' },
      hin_Deva: { text: 'बाएं जाइए', pronunciation: 'Bāyein jāiye' },
    }},
    { id: 10, english: 'Go right', translations: {
      kan_Knda: { text: 'ಬಲಕ್ಕೆ ಹೋಗಿ', pronunciation: 'Balakke hōgi' },
      hin_Deva: { text: 'दाएं जाइए', pronunciation: 'Dāyein jāiye' },
    }},
    { id: 22, english: 'Where is the station?', translations: {
      kan_Knda: { text: 'ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?', pronunciation: 'Nildāṇa ellide?' },
      hin_Deva: { text: 'स्टेशन कहाँ है?', pronunciation: 'Station kahān hai?' },
      tam_Taml: { text: 'நிலையம் எங்கே?', pronunciation: 'Nilaiyam engkē?' },
    }},
    { id: 23, english: 'Go straight', translations: {
      kan_Knda: { text: 'ನೇರವಾಗಿ ಹೋಗಿ', pronunciation: 'Nēravāgi hōgi' },
      hin_Deva: { text: 'सीधे जाइए', pronunciation: 'Sīdhe jāiye' },
    }},
  ],
  Emergency: [
    { id: 11, english: 'Help me', translations: {
      kan_Knda: { text: 'ನನಗೆ ಸಹಾಯ ಮಾಡಿ', pronunciation: 'Nanage sahāya māḍi' },
      hin_Deva: { text: 'मेरी मदद करो', pronunciation: 'Merī madad karo' },
      tam_Taml: { text: 'எனக்கு உதவுங்கள்', pronunciation: 'Enakku udhavungal' },
      ben_Beng: { text: 'আমাকে সাহায্য করো', pronunciation: 'Āmāke sāhājya korō' },
      tel_Telu: { text: 'నాకు సహాయం చేయండి', pronunciation: 'Nāku sahāyam chēyandi' },
    }},
    { id: 12, english: 'Call a doctor', translations: {
      kan_Knda: { text: 'ವೈದ್ಯರನ್ನು ಕರೆಯಿರಿ', pronunciation: 'Vaidyarannu kareyiri' },
      hin_Deva: { text: 'डॉक्टर को बुलाओ', pronunciation: 'Doctor ko bulāo' },
    }},
    { id: 13, english: 'I am lost', translations: {
      kan_Knda: { text: 'ನಾನು ದಾರಿ ತಪ್ಪಿದ್ದೇನೆ', pronunciation: 'Nānu dāri tappiddēne' },
      hin_Deva: { text: 'मैं रास्ता भूल गया हूँ', pronunciation: 'Main rāstā bhool gayā hoon' },
    }},
    { id: 24, english: 'Call the police', translations: {
      kan_Knda: { text: 'ಪೊಲೀಸರನ್ನು ಕರೆಯಿರಿ', pronunciation: 'Polīsarannu kareyiri' },
      hin_Deva: { text: 'पुलिस को बुलाओ', pronunciation: 'Police ko bulāo' },
    }},
  ],
  Shopping: [
    { id: 14, english: 'How much does this cost?', translations: {
      kan_Knda: { text: 'ಇದರ ಬೆಲೆ ಎಷ್ಟು?', pronunciation: 'Idara bele eṣṭu?' },
      hin_Deva: { text: 'इसकी कीमत क्या है?', pronunciation: 'Iskī kīmat kya hai?' },
      tam_Taml: { text: 'இதன் விலை என்ன?', pronunciation: 'Idhan vilai enna?' },
      guj_Gujr: { text: 'આનો ભાવ શું છે?', pronunciation: 'Āno bhāv shun chhe?' },
    }},
    { id: 15, english: 'Very expensive', translations: {
      kan_Knda: { text: 'ತುಂಬಾ ದುಬಾರಿ', pronunciation: 'Tumbā dubāri' },
      hin_Deva: { text: 'बहुत महंगा', pronunciation: 'Bahut mahangā' },
    }},
    { id: 16, english: 'Please reduce the price', translations: {
      kan_Knda: { text: 'ದಯವಿಟ್ಟು ಬೆಲೆ ಕಡಿಮೆ ಮಾಡಿ', pronunciation: 'Dayaviṭṭu bele kaḍime māḍi' },
      hin_Deva: { text: 'कृपया कीमत कम करें', pronunciation: 'Kripayā kīmat kam karein' },
    }},
  ],
};

export default function PhrasebookScreen({
  sourceLang = "English",
  targetLang = "Kannada",
  selectedCity = null
}) {
  const [activeCategory, setActiveCategory] = useState("Greetings");
  const [bookmarks, setBookmarks] = useState({});
  const [playingId, setPlayingId] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [loadingImages, setLoadingImages] = useState({});
  const { isDark } = useTheme();
  const c = getColors(isDark);

  const targetLangCode = getLangCode(targetLang);

  const renderCityGuide = () => {
    if (activeCategory !== 'Food' && activeCategory !== 'Travel') return null;

    const activeCityName = selectedCity ? (STATE_TO_CITY_MAP[selectedCity] || selectedCity) : 'Delhi';
    const cityData = CITY_GUIDE_DATA[activeCityName] || CITY_GUIDE_DATA['Delhi'];
    if (!cityData) return null;

    const isFood = activeCategory === 'Food';
    const items = isFood ? cityData.foods : cityData.places;
    if (!items || items.length === 0) return null;

    return (
      <View style={{ marginBottom: 24 }}>
        {/* Section header */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
          backgroundColor: isDark ? '#1C1C2E' : '#FFF7ED',
          padding: 14,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: isDark ? '#2D2D4E' : '#FDDCB8',
        }}>
          <View style={{
            width: 48,
            height: 48,
            backgroundColor: '#F97316',
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}>
            <Ionicons name={isFood ? 'restaurant' : 'map'} size={24} color="white" />
          </View>
          <View>
            <Text style={{ fontSize: 13, fontWeight: '600', color: c.textSecondary }}>
              {isFood ? 'Must-Try Foods' : 'Famous Places'} in
            </Text>
            <Text style={{ fontSize: 22, fontWeight: '900', color: '#F97316', letterSpacing: -0.5 }}>
              {activeCityName}
            </Text>
          </View>
        </View>

        {/* Full-width cards */}
        {items.map((item, idx) => (
          <View
            key={`${item.name}-${idx}`}
            style={{
              backgroundColor: c.card,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: c.cardBorder,
              marginBottom: 16,
              overflow: 'hidden',
              elevation: 4,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.12,
              shadowRadius: 10,
            }}
          >
            {/* Image with overlays */}
            <View style={{ position: 'relative', height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: c.sectionBg }}>
              {loadingImages[`${item.name}-${idx}`] && (
                <ActivityIndicator size="small" color="#F97316" style={{ position: 'absolute', zIndex: 10 }} />
              )}
              <Image
                source={{
                  uri: imageErrors[`${item.name}-${idx}`]
                    ? (isFood
                        ? 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'
                        : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=500&q=80'
                      )
                    : proxiedImage(item.imageUrl),
                }}
                onLoadStart={() => {
                  const key = `${item.name}-${idx}`;
                  setLoadingImages(prev => ({ ...prev, [key]: true }));
                }}
                onLoadEnd={() => {
                  const key = `${item.name}-${idx}`;
                  setLoadingImages(prev => ({ ...prev, [key]: false }));
                }}
                onError={() => {
                  const key = `${item.name}-${idx}`;
                  setImageErrors(prev => ({ ...prev, [key]: true }));
                  setLoadingImages(prev => ({ ...prev, [key]: false }));
                }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
              {/* City badge top-left */}
              <View style={{
                position: 'absolute',
                top: 12,
                left: 12,
                backgroundColor: 'rgba(0,0,0,0.55)',
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}>
                <Ionicons name="location" size={12} color="white" />
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 12 }}>
                  {activeCityName}
                </Text>
              </View>
              {/* Local name badge bottom-right */}
              {item.localName ? (
                <View style={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  backgroundColor: 'rgba(249, 115, 22, 0.95)',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 20,
                }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
                    {item.localName}
                  </Text>
                </View>
              ) : null}
            </View>

            {/* Card body */}
            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 20, fontWeight: '800', color: c.textPrimary, marginBottom: 4 }}>
                {item.name}
              </Text>
              {item.pronunciation ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                  <Ionicons name="volume-medium-outline" size={14} color={c.textSecondary} />
                  <Text style={{ fontSize: 13, fontStyle: 'italic', color: c.textSecondary }}>
                    {item.pronunciation}
                  </Text>
                </View>
              ) : null}
              <Text style={{ fontSize: 14, color: c.textSecondary, lineHeight: 21 }}>
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const toggleBookmark = (phraseId) => {
    const key = `${activeCategory}_${phraseId}`;
    const next = !bookmarks[key];
    setBookmarks(prev => ({ ...prev, [key]: next }));

    if (Platform.OS === 'android') {
      ToastAndroid.show(next ? 'Added Bookmark' : 'Removed Bookmark', ToastAndroid.SHORT);
    }
  };

  const playSpeech = (phraseId, text) => {
    setPlayingId(phraseId);
    Speech.speak(text, {
      onDone: () => setPlayingId(null),
      onError: () => setPlayingId(null),
      rate: 0.8,
    });
  };

  const getTranslation = (phrase) => {
    if (!phrase.translations || !targetLangCode) {
      return { text: phrase.native || '', pronunciation: phrase.pronunciation || '' };
    }

    const trans = phrase.translations[targetLangCode];
    if (trans) {
      return { text: trans.text || '', pronunciation: trans.pronunciation || '' };
    }

    // Fallback: try any available translation
    const keys = Object.keys(phrase.translations);
    if (keys.length > 0) {
      const first = phrase.translations[keys[0]];
      return { text: first.text || '', pronunciation: first.pronunciation || '' };
    }

    return { text: '', pronunciation: '' };
  };

  const currentPhrases = PHRASEBOOK_DATA[activeCategory] || [];

  return (
    <View style={{ flex: 1, backgroundColor: c.bg, paddingTop: 32 }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 48, height: 48, backgroundColor: '#F97316', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="book" size={24} color="white" />
        </View>
        <View>
          <Text style={{ fontSize: 28, fontWeight: '900', color: c.textPrimary, letterSpacing: -0.5 }}>Phrasebook</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: c.textSecondary }}>{sourceLang}</Text>
            <Ionicons name="arrow-forward" size={10} color={c.textSecondary} style={{ marginHorizontal: 4 }} />
            <Text style={{ fontSize: 12, fontWeight: '600', color: c.textSecondary }}>{targetLang}</Text>
          </View>
        </View>
      </View>

      {/* Categories */}
      <View style={{ paddingVertical: 8 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 4 }}
        >
          {CATEGORIES.map((category) => {
            const isActive = category === activeCategory;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                activeOpacity={0.8}
                style={{
                  paddingHorizontal: 20, paddingVertical: 10, borderRadius: 999, marginRight: 12, borderWidth: 1,
                  backgroundColor: isActive ? '#F97316' : c.card,
                  borderColor: isActive ? '#F97316' : c.cardBorder,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: isActive ? 'white' : c.textPrimary }}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Phrases */}
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 24, marginTop: 16 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {renderCityGuide()}
        {activeCategory !== 'Food' && activeCategory !== 'Travel' && currentPhrases.map((phrase) => {
          const { text: nativeText, pronunciation } = getTranslation(phrase);
          const isPlaying = playingId === phrase.id;
          const bookmarkKey = `${activeCategory}_${phrase.id}`;
          const isBookmarked = bookmarks[bookmarkKey] || false;

          return (
            <View
              key={phrase.id}
              style={{ backgroundColor: c.card, borderRadius: 24, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: c.cardBorder }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: c.textPrimary, flex: 1, paddingRight: 24, lineHeight: 24 }}>
                  {phrase.english}
                </Text>
                <TouchableOpacity
                  onPress={() => toggleBookmark(phrase.id)}
                  activeOpacity={0.7}
                  style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: c.iconBg, borderRadius: 16 }}
                >
                  <Ionicons
                    name={isBookmarked ? "bookmark" : "bookmark-outline"}
                    size={18}
                    color="#F97316"
                  />
                </TouchableOpacity>
              </View>

              {nativeText ? (
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#F97316', marginVertical: 4, lineHeight: 32 }}>
                  {nativeText}
                </Text>
              ) : (
                <Text style={{ fontSize: 14, fontStyle: 'italic', color: c.textMuted, marginVertical: 4 }}>
                  Translation not available for {targetLang}
                </Text>
              )}

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 }}>
                <Text style={{ fontSize: 14, fontStyle: 'italic', color: c.textSecondary, fontWeight: '500', flex: 1 }}>
                  {pronunciation ? (
                    <>Pronunciation: <Text style={{ fontWeight: '600' }}>{pronunciation}</Text></>
                  ) : null}
                </Text>

                {nativeText ? (
                  <TouchableOpacity
                    onPress={() => playSpeech(phrase.id, nativeText)}
                    activeOpacity={0.7}
                    style={{
                      width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1,
                      backgroundColor: isPlaying ? '#F97316' : c.card,
                      borderColor: isPlaying ? '#F97316' : c.cardBorder,
                    }}
                  >
                    <Ionicons
                      name={isPlaying ? "volume-high" : "volume-high-outline"}
                      size={18}
                      color={isPlaying ? "white" : "#F97316"}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          );
        })}

        {activeCategory !== 'Food' && activeCategory !== 'Travel' && currentPhrases.length === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Ionicons name="book-outline" size={48} color={c.textMuted} />
            <Text style={{ color: c.textSecondary, fontWeight: 'bold', marginTop: 16, fontSize: 16 }}>
              No phrases available
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
