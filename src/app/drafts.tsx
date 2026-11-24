import { useAuth } from '@clerk/expo';
import { Redirect } from 'expo-router';

import { DraftsScreen } from '@/components/drafts-screen';

export default function Drafts() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/login" />;

  return <DraftsScreen />;
}
