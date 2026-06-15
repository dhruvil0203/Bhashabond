/**
 * Romanization/transliteration service.
 * Converts text in Indian scripts to Latin (romanized) pronunciation.
 * Uses character-level mapping tables for each supported script.
 */

// ─── Script Detection ───

const SCRIPT_RANGES = {
  hin_Deva: { start: 0x0900, end: 0x097F, name: 'Devanagari' },
  ben_Beng: { start: 0x0980, end: 0x09FF, name: 'Bengali' },
  guj_Gujr: { start: 0x0A80, end: 0x0AFF, name: 'Gujarati' },
  pan_Guru: { start: 0x0A00, end: 0x0A7F, name: 'Gurmukhi' },
  ory_Orya: { start: 0x0B00, end: 0x0B7F, name: 'Oriya' },
  tam_Taml: { start: 0x0B80, end: 0x0BFF, name: 'Tamil' },
  tel_Telu: { start: 0x0C00, end: 0x0C7F, name: 'Telugu' },
  kan_Knda: { start: 0x0C80, end: 0x0CFF, name: 'Kannada' },
  mal_Mlym: { start: 0x0D00, end: 0x0D7F, name: 'Malayalam' },
};

/**
 * Devanagari → Latin romanization mapping
 * Used for Hindi, Marathi, Sanskrit, Konkani, Nepali, Maithili, Bodo
 */
const DEVANAGARI_MAP = {
  // Vowels
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
  'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऋ': 'ri', 'ॠ': 'ree',
  // Vowel marks
  'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ृ': 'ri',
  // Consonants
  'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
  'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
  'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
  'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
  'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
  'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha',
  'ष': 'sha', 'स': 'sa', 'ह': 'ha',
  // Special
  'ं': 'n', 'ः': 'h', '्': '', 'ँ': 'n',
  'क्ष': 'ksha', 'त्र': 'tra', 'ज्ञ': 'gya',
};

/**
 * Kannada → Latin romanization mapping
 */
const KANNADA_MAP = {
  // Vowels
  'ಅ': 'a', 'ಆ': 'aa', 'ಇ': 'i', 'ಈ': 'ee', 'ಉ': 'u', 'ಊ': 'oo',
  'ಎ': 'e', 'ಏ': 'e', 'ಐ': 'ai', 'ಒ': 'o', 'ಓ': 'o', 'ಔ': 'au',
  // Vowel marks
  'ಾ': 'aa', 'ಿ': 'i', 'ೀ': 'ee', 'ು': 'u', 'ೂ': 'oo',
  'ೆ': 'e', 'ೇ': 'e', 'ೈ': 'ai', 'ೊ': 'o', 'ೋ': 'o', 'ೌ': 'au',
  // Consonants
  'ಕ': 'ka', 'ಖ': 'kha', 'ಗ': 'ga', 'ಘ': 'gha', 'ಙ': 'nga',
  'ಚ': 'cha', 'ಛ': 'chha', 'ಜ': 'ja', 'ಝ': 'jha', 'ಞ': 'nya',
  'ಟ': 'ta', 'ಠ': 'tha', 'ಡ': 'da', 'ಢ': 'dha', 'ಣ': 'na',
  'ತ': 'ta', 'ಥ': 'tha', 'ದ': 'da', 'ಧ': 'dha', 'ನ': 'na',
  'ಪ': 'pa', 'ಫ': 'pha', 'ಬ': 'ba', 'ಭ': 'bha', 'ಮ': 'ma',
  'ಯ': 'ya', 'ರ': 'ra', 'ಲ': 'la', 'ವ': 'va', 'ಶ': 'sha',
  'ಷ': 'sha', 'ಸ': 'sa', 'ಹ': 'ha', 'ಳ': 'la',
  // Special
  'ಂ': 'n', 'ಃ': 'h', '್': '',
};

/**
 * Tamil → Latin romanization mapping
 */
const TAMIL_MAP = {
  // Vowels
  'அ': 'a', 'ஆ': 'aa', 'இ': 'i', 'ஈ': 'ee', 'உ': 'u', 'ஊ': 'oo',
  'எ': 'e', 'ஏ': 'e', 'ஐ': 'ai', 'ஒ': 'o', 'ஓ': 'o', 'ஔ': 'au',
  // Vowel marks
  'ா': 'aa', 'ி': 'i', 'ீ': 'ee', 'ு': 'u', 'ூ': 'oo',
  'ெ': 'e', 'ே': 'e', 'ை': 'ai', 'ொ': 'o', 'ோ': 'o', 'ௌ': 'au',
  // Consonants
  'க': 'ka', 'ங': 'nga', 'ச': 'cha', 'ஞ': 'nya',
  'ட': 'ta', 'ண': 'na', 'த': 'tha', 'ந': 'na', 'ன': 'na',
  'ப': 'pa', 'ம': 'ma', 'ய': 'ya', 'ர': 'ra', 'ல': 'la',
  'வ': 'va', 'ழ': 'zha', 'ள': 'la', 'ற': 'ra', 'ஜ': 'ja',
  'ஷ': 'sha', 'ஸ': 'sa', 'ஹ': 'ha',
  // Special
  'ஂ': 'n', '்': '',
};

