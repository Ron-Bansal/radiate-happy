"use client";
import { useState, useRef, useEffect } from "react";
// import { ChevronDown, ArrowUp } from "lucide-react";
import {
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  Grid3X3,
  Heart,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // includes semibold (600)
  display: "swap",
});

const entries0 = [
  {
    id: 1,
    title: "The Beginning",
    subtitle: "Where it all started",
    body: "Every journey begins with a single step into the unknown. This was mine—a leap of faith wrapped in uncertainty and hope. The morning light filtered through dusty blinds as I made my decision.",
    images: [
      "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 2,
    title: "First Doubt",
    subtitle: "The weight of uncertainty",
    body: "Three days in and already questioning everything. The voices in my head grew louder, each one presenting a new reason to stop. But stopping felt like drowning.",
    images: [
      "https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 3,
    title: "Small Victory",
    subtitle: "Finding momentum",
    body: "A breakthrough, however small, changes everything. Today I proved to myself that progress is possible. The path became slightly clearer.",
    images: [
      "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 4,
    title: "The Plateau",
    subtitle: "Stillness in motion",
    body: "Some days feel like walking through water. Everything moves but nothing advances. This was one of those days—suspended between effort and result.",
    images: [
      "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 5,
    title: "Unexpected Turn",
    subtitle: "Plans versus reality",
    body: "What I thought would happen rarely does. Today threw a curveball that forced me to adapt. Sometimes the best path is the one you never planned to take.",
    images: [
      "https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 6,
    title: "The Struggle",
    subtitle: "Facing inner demons",
    body: "Not all battles are visible. The hardest ones happen in silence, in the space between what you want and what you fear. Today I faced mine.",
    images: [
      "https://images.pexels.com/photos/1480807/pexels-photo-1480807.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2387866/pexels-photo-2387866.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 7,
    title: "Clarity",
    subtitle: "A moment of seeing",
    body: "Like fog lifting from a valley, everything suddenly made sense. Brief but transformative—these moments remind us why we started.",
    images: [
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 8,
    title: "Setback",
    subtitle: "Two steps back",
    body: "Progress isn't linear. Today felt like losing ground I'd fought hard to gain. But setbacks are just setups for comebacks.",
    images: [
      "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 9,
    title: "New Perspective",
    subtitle: "Shifting the lens",
    body: "Sometimes the obstacle isn't what's in front of you but how you're looking at it. A conversation with a stranger changed my entire approach.",
    images: [
      "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1619569/pexels-photo-1619569.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 10,
    title: "Halfway Point",
    subtitle: "The middle of the road",
    body: "Neither here nor there. The starting line is too far to see, the finish line too far to imagine. This is where character is built.",
    images: [
      "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 11,
    title: "Renewal",
    subtitle: "Finding fresh energy",
    body: "Energy comes from unexpected places. A good night's sleep, a kind word, a memory of why this matters. Today I found my second wind.",
    images: [
      "https://images.pexels.com/photos/1671324/pexels-photo-1671324.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2559484/pexels-photo-2559484.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 12,
    title: "The Wall",
    subtitle: "Immovable object",
    body: "Every challenge has a moment where it feels impossible. This was mine. A wall so high I couldn't see over it, so wide I couldn't go around.",
    images: [
      "https://images.pexels.com/photos/1770775/pexels-photo-1770775.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1592461/pexels-photo-1592461.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 13,
    title: "Breaking Through",
    subtitle: "The crack in the wall",
    body: "Walls aren't meant to stop you. They're meant to show how badly you want something. Today I found a crack and pushed through.",
    images: [
      "https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 14,
    title: "Quiet Day",
    subtitle: "The calm between storms",
    body: "Not every day needs to be dramatic. Some days are about rest, recovery, and preparation. Today was for gathering strength.",
    images: [
      "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1562/italian-landscape-mountains-702934.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 15,
    title: "Unexpected Ally",
    subtitle: "Help from strange places",
    body: "We don't do this alone, even when it feels like it. Someone showed up today who reminded me that support exists in forms we don't expect.",
    images: [
      "https://images.pexels.com/photos/2387869/pexels-photo-2387869.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266302/pexels-photo-1266302.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 16,
    title: "Self-Reflection",
    subtitle: "Looking inward",
    body: "The challenge isn't just external. The real work happens inside, in the quiet moments of honest self-assessment. Today I sat with myself.",
    images: [
      "https://images.pexels.com/photos/1903702/pexels-photo-1903702.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 17,
    title: "Momentum",
    subtitle: "Building speed",
    body: "Something shifted. What was once heavy now feels lighter. Each step comes easier than the last. This is what progress feels like.",
    images: [
      "https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 18,
    title: "The Lesson",
    subtitle: "What failure taught me",
    body: "Every misstep carries a message if you're willing to listen. Today I learned something crucial from a mistake I made yesterday.",
    images: [
      "https://images.pexels.com/photos/2387819/pexels-photo-2387819.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1386454/pexels-photo-1386454.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 19,
    title: "Joy",
    subtitle: "A rare feeling",
    body: "Happiness isn't the goal but it's a welcome companion. Today I felt genuine joy—brief and unexpected, but deeply real.",
    images: [
      "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 20,
    title: "Final Stretch",
    subtitle: "The end in sight",
    body: "I can see it now—the finish line, blurry but visible. The hardest part is ahead, but knowing it's almost over changes everything.",
    images: [
      "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1666012/pexels-photo-1666012.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 21,
    title: "Almost There",
    subtitle: "Four days remaining",
    body: "The countdown has begun. Each day now carries extra weight, extra meaning. I can taste the end.",
    images: [
      "https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 22,
    title: "Doubt Returns",
    subtitle: "Old enemies",
    body: "Just when you think you've conquered something, it returns. The familiar voice of doubt showed up today, uninvited but not unexpected.",
    images: [
      "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 23,
    title: "Perseverance",
    subtitle: "Pushing through",
    body: "There's no magic here, just the decision to keep going when everything says stop. Today I chose to persevere. Again.",
    images: [
      "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 24,
    title: "Eve of Completion",
    subtitle: "One day remains",
    body: "Tomorrow it ends. Tonight I sit with everything this journey has been—the pain, the growth, the discovery. Tomorrow I become someone who finished.",
    images: [
      "https://images.pexels.com/photos/1612371/pexels-photo-1612371.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1559821/pexels-photo-1559821.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 25,
    title: "The End",
    subtitle: "Day twenty-five",
    body: "It's done. Twenty-five days ago I couldn't have imagined standing here. Now I can't imagine not having taken the journey. This is what completion feels like.",
    images: [
      "https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1559825/pexels-photo-1559825.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1612367/pexels-photo-1612367.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
];

const entries = [
  {
    id: 1,
    title: "I hit record before I had a reason",
    subtitle: "Episode one. Camera on. No plan yet.",
    body: "I’ve wanted to make videos for years, which mostly meant opening the camera app, checking my hair, and closing it again.\n\nThis was me finally hitting record before I knew what the project was. No outline. No clean point. Just a slightly uncomfortable first take.\n\nThe scary part wasn’t making something bad. It was having evidence that I’d made something bad.\n\nAnyway, evidence exists now.",
    images: [
      "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 2,
    title: "The Spider-Man logo survived me",
    subtitle: "Stitching something I’d avoided for years",
    body: "I kept putting this off because I didn’t want to ruin the hoodie.\n\nThe first plan was fabric. I cut one spider leg off, then another, then quietly accepted that precision was not the day’s theme.\n\nEmbroidery worked better. It also made the logo look a bit like a web, which was accidentally more Spider-Man than the thing I was trying to copy.\n\nPeter Parker would understand. Probably.",
    images: [
      "https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 3,
    title: "I painted Lucy with ancient paint",
    subtitle: "Ten-year-old tubes, one dog photo, no undo button",
    body: "The canvas sat in my room for months. The paint was old enough to have opinions.\n\nI kept waiting until I was better at painting, which is a convenient way to never paint.\n\nThen I picked a photo of Lucy and made the thing. The proportions are strange. The colours are doing their best.\n\nStill better than the blank canvas looking at me every morning.",
    images: [
      "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 4,
    title: "I finished a book in one sitting",
    subtitle: "After years of saying I’m not a reader",
    body: "I’ve said “I can’t read” so many times it started sounding like a fact.\n\nI picked up The Four Agreements expecting to last 14 minutes, check my phone, then blame my attention span.\n\nInstead, I finished it in one sitting.\n\nA very annoying development for the story I’d been telling about myself.",
    images: [
      "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 5,
    title: "I went to the dog parade anyway",
    subtitle: "Messy timing, short visit, still worth it",
    body: "I nearly skipped this because the timing was awkward.\n\nCouldn’t stay long. Couldn’t line it up with my friend. Had just enough logistical friction to make bailing feel sensible.\n\nI went anyway. Saw a bunch of dogs in ridiculous outfits. Had a good time.\n\nA tiny blow to the very persuasive committee in my head.",
    images: [
      "https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 6,
    title: "I shared the project too early",
    subtitle: "Tiny tool, no polish, twelve users on day one",
    body: "I posted about a small project I built for myself before it felt like a real thing.\n\nIt was niche, unfinished, and still had that slightly cursed prototype smell.\n\nThen people replied with the worst possible news: they also had the problem.\n\nI shipped it properly. Twelve people used it on day one.\n\nThe rough version did its job.",
    images: [
      "https://images.pexels.com/photos/1480807/pexels-photo-1480807.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2387866/pexels-photo-2387866.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 7,
    title: "The LinkedIn post I dodged",
    subtitle: "$25 MRR, one free pizza, zero post",
    body: "This was supposed to be a public goal: make $25 MRR by the end of the year.\n\nOne free pizza a month. Very noble work.\n\nI had the idea, the framing, and most of the words. Then I decided I didn’t have the right photo, which is a surprisingly elegant excuse.\n\nA week passed. I posted nothing.\n\nThis one gets a slot because I didn’t even fail out loud. I failed quietly, which is less useful and somehow more embarrassing.",
    images: [
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 8,
    title: "The handstand was mostly fine",
    subtitle: "Less dramatic than the version in my head",
    body: "I made this feel huge before I tried it.\n\nIn my head, the handstand had become a full public referendum on my athletic ability. In reality, I kicked up, wobbled around, and survived.\n\nNot graceful. Not tragic. Just a person upside down for a bit.\n\nThe preview was worse than the thing.",
    images: [
      "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 9,
    title: "The planter box holds dirt",
    subtitle: "First woodworking attempt. Structurally optimistic.",
    body: "I measured a lot for someone who still ended up guessing.\n\nThis was my first proper woodworking attempt, so every cut felt more permanent than it probably was. I kept checking the same corners like they might confess something.\n\nThe planter box isn’t perfect. It holds dirt and plants.\n\nThat feels like a fair contract.",
    images: [
      "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1619569/pexels-photo-1619569.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 10,
    title: "Our demo broke at the finish line",
    subtitle: "Three-hour hackathon, final-second submit",
    body: "We submitted our project on the literal final second.\n\nThen the demo broke in the funniest possible way, which is rude but thematically consistent for a hackathon.\n\nWe didn’t place top three. A few weeks later, we somehow won a partner prize anyway.\n\nThe room had that specific build-night energy where everyone is tired, slightly frantic, and weirdly kind.\n\nI missed that.",
    images: [
      "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 11,
    title: "The stool lives in the house now",
    subtitle: "A furniture commitment made too early",
    body: "Before I built it, I decided the stool had to go in the living room.\n\nThat made the stakes slightly ridiculous. It also stopped me from treating it like a disposable practice run.\n\nI focused on making it solid enough to earn its spot. It has flaws. It also has a job.\n\nLucy uses it to beg for treats, which feels like official approval.",
    images: [
      "https://images.pexels.com/photos/1671324/pexels-photo-1671324.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2559484/pexels-photo-2559484.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 12,
    title: "I finally stained the deck",
    subtitle: "Two months of avoidance for a job that mostly needed a brush",
    body: "I delayed this for about two months.\n\nI was worried about rain, patchiness, choosing the wrong stain, and discovering some new way to make a deck look worse.\n\nOnce I started, it was mostly brushing, waiting, and moving things out of the way.\n\nVery rude when the boring answer is the correct one.",
    images: [
      "https://images.pexels.com/photos/1770775/pexels-photo-1770775.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1592461/pexels-photo-1592461.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 13,
    title: "I did three ugly muscle-ups",
    subtitle: "A goal I moved just far enough to trick myself",
    body: "A muscle-up has been on the list for years.\n\nSo naturally, instead of trying one, I changed the goal to three and gave myself permission to fail. Strange brain. Useful brain, occasionally.\n\nI got them. Ugly reps. Questionable form. Probably not gym-floor certified.\n\nBut my body went over the bar three times.\n\nThat counts for something.",
    images: [
      "https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 14,
    title: "I posted patina for no good reason",
    subtitle: "A small coding experiment that just looked nice",
    body: "I shared patina, a tiny creative coding project, without turning it into a productivity sermon.\n\nNo launch plan. No thread. No neat insight about taste or craft.\n\nJust a thing I liked looking at.\n\nHonestly, that felt cleaner.",
    images: [
      "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1562/italian-landscape-mountains-702934.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },

  // ids 15–25 left as your original placeholders (since you only provided content through ep. 14)
  // if you paste eps 15–25 copy, I’ll slot them in with the same tone.
  {
    id: 15,
    title: "Unexpected Ally",
    subtitle: "Help from strange places",
    body: "We don't do this alone, even when it feels like it. Someone showed up today who reminded me that support exists in forms we don't expect.",
    images: [
      "https://images.pexels.com/photos/2387869/pexels-photo-2387869.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266302/pexels-photo-1266302.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 16,
    title: "Self-Reflection",
    subtitle: "Looking inward",
    body: "The challenge isn't just external. The real work happens inside, in the quiet moments of honest self-assessment. Today I sat with myself.",
    images: [
      "https://images.pexels.com/photos/1903702/pexels-photo-1903702.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 17,
    title: "Momentum",
    subtitle: "Building speed",
    body: "Something shifted. What was once heavy now feels lighter. Each step comes easier than the last. This is what progress feels like.",
    images: [
      "https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 18,
    title: "The Lesson",
    subtitle: "What failure taught me",
    body: "Every misstep carries a message if you're willing to listen. Today I learned something crucial from a mistake I made yesterday.",
    images: [
      "https://images.pexels.com/photos/2387819/pexels-photo-2387819.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1386454/pexels-photo-1386454.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 19,
    title: "Joy",
    subtitle: "A rare feeling",
    body: "Happiness isn't the goal but it's a welcome companion. Today I felt genuine joy—brief and unexpected, but deeply real.",
    images: [
      "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 20,
    title: "Final Stretch",
    subtitle: "The end in sight",
    body: "I can see it now—the finish line, blurry but visible. The hardest part is ahead, but knowing it's almost over changes everything.",
    images: [
      "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1666012/pexels-photo-1666012.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 21,
    title: "Almost There",
    subtitle: "Four days remaining",
    body: "The countdown has begun. Each day now carries extra weight, extra meaning. I can taste the end.",
    images: [
      "https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 22,
    title: "Doubt Returns",
    subtitle: "Old enemies",
    body: "Just when you think you've conquered something, it returns. The familiar voice of doubt showed up today, uninvited but not unexpected.",
    images: [
      "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 23,
    title: "Perseverance",
    subtitle: "Pushing through",
    body: "There's no magic here, just the decision to keep going when everything says stop. Today I chose to persevere. Again.",
    images: [
      "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 24,
    title: "Eve of Completion",
    subtitle: "One day remains",
    body: "Tomorrow it ends. Tonight I sit with everything this journey has been—the pain, the growth, the discovery. Tomorrow I become someone who finished.",
    images: [
      "https://images.pexels.com/photos/1612371/pexels-photo-1612371.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1559821/pexels-photo-1559821.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 25,
    title: "The End",
    subtitle: "Day twenty-five",
    body: "It's done. Twenty-five days ago I couldn't have imagined standing here. Now I can't imagine not having taken the journey. This is what completion feels like.",
    images: [
      "https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1559825/pexels-photo-1559825.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1612367/pexels-photo-1612367.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeEntry, setActiveEntry] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const entryRefs = useRef<{ [key: number]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observedEntries) => {
        observedEntries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const id = Number(entry.target.getAttribute("data-id"));
            setActiveEntry(id);
          }
        });
      },
      { threshold: [0.3, 0.5, 0.7] }
    );

    Object.values(entryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToEntry = (id: number) => {
    entryRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setNavOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`${plusJakarta.className} min-h-screen`}
      style={{ backgroundColor: "#FFFAF1", color: "#4A0A07" }}
    >
      <button
        onClick={() => setNavOpen(!navOpen)}
        className="fixed top-8 right-8 z-50 flex items-center gap-3 text-sm hover:opacity-60 transition-opacity"
      >
        <span
          className="hidden md:block"
          style={{ color: "rgba(74,10,7,0.55)" }}
        >
          {activeEntry ? `EP ${String(activeEntry).padStart(2, "0")}` : "INDEX"}
        </span>
        <div className="w-6 h-6 relative">
          <span
            className={`absolute inset-x-0 top-2 h-px transition-all duration-300 ${
              navOpen ? "rotate-45 top-3" : ""
            }`}
            style={{ backgroundColor: "#4A0A07" }}
          />
          <span
            className={`absolute inset-x-0 bottom-2 h-px transition-all duration-300 ${
              navOpen ? "-rotate-45 bottom-3" : ""
            }`}
            style={{ backgroundColor: "#4A0A07" }}
          />
        </div>
      </button>

      {navOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40"
          style={{ backgroundColor: "rgba(74,10,7,0.25)" }}
          onClick={() => setNavOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[70vw] md:max-w-4xl backdrop-blur-xl z-40 transform transition-transform duration-500 ease-out ${
          navOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "rgba(255,250,241,0.92)" }}
      >
        <div className="h-full overflow-y-auto p-8 pt-24">
          <p
            className="text-xs mb-8"
            style={{ letterSpacing: "0.28em", color: "rgba(74,10,7,0.55)" }}
          >
            SELECT EPISODE
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => scrollToEntry(entry.id)}
                className="group text-left"
              >
                <div className="aspect-square overflow-hidden mb-3 relative rounded-sm">
                  <img
                    src={entry.images[0]}
                    alt=""
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(74,10,7,0.35), transparent)",
                    }}
                  />
                </div>
                <p
                  className="text-xs mb-1"
                  style={{ color: "rgba(74,10,7,0.55)" }}
                >
                  EP {String(entry.id).padStart(2, "0")}
                </p>
                <p
                  className="text-sm font-medium transition-colors truncate"
                  style={{ color: "#4A0A07" }}
                >
                  {entry.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <header className="min-h-screen relative flex items-center">
        {/* PAPER + IMAGE WASH */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-[0.08]">
            {[...entries.slice(0, 9)].map((entry, idx) => (
              <div key={idx} className="relative overflow-hidden">
                <img
                  src={entry.images[0]}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{
                    transform: `scale(${
                      1.05 + Math.sin(scrollY * 0.001 + idx) * 0.04
                    })`,
                    filter: "grayscale(10%) contrast(1.05)",
                  }}
                />
              </div>
            ))}
          </div>

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,250,241,0.88), rgba(255,250,241,0.98))",
            }}
          />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT — TYPE */}
            <div className="lg:col-span-7">
              {/* eyebrow */}
              <p
                className="text-xs uppercase mb-6"
                style={{
                  letterSpacing: "0.28em",
                  color: "rgba(74,10,7,0.55)",
                }}
              >
                A 25-part personal experiment
              </p>

              {/* headline */}
              <h1
                className="text-[3.2rem] md:text-[5.2rem] lg:text-[6.5rem] leading-[0.92]"
                style={{
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                }}
              >
                Twenty-five things
                <br />
                I nearly
                <br />
                talked myself out of.
              </h1>

              {/* lede */}
              <p
                className="mt-8 text-lg md:text-xl max-w-xl leading-relaxed"
                style={{ color: "rgba(74,10,7,0.72)" }}
              >
                A record of small avoided things. Sewing a Spider-Man logo.
                Painting Lucy. Posting unfinished projects. Trying handstands.
                Some went fine. Some got weird. A few still didn’t happen.
              </p>

              {/* quiet context */}
              <p
                className="mt-6 text-sm"
                style={{ color: "rgba(74,10,7,0.55)" }}
              >
                The working title is <em>Failing Loudly</em>, which is maybe a little dramatic. Keeping it for now.
              </p>
            </div>

            {/* RIGHT — VISUAL GLIMPSE */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* image feels “placed”, not framed */}
                <div
                  className="w-full max-w-sm ml-auto rotate-[-1.5deg]"
                  style={{
                    boxShadow: "0 30px 80px rgba(74,10,7,0.12)",
                  }}
                >
                  <img
                    src={entries[0].images[0]}
                    alt=""
                    className="w-full h-auto object-cover"
                    style={{
                      borderRadius: 6,
                    }}
                  />
                </div>

                {/* caption */}
                <p
                  className="mt-4 text-xs max-w-sm ml-auto"
                  style={{
                    color: "rgba(74,10,7,0.5)",
                    letterSpacing: "0.02em",
                  }}
                >
                  Early evidence. Slightly awkward. Useful anyway.
                </p>
              </div>
            </div>
          </div>

          {/* FOOTNOTE ROW */}
          <div className="mt-20 flex items-center gap-6">
            <span
              className="text-xs uppercase"
              style={{
                letterSpacing: "0.24em",
                color: "rgba(74,10,7,0.45)",
              }}
            >
              25 entries
            </span>

            <span style={{ color: "rgba(74,10,7,0.25)" }}>—</span>

            <button
              onClick={() => scrollToEntry(1)}
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "rgba(74,10,7,0.7)" }}
            >
              begin reading
            </button>
          </div>
        </div>

        {/* bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to top, rgba(255,250,241,1), transparent)",
          }}
        />
      </header>

      <main className="relative">
        {entries.map((entry) => (
          <article
            key={entry.id}
            ref={(el) => {
              entryRefs.current[entry.id] = el;
            }}
            data-id={entry.id}
            className="min-h-screen relative"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={entry.images[0]}
                alt=""
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  activeEntry === entry.id
                    ? "opacity-20 scale-100"
                    : "opacity-10 scale-105"
                }`}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255,250,241,0.92), rgba(255,250,241,0.75), rgba(255,250,241,0.55))",
                }}
              />
            </div>

            <div className="relative z-10 min-h-screen flex items-start py-24 md:py-32">
              <div className="w-full max-w-7xl mx-auto px-8 md:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                  <div className="lg:col-span-2 order-2 lg:order-1">
                    <p
                      className={`text-7xl md:text-8xl lg:text-9xl mb-6 transition-all duration-700 ${
                        activeEntry === entry.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                      style={{ fontWeight: 600, color: "rgba(74,10,7,0.08)" }}
                    >
                      EP {String(entry.id).padStart(2, "0")}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mt-[-4rem] md:mt-[-6rem]">
                      {entry.images.slice(0, 4).map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          className={`overflow-hidden rounded-sm ${
                            imgIdx === 0 && entry.images.length > 2
                              ? "col-span-2"
                              : ""
                          }`}
                          style={{
                            opacity: activeEntry === entry.id ? 1 : 0.7,
                            transform:
                              activeEntry === entry.id
                                ? "translateY(0)"
                                : "translateY(20px)",
                            transition: "all 0.7s ease-out",
                            transitionDelay: `${imgIdx * 100 + 200}ms`,
                          }}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-48 md:h-64 lg:h-72 object-cover hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-1 order-1 lg:order-2 lg:sticky lg:top-32">
                    <div
                      style={{
                        opacity: activeEntry === entry.id ? 1 : 0.65,
                        transform:
                          activeEntry === entry.id
                            ? "translateY(0)"
                            : "translateY(20px)",
                        transition: "all 0.5s ease-out",
                        transitionDelay: "100ms",
                      }}
                    >
                      <p
                        className="text-xs mb-4"
                        style={{
                          letterSpacing: "0.14em",
                          color: "rgba(74,10,7,0.55)",
                        }}
                      >
                        {String(entry.id).padStart(2, "0")}
                      </p>

                      <h2
                        className="text-3xl md:text-4xl mb-3"
                        style={{ fontWeight: 600, letterSpacing: "-0.01em" }}
                      >
                        {entry.title}
                      </h2>

                      <p
                        className="mb-6 italic"
                        style={{ color: "rgba(74,10,7,0.6)" }}
                      >
                        {entry.subtitle}
                      </p>

                      <div
                        className="mt-8 leading-relaxed space-y-4"
                        style={{ color: "rgba(74,10,7,0.78)" }}
                      >
                        {entry.body.split("\n\n").map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}

        <footer className="min-h-[50vh] flex items-center justify-center relative">
          <div className="absolute inset-0">
            <img
              src={entries[24].images[0]}
              alt=""
              className="w-full h-full object-cover opacity-10"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(255,250,241,0.95), rgba(255,250,241,0.85), rgba(255,250,241,0.75))",
              }}
            />
          </div>
          <div className="relative z-10 text-center px-8">
            <p
              className="text-8xl md:text-9xl lg:text-[12rem] leading-none"
              style={{ fontWeight: 600, color: "rgba(74,10,7,0.08)" }}
            >
              FIN
            </p>
            <p
              className="text-xs mt-4"
              style={{ letterSpacing: "0.4em", color: "rgba(74,10,7,0.55)" }}
            >
              END OF DOCUMENTATION
            </p>
          </div>
        </footer>
      </main>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-30 w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
          scrollY > 500
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{
          backgroundColor: "rgba(74,10,7,0.08)",
          border: "1px solid rgba(74,10,7,0.18)",
          color: "#4A0A07",
        }}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}
