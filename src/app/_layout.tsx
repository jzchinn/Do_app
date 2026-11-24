import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import "../global.css";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { fontAssets } from "@/constants/fonts";
import { colors } from "@/theme/colors";
import { PlansProvider } from "@/store/plans";
import { SavedEventsProvider } from "@/store/saved-events";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";

if (!publishableKey) {
  throw new Error(
    "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Add your key to .env.local.\nRun: 1) clerk auth login  2) clerk link  3) clerk env pull — then restart the dev server.",
  );
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SavedEventsProvider>
        <PlansProvider>
          <Stack screenOptions={{ headerShown: false }}>
            {/* Set here, not inside the screen: changing a screen's own options while it is open re-presents it. */}
            <Stack.Screen name="drafts" options={{ headerShown: true, title: "Make a plan", headerTintColor: colors.forest, headerTitleStyle: { fontFamily: "Poppins-SemiBold" }, headerBackButtonDisplayMode: "minimal" }} />
            <Stack.Screen name="create-plan" options={{ presentation: "modal", headerShown: true, title: "New plan", headerTintColor: colors.forest, headerTitleStyle: { fontFamily: "Poppins-SemiBold" } }} />
          </Stack>
        </PlansProvider>
      </SavedEventsProvider>
    </ClerkProvider>
  );
}
