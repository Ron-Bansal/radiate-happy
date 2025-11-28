// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import Link from "next/link";
// import posts from "./content";
// // ------------------------
// // Utilities
// // ------------------------
// function pad(n, size = 3) {
//   const s = String(n);
//   return s.length >= size ? s : "0".repeat(size - s.length) + s;
// }

// // Fallback color if JSON doesn't provide one
// function hashColor(input) {
//   let h = 0;
//   for (let i = 0; i < input.length; i++) h = (h << 5) - h + input.charCodeAt(i);
//   const hue = Math.abs(h) % 360;
//   return `hsl(${hue} 60% 70%)`;
// }

// // ------------------------
// // Components
// // ------------------------
// function ArcHero({ items }) {
//   const stageRef = useRef(null);
//   const [dims, setDims] = useState({ w: 0, h: 0 });

//   // Resize-aware radius & thumbnail size
//   useEffect(() => {
//     if (!stageRef.current) return;
//     const ro = new ResizeObserver(([entry]) => {
//       const { width, height } = entry.contentRect;
//       setDims({ w: width, h: height });
//     });
//     ro.observe(stageRef.current);
//     return () => ro.disconnect();
//   }, []);

//   // radius = % of the smaller side; thumb = responsive clamp
//   const radius = useMemo(() => {
//     const base = Math.min(dims.w, dims.h);
//     return Math.max(120, Math.min(base * 0.42, 520)); // responsive, capped
//   }, [dims]);

//   const thumb = useMemo(() => {
//     const base = Math.min(dims.w, dims.h);
//     return Math.max(40, Math.min(base * 0.06, 72)); // 40–72px
//   }, [dims]);

//   // Even spacing around a FULL 360° circle, then we mask the bottom half
//   const N = items.length || 1;
//   const points = useMemo(() => {
//     return Array.from({ length: N }).map((_, i) => {
//       const step = 360 / N;
//       // start at top (-90°) and go clockwise → then we spin the whole stage anti-clockwise
//       const deg = -90 + i * step;
//       const rad = (deg * Math.PI) / 180;
//       const x = Math.cos(rad) * radius;
//       const y = Math.sin(rad) * radius;
//       return { x, y, deg };
//     });
//   }, [N, radius]);

//   return (
//     <section className="relative isolate pt-10 sm:pt-14">
//       {/* Viewport for the arc; masked so only the TOP half shows */}
//       <div
//         ref={stageRef}
//         className="relative mx-auto w-full xmax-w-6xl"
//         style={{
//           height: "min(76vh, 1520px)", // responsive container height
//           WebkitMaskImage:
//             "linear-gradient(to bottom, black 0%, black 56%, rgba(0,0,0,0) 100%)",
//           maskImage:
//             "linear-gradient(to bottom, black 0%, black 56%, rgba(0,0,0,0) 100%)",
//         }}
//       >
//         {/* Progressive blur/fade at bottom edge */}
//         <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-white/40 to-white dark:via-neutral-950/40 dark:to-neutral-950 blur-md" />

//         {/* Spinning stage (anti-clockwise) */}
//         <div
//           className="relative mx-auto h-full w-full will-change-transform"
//           style={{ animation: "spin-rev 60s linear infinite" }}
//         >
//           {points.map((p, idx) => {
//             const item = items[idx];
//             const color = item?.color || hashColor((item?.title || "") + idx);
//             const bgImage = item?.thumb ? `url(${item.thumb})` : undefined;

//             return (
//               <div
//                 key={idx}
//                 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [transform-origin:0_0]"
//                 style={{
//                   transform: `translate(-50%, -50%) translate(${p.x}px, ${p.y}px) rotate(${p.deg + 90}deg)`,
//                 }}
//               >
//                 <div
//                   className="rounded-2xl ring-1 ring-black/5 shadow-sm"
//                   style={{
//                     width: thumb,
//                     height: thumb,
//                     backgroundColor: bgImage ? undefined : color,
//                     backgroundImage: bgImage,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                   }}
//                   aria-hidden
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Title & subtitle */}
//       <div className="mx-auto -mt-8 flex max-w-3xl flex-col items-center text-center">
//         <h1 className="font-serif text-3xl leading-tight sm:text-4xl">Failing Loudly</h1>
//         <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
//           25 public failures before turning 25 to abolish my perfectionism
//         </p>
//         <p className="mx-auto mt-12 max-w-xl text-balance text-neutral-700 dark:text-neutral-300">
//           what if everything you have ever wanted was on the other side of 25 failures — how quickly would you try to fail?
//         </p>
//       </div>

