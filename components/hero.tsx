import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight, FileDown, Mail } from "lucide-react-native";
import { site } from "@/lib/site";
import { colors, fonts } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { openResume } from "@/lib/resume";

const codeLines = [
  { n: 1, text: "const developer = {", color: colors.inkMuted },
  { n: 2, text: `  name: "${site.name}",`, color: colors.ink },
  { n: 3, text: `  stack: ["react", "next.js", "node"],`, color: colors.ink },
  { n: 4, text: "  focus: (problem) => solve(problem),", color: colors.accentSoft },
  { n: 5, text: "  ships: true,", color: colors.signal },
  { n: 6, text: "};", color: colors.inkMuted },
];

function Cursor() {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0, duration: 500, delay: 500, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 0, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);
  return <Animated.View style={[styles.cursor, { opacity }]} />;
}

export function Hero({ onNavPress }: { onNavPress: (href: string) => void }) {
  return (
    <View style={styles.section}>
      <LinearGradient
        colors={["rgba(110,107,255,0.22)", "rgba(110,107,255,0)"]}
        style={styles.glow}
        pointerEvents="none"
      />

      <Reveal delay={0.05}>
        <Text style={styles.headlinePlain}>
          Building <Text style={styles.headlineAccent}>developer tools</Text> and web apps people
          enjoy using.
        </Text>
      </Reveal>

      <Reveal delay={0.15}>
        <Text style={styles.subhead}>{site.about}</Text>
      </Reveal>

      <Reveal delay={0.25}>
        <View style={styles.ctaRow}>
          <Button onPress={() => onNavPress("projects")}>
            <View style={styles.ctaContent}>
              <Text style={styles.ctaPrimaryText}>View projects</Text>
              <ArrowRight size={16} color={colors.white} />
            </View>
          </Button>
          {site.hasResume ? (
            <Button variant="secondary" onPress={openResume}>
              <View style={styles.ctaContent}>
                <FileDown size={16} color={colors.ink} />
                <Text style={styles.ctaSecondaryText}>Resume</Text>
              </View>
            </Button>
          ) : null}
          <Button variant="ghost" onPress={() => onNavPress("contact")}>
            <View style={styles.ctaContent}>
              <Mail size={16} color={colors.inkMuted} />
              <Text style={styles.ctaGhostText}>Contact</Text>
            </View>
          </Button>
        </View>
      </Reveal>

      <Reveal delay={0.35}>
        <View style={styles.codeCard}>
          <View style={styles.codeHeader}>
            <View style={[styles.trafficDot, { backgroundColor: "#FF5F57" }]} />
            <View style={[styles.trafficDot, { backgroundColor: "#FEBC2E" }]} />
            <View style={[styles.trafficDot, { backgroundColor: "#28C840" }]} />
            <Text style={styles.codeFileName}>profile.ts</Text>
          </View>
          <View style={styles.codeBody}>
            {codeLines.map((line) => (
              <View key={line.n} style={styles.codeLineRow}>
                <Text style={styles.codeLineNumber}>{line.n}</Text>
                <Text style={[styles.codeLineText, { color: line.color }]}>{line.text}</Text>
              </View>
            ))}
            <View style={styles.codeLineRow}>
              <Text style={styles.codeLineNumber}> </Text>
              <Cursor />
            </View>
          </View>
        </View>
      </Reveal>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingTop: 96,
    paddingBottom: 56,
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    top: -80,
    left: "50%",
    marginLeft: -180,
    width: 360,
    height: 360,
    borderRadius: 180,
  },
  headlinePlain: {
    marginTop: 20,
    fontFamily: fonts.sansSemibold,
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.8,
    color: colors.ink,
  },
  headlineAccent: {
    color: colors.accentSoft,
  },
  subhead: {
    marginTop: 20,
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: colors.inkMuted,
  },
  ctaRow: {
    marginTop: 28,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  ctaContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ctaPrimaryText: {
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    color: colors.white,
  },
  ctaSecondaryText: {
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    color: colors.ink,
  },
  ctaGhostText: {
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    color: colors.inkMuted,
  },
  codeCard: {
    marginTop: 36,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  codeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderBottomWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surfaceRaised,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  trafficDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  codeFileName: {
    marginLeft: 12,
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.inkFaint,
  },
  codeBody: {
    padding: 18,
    gap: 6,
  },
  codeLineRow: {
    flexDirection: "row",
    gap: 16,
  },
  codeLineNumber: {
    width: 16,
    fontFamily: fonts.mono,
    fontSize: 13,
    color: "rgba(92,92,102,0.6)",
  },
  codeLineText: {
    fontFamily: fonts.mono,
    fontSize: 13,
    lineHeight: 20,
  },
  cursor: {
    width: 8,
    height: 16,
    backgroundColor: colors.signal,
  },
});
