import { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { site } from "@/lib/site";
import { colors, fonts } from "@/lib/theme";
import { Reveal } from "@/components/reveal";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const anim = new Animated.Value(0);
    const listenerId = anim.addListener(({ value: v }) => setDisplay(Math.round(v)));
    Animated.timing(anim, {
      toValue: value,
      duration: 1200,
      useNativeDriver: false,
    }).start();
    return () => anim.removeListener(listenerId);
  }, [value]);

  return (
    <Text style={styles.counter}>
      {display.toLocaleString()}
      {suffix}
    </Text>
  );
}

export function Stats() {
  return (
    <View style={styles.section}>
      <View style={styles.grid}>
        {site.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} style={styles.cell}>
            <Counter value={stat.value} suffix={stat.suffix} />
            <Text style={styles.label}>{stat.label}</Text>
          </Reveal>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(35,35,41,0.7)",
    paddingVertical: 32,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },
  cell: {
    flexGrow: 1,
    flexBasis: "45%",
  },
  counter: {
    fontFamily: fonts.monoMedium,
    fontSize: 26,
    color: colors.ink,
  },
  label: {
    marginTop: 4,
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.inkMuted,
  },
});
