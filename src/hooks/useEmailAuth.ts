import { useSignIn, useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";
import type { Href } from "expo-router";
import { useState } from "react";

export type EmailAuthMode = "signup" | "login";

type ClerkErrorLike = { longMessage?: string; message: string } | null;

type FinalizeNavigate = (params: {
  session?: { currentTask?: unknown } | null;
  decorateUrl: (url: string) => string;
}) => void | Promise<void>;

function messageOf(error: ClerkErrorLike) {
  return error?.longMessage ?? error?.message ?? null;
}

// Email + password auth with Clerk. Sign-up also asks for the emailed verification code.
export function useEmailAuth(mode: EmailAuthMode) {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [needsCode, setNeedsCode] = useState(false);
  const [resetCodeSent, setResetCodeSent] = useState(false);

  const goHome: FinalizeNavigate = ({ session, decorateUrl }) => {
    // Session tasks (e.g. forced MFA enrollment) have no screen yet, so say so instead of doing nothing.
    if (session?.currentTask) {
      setError(
        "Your account needs an extra setup step, which isn't supported yet.",
      );
      return;
    }
    router.replace(decorateUrl("/home") as Href);
  };

  // Turns a completed sign-in/sign-up into the active session, showing any error.
  async function finalize(resource: {
    finalize: (params: {
      navigate: FinalizeNavigate;
    }) => Promise<{ error: ClerkErrorLike }>;
  }) {
    const { error: finalizeError } = await resource.finalize({
      navigate: goHome,
    });
    if (finalizeError) setError(messageOf(finalizeError));
  }

  async function run(action: () => Promise<void>) {
    setError(null);
    setPending(true);
    try {
      await action();
    } finally {
      setPending(false);
    }
  }

  const submit = (emailAddress: string, password: string) =>
    run(async () => {
      if (mode === "login") {
        const { error: signInError } = await signIn.password({
          emailAddress,
          password,
        });
        if (signInError) return setError(messageOf(signInError));
        if (signIn.status === "complete") {
          await finalize(signIn);
        } else {
          setError(
            "This account needs extra verification, which isn't supported yet.",
          );
        }
        return;
      }

      const { error: signUpError } = await signUp.password({
        emailAddress,
        password,
      });
      if (signUpError) return setError(messageOf(signUpError));
      const { error: sendError } = await signUp.verifications.sendEmailCode();
      if (sendError) return setError(messageOf(sendError));
      setNeedsCode(true);
    });

  const verifyCode = (code: string) =>
    run(async () => {
      const { error: verifyError } = await signUp.verifications.verifyEmailCode(
        { code },
      );
      if (verifyError) return setError(messageOf(verifyError));
      if (signUp.status === "complete") {
        await finalize(signUp);
      } else {
        setError(
          "Sign-up needs more information that this form doesn't collect yet.",
        );
      }
    });

  const resendCode = () =>
    run(async () => {
      const { error: sendError } = await signUp.verifications.sendEmailCode();
      if (sendError) setError(messageOf(sendError));
    });

  const sendResetCode = (emailAddress: string) =>
    run(async () => {
      const { error: createError } = await signIn.create({
        identifier: emailAddress,
      });
      if (createError) return setError(messageOf(createError));
      const { error: sendError } =
        await signIn.resetPasswordEmailCode.sendCode();
      if (sendError) return setError(messageOf(sendError));
      setResetCodeSent(true);
    });

  // Checks the emailed code, sets the new password, and signs the user in.
  const resetPassword = (code: string, password: string) =>
    run(async () => {
      // The code is only checked once; after a rejected password the sign-in is
      // already waiting for a new one, so retries skip straight to the password.
      if (signIn.status !== "needs_new_password") {
        const { error: verifyError } =
          await signIn.resetPasswordEmailCode.verifyCode({ code });
        if (verifyError) return setError(messageOf(verifyError));
      }
      const { error: submitError } =
        await signIn.resetPasswordEmailCode.submitPassword({ password });
      if (submitError) return setError(messageOf(submitError));
      if (signIn.status === "complete") {
        await finalize(signIn);
      } else {
        setError(
          "Password updated, but sign-in needs extra verification, which isn't supported yet.",
        );
      }
    });

  const cancelReset = () => {
    setError(null);
    setResetCodeSent(false);
    signIn.reset();
  };

  return {
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
  };
}
