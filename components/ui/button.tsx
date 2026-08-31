import { ReactNode } from "react";
import { ActivityIndicator, Linking, Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { router } from "expo-router";
import { colors, fonts, radii } from "@/lib/theme";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onPress,
  disabled,
  loading,
  style,
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}) {
  function handlePress() {
    if (onPress) {
      onPress();
      return;
    }
    if (!href) return;
    if (/^https?:\/\//.test(href)) {
      Linking.openURL(href);
    } else {
      router.push(href as never);
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        pressed && !disabled ? { opacity: 0.85 } : null,
        disabled ? { opacity: 0.5 } : null,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === "primary" ? colors.white : colors.ink} />
      ) : typeof children === "string" ? (
        <Text style={[styles.text, textVariantStyles[variant], textSizeStyles[size]]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

/** Wraps icon + label children with consistent button typography. */
export function ButtonLabel({
  children,
  variant = "primary",
  size = "md",
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
}) {
  return <Text style={[styles.text, textVariantStyles[variant], textSizeStyles[size]]}>{children}</Text>;
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: radii.pill,
  },
  text: {
    fontFamily: fonts.sansMedium,
    letterSpacing: -0.1,
  },
});

const variantStyles: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: colors.accent },
  secondary: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  ghost: { backgroundColor: "transparent" },
};

const textVariantStyles: Record<Variant, { color: string }> = {
  primary: { color: colors.white },
  secondary: { color: colors.ink },
  ghost: { color: colors.inkMuted },
};

const sizeStyles: Record<Size, ViewStyle> = {
  sm: { height: 38, paddingHorizontal: 16 },
  md: { height: 46, paddingHorizontal: 22 },
};

const textSizeStyles: Record<Size, { fontSize: number }> = {
  sm: { fontSize: 13 },
  md: { fontSize: 14 },
};
