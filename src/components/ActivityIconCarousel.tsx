import { useEffect } from "react";
import { type ImageSourcePropType, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";

import { images } from "@/constants/images";
import { colors } from "@/theme";

// One turn of the wheel: a quick ease-in-out move, then a pause until the next turn.
const TURN_EVERY_MS = 5000;
const TURN_DURATION_MS = 600;
const EASE_IN_OUT = Easing.bezier(0.77, 0, 0.175, 1);

const ICONS: ImageSourcePropType[] = [
  images.doConcert,
  images.doHiking,
  images.doBoardGame,
  images.doPicnic,
];

// Every icon is drawn in a 71 px box and scaled down for the smaller slots.
const BOX = 71;
const SIDE_INSET = 34;
const LEFT_SCALE = 35 / BOX;
const RIGHT_SCALE = 40 / BOX;
// The center icon sits 2 px above the side icons, matching the design.
const CENTER_LIFT = -2;
// How far past the left/right slots an icon travels while it fades out/in.
const EXIT_DISTANCE = 70;
const ENTER_DISTANCE = 50;

type IconProps = {
  index: number;
  source: ImageSourcePropType;
  step: SharedValue<number>;
  width: number;
};

function CarouselIcon({ index, source, step, width }: IconProps) {
  const leftX = SIDE_INSET + BOX / 2;
  const centerX = width / 2;
  const rightX = width - leftX;

  const animatedStyle = useAnimatedStyle(() => {
    // Slot of this icon: -1 off left, 0 left, 1 center, 2 right, up to 3 just entering.
    // Wrapping happens between -1 and 3, where the icon is invisible.
    const count = ICONS.length;
    const slot = ((((index - step.value + 1) % count) + count) % count) - 1;
    const slots = [-1, 0, 1, 2, 3];

    return {
      opacity: interpolate(slot, slots, [0, 0.4, 1, 0.4, 0]),
      transform: [
        { translateX: interpolate(slot, slots, [leftX - EXIT_DISTANCE, leftX, centerX, rightX, rightX + ENTER_DISTANCE]) - BOX / 2 },
        { translateY: interpolate(slot, slots, [0, 0, CENTER_LIFT, 0, 0]) - BOX / 2 },
        { scale: interpolate(slot, slots, [0, LEFT_SCALE, 1, RIGHT_SCALE, 0]) },
      ],
    };
  });

  return (
    <Animated.Image
      accessible={false}
      className="absolute left-0 top-0 h-[71px] w-[71px]"
      source={source}
      style={[styles.limeTint, animatedStyle]}
    />
  );
}

// Decorative activity icons that turn like a wheel: not attendees, not selectable.
export function ActivityIconCarousel() {
  const { width } = useWindowDimensions();
  const reduceMotion = useReducedMotion();
  const step = useSharedValue(0);

  useEffect(() => {
    if (reduceMotion) return;
    let turns = 0;
    const timer = setInterval(() => {
      turns += 1;
      step.value = withTiming(turns, { duration: TURN_DURATION_MS, easing: EASE_IN_OUT });
    }, TURN_EVERY_MS);
    return () => clearInterval(timer);
  }, [reduceMotion, step]);

  return (
    <View className="h-[200px] justify-center pt-[20px]" pointerEvents="none">
      {/* Zero-height row so every icon is centered on the same line as the old layout. */}
      <View className="h-0">
        {ICONS.map((source, index) => (
          <CarouselIcon key={index} index={index} source={source} step={step} width={width} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  limeTint: {
    tintColor: colors.lime,
  },
});
