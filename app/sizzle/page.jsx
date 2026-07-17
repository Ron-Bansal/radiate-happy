"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleHelp,
  Clock3,
  Lightbulb,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  Shuffle,
  SlidersHorizontal,
  Sparkles,
  Timer,
  Volume2,
  VolumeX,
} from "lucide-react";
import styles from "./sizzle.module.css";

const heatRank = { easy: 1, med: 2, spicy: 3 };
const heatLabels = { easy: "Light", med: "Stretch", spicy: "Spicy" };

const activities = [
  { id: "spark", no: "01", name: "Spark", icon: "✦", tone: "Think wider", blurb: "Give your first answer, then look for a second one that’s less obvious. Follow whichever idea feels most interesting." },
  { id: "hot-take", no: "02", name: "Hot Take", icon: "◐", tone: "Build a case", blurb: "Make three different arguments for the claim. Then swap sides and see how well you can challenge your own case." },
  { id: "of-course", no: "03", name: "Ah, Of Course", icon: "◎", tone: "Improvise", blurb: "Start with “Ah, of course…” and explain the topic as if you know it inside out. Make up examples when you need them." },
  { id: "word-web", no: "04", name: "Word Web", icon: "⌘", tone: "Connect ideas", blurb: "Work all five words into one flowing talk. Tap each word when you use it, but don’t use one to start a sentence." },
  { id: "pitch", no: "05", name: "The Pitch", icon: "◇", tone: "Persuade", blurb: "Figure out what this buyer cares about, make the product feel useful to them, and finish by naming your price." },
  { id: "wrong", no: "06", name: "Wrong Answers", icon: "↯", tone: "Reframe", blurb: "Come up with the worst solutions you can. Pick the most interesting bad idea and turn one part of it into something useful." },
  { id: "riddle", no: "07", name: "Riddle Room", icon: "?", tone: "Reason aloud", blurb: "Talk through what you notice, what you’re assuming, and what you can rule out. The reasoning matters more than a quick answer." },
  { id: "box", no: "08", name: "Out of the Box", icon: "□", tone: "Solve sideways", blurb: "Read the case, decide what the real problem is, then suggest one practical fix and one unusual one." },
];

const introActivities = [
  { id: "spark", note: "Find more than one useful answer", skill: "More ways to think" },
  { id: "hot-take", note: "Build a case, then challenge it", skill: "Make your point" },
  { id: "word-web", note: "Connect five unrelated words out loud", skill: "Keep ideas connected" },
  { id: "box", note: "Solve a real problem from a new angle", skill: "Try another angle" },
];

const sparks = [
  ["easy", "What tiny thing makes an ordinary day noticeably better?"],
  ["easy", "If your room could make one complaint about you, what would it be?"],
  ["easy", "What should exist as a sport but currently does not?"],
  ["easy", "Which everyday object deserves a redesign first?"],
  ["easy", "What skill should every eleven-year-old know?"],
  ["med", "What problem have adults become too used to noticing?"],
  ["med", "If school began at noon, what would improve and what would get worse?"],
  ["med", "Which rule works well in one place but badly everywhere else?"],
  ["med", "What job might exist in fifty years that sounds strange today?"],
  ["med", "When is being bored actually useful?"],
  ["med", "What is easy to measure but hard to understand?"],
  ["spicy", "If nobody could lie for a week, what would break first?"],
  ["spicy", "Should we revive extinct animals if we can? Who gets a vote?"],
  ["spicy", "Would a world with perfect memory be better or worse?"],
  ["spicy", "If an AI made a brilliant painting, where does the creativity live?"],
  ["spicy", "Which is more dangerous: certainty or indecision?"],
].map(([h, text]) => ({ h, text }));

const hotTakes = [
  ["easy", "Breakfast food is better at dinner."],
  ["easy", "Every meeting should include snacks."],
  ["easy", "Rainy days are better than sunny days."],
  ["easy", "Board games are better than video games."],
  ["easy", "Homework should be replaced by useful errands."],
  ["med", "Schools should let students design one subject each term."],
  ["med", "Being late should be socially acceptable."],
  ["med", "Cities would improve if most signs disappeared."],
  ["med", "Everyone should change careers at least once."],
  ["med", "The internet was better when it was slower."],
  ["spicy", "Convenience is making us less capable."],
  ["spicy", "Talent is mostly a story people tell after the work is done."],
  ["spicy", "Every important decision should include one randomly chosen person."],
  ["spicy", "Privacy is more valuable than personalisation."],
  ["spicy", "Failure should be listed on a CV."],
].map(([h, text]) => ({ h, text }));

