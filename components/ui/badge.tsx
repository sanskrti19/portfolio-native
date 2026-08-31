import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors, fonts } from "@/lib/theme";

export function Badge({ children, style }: { children: string; style?: ViewStyle }) {
  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surfaceRaised,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.inkMuted,
  },
});
