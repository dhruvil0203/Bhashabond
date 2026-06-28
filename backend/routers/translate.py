"""
Translation API providing dynamic translation for all Indian Scheduled Languages.

Priority order:
  1. Google Cloud Translation API (if GOOGLE_TRANSLATE_API_KEY is set)
  2. Google Gemini API (free, no billing needed, supports all Indian languages)
  3. Free Google Translate endpoint (unofficial, blocked from some cloud providers)
  4. MyMemory free translation API (fallback — low quality for Indian languages)
"""

import os
import httpx
import sqlite3
from typing import Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# Google Cloud Translation API key (optional — free endpoint used as fallback)
GOOGLE_TRANSLATE_API_KEY = os.getenv("GOOGLE_TRANSLATE_API_KEY", "")

# Google Gemini API Key (free, no billing account needed)
# Get one: https://aistudio.google.com/apikey
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# SQLite Cache database file
CACHE_DB_PATH = os.path.join(os.path.dirname(__file__), "..", "translation_cache.db")

def init_cache_db():
    try:
        conn = sqlite3.connect(CACHE_DB_PATH)
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS translation_cache (
                source_lang TEXT,
                target_lang TEXT,
                source_text TEXT,
                translated_text TEXT,
                source_provider TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (source_lang, target_lang, source_text)
            )
        """)
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"[Cache DB] Initialization failed: {e}")

# Initialize the cache database
init_cache_db()

def get_cached_translation(source_lang: str, target_lang: str, text: str) -> Optional[dict]:
    try:
        conn = sqlite3.connect(CACHE_DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT translated_text, source_provider FROM translation_cache WHERE source_lang = ? AND target_lang = ? AND source_text = ?",
            (source_lang, target_lang, text.strip().lower())
        )
        row = cursor.fetchone()
        conn.close()
        if row:
            return {"translated_text": row[0], "source": row[1]}
    except Exception as e:
        print(f"[Cache DB] Get failed: {e}")
    return None

def set_cached_translation(source_lang: str, target_lang: str, text: str, translated_text: str, provider: str):
    try:
        conn = sqlite3.connect(CACHE_DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT OR REPLACE INTO translation_cache (source_lang, target_lang, source_text, translated_text, source_provider)
            VALUES (?, ?, ?, ?, ?)
            """,
            (source_lang, target_lang, text.strip().lower(), translated_text, provider)
        )
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"[Cache DB] Set failed: {e}")

# Language code mapping: app internal codes → ISO 639-1 / BCP-47 codes used by Google Translate
GOOGLE_LANG_MAP = {
    'hin_Deva': 'hi',    # Hindi
    'ben_Beng': 'bn',    # Bengali
    'tel_Telu': 'te',    # Telugu
    'mar_Deva': 'mr',    # Marathi
    'tam_Taml': 'ta',    # Tamil
    'guj_Gujr': 'gu',    # Gujarati
    'kan_Knda': 'kn',    # Kannada
    'mal_Mlym': 'ml',    # Malayalam
    'pan_Guru': 'pa',    # Punjabi
    'ory_Orya': 'or',    # Odia
    'asm_Beng': 'as',    # Assamese
    'mai_Deva': 'mai',   # Maithili
    'urd_Arab': 'ur',    # Urdu
    'snd_Arab': 'sd',    # Sindhi
    'kok_Deva': 'gom',   # Konkani (Goan Konkani on Google)
    'npi_Deva': 'ne',    # Nepali
    'mni_Beng': 'mni-Mtei',  # Manipuri (Meitei script)
    'brx_Deva': 'brx',   # Bodo (limited support on Google)
    'san_Deva': 'sa',    # Sanskrit
    'kas_Arab': 'ks',    # Kashmiri
    'doi_Deva': 'doi',   # Dogri (limited support on Google)
    'sat_Olck': 'sat',   # Santali (limited support on Google)
    'eng_Latn': 'en',    # English
}


