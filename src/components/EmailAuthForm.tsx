import { SymbolView } from "expo-symbols";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  ReduceMotion,
} from "react-native-reanimated";

import { colors } from "@/theme";

const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);
const FADE_IN = FadeIn.duration(200)
  .delay(150)
  .easing(EASE_OUT)
  .reduceMotion(ReduceMotion.System);
const FADE_OUT = FadeOut.duration(150)
  .easing(EASE_OUT)
  .reduceMotion(ReduceMotion.System);

// Wait for the headline to finish moving up before the keyboard slides in, so the two
// animations run one after the other instead of fighting over the layout.
const FOCUS_DELAY_MS = 450;

export type EmailAuthMode = "signup" | "login";

type EmailAuthFormProps = {
  mode: EmailAuthMode;
  onSubmit?: (email: string, password: string) => void;
  onBack: () => void;
};

export function EmailAuthForm({ mode, onSubmit, onBack }: EmailAuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setTimeout(
      () => emailInputRef.current?.focus(),
      FOCUS_DELAY_MS,
    );
    return () => clearTimeout(timer);
  }, []);

  const submitLabel = mode === "signup" ? "Sign Up" : "Sign In";

  return (
    <Animated.View
      entering={FADE_IN}
      exiting={FADE_OUT}
      className="mt-[18px] gap-[13px] px-[21px]"
    >
      <View className="auth-field">
        <Text className="auth-field__label">Email</Text>
        <TextInput
          ref={emailInputRef}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          className="auth-field__input"
          keyboardType="email-address"
          onChangeText={setEmail}
          textContentType="emailAddress"
          value={email}
        />
      </View>

      <View className="auth-field">
        <Text className="auth-field__label">Password</Text>
        <TextInput
          autoCapitalize="none"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          autoCorrect={false}
          className="auth-field__input pr-10"
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          textContentType={mode === "signup" ? "newPassword" : "password"}
          value={password}
        />
        <TouchableOpacity
          accessibilityLabel={showPassword ? "Hide password" : "Show password"}
          accessibilityRole="button"
          activeOpacity={0.6}
          className="absolute bottom-0 right-4 top-0 justify-center"
          hitSlop={8}
          onPress={() => setShowPassword((visible) => !visible)}
        >
          <SymbolView
            name={
              showPassword
                ? {
                    ios: "eye.slash",
                    android: "visibility_off",
                    web: "visibility_off",
                  }
                : { ios: "eye", android: "visibility", web: "visibility" }
            }
            size={22}
            tintColor={colors.forest}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.8}
        className="auth-submit mt-[7px]"
        onPress={() => onSubmit?.(email.trim(), password)}
      >
        <Text className="auth-submit__label">{submitLabel}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.6}
        className="mt-2 self-center border-b-2 border-lime"
        onPress={onBack}
      >
        <Text className="font-poppins-semibold text-[15px] leading-[22px] text-charcoal">
          Back to all options
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
