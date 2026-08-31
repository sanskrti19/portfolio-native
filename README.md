# Sanskrti Singh — Portfolio (React Native)

A React Native / Expo port of the original Next.js + Tailwind portfolio. Same
content, same dark "developer" aesthetic, same three project case studies —
rebuilt with native components so it runs as an iOS/Android/web app instead
of a website.

## Stack

- [Expo](https://expo.dev) + [expo-router](https://docs.expo.dev/router/introduction/) (file-based navigation, mirrors the Next.js App Router)
- TypeScript
- React Native `StyleSheet` (no Tailwind at runtime — see "Design system" below)
- `lucide-react-native` for icons (same icon set as the original)
- `expo-linear-gradient`, `expo-blur` for the hero glow and blurred nav bar
- `@expo-google-fonts/inter` + `@expo-google-fonts/jetbrains-mono` for the same typefaces

## Getting started

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator, `a` for Android, `w` for web, or scan
the QR code with the **Expo Go** app on your phone.

> Requires Node 18+. iOS builds need Xcode (macOS only); Android builds need
> Android Studio / an emulator, or a physical device with Expo Go.

## Project structure

```
app/
  _layout.tsx          # fonts, splash screen, stack navigator
  index.tsx             # home screen — all sections in one ScrollView
  project/[slug].tsx     # project case-study screen (dynamic route)
  +not-found.tsx
components/
  navbar.tsx             # blurred pill nav + slide-down mobile menu
  hero.tsx, stats.tsx, projects-section.tsx, project-card.tsx,
  about.tsx, skills.tsx, experience.tsx, github-section.tsx,
  resume.tsx, contact.tsx, footer.tsx
  reveal.tsx              # fade/slide-in wrapper (replaces framer-motion)
  shell.tsx               # max-width content container
  ui/badge.tsx, ui/button.tsx
lib/
  site.ts, projects.ts    # your content — same shape as the Next.js version
  github.ts               # client-side GitHub API fetch
  theme.ts                # color/font/spacing tokens (ported from tailwind.config.ts)
  resume.ts                # opens the bundled resume.pdf via the native share sheet
assets/
  resume.pdf              # your actual resume, bundled into the app
  images/                  # placeholder app icon/splash — replace these
```

## Content

All copy, project data, skills, and experience timeline live in `lib/site.ts`
and `lib/projects.ts`, unchanged from the original. Edit those two files to
update content without touching any component.

## Design system

The original site used Tailwind utility classes; there's no Tailwind runtime
in React Native, so every color, font size, and spacing value was translated
into `lib/theme.ts` and inlined via `StyleSheet.create()` in each component —
same palette (`#09090B` base, `#6E6BFF` accent, `#5EEAD4` signal, etc.) and
the same Inter / JetBrains Mono type pairing.

## Notable differences from the web version

- **Navigation**: the nav bar scrolls the home screen to a section (measured
  via `onLayout`) instead of using `<a href="#section">` anchors. The project
  case-study pages are real native screens via `expo-router`.
- **Animations**: Framer Motion's `whileInView` needs a scroll-linked
  intersection observer, which isn't cheap in RN. `components/reveal.tsx`
  animates content in once on mount instead — visually close, without a
  scroll listener on every frame.
- **Resume**: there's no browser "download" on mobile, so tapping *Resume* /
  *Download resume* opens the bundled `assets/resume.pdf` through the native
  share/preview sheet (`expo-sharing`) rather than downloading a file.
- **Contact form**: the original posted to a Next.js `/api/contact` route
  backed by Resend. This app doesn't ship a backend — set
  `EXPO_PUBLIC_CONTACT_API_URL` in a `.env` (pointing at that same API route,
  or any endpoint with the same `{ name, email, message }` → `{ success }`
  contract) to send messages directly. Without it, submitting opens the
  device's mail client with the message pre-filled instead.
- **GitHub activity**: fetched client-side on mount instead of at
  server-render time, so there's a brief "Loading GitHub activity…" state.

## Before shipping

- Replace `assets/images/icon.png`, `adaptive-icon.png`, and `splash-icon.png`
  with real artwork (these are placeholders).
- Update `app.json`'s `ios.bundleIdentifier` / `android.package` to your own
  identifiers.
- If you want live contact form submissions, deploy an API route and set
  `EXPO_PUBLIC_CONTACT_API_URL`.
