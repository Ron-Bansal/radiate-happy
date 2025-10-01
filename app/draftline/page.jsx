"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Check,
  Settings,
  X,
  Volume2,
  Download,
  Upload,
  RotateCcw,
  Maximize2,
} from "lucide-react";

const STAGES = ["Notes", "Draft", "Edit", "Polish", "Final"];
const STAGE_COLORS = {
  Notes: "bg-amber-400",
  Draft: "bg-blue-400",
  Edit: "bg-purple-400",
  Polish: "bg-emerald-400",
  Final: "bg-rose-400",
};

const THEMES = {
  light: {
    bg: "bg-gradient-to-br from-slate-50 to-slate-100",
    card: "bg-white border-slate-200",
    text: "text-slate-800",
    textMuted: "text-slate-500",
    border: "border-slate-200",
    header: "bg-white/80",
    cardHeader: "bg-slate-50",
  },
  dark: {
    bg: "bg-gradient-to-br from-slate-900 to-slate-800",
    card: "bg-slate-800 border-slate-700",
    text: "text-slate-100",
    textMuted: "text-slate-400",
    border: "border-slate-700",
    header: "bg-slate-900/80",
    cardHeader: "bg-slate-900",
  },
  warm: {
    bg: "bg-gradient-to-br from-amber-50 to-orange-50",
    card: "bg-white border-amber-200",
    text: "text-amber-950",
    textMuted: "text-amber-700",
    border: "border-amber-200",
    header: "bg-white/80",
    cardHeader: "bg-amber-50",
  },
};

const STORAGE_KEY = "qwinkling_data";
const SETTINGS_KEY = "qwinkling_settings";

const defaultData = {
  sections: [
    {
      id: "1",
      title: "Getting Started",
      subtitle: "Explore how Qwinkling helps you iterate",
      height: 500,
      cards: [
        {
          id: "1-1",
          content:
            "<h1>Quick braindump</h1><p>Core message: productivity tool for writers</p><ul><li>Target: content creators, students</li><li>Key feature: visual iteration</li><li><strong>Make writing tangible</strong></li></ul>",
          stage: "Notes",
          title: "Initial Thoughts",
          width: 320,
        },
        {
          id: "1-2",
          content:
            "<h2>Qwinkling Overview</h2><p>Qwinkling is a visual writing studio that helps you <mark>sculpt text</mark> through visible iterations. Perfect for:</p><ul><li>Social posts</li><li>Essays</li><li>Scripts</li></ul><p>Instead of overwriting drafts, you <em>evolve ideas side by side</em> with real-time diffs and flexible stages.</p>",
          stage: "Draft",
          title: "First Draft",
          width: 320,
        },
        {
          id: "1-3",
          content:
            "<h1>Qwinkling</h1><p><strong>A visual writing studio</strong> that transforms how you craft text.</p><p>Evolve your ideas side-by-side through <u>visible iterations</u>—perfect for social posts, essays, and scripts.</p><p><em>No more overwriting drafts.</em> Compare versions instantly with real-time diffs and track your creative journey from rough notes to <mark>polished prose</mark>.</p>",
          stage: "Polish",
          title: "Polished Copy",
          width: 320,
        },
      ],
    },
  ],
};

const stripHtml = (html) => {
  if (!html) return "";
  const str = typeof html === "string" ? html : String(html);

  // If we're in the browser, use DOM (more accurate)
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const tmp = document.createElement("div");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
  }

  // SSR fallback: lightweight tag/entity strip
  return str
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'");
};

const diffWords = (oldText, newText) => {
  const oldWords = stripHtml(oldText).trim().split(/(\s+)/);
  const newWords = stripHtml(newText).trim().split(/(\s+)/);
  const result = [];

  let i = 0,
    j = 0;
  while (i < oldWords.length || j < newWords.length) {
    if (i >= oldWords.length) {
      result.push({ type: "add", text: newWords[j] });
      j++;
    } else if (j >= newWords.length) {
      result.push({ type: "remove", text: oldWords[i] });
      i++;
    } else if (oldWords[i] === newWords[j]) {
      result.push({ type: "same", text: oldWords[i] });
      i++;
      j++;
    } else {
      result.push({ type: "remove", text: oldWords[i] });
      result.push({ type: "add", text: newWords[j] });
      i++;
      j++;
    }
  }

  return result;
};

