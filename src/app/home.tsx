import { useAuth, useUser } from '@clerk/expo';
import { Redirect, useRouter } from 'expo-router';

import { HomeScreen } from '@/components/home-screen';

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/login" />;

  return <HomeScreen profileImage={user?.imageUrl} onOpenProfile={() => router.push('/profile')} onCreatePlan={() => router.push('/drafts')} />;
}
