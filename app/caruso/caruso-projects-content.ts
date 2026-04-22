
// export interface Project {
//   id: string;
//   title: string;
//   category: string;
//   tags: string[];
//   hook: string;
//   body: string[];
//   images: [string, string];
// }

// export const carusoProjects: Project[] = [
//   {
//     id: "dimensioner",
//     title: "Dimensioner Integration",
//     category: "End-to-end ownership",
//     tags: ["Enterprise", "Logistics", "UX Iteration"],
//     hook: "I visited the warehouse to watch them use it.",
//     body: [
//       "A top enterprise customer had thousands of daily orders with manual weight and dimension entry — a bottleneck that was costing them accuracy and speed heading into peak season. There wasn't a plan. So I made one.",
//       "I scoped the solution independently, built a standalone prototype first to validate the concept, then implemented the full integration into our codebase. The first version worked. The second version felt right.",
//       "I visited the customer's warehouse to observe real usage, watched operators interact with the dimensioner hardware, and iterated on the UX based on what I saw — not what I assumed. The gap between a functional tool and one that fits a workflow only becomes visible when you stand next to the person using it.",
//       "Shipped before peak season. The integration eliminated manual data entry errors and reduced processing time per package. The customer's team posted a LinkedIn appreciation post about the experience."
//     ],
//     images: ["/assets/garden/dimensioner-1.png", "/assets/garden/dimensioner-2.png"]
//   },
//   {
//     id: "hubspot-sidepanel",
//     title: "HubSpot Side-Panel",
//     category: "Designing for context",
//     tags: ["Browser Extension", "CRM", "Workflow"],
//     hook: "Our reps were checking three platforms before every call. Now they check zero.",
//     body: [
//       "I sat in on Sales and Onboarding syncs and noticed a pattern: reps were tabbing between Chargebee, Zendesk, and Canny before every customer interaction. The problem wasn't missing information — it was scattered information at the wrong time.",
//       "Instead of building a standalone dashboard, I built a browser extension that lives in the HubSpot sidebar. It auto-detects the customer email on screen and surfaces consolidated insights at the moment of need. Billing status, open tickets, feature requests, health score — all in one glance, zero clicks.",
//       "Hotkey shortcuts for power users. Designed for the workflow, not around it. The best tool is the one you don't have to open."
//     ],
//     images: ["/assets/garden/insights-0.png", "/assets/garden/moonstone-1.png"]
//   },
//   {
//     id: "draftline",
//     title: "Draftline",
//     category: "Personal craft",
//     tags: ["Productivity", "Writing", "Thinking Tool"],
//     hook: "I built this because I think in drafts, not outlines.",
//     body: [
//       "I tried every writing and thinking tool and none matched how my brain actually works — iteratively, messily, in parallel. Most writing tools optimise for output. This one optimises for thinking.",
//       "Draftline is designed for the early stages of thinking where you're not ready to commit to structure yet. Messy thinking deserves a dedicated space. It's an idea studio for people who don't think in straight lines.",
//       "It changed how I plan, write, and develop ideas. The tool I use every day that nobody asked me to build."
//     ],
//     images: ["/assets/garden/draftline-0.png", "/assets/garden/draftline-0z.png"]
//   },
//   {
//     id: "curious-creative-club",
//     title: "Curious & Creative Club",
//     category: "How I think",
//     tags: ["Education", "Kids", "Curiosity"],
//     hook: "I've been teaching kids to navigate ambiguity for five years. It's the best product training I've ever had.",
//     body: [
//       "Every week, I run a class with no fixed curriculum where kids follow curiosity threads and build things. It's chaos. It works. No curriculum. No grades. Just questions, building, and a room full of kids who aren't afraid to be wrong.",
//       "The class started as coding and science. Five years later, it's about learning how to learn. Small groups, online, deliberately unstructured. Kids follow natural interest threads, learn to ask better questions, deal with ambiguity, and build things.",
//       "Recently evolved to embrace AI as a learning accelerator — teaching kids to use it responsibly to amplify their thinking, not replace it. If you can explain something to a 12-year-old and make them care, you can write a spec anyone can build from.",
//       "This isn't a side hustle — it's the clearest expression of how I think about learning, problem-solving, and building."
//     ],
//     images: ["/assets/garden/c3-hero.png", "/assets/garden/c3-blue.png"]
//   }
// ];

