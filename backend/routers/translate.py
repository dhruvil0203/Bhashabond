"""
Translation API using Google Cloud Translation API v2
Provides dynamic translation for all languages when the offline dictionary doesn't have a phrase.

Priority order:
  1. Google Cloud Translation API (if GOOGLE_TRANSLATE_API_KEY is set)
  2. Free Google Translate endpoint (no key required, unofficial)
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


class TranslateRequest(BaseModel):
    text: str
    source_lang: str  # App language code (e.g., 'guj_Gujr')
    target_lang: str  # App language code (e.g., 'ben_Beng')


class TranslateResponse(BaseModel):
    translated_text: str
    source: str  # 'google_cloud', 'google_free', or 'error'


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

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.post(url, params=params)

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


async def translate_via_google_free(text: str, source_code: str, target_code: str) -> str:
    """
    Fallback: free unofficial Google Translate endpoint (no API key needed).
    Less reliable but works for basic use without a billing account.
    """
    url = "https://translate.googleapis.com/translate_a/single"
    params = {
        "client": "gtx",
        "sl": source_code,
        "tl": target_code,
        "dt": "t",
        "q": text,
    }

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(url, params=params)

        if response.status_code != 200:
            raise Exception(f"Free Google Translate returned status {response.status_code}")

        data = response.json()
        segments = []
        if data and len(data) > 0 and data[0]:
            for segment in data[0]:
                if segment and len(segment) > 0 and segment[0]:
                    segments.append(segment[0])

        translated_text = "".join(segments)
        if not translated_text:
            raise Exception("Empty translation response from free Google Translate")

        return translated_text


@router.post("/translate", response_model=TranslateResponse)
async def translate_text(request: TranslateRequest):
    """
    Translate text dynamically.
    Uses Google Cloud Translation API v2 when GOOGLE_TRANSLATE_API_KEY is configured,
    otherwise falls back to the free (unofficial) Google Translate endpoint.
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

    # ── Path 2: Free unofficial Google Translate endpoint ───────────────────────
    try:
        translated = await translate_via_google_free(
            request.text, source_code, target_code
        )
        print(f"[Translate] Free Google Translate: {request.source_lang} -> {request.target_lang}")
        set_cached_translation(request.source_lang, request.target_lang, request.text, translated, "google_free")
        return TranslateResponse(translated_text=translated, source="google_free")
    except Exception as e:
        print(f"[Translate] All translation attempts failed: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Translation failed: {str(e)}"
        )
