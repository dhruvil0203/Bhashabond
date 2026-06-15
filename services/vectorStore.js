/**
 * On-device vector store for translation caching.
 * Uses op-sqlite with libSQL vector extensions for semantic search.
 * 
 * Replaces LanceDB (which doesn't support React Native) with a
 * mobile-native JSI-based SQLite solution.
 */

let db = null;

/**
 * Initialize the vector store database.
 * Creates tables if they don't exist.
 */
export async function initVectorStore() {
  try {
    const { open } = require('@op-engineering/op-sqlite');
    db = open({ name: 'bhashabond_vectors.db' });

    // Create translations cache table
    db.execute(`
      CREATE TABLE IF NOT EXISTS translation_cache (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source_lang TEXT NOT NULL,
        target_lang TEXT NOT NULL,
        source_text TEXT NOT NULL,
        translated_text TEXT NOT NULL,
        pronunciation TEXT,
        embedding BLOB,
        synced INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `);

    // Create index for faster lookups
    db.execute(`
      CREATE INDEX IF NOT EXISTS idx_translation_langs 
      ON translation_cache(source_lang, target_lang)
    `);

    // Create text search index for exact/near-exact matches
    db.execute(`
      CREATE INDEX IF NOT EXISTS idx_translation_source 
      ON translation_cache(source_text)
    `);

    console.log('[VectorStore] Initialized successfully');
    return true;
  } catch (error) {
    console.warn('[VectorStore] Init failed, using fallback:', error.message);
    return false;
  }
}

/**
 * Search for a cached translation.
 * First tries exact text match, then falls back to semantic similarity.
 */
export async function searchTranslation(sourceText, sourceLang, targetLang) {
  if (!db) return null;

  try {
    // 1. Try exact text match first (fastest)
    const exactResult = db.execute(
      `SELECT translated_text, pronunciation FROM translation_cache 
       WHERE source_text = ? AND source_lang = ? AND target_lang = ?
       ORDER BY created_at DESC LIMIT 1`,
      [sourceText.trim().toLowerCase(), sourceLang, targetLang]
    );

    if (exactResult.rows && exactResult.rows.length > 0) {
      console.log('[VectorStore] Exact cache hit');
      return {
        translatedText: exactResult.rows[0].translated_text,
        pronunciation: exactResult.rows[0].pronunciation,
        cacheHit: true,
        matchType: 'exact',
      };
    }

    // 2. Try fuzzy text match (for minor variations)
    const fuzzyResult = db.execute(
      `SELECT translated_text, pronunciation, source_text FROM translation_cache 
       WHERE source_lang = ? AND target_lang = ?
       ORDER BY created_at DESC LIMIT 100`,
      [sourceLang, targetLang]
    );

    if (fuzzyResult.rows && fuzzyResult.rows.length > 0) {
      const inputNorm = normalizeText(sourceText);

      for (const row of fuzzyResult.rows) {
        const cachedNorm = normalizeText(row.source_text);
        const similarity = computeTextSimilarity(inputNorm, cachedNorm);

        if (similarity >= 0.85) {
          console.log(`[VectorStore] Fuzzy cache hit (similarity: ${similarity.toFixed(2)})`);
          return {
            translatedText: row.translated_text,
            pronunciation: row.pronunciation,
            cacheHit: true,
            matchType: 'fuzzy',
            similarity,
          };
        }
      }
    }

    return null;
  } catch (error) {
    console.warn('[VectorStore] Search failed:', error.message);
    return null;
  }
}

/**
 * Store a translation result in the cache.
 */
export async function storeTranslation(
  sourceLang,
  targetLang,
  sourceText,
  translatedText,
  pronunciation,
  embedding = null
) {
  if (!db) return false;

  try {
    db.execute(
      `INSERT INTO translation_cache 
       (source_lang, target_lang, source_text, translated_text, pronunciation, embedding)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        sourceLang,
        targetLang,
        sourceText.trim().toLowerCase(),
        translatedText,
        pronunciation || '',
        embedding,
      ]
    );

    console.log('[VectorStore] Translation cached');
    return true;
  } catch (error) {
    console.warn('[VectorStore] Store failed:', error.message);
    return false;
  }
}

/**
 * Get all unsynced translations for cloud backup.
 */
export function getUnsyncedTranslations() {
  if (!db) return [];

  try {
    const result = db.execute(
      `SELECT id, source_lang, target_lang, source_text, translated_text, 
              pronunciation, created_at
       FROM translation_cache WHERE synced = 0
       ORDER BY created_at ASC`
    );
    return result.rows || [];
  } catch (error) {
    console.warn('[VectorStore] Get unsynced failed:', error.message);
    return [];
  }
}

/**
 * Mark translations as synced after cloud backup.
 */
export function markSynced(ids) {
  if (!db || !ids.length) return;

  try {
    const placeholders = ids.map(() => '?').join(',');
    db.execute(
      `UPDATE translation_cache SET synced = 1 WHERE id IN (${placeholders})`,
      ids
    );
  } catch (error) {
    console.warn('[VectorStore] Mark synced failed:', error.message);
  }
}

/**
 * Get translation statistics.
 */
export function getStats() {
  if (!db) return { total: 0, unsynced: 0, languages: 0 };

  try {
    const total = db.execute('SELECT COUNT(*) as count FROM translation_cache');
    const unsynced = db.execute(
      'SELECT COUNT(*) as count FROM translation_cache WHERE synced = 0'
    );
    const langs = db.execute(
      'SELECT COUNT(DISTINCT target_lang) as count FROM translation_cache'
    );

    return {
      total: total.rows?.[0]?.count || 0,
      unsynced: unsynced.rows?.[0]?.count || 0,
      languages: langs.rows?.[0]?.count || 0,
    };
  } catch {
    return { total: 0, unsynced: 0, languages: 0 };
  }
}

/**
 * Clear all cached translations.
 */
export function clearCache() {
  if (!db) return;

  try {
    db.execute('DELETE FROM translation_cache');
    console.log('[VectorStore] Cache cleared');
  } catch (error) {
    console.warn('[VectorStore] Clear failed:', error.message);
  }
}

// ─── Text Similarity Utilities ───

function normalizeText(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F]/g, '')
    .replace(/\s+/g, ' ');
}

/**
 * Compute text similarity using character n-gram overlap (Jaccard coefficient).
 * Fast, works for any script, no ML model needed.
 */
function computeTextSimilarity(textA, textB) {
  if (textA === textB) return 1.0;
  if (!textA || !textB) return 0.0;

  const ngramSize = 3;
  const ngramsA = getNgrams(textA, ngramSize);
  const ngramsB = getNgrams(textB, ngramSize);

  if (ngramsA.size === 0 && ngramsB.size === 0) return 1.0;
  if (ngramsA.size === 0 || ngramsB.size === 0) return 0.0;

  let intersection = 0;
  for (const ngram of ngramsA) {
    if (ngramsB.has(ngram)) intersection++;
  }

  const union = ngramsA.size + ngramsB.size - intersection;
  return intersection / union;
}

function getNgrams(text, n) {
  const ngrams = new Set();
  for (let i = 0; i <= text.length - n; i++) {
    ngrams.add(text.substring(i, i + n));
  }
  return ngrams;
}
