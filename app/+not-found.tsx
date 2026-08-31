import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { colors, fonts } from "@/lib/theme";

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn&apos;t exist.</Text>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Go back home</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    backgroundColor: colors.base,
    padding: 24,
  },
  title: {
    fontFamily: fonts.sansSemibold,
    fontSize: 18,
    color: colors.ink,
  },
  link: {
    paddingVertical: 8,
  },
  linkText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.accentSoft,
  },
});
