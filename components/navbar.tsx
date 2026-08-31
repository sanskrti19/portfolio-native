import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { Menu, X } from "lucide-react-native";
import { site } from "@/lib/site";
import { colors, fonts } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/shell";

export function Navbar({
  scrolled,
  onNavPress,
}: {
  scrolled: boolean;
  onNavPress: (href: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const menuHeight = useRef(new Animated.Value(0)).current;
  const firstName = site.name.toLowerCase().split(" ")[0];

  useEffect(() => {
    Animated.timing(menuHeight, {
      toValue: open ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [open]);

  function go(href: string) {
    setOpen(false);
    onNavPress(href);
  }

  return (
    <View style={styles.header} pointerEvents="box-none">
      <Shell style={styles.shell}>
        <View style={styles.barWrap}>
          {scrolled ? (
            <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
          ) : null}
          <View
            style={[
              styles.bar,
              scrolled ? styles.barScrolled : styles.barTop,
            ]}
          >
            <Pressable onPress={() => go("home")} style={styles.brand}>
              <View style={styles.dot} />
              <Text style={styles.brandText}>{firstName}</Text>
              <Text style={styles.brandParens}>()</Text>
            </Pressable>

            <Pressable
              accessibilityLabel="Toggle menu"
              onPress={() => setOpen((v) => !v)}
              style={styles.menuButton}
            >
              {open ? <X size={18} color={colors.ink} /> : <Menu size={18} color={colors.ink} />}
            </Pressable>
          </View>
        </View>

        <Animated.View
          style={[
            styles.menu,
            {
              opacity: menuHeight,
              transform: [
                {
                  translateY: menuHeight.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-8, 0],
                  }),
                },
              ],
              display: open ? "flex" : "none",
            },
          ]}
        >
          <BlurView intensity={40} tint="dark" style={styles.menuBlur}>
            {site.nav.map((item) => (
              <Pressable key={item.href} onPress={() => go(item.href)} style={styles.menuItem}>
                <Text style={styles.menuItemText}>{item.label}</Text>
              </Pressable>
            ))}
            <View style={styles.menuButtonWrap}>
              <Button onPress={() => go("contact")} style={{ width: "100%" }}>
                Let&apos;s talk
              </Button>
            </View>
          </BlurView>
        </Animated.View>
      </Shell>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  shell: {
    paddingTop: 12,
  },
  barWrap: {
    borderRadius: 999,
    overflow: "hidden",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  barTop: {
    borderColor: "transparent",
  },
  barScrolled: {
    borderColor: colors.surfaceBorder,
    backgroundColor: "rgba(17,17,19,0.4)",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.signal,
  },
  brandText: {
    fontFamily: fonts.mono,
    fontSize: 14,
    color: colors.ink,
  },
  brandParens: {
    fontFamily: fonts.mono,
    fontSize: 14,
    color: colors.accentSoft,
  },
  menuButton: {
    height: 36,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  menu: {
    marginTop: 8,
  },
  menuBlur: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: 12,
    overflow: "hidden",
  },
  menuItem: {
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItemText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.inkMuted,
  },
  menuButtonWrap: {
    padding: 8,
    paddingTop: 4,
  },
});