const expertTopics = [
  ["easy", "why toast always lands butter-side down"],
  ["easy", "the secret social life of houseplants"],
  ["easy", "how clouds choose their shapes"],
  ["easy", "the correct way to train a pet rock"],
  ["easy", "why socks disappear in the wash"],
  ["med", "the hidden economy of supermarket trolleys"],
  ["med", "how lift music affects international diplomacy"],
  ["med", "the ancient rules of competitive queueing"],
  ["med", "why pigeons are excellent urban planners"],
  ["med", "the licensing process for professional time travellers"],
  ["spicy", "the forgotten fifth season between winter and spring"],
  ["spicy", "why mirrors are always a fraction behind reality"],
  ["spicy", "the philosophy of revolving doors"],
  ["spicy", "how silence is traded on the international market"],
  ["spicy", "the failed moon replacement project of 1987"],
].map(([h, text]) => ({ h, text }));

const words = {
  easy: ["balloon", "ticket", "spoon", "thunder", "bicycle", "museum", "ladder", "ocean", "mirror", "pickle", "blanket", "compass", "garden", "rocket", "suitcase", "whistle"],
  med: ["deadline", "rumour", "gravity", "applause", "shortcut", "signal", "balance", "pattern", "detour", "evidence", "habit", "momentum", "border", "echo", "permission", "risk"],
  spicy: ["nostalgia", "contradiction", "bias", "ritual", "scarcity", "trust", "identity", "uncertainty", "status", "patience", "legacy", "coincidence", "ambition", "context", "tension", "belonging"],
};

const pitchObjects = [
  "a reusable bottle with a stubborn lid", "a notebook missing its last ten pages", "a desk lamp that is slightly too bright",
  "a travel pillow that takes up half your bag", "a tiny whiteboard", "an analogue alarm clock", "an umbrella made for one person",
  "a single oven mitt", "a tote bag with very short handles", "a surprisingly heavy keyring", "a folding chair with no cup holder",
  "a plain cardboard box", "a phone stand that only works sideways", "a mug that keeps drinks warm for twenty minutes", "a pocket-sized tape measure",
  "a basic kitchen timer", "a raincoat with no pockets", "a set of blank postcards", "a small desk fan", "a clipboard with a weak clip",
  "a compact mirror", "a roll of masking tape", "a magnetic shopping list", "a manual pencil sharpener", "a cushion that is a little too firm",
  "a plain canvas apron", "a luggage tag with oversized lettering", "a rechargeable reading light", "a weekly paper planner", "a stackable lunch container",
];
const buyers = {
  easy: ["a friend moving into their first flat", "a parent who hates clutter", "a teacher planning a field trip", "a café owner", "a daily train commuter", "someone working from home", "a student starting university", "a family packing for a road trip", "a neighbour organising a garage sale", "a traveller with one small bag"],
  med: ["a startup founder cutting costs", "a boutique hotel manager", "a large event organiser", "a museum gift-shop buyer", "an airline cabin-crew manager", "a university librarian", "a restaurant owner redesigning their tables", "a school principal with a tight budget", "a productivity-app founder", "a buyer for an outdoor retailer"],
  spicy: ["an Antarctic research team", "a film-set prop master", "a disaster-relief coordinator", "a mayor running for re-election", "a luxury-brand creative director", "a crew preparing for a year in space", "a hospital operations manager", "the producer of a live television show", "a national park ranger", "an architect designing a micro-apartment"],
};

const problems = [
  ["easy", "The cafeteria queue takes nearly the whole lunch break."],
  ["easy", "People keep leaving reusable bottles at home."],
  ["easy", "Nobody can find a pen that works when they need one."],
  ["easy", "The classroom is too hot in summer and too cold in winter."],
  ["easy", "Everyone forgets whose turn it is to do the boring chores."],
  ["med", "People agree to plans in group chats but nobody chooses a time."],
  ["med", "Tourists crowd one landmark and miss the rest of the city."],
  ["med", "A useful community garden has almost no regular volunteers."],
  ["med", "Online meetings start with five minutes of technical confusion."],
  ["med", "A library has great workshops that nobody knows about."],
  ["spicy", "A town wants fewer cars but public transport is unreliable."],
  ["spicy", "A school wants honest feedback, but students do not feel safe giving it."],
  ["spicy", "A popular park is being damaged by the number of visitors."],
  ["spicy", "A news site needs attention to survive but does not want to use outrage."],
  ["spicy", "A service is easiest for confident people and hardest for those who need it most."],
].map(([h, text]) => ({ h, text }));

