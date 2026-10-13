import { useAuth, useUser } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

// Placeholder signed-in screen until the real tabs exist.
export default function Home() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/login" />;

  return (
    <View className="flex-1 items-center justify-center gap-6 bg-background px-[21px]">
      <Text className="text-center font-poppins-bold text-[24px] text-charcoal">
        {`Signed in as ${user?.primaryEmailAddress?.emailAddress ?? "you"}`}
      </Text>
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.8}
        className="auth-submit"
        onPress={() => signOut()}
      >
        <Text className="auth-submit__label">Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
