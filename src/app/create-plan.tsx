import { useAuth } from '@clerk/expo';
import { Redirect } from 'expo-router';

import { CreatePlanScreen } from '@/components/create-plan-screen';

export default function CreatePlan() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/login" />;

  return <CreatePlanScreen />;
}
