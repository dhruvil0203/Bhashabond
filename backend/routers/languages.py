"""
Languages and cities router.
Public endpoints — no auth required.
"""

from fastapi import APIRouter
from auth import get_supabase_client

router = APIRouter()

# Hardcoded fallback data (used if Supabase is unreachable)
LANGUAGES_FALLBACK = [
    {"id": "en", "name": "English", "native": "English", "icon": "🌐", "indictrans_code": "eng_Latn"},
    {"id": "hi", "name": "Hindi", "native": "हिन्दी", "icon": "🪔", "indictrans_code": "hin_Deva"},
    {"id": "bn", "name": "Bengali", "native": "বাংলা", "icon": "🌾", "indictrans_code": "ben_Beng"},
    {"id": "te", "name": "Telugu", "native": "తెలుగు", "icon": "🏛️", "indictrans_code": "tel_Telu"},
    {"id": "mr", "name": "Marathi", "native": "मराठी", "icon": "🏰", "indictrans_code": "mar_Deva"},
    {"id": "ta", "name": "Tamil", "native": "தமிழ்", "icon": "🌴", "indictrans_code": "tam_Taml"},
    {"id": "gu", "name": "Gujarati", "native": "ગુજરાતી", "icon": "🦁", "indictrans_code": "guj_Gujr"},
    {"id": "kn", "name": "Kannada", "native": "ಕನ್ನಡ", "icon": "🌺", "indictrans_code": "kan_Knda"},
    {"id": "ml", "name": "Malayalam", "native": "മലയാളം", "icon": "🥥", "indictrans_code": "mal_Mlym"},
    {"id": "pa", "name": "Punjabi", "native": "ਪੰਜਾਬੀ", "icon": "🌾", "indictrans_code": "pan_Guru"},
    {"id": "or", "name": "Odia", "native": "ଓଡ଼ିଆ", "icon": "🛞", "indictrans_code": "ory_Orya"},
    {"id": "as", "name": "Assamese", "native": "অসমীয়া", "icon": "🦏", "indictrans_code": "asm_Beng"},
    {"id": "mai", "name": "Maithili", "native": "মৈথিলী", "icon": "🪷", "indictrans_code": "mai_Deva"},
    {"id": "ur", "name": "Urdu", "native": "اردو", "icon": "🕌", "indictrans_code": "urd_Arab"},
    {"id": "sd", "name": "Sindhi", "native": "سنڌي", "icon": "🏜️", "indictrans_code": "snd_Arab"},
    {"id": "kok", "name": "Konkani", "native": "कोंकणी", "icon": "🏖️", "indictrans_code": "kok_Deva"},
    {"id": "ne", "name": "Nepali", "native": "नेपाली", "icon": "🏔️", "indictrans_code": "npi_Deva"},
    {"id": "mni", "name": "Manipuri", "native": "মণিপুরী", "icon": "💃", "indictrans_code": "mni_Beng"},
    {"id": "brx", "name": "Bodo", "native": "बड़ो", "icon": "🌳", "indictrans_code": "brx_Deva"},
    {"id": "sa", "name": "Sanskrit", "native": "संस्कृतम्", "icon": "📜", "indictrans_code": "san_Deva"},
    {"id": "ks", "name": "Kashmiri", "native": "كٲشُر", "icon": "⛵", "indictrans_code": "kas_Arab"},
]

CITIES_FALLBACK = [
    {"name": "Mumbai", "state": "Maharashtra", "language_id": "mr"},
    {"name": "Delhi", "state": "Delhi", "language_id": "hi"},
    {"name": "Bengaluru", "state": "Karnataka", "language_id": "kn"},
    {"name": "Chennai", "state": "Tamil Nadu", "language_id": "ta"},
    {"name": "Kolkata", "state": "West Bengal", "language_id": "bn"},
    {"name": "Hyderabad", "state": "Telangana", "language_id": "te"},
    {"name": "Ahmedabad", "state": "Gujarat", "language_id": "gu"},
    {"name": "Pune", "state": "Maharashtra", "language_id": "mr"},
    {"name": "Jaipur", "state": "Rajasthan", "language_id": "hi"},
    {"name": "Lucknow", "state": "Uttar Pradesh", "language_id": "hi"},
    {"name": "Kochi", "state": "Kerala", "language_id": "ml"},
    {"name": "Chandigarh", "state": "Punjab", "language_id": "pa"},
    {"name": "Bhubaneswar", "state": "Odisha", "language_id": "or"},
    {"name": "Guwahati", "state": "Assam", "language_id": "as"},
    {"name": "Varanasi", "state": "Uttar Pradesh", "language_id": "hi"},
    {"name": "Panaji", "state": "Goa", "language_id": "kok"},
    {"name": "Srinagar", "state": "Jammu & Kashmir", "language_id": "ks"},
    {"name": "Imphal", "state": "Manipur", "language_id": "mni"},
    {"name": "Patna", "state": "Bihar", "language_id": "hi"},
    {"name": "Mysuru", "state": "Karnataka", "language_id": "kn"},
]


@router.get("/languages")
async def get_languages():
    """Get all supported languages."""
    try:
        supabase = get_supabase_client()
        result = supabase.table("languages").select("*").execute()
        if result.data and len(result.data) > 0:
            return result.data
    except Exception as e:
        print(f"[Languages] Supabase fetch failed: {e}")

    return LANGUAGES_FALLBACK


@router.get("/cities")
async def get_cities():
    """Get all cities with their language mappings."""
    try:
        supabase = get_supabase_client()
        result = supabase.table("cities").select("*").execute()
        if result.data and len(result.data) > 0:
            return result.data
    except Exception as e:
        print(f"[Cities] Supabase fetch failed: {e}")

    return CITIES_FALLBACK
