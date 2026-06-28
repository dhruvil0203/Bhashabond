import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useSSO } from '@clerk/clerk-expo';
import { useTheme } from '../context/ThemeContext';
import { getColors } from '../theme/colors';

// Required for the OAuth browser session to dismiss correctly on Android.
WebBrowser.maybeCompleteAuthSession();

// Warms up the in-app browser on Android so the Google sheet opens instantly.
function useWarmUpBrowser() {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
}

function GoogleIcon() {
  return (
    <Svg width="20" height="20" viewBox="0 0 48 48">
      <Path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <Path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <Path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <Path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </Svg>
  );
}

export default function SignInScreen() {
  useWarmUpBrowser();
  const { isDark } = useTheme();
  const c = getColors(isDark);
  const { startSSOFlow } = useSSO();
  const [loading, setLoading] = useState(false);

  const onGooglePress = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    const redirectUrl = AuthSession.makeRedirectUri();
    console.log('[SignIn] OAuth redirect URL:', redirectUrl);

    try {
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl,
      });

      console.log('[SignIn] OAuth result:', {
        createdSessionId: !!createdSessionId,
        hasSetActive: !!setActive,
        signInStatus: signIn?.status,
        signUpStatus: signUp?.status,
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        return;
      }

      // If sign-up was created by OAuth, activate its session
      if (signUp?.createdSessionId && setActive) {
        await setActive({ session: signUp.createdSessionId });
        return;
      }

      // If sign-in needs verification, attempt to complete it
      if (signIn?.status === 'needs_second_factor') {
        console.warn('[SignIn] MFA required but not supported');
        Alert.alert('Sign in failed', 'Two-factor authentication is not supported yet.');
        return;
      }

      // OAuth completed but no session — likely a config issue
      const hasOAuthCompleted = signUp?.status === 'complete' || signIn?.status === 'complete';
      if (hasOAuthCompleted && !createdSessionId && setActive) {
        // Try activating from signIn or signUp
        const sid = signUp?.createdSessionId || signIn?.createdSessionId;
        if (sid) {
          await setActive({ session: sid });
          return;
        }
      }

      // If still nothing, show the user a helpful message
      if (redirectUrl.startsWith('bhashabond://')) {
        Alert.alert(
          'Configuration Required',
          'Make sure "bhashabond://oauth" is added to the Redirect URLs in your Clerk Dashboard:\n' +
          'Clerk Dashboard → User & Authentication → Social Connections → Google → Redirect URLs.\n\n' +
          'After adding it, rebuild the app and try again.'
        );
      } else {
        Alert.alert(
          'Sign in incomplete',
          'The sign-in flow didn\'t complete. Please try again.\n\n' +
          `Redirect URL: ${redirectUrl}\n` +
          `Status: signIn=${signIn?.status || 'none'}, signUp=${signUp?.status || 'none'}`
        );
      }
    } catch (err) {
      console.warn('[SignIn] Error:', err?.message || err, err);
      Alert.alert('Sign in failed', `Could not complete Google sign in.\n\n${err?.message || 'Please check your connection and try again.'}`);
    } finally {
      setLoading(false);
    }
  }, [loading, startSSOFlow]);

  return (
    <View style={{ flex: 1, backgroundColor: c.bg, paddingHorizontal: 32, justifyContent: 'center' }}>
      {/* Logo + brand */}
      <View style={{ alignItems: 'center', marginBottom: 48 }}>
        <View style={{
          width: 88, height: 88, borderRadius: 44,
          alignItems: 'center', justifyContent: 'center', marginBottom: 20,
          overflow: 'hidden',
          borderWidth: 2, borderColor: '#F97316',
        }}>
          <Image
            source={require('../assets/icon.png')}
            style={{ width: 88, height: 88 }}
            resizeMode="cover"
          />
        </View>
        <Text style={{ fontSize: 32, fontWeight: '900', color: c.textPrimary, letterSpacing: -0.5 }}>
          BhaashaBond
        </Text>
        <Text style={{ fontSize: 15, fontStyle: 'italic', color: '#F97316', fontWeight: '500', marginTop: 6 }}>
          Speak Local, Feel Local
        </Text>
      </View>

      <Text style={{ fontSize: 22, fontWeight: 'bold', color: c.textPrimary, textAlign: 'center', marginBottom: 8 }}>
        Welcome 🙏
      </Text>
      <Text style={{ fontSize: 15, color: c.textSecondary, textAlign: 'center', marginBottom: 40, lineHeight: 22 }}>
        Sign in to start translating across India's languages.
      </Text>

      {/* Google button */}
      <TouchableOpacity
        onPress={onGooglePress}
        disabled={loading}
        activeOpacity={0.85}
        style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
          backgroundColor: isDark ? c.card : '#FFFFFF',
          borderWidth: 1, borderColor: c.cardBorder,
          paddingVertical: 16, borderRadius: 16, gap: 12,
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#F97316" />
        ) : (
          <>
            <GoogleIcon />
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: c.textPrimary }}>
              Continue with Google
            </Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={{ fontSize: 12, color: c.textMuted, textAlign: 'center', marginTop: 24, lineHeight: 18 }}>
        By continuing you agree to use BhashaBond responsibly.
      </Text>
    </View>
  );
}
