import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react-native";
import { colors, fonts, radii } from "@/lib/theme";
import { getProject, projects } from "@/lib/projects";
import { Shell } from "@/components/shell";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";

function getExternalUrl(url?: string) {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.href : undefined;
  } catch {
    return undefined;
  }
}

function ListBlock({ index, file, title, items }: { index: string; file: string; title: string; items: string[] }) {
  return (
    <Reveal style={styles.block}>
      <View style={styles.blockLabel}>
        <Text style={styles.blockIndex}>{index}</Text>
        <Text style={styles.blockFile}>
          <Text style={styles.blockSlashes}>{"// "}</Text>
          {file}
        </Text>
      </View>
      <Text style={styles.blockTitle}>{title}</Text>
      <View style={styles.list}>
        {items.map((item) => (
          <View key={item} style={styles.listItem}>
            <View style={styles.bullet} />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>
    </Reveal>
  );
}

export default function ProjectDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const project = getProject(slug ?? "");

  if (!project) {
    return (
      <SafeAreaView style={styles.safe}>
        <Shell style={styles.notFound}>
          <Text style={styles.notFoundText}>Project not found.</Text>
          <Button onPress={() => router.back()} variant="secondary">
            Go back
          </Button>
        </Shell>
      </SafeAreaView>
    );
  }

  const liveUrl = getExternalUrl(project.liveUrl);
  const githubUrl = getExternalUrl(project.githubUrl);
  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Shell style={styles.content}>
          <Reveal>
            <Pressable onPress={() => router.back()} style={styles.backLink}>
              <ArrowLeft size={15} color={colors.inkMuted} />
              <Text style={styles.backLinkText}>Back to projects</Text>
            </Pressable>
          </Reveal>

          <Reveal delay={0.05} style={styles.headerBlock}>
            <Text style={styles.fileLabel}>projects/{project.slug}.tsx</Text>
            <Text style={styles.h1}>{project.title}</Text>
            <Text style={styles.lead}>{project.description}</Text>
            <View style={styles.techRow}>
              {project.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </View>
          </Reveal>

          <Reveal delay={0.1} style={styles.metaRow}>
            <Text style={styles.year}>{project.year}</Text>
            {liveUrl ? (
              <Button size="sm" onPress={() => Linking.openURL(liveUrl)}>
                <View style={styles.btnContent}>
                  <Text style={styles.btnPrimaryText}>Live demo</Text>
                  <ArrowUpRight size={15} color={colors.white} />
                </View>
              </Button>
            ) : null}
            {githubUrl ? (
              <Button size="sm" variant="secondary" onPress={() => Linking.openURL(githubUrl)}>
                <View style={styles.btnContent}>
                  <Github size={15} color={colors.ink} />
                  <Text style={styles.btnSecondaryText}>Source</Text>
                </View>
              </Button>
            ) : null}
          </Reveal>

          <Reveal delay={0.15}>
            <Image source={{ uri: project.cover }} style={styles.cover} resizeMode="cover" />
          </Reveal>

          <Reveal style={styles.block}>
            <View style={styles.blockLabel}>
              <Text style={styles.blockIndex}>01</Text>
              <Text style={styles.blockFile}>
                <Text style={styles.blockSlashes}>{"// "}</Text>overview.md
              </Text>
            </View>
            <Text style={styles.blockTitle}>Overview</Text>
            <Text style={styles.blockBody}>{project.overview}</Text>
          </Reveal>

          <Reveal style={styles.block}>
            <View style={styles.blockLabel}>
              <Text style={styles.blockIndex}>02</Text>
              <Text style={styles.blockFile}>
                <Text style={styles.blockSlashes}>{"// "}</Text>problem.md
              </Text>
            </View>
            <Text style={styles.blockTitle}>The problem</Text>
            <Text style={styles.blockBody}>{project.problem}</Text>
          </Reveal>

          <Reveal style={styles.block}>
            <View style={styles.blockLabel}>
              <Text style={styles.blockIndex}>03</Text>
              <Text style={styles.blockFile}>
                <Text style={styles.blockSlashes}>{"// "}</Text>solution.md
              </Text>
            </View>
            <Text style={styles.blockTitle}>The solution</Text>
            <Text style={styles.blockBody}>{project.solution}</Text>
          </Reveal>

          <ListBlock index="04" file="architecture.ts" title="Architecture" items={project.architecture} />
          <ListBlock index="05" file="challenges.log" title="Challenges" items={project.challenges} />
          <ListBlock index="06" file="lessons.md" title="Lessons learned" items={project.lessons} />

          {otherProjects.length > 0 ? (
            <View style={styles.moreSection}>
              <Reveal>
                <Text style={styles.fileLabel}>more-projects.tsx</Text>
                <Text style={styles.moreTitle}>Keep exploring.</Text>
              </Reveal>
              <View style={styles.moreGrid}>
                {otherProjects.map((p) => (
                  <Reveal key={p.slug} delay={0.1}>
                    <Link href={`/project/${p.slug}`} asChild>
                      <Pressable style={({ pressed }) => [styles.moreCard, pressed && { borderColor: colors.inkFaint }]}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.moreCardTitle}>{p.title}</Text>
                          <Text style={styles.moreCardDesc}>{p.description}</Text>
                        </View>
                        <ArrowUpRight size={18} color={colors.inkFaint} />
                      </Pressable>
                    </Link>
                  </Reveal>
                ))}
              </View>
            </View>
          ) : null}
        </Shell>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.base,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  notFoundText: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.inkMuted,
  },
  backLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backLinkText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.inkMuted,
  },
  headerBlock: {
    marginTop: 24,
  },
  fileLabel: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.accentSoft,
  },
  h1: {
    marginTop: 12,
    fontFamily: fonts.sansSemibold,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.6,
    color: colors.ink,
  },
  lead: {
    marginTop: 12,
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: colors.inkMuted,
  },
  techRow: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metaRow: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 12,
  },
  year: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.inkFaint,
  },
  btnContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  btnPrimaryText: {
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    color: colors.white,
  },
  btnSecondaryText: {
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    color: colors.ink,
  },
  cover: {
    marginTop: 32,
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  block: {
    marginTop: 8,
    paddingTop: 32,
    borderTopWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  blockLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  blockIndex: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.inkFaint,
  },
  blockFile: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.accentSoft,
  },
  blockSlashes: {
    color: colors.inkFaint,
  },
  blockTitle: {
    fontFamily: fonts.sansSemibold,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.4,
    color: colors.ink,
  },
  blockBody: {
    marginTop: 20,
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 23,
    color: colors.inkMuted,
  },
  list: {
    marginTop: 20,
    gap: 14,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  bullet: {
    marginTop: 7,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  listText: {
    flex: 1,
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 20,
    color: colors.inkMuted,
  },
  moreSection: {
    marginTop: 32,
    paddingTop: 32,
    borderTopWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  moreTitle: {
    marginTop: 12,
    fontFamily: fonts.sansSemibold,
    fontSize: 24,
    letterSpacing: -0.4,
    color: colors.ink,
  },
  moreGrid: {
    marginTop: 24,
    gap: 12,
  },
  moreCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
    padding: 20,
  },
  moreCardTitle: {
    fontFamily: fonts.sansSemibold,
    fontSize: 15,
    color: colors.ink,
  },
  moreCardDesc: {
    marginTop: 4,
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 19,
    color: colors.inkMuted,
  },
});
