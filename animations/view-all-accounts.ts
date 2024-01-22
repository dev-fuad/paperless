import { Easing, SharedTransition, withTiming } from "react-native-reanimated";

export const transition = SharedTransition.custom((values) => {
  "worklet";
  return {
    originX: withTiming(values.targetOriginX, {
      duration: 1000,
      easing: Easing.bezier(0.28, -0.95, 0.42, 1.3),
    }),
    originY: withTiming(values.targetOriginY, {
      duration: 1000,
      easing: Easing.bezier(0.28, -0.95, 0.42, 1.3),
    }),
  };
});
