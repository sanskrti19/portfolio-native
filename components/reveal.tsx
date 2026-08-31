import { ReactNode, useEffect, useRef } from "react";
import { Animated, Easing, ViewStyle } from "react-native";

/**
 * React Native has no scroll-linked `whileInView` primitive as cheap as Framer Motion's,
 * so this animates in once on mount with an optional stagger delay — visually close to
 * the original site's reveal-on-scroll effect for a first render, without a scroll listener.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  style?: ViewStyle;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(y)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        delay: delay * 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        delay: delay * 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}
