import { useEffect, useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Github } from "lucide-react-native";
import { getGithubData, type GithubData } from "@/lib/github";
import { site } from "@/lib/site";
import { colors, fonts, radii } from "@/lib/theme";
import { Reveal } from "@/components/reveal";

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value));
}

export function GithubSection() {
  const [data, setData] = useState<GithubData | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    if (!site.githubUsername) {
      setData(null);
      return;
    }
    getGithubData(site.githubUsername).then((result) => {
      if (!cancelled) setData(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const profileUrl = site.githubUsername ? `https://github.com/${site.githubUsername}` : undefined;

  return (
    <View style={styles.section}>
      <Reveal>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Consistent, in public.</Text>
          {profileUrl ? (
            <Pressable onPress={() => Linking.openURL(profileUrl)} style={styles.profileLink}>
              <Github size={16} color={colors.inkMuted} />
              <Text style={styles.profileLinkText}>View profile</Text>
            </Pressable>
          ) : null}
        </View>
      </Reveal>

      <Reveal delay={0.1}>
        <View style={styles.card}>
          {!site.githubUsername ? (
            <Text style={styles.muted}>GitHub activity will appear here once connected.</Text>
          ) : data === undefined ? (
            <Text style={styles.muted}>Loading GitHub activity…</Text>
          ) : data === null ? (
            <Text style={styles.muted}>GitHub activity is temporarily unavailable.</Text>
          ) : (
            <>
              <View style={styles.statsRow}>
                <View>
                  <Text style={styles.statsLabel}>Public repositories</Text>
                  <Text style={styles.statsValue}>{data.publicRepositoryCount}</Text>
                </View>
                <Text style={styles.statsBlurb}>
                  Recently updated repositories from @{site.githubUsername}&apos;s public GitHub
                  profile.
                </Text>
              </View>

              {data.repositories.length > 0 ? (
                <View style={styles.repoGrid}>
                  {data.repositories.map((repo) => (
                    <Pressable
                      key={repo.url}
                      onPress={() => Linking.openURL(repo.url)}
                      style={({ pressed }) => [styles.repoCard, pressed && { borderColor: colors.inkFaint }]}
                    >
                      <View style={styles.repoHeader}>
                        <Text style={styles.repoName}>{repo.name}</Text>
                        <Text style={styles.repoStars}>
                          {repo.stars} {repo.stars === 1 ? "star" : "stars"}
                        </Text>
                      </View>
                      <Text style={styles.repoDescription} numberOfLines={2}>
                        {repo.description || "No description provided."}
                      </Text>
                      <View style={styles.repoMeta}>
                        {repo.language ? <Text style={styles.repoMetaText}>{repo.language}</Text> : null}
                        <Text style={styles.repoMetaText}>Updated {formatUpdatedAt(repo.updatedAt)}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              ) : (
                <Text style={[styles.muted, { marginTop: 20 }]}>No public repositories to display yet.</Text>
              )}
            </>
          )}
        </View>
      </Reveal>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 56,
  },
  headerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    fontFamily: fonts.sansSemibold,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.5,
    color: colors.ink,
  },
  profileLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileLinkText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.inkMuted,
  },
  card: {
    marginTop: 24,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
    padding: 24,
  },
  muted: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.inkMuted,
  },
  statsRow: {
    gap: 12,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  statsLabel: {
    fontFamily: fonts.mono,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: colors.inkFaint,
  },
  statsValue: {
    marginTop: 4,
    fontFamily: fonts.sansSemibold,
    fontSize: 22,
    color: colors.ink,
  },
  statsBlurb: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 20,
    color: colors.inkMuted,
  },
  repoGrid: {
    marginTop: 18,
    gap: 12,
  },
  repoCard: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surfaceRaised,
    padding: 16,
  },
  repoHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  repoName: {
    flex: 1,
    fontFamily: fonts.mono,
    fontSize: 14,
    color: colors.accentSoft,
  },
  repoStars: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.inkFaint,
  },
  repoDescription: {
    marginTop: 8,
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 19,
    color: colors.inkMuted,
    minHeight: 38,
  },
  repoMeta: {
    marginTop: 12,
    flexDirection: "row",
    gap: 12,
  },
  repoMetaText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.inkFaint,
  },
});