//       {/* global keyframes for reverse (anti-clockwise) spin */}
//       <style jsx global>{`
//         @keyframes spin-rev {
//           from { transform: rotate(0deg); }
//           to   { transform: rotate(-360deg); }
//         }
//       `}</style>
//     </section>
//   );
// }

// function Row({ item, index }) {
//   const bg = item.color || hashColor(item.title + index);
//   return (
//     <article
//       className="group relative isolate overflow-hidden border border-x-0 border-neutral-200 bg-white/70 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/60"
//     >
//       {/* Hover bloom */}
//       <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
//         background:
//           "radial-gradient(800px 120px at 10% 0%, rgba(180,180,255,0.10), transparent 60%), radial-gradient(800px 120px at 90% 100%, rgba(255,200,200,0.08), transparent 60%)",
//       }}/>

//       <div className="relative grid grid-cols-[auto_auto_1fr_auto] items-center gap-4 sm:grid-cols-[auto_auto_1fr_auto]">
//         {/* Number */}
//         <div className="hidden font-mono text-xs text-neutral-500 sm:block">{pad(index + 1, 3)}</div>

//         {/* Thumb */}
//         <div className="relative">
//           <div
//             className="size-12 rounded-xl ring-1 ring-black/5 transition-all duration-300 group-hover:scale-105 group-hover:[transform:perspective(600px)_rotateX(4deg)_rotateY(-6deg)]"
//             style={{ background: bg }}
//           />
//         </div>

//         {/* Text */}
//         <div className="min-w-0">
//           <h3 className="truncate text-[15px] font-medium tracking-tight sm:text-base">
//             {item.title}
//           </h3>
//           <p className="mt-0.5 line-clamp-1 text-xs text-neutral-500">
//             {item.date} · {item.teaser}
//           </p>
//         </div>

//         {/* CTA */}
//         <div>
//           <Link
//             href={item.href || "#"}
//             className="relative inline-flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-white"
//           >
//             Read
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// }

// export default function Page() {
//   // sort newest first by date string if provided (YYYY/MM/DD or MMM YYYY)
//   const sorted = useMemo(() => {
//     const parse = (s) => Date.parse(s) || 0;
//     return [...posts].sort((a, b) => parse(b.date) - parse(a.date));
//   }, []);

//   return (
//     <main className="mx-auto max-w-5xl px-4 pb-24 pt-6 sm:pt-10">
//       <ArcHero items={sorted} />

//       <div className="mt-16 border-t border-neutral-200 pt-6 text-center text-[11px] uppercase tracking-wider text-neutral-500 dark:border-neutral-800">
//         All releases — ordered by newest first
//       </div>

//       <div className="mt-6 grid gap-3 sm:gap-4">
//         {sorted.map((item, i) => (
//           <Row key={item.slug || i} item={item} index={i} />
//         ))}
//       </div>
//     </main>
//   );
// }
"use client"
import React, { useState, useEffect } from 'react';

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Art of Failing Forward",
    date: "2025-11-08",
    thumbnail: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?w=400&h=400&fit=crop",
    content: `# The Art of Failing Forward

*Published on November 8, 2025*

![Hero Image](https://images.unsplash.com/photo-1518710843675-2540dd79065c?w=1200&h=600&fit=crop)

Failure isn't the opposite of success—it's a stepping stone toward it. Every mistake carries a lesson, every setback hides an opportunity, and every stumble teaches us how to walk with more confidence.

## Embracing the Uncomfortable

The most transformative moments in life often come disguised as failures. When we fail loudly—without shame, without hiding—we create space for growth, authenticity, and genuine connection.

## Learning in Public

Sharing our failures openly does something remarkable: it normalizes the struggle. It reminds others that perfection is an illusion and that progress is messy, nonlinear, and beautifully human.

---

*The journey matters more than the destination.*`
  },
  {
    id: 2,
    title: "Building in Public",
    date: "2025-11-12",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop",
    content: "# Building in Public\n\nThere's something liberating about creating your work in full view of the world..."
  },
  {
    id: 3,
    title: "The Courage to Begin Again",
    date: "2025-11-15",
    thumbnail: "https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?w=400&h=400&fit=crop",
    content: "# The Courage to Begin Again\n\nEvery ending is secretly a beginning..."
  },
  {
    id: 4,
    title: "Lessons from the Edge",
    date: "2025-11-19",
    thumbnail: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=400&h=400&fit=crop",
    content: "# Lessons from the Edge\n\nThe edge is where transformation happens..."
  },
  {
    id: 5,
    title: "Writing Without a Map",
    date: "2025-11-22",
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=400&fit=crop",
    content: "# Writing Without a Map\n\nSome of the best writing happens when we abandon the outline..."
  },
  {
    id: 6,
    title: "The Rhythm of Creative Work",
    date: "2025-11-26",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    content: "# The Rhythm of Creative Work\n\nCreative work has its own tempo..."
  },
  {
    id: 7,
    title: "Imperfect Action",
    date: "2025-11-29",
    thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=400&fit=crop",
    content: "# Imperfect Action\n\nWaiting for perfect conditions is another form of hiding..."
  },
  {
    id: 8,
    title: "The Space Between",
    date: "2025-12-03",
    thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop",
    content: "# The Space Between\n\nThe most interesting things happen in the spaces between..."
  },
  {
    id: 9,
    title: "Learning Out Loud",
    date: "2025-12-07",
    thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=400&fit=crop",
    content: "# Learning Out Loud\n\nThe best way to learn something deeply is to teach it publicly..."
  },
  {
    id: 10,
    title: "The Power of Constraints",
    date: "2025-12-11",
    thumbnail: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=400&fit=crop",
    content: "# The Power of Constraints\n\nConstraints aren't limitations—they're creative catalysts..."
  }
];

