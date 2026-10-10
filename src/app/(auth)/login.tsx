import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AuthButton } from "@/components/AuthButton";
import { images } from "@/constants/images";
import { colors } from "@/theme";

// Measurements come from design/assets/drafts/login-do-v11-refreshed.png (853 px wide = 390 pt).
export default function LoginScreen() {
  return (
    <View className="flex-1 bg-background">
      <StatusBar style="light" />
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Image
          accessible={false}
          className="absolute left-0 top-0 h-[367px] w-full"
          resizeMode="cover"
          source={images.loginBgTexture}
        />

        {/* Decorative activity icons: not attendees, not selectable. */}
        <View className="h-[200px] flex-row items-center justify-between px-[34px] pt-[10px]">
          <View className="w-[71px] items-center opacity-40">
            <Image
              accessible={false}
              className="h-[35px] w-[35px]"
              source={images.doConcert}
              style={styles.limeTint}
            />
          </View>
          <View className="mt-[-4px] w-[71px] items-center">
            <Image
              accessible={false}
              className="h-[71px] w-[71px]"
              source={images.doHiking}
              style={styles.limeTint}
            />
          </View>
          <View className="w-[71px] items-center opacity-40">
            <Image
              accessible={false}
              className="h-10 w-10"
              source={images.doBoardGame}
              style={styles.limeTint}
            />
          </View>
        </View>

        <Image
          accessible={false}
          className="h-[198px] w-[226px] self-center"
          source={images.loginDoPhoto}
        />

        <Text
          accessibilityRole="header"
          className="mt-[33px] text-center font-poppins-bold text-[31px] leading-[38px] tracking-tight text-charcoal"
        >
          {"Let's "}
          <Text className="text-forest">do</Text>
          {" something"}
        </Text>

        <View className="mt-3.5 gap-[13px] px-[21px]">
          <AuthButton label="Continue with Google" variant="google" />
          <AuthButton label="Continue with Apple" variant="apple" />
          <AuthButton label="Continue with Facebook" variant="facebook" />
        </View>

        <View className="mt-6 flex-row items-center gap-3 px-[21px]">
          <View className="h-px flex-1 bg-grass" />
          <Text className="text-body-md text-charcoal">or</Text>
          <View className="h-px flex-1 bg-grass" />
        </View>

        <View className="mt-[23px] px-[21px]">
          <AuthButton label="Sign up with email" variant="email" />
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.6}
          className="mt-5 self-center border-b-2 border-lime"
        >
          <Text className="font-poppins-semibold text-[15px] leading-[22px] text-charcoal">
            Log in with email
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  limeTint: {
    tintColor: colors.lime,
  },
});
