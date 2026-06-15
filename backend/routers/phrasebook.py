"""
Phrasebook router.
Public read, authenticated write.
"""

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional
from auth import get_supabase_client, get_current_user, require_auth

router = APIRouter()

PHRASEBOOK_FALLBACK = {
    "Greetings": [
        {"id": 1, "english": "Hello / Good Morning", "translations": {
            "kan_Knda": {"text": "ನಮಸ್ಕಾರ", "pronunciation": "Namaskāra"},
            "hin_Deva": {"text": "नमस्ते", "pronunciation": "Namaste"},
            "tam_Taml": {"text": "வணக்கம்", "pronunciation": "Vanakkam"},
            "guj_Gujr": {"text": "નમસ્તે", "pronunciation": "Namaste"},
            "ben_Beng": {"text": "নমস্কার", "pronunciation": "Nomoshkar"},
            "tel_Telu": {"text": "నమస్కారం", "pronunciation": "Namaskāram"},
            "mal_Mlym": {"text": "നമസ്കാരം", "pronunciation": "Namaskāram"},
        }},
        {"id": 2, "english": "Thank you", "translations": {
            "kan_Knda": {"text": "ಧನ್ಯವಾದ", "pronunciation": "Dhanyavāda"},
            "hin_Deva": {"text": "धन्यवाद", "pronunciation": "Dhanyavād"},
            "tam_Taml": {"text": "நன்றி", "pronunciation": "Nandri"},
            "guj_Gujr": {"text": "આભાર", "pronunciation": "Aabhaar"},
            "ben_Beng": {"text": "ধন্যবাদ", "pronunciation": "Dhonnobad"},
            "tel_Telu": {"text": "ధన్యవాదాలు", "pronunciation": "Dhanyavādālu"},
            "mal_Mlym": {"text": "നന്ദി", "pronunciation": "Nandi"},
        }},
        {"id": 3, "english": "Good night", "translations": {
            "kan_Knda": {"text": "ಶುಭ ರಾತ್ರಿ", "pronunciation": "Śubha rātri"},
            "hin_Deva": {"text": "शुभ रात्रि", "pronunciation": "Shubh rātri"},
            "tam_Taml": {"text": "இனிய இரவு", "pronunciation": "Iniya iravu"},
            "guj_Gujr": {"text": "શુભ રાત્રી", "pronunciation": "Shubh rātrī"},
        }},
        {"id": 4, "english": "How are you?", "translations": {
            "kan_Knda": {"text": "ಹೇಗಿದ್ದೀರಾ?", "pronunciation": "Hēgiddīrā?"},
            "hin_Deva": {"text": "आप कैसे हैं?", "pronunciation": "Aap kaise hain?"},
            "tam_Taml": {"text": "எப்படி இருக்கீர்கள்?", "pronunciation": "Eppadi irukkīrgal?"},
            "guj_Gujr": {"text": "તમે કેમ છો?", "pronunciation": "Tame kem chho?"},
        }},
    ],
    "Food": [
        {"id": 5, "english": "I am hungry", "translations": {
            "kan_Knda": {"text": "ನನಗೆ ಹಸಿವಾಗಿದೆ", "pronunciation": "Nanage hasivāgide"},
            "hin_Deva": {"text": "मुझे भूख लगी है", "pronunciation": "Mujhe bhookh lagi hai"},
            "tam_Taml": {"text": "எனக்கு பசிக்கிறது", "pronunciation": "Enakku pasikkiradhu"},
            "guj_Gujr": {"text": "મને ભૂખ લાગી છે", "pronunciation": "Mane bhookh lāgī chhe"},
        }},
        {"id": 6, "english": "Give me water", "translations": {
            "kan_Knda": {"text": "ನನಗೆ ನೀರು ಕೊಡಿ", "pronunciation": "Nanage nīru koḍi"},
            "hin_Deva": {"text": "मुझे पानी दो", "pronunciation": "Mujhe pānī do"},
            "tam_Taml": {"text": "எனக்கு தண்ணீர் கொடுங்கள்", "pronunciation": "Enakku thannīr kodungal"},
            "guj_Gujr": {"text": "મને પાણી આપો", "pronunciation": "Mane pāṇī āpo"},
        }},
        {"id": 7, "english": "Is it spicy?", "translations": {
            "kan_Knda": {"text": "ಇದು ಖಾರವೇ?", "pronunciation": "Idu khāravē?"},
            "hin_Deva": {"text": "क्या यह तीखा है?", "pronunciation": "Kya yah tīkhā hai?"},
            "tam_Taml": {"text": "இது காரமா?", "pronunciation": "Idhu kāramā?"},
        }},
    ],
    "Travel": [
        {"id": 8, "english": "Where is the temple?", "translations": {
            "kan_Knda": {"text": "ದೇವಸ್ಥಾನ ಎಲ್ಲಿದೆ?", "pronunciation": "Dēvasthāna ellide?"},
            "hin_Deva": {"text": "मंदिर कहाँ है?", "pronunciation": "Mandir kahān hai?"},
            "tam_Taml": {"text": "கோவில் எங்கே?", "pronunciation": "Kōvil engkē?"},
        }},
        {"id": 9, "english": "Go left", "translations": {
            "kan_Knda": {"text": "ಎಡಕ್ಕೆ ಹೋಗಿ", "pronunciation": "Eḍakke hōgi"},
            "hin_Deva": {"text": "बाएं जाइए", "pronunciation": "Bāyein jāiye"},
        }},
        {"id": 10, "english": "Go right", "translations": {
            "kan_Knda": {"text": "ಬಲಕ್ಕೆ ಹೋಗಿ", "pronunciation": "Balakke hōgi"},
            "hin_Deva": {"text": "दाएं जाइए", "pronunciation": "Dāyein jāiye"},
        }},
    ],
    "Emergency": [
        {"id": 11, "english": "Help me", "translations": {
            "kan_Knda": {"text": "ನನಗೆ ಸಹಾಯ ಮಾಡಿ", "pronunciation": "Nanage sahāya māḍi"},
            "hin_Deva": {"text": "मेरी मदद करो", "pronunciation": "Merī madad karo"},
            "tam_Taml": {"text": "எனக்கு உதவுங்கள்", "pronunciation": "Enakku udhavungal"},
        }},
        {"id": 12, "english": "Call a doctor", "translations": {
            "kan_Knda": {"text": "ವೈದ್ಯರನ್ನು ಕರೆಯಿರಿ", "pronunciation": "Vaidyarannu kareyiri"},
            "hin_Deva": {"text": "डॉक्टर को बुलाओ", "pronunciation": "Doctor ko bulāo"},
        }},
        {"id": 13, "english": "I am lost", "translations": {
            "kan_Knda": {"text": "ನಾನು ದಾರಿ ತಪ್ಪಿದ್ದೇನೆ", "pronunciation": "Nānu dāri tappiddēne"},
            "hin_Deva": {"text": "मैं रास्ता भूल गया हूँ", "pronunciation": "Main rāstā bhool gayā hoon"},
        }},
    ],
    "Shopping": [
        {"id": 14, "english": "How much does this cost?", "translations": {
            "kan_Knda": {"text": "ಇದರ ಬೆಲೆ ಎಷ್ಟು?", "pronunciation": "Idara bele eṣṭu?"},
            "hin_Deva": {"text": "इसकी कीमत क्या है?", "pronunciation": "Iskī kīmat kya hai?"},
            "tam_Taml": {"text": "இதன் விலை என்ன?", "pronunciation": "Idhan vilai enna?"},
        }},
        {"id": 15, "english": "Very expensive", "translations": {
            "kan_Knda": {"text": "ತುಂಬಾ ದುಬಾರಿ", "pronunciation": "Tumbā dubāri"},
            "hin_Deva": {"text": "बहुत महंगा", "pronunciation": "Bahut mahangā"},
        }},
        {"id": 16, "english": "Please reduce the price", "translations": {
            "kan_Knda": {"text": "ದಯವಿಟ್ಟು ಬೆಲೆ ಕಡಿಮೆ ಮಾಡಿ", "pronunciation": "Dayaviṭṭu bele kaḍime māḍi"},
            "hin_Deva": {"text": "कृपया कीमत कम करें", "pronunciation": "Kripayā kīmat kam karein"},
        }},
    ],
}


