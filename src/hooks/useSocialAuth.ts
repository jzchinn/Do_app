import { useSSO } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";

export type SocialProvider = "google" | "apple" | "facebook";

const strategies = {
  google: "oauth_google",
  apple: "oauth_apple",
  facebook: "oauth_facebook",
} as const;

// Google / Apple / Facebook sign-in through Clerk's browser flow (works in Expo Go).
export function useSocialAuth() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function signInWith(provider: SocialProvider) {
    if (pending) return;
    setError(null);
    setPending(true);
    try {
      const { createdSessionId, setActive, signUp } = await startSSOFlow({
        strategy: strategies[provider],
      });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/home");
      } else if (signUp?.status === "missing_requirements") {
        setError(
          "That account is missing required details we can't collect yet.",
        );
      }
      // Otherwise the user closed the browser; nothing to show.
    } catch {
      setError(
        "Couldn't sign in. Check that this provider is enabled and try again.",
      );
    } finally {
      setPending(false);
    }
  }

  return { error, pending, signInWith };
}
