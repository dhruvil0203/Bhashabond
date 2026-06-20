// Curated discovery/info data for the Phrasebook's Greetings, Emergency, and
// Shopping categories. Mirrors the shape of cityGuideData.js (city-keyed) so the
// Food/Travel discovery cards and these cards share the same visual pattern.
//
// SCAFFOLD NOTE: `markets` and `customs` are city-specific. To source these from
// an API/JSON later, replace CITY_PHRASE_GUIDE entries with the fetched payload —
// the resolver (getPhraseGuide) already falls back to DEFAULT_CITY when a city
// is missing, so partial data is safe.

// ---------------------------------------------------------------------------
// Emergency numbers — national, identical across cities, so kept flat.
// `tel` is the literal string passed to Linking.openURL('tel:...').
// ---------------------------------------------------------------------------
export const EMERGENCY_NUMBERS = [
  { label: 'Emergency (All)', number: '112', tel: '112', icon: 'alert-circle', primary: true },
  { label: 'Police', number: '100', tel: '100', icon: 'shield' },
  { label: 'Fire', number: '101', tel: '101', icon: 'flame' },
  { label: 'Ambulance', number: '102', tel: '102', icon: 'medkit' },
  { label: 'Disaster Mgmt', number: '108', tel: '108', icon: 'warning' },
  { label: "Women's Helpline", number: '1091', tel: '1091', icon: 'woman' },
  { label: 'Domestic Abuse', number: '181', tel: '181', icon: 'home' },
  { label: 'Tourist Helpline', number: '1363', tel: '1363', icon: 'airplane' },
];

// Surfaced directly on the "If You Feel Unsafe" card.
export const WOMENS_HELPLINE = { number: '1091', tel: '1091' };

// One practical, immediately-useful phrase for the unsafe card (Hindi, widely
// understood). Kept here so it can be localized per target language later.
export const SAFETY_PHRASE = {
  english: 'Please stop the car here',
  native: 'कृपया गाड़ी यहाँ रोकिए',
  pronunciation: 'Kripayā gāṛī yahān rokiye',
};

// ---------------------------------------------------------------------------
// Festival greetings — verified native script + romanization (see commit notes).
// Shown as mini-cards under the Greetings hero. National/Marathi festivals;
// not city-specific, so kept flat.
// ---------------------------------------------------------------------------
export const FESTIVAL_GREETINGS = [
  {
    festival: 'Diwali',
    english: 'Happy Diwali',
    native: 'शुभ दीपावली',
    pronunciation: 'Shubh Dīpāvalī',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Diwali_Diya.jpg/500px-Diwali_Diya.jpg',
  },
  {
    festival: 'Gudi Padwa',
    english: 'Happy Gudi Padwa',
    native: 'गुढी पाडव्याच्या हार्दिक शुभेच्छा',
    pronunciation: 'Gudhī Pāḍavyāchyā Hārdik Shubhecchhā',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Gudi_Padwa_Decoration.jpg/500px-Gudi_Padwa_Decoration.jpg',
  },
  {
    festival: 'Ganesh Chaturthi',
    english: 'Ganpati Bappa Morya',
    native: 'गणपती बाप्पा मोरया',
    pronunciation: 'Ganpatī Bāppā Moryā',
    note: 'A festival chant, not a literal greeting.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Ganesha_Chaturthi.jpg/500px-Ganesha_Chaturthi.jpg',
  },
];

// "How to Bargain" tips — universal advice, shown on the Shopping tab.
export const BARGAIN_TIPS = [
  { icon: 'storefront', text: 'Expected at local shops and street stalls — part of the experience.' },
  { icon: 'pricetag', text: 'Counter at about ¼ to ½ of the first quoted price, then settle in between.' },
  { icon: 'close-circle', text: 'Not normal at restaurants or fixed-price items (buses, trains, tickets) — it reads as rude.' },
  { icon: 'walk', text: 'Most effective tactic: state your price calmly, then walk away slowly — sellers often call you back.' },
];

// ---------------------------------------------------------------------------
// City-specific discovery content. Add new cities here; missing cities fall
// back to DEFAULT_CITY via getPhraseGuide().
// ---------------------------------------------------------------------------
export const DEFAULT_CITY = 'Mumbai';

export const CITY_PHRASE_GUIDE = {
  Mumbai: {
    customs:
      'Greet elders with a respectful "Namaskār" and folded hands; touching the feet of elders (charan sparsh) is a traditional sign of respect. A casual "Namaste" or "Hi" works among friends.',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'Colaba Causeway', localName: 'कुलाबा कॉजवे', description: 'A bustling street market for clothes, jewellery, and souvenirs — prime bargaining territory.' },
      { name: 'Crawford Market', localName: 'क्रॉफर्ड मार्केट', description: 'A historic covered market for fruits, spices, and household goods near CSMT.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Colaba_Causeway_Mumbai.jpg/500px-Colaba_Causeway_Mumbai.jpg',
  },
  Pune: {
    customs:
      'A warm "Namaskār" with folded hands is the traditional greeting; touching elders\' feet shows respect. Casual greetings are common among younger people.',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'Tulsi Baug', localName: 'तुळशीबाग', description: 'A crowded lane famous for affordable household items, jewellery, and traditional wares.' },
      { name: 'FC Road', localName: 'एफ. सी. रोड', description: 'A youthful shopping strip lined with clothing stores, street stalls, and cafes.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Colaba_Causeway_Mumbai.jpg/500px-Colaba_Causeway_Mumbai.jpg',
  },
  Bengaluru: {
    customs:
      'Greet with a polite "Namaskāra" and folded hands; touching the feet of elders is a sign of respect. A friendly "Hello" is common in the city\'s casual settings.',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'Commercial Street', localName: 'ಕಮರ್ಷಿಯಲ್ ಸ್ಟ್ರೀಟ್', description: 'A dense shopping district for fashion, footwear, and accessories — great for haggling.' },
      { name: 'Chickpet', localName: 'ಚಿಕ್ಕಪೇಟೆ', description: 'A historic wholesale market famed for silk sarees and textiles.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Colaba_Causeway_Mumbai.jpg/500px-Colaba_Causeway_Mumbai.jpg',
  },
};

// Resolve a city to its phrase-guide entry, falling back to DEFAULT_CITY.
export function getPhraseGuide(cityName) {
  return CITY_PHRASE_GUIDE[cityName] || CITY_PHRASE_GUIDE[DEFAULT_CITY];
}
