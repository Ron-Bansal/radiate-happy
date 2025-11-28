"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Settings, Strikethrough, Play, Pause, RotateCcw, PenLine, StickyNote } from 'lucide-react';

export default function WriteWithInk() {
  const [text, setText] = useState('');
  const [notes, setNotes] = useState('');
  const [theme, setTheme] = useState('ink');
  const [font, setFont] = useState('serif');

  const [showUI, setShowUI] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [strictMode, setStrictMode] = useState(false);
  const [writingMode, setWritingMode] = useState('normal'); // 'normal', 'grow', 'fade'
  const [fontSize, setFontSize] = useState(20);
  const [textOpacity, setTextOpacity] = useState(1);
  const [lastKeystroke, setLastKeystroke] = useState(Date.now());
  const [typingVelocity, setTypingVelocity] = useState(0);
  const [strikethroughMode, setStrikethroughMode] = useState(false);
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  const [backspaceBuffer, setBackspaceBuffer] = useState(3);
  const [textBeforeChange, setTextBeforeChange] = useState('');
  
  const textareaRef = useRef(null);
  const notesRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const mouseTimeoutRef = useRef(null);
  const settingsRef = useRef(null);
  const fontSizeIntervalRef = useRef(null);
  const opacityIntervalRef = useRef(null);
  const velocityTimeoutRef = useRef(null);

  const themes = {
    ink: { 
      name: 'Ink',
      bg: '#ffffff', 
      text: '#000000', 
      muted: '#888888',
      mutedLight: '#cccccc',
      accent: '#000000',
      border: '#e0e0e0',
      strikethrough: '#b0b0b0'
    },
    dawn: { 
      name: 'Dawn',
      bg: '#faf8f3', 
      text: '#4a3f35', 
      muted: '#9a8878',
      mutedLight: '#d4c4b4',
      accent: '#8b6f47',
      border: '#e8dfd0',
      strikethrough: '#baa898'
    },
    dusk: { 
      name: 'Dusk',
      bg: '#1a1f2e', 
      text: '#e6edf3', 
      muted: '#8b949e',
      mutedLight: '#484f58',
      accent: '#58a6ff',
      border: '#30363d',
      strikethrough: '#6e7681'
    },
    mist: { 
      name: 'Mist',
      bg: '#e8e8e8', 
      text: '#4a4a4a', 
      muted: '#888888',
      mutedLight: '#b8b8b8',
      accent: '#5a5a5a',
      border: '#d0d0d0',
      strikethrough: '#a0a0a0'
    }
  };

  const fonts = {
    serif: { family: 'Lora, Georgia, serif', name: 'Serif' },
    sans: { family: 'Inter, system-ui, sans-serif', name: 'Sans' },
    mono: { family: '"JetBrains Mono", "Courier New", monospace', name: 'Mono' }
  };

  const currentTheme = themes[theme];
  const currentFont = fonts[font];

  // Timer logic
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isTimerRunning]);

  // Mouse movement UI trigger
  useEffect(() => {
    const handleMouseMove = () => {
      setShowUI(true);
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
      mouseTimeoutRef.current = setTimeout(() => {
        setShowUI(false);
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
    };
  }, []);

  // Click outside to close settings
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + S - Toggle Strikethrough Mode
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setStrikethroughMode(prev => !prev);
      }

      // Cmd/Ctrl + ' - Toggle Notes Panel
      if ((e.metaKey || e.ctrlKey) && e.key === "'") {
        e.preventDefault();
        setShowNotesPanel(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Start timer on first keystroke
  useEffect(() => {
    if (text.length === 1 && !isTimerRunning) {
      setIsTimerRunning(true);
    }
  }, [text.length, isTimerRunning]);

  // Growing font mode
  useEffect(() => {
    if (writingMode !== 'grow') {
      if (fontSizeIntervalRef.current) {
        clearInterval(fontSizeIntervalRef.current);
      }
      setFontSize(20);
      return;
    }

    const now = Date.now();
    const timeSinceLastKeystroke = now - lastKeystroke;

    // Shrink font when not typing
    fontSizeIntervalRef.current = setInterval(() => {
      const currentTime = Date.now();
      const inactiveTime = currentTime - lastKeystroke;
      
      if (inactiveTime > 500) {
        setFontSize(prev => {
          const shrinkRate = 0.5; // pixels per 100ms
          const newSize = Math.max(6, prev - shrinkRate);
          return newSize;
        });
      }
    }, 100);

    return () => {
      if (fontSizeIntervalRef.current) {
        clearInterval(fontSizeIntervalRef.current);
      }
    };
  }, [writingMode, lastKeystroke]);

  // Fading text mode
  useEffect(() => {
    if (writingMode !== 'fade') {
      if (opacityIntervalRef.current) {
        clearInterval(opacityIntervalRef.current);
      }
      setTextOpacity(1);
      return;
    }

    opacityIntervalRef.current = setInterval(() => {
      const currentTime = Date.now();
      const inactiveTime = currentTime - lastKeystroke;
      
      if (inactiveTime > 500) {
        setTextOpacity(prev => {
          const fadeRate = 0.015; // per 100ms
          const newOpacity = Math.max(0, prev - fadeRate);
          return newOpacity;
        });
      }
    }, 100);

    return () => {
      if (opacityIntervalRef.current) {
        clearInterval(opacityIntervalRef.current);
      }
    };
  }, [writingMode, lastKeystroke]);

  // Track typing velocity for fade mode
  useEffect(() => {
    if (writingMode === 'fade' && text.length > 0) {
      const now = Date.now();
      const timeDiff = now - lastKeystroke;
      
      // Calculate velocity (chars per second)
      if (timeDiff < 2000) {
        const newVelocity = 1000 / Math.max(timeDiff, 50);
        setTypingVelocity(newVelocity);
        
        // Gradually increase opacity based on typing velocity
        const opacityBoost = newVelocity * 0.08;
        setTextOpacity(prev => {
          const target = Math.min(1, prev + opacityBoost);
          return target;
        });
      }
    }
  }, [text.length, writingMode]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    const lengthDiff = text.length - newText.length;
    
    // Update last keystroke time for velocity modes
    const now = Date.now();
    setLastKeystroke(now);
    
    // Growing mode - increase font size when typing
    if (writingMode === 'grow' && newText.length > text.length) {
      setFontSize(prev => Math.min(72, prev + 2)); // Grow by 2px per keystroke, max 72px
    }
    
    // Deletion attempt
    if (newText.length < text.length) {
      if (strictMode) {
        return; // Block all deletions in strict mode
      }
      
      // In non-strict mode, allow deletion if within buffer
      if (lengthDiff <= backspaceBuffer) {
        setText(newText);
        setBackspaceBuffer(backspaceBuffer - lengthDiff);
        setTextBeforeChange(newText);
      }
    } else {
      // Addition - reset buffer and update text
      setText(newText);
      setBackspaceBuffer(3);
      setTextBeforeChange(newText);
    }
  };

  const handleKeyDown = (e) => {
    // Track selection for strikethrough mode
    if (strikethroughMode && e.key !== 'Backspace' && e.key !== 'Delete') {
      setTimeout(() => {
        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        
        if (start !== end) {
          applyStrikethrough(start, end);
        }
      }, 0);
    }
    
    // Prevent cut
    if ((e.metaKey || e.ctrlKey) && e.key === 'x') {
      e.preventDefault();
    }
  };

  const applyStrikethrough = (start, end) => {
    if (!strikethroughMode || start === end) return;
    
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);
    
    // Check if already has strikethrough markers
    const hasStrikethrough = selected.startsWith('~~') && selected.endsWith('~~');
    
    let newText;
    if (hasStrikethrough) {
      // Remove strikethrough
      const unstriked = selected.substring(2, selected.length - 2);
      newText = before + unstriked + after;
    } else {
      // Add strikethrough
      newText = before + '~~' + selected + '~~' + after;
    }
    
    setText(newText);
    setTextBeforeChange(newText);
    
    // Reset selection
    setTimeout(() => {
      textareaRef.current.setSelectionRange(start, start);
      setStrikethroughMode(false);
    }, 0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const wordCount = text.replace(/~~/g, '').trim().split(/\s+/).filter(Boolean).length;
  const charCount = text.replace(/~~/g, '').length;

  const resetSession = () => {
    if (isTimerRunning) return;
    if (window.confirm('Reset session? Your text will be cleared.')) {
      setText('');
      setNotes('');
      setTimerSeconds(0);
      setIsTimerRunning(false);
      setBackspaceBuffer(3);
      setTextBeforeChange('');
      setFontSize(20);
      setTextOpacity(1);
      setLastKeystroke(Date.now());
    }
  };

  const downloadText = () => {
    const cleanText = text.replace(/~~/g, '');
    const blob = new Blob([cleanText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `write-with-ink-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Render text with strikethrough styling
  const renderDisplayText = () => {
    if (!text.includes('~~')) return text;
    
    const segments = [];
    let currentIndex = 0;
    const strikethroughRegex = /~~([^~]+)~~/g;
    let match;
    
    while ((match = strikethroughRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        segments.push(text.substring(currentIndex, match.index));
      }
      // Add the strikethrough text
      segments.push(`~~${match[1]}~~`);
      currentIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (currentIndex < text.length) {
      segments.push(text.substring(currentIndex));
    }
    
    return segments.join('');
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: currentTheme.bg,
        color: currentTheme.text,
        transition: 'background-color 0.4s ease, color 0.4s ease',
        fontFamily: currentFont.family,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Toolbar */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          borderBottom: `1px solid ${currentTheme.border}`,
          backgroundColor: currentTheme.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          opacity: showUI ? 1 : 0,
          pointerEvents: showUI ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
          zIndex: 100
        }}
      >
        {/* Left: Logo & Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.625rem',
            fontSize: '1.125rem',
            fontWeight: '500',
            letterSpacing: '-0.02em',
            fontFamily: currentFont.family
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.text})`,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: currentTheme.bg,
              fontSize: '1rem'
            }}>
              <PenLine size={18} strokeWidth={2.5} />
            </div>
            <span style={{ color: currentTheme.text }}>Write with Ink</span>
          </div>
          
          <div style={{ 
            width: '1px', 
            height: '28px', 
            backgroundColor: currentTheme.border,
            margin: '0 0.25rem'
          }} />
          
          <Tooltip text="Strikethrough selected text (⌘S)">
            <button
              onClick={() => setStrikethroughMode(!strikethroughMode)}
              style={{
                background: strikethroughMode ? currentTheme.accent + '15' : 'transparent',
                border: `1px solid ${strikethroughMode ? currentTheme.accent : currentTheme.border}`,
                borderRadius: '6px',
                padding: '0.5rem',
                cursor: 'pointer',
                color: currentTheme.text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <Strikethrough size={18} />
            </button>
          </Tooltip>

          <button
            onClick={() => setShowNotesPanel(!showNotesPanel)}
            style={{
              background: showNotesPanel ? currentTheme.accent + '15' : 'transparent',
              border: `1px solid ${showNotesPanel ? currentTheme.accent : currentTheme.border}`,
              borderRadius: '6px',
              padding: '0.5rem 0.875rem',
              cursor: 'pointer',
              color: currentTheme.text,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              transition: 'all 0.2s ease'
            }}
          >
            <StickyNote size={16} />
            <span>Side Notes</span>
          </button>
        </div>

        {/* Right: Settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative' }} ref={settingsRef}>
            <button
              onClick={() => setShowSettings(!showSettings)}
              style={{
                background: 'transparent',
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '6px',
                padding: '0.5rem',
                cursor: 'pointer',
                color: currentTheme.text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <Settings size={18} />
            </button>
            
            {showSettings && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 0.5rem)',
                right: 0,
                background: currentTheme.bg,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                padding: '0.75rem',
                minWidth: '280px',
                maxHeight: '70vh',
                overflowY: 'auto',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                zIndex: 200
              }}>
                {/* Theme Selection */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '500',
                    color: currentTheme.muted,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Theme
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {Object.entries(themes).map(([key, t]) => (
                      <button
                        key={key}
                        onClick={() => setTheme(key)}
                        style={{
                          padding: '0.75rem',
                          border: `2px solid ${theme === key ? currentTheme.accent : currentTheme.border}`,
                          borderRadius: '6px',
                          cursor: 'pointer',
                          background: t.bg,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.25rem',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ 
                          fontSize: '0.875rem',
                          color: t.text,
                          fontWeight: theme === key ? '500' : '400'
                        }}>
                          {t.name}
                        </div>
                        <div style={{ 
                          height: '3px', 
                          background: t.accent,
                          borderRadius: '2px'
                        }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Selection */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '500',
                    color: currentTheme.muted,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Font
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {Object.entries(fonts).map(([key, f]) => (
                      <button
                        key={key}
                        onClick={() => setFont(key)}
                        style={{
                          padding: '0.75rem',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          background: font === key ? currentTheme.accent + '15' : 'transparent',
                          color: currentTheme.text,
                          textAlign: 'left',
                          fontFamily: f.family,
                          fontSize: '0.9rem',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Strict Mode Toggle */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  borderTop: `1px solid ${currentTheme.border}`,
                  paddingTop: '1rem',
                  marginTop: '0.5rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                      Strict Mode
                    </div>
                    <div style={{ fontSize: '0.75rem', color: currentTheme.muted }}>
                      No backspace allowed
                    </div>
                  </div>
                  <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                    <input
                      type="checkbox"
                      checked={strictMode}
                      onChange={(e) => setStrictMode(e.target.checked)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: strictMode ? currentTheme.accent : currentTheme.mutedLight,
                      transition: '0.3s',
                      borderRadius: '24px'
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '',
                        height: '18px',
                        width: '18px',
                        left: strictMode ? '23px' : '3px',
                        bottom: '3px',
                        backgroundColor: currentTheme.bg,
                        transition: '0.3s',
                        borderRadius: '50%'
                      }} />
                    </span>
                  </label>
                </div>

                {/* Writing Mode Selection */}
                <div style={{ 
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: `1px solid ${currentTheme.border}`
                }}>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '500',
                    color: currentTheme.muted,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Writing Mode
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <button
                      onClick={() => setWritingMode('normal')}
                      style={{
                        padding: '0.75rem',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        background: writingMode === 'normal' ? currentTheme.accent + '15' : 'transparent',
                        color: currentTheme.text,
                        textAlign: 'left',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontWeight: '500' }}>Normal</div>
                      <div style={{ fontSize: '0.75rem', color: currentTheme.muted, marginTop: '0.25rem' }}>
                        Standard writing mode
                      </div>
                    </button>
                    <button
                      onClick={() => setWritingMode('grow')}
                      style={{
                        padding: '0.75rem',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        background: writingMode === 'grow' ? currentTheme.accent + '15' : 'transparent',
                        color: currentTheme.text,
                        textAlign: 'left',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontWeight: '500' }}>Growing Font</div>
                      <div style={{ fontSize: '0.75rem', color: currentTheme.muted, marginTop: '0.25rem' }}>
                        Type faster = bigger text
                      </div>
                    </button>
                    <button
                      onClick={() => setWritingMode('fade')}
                      style={{
                        padding: '0.75rem',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        background: writingMode === 'fade' ? currentTheme.accent + '15' : 'transparent',
                        color: currentTheme.text,
                        textAlign: 'left',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontWeight: '500' }}>Fading Text</div>
                      <div style={{ fontSize: '0.75rem', color: currentTheme.muted, marginTop: '0.25rem' }}>
                        Keep typing or text disappears
                      </div>
                    </button>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadText}
                  disabled={text.length === 0}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '6px',
                    cursor: text.length === 0 ? 'not-allowed' : 'pointer',
                    background: 'transparent',
                    color: currentTheme.text,
                    fontSize: '0.875rem',
                    marginTop: '0.5rem',
                    opacity: text.length === 0 ? 0.5 : 1,
                    transition: 'all 0.2s ease'
                  }}
                >
                  Download Text
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ 
        display: 'flex',
        marginTop: '64px',
        flexGrow: 1,
        position: 'relative'
      }}>
        {/* Main Writing Area */}
        <div style={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '3rem 2rem 8rem 2rem',
          transition: 'padding 0.3s ease'
        }}>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Begin writing..."
            autoFocus
            style={{
              width: '100%',
              maxWidth: '42rem',
              minHeight: '60vh',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontSize: writingMode === 'grow' ? `${fontSize}px` : '1.25rem',
              lineHeight: '1.8',
              color: currentTheme.text,
              fontFamily: currentFont.family,
              letterSpacing: '0.01em',
              opacity: writingMode === 'fade' ? textOpacity : 1,
              transition: writingMode === 'grow' ? 'font-size 0.1s ease-out' : 
                         writingMode === 'fade' ? 'opacity 0.3s ease-out' : 'none'
            }}
          />
        </div>

        {/* Side Notes Panel */}
        {showNotesPanel && (
          <div style={{
            width: '280px',
            borderLeft: `1px solid ${currentTheme.border}`,
            padding: '2rem 1.5rem',
            backgroundColor: currentTheme.bg,
            transition: 'opacity 0.4s ease'
          }}>
            <div style={{ 
              fontSize: '0.75rem',
              fontWeight: '500',
              color: currentTheme.muted,
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Quick Notes
            </div>
            <textarea
              ref={notesRef}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ideas, reminders, thoughts..."
              style={{
                width: '100%',
                minHeight: '400px',
                background: 'transparent',
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '6px',
                padding: '0.75rem',
                outline: 'none',
                resize: 'vertical',
                fontSize: '0.875rem',
                lineHeight: '1.6',
                color: currentTheme.text,
                fontFamily: currentFont.family
              }}
            />
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div 
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '56px',
          borderTop: `1px solid ${currentTheme.border}`,
          backgroundColor: currentTheme.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          opacity: showUI ? 1 : 0,
          pointerEvents: showUI ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
          zIndex: 100
        }}
      >
        {/* Left: Stats */}
        <div style={{ 
          fontSize: '0.875rem', 
          color: currentTheme.muted,
          display: 'flex',
          gap: '1.5rem'
        }}>
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
        </div>

        {/* Right: Timer Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            fontSize: '1.125rem',
            fontWeight: '400',
            color: currentTheme.text,
            fontVariantNumeric: 'tabular-nums',
            minWidth: '60px',
            textAlign: 'right'
          }}>
            {formatTime(timerSeconds)}
          </div>
          
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            disabled={text.length === 0}
            style={{
              background: 'transparent',
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '6px',
              padding: '0.5rem',
              cursor: text.length === 0 ? 'not-allowed' : 'pointer',
              color: currentTheme.text,
              opacity: text.length === 0 ? 0.3 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button
            onClick={resetSession}
            disabled={text.length === 0 || isTimerRunning}
            title={isTimerRunning ? "Pause timer first" : "Reset session"}
            style={{
              background: 'transparent',
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '6px',
              padding: '0.5rem',
              cursor: (text.length === 0 || isTimerRunning) ? 'not-allowed' : 'pointer',
              color: currentTheme.text,
              opacity: (text.length === 0 || isTimerRunning) ? 0.3 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500&family=Inter:wght@300;400;500;600&family=JetBrains+Mono&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        textarea::placeholder {
          color: ${currentTheme.muted};
          opacity: 0.4;
        }
        
        textarea {
          caret-color: ${currentTheme.text};
        }
        
        /* Strikethrough styling within textarea */
        textarea {
          background-image: 
            repeating-linear-gradient(
              transparent,
              transparent 1.8em,
              transparent 1.8em,
              transparent calc(1.8em + 1px)
            );
        }
        
        button:not(:disabled):hover {
          opacity: 0.8;
        }
        
        button:not(:disabled):active {
          transform: scale(0.98);
        }

        /* Custom scrollbar for settings */
        div::-webkit-scrollbar {
          width: 6px;
        }
        
        div::-webkit-scrollbar-track {
          background: ${currentTheme.bg};
        }
        
        div::-webkit-scrollbar-thumb {
          background: ${currentTheme.mutedLight};
          border-radius: 3px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: ${currentTheme.muted};
        }
      `}</style>
    </div>
  );
}

// Tooltip Component
function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);
  
  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 0.75rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '0.5rem 0.75rem',
          background: 'rgba(0,0,0,0.9)',
          color: 'white',
          fontSize: '0.75rem',
          borderRadius: '4px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 10000
        }}>
          {text}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: '4px solid rgba(0,0,0,0.9)'
          }} />
        </div>
      )}
    </div>
  );
}