/**
 * Bengali → Latin romanization mapping (also used for Assamese, Manipuri)
 */
const BENGALI_MAP = {
  // Vowels
  'অ': 'o', 'আ': 'aa', 'ই': 'i', 'ঈ': 'ee', 'উ': 'u', 'ঊ': 'oo',
  'এ': 'e', 'ঐ': 'oi', 'ও': 'o', 'ঔ': 'ou', 'ঋ': 'ri',
  // Vowel marks
  'া': 'aa', 'ি': 'i', 'ী': 'ee', 'ু': 'u', 'ূ': 'oo',
  'ে': 'e', 'ৈ': 'oi', 'ো': 'o', 'ৌ': 'ou', 'ৃ': 'ri',
  // Consonants
  'ক': 'ko', 'খ': 'kho', 'গ': 'go', 'ঘ': 'gho', 'ঙ': 'ngo',
  'চ': 'cho', 'ছ': 'chho', 'জ': 'jo', 'ঝ': 'jho', 'ঞ': 'nyo',
  'ট': 'to', 'ঠ': 'tho', 'ড': 'do', 'ঢ': 'dho', 'ণ': 'no',
  'ত': 'to', 'থ': 'tho', 'দ': 'do', 'ধ': 'dho', 'ন': 'no',
  'প': 'po', 'ফ': 'pho', 'ব': 'bo', 'ভ': 'bho', 'ম': 'mo',
  'য': 'jo', 'র': 'ro', 'ল': 'lo', 'শ': 'sho', 'ষ': 'sho',
  'স': 'so', 'হ': 'ho', 'ড়': 'ro', 'ঢ়': 'rho', 'য়': 'yo',
  // Special
  'ং': 'ng', 'ঃ': 'h', '্': '', 'ঁ': 'n',
};

/**
 * Telugu → Latin romanization mapping
 */
const TELUGU_MAP = {
  'అ': 'a', 'ఆ': 'aa', 'ఇ': 'i', 'ఈ': 'ee', 'ఉ': 'u', 'ఊ': 'oo',
  'ఎ': 'e', 'ఏ': 'e', 'ఐ': 'ai', 'ఒ': 'o', 'ఓ': 'o', 'ఔ': 'au',
  'ా': 'aa', 'ి': 'i', 'ీ': 'ee', 'ు': 'u', 'ూ': 'oo',
  'ె': 'e', 'ే': 'e', 'ై': 'ai', 'ొ': 'o', 'ో': 'o', 'ౌ': 'au',
  'క': 'ka', 'ఖ': 'kha', 'గ': 'ga', 'ఘ': 'gha', 'ఙ': 'nga',
  'చ': 'cha', 'ఛ': 'chha', 'జ': 'ja', 'ఝ': 'jha', 'ఞ': 'nya',
  'ట': 'ta', 'ఠ': 'tha', 'డ': 'da', 'ఢ': 'dha', 'ణ': 'na',
  'త': 'ta', 'థ': 'tha', 'ద': 'da', 'ధ': 'dha', 'న': 'na',
  'ప': 'pa', 'ఫ': 'pha', 'బ': 'ba', 'భ': 'bha', 'మ': 'ma',
  'య': 'ya', 'ర': 'ra', 'ల': 'la', 'వ': 'va', 'శ': 'sha',
  'ష': 'sha', 'స': 'sa', 'హ': 'ha', 'ళ': 'la',
  'ం': 'n', 'ః': 'h', '్': '',
};

/**
 * Gujarati → Latin romanization mapping
 */
const GUJARATI_MAP = {
  'અ': 'a', 'આ': 'aa', 'ઇ': 'i', 'ઈ': 'ee', 'ઉ': 'u', 'ઊ': 'oo',
  'એ': 'e', 'ઐ': 'ai', 'ઓ': 'o', 'ઔ': 'au',
  'ા': 'aa', 'િ': 'i', 'ી': 'ee', 'ુ': 'u', 'ૂ': 'oo',
  'ે': 'e', 'ૈ': 'ai', 'ો': 'o', 'ૌ': 'au',
  'ક': 'ka', 'ખ': 'kha', 'ગ': 'ga', 'ઘ': 'gha', 'ઙ': 'nga',
  'ચ': 'cha', 'છ': 'chha', 'જ': 'ja', 'ઝ': 'jha', 'ઞ': 'nya',
  'ટ': 'ta', 'ઠ': 'tha', 'ડ': 'da', 'ઢ': 'dha', 'ણ': 'na',
  'ત': 'ta', 'થ': 'tha', 'દ': 'da', 'ધ': 'dha', 'ન': 'na',
  'પ': 'pa', 'ફ': 'pha', 'બ': 'ba', 'ભ': 'bha', 'મ': 'ma',
  'ય': 'ya', 'ર': 'ra', 'લ': 'la', 'વ': 'va', 'શ': 'sha',
  'ષ': 'sha', 'સ': 'sa', 'હ': 'ha', 'ળ': 'la',
  'ં': 'n', 'ઃ': 'h', '્': '',
};

