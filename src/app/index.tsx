import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";

// Signed-in users skip the login screen.
export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;
  return <Redirect href={isSignedIn ? "/home" : "/login"} />;
}
