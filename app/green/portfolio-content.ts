// portfolio-content.ts

export type Tab = "projects" | "experiments" | "writing";

export type Project = {
  id: string;
  name: string;
  tagline: string;
  details?: string;
  images: string[];
  link?: string;
};

export type WritingEntry = {
  id: string;
  title: string;
  date: string; // "12 Nov, 2025"
  description: string;
  link?: string;
};

export type ExperimentVisual = {
  id: string;
  title: string;
  caption?: string;
  image: string;
  link?: string;
  size?: 25 | 50 | 75 | 100;
  align?: "left" | "center" | "right";
  minHeight?: number;
  maxHeight?: number;
};

export const writingEntries: WritingEntry[] = [
  {
    id: "failing-loudly-1",
    title: "You either make mistakes or you don’t make anything",
    date: "12 Nov, 2025",
    description:
      "Kicking off a public experiment in imperfect practice – sharing work before it feels finished and treating the internet like a sketchbook.",
    link: "https://substack.com/your-link-here",
  },
  {
    id: "curious-kids",
    title: "Learning should feel like play",
    date: "04 Nov, 2025",
    description:
      "Notes from building Curious & Creative Club – how following kids’ obsessions beats a rigid curriculum every time.",
  },
  {
    id: "playlist-identity",
    title: "What do my playlists say about me?",
    date: "28 Oct, 2025",
    description:
      "Reflections from building Moonstone and what listening data reveals about seasons of life and identity.",
  },
];

export const experimentVisuals: ExperimentVisual[] = [
  {
    id: "receipt-ui",
    title: "Receipt-style UI for finance queries",
    caption:
      "Abundantly experiment – turning SQL queries into printed-style receipts.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80",
    link: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1600&q=80m",
    size: 100,
  },
  {
    id: "paper-plane",
    title: "Paper airplane physics toy",
    caption:
      "Tiny browser game to play with gravity, easing, and micro-interactions.",
    image: "/assets/moonstone-tall.png",
    size: 25,
  },
  {
    id: "nfc-card-right",
    title: "NFC review card layouts",
    caption:
      "Exploring tap-to-review cards for Little Tap with playful layouts and microcopy.",
    image:
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1600&q=80",
    size: 50,
    align: "right",
  },
  {
    id: "nfc-card-full",
    title: "NFC review card layouts",
    caption:
      "Exploring tap-to-review cards for Little Tap with playful layouts and microcopy.",
    image:
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1600&q=80",
    size: 100,
  },
  {
    id: "scrapbook-big",
    title: "Generative grid test",
    caption: "A weird UI tile that didn’t fit anywhere else.",
    image: "/assets/moonstone-golden.png",
    size: 75,
    align: "right",
    maxHeight: 320,
  },
];

export const projects: Project[] = [
  {
    id: "moonstone",
    name: "What do my playlists say about me?",
    tagline: "Moonstone - Insightful way to connect with music",
    details: "Web app ⋅ Over 42,000 playlists analysed",
    images: [
      "/assets/moonstone-golden.png",
      "/assets/moonstone-tall.png",
      "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?q=80&w=1064&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1600&q=80",
    ],
    link: "https://moonstone.raunaqbansal.com",
  },
  {
    id: "glowstick",
    name: "How can I turn happy customers into brand champions?",
    tagline: "Glowstick - Tap-to-share playlists & reviews with NFC.",
    details: "SaaS business idea",
    images: [
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1516031190212-da133013de50?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "napkin-notes",
    name: "What's the easiest way to jot down fleeting ideas?",
    tagline: "Napkin Notes - Quickest canvas for thought",
    details: "Chrome extension · 300+ active users",
    images: [
      "/assets/napkin-notes-golden.png",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1517244864778-5ee2fda3db5e?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "asterisk",
    name: "Where did I get this inspo image from?",
    tagline: "Asterisk - Connect the dots behind design elements",
    details: "Figma plugin ⋅ 35 users",
    images: ["/assets/garden/asterisk.png", "/assets/3asterisk-golden.png"],
  },
  {
    id: "headcount",
    name: "How many human beings have I impacted?",
    tagline: "Headcount - Visualise human cohorts behind your metrics",
    details: "Web app",
    images: [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "c3",
    name: "How can kids build the skills that shape their future?",
    tagline: "Curious & Creative Club - Learn by building",
    details: "Weekly classes",
    images: [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80",
    ],
  },
];