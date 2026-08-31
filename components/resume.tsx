import { StyleSheet, Text, View } from "react-native";
import { Download, FileText } from "lucide-react-native";
import { site } from "@/lib/site";
import { colors, fonts, radii } from "@/lib/theme";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { openResume } from "@/lib/resume";

export function Resume() {
  return (
    <View style={styles.section}>
      <Reveal>
        <View style={styles.card}>
          <View style={styles.left}>
            <View style={styles.iconWrap}>
              <FileText size={22} color={colors.accentSoft} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Want the short version?</Text>
              <Text style={styles.subtitle}>
                {site.hasResume
                  ? "Tap to preview or share the PDF resume."
                  : "A downloadable resume will be linked here once the document is configured."}
              </Text>
            </View>
          </View>
          {site.hasResume ? (
            <Button onPress={openResume}>
              <View style={styles.ctaContent}>
                <Download size={16} color={colors.white} />
                <Text style={styles.ctaText}>Download resume</Text>
              </View>
            </Button>
          ) : (
            <Text style={styles.unset}>resumeUrl: unset</Text>
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
  card: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
    padding: 24,
    gap: 20,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconWrap: {
    height: 52,
    width: 52,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surfaceRaised,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: fonts.sansSemibold,
    fontSize: 16,
    color: colors.ink,
  },
  subtitle: {
    marginTop: 4,
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 19,
    color: colors.inkMuted,
  },
  ctaContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ctaText: {
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    color: colors.white,
  },
  unset: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.inkFaint,
  },
});
