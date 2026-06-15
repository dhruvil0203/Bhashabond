/**
 * Whisper Speech-to-Text service.
 * Wraps react-native-executorch's useSpeechToText hook
 * for on-device voice recognition.
 */

import { useState, useCallback, useRef } from 'react';

// Model source for Whisper Tiny English
const WHISPER_MODEL_SOURCE =
  'https://huggingface.co/software-mansion/react-native-executorch-whisper-tiny.en/resolve/main/whisper_tiny_en.pte';

/**
 * Custom hook for speech-to-text functionality.
 * Uses Whisper via ExecuTorch for fully offline transcription.
 * 
 * Falls back to a simple text input if the model is not available.
 */
export function useWhisperSTT() {
  const [isModelReady, setIsModelReady] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [modelLoading, setModelLoading] = useState(false);

  // Try to use react-native-executorch if available
  const executorchRef = useRef(null);

  const initModel = useCallback(async () => {
    setModelLoading(true);
    setError(null);

    try {
      // Dynamic import to avoid crash if package isn't installed yet
      const executorch = require('react-native-executorch');

      if (executorch && executorch.useSpeechToText) {
        // The hook will be used at the component level
        setIsModelReady(true);
      }
    } catch (err) {
      console.warn('[Whisper] ExecuTorch not available:', err.message);
      setError('Speech model not available. Please type your text instead.');
      setIsModelReady(false);
    } finally {
      setModelLoading(false);
    }
  }, []);

  const startListening = useCallback(async () => {
    setIsListening(true);
    setTranscript('');
    setError(null);

    try {
      if (executorchRef.current) {
        // Use ExecuTorch Whisper model
        const result = await executorchRef.current.transcribe();
        setTranscript(result);
      } else {
        // Fallback: model not loaded
        setError('Speech model not loaded. Please type your text.');
      }
    } catch (err) {
      console.warn('[Whisper] Transcription error:', err.message);
      setError('Speech recognition failed. Please try again or type your text.');
    } finally {
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    // State
    isModelReady,
    isListening,
    transcript,
    error,
    modelLoading,
    // Actions
    initModel,
    startListening,
    stopListening,
    clearTranscript,
    setTranscript,
  };
}

/**
 * Whisper ExecuTorch component wrapper.
 * Use this as a hook in the TranslatorScreen to get the
 * useSpeechToText functionality from react-native-executorch.
 */
export function useWhisperExecuTorch() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  try {
    const { useSpeechToText } = require('react-native-executorch');

    const stt = useSpeechToText({
      modelSource: WHISPER_MODEL_SOURCE,
    });

    return {
      isReady: stt.isReady || false,
      isGenerating: stt.isGenerating || false,
      transcript: stt.response || '',
      error: stt.error,
      transcribe: stt.generate,
    };
  } catch (err) {
    return {
      isReady: false,
      isGenerating: false,
      transcript: '',
      error: 'ExecuTorch not available',
      transcribe: async () => '',
    };
  }
}
