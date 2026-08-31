import { Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { ArrowUpRight } from "lucide-react-native";
import { colors, fonts, radii } from "@/lib/theme";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import type { Project } from "@/lib/projects";

function getExternalUrl(url?: string) {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.href : undefined;
  } catch {
    return undefined;
  }
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const liveUrl = getExternalUrl(project.liveUrl);
  const githubUrl = getExternalUrl(project.githubUrl);

  return (
    <Reveal delay={index * 0.08} style={styles.wrapper}>
      <Link href={`/project/${project.slug}`} asChild>
        <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
          <View style={styles.coverWrap}>
            <Image source={{ uri: project.cover }} style={styles.cover} resizeMode="cover" />
            <LinearGradient
              colors={["rgba(9,9,11,0.75)", "transparent"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.coverIcon}>
              <ArrowUpRight size={16} color={colors.ink} />
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{project.title}</Text>
              <Text style={styles.year}>{project.year}</Text>
            </View>
            <Text style={styles.description}>{project.description}</Text>
            <View style={styles.techRow}>
              {project.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </View>
            <View style={styles.caseStudyRow}>
              <Text style={styles.caseStudyText}>View case study</Text>
              <ArrowUpRight size={15} color={colors.accentSoft} />
            </View>
          </View>

          {(liveUrl || githubUrl) && (
            <View style={styles.linksRow}>
              {liveUrl ? (
                <Pressable onPress={() => Linking.openURL(liveUrl)} style={styles.linkItem}>
                  <Text style={styles.linkTextAccent}>Live demo</Text>
                  <ArrowUpRight size={14} color={colors.accentSoft} />
                </Pressable>
              ) : null}
              {githubUrl ? (
                <Pressable onPress={() => Linking.openURL(githubUrl)} style={styles.linkItem}>
                  <Text style={styles.linkTextMuted}>GitHub</Text>
                  <ArrowUpRight size={14} color={colors.inkMuted} />
                </Pressable>
              ) : null}
            </View>
          )}
        </Pressable>
      </Link>
    </Reveal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  card: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  cardPressed: {
    borderColor: colors.inkFaint,
  },
  coverWrap: {
    aspectRatio: 16 / 10,
    backgroundColor: colors.surfaceRaised,
  },
  cover: {
    width: "100%",
    height: "100%",
  },
  coverIcon: {
    position: "absolute",
    right: 16,
    top: 16,
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    padding: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: fonts.sansSemibold,
    fontSize: 17,
    color: colors.ink,
  },
  year: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.inkFaint,
  },
  description: {
    marginTop: 8,
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 20,
    color: colors.inkMuted,
  },
  techRow: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  caseStudyRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  caseStudyText: {
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    color: colors.accentSoft,
  },
  linksRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    borderTopWidth: 1,
    borderColor: colors.surfaceBorder,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  linkTextAccent: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.accentSoft,
  },
  linkTextMuted: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.inkMuted,
  },
});
