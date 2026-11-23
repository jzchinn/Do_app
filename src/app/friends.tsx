import { useAuth } from '@clerk/expo';
import { Redirect } from 'expo-router';

import { FriendsScreen } from '@/components/friends-screen';

export default function Friends() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/login" />;

  return <FriendsScreen />;
}
