"use client"
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowUp } from 'lucide-react';

const entries0 = [
  { id: 1, title: "The Beginning", subtitle: "Where it all started", body: "Every journey begins with a single step into the unknown. This was mine—a leap of faith wrapped in uncertainty and hope. The morning light filtered through dusty blinds as I made my decision.", images: ["https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 2, title: "First Doubt", subtitle: "The weight of uncertainty", body: "Three days in and already questioning everything. The voices in my head grew louder, each one presenting a new reason to stop. But stopping felt like drowning.", images: ["https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 3, title: "Small Victory", subtitle: "Finding momentum", body: "A breakthrough, however small, changes everything. Today I proved to myself that progress is possible. The path became slightly clearer.", images: ["https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 4, title: "The Plateau", subtitle: "Stillness in motion", body: "Some days feel like walking through water. Everything moves but nothing advances. This was one of those days—suspended between effort and result.", images: ["https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 5, title: "Unexpected Turn", subtitle: "Plans versus reality", body: "What I thought would happen rarely does. Today threw a curveball that forced me to adapt. Sometimes the best path is the one you never planned to take.", images: ["https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 6, title: "The Struggle", subtitle: "Facing inner demons", body: "Not all battles are visible. The hardest ones happen in silence, in the space between what you want and what you fear. Today I faced mine.", images: ["https://images.pexels.com/photos/1480807/pexels-photo-1480807.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/2387866/pexels-photo-2387866.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 7, title: "Clarity", subtitle: "A moment of seeing", body: "Like fog lifting from a valley, everything suddenly made sense. Brief but transformative—these moments remind us why we started.", images: ["https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 8, title: "Setback", subtitle: "Two steps back", body: "Progress isn't linear. Today felt like losing ground I'd fought hard to gain. But setbacks are just setups for comebacks.", images: ["https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 9, title: "New Perspective", subtitle: "Shifting the lens", body: "Sometimes the obstacle isn't what's in front of you but how you're looking at it. A conversation with a stranger changed my entire approach.", images: ["https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1619569/pexels-photo-1619569.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 10, title: "Halfway Point", subtitle: "The middle of the road", body: "Neither here nor there. The starting line is too far to see, the finish line too far to imagine. This is where character is built.", images: ["https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 11, title: "Renewal", subtitle: "Finding fresh energy", body: "Energy comes from unexpected places. A good night's sleep, a kind word, a memory of why this matters. Today I found my second wind.", images: ["https://images.pexels.com/photos/1671324/pexels-photo-1671324.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/2559484/pexels-photo-2559484.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 12, title: "The Wall", subtitle: "Immovable object", body: "Every challenge has a moment where it feels impossible. This was mine. A wall so high I couldn't see over it, so wide I couldn't go around.", images: ["https://images.pexels.com/photos/1770775/pexels-photo-1770775.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1592461/pexels-photo-1592461.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 13, title: "Breaking Through", subtitle: "The crack in the wall", body: "Walls aren't meant to stop you. They're meant to show how badly you want something. Today I found a crack and pushed through.", images: ["https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 14, title: "Quiet Day", subtitle: "The calm between storms", body: "Not every day needs to be dramatic. Some days are about rest, recovery, and preparation. Today was for gathering strength.", images: ["https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1562/italian-landscape-mountains-702934.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 15, title: "Unexpected Ally", subtitle: "Help from strange places", body: "We don't do this alone, even when it feels like it. Someone showed up today who reminded me that support exists in forms we don't expect.", images: ["https://images.pexels.com/photos/2387869/pexels-photo-2387869.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1266302/pexels-photo-1266302.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 16, title: "Self-Reflection", subtitle: "Looking inward", body: "The challenge isn't just external. The real work happens inside, in the quiet moments of honest self-assessment. Today I sat with myself.", images: ["https://images.pexels.com/photos/1903702/pexels-photo-1903702.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 17, title: "Momentum", subtitle: "Building speed", body: "Something shifted. What was once heavy now feels lighter. Each step comes easier than the last. This is what progress feels like.", images: ["https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 18, title: "The Lesson", subtitle: "What failure taught me", body: "Every misstep carries a message if you're willing to listen. Today I learned something crucial from a mistake I made yesterday.", images: ["https://images.pexels.com/photos/2387819/pexels-photo-2387819.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1386454/pexels-photo-1386454.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 19, title: "Joy", subtitle: "A rare feeling", body: "Happiness isn't the goal but it's a welcome companion. Today I felt genuine joy—brief and unexpected, but deeply real.", images: ["https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 20, title: "Final Stretch", subtitle: "The end in sight", body: "I can see it now—the finish line, blurry but visible. The hardest part is ahead, but knowing it's almost over changes everything.", images: ["https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1666012/pexels-photo-1666012.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 21, title: "Almost There", subtitle: "Four days remaining", body: "The countdown has begun. Each day now carries extra weight, extra meaning. I can taste the end.", images: ["https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 22, title: "Doubt Returns", subtitle: "Old enemies", body: "Just when you think you've conquered something, it returns. The familiar voice of doubt showed up today, uninvited but not unexpected.", images: ["https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 23, title: "Perseverance", subtitle: "Pushing through", body: "There's no magic here, just the decision to keep going when everything says stop. Today I chose to persevere. Again.", images: ["https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 24, title: "Eve of Completion", subtitle: "One day remains", body: "Tomorrow it ends. Tonight I sit with everything this journey has been—the pain, the growth, the discovery. Tomorrow I become someone who finished.", images: ["https://images.pexels.com/photos/1612371/pexels-photo-1612371.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1559821/pexels-photo-1559821.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&w=800"] },
  { id: 25, title: "The End", subtitle: "Day twenty-five", body: "It's done. Twenty-five days ago I couldn't have imagined standing here. Now I can't imagine not having taken the journey. This is what completion feels like.", images: ["https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1559825/pexels-photo-1559825.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1612367/pexels-photo-1612367.jpeg?auto=compress&cs=tinysrgb&w=800"] },
];

const entries = [
  {
    id: 1,
    title: "start before you feel ready",
    subtitle: "hitting record without knowing what it’s for yet",
    body: "I’ve wanted to make videos for a long time. I’ve also been very good at finding reasons not to.\n\nThis was me finally hitting record without knowing what I was doing, what the point was, or where it would go.\n\nThe fear wasn’t really about messing up — it was about being seen messing up.\n\nThis episode wasn’t good. But it existed. And that was the win.",
    images: [
      "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 2,
    title: "to be human is to be imperfect",
    subtitle: "stitching a Spider-Man logo I’d been avoiding for years",
    body: "I put this off for an embarrassingly long time because I didn’t want to “ruin it.”\n\nI tried cutting the logo out of fabric. Kept slicing the legs off. Repeatedly.\n\nEventually I gave up on perfection and switched to embroidery — which accidentally made the logo look more like a spider web.\n\nWay cooler than what I planned.\n\nPeter Parker works because he’s flawed.\n\nApparently my sewing does too.",
    images: [
      "https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 3,
    title: "you don’t need to grade your hobbies",
    subtitle: "painting my dog with 10-year-old paint",
    body: "I bought the canvas months ago. The paint is over a decade old.\n\nI kept telling myself I’d do it “when I was better at painting.”\n\nI was scared I’d mess it up — especially because you can’t undo paint like you can on a screen.\n\nBut the point wasn’t to honor the photo perfectly. It was to finally start.\n\nIt’s messy. It’s uneven.\n\nAnd I love it way more than a blank canvas.",
    images: [
      "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 4,
    title: "“i can’t read” was a lie i practiced",
    subtitle: "reading a book in one sitting",
    body: "Somewhere along the way I decided I’m “not a reader.”\n\nMostly because I kept saying it.\n\nI picked The Four Agreements, fully expecting my attention to wander.\n\nInstead, I stayed locked in and finished the whole thing in one sitting.\n\nTurns out focus isn’t a personality trait — it’s a muscle.\n\nAnd I’d just never trained it.",
    images: [
      "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 5,
    title: "doing the thing badly beats skipping it entirely",
    subtitle: "going to the dog parade anyway",
    body: "I almost bailed on this.\n\nCouldn’t stay for the whole thing. Couldn’t see my friend. Schedule was messy.\n\nThere are always a million logical reasons not to go.\n\nI went anyway — and had a genuinely great time.\n\nThis one reminded me how often “almost didn’t go” becomes a pattern.\n\nAnd how rarely I regret going once I’m there.",
    images: [
      "https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 6,
    title: "share before you’re ready",
    subtitle: "talking about a project that wasn’t even released",
    body: "I shared a tiny project I built for myself — hyper-niche, not approved, not polished.\n\nPosted about it anyway.\n\nPeople immediately said, “wait… I have this problem too.”\n\nI shipped it properly, and 12 people used it on day one.\n\nShipping early didn’t embarrass me.\n\nIt clarified what mattered.",
    images: [
      "https://images.pexels.com/photos/1480807/pexels-photo-1480807.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2387866/pexels-photo-2387866.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 7,
    title: "the one that didn’t happen",
    subtitle: "linkedin is still scary",
    body: "This was supposed to be a public goal: earn $25 MRR by year-end.\n\nOne free pizza per month.\n\nI had the idea. The framing. Even the words.\n\nBut I didn’t have the “right” photo.\n\nThen a week passed. Then I bailed.\n\nThis one feels different — because I didn’t even try.\n\nWhich probably means it’s worth revisiting.",
    images: [
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 8,
    title: "it was never as bad as i imagined",
    subtitle: "trying a handstand",
    body: "I built this up so much in my head.\n\nConvinced myself I’d be terrible.\n\nTurns out I was… fine?\n\nNot great. Not awful. Just someone who needed to try once.\n\nMost fear is pre-effort fiction.",
    images: [
      "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 9,
    title: "beginner energy",
    subtitle: "building my first planter box",
    body: "First time woodworking. No idea what I was doing.\n\nLots of measuring. Lots of second-guessing.\n\nIt’s not perfect — but it holds dirt and plants, which feels like success.\n\nThere’s something grounding about making something physical that just… exists.",
    images: [
      "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1619569/pexels-photo-1619569.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 10,
    title: "losing in public (and liking it)",
    subtitle: "a 3-hour worldwide hackathon",
    body: "We submitted our project on the literal final second.\n\nThen our demo broke in the funniest possible way.\n\nDidn’t place top three. Still had a great time.\n\nAnd a few weeks later, we randomly won a partner prize anyway.\n\nOutcome aside — the energy of building alongside other people was the real reward.",
    images: [
      "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 11,
    title: "committing before you know the result",
    subtitle: "building a stool for the living room",
    body: "I told myself this stool was going in the living room no matter what.\n\nThat rule changed how I worked.\n\nInstead of chasing perfection, I focused on making something solid.\n\nAnd now it lives in the house — flaws and all.\n\n(Also, my dog loves it. She jumps up on it for treats.)",
    images: [
      "https://images.pexels.com/photos/1671324/pexels-photo-1671324.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2559484/pexels-photo-2559484.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 12,
    title: "doing the boring scary thing",
    subtitle: "finally staining the deck",
    body: "I delayed this for two months.\n\nWorried about patchiness. Rain. Messing it up.\n\nNone of that mattered once I started.\n\nIt was mostly just time, effort, and getting out of my own head.",
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
    title: "raising the bar removed the pressure",
    subtitle: "three (ugly) muscle-ups",
    body: "A muscle-up has been a goal for years.\n\nSo I randomly moved the goalpost to three, assuming I’d fail.\n\nSomehow that made it easier.\n\nI did them — badly — and don’t really count them.\n\nBut mentally, something unlocked.\n\nThe goal didn’t change my body.\n\nIt changed my belief.",
    images: [
      "https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 14,
    title: "sharing creatively",
    subtitle: "posting a playful coding experiment",
    body: "I shared patina — a small creative coding project — just for fun.\n\nNo lesson. No productivity angle.\n\nJust something I enjoyed making.\n\nWhich might be the most important thing to share.",
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
  const entryRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observedEntries) => {
        observedEntries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const id = Number(entry.target.getAttribute('data-id'));
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
    entryRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setNavOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <button
        onClick={() => setNavOpen(!navOpen)}
        className="fixed top-8 right-8 z-50 flex items-center gap-3 text-sm tracking-wide hover:opacity-60 transition-opacity"
      >
        <span className="hidden md:block text-neutral-400">
          {activeEntry ? `EP ${String(activeEntry).padStart(2, '0')}` : 'INDEX'}
        </span>
        <div className="w-6 h-6 relative">
          <span className={`absolute inset-x-0 top-2 h-px bg-white transition-all duration-300 ${navOpen ? 'rotate-45 top-3' : ''}`} />
          <span className={`absolute inset-x-0 bottom-2 h-px bg-white transition-all duration-300 ${navOpen ? '-rotate-45 bottom-3' : ''}`} />
        </div>
      </button>

      {navOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setNavOpen(false)}
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-full md:w-[70vw] md:max-w-4xl bg-neutral-900/95 backdrop-blur-xl z-40 transform transition-transform duration-500 ease-out ${navOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full overflow-y-auto p-8 pt-24">
          <p className="text-xs tracking-[0.3em] text-neutral-500 mb-8">SELECT EPISODE</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => scrollToEntry(entry.id)}
                className="group text-left"
              >
                <div className="aspect-square overflow-hidden mb-3 relative">
                  <img
                    src={entry.images[0]}
                    alt=""
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-neutral-500 mb-1">EP {String(entry.id).padStart(2, '0')}</p>
                <p className="text-sm font-light group-hover:text-white transition-colors truncate">{entry.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <header className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-20">
            {[...entries.slice(0, 9)].map((entry, idx) => (
              <div key={idx} className="relative overflow-hidden">
                <img
                  src={entry.images[0]}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{
                    transform: `scale(${1.1 + Math.sin(scrollY * 0.001 + idx) * 0.05})`,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-neutral-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950" />
        </div>

        <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 border border-neutral-700 text-xs tracking-[0.4em] text-neutral-400 uppercase">
              A Personal Documentary
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tight leading-[0.9] mb-8">
            <span className="block">Twenty-Five</span>
            <span className="block italic font-light text-neutral-400">Episodes</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed mb-12">
            A raw documentation of transformation. Twenty-five days of facing fears,
            breaking patterns, and becoming someone new. No filters. No shortcuts.
            Just the unedited truth of what it takes to change.
          </p>

          <div className="flex items-center justify-center gap-8 text-sm text-neutral-500">
            <div className="text-center">
              <p className="text-3xl font-extralight text-white mb-1">25</p>
              <p className="tracking-wider uppercase text-xs">Episodes</p>
            </div>
            <div className="w-px h-12 bg-neutral-800" />
            <div className="text-center">
              <p className="text-3xl font-extralight text-white mb-1">2024</p>
              <p className="tracking-wider uppercase text-xs">Year</p>
            </div>
            <div className="w-px h-12 bg-neutral-800" />
            <div className="text-center">
              <p className="text-3xl font-extralight text-white mb-1">1</p>
              <p className="tracking-wider uppercase text-xs">Journey</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.3em] text-neutral-600 uppercase">Begin</span>
          <ChevronDown size={20} className="text-neutral-600 animate-bounce" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent" />
      </header>

      <main className="relative">
        {entries.map((entry) => (
          <article
            key={entry.id}
            ref={(el) => { entryRefs.current[entry.id] = el; }}
            data-id={entry.id}
            className="min-h-screen relative"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={entry.images[0]}
                alt=""
                className={`w-full h-full object-cover transition-all duration-1000 ${activeEntry === entry.id ? 'opacity-15 scale-100' : 'opacity-5 scale-105'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/70" />
            </div>

            <div className="relative z-10 min-h-screen flex items-start py-24 md:py-32">
              <div className="w-full max-w-7xl mx-auto px-8 md:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                  <div className="lg:col-span-2 order-2 lg:order-1">
                    <p className={`text-7xl md:text-8xl lg:text-9xl font-extralight text-white/5 mb-6 transition-all duration-700 ${activeEntry === entry.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      EP {String(entry.id).padStart(2, '0')}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mt-[-4rem] md:mt-[-6rem]">
                      {entry.images.slice(0, 4).map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          className={`overflow-hidden ${imgIdx === 0 && entry.images.length > 2 ? 'col-span-2' : ''}`}
                          style={{
                            opacity: activeEntry === entry.id ? 1 : 0.6,
                            transform: activeEntry === entry.id ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.7s ease-out',
                            transitionDelay: `${imgIdx * 100 + 200}ms`
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
                        opacity: activeEntry === entry.id ? 1 : 0,
                        transform: activeEntry === entry.id ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.5s ease-out',
                        transitionDelay: '100ms'
                      }}
                    >
                      <p className="text-xs tracking-wider text-neutral-500 mb-4">
                        {String(entry.id).padStart(2, '0')}
                      </p>
                      <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3">
                        {entry.title}
                      </h2>
                      <p className="text-neutral-400 mb-6 italic">
                        {entry.subtitle}
                      </p>
                      <p className="text-neutral-300 leading-relaxed">
                        {entry.body}
                      </p>
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
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-neutral-950/80" />
          </div>
          <div className="relative z-10 text-center px-8">
            <p className="text-8xl md:text-9xl lg:text-[12rem] font-extralight text-white/5 leading-none">FIN</p>
            <p className="text-xs tracking-[0.5em] text-neutral-600 mt-4">END OF DOCUMENTATION</p>
          </div>
        </footer>
      </main>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 ${scrollY > 500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}