const riddles = [
  { h: "easy", text: "What gets wetter the more it dries?", hints: ["You find it in a bathroom.", "You use it after water.", "It is made of fabric."], answer: "A towel." },
  { h: "easy", text: "What has hands and a face but cannot hold or smile?", hints: ["It is often on a wall.", "Its hands keep moving.", "It helps you avoid being late."], answer: "A clock." },
  { h: "easy", text: "What becomes shorter as it gets older?", hints: ["It gives light.", "Heat changes its shape.", "You may put one on a birthday cake."], answer: "A candle." },
  { h: "easy", text: "What has many keys but cannot open a door?", hints: ["It belongs in a music room.", "Some keys are black.", "You play it."], answer: "A piano." },
  { h: "med", text: "The more you take, the more you leave behind. What are they?", hints: ["Think about a journey.", "You make them without trying.", "They are clear on sand."], answer: "Footsteps." },
  { h: "med", text: "What can travel around the world while staying in one corner?", hints: ["It is small and flat.", "It travels on paper.", "You buy it at a post office."], answer: "A stamp." },
  { h: "med", text: "What can fill a room but takes up no space?", hints: ["You notice it with your eyes.", "It can be natural or electric.", "A lamp makes it."], answer: "Light." },
  { h: "med", text: "Forward I am heavy. Backward I am not. What am I?", hints: ["It is a word puzzle.", "It is only three letters.", "Read TON backwards."], answer: "TON — backwards it is NOT." },
  { h: "spicy", text: "A man pushes his car to a hotel and knows he is bankrupt. Why?", hints: ["Nothing is broken.", "The car is tiny.", "He is playing a game."], answer: "He is playing Monopoly and landed at a hotel he cannot afford." },
  { h: "spicy", text: "A woman shoots her husband, holds him underwater, then hangs him. They eat dinner together. How?", hints: ["He is completely safe.", "The verbs are literal.", "Think of a dark room and paper."], answer: "She took his photograph, developed it, and hung the print." },
  { h: "spicy", text: "Two fathers and two sons catch three fish. Each gets one. How?", hints: ["There are fewer than four people.", "One person has two roles.", "Think across three generations."], answer: "They are a grandfather, his son, and his grandson." },
  { h: "spicy", text: "A cowboy rides into town on Friday, stays three days, and leaves on Friday. How?", hints: ["The calendar is fine.", "Pay attention to what he rode.", "Friday is a name."], answer: "His horse is named Friday." },
];

const cases = [
  { h: "easy", title: "The slow lift", problem: "People in an office tower constantly complain that its lifts are too slow. Replacing them would cost millions. What else could the building change?", reveal: "The building put mirrors beside the lifts. People checked their appearance and watched the room; complaints fell even though the lifts were no faster.", lesson: "The stated complaint and the felt problem are not always the same." },
  { h: "easy", title: "The piano stairs", problem: "At a metro station almost everyone uses the escalator beside an empty staircase. How might you make the healthier choice more inviting?", reveal: "The stairs were turned into working piano keys. Far more people chose them because the useful choice had become the playful one.", lesson: "Make the better behaviour intrinsically rewarding." },
  { h: "easy", title: "The airport walk", problem: "Passengers complain about waiting for baggage even after the airport speeds up unloading. What could it redesign without changing the machines?", reveal: "The airport lengthened the walk from the gate. The same total trip felt shorter because less of it was spent standing still.", lesson: "Occupied time feels different from waiting time." },
  { h: "med", title: "The tiny fly", problem: "An airport spends heavily cleaning messy bathrooms. Signs and reminders have little effect. What small environmental change could help?", reveal: "A tiny fly was etched into each urinal, giving people a target. A visual cue changed behaviour better than another instruction.", lesson: "Design the environment, not just the message." },
  { h: "med", title: "The speed lottery", problem: "A city’s speed cameras punish fast drivers, but speeding remains common. How could the same system make safe driving feel worthwhile?", reveal: "A trial entered law-abiding drivers into a lottery funded by speeding fines. Average speeds dropped during the experiment.", lesson: "Reward can change the emotional meaning of a rule." },
  { h: "med", title: "The supermarket queue", problem: "Shoppers abandon long checkout lines, yet adding permanent staff would be too costly. What information might improve the experience?", reveal: "Some stores display realistic wait estimates and open temporary express lanes based on basket size. Predictability and visible progress reduce frustration.", lesson: "Uncertain waits feel longer than explained ones." },
  { h: "spicy", title: "Mimes versus traffic", problem: "Drivers in Bogotá ignore traffic rules and enforcement has lost authority. The city has little money. How could it reset the social norm?", reveal: "The mayor used mimes to publicly mirror and gently mock dangerous behaviour. Social feedback reached people in a way fines had not.", lesson: "Culture can regulate behaviour where authority cannot." },
  { h: "spicy", title: "A warmer, not an incubator", problem: "Premature babies in remote areas need warmth, but hospital incubators are expensive, fragile, and electricity-dependent. What would you design for the real setting?", reveal: "The Embrace warmer used a portable insulated wrap and reusable phase-change pouch, providing stable warmth without continuous power.", lesson: "Solve for the context, not for a cheaper version of the existing product." },
  { h: "spicy", title: "The library without fines", problem: "Late fees are meant to bring books back, but they also keep low-income families away from libraries. How might a library protect access and its collection?", reveal: "Many libraries removed daily fines while still charging for truly lost items and sending better reminders. Returns stayed broadly stable while access improved.", lesson: "A policy’s side effects can work against its original purpose." },
];

