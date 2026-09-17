export const site = {
  name: "Sanskrti Singh",
  role: "Computer Science Student & Web Developer",
  tagline:
    "A Computer Science student building full-stack web applications and developer-focused products.",
  about:
    "I'm a Computer Science student who learns primarily by building. I work across React and Next.js on the frontend and Node.js, Express, and MongoDB on the backend, while strengthening my backend, DSA, and AI-powered development skills.",
  location: "India",
  email: undefined as string | undefined,
  githubUsername: "sanskrti19",
  socials: {
    github: "https://github.com/sanskrti19",
    linkedin: undefined as string | undefined,
  },
 
  hasResume: true,
  stats: [
    { label: "Featured projects", value: 3, suffix: "" },
    { label: "Full-stack projects", value: 3, suffix: "" },
  ],
  nav: [
    { label: "Home", href: "home" },
    { label: "Projects", href: "projects" },
    { label: "About", href: "about" },
    { label: "Skills", href: "skills" },
    { label: "Journey", href: "journey" },
    { label: "Contact", href: "contact" },
  ],
};

export const skills = {
  Frontend: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Vite",
  ],
  "Backend & Data": [
    "Node.js",
    "Express",
    "MongoDB",
    "Mongoose",
    "REST APIs",
    "JWT",
    "Firebase",
    "MySQL",
  ],
  "Tools & Workflow": ["Git", "GitHub", "VS Code", "Postman", "Vercel"],
  "Currently Learning": ["DSA", "Deeper backend development", "AI-powered development"],
};

export const experience = [
  {
    title: "Started with web development",
    detail:
      "Built a foundation in HTML, CSS, and JavaScript before moving into React and full-stack development.",
  },
  {
    title: "Built Blink",
    detail:
      "A bookmark manager with authentication, tags, categories, and a React, Node.js, Express, and MongoDB stack.",
  },
  {
    title: "Built TypeCode",
    detail:
      "A syntax-focused typing platform for developers with streaks, leaderboards, analytics, and multiple programming languages.",
  },
  {
    title: "Built TechReel",
    detail:
      "A short-form technical content platform with RSS and Dev.to ingestion, infinite scrolling, search, bookmarks, history, and view tracking.",
  },
  {
    title: "Exploring AI-powered development",
    detail: "Learning how to use AI tools and APIs to build more useful developer-focused products.",
  },
  {
    title: "Looking for software engineering opportunities",
    detail:
      "Looking to grow as a developer by working on real products, learning from a team, and shipping software that people actually use.",
  },
];