class SavePhraseRequest(BaseModel):
    source_lang: str
    target_lang: str
    source_text: str
    translated_text: str
    pronunciation: Optional[str] = None


@router.get("/phrasebook")
async def get_phrasebook():
    """Get all phrasebook categories and phrases."""
    try:
        supabase = get_supabase_client()

        categories_result = supabase.table("phrasebook_categories").select("*").execute()
        phrases_result = supabase.table("phrasebook_phrases").select("*").execute()

        if phrases_result.data and len(phrases_result.data) > 0:
            # Group phrases by category
            grouped = {}
            for phrase in phrases_result.data:
                cat = phrase.get("category_id", "Other")
                if cat not in grouped:
                    grouped[cat] = []
                grouped[cat].append(phrase)
            return grouped

    except Exception as e:
        print(f"[Phrasebook] Supabase fetch failed: {e}")

    return PHRASEBOOK_FALLBACK


@router.post("/phrasebook/save")
async def save_phrase(
    phrase: SavePhraseRequest,
    user_id: str = Depends(require_auth),
):
    """Save a user's custom phrase to their phrasebook."""
    try:
        supabase = get_supabase_client()
        result = supabase.table("user_phrases").insert({
            "user_id": user_id,
            "source_lang": phrase.source_lang,
            "target_lang": phrase.target_lang,
            "source_text": phrase.source_text,
            "translated_text": phrase.translated_text,
            "pronunciation": phrase.pronunciation,
        }).execute()

        return {"success": True, "id": result.data[0]["id"] if result.data else None}
    except Exception as e:
        raise Exception(f"Failed to save phrase: {e}")


@router.get("/phrasebook/user")
async def get_user_phrases(user_id: str = Depends(require_auth)):
    """Get a user's saved custom phrases."""
    try:
        supabase = get_supabase_client()
        result = (
            supabase.table("user_phrases")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .execute()
        )
        return result.data or []
    except Exception as e:
        print(f"[Phrasebook] User phrases fetch failed: {e}")
        return []