# Reverse map: ISO language code → human-readable name for Gemini prompt
LANG_NAMES = {v: k for k, v in GOOGLE_LANG_MAP.items()}


class TranslateRequest(BaseModel):
    text: str
    source_lang: str  # App language code (e.g., 'guj_Gujr')
    target_lang: str  # App language code (e.g., 'ben_Beng')


class TranslateResponse(BaseModel):
    translated_text: str
    source: str  # 'google_cloud', 'gemini', 'google_free', or 'mymemory'


async def translate_via_google_cloud(text: str, source_code: str, target_code: str) -> str:
    """
    Translate using official Google Cloud Translation API v2.
    Requires GOOGLE_TRANSLATE_API_KEY to be set.
    Supports 100+ languages including all major Indian languages.
    """
    url = "https://translation.googleapis.com/language/translate/v2"
    params = {
        "key": GOOGLE_TRANSLATE_API_KEY,
        "q": text,
        "source": source_code,
        "target": target_code,
        "format": "text",
    }

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "application/json",
    }

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.post(url, params=params, headers=headers)

        if response.status_code != 200:
            error_body = response.text
            raise Exception(f"Google Cloud API error {response.status_code}: {error_body}")

        data = response.json()
        translated_text = (
            data.get("data", {})
            .get("translations", [{}])[0]
            .get("translatedText", "")
        )

        if not translated_text:
            raise Exception("Empty translation response from Google Cloud API")

        return translated_text


async def translate_via_mymemory(text: str, source_code: str, target_code: str) -> str:
    """
    Fallback: MyMemory free translation API (no API key needed).
    Works reliably from cloud servers unlike Google's unofficial endpoints.
    """
    url = "https://api.mymemory.translated.net/get"
    params = {
        "q": text,
        "langpair": f"{source_code}|{target_code}",
    }

    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.get(url, params=params)

        if response.status_code != 200:
            raise Exception(f"MyMemory API returned status {response.status_code}")

        data = response.json()
        translated_text = data.get("responseData", {}).get("translatedText", "")

        if not translated_text:
            raise Exception("Empty translation response from MyMemory API")

        return translated_text


async def translate_via_gemini(text: str, source_code: str, target_code: str) -> str:
    """
    Translate using Google Gemini API (free, no billing account needed).
    Supports all Indian languages with high quality.
    Free tier: 60 requests/min, 1,500 requests/day.
    """
    import urllib.parse

    api_key = GEMINI_API_KEY
    if not api_key:
        raise Exception("GEMINI_API_KEY not configured")

    source_name = LANG_NAMES.get(source_code, source_code)
    target_name = LANG_NAMES.get(target_code, target_code)

    prompt = f"Translate the following {source_name} text to {target_name}. Output only the translated text, nothing else.\n\n{text}"

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"

    body = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }

    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.post(url, json=body)

        if response.status_code != 200:
            raise Exception(f"Gemini API returned status {response.status_code}: {response.text}")

        data = response.json()
        candidates = data.get("candidates", [])
        if not candidates:
            raise Exception("Empty candidates from Gemini API")

        translated_text = (
            candidates[0]
            .get("content", {})
            .get("parts", [{}])[0]
            .get("text", "")
        )

        if not translated_text:
            raise Exception("Empty translation response from Gemini")

        return translated_text.strip()