const RichTextEditor = ({ content, onChange, onFocus, placeholder }) => {
  const editorRef = useRef(null);
  const isComposing = useRef(false);
  const lastExternal = useRef(""); // remember last prop we applied

  // Apply initial HTML, and re-apply ONLY when prop changes externally
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    // Only update the DOM if prop differs from current DOM (external change)
    if (content !== lastExternal.current && content !== el.innerHTML) {
      el.innerHTML = content || "";
      lastExternal.current = content || "";
    }
  }, [content]);

  const handleInput = () => {
    if (!editorRef.current || isComposing.current) return;
    const html = editorRef.current.innerHTML;
    onChange?.(html);
    // Do NOT re-apply html here; let the DOM be the source while typing
  };

  const handleCompositionStart = () => {
    isComposing.current = true;
  };
  const handleCompositionEnd = () => {
    isComposing.current = false;
    // fire an input sync after IME composition ends
    handleInput();
  };

  const handleKeyDown = (e) => {
    if (e.metaKey || e.ctrlKey) {
      if (e.key === "b") {
        e.preventDefault();
        document.execCommand("bold");
      } else if (e.key === "i") {
        e.preventDefault();
        document.execCommand("italic");
      } else if (e.key === "u") {
        e.preventDefault();
        document.execCommand("underline");
      } else if (e.key === "h") {
        e.preventDefault();
        document.execCommand("hiliteColor", false, "#FEF18B");
      } else if (e.key === "s") {
        e.preventDefault();
        document.execCommand("strikeThrough");
      }
    }
  };

  // Optional: keep focus from being stolen by parent rerenders
  // (React won't touch innerHTML now, but this helps in complex trees)
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    el.setAttribute("role", "textbox");
    el.setAttribute("aria-multiline", "true");
    el.setAttribute("spellcheck", "true");
  }, []);

  return (
    <div
      ref={editorRef}
      contentEditable
      onInput={handleInput}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      className="flex-1 p-4 overflow-y-auto border-none outline-none text-sm leading-relaxed min-h-0"
      style={{ caretColor: "currentColor" }}
      suppressContentEditableWarning
      data-placeholder={placeholder}
    />
  );
};