// export interface Project {
//   id: string;
//   title: string;
//   category: string;
//   tags: string[];
//   hook: string;
//   body: string[];
//   images: [string, string];
// }

// export const carusoProjects: Project[] = [
//   {
//     id: "dimensioner",
//     title: "Dimensioner — From Prototype to Warehouse Floor",
//     category: "End-to-end ownership",
//     tags: ["Enterprise", "Hardware", "V0 Prototype"],
//     hook: "Built the prototype in V0, shipped the real thing into our codebase, then went to the warehouse and watched it work.",
//     body: [
//       "One of our biggest customers — a 3PL doing over 1,000 orders a day — needed to integrate a dimensioner, which is basically a scale with a camera that scans parcel dimensions and weight in one go. Black Friday was coming and their team was still measuring every box by hand. There wasn't really a plan for it, so I just picked it up.",
//       "Started by figuring out how the hardware actually worked, then built a standalone app in V0 to prove the concept. Once that was solid, I moved the integration into our real codebase. Added barcode scanning too — in a warehouse where you're processing hundreds of parcels, reaching for a mouse between every order didn't make sense.",
//       "Went to the warehouse for the final demo and it worked how I'd hoped. Customer was really happy with the turnaround and posted about it on LinkedIn. That one felt good."
//     ],
//     images: ["/assets/garden/dimensioner-1.png", "/assets/garden/dimensioner-2.png"]
//   },
//   {
//     id: "customer-insights-panel",
//     title: "Customer Insights Panel — The Tool Nobody Asked For",
//     category: "Seeing a problem, fixing it",
//     tags: ["Browser Extension", "Internal Tool", "HubSpot"],
//     hook: "Went from 'this is annoying to watch' to the team's daily essential in about a week.",
//     body: [
//       "I kept joining Sales and Onboarding syncs and seeing the same thing — reps scrambling between Chargebee, Zendesk, and Canny before every customer call, trying to get context on who they were about to talk to. It wasn't that the info didn't exist. It was just all over the place.",
//       "So I built a browser extension that sits in the HubSpot sidebar. One hotkey grabs the customer email from the page and pulls billing, open tickets, feature requests, install status — all into one panel. Threw in account overrides and keyboard shortcuts because once you start removing friction it's hard to stop.",
//       "Nobody asked me to build it. I shared it and the whole team just started using it — no onboarding, no docs. People tell me their calls are better now because they actually know what's going on before they pick up. I still ship little updates to it whenever I spot something slow."
//     ],
//     images: ["/assets/garden/insights-0.png", "/assets/garden/moonstone-1.png"]
//   },
//   {
//     id: "draftline",
//     title: "Draftline — Personalware for Messy Thinkers",
//     category: "Personal craft",
//     tags: ["Web App", "Writing", "Built with AI"],
//     hook: "The tool I use every day that nobody asked me to build.",
//     body: [
//       "Every writing and note-taking tool I tried was designed for people who think in outlines. I don't. I jump between ideas, change direction mid-thought, and need to see everything at once before I know what I'm actually trying to say.",
//       "Draftline is a web app I built for that. You work in cards you can shuffle, hide, reorder, and reshape — it's more like sculpting than writing. There's a visual trail of how your thinking changed over time, which makes editing feel like part of the process instead of something to dread.",
//       "I built it with V0 and Claude and I use it every day — for planning, writing, working through problems. I call it personalware. Software with an audience of one."
//     ],
//     images: ["/assets/garden/draftline-0.png", "/assets/garden/draftline-0z.png"]
//   },
//   {
//     id: "curious-creative-club",
//     title: "Curious & Creative Club — Five Years of Teaching Kids to Think",
//     category: "How I think",
//     tags: ["Education", "AI Literacy", "Curiosity"],
//     hook: "Five years. No curriculum. Just following whatever the kids are curious about and building from there.",
//     body: [
//       "Every week I run a small online class where kids and I just pull on whatever thread they're interested in. It started as coding and science five years ago. Now it's more about the process — how to ask good questions, how to sit with not knowing the answer yet, how to build something from nothing.",
//       "Lately we've been playing with AI together. Not as a shortcut — more like a sparring partner for their ideas. The rule is it helps you think further, not think less. The kids get it faster than most adults.",
//       "I do this because I love it. There's nothing like watching a kid get genuinely excited about an idea they came up with. And honestly, having to explain things simply and clearly every week has made me better at it everywhere else too."
//     ],
//     images: ["/assets/garden/c3-hero.png", "/assets/garden/c3-blue.png"]
//   }
// ];

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  hook: string;
  body: string[];
  images: [string, string];
}

