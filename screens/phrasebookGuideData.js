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
  Delhi: {
    customs:
      'Greet with "Namaste" or fold hands. Dress modestly when visiting religious sites. Taking off shoes is mandatory.',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'Chandni Chowk', localName: 'चांदनी चौक', description: 'One of India\'s oldest and busiest markets, famous for street food, garments, and wedding shopping.' },
      { name: 'Connaught Place', localName: 'कनॉट प्लेस', description: 'A premier commercial hub with a circular design, high-end shops, and street vendors.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/India_Gate_%28All_India_War_Memorial%29.jpg/500px-India_Gate_%28All_India_War_Memorial%29.jpg',
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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Glasshouse_and_fountain_at_lalbagh.jpg/500px-Glasshouse_and_fountain_at_lalbagh.jpg',
  },
  Chennai: {
    customs:
      'Greet with "Vanakkam" and folded hands. Respect local traditions at temples; conservative dress is highly appreciated.',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'T. Nagar', localName: 'தி. நகர்', description: 'The shopping heart of Chennai, renowned for silk sarees (Kanjivaram) and gold jewelry.' },
      { name: 'Pondy Bazaar', localName: 'பாண்டி பஜார்', description: 'A vibrant market offering clothes, toys, accessories, and local street food.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Chennai_-_bird%27s-eye_view.jpg/500px-Chennai_-_bird%27s-eye_view.jpg',
  },
  Kolkata: {
    customs:
      'Greet with a polite "Namoshkar". Culture and literature are highly valued; engaging in polite conversations is welcomed.',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'New Market', localName: 'নিউ মার্কেট', description: 'A historic shopping destination since the Victorian era, selling garments, silver, and local foods.' },
      { name: 'Gariahat Market', localName: 'গড়িয়াহাট মার্কেট', description: 'The prime spot for traditional Bengali sarees (Tant, Jamdani) and daily goods.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Victoria_Memorial_situated_in_Kolkata.jpg/500px-Victoria_Memorial_situated_in_Kolkata.jpg',
  },
  Hyderabad: {
    customs:
      'Greet with a warm "Namaskāram" or "Adaab". Traditional culture values hospitality highly (Mehmaan Nawazi).',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'Laad Bazaar', localName: 'లాడ్ బజార్', description: 'A historic market near Charminar famous for colorful, hand-crafted lacquer bangles and pearls.' },
      { name: 'Begum Bazaar', localName: 'ಬೇಗಂ ಬಜಾರ್', description: 'The biggest commercial wholesale market in Hyderabad for household items and brassware.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Charminar_Hyderabad_1.jpg/500px-Charminar_Hyderabad_1.jpg',
  },
  Ahmedabad: {
    customs:
      'Greet with "Namaste" or "Kem Chho". Respect local vegetarian preferences; most traditional eateries serve pure vegetarian food.',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'Law Garden', localName: 'લો ગાર્ડન નાઈટ માર્કેટ', description: 'Famous for traditional Gujarati outfits, chaniya cholis, handicrafts, and street food.' },
      { name: 'Lal Darwaja', localName: 'લાલ દરવાજા', description: 'A bustling, vibrant local market offering clothes, footwear, and local snacks at bargain prices.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/GANDHI_ASHRAM_03.jpg/500px-GANDHI_ASHRAM_03.jpg',
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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Front_view_of_Shaniwar_Wada_illuminated.jpg/500px-Front_view_of_Shaniwar_Wada_illuminated.jpg',
  },
  Jaipur: {
    customs:
      'Greet with "Khamma Ghani" or "Namaste". Rajasthani hospitality (Manuhaar) is warm and requests you to accept food offering.',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'Johari Bazaar', localName: 'जौहरी बाज़ार', description: 'World-famous market for traditional Rajasthani jewelry, gemstones, and handcrafted items.' },
      { name: 'Bapu Bazaar', localName: 'बापू बाज़ार', description: 'Renowned for local textiles, Mojari footwear, and traditional block prints.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/500px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg',
  },
  Lucknow: {
    customs:
      'Greet with "Adaab" or "Namaste". Lucknow is famous for its polite speech ("Pehle Aap" or "You First" culture) and tehzeeb.',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'Aminabad', localName: 'अमीनाबाद', description: 'One of the oldest shopping hubs, famous for Chikankari embroidery clothes and local street foods.' },
      { name: 'Chowk', localName: 'चौक', description: 'A historic market known for traditional perfumes (Ittr), silver jewelry, and Lucknowi food.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Bara_Imambara_Lucknow.jpg/500px-Bara_Imambara_Lucknow.jpg',
  },
  Kochi: {
    customs:
      'Greet with a polite "Namaskaram". Malayalam culture values clean surroundings; remove footwear before entering homes/religious spaces.',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'Broadway', localName: 'ബ്രോഡ്‌വേ', description: 'A narrow, bustling street market famous for spices, clothes, umbrella markets, and household goods.' },
      { name: 'Jew Town', localName: 'ജൂ ടൗൺ', description: 'Famous for antique shops, local handicrafts, spices, and colonial-era architecture.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Kochi%2C_Fishing_nets_at_sunset%2C_Kerala%2C_India.jpg/500px-Kochi%2C_Fishing_nets_at_sunset%2C_Kerala%2C_India.jpg',
  },
  Chandigarh: {
    customs:
      'Greet with "Sat Sri Akal" or "Namaste". Punjabi culture is high-spirited and loves hearty meals and conversations.',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'Sector 17 Market', localName: 'ਸੈਕਟਰ 17 ਮਾਰਕੀਟ', description: 'The city\'s prime pedestrian plaza with high-end shops, local boutiques, and food outlets.' },
      { name: 'Shastri Market', localName: 'ਸ਼ਾਸਤਰੀ ਮਾਰਕੀਟ', description: 'A popular local bargain market offering clothes, accessories, and Punjabi Phulkari suits.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Chandigarh_Rock_Garden_4.jpg/500px-Chandigarh_Rock_Garden_4.jpg',
  },
  Bhubaneswar: {
    customs:
      'Greet with "Namaskar". Odisha culture is very peaceful and centered around Lord Jagannath temple customs.',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'Market Building', localName: 'ମାର୍କେଟ୍ ବିଲ୍ଡିଂ', description: 'The most popular shopping complex in the city for local handlooms like Sambalpuri sarees.' },
      { name: 'Ekamra Haat', localName: 'ଏକାମ୍ର ହାଟ', description: 'A beautiful artisan village displaying local stone carvings, pattachitra paintings, and terracotta.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Lingaraj_Temple_%2C_Bhubaneswar.jpg/500px-Lingaraj_Temple_%2C_Bhubaneswar.jpg',
  },
  Guwahati: {
    customs:
      'Greet with "Namaskar". Respecting the Assamese traditional "Gamosa" (sacred cloth) is an integral part of welcoming guests.',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'Fancy Bazaar', localName: 'ಫ್ಯಾನ್ಸಿ ಬಜಾರ್', description: 'The main shopping district, famous for Assamese Mekhela Chador, local silk (Muga, Pat), and tea.' },
      { name: 'Paltan Bazaar', localName: 'ಪಲ್ಟನ್ ಬಜಾರ್', description: 'A busy transport and commercial hub known for local bamboo and cane handicrafts.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Kamakhya_Temple_-_DEV_8829.jpg/500px-Kamakhya_Temple_-_DEV_8829.jpg',
  },
  Varanasi: {
    customs:
      'Greet with "Har Har Mahadev" or "Namaste". Varanasi is a deeply religious town; respect river Ganga rituals and aarti ceremonies.',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'Vishwanath Gali', localName: 'विश्वनाथ गली', description: 'A vibrant lane leading to the Kashi Vishwanath temple, packed with wooden toys, bangles, and local sweets.' },
      { name: 'Godowlia', localName: 'गदौलिया', description: 'Busy junctions famous for Banarasi silk sarees, brassware, and local street food.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Dasaswamedh_ghat-varanasi_india-andres_larin.jpg/500px-Dasaswamedh_ghat-varanasi_india-andres_larin.jpg',
  },
  Patna: {
    customs:
      'Greet with "Pranam" or "Namaste". Respect the deep historical heritage and traditional family values in Bihar.',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'Maurya Lok', localName: 'मौर्या लोक', description: 'One of the oldest and largest shopping complexes in Patna, popular for local clothing, foods, and hangouts.' },
      { name: 'Patna Market', localName: 'पटना मार्केट', description: 'A historic traditional market offering local handicrafts, Madhubani paintings, and Bihar textiles.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Golghar_%E0%A5%AA.jpg/500px-Golghar_%E0%A5%AA.jpg',
  },
  Mysuru: {
    customs:
      'Greet with a polite "Namaskāra". Respect the royal heritage and historical structures of Mysore Palace.',
    customsImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Namaste.jpg/500px-Namaste.jpg',
    markets: [
      { name: 'Devaraja Market', localName: 'ದೇವರಾಜ ಮಾರುಕಟ್ಟೆ', description: 'A historic, vibrant heritage bazaar famous for fresh flowers, Mysore sandalwood perfumes, and local incense.' },
      { name: 'Sayyaji Rao Road', localName: 'ಸಯ್ಯಾಜಿ ರಾವ್ ರಸ್ತೆ', description: 'A major commercial street lined with authentic Mysore Silk saree emporiums and traditional sweet shops.' },
    ],
    marketImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mysore_Palace_Morning.jpg/500px-Mysore_Palace_Morning.jpg',
  },
};

// Resolve a city to its phrase-guide entry, falling back to DEFAULT_CITY.
// `resolvedCity` is the city the returned data actually belongs to, so headers
// can label the content correctly instead of showing a city we have no data for.
export function getPhraseGuide(cityName) {
  if (CITY_PHRASE_GUIDE[cityName]) {
    return { ...CITY_PHRASE_GUIDE[cityName], resolvedCity: cityName };
  }
  return { ...CITY_PHRASE_GUIDE[DEFAULT_CITY], resolvedCity: DEFAULT_CITY };
}
