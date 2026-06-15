"""
Translation history sync router.
All endpoints require authentication.
"""

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List, Optional
from auth import get_supabase_client, require_auth

router = APIRouter()


class TranslationEntry(BaseModel):
    source_lang: str
    target_lang: str
    source_text: str
    translated_text: str
    pronunciation: Optional[str] = None
    created_at: Optional[str] = None


class SyncRequest(BaseModel):
    translations: List[TranslationEntry]


@router.post("/history/sync")
async def sync_history(
    request: SyncRequest,
    user_id: str = Depends(require_auth),
):
    """Bulk sync translation history from device to Supabase."""
    try:
        supabase = get_supabase_client()

        entries = [
            {
                "user_id": user_id,
                "source_lang": t.source_lang,
                "target_lang": t.target_lang,
                "source_text": t.source_text,
                "translated_text": t.translated_text,
                "pronunciation": t.pronunciation,
                "created_at": t.created_at,
            }
            for t in request.translations
        ]

        if entries:
            supabase.table("translation_history").insert(entries).execute()

        return {"success": True, "synced": len(entries)}
    except Exception as e:
        print(f"[History] Sync failed: {e}")
        return {"success": False, "error": str(e)}


@router.get("/history")
async def get_history(
    user_id: str = Depends(require_auth),
    limit: int = 50,
    offset: int = 0,
):
    """Get user's translation history from Supabase."""
    try:
        supabase = get_supabase_client()
        result = (
            supabase.table("translation_history")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .range(offset, offset + limit - 1)
            .execute()
        )
        return result.data or []
    except Exception as e:
        print(f"[History] Fetch failed: {e}")
        return []
