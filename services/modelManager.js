/**
 * Model download and lifecycle manager.
 * Handles downloading, verifying, and managing .pte model files
 * for on-device AI inference via ExecuTorch.
 */

import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Model definitions
export const MODELS = {
  WHISPER: {
    id: 'whisper-tiny-en',
    filename: 'whisper_tiny_en.pte',
    displayName: 'Speech Recognition (Whisper)',
    description: 'Converts your voice to text — fully offline',
    sizeBytes: 75 * 1024 * 1024, // ~75MB
    sizeLabel: '~75 MB',
    url: 'https://huggingface.co/software-mansion/react-native-executorch-whisper-tiny.en/resolve/main/whisper_tiny_en.pte',
    required: true,
  },
  INDICTRANS2: {
    id: 'indictrans2-dist-200m',
    filename: 'indictrans2_dist_200m.pte',
    displayName: 'Translation (IndicTrans2)',
    description: 'Translates between 20+ Indian languages — fully offline',
    sizeBytes: 400 * 1024 * 1024, // ~400MB
    sizeLabel: '~400 MB',
    url: null, // User must export and host this model
    required: false, // App works without it (uses API fallback)
  },
};

const MODEL_DIR = `${FileSystem.documentDirectory}models/`;
const STORAGE_KEY = '@model_status';

/**
 * Get the local file path for a model.
 */
export function getModelPath(modelId) {
  const model = Object.values(MODELS).find((m) => m.id === modelId);
  if (!model) return null;
  return `${MODEL_DIR}${model.filename}`;
}

/**
 * Check if a model exists on device.
 */
export async function isModelDownloaded(modelId) {
  const path = getModelPath(modelId);
  if (!path) return false;

  try {
    const info = await FileSystem.getInfoAsync(path);
    return info.exists;
  } catch {
    return false;
  }
}

/**
 * Get the status of all models.
 */
export async function getModelStatuses() {
  const statuses = {};

  for (const [key, model] of Object.entries(MODELS)) {
    const downloaded = await isModelDownloaded(model.id);
    statuses[key] = {
      ...model,
      downloaded,
      path: downloaded ? getModelPath(model.id) : null,
    };
  }

  return statuses;
}

/**
 * Download a model file with progress tracking.
 * 
 * @param {string} modelId - The model ID to download
 * @param {function} onProgress - Callback with { totalBytesWritten, totalBytesExpected }
 * @returns {Promise<string>} The local file path
 */
export async function downloadModel(modelId, onProgress = () => {}) {
  const model = Object.values(MODELS).find((m) => m.id === modelId);
  if (!model) throw new Error(`Unknown model: ${modelId}`);
  if (!model.url) throw new Error(`No download URL for model: ${modelId}`);

  // Ensure model directory exists
  const dirInfo = await FileSystem.getInfoAsync(MODEL_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(MODEL_DIR, { intermediates: true });
  }

  const localPath = `${MODEL_DIR}${model.filename}`;

  // Download with progress
  const downloadResumable = FileSystem.createDownloadResumable(
    model.url,
    localPath,
    {},
    (downloadProgress) => {
      onProgress({
        totalBytesWritten: downloadProgress.totalBytesWritten,
        totalBytesExpected: downloadProgress.totalBytesExpectedToWrite,
        progress:
          downloadProgress.totalBytesExpectedToWrite > 0
            ? downloadProgress.totalBytesWritten /
              downloadProgress.totalBytesExpectedToWrite
            : 0,
      });
    }
  );

  const result = await downloadResumable.downloadAsync();

  if (!result || !result.uri) {
    throw new Error('Download failed');
  }

  // Save status
  await saveModelStatus(modelId, {
    downloaded: true,
    downloadedAt: Date.now(),
    path: localPath,
  });

  return localPath;
}

/**
 * Delete a downloaded model to free storage.
 */
export async function deleteModel(modelId) {
  const path = getModelPath(modelId);
  if (!path) return;

  try {
    const info = await FileSystem.getInfoAsync(path);
    if (info.exists) {
      await FileSystem.deleteAsync(path);
    }
    await saveModelStatus(modelId, { downloaded: false });
  } catch (error) {
    console.warn('[ModelManager] Delete failed:', error.message);
  }
}

/**
 * Get total storage used by models.
 */
export async function getModelStorageUsage() {
  let totalBytes = 0;

  for (const model of Object.values(MODELS)) {
    const path = getModelPath(model.id);
    if (path) {
      try {
        const info = await FileSystem.getInfoAsync(path);
        if (info.exists && info.size) {
          totalBytes += info.size;
        }
      } catch {
        // ignore
      }
    }
  }

  return {
    totalBytes,
    label: formatBytes(totalBytes),
  };
}

/**
 * Check if all required models are ready.
 */
export async function areRequiredModelsReady() {
  for (const model of Object.values(MODELS)) {
    if (model.required) {
      const downloaded = await isModelDownloaded(model.id);
      if (!downloaded) return false;
    }
  }
  return true;
}

// ─── Internal Helpers ───

async function saveModelStatus(modelId, status) {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const all = raw ? JSON.parse(raw) : {};
    all[modelId] = { ...all[modelId], ...status };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // ignore
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
