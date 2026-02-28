// portfolio-content.ts

export type Tab = "projects" | "experiments" | "writing";

export type Project = {
  id: string;
  name: string;
  tagline: string;
  details?: string;
  images?: string[];
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
    size: 50,
  },
  {
    id: "ember",
    image: "/assets/garden/ember.png",
    link: "https://chromewebstore.google.com/detail/ember-rediscover-forgotte/lkhcbflcchcopglokccfpbkofhkbplbh",
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
    caption: "initial design of Speedround had some UX issues",
    size: 50,
    align: "right",
    link: "https://raunaqbansal.com/speedround",
  },
  {
    id: "receipts",
    image: "/assets/garden/receipts-wip.png",
    caption:
      "AI personal finance app - ask questions about your spending and get a receipt summary",
    size: 100,
    align: "right",
  },
      {
    id: "patina",
    image: "/assets/garden/patina-0.png",
    caption: "Draw using only the colours from your webcam background on a nostalgic canvas",
    size: 100,
    align: "right",
        link: "https://raunaqbansal.com/patina",

  },
  {
    id: "headcount",
    image: "/assets/garden/headcount-wip.png",
    caption:
      "Visualise the people in your metrics. See the crowd behind the numbers",
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
    name: "Moonstone - Insightful way to connect with music",
    tagline: "What do my playlists say about me?",
    details: "Web app ⋅ Over 42,000 playlists analysed",
    images: [
      "/assets/garden/moonstone-1.png",
      "/assets/garden/moonstone-4.png",
      "/assets/garden/moonstone-3.png",
      "/assets/garden/moonstone-2.png",
      // "/assets/moonstone-golden.png",
      // "/assets/moonstone-tall.png",
    ],
    link: "https://moonstone.raunaqbansal.com/playlist/6PehLzyryfuvHUUVrK3yTs",
  },
  {
    id: "c3",
    name: "Curious & Creative Club - Learn by building",
    tagline: "How can kids build the skills that shape their future?",
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
    name: "Napkin Notes - Quickest canvas for thought",
    tagline: "I have 0.3 seconds to write something down before I forget",
    details: "Chrome extension · 450+ active users",
    images: [
      "/assets/napkin-notes-golden.png",
      // "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
      // "https://images.unsplash.com/photo-1517244864778-5ee2fda3db5e?auto=format&fit=crop&w=1600&q=80",
    ],
    link: "https://chromewebstore.google.com/detail/napkin-notes-%E2%80%A2-side-panel/dlhljjkacijknfelknklfcohibfdciki",
  },
  {
    id: "draftline",
    name: "Draftline - Studio for thinking, writing, iterating",
    tagline:
      "Organize your unstructured thoughts and chisel your ideas to clarity",
    details: "Web app ⋅ Early access",
    images: [
      "/assets/garden/draftline-0z.png",
      "/assets/garden/draftline-0.png",
      "/assets/garden/draftline-0d.png",
    ],
  },
  {
    id: "speedround",
    name: "Ascent Speedround - Intense timeboxed workout",
    tagline:
      " Simple (but not easy) 17 minute workout with statisfying visual progression",
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
    name: "Asterisk - Connect the dots behind design elements",
    tagline: "Where did I find this moodboard image?",
    details: "Figma plugin ⋅ 35 users",
    images: ["/assets/garden/asterisk.png", "/assets/3asterisk-golden.png"],
    link: "https://www.figma.com/community/plugin/1488498485297162626/asterisk",
  },
  {
    id: "covered",
    name: "Covered - Fetch media posters in a click",
    tagline: "Find movie/show/book covers for Notion databases",
    details: "(niche) Extension built for Notion ⋅ 20 users",
    images: ["/assets/garden/covered2.webp", "/assets/garden/covered.png"],
    link: "chromewebstore.google.com/detail/covered/pllfacnikognkodbcnnjnhpecicageac",
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