/**
 * Malayalam → Latin romanization mapping
 */
const MALAYALAM_MAP = {
  'അ': 'a', 'ആ': 'aa', 'ഇ': 'i', 'ഈ': 'ee', 'ഉ': 'u', 'ഊ': 'oo',
  'എ': 'e', 'ഏ': 'e', 'ഐ': 'ai', 'ഒ': 'o', 'ഓ': 'o', 'ഔ': 'au',
  'ാ': 'aa', 'ി': 'i', 'ീ': 'ee', 'ു': 'u', 'ൂ': 'oo',
  'െ': 'e', 'േ': 'e', 'ൈ': 'ai', 'ൊ': 'o', 'ോ': 'o', 'ൌ': 'au',
  'ക': 'ka', 'ഖ': 'kha', 'ഗ': 'ga', 'ഘ': 'gha', 'ങ': 'nga',
  'ച': 'cha', 'ഛ': 'chha', 'ജ': 'ja', 'ഝ': 'jha', 'ഞ': 'nya',
  'ട': 'ta', 'ഠ': 'tha', 'ഡ': 'da', 'ഢ': 'dha', 'ണ': 'na',
  'ത': 'tha', 'ഥ': 'thha', 'ദ': 'da', 'ധ': 'dha', 'ന': 'na',
  'പ': 'pa', 'ഫ': 'pha', 'ബ': 'ba', 'ഭ': 'bha', 'മ': 'ma',
  'യ': 'ya', 'ര': 'ra', 'ല': 'la', 'വ': 'va', 'ശ': 'sha',
  'ഷ': 'sha', 'സ': 'sa', 'ഹ': 'ha', 'ള': 'la', 'ഴ': 'zha', 'റ': 'ra',
  'ം': 'n', 'ഃ': 'h', '്': '',
};

// Map language codes to their romanization tables
const SCRIPT_MAPS = {
  hin_Deva: DEVANAGARI_MAP,
  mar_Deva: DEVANAGARI_MAP,
  san_Deva: DEVANAGARI_MAP,
  kok_Deva: DEVANAGARI_MAP,
  npi_Deva: DEVANAGARI_MAP,
  mai_Deva: DEVANAGARI_MAP,
  brx_Deva: DEVANAGARI_MAP,
  kan_Knda: KANNADA_MAP,
  tam_Taml: TAMIL_MAP,
  ben_Beng: BENGALI_MAP,
  asm_Beng: BENGALI_MAP,
  mni_Beng: BENGALI_MAP,
  tel_Telu: TELUGU_MAP,
  guj_Gujr: GUJARATI_MAP,
  mal_Mlym: MALAYALAM_MAP,
  pan_Guru: DEVANAGARI_MAP, // Gurmukhi is structurally similar
};

/**
 * Romanize text from an Indian script to Latin characters.
 * 
 * @param {string} text - Text in Indian script
 * @param {string} langCode - IndicTrans2 language code (e.g., 'hin_Deva')
 * @returns {string} Romanized text
 */
export function romanize(text, langCode) {
  if (!text) return '';

  // If text is already Latin, return as-is
  if (/^[\x00-\x7F\s]+$/.test(text)) return text;

  const map = SCRIPT_MAPS[langCode];
  if (!map) {
    // Fallback: return original text if no mapping available
    return text;
  }

  let result = '';
  let i = 0;

  while (i < text.length) {
    // Try two-character combinations first (for compound characters)
    if (i + 1 < text.length) {
      const twoChar = text.substring(i, i + 2);
      if (map[twoChar] !== undefined) {
        result += map[twoChar];
        i += 2;
        continue;
      }
    }

    // Single character lookup
    const char = text[i];
    if (map[char] !== undefined) {
      result += map[char];
    } else if (char === ' ' || char === '\n' || char === '\t') {
      result += char;
    } else if (/[\x00-\x7F]/.test(char)) {
      // Preserve ASCII characters (numbers, punctuation)
      result += char;
    } else {
      // Unknown character — keep as-is
      result += char;
    }

    i++;
  }

  // Clean up double spaces and capitalize first letter of each sentence
  result = result
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/(^\w|\.\s+\w)/g, (match) => match.toUpperCase());

  return result;
}

/**
 * Detect the script of the input text.
 * Returns the IndicTrans2 language code hint.
 */
export function detectScript(text) {
  if (!text) return null;

  for (const [langCode, range] of Object.entries(SCRIPT_RANGES)) {
    for (const char of text) {
      const code = char.charCodeAt(0);
      if (code >= range.start && code <= range.end) {
        return langCode;
      }
    }
  }

  return null;
}
