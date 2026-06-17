import * as SecureStore from 'expo-secure-store';

// Persists the Clerk session token in the device keychain/keystore so the
// user stays signed in across app restarts (and can use the app offline
// after the first successful login).
export const tokenCache = {
  async getToken(key) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      // If the stored item is corrupt, clear it so the next sign-in is clean.
      try {
        await SecureStore.deleteItemAsync(key);
      } catch {}
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch {}
  },
};