const CardBase = ({
  card,
  cardNumber,
  sectionId,
  sectionHeight,
  allCards,
  onUpdate,
  onDelete,
  onDuplicate,
  isCollapsed,
  onToggleCollapse,
  onDragStart,
  isActive,
  onFocus,
  copyMarkdown,
  theme,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(card.width || 320);
  const [compareWithId, setCompareWithId] = useState(null);
  const [showCopied, setShowCopied] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const cardRef = useRef(null);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    startX.current = e.clientX;
    startWidth.current = width;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const delta = e.clientX - startX.current;
      const newWidth = Math.max(240, Math.min(600, startWidth.current + delta));
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
        onUpdate(card.id, { width });
      }
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, width]);

  const wordCount = stripHtml(card.content)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const speakingTime = Math.ceil(wordCount / 150);

  const compareCard =
    compareWithId && showDiff
      ? allCards.find((c) => c.id === compareWithId)
      : null;
  const diff = compareCard
    ? diffWords(compareCard.content, card.content)
    : null;

  const getDelta = () => {
    if (!compareCard) return null;
    const oldWords = stripHtml(compareCard.content)
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    const newWords = wordCount;
    return newWords - oldWords;
  };

  const delta = getDelta();

  const handleCopy = () => {
    const textToCopy = copyMarkdown ? card.content : stripHtml(card.content);
    navigator.clipboard.writeText(textToCopy);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleHeaderClick = (e) => {
    if (
      e.target.tagName === "INPUT" ||
      e.target.tagName === "SELECT" ||
      e.target.tagName === "BUTTON"
    ) {
      return;
    }
    const now = Date.now();
    if (now - lastTap < 300) {
      onToggleCollapse();
    }
    setLastTap(now);
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(stripHtml(card.content));
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const themeClasses = THEMES[theme];

  return (
    <div
      ref={cardRef}
      className={`flex-shrink-0 transition-all duration-200 ${
        isCollapsed ? "w-16" : ""
      }`}
      style={{ width: isCollapsed ? "64px" : `${width}px`, height: "100%" }}
      draggable={isCollapsed}
      onDragStart={
        isCollapsed ? (e) => onDragStart(e, card, sectionId) : undefined
      }
    >
      <div
        className={`h-full ${
          themeClasses.card
        } rounded-lg border-2 shadow-sm hover:shadow-md transition-all ${
          isCollapsed ? "cursor-pointer" : ""
        } ${
          isActive ? "border-blue-400 shadow-blue-100" : ""
        } relative flex flex-col`}
      >
        {isCollapsed ? (
          <div
            onClick={onToggleCollapse}
            className="h-full flex flex-col items-center justify-between py-4 px-2"
          >
            <div className="text-center mb-2">
              <div className={`text-xs font-bold ${themeClasses.text} mb-1`}>
                #{cardNumber}
              </div>
              <div
                className={`w-2 h-2 rounded-full ${
                  STAGE_COLORS[card.stage]
                } mx-auto mb-1`}
              />
              <div
                className={`text-[9px] ${themeClasses.textMuted} font-medium`}
              >
                {wordCount}w
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center my-2">
              <div
                className={`text-xs ${themeClasses.text} font-medium whitespace-nowrap`}
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {card.title || `Card ${cardNumber}`}
              </div>
            </div>
            <ChevronRight
              className={`w-3.5 h-3.5 ${themeClasses.textMuted} mt-2`}
            />
          </div>
        ) : (
          <>
            <div
              className={`flex items-center justify-between p-3 border-b ${themeClasses.border} ${themeClasses.cardHeader} cursor-grab active:cursor-grabbing flex-shrink-0`}
              draggable
              onDragStart={(e) => onDragStart(e, card, sectionId)}
              onClick={handleHeaderClick}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCollapse();
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className={`p-0.5 hover:${themeClasses.cardHeader} rounded transition-colors`}
                    title="Collapse"
                  >
                    <ChevronLeft
                      className={`w-3.5 h-3.5 ${themeClasses.textMuted}`}
                    />
                  </button>
                  <GripVertical
                    className={`w-3.5 h-3.5 ${themeClasses.textMuted}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className={`text-xs font-bold ${themeClasses.textMuted}`}
                    >
                      #{cardNumber}
                    </span>
                    <input
                      type="text"
                      value={card.title || ""}
                      onChange={(e) =>
                        onUpdate(card.id, { title: e.target.value })
                      }
                      placeholder={`Card ${cardNumber}`}
                      className={`text-sm font-semibold ${themeClasses.text} bg-transparent border-none outline-none flex-1 min-w-0`}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        STAGE_COLORS[card.stage]
                      } flex-shrink-0`}
                    />
                    <select
                      value={card.stage}
                      onChange={(e) =>
                        onUpdate(card.id, { stage: e.target.value })
                      }
                      className={`text-xs font-medium ${themeClasses.textMuted} bg-transparent border-none outline-none cursor-pointer hover:${themeClasses.text}`}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      {STAGES.map((stage) => (
                        <option key={stage} value={stage}>
                          {stage}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy();
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className={`p-1 hover:${themeClasses.cardHeader} rounded transition-colors`}
                  title="Copy text"
                >
                  {showCopied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className={`w-4 h-4 ${themeClasses.textMuted}`} />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate(card.id);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className={`p-1 hover:${themeClasses.cardHeader} rounded transition-colors`}
                  title="Duplicate"
                >
                  <Plus className={`w-4 h-4 ${themeClasses.textMuted}`} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(card.id);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="p-1 hover:bg-red-50 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2
                    className={`w-4 h-4 ${themeClasses.textMuted} hover:text-red-500`}
                  />
                </button>
              </div>
            </div>

            <div
              className={`flex-1 flex flex-col overflow-hidden min-h-0 ${themeClasses.text}`}
            >
              {diff ? (
                <div className="flex-1 p-4 overflow-y-auto text-sm leading-relaxed">
                  {diff.map((part, i) => {
                    if (part.type === "same") {
                      return <span key={i}>{part.text}</span>;
                    } else if (part.type === "add") {
                      return (
                        <span
                          key={i}
                          className="bg-emerald-100 text-emerald-900 rounded px-0.5"
                        >
                          {part.text}
                        </span>
                      );
                    } else {
                      return (
                        <span
                          key={i}
                          className="bg-red-100 text-red-900 line-through rounded px-0.5"
                        >
                          {part.text}
                        </span>
                      );
                    }
                  })}
                </div>
              ) : (
                <RichTextEditor
                  content={card.content}
                  onChange={(html) => onUpdate(card.id, { content: html })}
                  onFocus={() => onFocus(card.id)}
                  placeholder="Start writing..."
                />
              )}

              <div
                className={`flex items-center justify-between px-4 py-2 border-t ${themeClasses.border} ${themeClasses.cardHeader} text-xs flex-shrink-0`}
              >
                <div className="flex items-center gap-2">
                  <select
                    value={compareWithId || ""}
                    onChange={(e) => setCompareWithId(e.target.value || null)}
                    className={`text-xs ${themeClasses.textMuted} ${themeClasses.card} border ${themeClasses.border} rounded px-2 py-1 outline-none cursor-pointer`}
                  >
                    <option value="">Compare vs...</option>
                    {allCards.map((c, idx) => {
                      if (c.id === card.id) return null;
                      return (
                        <option key={c.id} value={c.id}>
                          Card {idx + 1}
                        </option>
                      );
                    })}
                  </select>
                  {compareWithId && (
                    <button
                      onClick={() => setShowDiff(!showDiff)}
                      className={`p-1 rounded transition-colors ${
                        showDiff
                          ? "bg-blue-100 text-blue-600"
                          : `${themeClasses.cardHeader} ${themeClasses.textMuted}`
                      }`}
                      title={showDiff ? "Hide diff" : "Show diff"}
                    >
                      {showDiff ? (
                        <Eye className="w-3.5 h-3.5" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                  {delta !== null && delta !== 0 && showDiff && (
                    <span
                      className={`font-medium ${
                        delta > 0 ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {delta > 0 ? "+" : ""}
                      {delta}w
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className={themeClasses.textMuted}>
                    {wordCount} words
                  </span>
                  <div className="flex items-center gap-1">
                    <span className={themeClasses.textMuted}>
                      {speakingTime} min
                    </span>
                    <button
                      onClick={handleSpeak}
                      className={`p-0.5 rounded transition-colors ${
                        isSpeaking
                          ? "bg-blue-100 text-blue-600"
                          : `${themeClasses.textMuted} hover:${themeClasses.cardHeader}`
                      }`}
                      title="Text to speech"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              onMouseDown={handleMouseDown}
              className="absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-blue-400 transition-colors z-10"
            />
          </>
        )}
      </div>
    </div>
  );
};

const Card = React.memo(CardBase, (prev, next) => {
  // Re-render only when things that affect visuals/logic change
  return (
    prev.card.id === next.card.id &&
    prev.card.content === next.card.content &&
    prev.card.title === next.card.title &&
    prev.card.stage === next.card.stage &&
    prev.card.width === next.card.width && // width affects layout
    prev.isCollapsed === next.isCollapsed &&
    prev.isActive === next.isActive && // border highlight, etc.
    prev.theme === next.theme &&
    prev.copyMarkdown === next.copyMarkdown &&
    prev.sectionHeight === next.sectionHeight &&
    prev.allCards === next.allCards // if parent recreates this array, this will flip to false (that’s OK)
  );
});

// export { Card };

const Section = ({
  section,
  allSections,
  onUpdateSection,
  onUpdateCard,
  onDeleteCard,
  onDuplicateCard,
  onAddCard,
  onDeleteSection,
  collapsedCards,
  onToggleCollapse,
  onCardDrop,
  onCardReorder,
  activeCardId,
  onCardFocus,
  copyMarkdown,
  theme,
  autoFitHeight,
  centerCards,
  defaultCardWidth,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [height, setHeight] = useState(section.height || 500);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const scrollRef = useRef(null);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const themeClasses = THEMES[theme];

  useEffect(() => {
    if (autoFitHeight) {
      // Calculate tallest card content
      const contentHeights = section.cards.map(() => 500); // Default for now
      const maxHeight = Math.max(...contentHeights, 400);
      setHeight(maxHeight);
    }
  }, [autoFitHeight, section.cards]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    startY.current = e.clientY;
    startHeight.current = height;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const delta = e.clientY - startY.current;
      const newHeight = Math.max(
        300,
        Math.min(900, startHeight.current + delta)
      );
      setHeight(newHeight);
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
        onUpdateSection(section.id, { height });
      }
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, height]);

  const handleAddCard = (duplicate = false, sourceId = null) => {
    const newCard = {
      id: Date.now().toString(),
      content:
        duplicate && sourceId
          ? section.cards.find((c) => c.id === sourceId)?.content || ""
          : "",
      stage:
        duplicate && sourceId
          ? section.cards.find((c) => c.id === sourceId)?.stage || "Notes"
          : "Notes",
      title: "",
      width: defaultCardWidth || 320,
    };

    if (duplicate && sourceId) {
      const sourceIndex = section.cards.findIndex((c) => c.id === sourceId);
      const insertIndex =
        sourceIndex === -1 ? section.cards.length : sourceIndex + 1;
      onAddCard(section.id, newCard, insertIndex);
    } else {
      // normal "Add card" button still appends to end
      onAddCard(section.id, newCard, section.cards.length);
    }
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    setDragOverIndex(null);
    const data = JSON.parse(e.dataTransfer.getData("card"));

    if (data.sourceSectionId === section.id) {
      onCardReorder(section.id, data.card.id, targetIndex);
    } else {
      onCardDrop(data.card, data.sourceSectionId, section.id, targetIndex);
    }
  };

  const allCards = allSections.flatMap((s) => s.cards);

  const getGlobalCardNumber = (cardId) => {
    let count = 0;
    for (const s of allSections) {
      for (const c of s.cards) {
        count++;
        if (c.id === cardId) return count;
      }
    }
    return count;
  };

  return (
    <div className="mb-6 relative">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <input
              type="text"
              value={section.title}
              onChange={(e) =>
                onUpdateSection(section.id, { title: e.target.value })
              }
              className={`text-lg font-semibold ${themeClasses.text} bg-transparent border-none outline-none`}
              placeholder="Section title"
            />
            {section.cards.length > 1 && (
              <span
                className={`text-xs font-bold ${themeClasses.textMuted} align-super`}
              >
                {section.cards.length}
              </span>
            )}
          </div>
          <input
            type="text"
            value={section.subtitle}
            onChange={(e) =>
              onUpdateSection(section.id, { subtitle: e.target.value })
            }
            className={`text-sm ${themeClasses.textMuted} bg-transparent border-none outline-none w-full`}
            placeholder="Add description..."
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onDeleteSection(section.id)}
            className={`p-2 hover:bg-red-50 ${themeClasses.textMuted} hover:text-red-500 rounded-lg transition-colors`}
            title="Delete section"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 hover:${themeClasses.cardHeader} rounded-lg transition-colors ml-2`}
          >
            {isCollapsed ? (
              <ChevronDown className={`w-5 h-5 ${themeClasses.textMuted}`} />
            ) : (
              <ChevronUp className={`w-5 h-5 ${themeClasses.textMuted}`} />
            )}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="relative">
          <div
            ref={scrollRef}
            className={`flex gap-4 overflow-x-auto pb-4 scroll-smooth ${
              centerCards ? "justify-center" : ""
            }`}
            style={{ height: `${height}px`, scrollbarWidth: "thin" }}
          >
            {section.cards.map((card) => (
              <React.Fragment key={card.id}>
                <div
                  className={`flex-shrink-0 rounded transition-all ${
                    dragOverIndex === getGlobalCardNumber(card.id) - 1
                      ? "bg-blue-400 w-3"
                      : "bg-transparent w-3"
                  }`}
                  onDragOver={(e) =>
                    handleDragOver(e, getGlobalCardNumber(card.id) - 1)
                  }
                  onDragLeave={handleDragLeave}
                  onDrop={(e) =>
                    handleDrop(e, getGlobalCardNumber(card.id) - 1)
                  }
                  style={{ height: "100%" }}
                />
                <Card
                  card={card}
                  cardNumber={getGlobalCardNumber(card.id)}
                  sectionId={section.id}
                  sectionHeight={height}
                  allCards={allCards}
                  onUpdate={(cardId, updates) =>
                    onUpdateCard(section.id, cardId, updates)
                  }
                  onDelete={(cardId) => onDeleteCard(section.id, cardId)}
                  onDuplicate={(cardId) => handleAddCard(true, cardId)}
                  isCollapsed={collapsedCards.has(card.id)}
                  onToggleCollapse={() => onToggleCollapse(card.id)}
                  onDragStart={(e, card, sectionId) => {
                    e.dataTransfer.setData(
                      "card",
                      JSON.stringify({ card, sourceSectionId: sectionId })
                    );
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  isActive={activeCardId === card.id}
                  onFocus={onCardFocus}
                  copyMarkdown={copyMarkdown}
                  theme={theme}
                />
              </React.Fragment>
            ))}

            <div
              className={`flex-shrink-0 rounded transition-all ${
                dragOverIndex === section.cards.length
                  ? "bg-blue-400 w-3"
                  : "bg-transparent w-3"
              }`}
              onDragOver={(e) => handleDragOver(e, section.cards.length)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, section.cards.length)}
              style={{ height: "100%" }}
            />

            <button
              onClick={() => handleAddCard(false)}
              className={`flex-shrink-0 w-64 border-2 border-dashed ${themeClasses.border} rounded-lg hover:${themeClasses.cardHeader} transition-all flex items-center justify-center group`}
              style={{ height: "100%" }}
            >
              <div className="text-center">
                <Plus
                  className={`w-6 h-6 ${themeClasses.textMuted} mx-auto mb-2`}
                />
                <span className={`text-sm ${themeClasses.textMuted}`}>
                  Add card
                </span>
              </div>
            </button>
          </div>

          <div
            onMouseDown={handleMouseDown}
            className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-blue-400/20 transition-colors flex items-center justify-center group"
          >
            <div className="w-12 h-1 bg-slate-300 rounded-full group-hover:bg-blue-400 transition-colors" />
          </div>
        </div>
      )}
    </div>
  );
};

export default function Qwinkling() {
  const [sections, setSections] = useState(defaultData.sections);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.sections) setSections(parsed.sections);
      }
    } catch (e) {
      console.error("Failed to read sections from localStorage", e);
    }
  }, []);

  const [collapsedCards, setCollapsedCards] = useState(new Set());
  const [activeCardId, setActiveCardId] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const loadSettings = () => ({
    autoSave: true,
    showWordCount: true,
    compactMode: false,
    copyMarkdown: false,
    theme: "light",
    autoFitHeight: false,
    centerCards: false,
    defaultCardWidth: 320,
    zenMode: false,
  });

  const [settings, setSettings] = useState(loadSettings());

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(SETTINGS_KEY);
      if (saved) setSettings(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to read settings from localStorage", e);
    }
  }, []);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(SETTINGS_KEY);
      if (saved) setSettings(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to read settings from localStorage", e);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (settings.autoSave) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ sections }));
    }
  }, [sections, settings.autoSave]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showDeleteSectionConfirm, setShowDeleteSectionConfirm] =
    useState(null);

  useEffect(() => {
    if (settings.autoSave) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ sections }));
    }
  }, [sections, settings.autoSave]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleExport = () => {
    const data = { sections, settings };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qwinkling-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result);
        if (data.sections) setSections(data.sections);
        if (data.settings) setSettings(data.settings);
      } catch (error) {
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("Reset to default? This will clear all your data.")) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SETTINGS_KEY);
      setSections(defaultData.sections);
      setSettings(loadSettings());
    }
  };

  const handleUpdateSection = (sectionId, updates) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, ...updates } : s))
    );
  };

  const handleUpdateCard = (sectionId, cardId, updates) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id === sectionId) {
          return {
            ...s,
            cards: s.cards.map((c) =>
              c.id === cardId ? { ...c, ...updates } : c
            ),
          };
        }
        return s;
      })
    );
  };

  const handleDeleteCard = (sectionId, cardId) => {
    setShowDeleteConfirm({ sectionId, cardId });
  };

  const handleDeleteSection = (sectionId) => {
    setShowDeleteSectionConfirm(sectionId);
  };

  const confirmDelete = () => {
    const { sectionId, cardId } = showDeleteConfirm;
    setSections((prev) =>
      prev.map((s) => {
        if (s.id === sectionId) {
          return { ...s, cards: s.cards.filter((c) => c.id !== cardId) };
        }
        return s;
      })
    );
    setCollapsedCards((prev) => {
      const next = new Set(prev);
      next.delete(cardId);
      return next;
    });
    setShowDeleteConfirm(null);
  };

  const confirmDeleteSection = () => {
    setSections((prev) =>
      prev.filter((s) => s.id !== showDeleteSectionConfirm)
    );
    setShowDeleteSectionConfirm(null);
  };

  // const handleAddCard = (sectionId, newCard) => {
  //   setSections((prev) =>
  //     prev.map((s) => {
  //       if (s.id === sectionId) {
  //         return { ...s, cards: [...s.cards, newCard] };
  //       }
  //       return s;
  //     })
  //   );
  // };

  const handleAddCard = (sectionId, newCard, insertIndex) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== sectionId) return s;
        const cards = [...s.cards];
        const idx =
          typeof insertIndex === "number"
            ? Math.max(0, Math.min(insertIndex, cards.length))
            : cards.length; // default to append
        cards.splice(idx, 0, newCard);
        return { ...s, cards };
      })
    );
    // optional: focus the new card immediately
    setActiveCardId(newCard.id);
  };

  const handleCardDrop = (
    card,
    sourceSectionId,
    targetSectionId,
    targetIndex
  ) => {
    if (sourceSectionId === targetSectionId) return;

    setSections((prev) => {
      const updated = prev.map((s) => {
        if (s.id === sourceSectionId) {
          return { ...s, cards: s.cards.filter((c) => c.id !== card.id) };
        }
        if (s.id === targetSectionId) {
          const newCards = [...s.cards];
          newCards.splice(targetIndex, 0, card);
          return { ...s, cards: newCards };
        }
        return s;
      });
      return updated;
    });
  };

  const handleCardReorder = (sectionId, cardId, targetIndex) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id === sectionId) {
          const currentIndex = s.cards.findIndex((c) => c.id === cardId);
          if (currentIndex === -1) return s;

          const newCards = [...s.cards];
          const [card] = newCards.splice(currentIndex, 1);
          const insertIndex =
            targetIndex > currentIndex ? targetIndex - 1 : targetIndex;
          newCards.splice(insertIndex, 0, card);

          return { ...s, cards: newCards };
        }
        return s;
      })
    );
  };

  const handleAddSection = () => {
    const newSection = {
      id: Date.now().toString(),
      title: "New Section",
      subtitle: "",
      height: 500,
      cards: [
        {
          id: `${Date.now()}-1`,
          content: "",
          stage: "Notes",
          title: "",
          width: settings.defaultCardWidth,
        },
      ],
    };
    setSections((prev) => [...prev, newSection]);
  };

  const toggleCollapse = (cardId) => {
    setCollapsedCards((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) {
        next.delete(cardId);
      } else {
        next.add(cardId);
      }
      return next;
    });
  };

  const collapseAll = () => {
    const allCardIds = sections.flatMap((s) => s.cards.map((c) => c.id));
    setCollapsedCards(new Set(allCardIds));
  };

  const expandAll = () => {
    setCollapsedCards(new Set());
  };

  const themeClasses = THEMES[settings.theme];

  return (
    <div className={`min-h-screen ${themeClasses.bg}`}>
      {!settings.zenMode && (
        <div
          className={`border-b ${themeClasses.border} ${themeClasses.header} backdrop-blur-sm sticky top-0 z-10`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1
                  className={`text-2xl font-bold ${themeClasses.text} tracking-tight uppercase`}
                >
                  Draftline
                </h1>
                <p className={`text-sm ${themeClasses.textMuted} mt-0.5`}>
                  Sculpt your ideas through visible iterations
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={collapseAll}
                  className={`px-3 py-2 text-sm font-medium ${themeClasses.textMuted} hover:${themeClasses.text} hover:${themeClasses.cardHeader} rounded-lg transition-colors`}
                >
                  Collapse All
                </button>

                <button
                  onClick={expandAll}
                  className={`px-3 py-2 text-sm font-medium ${themeClasses.textMuted} hover:${themeClasses.text} hover:${themeClasses.cardHeader} rounded-lg transition-colors`}
                >
                  Expand All
                </button>

                <div className={`h-6 w-px ${themeClasses.border}`} />

                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium ${themeClasses.textMuted} hover:${themeClasses.text} hover:${themeClasses.cardHeader} rounded-lg transition-colors`}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>

                  {showSettings && (
                    <>
                      <div
                        className="fixed inset-0 z-20"
                        onClick={() => setShowSettings(false)}
                      />
                      <div
                        className={`absolute right-0 mt-2 w-80 ${themeClasses.card} rounded-lg shadow-xl border ${themeClasses.border} z-30 max-h-[80vh] overflow-y-auto`}
                      >
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3
                              className={`font-semibold ${themeClasses.text}`}
                            >
                              Settings
                            </h3>
                            <button
                              onClick={() => setShowSettings(false)}
                              className={`p-1 hover:${themeClasses.cardHeader} rounded transition-colors`}
                            >
                              <X
                                className={`w-4 h-4 ${themeClasses.textMuted}`}
                              />
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h4
                                className={`text-sm font-medium ${themeClasses.text} mb-3`}
                              >
                                Appearance
                              </h4>
                              <div className="space-y-3">
                                <div>
                                  <label
                                    className={`text-xs ${themeClasses.textMuted} mb-1 block`}
                                  >
                                    Theme
                                  </label>
                                  <select
                                    value={settings.theme}
                                    onChange={(e) =>
                                      updateSetting("theme", e.target.value)
                                    }
                                    className={`w-full text-sm ${themeClasses.text} ${themeClasses.card} border ${themeClasses.border} rounded px-2 py-1.5 outline-none`}
                                  >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                    <option value="warm">Warm</option>
                                  </select>
                                </div>
                                <label className="flex items-center justify-between">
                                  <span
                                    className={`text-sm ${themeClasses.textMuted}`}
                                  >
                                    Zen Mode
                                  </span>
                                  <input
                                    type="checkbox"
                                    checked={settings.zenMode}
                                    onChange={(e) =>
                                      updateSetting("zenMode", e.target.checked)
                                    }
                                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                                  />
                                </label>
                                <p
                                  className={`text-xs ${themeClasses.textMuted}`}
                                >
                                  Hide toolbar for distraction-free writing
                                </p>
                              </div>
                            </div>

                            <div
                              className={`border-t ${themeClasses.border} pt-4`}
                            >
                              <h4
                                className={`text-sm font-medium ${themeClasses.text} mb-3`}
                              >
                                Layout
                              </h4>
                              <div className="space-y-3">
                                <div>
                                  <label
                                    className={`text-xs ${themeClasses.textMuted} mb-2 block`}
                                  >
                                    Default Card Width:{" "}
                                    {settings.defaultCardWidth}px
                                  </label>
                                  <input
                                    type="range"
                                    min="240"
                                    max="600"
                                    value={settings.defaultCardWidth}
                                    onChange={(e) =>
                                      updateSetting(
                                        "defaultCardWidth",
                                        parseInt(e.target.value)
                                      )
                                    }
                                    className="w-full"
                                  />
                                </div>
                                <label className="flex items-center justify-between">
                                  <span
                                    className={`text-sm ${themeClasses.textMuted}`}
                                  >
                                    Center Cards
                                  </span>
                                  <input
                                    type="checkbox"
                                    checked={settings.centerCards}
                                    onChange={(e) =>
                                      updateSetting(
                                        "centerCards",
                                        e.target.checked
                                      )
                                    }
                                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                                  />
                                </label>
                                <label className="flex items-center justify-between">
                                  <span
                                    className={`text-sm ${themeClasses.textMuted}`}
                                  >
                                    Auto-fit Section Height
                                  </span>
                                  <input
                                    type="checkbox"
                                    checked={settings.autoFitHeight}
                                    onChange={(e) =>
                                      updateSetting(
                                        "autoFitHeight",
                                        e.target.checked
                                      )
                                    }
                                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                                  />
                                </label>
                              </div>
                            </div>

                            <div
                              className={`border-t ${themeClasses.border} pt-4`}
                            >
                              <h4
                                className={`text-sm font-medium ${themeClasses.text} mb-3`}
                              >
                                Copy Behavior
                              </h4>
                              <div className="space-y-2">
                                <label className="flex items-center justify-between">
                                  <span
                                    className={`text-sm ${themeClasses.textMuted}`}
                                  >
                                    Copy with HTML
                                  </span>
                                  <input
                                    type="checkbox"
                                    checked={settings.copyMarkdown}
                                    onChange={(e) =>
                                      updateSetting(
                                        "copyMarkdown",
                                        e.target.checked
                                      )
                                    }
                                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                                  />
                                </label>
                                <p
                                  className={`text-xs ${themeClasses.textMuted}`}
                                >
                                  When disabled, formatting is removed
                                </p>
                              </div>
                            </div>

                            <div
                              className={`border-t ${themeClasses.border} pt-4`}
                            >
                              <h4
                                className={`text-sm font-medium ${themeClasses.text} mb-3`}
                              >
                                Display
                              </h4>
                              <div className="space-y-2">
                                <label className="flex items-center justify-between">
                                  <span
                                    className={`text-sm ${themeClasses.textMuted}`}
                                  >
                                    Show Word Count
                                  </span>
                                  <input
                                    type="checkbox"
                                    checked={settings.showWordCount}
                                    onChange={(e) =>
                                      updateSetting(
                                        "showWordCount",
                                        e.target.checked
                                      )
                                    }
                                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                                  />
                                </label>
                                <label className="flex items-center justify-between">
                                  <span
                                    className={`text-sm ${themeClasses.textMuted}`}
                                  >
                                    Compact Mode
                                  </span>
                                  <input
                                    type="checkbox"
                                    checked={settings.compactMode}
                                    onChange={(e) =>
                                      updateSetting(
                                        "compactMode",
                                        e.target.checked
                                      )
                                    }
                                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                                  />
                                </label>
                              </div>
                            </div>

                            <div
                              className={`border-t ${themeClasses.border} pt-4`}
                            >
                              <h4
                                className={`text-sm font-medium ${themeClasses.text} mb-3`}
                              >
                                Editor
                              </h4>
                              <div className="space-y-2">
                                <label className="flex items-center justify-between">
                                  <span
                                    className={`text-sm ${themeClasses.textMuted}`}
                                  >
                                    Auto-save
                                  </span>
                                  <input
                                    type="checkbox"
                                    checked={settings.autoSave}
                                    onChange={(e) =>
                                      updateSetting(
                                        "autoSave",
                                        e.target.checked
                                      )
                                    }
                                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                                  />
                                </label>
                              </div>
                            </div>

                            <div
                              className={`border-t ${themeClasses.border} pt-4`}
                            >
                              <h4
                                className={`text-sm font-medium ${themeClasses.text} mb-3`}
                              >
                                Data Management
                              </h4>
                              <div className="space-y-2">
                                <button
                                  onClick={handleExport}
                                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 ${themeClasses.cardHeader} border ${themeClasses.border} rounded-lg hover:${themeClasses.card} transition-colors text-sm font-medium ${themeClasses.text}`}
                                >
                                  <Download className="w-4 h-4" />
                                  Export Data
                                </button>
                                <label
                                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 ${themeClasses.cardHeader} border ${themeClasses.border} rounded-lg hover:${themeClasses.card} transition-colors text-sm font-medium ${themeClasses.text} cursor-pointer`}
                                >
                                  <Upload className="w-4 h-4" />
                                  Import Data
                                  <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleImport}
                                    className="hidden"
                                  />
                                </label>
                                <button
                                  onClick={handleReset}
                                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                                >
                                  <RotateCcw className="w-4 h-4" />
                                  Reset to Default
                                </button>
                              </div>
                            </div>

                            <div
                              className={`border-t ${themeClasses.border} pt-4`}
                            >
                              <h4
                                className={`text-sm font-medium ${themeClasses.text} mb-2`}
                              >
                                Keyboard Shortcuts
                              </h4>
                              <div
                                className={`text-xs ${themeClasses.textMuted} space-y-1`}
                              >
                                <div className="flex justify-between">
                                  <span>Bold</span>
                                  <span className="font-mono">⌘/Ctrl + B</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Italic</span>
                                  <span className="font-mono">⌘/Ctrl + I</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Underline</span>
                                  <span className="font-mono">⌘/Ctrl + U</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Strikethrough</span>
                                  <span className="font-mono">⌘/Ctrl + S</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Highlight</span>
                                  <span className="font-mono">⌘/Ctrl + H</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={handleAddSection}
                  className={`flex items-center gap-2 px-4 py-2 ${
                    settings.theme === "dark" ? "bg-slate-700" : "bg-slate-900"
                  } text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium`}
                >
                  <Plus className="w-4 h-4" />
                  Section
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {settings.zenMode && (
        <button
          onClick={() => updateSetting("zenMode", false)}
          className="fixed top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg hover:bg-white transition-colors shadow-lg"
          title="Exit Zen Mode"
        >
          <Maximize2 className="w-5 h-5 text-slate-600" />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {sections.map((section) => (
          <Section
            key={section.id}
            section={section}
            allSections={sections}
            onUpdateSection={handleUpdateSection}
            onUpdateCard={handleUpdateCard}
            onDeleteCard={handleDeleteCard}
            onDeleteSection={handleDeleteSection}
            onDuplicateCard={handleAddCard}
            onAddCard={handleAddCard}
            collapsedCards={collapsedCards}
            onToggleCollapse={toggleCollapse}
            onCardDrop={handleCardDrop}
            onCardReorder={handleCardReorder}
            activeCardId={activeCardId}
            onCardFocus={setActiveCardId}
            copyMarkdown={settings.copyMarkdown}
            theme={settings.theme}
            autoFitHeight={settings.autoFitHeight}
            centerCards={settings.centerCards}
            defaultCardWidth={settings.defaultCardWidth}
          />
        ))}

        {!settings.zenMode && (
          <button
            onClick={handleAddSection}
            className={`w-full border-2 border-dashed ${themeClasses.border} rounded-lg hover:${themeClasses.cardHeader} transition-all p-8 flex items-center justify-center group`}
          >
            <div className="text-center">
              <Plus
                className={`w-8 h-8 ${themeClasses.textMuted} mx-auto mb-2`}
              />
              <span className={`text-sm ${themeClasses.textMuted} font-medium`}>
                Add Section
              </span>
            </div>
          </button>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className={`${themeClasses.card} rounded-xl shadow-2xl p-6 max-w-sm mx-4 border ${themeClasses.border}`}
          >
            <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>
              Delete card?
            </h3>
            <p className={`text-sm ${themeClasses.textMuted} mb-6`}>
              This action cannot be undone. The card and its content will be
              permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className={`flex-1 px-4 py-2 ${themeClasses.cardHeader} ${themeClasses.text} rounded-lg hover:${themeClasses.card} transition-colors font-medium text-sm`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteSectionConfirm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className={`${themeClasses.card} rounded-xl shadow-2xl p-6 max-w-sm mx-4 border ${themeClasses.border}`}
          >
            <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>
              Delete section?
            </h3>
            <p className={`text-sm ${themeClasses.textMuted} mb-6`}>
              This will permanently delete this section and all{" "}
              {sections.find((s) => s.id === showDeleteSectionConfirm)?.cards
                .length || 0}{" "}
              cards inside it. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteSectionConfirm(null)}
                className={`flex-1 px-4 py-2 ${themeClasses.cardHeader} ${themeClasses.text} rounded-lg hover:${themeClasses.card} transition-colors font-medium text-sm`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteSection}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
              >
                Delete Section
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
        }
        [contenteditable] {
          caret-color: currentColor;
        }
        [contenteditable] h1 {
          font-size: 1.5em;
          font-weight: bold;
          margin-top: 0.67em;
          margin-bottom: 0.67em;
        }
        [contenteditable] h2 {
          font-size: 1.3em;
          font-weight: bold;
          margin-top: 0.83em;
          margin-bottom: 0.83em;
        }
        [contenteditable] h3 {
          font-size: 1.1em;
          font-weight: bold;
          margin-top: 1em;
          margin-bottom: 1em;
        }
        [contenteditable] ul {
          list-style-type: disc;
          margin-left: 1.5em;
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }
        [contenteditable] li {
          margin-bottom: 0.25em;
        }
        [contenteditable] p {
          margin-bottom: 0.5em;
        }
        [contenteditable] mark {
          background-color: #fef08a;
          padding: 0 2px;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
