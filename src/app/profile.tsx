import { useAuth, useUser } from '@clerk/expo';
import { Redirect, Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import { colors } from '@/theme/colors';

export default function Profile() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/login" />;

  async function handleSignOut() {
    setPending(true);
    setError('');
    try { await signOut(); }
    catch { setError('Could not sign out. Please try again.'); }
    finally { setPending(false); }
  }

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 24, gap: 20 }} contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ headerShown: true, title: 'Profile', headerTintColor: colors.forest, headerTitleStyle: { fontFamily: 'Poppins-SemiBold' }, headerBackButtonDisplayMode: 'minimal' }} />
      <Text className="font-poppins-semibold text-[24px] text-charcoal">{user?.firstName ?? 'Your profile'}</Text>
      <Text selectable className="font-poppins text-[15px] text-forest">{user?.primaryEmailAddress?.emailAddress}</Text>
      {error ? <Text accessibilityRole="alert" className="font-poppins text-[14px] text-charcoal">{error}</Text> : null}
      <TouchableOpacity accessibilityRole="button" accessibilityState={{ disabled: pending }} disabled={pending} onPress={handleSignOut} className="auth-submit"><Text className="auth-submit__label">{pending ? 'Signing out…' : 'Sign out'}</Text></TouchableOpacity>
    </ScrollView>
  );
}
