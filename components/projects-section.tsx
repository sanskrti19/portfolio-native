import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "@/lib/theme";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export function ProjectsSection() {
  return (
    <View style={styles.section}>
      <Reveal>
        <Text style={styles.title}>Things I&apos;ve built, end to end.</Text>
        <Text style={styles.subtitle}>
          Three projects built to learn by shipping. Tap through for the engineering decisions
          and challenges behind each one.
        </Text>
      </Reveal>

      <View style={styles.grid}>
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
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
  subtitle: {
    marginTop: 10,
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 20,
    color: colors.inkMuted,
  },
  grid: {
    marginTop: 28,
    gap: 20,
  },
});
