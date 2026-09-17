export const colors = {
  base: "#09090B",
  surface: "#111113",
  surfaceRaised: "#15151A",
  surfaceBorder: "#232329",
  ink: "#EDEDF0",
  inkMuted: "#9A9AA4",
  inkFaint: "#5C5C66",
  accent: "#6E6BFF",
  accentSoft: "#8F8DFF",
  accentDim: "#4B49B8",
  signal: "#5EEAD4",
  white: "#FFFFFF",
  black: "#000000",
};

export const fonts = {
  sans: "Inter_400Regular",
  sansMedium: "Inter_500Medium",
  sansSemibold: "Inter_600SemiBold",
  sansBold: "Inter_700Bold",
  mono: "JetBrainsMono_400Regular",
  monoMedium: "JetBrainsMono_500Medium",
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
};

export const spacing = (n: number) => n * 4;

export const displayText = {
  xl: { fontSize: 44, lineHeight: 46, letterSpacing: -1 },
  lg: { fontSize: 34, lineHeight: 38, letterSpacing: -0.8 },
  md: { fontSize: 26, lineHeight: 32, letterSpacing: -0.5 },
};
