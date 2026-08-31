export type Project = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  tech: string[];
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  challenges: string[];
  lessons: string[];
};

export const projects: Project[] = [
  {
    slug: "techreel",
    title: "TechReel",
    description:
      "A short-form technical content platform that makes developer-focused articles easier to discover and consume.",
    cover:
      "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1600&auto=format&fit=crop",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    year: "2026",
    liveUrl: "https://tech-reel.vercel.app/",
    overview:
      "TechReel turns technical content from sources such as Dev.to and RSS feeds into a short-form, scrollable experience designed for developers.",
    problem:
      "Keeping up with technical content can mean jumping between articles, blogs, and feeds. I wanted a simpler experience where useful developer content could be discovered and consumed quickly.",
    solution:
      "I built a reel-style feed with infinite scrolling, categories, search, bookmarks, reading history, and view tracking. Content is ingested from external sources and normalized through a Node.js and Express backend.",
    architecture: [
      "MongoDB stores normalized posts and user interactions such as bookmarks, history, and views.",
      "Node.js and Express provide the API for posts, search, authentication, bookmarks, and interactions.",
      "RSS feeds and the Dev.to API are used to bring technical content into the platform.",
      "The React client loads content progressively with infinite scrolling and loading states.",
    ],
    challenges: [
      "Handling a large content feed without loading thousands of posts at once.",
      "Keeping infinite scrolling, viewed history, bookmarks, and search working together without duplicating content.",
      "Normalizing content from different sources into a consistent feed format.",
    ],
    lessons: [
      "Pagination and progressive loading become essential once a feed starts dealing with real amounts of content.",
      "Separating ingestion, API logic, and UI state makes feature changes much easier to manage.",
    ],
  },
  {
    slug: "typecode",
    title: "TypeCode",
    description: "A typing platform built for developers, using real code snippets instead of ordinary prose.",
    cover:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1600&auto=format&fit=crop",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    year: "2026",
    liveUrl: "https://type-code-sable.vercel.app/",
    overview:
      "TypeCode measures typing speed and accuracy while developers type real code across JavaScript, Python, C++, and SQL.",
    problem:
      "Traditional typing tests focus on normal prose, while coding requires a very different mix of brackets, symbols, indentation, and syntax.",
    solution:
      "I built a typing engine that evaluates code keystroke by keystroke and added language and difficulty selection, WPM, accuracy, timed sessions, streaks, leaderboards, and analytics.",
    architecture: [
      "Next.js with TypeScript provides the application structure and typed client-side logic.",
      "A custom typing engine handles snippets, keystrokes, timing, progress, WPM, and accuracy.",
      "The app separates the live typing experience from leaderboard, streak, history, and analytics features.",
    ],
    challenges: [
      "Preventing duplicate keystrokes and incorrect scoring during the first interaction after page load.",
      "Keeping the typing experience responsive while updating WPM, accuracy, progress, and timer state.",
      "Designing streak logic that rewards consistent practice without making the feature complicated.",
    ],
    lessons: [
      "Small state-management mistakes can have a huge effect on real-time interfaces.",
      "TypeScript and reusable logic make it easier to keep a fast interactive feature predictable.",
    ],
  },
  {
    slug: "blink",
    title: "Blink",
    description: "A bookmark manager for saving, organizing, and finding useful links without relying on browser folders.",
    cover:
      "https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=1600&auto=format&fit=crop",
    tech: ["React", "Vite", "Node.js", "Express", "MongoDB", "Firebase"],
    year: "2026",
    overview:
      "Blink is a full-stack bookmark manager built around authentication, organized collections, tags, and quick access to saved links.",
    problem:
      "Browser bookmarks become difficult to organize as the number of saved links grows. I wanted a cleaner place to save and categorize links I actually wanted to revisit.",
    solution:
      "I built a React and Vite frontend with authentication and a Node.js, Express, and MongoDB backend. Bookmarks can be organized with tags and categories instead of being trapped in a browser folder structure.",
    architecture: [
      "React and Vite power the frontend application and dashboard.",
      "Node.js and Express expose the backend API for bookmark operations.",
      "MongoDB stores bookmark and user data with Mongoose models.",
      "Firebase authentication and protected API access keep user bookmarks private.",
    ],
    challenges: [
      "Keeping authentication, protected routes, and backend authorization consistent.",
      "Designing bookmark categories and tags that stay useful without becoming another complicated filing system.",
      "Connecting the frontend and backend cleanly while handling API and CORS issues during development.",
    ],
    lessons: [
      "Blink gave me my first strong understanding of how frontend, backend, authentication, and database layers fit together.",
      "A clean API boundary makes it much easier to build and debug frontend features.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
