import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "@/lib/theme";

export function SectionLabel({ index, file }: { index: string; file: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.index}>{index}</Text>
      <Text style={styles.file}>
        <Text style={styles.slashes}>{"// "}</Text>
        {file}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  index: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.inkFaint,
  },
  file: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.accentSoft,
    letterSpacing: -0.2,
  },
  slashes: {
    color: colors.inkFaint,
  },
});
