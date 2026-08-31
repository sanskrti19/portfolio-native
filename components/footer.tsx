import { StyleSheet, Text, View } from "react-native";
import { site } from "@/lib/site";
import { colors, fonts } from "@/lib/theme";
import { Shell } from "@/components/shell";

export function Footer() {
  return (
    <View style={styles.footer}>
      <Shell>
        <Text style={styles.text}>
          © {new Date().getFullYear()} {site.name}. Built with Expo and React Native.
        </Text>
        <Text style={styles.mono}>designed &amp; built with expo + react native</Text>
      </Shell>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderColor: "rgba(35,35,41,0.7)",
    paddingVertical: 28,
    gap: 8,
  },
  text: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.inkFaint,
  },
  mono: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.inkFaint,
  },
});
