"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleHelp,
  Clock3,
  Flame,
  Lightbulb,
  Pause,
  Play,
  RefreshCw,
  Shuffle,
  Sparkles,
  TimerReset,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import styles from "./sizzle.module.css";

const heatRank = { easy: 1, med: 2, spicy: 3 };

const activities = [
  { id: "spark", no: "01", name: "Spark", icon: "✦", tone: "Think wider", blurb: "Start with your honest answer, then keep going. The interesting bit usually arrives after the obvious answer." },
  { id: "hot-take", no: "02", name: "Hot Take", icon: "◐", tone: "Build a case", blurb: "Defend the claim with three genuinely different reasons. Halfway through, swap sides and challenge your own argument." },
  { id: "of-course", no: "03", name: "Ah, Of Course", icon: "◎", tone: "Improvise", blurb: "Open with “Ah, of course…” and teach this topic with total confidence. Examples and invented evidence are encouraged." },
  { id: "word-web", no: "04", name: "Word Web", icon: "⌘", tone: "Connect ideas", blurb: "Give one flowing talk that connects all five words. Tap each word when you use it, but don’t start a sentence with one." },
  { id: "pitch", no: "05", name: "The Pitch", icon: "◇", tone: "Persuade", blurb: "Work out what this buyer really cares about, turn the product’s weakness into a strength, and finish with a price." },
  { id: "wrong", no: "06", name: "Wrong Answers", icon: "↯", tone: "Reframe", blurb: "Generate deliberately terrible solutions first. Then choose the most interesting one and rescue the useful idea inside it." },
  { id: "riddle", no: "07", name: "Riddle Room", icon: "?", tone: "Reason aloud", blurb: "Say what you notice, what you’re assuming and what you can rule out. A clear wrong path is still useful progress." },
  { id: "box", no: "08", name: "Out of the Box", icon: "□", tone: "Solve sideways", blurb: "Read the real-world case, name the problem beneath the complaint, then offer one sensible fix and one sideways fix." },
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

const pitchObjects = ["a blunt pencil", "a cracked mug", "one left glove", "an empty notebook", "a noisy chair", "a paper clip", "last year’s calendar", "a tiny umbrella", "a button with no shirt", "a slow toaster", "a map of nowhere", "a brick", "a half-used eraser", "a doorstop", "an unplugged lamp", "a very average stick"];
const buyers = {
  easy: ["your best friend", "a busy teacher", "your grandparent", "a lost tourist", "the local café owner"],
  med: ["an astronaut packing light", "a billionaire who owns everything", "a museum curator", "the world’s most impatient person", "a medieval king"],
  spicy: ["a goldfish with a credit card", "a ghost who hates clutter", "a robot with no hands", "a time traveller leaving in ten seconds", "a penguin opening a beach resort"],
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
  const exact = items.filter((item) => item.h === heat);
  const pool = exact.length ? exact : items.filter((item) => heatRank[item.h] <= heatRank[heat]);
  return pool[hashNumber(`${seed}-${salt}-${heat}`) % pool.length];
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
  return { mode, duration, seconds, running, finished, load, reset, toggle, nudge, swapMode };
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

  useEffect(() => {
    setPhase(0);
    setHintCount(0);
    setUsedWords([]);
  }, [id, heat, seed]);

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
    if (heat === "easy") return shuffled(words.easy, seed).slice(0, 5);
    if (heat === "med") return shuffled([...words.easy, ...words.med], seed).slice(0, 5);
    return [...shuffled(words.med, `${seed}-a`).slice(0, 2), ...shuffled(words.spicy, `${seed}-b`).slice(0, 3)];
  }, [heat, id, seed]);

  const pitch = useMemo(() => {
    return id === "pitch" ? {
      object: pitchObjects[hashNumber(`${seed}-object`) % pitchObjects.length],
      buyer: buyers[heat][hashNumber(`${seed}-buyer-${heat}`) % buyers[heat].length],
    } : null;
  }, [heat, id, seed]);

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
      <p className={styles.kicker}>Your product</p><h1>{pitch.object}</h1>
      <div className={styles.pitchDivider}><span>sell it to</span></div>
      <h2>{pitch.buyer}</h2>
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
        {phase === 1 && <div className={styles.answer}><span>Answer</span>{content.answer}</div>}
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

