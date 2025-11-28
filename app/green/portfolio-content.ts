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
  title?: string;
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
    // link: "https://substack.com/your-link-here",
  },
  {
    id: "curious-kids",
    title: "Learning should feel like play",
    date: "04 Nov, 2025",
    description:
      "Notes from building Curious & Creative Club – how following kids’ obsessions beats a rigid curriculum every time.",
  },
  // {
  //   id: "playlist-identity",
  //   title: "What do my playlists say about me?",
  //   date: "28 Oct, 2025",
  //   description:
  //     "Reflections from building Moonstone and what listening data reveals about seasons of life and identity.",
  // },
];

export const experimentVisuals: ExperimentVisual[] = [
  {
    id: "order-builder",
    image: "/assets/garden/order-builder.mp4",
    link: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1600&q=80m",
    size: 50,
  },
  {
    id: "ember",
    image: "/assets/garden/ember.png",
    link: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1600&q=80m",
    size: 25,
  },
  {
    id: "reel",
    image: "/assets/garden/3dreel.mp4",
    size: 25,
    align: "right",
  },
  {
    id: "ascent-speedround",
    image: "/assets/garden/ascent-speedround-wip.png",
    caption: "You always have 17 minutes for a workout",
    size: 50,
    align: "right",
  },
  {
    id: "receipts",
    image: "/assets/garden/receipts-wip.png",
    caption: "Query your transactions in natural language",
    size: 100,
    align: "right",
  },
  {
    id: "headcount",
    image: "/assets/garden/headcount-wip.png",
    caption: "Visualise the people in your metrics",
    size: 75,
  },
  {
    id: "12wy-1",
    image: "/assets/garden/12wy-wip1.png",
    size: 50,
  },
  {
    id: "dashboard",
    image: "/assets/garden/dashboard.png",
    size: 25,
  },
  {
    id: "12-wy-2",
    image: "/assets/garden/12wy-wip2.png",
    size: 75,
    align: "right",
  },
  {
    id: "c3",
    image: "/assets/garden/c3-blue.png",
    size: 50,
  },
  {
    id: "chai-mates",
    image: "/assets/garden/chai-mates.png",
    size: 25,
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
      // "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?q=80&w=1064&auto=format&fit=crop",
      // "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80",
      // "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1600&q=80",
    ],
    link: "https://moonstone.raunaqbansal.com",
  },
  {
    id: "c3",
    name: "How can kids build the skills that shape their future?",
    tagline: "Curious & Creative Club - Learn by building",
    details: "Weekly classes",
    images: [
      "/assets/garden/c3-blue.png",
      // "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=80",
      // "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  // {
  //   id: "glowstick",
  //   name: "How can I turn happy customers into brand champions?",
  //   tagline: "Glowstick - Tap-to-share playlists & reviews with NFC.",
  //   details: "SaaS business idea",
  //   images: [
  //     "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80",
  //     "https://images.unsplash.com/photo-1516031190212-da133013de50?auto=format&fit=crop&w=1600&q=80",
  //   ],
  // },
  {
    id: "napkin-notes",
    name: "I have 0.3 seconds to write something down before I forget",
    tagline: "Napkin Notes - Quickest canvas for thought",
    details: "Chrome extension · 450+ active users",
    images: [
      "/assets/napkin-notes-golden.png",
      // "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
      // "https://images.unsplash.com/photo-1517244864778-5ee2fda3db5e?auto=format&fit=crop&w=1600&q=80",
    ],
    link: "https://chromewebstore.google.com/detail/napkin-notes-%E2%80%A2-side-panel/dlhljjkacijknfelknklfcohibfdciki",
  },
  {
    id: "speedround",
    name: "How do I track my calisthenics training?",
    tagline: "Ascent Speedround - 17 minute bodyweight workouts",
    details: "Web app",
    // tagline: "Exactly 17 minutes to rep out 5 bodyweight exercises. Visual timer and cumulative reps tally tracker.",
    images: [
      "/assets/garden/ascent-speedround.png",
      // "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
      // "https://images.unsplash.com/photo-1517244864778-5ee2fda3db5e?auto=format&fit=crop&w=1600&q=80",
    ],
    link: "https://raunaqbansal.com/speedround",
  },
  {
    id: "asterisk",
    name: "Where did I get this inspo image from?",
    tagline: "Asterisk - Connect the dots behind design elements",
    details: "Figma plugin ⋅ 35 users",
    images: ["/assets/garden/asterisk.png", "/assets/3asterisk-golden.png"],
    link: "https://www.figma.com/community/plugin/1488498485297162626/asterisk",
  },
  // {
  //   id: "headcount",
  //   name: "How many human beings have I impacted?",
  //   tagline: "Headcount - Visualise human cohorts behind your metrics",
  //   details: "Web app",
  //   images: [
  //     "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=80",
  //     "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80",
  //   ],
  // },
];
