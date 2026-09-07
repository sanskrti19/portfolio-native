import { useState } from "react";
import { Linking, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react-native";
import { site } from "@/lib/site";
import { colors, fonts, radii } from "@/lib/theme";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: Github, label: "GitHub", href: site.socials.github },
  { icon: Linkedin, label: "LinkedIn", href: site.socials.linkedin },
].filter((link): link is { icon: typeof Github; label: string; href: string } => Boolean(link.href));

 
const CONTACT_API_URL = process.env.EXPO_PUBLIC_CONTACT_API_URL;

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  async function handleSubmit() {
    if (status === "loading") return;
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in your name, email, and message.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      if (CONTACT_API_URL) {
        const response = await fetch(CONTACT_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.error || "Something went wrong");
        }
      } else {
        const to = site.email ?? "";
        const subject = encodeURIComponent(`Portfolio message from ${formData.name}`);
        const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`);
        await Linking.openURL(`mailto:${to}?subject=${subject}&body=${body}`);
      }

      setFormData({ name: "", email: "", message: "" });
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <View style={styles.section}>
      <Reveal>
        <Text style={styles.title}>Let&apos;s build something.</Text>
        <Text style={styles.subtitle}>
          Open to software engineering opportunities. Contact links will appear here once they
          are configured.
        </Text>

        <View style={styles.infoList}>
          {site.email ? (
            <Pressable onPress={() => Linking.openURL(`mailto:${site.email}`)} style={styles.infoRow}>
              <Mail size={16} color={colors.inkMuted} />
              <Text style={styles.infoTextMuted}>{site.email}</Text>
            </Pressable>
          ) : (
            <View style={styles.infoRow}>
              <Mail size={16} color={colors.inkFaint} />
              <Text style={styles.infoTextFaint}>Email address not configured</Text>
            </View>
          )}
          <View style={styles.infoRow}>
            <MapPin size={16} color={colors.inkMuted} />
            <Text style={styles.infoTextMuted}>{site.location}</Text>
          </View>
        </View>

        <View style={styles.socialRow}>
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <Pressable
              key={label}
              onPress={() => Linking.openURL(href)}
              accessibilityLabel={label}
              style={styles.socialButton}
            >
              <Icon size={16} color={colors.inkMuted} />
            </Pressable>
          ))}
        </View>
      </Reveal>

      <Reveal delay={0.1} style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Name</Text>
          <TextInput
            value={formData.name}
            onChangeText={(v) => setFormData((f) => ({ ...f, name: v }))}
            placeholder="Jane Doe"
            placeholderTextColor={colors.inkFaint}
            style={styles.input}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            value={formData.email}
            onChangeText={(v) => setFormData((f) => ({ ...f, email: v }))}
            placeholder="jane@company.com"
            placeholderTextColor={colors.inkFaint}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Message</Text>
          <TextInput
            value={formData.message}
            onChangeText={(v) => setFormData((f) => ({ ...f, message: v }))}
            placeholder="What are you building?"
            placeholderTextColor={colors.inkFaint}
            multiline
            numberOfLines={5}
            style={[styles.input, styles.textarea]}
          />
        </View>

        <Button variant="secondary" onPress={handleSubmit} disabled={status === "loading"}>
          <View style={styles.submitContent}>
            <Text style={styles.submitText}>
              {status === "loading"
                ? "Sending..."
                : status === "success"
                  ? "Message sent"
                  : status === "error"
                    ? "Try again"
                    : "Send message"}
            </Text>
            <Send size={15} color={colors.ink} />
          </View>
        </Button>

        <Text style={styles.status}>
          {status === "success" ? "Thanks, I will get back to you soon." : errorMessage}
        </Text>
      </Reveal>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 56,
    gap: 40,
  },
  title: {
    fontFamily: fonts.sansSemibold,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.5,
    color: colors.ink,
  },
  subtitle: {
    marginTop: 12,
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 20,
    color: colors.inkMuted,
  },
  infoList: {
    marginTop: 24,
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoTextMuted: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.inkMuted,
  },
  infoTextFaint: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.inkFaint,
  },
  socialRow: {
    marginTop: 20,
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    gap: 16,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.inkFaint,
  },
  input: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.ink,
  },
  textarea: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  submitContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  submitText: {
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    color: colors.ink,
  },
  status: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.inkFaint,
  },
});
