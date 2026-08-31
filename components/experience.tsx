import { StyleSheet, Text, View } from "react-native";
import { experience } from "@/lib/site";
import { colors, fonts } from "@/lib/theme";
import { Reveal } from "@/components/reveal";

export function Experience() {
  return (
    <View style={styles.section}>
      <Reveal>
        <Text style={styles.title}>My journey so far.</Text>
      </Reveal>

      <View style={styles.timeline}>
        <View style={styles.rail} />
        <View style={styles.list}>
          {experience.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} y={12} style={styles.item}>
              <View style={styles.dotWrap}>
                <View style={styles.dot} />
              </View>
              <View style={styles.itemBody}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDetail}>{item.detail}</Text>
              </View>
            </Reveal>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 56,
  },
  title: {
    fontFamily: fonts.sansSemibold,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.5,
    color: colors.ink,
  },
  timeline: {
    marginTop: 32,
  },
  rail: {
    position: "absolute",
    left: 7,
    top: 4,
    bottom: 0,
    width: 1,
    backgroundColor: colors.surfaceBorder,
  },
  list: {
    gap: 28,
  },
  item: {
    flexDirection: "row",
    gap: 16,
  },
  dotWrap: {
    width: 16,
    height: 16,
    marginTop: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  itemBody: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: fonts.sansSemibold,
    fontSize: 14,
    color: colors.ink,
  },
  itemDetail: {
    marginTop: 4,
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 20,
    color: colors.inkMuted,
  },
});