function hashNumber(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pick(items, heat, seed, salt = "") {
  if (heat === "all") {
    const start = hashNumber(`${salt}-all`) % items.length;
    return items[(start + seed) % items.length];
  }
  const exact = items.filter((item) => item.h === heat);
  const pool = exact.length ? exact : items.filter((item) => heatRank[item.h] <= heatRank[heat]);
  const start = hashNumber(`${salt}-${heat}`) % pool.length;
  return pool[(start + seed) % pool.length];
}

function shuffled(list, seed = 1) {
  const copy = [...list];
  let state = hashNumber(seed) || 1;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatTime(total) {
  const value = Math.max(0, Math.round(total));
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}

function useTimer(initialMode, initialSeconds) {
  const [mode, setMode] = useState(initialMode);
  const [duration, setDuration] = useState(initialSeconds);
  const [seconds, setSeconds] = useState(initialMode === "countdown" ? initialSeconds : 0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const endAt = useRef(0);
  const startedAt = useRef(0);

  useEffect(() => {
    if (!running) return undefined;
    const tick = () => {
      if (mode === "countdown") {
        const left = Math.max(0, (endAt.current - Date.now()) / 1000);
        setSeconds(left);
        if (left <= 0) {
          setRunning(false);
          setFinished(true);
        }
      } else {
        setSeconds((Date.now() - startedAt.current) / 1000);
      }
    };
    const id = window.setInterval(tick, 100);
    tick();
    return () => window.clearInterval(id);
  }, [running, mode]);

  useEffect(() => {
    if (!finished) return undefined;
    const id = window.setTimeout(() => setFinished(false), 2400);
    return () => window.clearTimeout(id);
  }, [finished]);

  const load = useCallback((nextMode, nextDuration) => {
    setRunning(false);
    setFinished(false);
    setMode(nextMode);
    setDuration(nextDuration);
    setSeconds(nextMode === "countdown" ? nextDuration : 0);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setFinished(false);
    setSeconds(mode === "countdown" ? duration : 0);
  }, [duration, mode]);

  const toggle = useCallback(() => {
    setFinished(false);
    setRunning((isRunning) => {
      if (!isRunning) {
        if (mode === "countdown") {
          const startFrom = seconds <= 0 ? duration : seconds;
          if (seconds <= 0) setSeconds(duration);
          endAt.current = Date.now() + startFrom * 1000;
        } else {
          startedAt.current = Date.now() - seconds * 1000;
        }
      }
      return !isRunning;
    });
  }, [duration, mode, seconds]);

  const nudge = useCallback((amount) => {
    const next = Math.min(600, Math.max(30, duration + amount));
    setDuration(next);
    if (running && mode === "countdown") endAt.current += amount * 1000;
    setSeconds((current) => (running ? Math.max(0, current + amount) : next));
  }, [duration, mode, running]);

  const swapMode = useCallback(() => load(mode === "countdown" ? "stopwatch" : "countdown", duration), [duration, load, mode]);
  const dirty = running || (mode === "countdown" ? Math.abs(seconds - duration) > 0.5 : seconds > 0.5);
  return { mode, duration, seconds, running, finished, dirty, load, reset, toggle, nudge, swapMode };
}

function TextPrompt({ kicker, children, note }) {
  return (
    <div className={styles.promptCopy}>
      {kicker && <p className={styles.kicker}>{kicker}</p>}
      <h1>{children}</h1>
      {note && <p className={styles.coachNote}>{note}</p>}
    </div>
  );
}

function ActivityBody({ id, heat, seed }) {
  const [phase, setPhase] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [usedWords, setUsedWords] = useState([]);
  const [productNonce, setProductNonce] = useState(0);
  const [buyerNonce, setBuyerNonce] = useState(0);
  const answerRef = useRef(null);

  useEffect(() => {
    setPhase(0);
    setHintCount(0);
    setUsedWords([]);
    setProductNonce(0);
    setBuyerNonce(0);
  }, [id, heat, seed]);

  useEffect(() => {
    if (id !== "riddle" || phase !== 1) return undefined;
    const frame = window.requestAnimationFrame(() => {
      answerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [id, phase]);

  const content = useMemo(() => {
    let value;
    if (id === "spark") value = pick(sparks, heat, seed, id);
    if (id === "hot-take") value = pick(hotTakes, heat, seed, id);
    if (id === "of-course") value = pick(expertTopics, heat, seed, id);
    if (id === "wrong") value = pick(problems, heat, seed, id);
    if (id === "riddle") value = pick(riddles, heat, seed, id);
    if (id === "box") value = pick(cases, heat, seed, id);
    return value;
  }, [heat, id, seed]);

  const webWords = useMemo(() => {
    if (id !== "word-web") return [];
    if (heat === "all") return shuffled([...words.easy, ...words.med, ...words.spicy], seed).slice(0, 5);
    if (heat === "easy") return shuffled(words.easy, seed).slice(0, 5);
    if (heat === "med") return shuffled([...words.easy, ...words.med], seed).slice(0, 5);
    return [...shuffled(words.med, `${seed}-a`).slice(0, 2), ...shuffled(words.spicy, `${seed}-b`).slice(0, 3)];
  }, [heat, id, seed]);

  const pitch = useMemo(() => {
    const buyerPool = heat === "all" ? Object.values(buyers).flat() : buyers[heat];
    return id === "pitch" ? {
      object: pitchObjects[(hashNumber(`${seed}-object`) + productNonce) % pitchObjects.length],
      buyer: buyerPool[(hashNumber(`${seed}-buyer-${heat}`) + buyerNonce) % buyerPool.length],
    } : null;
  }, [buyerNonce, heat, id, productNonce, seed]);

  if (id === "spark") return <TextPrompt kicker="Follow the interesting thread" note="Answer once. Then ask: what else might be true?">{content.text}</TextPrompt>;

  if (id === "hot-take") return (
    <TextPrompt kicker={phase ? "Now argue the opposite" : "Make the case"} note="Aim for three distinct reasons, not three versions of the same reason.">
      {content.text}
      <button className={styles.inlineAction} onClick={() => setPhase((p) => 1 - p)}><Shuffle size={16} /> Swap sides</button>
    </TextPrompt>
  );

  if (id === "of-course") return <TextPrompt kicker="Begin with “Ah, of course…”" note="Use examples, invented evidence and one confident conclusion.">{content.text}</TextPrompt>;

  if (id === "word-web") return (
    <div className={styles.webWrap}>
      <div className={styles.webHeader}>
        <div><p className={styles.kicker}>Build one connected story</p><p className={styles.coachNote}>Tap a word when it lands. Don’t begin a sentence with it.</p></div>
        <strong>{usedWords.length}<span>/5</span></strong>
      </div>
      <div className={styles.wordGrid}>
        {webWords.map((word, index) => {
          const on = usedWords.includes(index);
          return <button key={word} className={on ? styles.wordUsed : ""} onClick={() => setUsedWords((used) => on ? used.filter((item) => item !== index) : [...used, index])}>{on && <Check size={17} />}{word}</button>;
        })}
      </div>
      <p className={`${styles.completeLine} ${usedWords.length === 5 ? "" : styles.completePending}`} aria-hidden={usedWords.length !== 5}><Sparkles size={17} /> All five. Now give the story a final sentence.</p>
    </div>
  );

  if (id === "pitch") return (
    <div className={styles.pitchPrompt}>
      <p className={styles.kicker}>Your product</p>
      <h1>{pitch.object}</h1>
      <button className={styles.pitchReroll} onClick={() => setProductNonce((value) => value + 1)}><RefreshCw size={13} /> New product</button>
      <div className={styles.pitchDivider}><span>sell it to</span></div>
      <h2>{pitch.buyer}</h2>
      <button className={styles.pitchReroll} onClick={() => setBuyerNonce((value) => value + 1)}><RefreshCw size={13} /> New buyer</button>
      <p className={styles.coachNote}>Find their real need. Turn the flaw into a feature. Name your price at the end.</p>
    </div>
  );

  if (id === "wrong") return (
    <TextPrompt kicker={phase ? "Find the useful seed" : "Worst ideas only"} note={phase ? "Choose the most interesting bad idea. What assumption does it challenge?" : "Go expensive, impractical or exaggerated. Quantity first; judgement later."}>
      {content.text}
      <button className={styles.inlineAction} onClick={() => setPhase((p) => 1 - p)}>{phase ? <ArrowLeft size={16} /> : <Lightbulb size={16} />}{phase ? "Back to bad ideas" : "Flip one into insight"}</button>
    </TextPrompt>
  );

  if (id === "riddle") return (
    <div className={styles.riddleWrap}>
      <TextPrompt kicker="Think out loud" note="Name what you notice, what you assume and what you can rule out.">{content.text}</TextPrompt>
      <div className={styles.revealStack} aria-live="polite">
        {content.hints.slice(0, hintCount).map((hint, index) => <p key={hint}><span>Hint {index + 1}</span>{hint}</p>)}
        {phase === 1 && <div ref={answerRef} className={styles.answer}><span>Answer</span><div>{content.answer}</div></div>}
      </div>
      <div className={styles.revealActions}>
        <button disabled={hintCount === 3 || phase === 1} onClick={() => setHintCount((count) => Math.min(3, count + 1))}>Hint · {3 - hintCount} left</button>
        <button disabled={phase === 1} onClick={() => setPhase(1)}>Reveal answer</button>
      </div>
    </div>
  );

  return (
    <div className={styles.caseWrap}>
      <p className={styles.kicker}>Case file</p>
      <p className={styles.caseText}><b>The challenge</b>{content.problem}</p>
      <div className={`${styles.caseReveal} ${phase ? styles.caseRevealVisible : ""}`} aria-live="polite">
        {phase ? <><p><b>{content.title} · What happened</b>{content.reveal}</p><div className={styles.lesson}><Lightbulb size={18} /><span><b>Design lesson</b>{content.lesson}</span></div></> : <p className={styles.casePlaceholder}>Take a minute to pitch your own solutions before revealing what happened.</p>}
      </div>
      <button className={styles.inlineAction} onClick={() => setPhase((p) => 1 - p)}>{phase ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}{phase ? "Hide the answer" : "See what worked"}</button>
    </div>
  );
}

function playChime() {
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    const context = new Audio();
    [523.25, 659.25, 783.99].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, context.currentTime + index * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.16, context.currentTime + index * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + index * 0.12 + 0.5);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(context.currentTime + index * 0.12);
      oscillator.stop(context.currentTime + index * 0.12 + 0.52);
    });
  } catch (_) {}
}

function playStartSound() {
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    const context = new Audio();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(440, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(560, context.currentTime + 0.08);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.055, context.currentTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.14);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.15);
  } catch (_) {}
}

