import { SymbolView } from "expo-symbols";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  ReduceMotion,
} from "react-native-reanimated";

import { useEmailAuth } from "@/hooks/useEmailAuth";
import type { EmailAuthMode } from "@/hooks/useEmailAuth";
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

export type { EmailAuthMode };

type EmailAuthFormProps = {
  mode: EmailAuthMode;
  onBack: () => void;
};

export function EmailAuthForm({ mode, onBack }: EmailAuthFormProps) {
  const {
    error,
    pending,
    needsCode,
    resetCodeSent,
    submit,
    verifyCode,
    resendCode,
    sendResetCode,
    resetPassword,
    cancelReset,
  } = useEmailAuth(mode);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // True while the "forgot password" screens replace the normal log-in fields.
  const [resetting, setResetting] = useState(false);

  const emailInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setTimeout(
      () => emailInputRef.current?.focus(),
      FOCUS_DELAY_MS,
    );
    return () => clearTimeout(timer);
  }, []);

  const showEmailField = resetting ? !resetCodeSent : !needsCode;
  const showCodeField = resetting ? resetCodeSent : needsCode;
  const showPasswordField = resetting ? resetCodeSent : !needsCode;
  const isNewPassword = resetting || mode === "signup";

  let submitLabel = mode === "signup" ? "Sign Up" : "Sign In";
  if (resetting)
    submitLabel = resetCodeSent ? "Reset password" : "Send reset code";
  else if (needsCode) submitLabel = "Verify";

  function handleSubmit() {
    if (resetting) {
      return resetCodeSent
        ? resetPassword(code.trim(), password)
        : sendResetCode(email.trim());
    }
    return needsCode ? verifyCode(code.trim()) : submit(email.trim(), password);
  }

  function stopResetting() {
    cancelReset();
    setCode("");
    setPassword("");
    setResetting(false);
  }

  return (
    <Animated.View
      entering={FADE_IN}
      exiting={FADE_OUT}
      className="mt-[18px] gap-[13px] px-[21px]"
    >
      {showCodeField ? (
        <>
          <Text className="text-center text-body-md text-lime">
            {`We emailed a code to ${email}`}
          </Text>
          <View className="auth-field">
            <Text className="auth-field__label">Verification code</Text>
            <TextInput
              autoComplete="one-time-code"
              className="auth-field__input"
              keyboardType="number-pad"
              onChangeText={setCode}
              textContentType="oneTimeCode"
              value={code}
            />
          </View>
        </>
      ) : null}

      {showEmailField ? (
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
      ) : null}

      {showPasswordField ? (
        <View className="auth-field">
          <Text className="auth-field__label">
            {resetting ? "New password" : "Password"}
          </Text>
          <TextInput
            autoCapitalize="none"
            autoComplete={isNewPassword ? "new-password" : "current-password"}
            autoCorrect={false}
            className="auth-field__input pr-10"
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            textContentType={isNewPassword ? "newPassword" : "password"}
            value={password}
          />
          <TouchableOpacity
            accessibilityLabel={
              showPassword ? "Hide password" : "Show password"
            }
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
      ) : null}

      {error ? (
        <Text
          accessibilityRole="alert"
          className="text-center text-body-md text-red-300"
        >
          {error}
        </Text>
      ) : null}

      {/* Clerk's bot protection needs this mount point on sign-up. */}
      {mode === "signup" ? <View nativeID="clerk-captcha" /> : null}

      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.8}
        className="auth-submit mt-[7px]"
        disabled={pending}
        onPress={handleSubmit}
      >
        <Text className="auth-submit__label">{submitLabel}</Text>
      </TouchableOpacity>

      {showCodeField ? (
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.6}
          className="self-center"
          disabled={pending}
          onPress={resetting ? () => sendResetCode(email.trim()) : resendCode}
        >
          <Text className="font-poppins-semibold text-[15px] leading-[22px] text-lime">
            Resend code
          </Text>
        </TouchableOpacity>
      ) : null}

      {mode === "login" && !resetting ? (
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.6}
          className="self-center"
          onPress={() => setResetting(true)}
        >
          <Text className="font-poppins-semibold text-[15px] leading-[22px] text-lime">
            Forgot password?
          </Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.6}
        className="mt-2 self-center border-b-2 border-lime"
        onPress={resetting ? stopResetting : onBack}
      >
        <Text className="font-poppins-semibold text-[15px] leading-[22px] text-charcoal">
          {resetting ? "Back to log in" : "Back to all options"}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