const socialLinks = [
  { name: 'TikTok', icon: '📱', followers: '12.5K', growth: '+15%' },
  { name: 'YouTube', icon: '▶️', followers: '8.2K', growth: '+22%' },
  { name: 'Instagram', icon: '📷', followers: '15.8K', growth: '+8%' },
  { name: 'X', icon: '𝕏', followers: '6.3K', growth: '+12%' },
  { name: 'LinkedIn', icon: '💼', followers: '4.1K', growth: '+18%' },
  { name: 'Substack', icon: '✉️', followers: '2.9K', growth: '+25%' },
  { name: 'Email', icon: '📧', followers: 'contact@', growth: '' }
];

function generateCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  
  const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  
  const days = [];
  
  for (let i = 0; i < offset; i++) {
    days.push(null);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }
  
  return days;
}

function CalendarMonth({ year, month, monthName, onPostClick }) {
  const days = generateCalendarDays(year, month);
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  const getPostForDate = (day) => {
    if (!day) return null;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return blogPosts.find(post => post.date === dateStr);
  };
  
  return (
    <div className="mb-12">
      <h2 className="text-4xl font-bold mb-6" style={{ color: '#3d1a17' }}>
        {monthName} {year}
      </h2>
      
      <div className="grid grid-cols-7" style={{ gap: 0 }}>
        {weekDays.map((day, i) => (
          <div 
            key={`header-${i}`} 
            className="text-center py-3 text-lg font-medium"
            style={{ color: '#3d1a17' }}
          >
            {day}
          </div>
        ))}
        
        {days.map((day, i) => {
          const post = getPostForDate(day);
          return (
            <div
              key={i}
              className={`relative aspect-square ${post ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
              style={{ 
                backgroundColor: post ? '#e8d5e8' : 'transparent',
                borderRight: '0.5px solid #4A0A07',
                borderBottom: '0.5px solid #4A0A07',
                borderLeft: i % 7 === 0 ? '0.5px solid #4A0A07' : 'none',
                borderTop: i < 7 ? '0.5px solid #4A0A07' : 'none'
              }}
              title={post ? post.title : ''}
              onClick={() => post && onPostClick(post)}
            >
              {day && (
                <>
                  {post && (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div 
                    className="absolute top-2 right-2 text-sm z-10"
                    style={{ 
                      color: post ? '#ffffff' : '#3d1a17',
                      fontFamily: "'Kode Mono', monospace",
                      textShadow: post ? '0 1px 3px rgba(0,0,0,0.5)' : 'none'
                    }}
                  >
                    {String(day).padStart(2, '0')}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ArticleView({ post, onClose, onNext, onPrev, isClosing }) {
  const currentIndex = blogPosts.findIndex(p => p.id === post.id);
  const hasNext = currentIndex < blogPosts.length - 1;
  const hasPrev = currentIndex > 0;

  return (
    <div 
      className={`fixed inset-0 md:relative md:inset-auto flex flex-col h-screen overflow-hidden z-50 ${
        isClosing ? 'animate-slide-out' : 'animate-slide-in'
      }`}
    >
      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slide-out {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .animate-slide-out {
          animation: slide-out 0.3s ease-in;
        }
      `}</style>
      
      <div className="border-b px-8 py-6 flex items-center justify-between" style={{ borderColor: '#4A0A07', backgroundColor: '#f5ede7' }}>
        <button
          onClick={onClose}
          className="text-sm hover:opacity-70 transition-opacity flex items-center gap-2"
          style={{ color: '#3d1a17' }}
        >
          <span>←</span>
          <span>Calendar View</span>
        </button>
        
        <div className="flex items-center gap-6">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className={`text-sm transition-opacity ${hasPrev ? 'hover:opacity-70' : 'opacity-30 cursor-not-allowed'}`}
            style={{ color: '#3d1a17' }}
          >
            ← Previous
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`text-sm transition-opacity ${hasNext ? 'hover:opacity-70' : 'opacity-30 cursor-not-allowed'}`}
            style={{ color: '#3d1a17' }}
          >
            Next →
          </button>
        </div>
      </div>
      
      <div 
        className="flex-1 overflow-y-auto p-8 md:p-12"
        style={{ backgroundColor: '#f5ede7' }}
      >
        <article className="max-w-3xl mx-auto prose prose-lg">
          <div className="whitespace-pre-wrap" style={{ color: '#3d1a17' }}>
            {post.content}
          </div>
        </article>
      </div>
    </div>
  );
}

export default function FailingLoudlyBlog() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const today = new Date();
  const targetDate = new Date(2025, 11, 25);
  const daysLeft = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));

  const handlePostClick = (post) => {
    if (selectedPost) {
      setIsClosing(true);
      setTimeout(() => {
        setSelectedPost(post);
        setIsClosing(false);
        window.history.pushState({}, '', `/post/${post.id}`);
      }, 300);
    } else {
      setSelectedPost(post);
      window.history.pushState({}, '', `/post/${post.id}`);
    }
  };

  const handleClosePost = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedPost(null);
      setIsClosing(false);
      window.history.pushState({}, '', '/');
    }, 300);
  };

  const handleNext = () => {
    const currentIndex = blogPosts.findIndex(p => p.id === selectedPost.id);
    if (currentIndex < blogPosts.length - 1) {
      handlePostClick(blogPosts[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    const currentIndex = blogPosts.findIndex(p => p.id === selectedPost.id);
    if (currentIndex > 0) {
      handlePostClick(blogPosts[currentIndex - 1]);
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      
      <div className="min-h-screen" style={{ backgroundColor: '#f5ede7' }}>
        <div className="md:flex">
          <aside 
            className={`
              ${mobileMenuOpen ? 'block' : 'hidden'} md:block
              md:w-[350px]
              md:h-screen md:overflow-y-auto md:sticky md:top-0
              p-8
            `}
            style={{ backgroundColor: '#f5ede7' }}
          >
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-2" style={{ color: '#3d1a17' }}>
                Failing Loudly
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: '#3d1a17' }}>
                25 public failures before turning 25 to abolish my perfectionism
              </p>
            </div>

            {/* Social Links */}
            <div className="mb-6 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <div key={social.name} className="group relative">
                  <button
                    className="text-lg hover:opacity-70 transition-opacity"
                    title={social.name}
                  >
                    {social.icon}
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-stone-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    <div className="font-medium">{social.name}</div>
                    {social.growth && (
                      <div className="text-stone-300">{social.followers} {social.growth}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6 pb-4 border-b-2 border-stone-800 text-right">
              <div className="text-2xl font-bold" style={{ color: '#3d1a17' }}>
                {daysLeft} days left
              </div>
            </div>

            <nav>
              <ul className="space-y-1">
                {blogPosts.map((post) => {
                  const isActive = selectedPost?.id === post.id;
                  return (
                    <li key={post.id}>
                      <button
                        onClick={() => handlePostClick(post)}
                        className={`text-left w-full px-3 py-3 -mx-3 rounded transition-all duration-200 hover:bg-stone-200/50 hover:pl-4 flex items-start gap-3 ${
                          isActive ? 'bg-stone-200/50 pl-4' : ''
                        }`}
                      >
                        {isActive && (
                          <div className="w-2 h-2 mt-1.5 rounded-sm flex-shrink-0" style={{ backgroundColor: '#4A0A07' }}></div>
                        )}
                        <div className={isActive ? '' : 'ml-5'}>
                          <h3 className="text-sm leading-snug mb-0.5" style={{ color: '#3d1a17' }}>
                            {post.title}
                          </h3>
                          <p className="text-xs" style={{ color: '#6b4c49' }}>
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <main className="flex-1 relative">
            {!selectedPost ? (
              <div className="p-8 md:p-12">
                <CalendarMonth year={2025} month={10} monthName="Nov" onPostClick={handlePostClick} />
                <CalendarMonth year={2025} month={11} monthName="Dec" onPostClick={handlePostClick} />
              </div>
            ) : (
              <ArticleView 
                post={selectedPost} 
                onClose={handleClosePost}
                onNext={handleNext}
                onPrev={handlePrev}
                isClosing={isClosing}
              />
            )}
          </main>
        </div>
      </div>
    </>
  );
}