export default function SizzlePage() {
  const [activeId, setActiveId] = useState("spark");
  const [heat, setHeat] = useState("all");
  const [seed, setSeed] = useState(1);
  const [sound, setSound] = useState(true);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [intro, setIntro] = useState(true);
  const [instructionsVisible, setInstructionsVisible] = useState(true);
  const [history, setHistory] = useState([]);
  const preferencesRef = useRef(null);
  const active = activities.find((activity) => activity.id === activeId);
  const cardHeat = heat === "all" ? ["easy", "med", "spicy"][hashNumber(`${activeId}-${seed}-heat`) % 3] : heat;
  const timer = useTimer("countdown", 120);
  const { load, reset, toggle } = timer;

  const toggleTimer = useCallback(() => {
    if (!timer.running && sound) playStartSound();
    toggle();
  }, [sound, timer.running, toggle]);

  const rememberCurrent = useCallback(() => {
    setHistory((items) => [...items.slice(-11), { activeId, heat, seed }]);
  }, [activeId, heat, seed]);

  useEffect(() => {
    if (!preferencesOpen) return undefined;
    const close = (event) => {
      if (!preferencesRef.current?.contains(event.target)) setPreferencesOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setPreferencesOpen(false);
    };
    document.addEventListener("pointerdown", close);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [preferencesOpen]);

  const openActivity = useCallback((activity) => {
    rememberCurrent();
    setActiveId(activity.id);
    setSeed((value) => value + 1);
    load("countdown", 120);
  }, [load, rememberCurrent]);

  const reroll = useCallback(() => {
    rememberCurrent();
    setSeed((value) => value + 1);
    reset();
  }, [rememberCurrent, reset]);

  const goBack = useCallback(() => {
    if (!history.length) return;
    const previous = history[history.length - 1];
    setActiveId(previous.activeId);
    setHeat(previous.heat);
    setSeed(previous.seed);
    setHistory((items) => items.slice(0, -1));
    load("countdown", 120);
  }, [history, load]);

  const changeDifficulty = (level) => {
    if (level === heat) return;
    rememberCurrent();
    setHeat(level);
    setSeed((value) => value + 1);
    reset();
  };

  useEffect(() => {
    if (timer.finished && sound) playChime();
  }, [sound, timer.finished]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (["INPUT", "TEXTAREA", "BUTTON"].includes(document.activeElement?.tagName)) return;
      if (event.code === "Space") { event.preventDefault(); toggleTimer(); }
      if (event.key.toLowerCase() === "r") reroll();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [reroll, toggleTimer]);

  const surprise = () => {
    const options = activities.filter((activity) => activity.id !== activeId);
    openActivity(options[Math.floor(Math.random() * options.length)]);
  };

  const startWith = (activityId) => {
    setActiveId(activityId);
    setSeed((value) => value + 1);
    setHistory([]);
    load("countdown", 120);
    setIntro(false);
  };

  const pickWarmup = () => {
    const options = activities.filter((activity) => activity.id !== activeId);
    startWith(options[Math.floor(Math.random() * options.length)].id);
  };

  if (intro) return (
    <main className={styles.intro}>
      <div className={styles.ambientOne} /><div className={styles.ambientTwo} />
      <section className={styles.introCard}>
        <div className={styles.cardLayers} aria-hidden="true"><span /><span /></div>
        <div className={styles.introContent}>
          <header className={styles.introHeader}><div><span className={styles.introMark}><Sparkles size={17} /></span><b>Sizzle</b></div><span>Short thinking and speaking activities</span></header>
          <div className={styles.introHero}>
            <p className={styles.kicker}>A few minutes, one prompt</p>
            <h1>Small challenges for better thinking and speaking.</h1>
            <p>Practise finding original ideas, making a clear case, improvising and reasoning out loud—together or on your own.</p>
            <button className={styles.introPrimary} onClick={pickWarmup}>Pick a warm-up for me <ArrowRight size={16} /></button>
          </div>
          <div className={styles.introChoices}>
            <span>Warm-up activities</span>
            <div>{introActivities.map((choice) => { const activity = activities.find((item) => item.id === choice.id); return <button key={choice.id} onClick={() => startWith(choice.id)}><span>{activity.icon}</span><div><b>{activity.name}</b><small>{choice.note}</small><em>{choice.skill}</em></div><ArrowRight size={16} /></button>; })}</div>
          </div>
        </div>
      </section>
    </main>
  );

  return (
    <main className={`${styles.app} ${timer.finished ? styles.finished : ""}`}>
      <div className={styles.ambientOne} /><div className={styles.ambientTwo} />
      <header className={styles.header}>
        <button className={styles.wordmark} onClick={() => setIntro(true)}><span><Sparkles size={15} /></span>Sizzle</button>
        <div className={styles.topTimer}>
          <div className={styles.modeSwitch} role="group" aria-label="Timer mode">
            <button className={timer.mode === "countdown" ? styles.activeMode : ""} onClick={() => load("countdown", 120)} aria-label="Use two minute timer" data-tooltip="2 minute timer"><Timer size={16} /></button>
            <button className={timer.mode === "stopwatch" ? styles.activeMode : ""} onClick={() => load("stopwatch", 120)} aria-label="Use stopwatch" data-tooltip="Stopwatch"><Clock3 size={16} /></button>
          </div>
          {timer.mode === "countdown" && <button className={styles.topNudge} onClick={() => timer.nudge(-30)}>−30</button>}
          <button className={styles.topPlay} onClick={toggleTimer}>{timer.running ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}<strong>{formatTime(timer.seconds)}</strong></button>
          {timer.mode === "countdown" && <button className={styles.topNudge} onClick={() => timer.nudge(30)}>+30</button>}
          {timer.dirty && <button className={styles.topReset} onClick={timer.reset} aria-label="Reset timer" data-tooltip="Reset"><RotateCcw size={16} /></button>}
        </div>
        <div className={styles.headerActions} ref={preferencesRef}>
          <button className={styles.preferencesTrigger} onClick={() => setPreferencesOpen((open) => !open)} aria-label="Open preferences" aria-expanded={preferencesOpen}><SlidersHorizontal size={18} /></button>
          <button className={styles.surprise} onClick={surprise}><Shuffle size={16} /> Surprise me</button>
          {preferencesOpen && <div className={styles.preferencesMenu} role="dialog" aria-label="Preferences">
            <div className={styles.preferencesHeading}><div><small>Preferences</small><b>Session settings</b></div><SlidersHorizontal size={16} /></div>
            <button className={styles.soundSetting} onClick={() => setSound((value) => !value)}><span>{sound ? <Volume2 size={16} /> : <VolumeX size={16} />}<span><b>Sound</b><small>Timer cues and finish chime</small></span></span><i className={sound ? styles.switchOn : ""} aria-hidden="true"><span /></i></button>
            <div className={styles.difficultySetting}><span><b>Prompt range</b><small>Choose how far the prompts should push</small></span><div>{[["all", "Mixed"], ["easy", "Light"], ["med", "Stretch"], ["spicy", "Spicy"]].map(([value, label]) => <button key={value} className={heat === value ? styles.preferenceSelected : ""} onClick={() => changeDifficulty(value)}>{label}</button>)}</div></div>
            <div className={styles.shortcutSetting}><span>Keyboard shortcuts</span><p><kbd>Space</kbd><span>Start or pause timer</span></p><p><kbd>R</kbd><span>New prompt</span></p></div>
          </div>}
        </div>
      </header>

      <nav className={styles.activityRail} aria-label="Warm-up activities">
        {activities.map((activity) => <button key={activity.id} className={activity.id === activeId ? styles.activeActivity : ""} onClick={() => openActivity(activity)}><span>{activity.icon}</span><small>{activity.no}</small><b>{activity.name}</b></button>)}
      </nav>

      <section className={styles.workspace}>
        <div className={styles.stageColumn}>
          <div className={styles.stageLayers} key={`layers-${activeId}-${seed}`} aria-hidden="true"><span /><span /></div>
          <article className={styles.stage} key={`${activeId}-${seed}`}>
            <div className={styles.stageTop}>
              <div className={styles.stageIdentity}><span>{active.icon}</span><div><small>{active.no} · {active.tone}</small><div className={styles.stageTitleRow}><h2>{active.name}</h2><button className={styles.instructionToggle} onClick={() => setInstructionsVisible((visible) => !visible)} aria-label={instructionsVisible ? "Hide instructions" : "Show instructions"} aria-pressed={instructionsVisible}><CircleHelp size={13} /></button><button className={`${styles.instructionHide} ${!instructionsVisible ? styles.instructionHideInvisible : ""}`} onClick={() => setInstructionsVisible(false)} tabIndex={instructionsVisible ? 0 : -1}>Hide instructions</button></div></div></div>
              <div className={styles.cardActions}>
                <button onClick={goBack} disabled={!history.length} aria-label="Previous prompt" title="Previous prompt"><ArrowLeft size={18} /><span>Back</span></button>
                <button onClick={reroll} aria-label="New prompt" title="New prompt"><RefreshCw size={18} /><span>New</span></button>
              </div>
            </div>
            <div className={`${styles.instructions} ${!instructionsVisible ? styles.instructionsHidden : ""}`} aria-hidden={!instructionsVisible}><p>{active.blurb}</p></div>
            <div className={styles.activityBody}><ActivityBody id={activeId} heat={cardHeat} seed={seed} /></div>
            <div className={styles.stageFooter}><span>{heatLabels[cardHeat]} prompt</span><span>{active.tone}</span></div>
          </article>
        </div>
      </section>
    </main>
  );
}
