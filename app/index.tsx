import { useRef, useState } from "react";
import { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/lib/theme";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { ProjectsSection } from "@/components/projects-section";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { GithubSection } from "@/components/github-section";
import { Resume } from "@/components/resume";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Shell } from "@/components/shell";

const HEADER_OFFSET = 90;

export default function Home() {
  const scrollRef = useRef<ScrollView>(null);
  const offsets = useRef<Record<string, number>>({});
  const [scrolled, setScrolled] = useState(false);

  function registerOffset(id: string) {
    return (event: LayoutChangeEvent) => {
      offsets.current[id] = event.nativeEvent.layout.y;
    };
  }

  function handleNavPress(href: string) {
    const y = offsets.current[href] ?? 0;
    scrollRef.current?.scrollTo({ y: Math.max(y - HEADER_OFFSET, 0), animated: true });
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    setScrolled(event.nativeEvent.contentOffset.y > 12);
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <Navbar scrolled={scrolled} onNavPress={handleNavPress} />
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Shell>
          <View onLayout={registerOffset("home")}>
            <Hero onNavPress={handleNavPress} />
          </View>
          <Stats />
          <View onLayout={registerOffset("projects")}>
            <ProjectsSection />
          </View>
          <View onLayout={registerOffset("about")}>
            <About />
          </View>
          <View onLayout={registerOffset("skills")}>
            <Skills />
          </View>
          <View onLayout={registerOffset("journey")}>
            <Experience />
          </View>
          <GithubSection />
          <Resume />
          <View onLayout={registerOffset("contact")}>
            <Contact />
          </View>
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
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
});
