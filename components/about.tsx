import { StyleSheet, Text, View } from "react-native";
import { site } from "@/lib/site";
import { colors, fonts } from "@/lib/theme";
import { Reveal } from "@/components/reveal";

const points = [
  "Computer Science student focused on software development",
  "Full-stack developer working across frontend and backend",
  "Enjoys building polished interfaces as much as backend logic",
  "Builds practical projects to learn by shipping",
  "Currently strengthening backend, DSA, and AI development skills",
];

export function About() {
  return (
    <View style={styles.section}>
      <Reveal>
        <Text style={styles.title}>
          I&apos;d rather ship something real than follow another tutorial.
        </Text>
      </Reveal>
      <Reveal delay={0.1}>
        <Text style={styles.body}>{site.about}</Text>
        <View style={styles.list}>
          {points.map((point) => (
            <View key={point} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={styles.listText}>{point}</Text>
            </View>
          ))}
        </View>
      </Reveal>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {    paddingVertical: 56,    gap: 32,  },
  title: {
    fontFamily: fonts.sansSemibold,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.5,
    color: colors.ink,
  },
  body: {    fontFamily: fonts.sans,    fontSize: 14,    lineHeight: 22,    color: colors.inkMuted,  },
  list: {    marginTop: 24,    gap: 14,  },
  listItem: {    flexDirection: "row",    alignItems: "flex-start",    gap: 10,  },
  bullet: {    marginTop: 7,    width: 6,    height: 6,    borderRadius: 3,    backgroundColor: colors.accent,  },
  listText: {
    flex: 1,
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 20,
    color: colors.inkMuted,
  },
});
