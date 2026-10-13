import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  LinearTransition,
  ReduceMotion,
} from "react-native-reanimated";

import { ActivityIconCarousel } from "@/components/ActivityIconCarousel";
import { AuthButton } from "@/components/AuthButton";
import { EmailAuthForm } from "@/components/EmailAuthForm";
import type { EmailAuthMode } from "@/components/EmailAuthForm";
import { images } from "@/constants/images";
import { useSocialAuth } from "@/hooks/useSocialAuth";

// Moving on screen uses ease-in-out; entering/exiting content uses ease-out.
const EASE_IN_OUT = Easing.bezier(0.77, 0, 0.175, 1);
const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);

// The headline and everything below it glide up when the photo leaves (and back on return).
const MOVE = LinearTransition.duration(300)
  .easing(EASE_IN_OUT)
  .reduceMotion(ReduceMotion.System);
const FADE_OUT = FadeOut.duration(150)
  .easing(EASE_OUT)
  .reduceMotion(ReduceMotion.System);
// Delayed so the outgoing content is mostly gone before the new content appears.
const FADE_IN = FadeIn.duration(200)
  .delay(150)
  .easing(EASE_OUT)
  .reduceMotion(ReduceMotion.System);

// Measurements come from design/assets/drafts/login-do-v11-refreshed.png (853 px wide = 390 pt).
export default function LoginScreen() {
  // null shows the provider buttons; otherwise the email form for that mode.
  const [emailMode, setEmailMode] = useState<EmailAuthMode | null>(null);
  const { error: socialError, signInWith } = useSocialAuth();

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="light" />
      <ScrollView
        automaticallyAdjustKeyboardInsets
        bounces={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Image
          accessible={false}
          className="absolute left-0 top-0 h-[367px] w-full"
          resizeMode="cover"
          source={images.loginBgTexture}
        />

        <ActivityIconCarousel />

        {/* Leaves in email mode so the headline can move up and make room for the keyboard. */}
        {emailMode ? null : (
          <Animated.View entering={FADE_IN} exiting={FADE_OUT}>
            <Image
              accessible={false}
              className="h-[198px] w-[226px] self-center"
              source={images.loginDoPhoto}
            />
          </Animated.View>
        )}

        <Animated.Text
          layout={MOVE}
          accessibilityRole="header"
          className={`text-center font-poppins-bold text-[31px] leading-[38px] tracking-tight text-charcoal ${
            emailMode ? "-mt-[42px]" : "mt-[33px]"
          }`}
        >
          {"Let's "}
          {/* Lime (like the icons) so "do" stays readable on the green background in email mode. */}
          <Text className={emailMode ? "text-lime" : "text-forest"}>do</Text>
          {" something"}
        </Animated.Text>

        {emailMode ? (
          <EmailAuthForm
            mode={emailMode}
            onBack={() => {
              Keyboard.dismiss();
              setEmailMode(null);
            }}
          />
        ) : (
          <Animated.View entering={FADE_IN} exiting={FADE_OUT} layout={MOVE}>
            <View className="mt-3.5 gap-[13px] px-[21px]">
              <AuthButton
                label="Continue with Google"
                onPress={() => signInWith("google")}
                variant="google"
              />
              <AuthButton
                label="Continue with Apple"
                onPress={() => signInWith("apple")}
                variant="apple"
              />
              <AuthButton
                label="Continue with Facebook"
                onPress={() => signInWith("facebook")}
                variant="facebook"
              />
              {socialError ? (
                <Text
                  accessibilityRole="alert"
                  className="text-center text-body-md text-red-600"
                >
                  {socialError}
                </Text>
              ) : null}
            </View>

            <View className="mt-6 flex-row items-center gap-3 px-[21px]">
              <View className="h-px flex-1 bg-grass" />
              <Text className="text-body-md text-charcoal">or</Text>
              <View className="h-px flex-1 bg-grass" />
            </View>

            <View className="mt-[23px] px-[21px]">
              <AuthButton
                label="Sign up with email"
                onPress={() => setEmailMode("signup")}
                variant="email"
              />
            </View>

            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.6}
              className="mt-5 self-center border-b-2 border-lime"
              onPress={() => setEmailMode("login")}
            >
              <Text className="font-poppins-semibold text-[15px] leading-[22px] text-charcoal">
                Log in with email
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: 32,
  },
});