export const carusoProjects: Project[] = [
  {
    id: "dimensioner",
    title: "Dimensioner - Shipped a new hardware integration for a key Enterprise customer",
    category: "End-to-end ownership",
    tags: ["Enterprise", "Hardware", "v0 Prototype"],
    hook: "From v0 prototype to production code to warehouse floor. All before Black Friday.",
    body: [
      "One of our biggest enterprise customers, a 3PL processing over 1,000 orders a day, needed to integrate a dimensioner. It's a scale with a camera that captures parcel dimensions and weight in a single scan. Their warehouse team was manually measuring every box heading into peak season, costing them speed and accuracy.",
      "I ran discovery on how the hardware worked, then built a fully functional standalone app in v0. To further improve UX, I moved the implementation into our real codebase and added barcode scanning so operators could trigger actions without reaching for a mouse between parcels. In a warehouse doing hundreds of orders a day, that kind of detail matters.",
      "Turnaround of just a few weeks. Shipped before peak season. Even got to visit their warehouse for the final demo to see it in action. The customer was beaming and a lovely success story was posted on LinkedIn."
    ],
    images: ["/assets/garden/dimensioner-1.png", "/assets/garden/dimensioner-2.png"]
  },
  {
    id: "customer-insights-panel",
    title: "Customer Insights tool - Surfacing customer activity across platforms",
    category: "Designing for context",
    tags: ["Browser Extension", "Internal Tool", "Workflow"],
    hook: "Our sales team were checking three platforms for context before calls. Now they click one button.",
    body: [
      "I kept sitting in on Sales and Onboarding syncs and noticing the same pattern. Before every customer call, reps were tabbing between Chargebee, Zendesk, and Canny trying to piece together context. Valuable information was scattered across different platforms.",
      "I built a Chrome sidepanel extension that automatically detects the customer email from the HubSpot page and pulls billing/trial status, open support tickets, and feature requests into a single panel. I added account overrides and keyboard shortcuts to remove even more friction from the workflow.",
      "Nobody asked me to build this. I shared it and the entire Sales and Onboarding team adopted it within a week, no training required. Reps say their customer conversations are richer now because they walk into every call with full context."
    ],
    images: ["/assets/caruso/insight-1.png", "/assets/caruso/insight-2.png"]
  },
  {
    id: "draftline",
    title: "Draftline - A thinking studio for refining raw ideas",
    category: "Personal craft",
    tags: ["Web App", "Writing", "Built with AI"],
    hook: "Built an interface that has changed how I plan, write, and develop ideas.",
    body: [
      "I don't think in straight lines. I jump between ideas, change direction mid-thought, and need to see everything at once before I know what I'm actually trying to say. Most note-taking tools felt too restrictive.",
      "Draftline is a web app I built with Claude and Lovable for non-linear thinking. You work in cards you can shuffle, hide, reorder, and reshape. It shows a visual trail of how your thinking evolves over time. Now writing feels like sculpting ideas.",
      "It eliminated my writer's block, made revisions feel less precious, and gave me confidence to build things I need but don't exist."
    ],
    images: ["/assets/garden/draftline-0.png", "/assets/garden/draftline-0z.png"]
  },
  {
    id: "curious-creative-club",
    title: "Curious & Creative Club - Teaching young students Science & Coding",
    category: "Teaching others",
    tags: ["Education", "Tech Literacy", "Problem Solving"],
    hook: "Tutoring kids to build skills that will matter tomorrow. No curriculum. No exams. Just learning to love learning.",
    body: [
      "Every week for the last 5 years, I've run online classes where kids follow curiosity threads and build cool things. It started as coding and science classes. Now it's more about the process: how to ask good questions, how to deal with ambiguity, how to build something.",
      "Lately we've been exploring AI together. Not as a shortcut, but responsibly as a sparring partner for their ideas. The rule is it helps you think further, not think less. It has unlocked an insane amount of learning potential.",
      "Explaining complex ideas simply and clearly every class has made me a better communicator everywhere else. A PM is often the translator between teams, and this is where I built that muscle."
    ],
    images: ["/assets/garden/c3-hero.png", "/assets/caruso/c3-2.png"]
  }
];