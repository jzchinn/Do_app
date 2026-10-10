import { Image, Text, TouchableOpacity } from "react-native";
import type { ImageSourcePropType } from "react-native";

import { images } from "@/constants/images";

type AuthButtonVariant = "google" | "apple" | "facebook" | "email";

type VariantStyle = {
  button: string;
  label: string;
  icon?: ImageSourcePropType;
  iconSize?: string;
};

// Apple's glyph sits taller in its canvas than the others, so it renders a touch smaller.
const variants: Record<AuthButtonVariant, VariantStyle> = {
  google: {
    button: "auth-button--google",
    label: "auth-button__label--dark",
    icon: images.providerGoogle,
    iconSize: "h-5 w-5",
  },
  apple: {
    button: "auth-button--apple",
    label: "auth-button__label--light",
    icon: images.providerApple,
    iconSize: "h-[17px] w-[17px]",
  },
  facebook: {
    button: "auth-button--facebook",
    label: "auth-button__label--lime",
    icon: images.providerFacebook,
    iconSize: "h-5 w-5",
  },
  email: {
    button: "auth-button--email",
    label: "auth-button__label--forest",
  },
};

type AuthButtonProps = {
  variant: AuthButtonVariant;
  label: string;
  onPress?: () => void;
};

export function AuthButton({ variant, label, onPress }: AuthButtonProps) {
  const style = variants[variant];

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.8}
      className={`auth-button ${style.button}`}
      onPress={onPress}
    >
      {style.icon ? (
        <Image accessible={false} className={style.iconSize} resizeMode="contain" source={style.icon} />
      ) : null}
      <Text className={`auth-button__label ${style.label}`}>{label}</Text>
    </TouchableOpacity>
  );
}