async def translate_via_google_free(text: str, source_code: str, target_code: str) -> str:
    """
    Free Google Translate endpoint via clients5 (works from cloud servers).
    """
    url = "https://clients5.google.com/translate_a/t"
    params = {
        "client": "dict-chrome-ex",
        "sl": source_code,
        "tl": target_code,
        "dt": "t",
        "q": text,
    }
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    }

    async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
        response = await client.get(url, params=params, headers=headers)

        if response.status_code != 200:
            raise Exception(f"Google free endpoint returned status {response.status_code}")

        data = response.json()

        # clients5 returns ["translated text"] — a simple string array
        if isinstance(data, list) and len(data) > 0:
            if isinstance(data[0], str):
                translated_text = data[0]
            elif isinstance(data[0], list):
                # translate_a/single returns nested: [["text", null, ...], ...]
                segments = [seg[0] for seg in data[0] if seg and len(seg) > 0 and seg[0]]
                translated_text = "".join(segments)
            else:
                raise Exception("Unexpected response format from Google free endpoint")
        else:
            raise Exception("Empty response from Google free endpoint")

        if not translated_text:
            raise Exception("Empty translation response from Google free endpoint")

        return translated_text


@router.post("/translate", response_model=TranslateResponse)
async def translate_text(request: TranslateRequest):
    """
    Translate text dynamically.
    Priority: Google Cloud API (if key set) → Gemini API (free) → Google free → MyMemory.
    Supports all 22 Indian Scheduled Languages + English.
    """
    source_code = GOOGLE_LANG_MAP.get(request.source_lang)
    target_code = GOOGLE_LANG_MAP.get(request.target_lang)

    if not source_code or not target_code:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported language pair: {request.source_lang} → {request.target_lang}"
        )

    # Same language — return input unchanged
    if source_code == target_code:
        return TranslateResponse(translated_text=request.text, source="google_cloud")

    # ── Check Local Cache First ───────────────────────────────────────────────
    cached = get_cached_translation(request.source_lang, request.target_lang, request.text)
    if cached:
        print(f"[Translate] Cache Hit: {request.source_lang} -> {request.target_lang} for text '{request.text[:30]}...'")
        return TranslateResponse(translated_text=cached["translated_text"], source=cached["source"])

    # ── Path 1: Official Google Cloud Translation API ────────────────────────────
    if GOOGLE_TRANSLATE_API_KEY:
        try:
            translated = await translate_via_google_cloud(
                request.text, source_code, target_code
            )
            print(f"[Translate] Google Cloud API: {request.source_lang} -> {request.target_lang}")
            set_cached_translation(request.source_lang, request.target_lang, request.text, translated, "google_cloud")
            return TranslateResponse(translated_text=translated, source="google_cloud")
        except Exception as e:
            print(f"[Translate] Google Cloud API failed: {e}. Trying free fallback...")

    # ── Path 2: Google Gemini API (free, works from Render) ────────────────
    try:
        translated = await translate_via_gemini(
            request.text, source_code, target_code
        )
        print(f"[Translate] Gemini API: {request.source_lang} -> {request.target_lang}")
        set_cached_translation(request.source_lang, request.target_lang, request.text, translated, "gemini")
        return TranslateResponse(translated_text=translated, source="gemini")
    except Exception as e:
        print(f"[Translate] Gemini API failed: {e}. Trying Google free...")

    # ── Path 3: Free Google Translate endpoint ───────────────────────────────
    try:
        translated = await translate_via_google_free(
            request.text, source_code, target_code
        )
        print(f"[Translate] Free Google Translate: {request.source_lang} -> {request.target_lang}")
        set_cached_translation(request.source_lang, request.target_lang, request.text, translated, "google_free")
        return TranslateResponse(translated_text=translated, source="google_free")
    except Exception as e:
        print(f"[Translate] Google free endpoint failed: {e}. Trying MyMemory...")

    # ── Path 4: MyMemory free translation API ──────────────────────────────
    try:
        translated = await translate_via_mymemory(
            request.text, source_code, target_code
        )
        print(f"[Translate] MyMemory API: {request.source_lang} -> {request.target_lang}")
        set_cached_translation(request.source_lang, request.target_lang, request.text, translated, "mymemory")
        return TranslateResponse(translated_text=translated, source="mymemory")
    except Exception as e:
        print(f"[Translate] All translation attempts failed: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Translation failed: {str(e)}"
        )
