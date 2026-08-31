import { StyleSheet, Text, View } from "react-native";
import { BookOpen, Layers, Server, Wrench } from "lucide-react-native";
import { skills } from "@/lib/site";
import { colors, fonts, radii } from "@/lib/theme";
import { Reveal } from "@/components/reveal";

const categories = [
  { key: "Frontend" as const, icon: Layers, blurb: "What people click on." },
  { key: "Backend & Data" as const, icon: Server, blurb: "What makes it actually work." },
  { key: "Tools & Workflow" as const, icon: Wrench, blurb: "How I build and ship." },
  { key: "Currently Learning" as const, icon: BookOpen, blurb: "Where I am going deeper." },
];

export function Skills() {
  return (
    <View style={styles.section}>
      <Reveal>
        <Text style={styles.title}>The stack I reach for.</Text>
      </Reveal>

      <View style={styles.grid}>
        {categories.map(({ key, icon: Icon, blurb }, i) => (
          <Reveal key={key} delay={i * 0.08} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconWrap}>
                <Icon size={16} color={colors.accentSoft} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{key}</Text>
                <Text style={styles.cardBlurb}>{blurb}</Text>
              </View>
            </View>
            <View style={styles.chips}>
              {skills[key].map((s) => (
                <View key={s} style={styles.chip}>
                  <Text style={styles.chipText}>{s}</Text>
                </View>
              ))}
            </View>
          </Reveal>
        ))}
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
  grid: {
    marginTop: 24,
    gap: 16,
  },
  card: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrap: {
    height: 36,
    width: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surfaceRaised,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontFamily: fonts.sansSemibold,
    fontSize: 14,
    color: colors.ink,
  },
  cardBlurb: {
    marginTop: 2,
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.inkFaint,
  },
  chips: {
    marginTop: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.base,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  chipText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.inkMuted,
  },
});