export default function SizzlePage() {
  const [activeId, setActiveId] = useState("spark");
  const [heat, setHeat] = useState("med");
  const [seed, setSeed] = useState(1);
  const [sound, setSound] = useState(true);
  const [intro, setIntro] = useState(true);
  const [instructionsVisible, setInstructionsVisible] = useState(true);
  const [history, setHistory] = useState([]);
  const active = activities.find((activity) => activity.id === activeId);
  const timer = useTimer("countdown", 120);
  const { load, reset, toggle } = timer;

  const rememberCurrent = useCallback(() => {
    setHistory((items) => [...items.slice(-11), { activeId, heat, seed }]);
  }, [activeId, heat, seed]);

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

  useEffect(() => {
    if (timer.finished && sound) playChime();
  }, [sound, timer.finished]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (["INPUT", "TEXTAREA", "BUTTON"].includes(document.activeElement?.tagName)) return;
      if (event.code === "Space") { event.preventDefault(); toggle(); }
      if (event.key.toLowerCase() === "r") reroll();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [reroll, toggle]);

  const surprise = () => {
    const options = activities.filter((activity) => activity.id !== activeId);
    openActivity(options[Math.floor(Math.random() * options.length)]);
  };

  if (intro) return (
    <main className={styles.intro}>
      <div className={styles.ambientOne} /><div className={styles.ambientTwo} />
      <nav className={styles.introNav}><a href="/">Ron / C3</a><span>Creative warm-ups</span></nav>
      <section className={styles.introCard}>
        <div className={styles.cardLayers} aria-hidden="true"><span /><span /></div>
        <div className={styles.introContent}>
          <div className={styles.introMark}><Flame size={22} fill="currentColor" /></div>
          <p className={styles.kicker}>A small ritual for better starts</p>
          <h1>Get the room<br />thinking out loud.</h1>
          <p>Eight playful speaking challenges for the first few minutes of a live class. Pick one, share your screen and go.</p>
          <button onClick={() => setIntro(false)}>Start a warm-up <ArrowRight size={18} /></button>
        </div>
      </section>
      <div className={styles.introFoot}><span>3–8 minute activities</span><span>No prep needed</span><span>Built for screen sharing</span></div>
    </main>
  );

  return (
    <main className={`${styles.app} ${timer.finished ? styles.finished : ""}`}>
      <div className={styles.ambientOne} /><div className={styles.ambientTwo} />
      <header className={styles.header}>
        <button className={styles.wordmark} onClick={() => setIntro(true)}><span><Flame size={16} fill="currentColor" /></span>Sizzle</button>
        <div className={styles.topTimer}>
          <button className={styles.modeButton} onClick={timer.swapMode} aria-label={timer.mode === "countdown" ? "Switch to stopwatch" : "Switch to two minute countdown"} title={timer.mode === "countdown" ? "Switch to stopwatch" : "Switch to countdown"}><Clock3 size={17} /><span>{timer.mode === "countdown" ? "Timer" : "Stopwatch"}</span></button>
          {timer.mode === "countdown" && <button className={styles.topNudge} onClick={() => timer.nudge(-30)}>−30</button>}
          <button className={styles.topPlay} onClick={timer.toggle}>{timer.running ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}<strong>{formatTime(timer.seconds)}</strong></button>
          {timer.mode === "countdown" && <button className={styles.topNudge} onClick={() => timer.nudge(30)}>+30</button>}
          <button className={styles.topReset} onClick={timer.reset} aria-label="Reset timer"><TimerReset size={17} /></button>
        </div>
        <div className={styles.headerActions}>
          <button onClick={() => setSound((value) => !value)} aria-label={sound ? "Mute timer chime" : "Unmute timer chime"}>{sound ? <Volume2 size={18} /> : <VolumeX size={18} />}</button>
          <button className={styles.surprise} onClick={surprise}><Shuffle size={16} /> Surprise me</button>
        </div>
      </header>

      <nav className={styles.activityRail} aria-label="Warm-up activities">
        {activities.map((activity) => <button key={activity.id} className={activity.id === activeId ? styles.activeActivity : ""} onClick={() => openActivity(activity)}><span>{activity.icon}</span><small>{activity.no}</small><b>{activity.name}</b></button>)}
      </nav>

      <section className={styles.workspace}>
        <div className={styles.stageColumn}>
          <div className={styles.stageLayers} aria-hidden="true"><span /><span /></div>
          <article className={styles.stage} key={`${activeId}-${seed}`}>
            <div className={styles.stageTop}>
              <div className={styles.stageIdentity}><span>{active.icon}</span><div><small>{active.no} · {active.tone}</small><h2>{active.name}</h2></div></div>
              <div className={styles.cardActions}>
                {!instructionsVisible && <button onClick={() => setInstructionsVisible(true)} aria-label="Show instructions" title="Show instructions"><CircleHelp size={18} /></button>}
                <button onClick={goBack} disabled={!history.length} aria-label="Previous prompt" title="Previous prompt"><ArrowLeft size={18} /><span>Back</span></button>
                <button onClick={reroll} aria-label="New prompt" title="New prompt"><RefreshCw size={18} /><span>New</span></button>
              </div>
            </div>
            {instructionsVisible && <div className={styles.instructions}><p>{active.blurb}</p><button onClick={() => setInstructionsVisible(false)} aria-label="Hide instructions"><X size={14} /> Hide</button></div>}
            <div className={styles.cardSettings}>
              <span>Difficulty</span>
              <div>{["easy", "med", "spicy"].map((level) => <button key={level} className={heat === level ? styles.activeHeat : ""} onClick={() => { rememberCurrent(); setHeat(level); setSeed((value) => value + 1); reset(); }}>{level}</button>)}</div>
            </div>
            <div className={styles.activityBody}><ActivityBody id={activeId} heat={heat} seed={seed} /></div>
            <div className={styles.stageFooter}><span>{heat} mode</span><span>space · timer</span><span>r · new prompt</span></div>
          </article>
        </div>
      </section>
    </main>
  );
}
