"use client";
import React, { useState, useEffect, useRef } from 'react';
import { X, Play, PauseCircle, Save } from 'lucide-react';

// Character emoji based on quadrant position
const getCharacter = (x, y) => {
  // Top-left: Informative + Light (Smarty character)
  if (x < 50 && y < 50) return '🤓';
  // Top-right: Informative + Deep (Wise character)
  if (x >= 50 && y < 50) return '🧠';
  // Bottom-left: Entertaining + Light (Fun character)
  if (x < 50 && y >= 50) return '😂';
  // Bottom-right: Entertaining + Deep (Mind-blown character)
  return '🤯';
};

// Get character size based on distance from center
const getCharacterSize = (x, y) => {
  // Calculate distance from center (50,50)
  const distX = Math.abs(x - 50);
  const distY = Math.abs(y - 50);
  const distance = Math.sqrt(distX * distX + distY * distY);
  
  // Map distance to size (max at corners, min at center)
  // Distance can be maximum ~70.7 (diagonal from center to corner)
  const maxDistance = 70.7;
  const minSize = 1;
  const maxSize = 2.5;
  
  const sizeScale = minSize + (distance / maxDistance) * (maxSize - minSize);
  return sizeScale;
};

const MediaMunch = () => {
  // States for the application
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [contentTitle, setContentTitle] = useState('');
  const [contentType, setContentType] = useState('video');
  const [contentSource, setContentSource] = useState('YouTube');
  const [showComplete, setShowComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [characterRotation, setCharacterRotation] = useState(0);
  
  // Refs for animation
  const matrixRef = useRef(null);
  const characterRef = useRef(null);
  const containerRef = useRef(null);
  
  // Available tags with fun descriptions
  const tags = [
    { emoji: '🧠', label: 'Brain food', color: 'from-cyan-400 to-blue-500' },
    { emoji: '😆', label: 'LOL worthy', color: 'from-yellow-400 to-amber-500' },
    { emoji: '🤯', label: 'Mind-blown', color: 'from-fuchsia-500 to-purple-600' },
    { emoji: '🐉', label: 'Fantasy vibes', color: 'from-emerald-400 to-teal-500' },
    { emoji: '🎮', label: 'Gamer goals', color: 'from-indigo-400 to-violet-500' },
    { emoji: '💡', label: 'Inspiring', color: 'from-amber-300 to-orange-400' },
    { emoji: '🎵', label: 'Ear candy', color: 'from-rose-400 to-pink-500' },
    { emoji: '🌍', label: 'Real stuff', color: 'from-blue-400 to-indigo-500' },
  ];
  
  // Mouse parallax effect for character
  useEffect(() => {
    if (!isAnimating) return;
    
    const handleMouseMove = (e) => {
      if (isDragging || !containerRef.current || !characterRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center for character tilt
      const distX = (e.clientX - centerX) / (rect.width / 2) * 15;
      const distY = (e.clientY - centerY) / (rect.height / 2) * 15;
      
      // Set character rotation based on mouse position
      setCharacterRotation(distX);
      
      // Apply parallax effect to character
      if (characterRef.current) {
        characterRef.current.style.transform = `translate(${distX/2}px, ${distY/2}px) rotate(${distX}deg) scale(${getCharacterSize(position.x, position.y)})`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDragging, isAnimating, position]);
  
  // Handle matrix click/drag
  const handleMatrixInteraction = (e) => {
    if (!matrixRef.current) return;
    
    const rect = matrixRef.current.getBoundingClientRect();
    
    // Calculate position relative to matrix (0-100)
    let newX = ((e.clientX - rect.left) / rect.width) * 100;
    let newY = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Constrain to matrix bounds
    newX = Math.max(0, Math.min(100, newX));
    newY = Math.max(0, Math.min(100, newY));
    
    setPosition({ x: newX, y: newY });
  };
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMatrixInteraction(e);
  };
  
  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMatrixInteraction(e);
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const saveRating = () => {
    if (!contentTitle) {
      // Show title required message
      return;
    }
    
    // Here we would normally save to a database
    const rating = {
      title: contentTitle,
      type: contentType,
      source: contentSource,
      position: position,
      tags: selectedTags,
      timestamp: new Date().toISOString(),
    };
    
    console.log('Saved rating:', rating);
    setShowComplete(true);
    
    // Reset form after delay
    setTimeout(() => {
      setShowComplete(false);
      setContentTitle('');
      setPosition({ x: 50, y: 50 });
      setSelectedTags([]);
    }, 2000);
  };
  
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  // Get current character based on position
  const currentCharacter = getCharacter(position.x, position.y);
  const characterSize = getCharacterSize(position.x, position.y);

  return (
    <div className="font-sans max-w-2xl mx-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl overflow-hidden shadow-2xl border-4 border-indigo-200" ref={containerRef}>
      {/* App Header */}
      <div className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 p-5 flex justify-between items-center shadow-lg relative overflow-hidden">
        {/* Decorative bubbles in header */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-4 left-6 w-12 h-12 bg-white/20 rounded-full blur-sm"></div>
          <div className="absolute top-2 right-10 w-8 h-8 bg-yellow-300/30 rounded-full blur-sm"></div>
          <div className="absolute bottom-0 left-1/4 w-16 h-16 bg-purple-300/20 rounded-full blur-sm"></div>
        </div>
        
        <div className="flex items-center relative z-10">
          <div className="text-white font-extrabold text-3xl tracking-tight flex items-center">
            <span className="text-4xl mr-1">🍭</span>
            <span className="text-yellow-300 tracking-tighter">Media</span>
            <span className="text-white">Munch</span>
          </div>
        </div>
        <div className="flex gap-3 relative z-10">
          <button 
            onClick={toggleAnimation} 
            className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-all transform hover:scale-110 shadow-lg"
          >
            {isAnimating ? <PauseCircle size={24} /> : <Play size={24} />}
          </button>
          <button 
            onClick={() => setShowHelp(!showHelp)} 
            className="w-8 h-8 bg-white/20 rounded-full text-white hover:bg-white/30 transition-all flex items-center justify-center text-lg font-bold transform hover:scale-110 shadow-lg"
          >
            ?
          </button>
        </div>
      </div>
      
      {/* Help Modal */}
      {showHelp && (
        <div className="absolute top-0 left-0 w-full h-full bg-indigo-900/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl max-w-md relative shadow-2xl border-4 border-purple-200">
            <button 
              onClick={() => setShowHelp(false)}
              className="absolute -top-4 -right-4 bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-600 transition-all transform hover:scale-110"
            >
              <X size={24} />
            </button>
            <div className="text-4xl mb-4 text-center">🎮</div>
            <h3 className="text-2xl font-bold mb-4 text-center text-indigo-700 tracking-tight">How to Munch Media</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-center">
                <div className="bg-gradient-to-br from-indigo-400 to-purple-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md">1</div>
                <span className="text-gray-700">Drag on the quadrant to position your rating</span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="bg-gradient-to-br from-pink-400 to-rose-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md">2</div>
                <span className="text-gray-700">Watch the character react to your rating!</span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md">3</div>
                <span className="text-gray-700">Add some fun tags to describe the content</span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="bg-gradient-to-br from-emerald-400 to-teal-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md">4</div>
                <span className="text-gray-700">Fill in the details and save!</span>
              </li>
            </ul>
            <div className="mt-6 text-center">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-3 rounded-xl">
                <span className="text-sm text-indigo-400">Learn how your character changes as you drag!</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Content Form */}
      <div className="bg-white p-6 rounded-2xl mx-4 my-6 shadow-xl border-4 border-pink-100">
        <div className="mb-4">
          <label className="block text-fuchsia-800 text-lg font-bold mb-3 flex items-center">
            <span className="text-2xl mr-2">🎬</span> What are you rating today?
          </label>
          <input
            type="text"
            value={contentTitle}
            onChange={(e) => setContentTitle(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border-2 border-fuchsia-200 focus:border-fuchsia-500 focus:outline-none transition-all shadow-md text-lg"
            placeholder="Enter title (e.g., Minecraft Tutorial)"
          />
        </div>
        
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-fuchsia-800 text-lg font-bold mb-3 flex items-center">
              <span className="text-2xl mr-2">📁</span> Content Type
            </label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border-2 border-violet-200 focus:border-violet-500 focus:outline-none transition-all shadow-md text-lg bg-gradient-to-r from-white to-violet-50"
            >
              <option value="video">Video 📺</option>
              <option value="song">Song/Music 🎵</option>
              <option value="game">Game 🎮</option>
              <option value="article">Article/Story 📚</option>
              <option value="other">Other ✨</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-fuchsia-800 text-lg font-bold mb-3 flex items-center">
              <span className="text-2xl mr-2">🌐</span> Source
            </label>
            <select
              value={contentSource}
              onChange={(e) => setContentSource(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 focus:outline-none transition-all shadow-md text-lg bg-gradient-to-r from-white to-indigo-50"
            >
              <option value="YouTube">YouTube 📺</option>
              <option value="Spotify">Spotify 🎧</option>
              <option value="Netflix">Netflix 🍿</option>
              <option value="TikTok">TikTok 📱</option>
              <option value="Roblox">Roblox 🟥</option>
              <option value="Minecraft">Minecraft ⛏️</option>
              <option value="other">Other 🔍</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Rating Matrix Section */}
      <div className="bg-gradient-to-br from-violet-100 via-fuchsia-50 to-pink-100 p-6 mx-4 rounded-2xl shadow-lg mb-6 border-4 border-purple-100">
        <h2 className="text-2xl font-extrabold text-purple-800 mb-4 flex items-center">
          <span className="text-3xl mr-2">🎯</span> Rate Your Media!
        </h2>
        
        {/* Matrix Container */}
        <div className="relative mb-8 select-none" style={{ height: '360px' }}>
          {/* Character that reacts to position */}
          <div 
            ref={characterRef}
            className="absolute -top-4 -right-4 z-20 transition-all duration-200 filter drop-shadow-lg"
            style={{ 
              transform: `rotate(${characterRotation}deg) scale(${characterSize})`,
              transformOrigin: 'center bottom'
            }}
          >
            <div className="text-7xl relative">
              {currentCharacter}
              {/* Speech bubble that appears when dragging */}
              {isDragging && (
                <div className="absolute -top-16 left-0 bg-white px-4 py-2 rounded-xl shadow-lg text-base whitespace-nowrap animate-bounce-in">
                  {position.x < 50 && position.y < 50 && "I'm learning stuff!"}
                  {position.x >= 50 && position.y < 50 && "This is deep knowledge!"}
                  {position.x < 50 && position.y >= 50 && "This is so fun!"}
                  {position.x >= 50 && position.y >= 50 && "Mind = blown!"}
                  <div className="absolute -bottom-2 left-5 w-4 h-4 bg-white transform rotate-45"></div>
                </div>
              )}
            </div>
          </div>
          
          {/* Fixed Matrix */}
          <div 
            ref={matrixRef}
            className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-indigo-200"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Matrix Background with fun designs */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-300 rounded-full blur-md"></div>
              <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-300 rounded-full blur-md"></div>
              <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-yellow-300 rounded-full blur-sm"></div>
            </div>
            
            {/* Matrix Grid with fun colors */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 border-4 border-purple-200">
              <div className="border-b-4 border-r-4 border-purple-200 p-5 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-start justify-start">
                <span className="text-sm font-extrabold text-blue-600 bg-white/80 px-3 py-1 rounded-lg shadow-sm">BRAINY + EASY</span>
              </div>
              <div className="border-b-4 border-purple-200 p-5 bg-gradient-to-bl from-indigo-100 to-violet-100 flex items-start justify-end">
                <span className="text-sm font-extrabold text-violet-600 bg-white/80 px-3 py-1 rounded-lg shadow-sm">BRAINY + DEEP</span>
              </div>
              <div className="border-r-4 border-purple-200 p-5 bg-gradient-to-tr from-amber-100 to-yellow-100 flex items-end justify-start">
                <span className="text-sm font-extrabold text-amber-600 bg-white/80 px-3 py-1 rounded-lg shadow-sm">FUN + EASY</span>
              </div>
              <div className="p-5 bg-gradient-to-tl from-pink-100 to-rose-100 flex items-end justify-end">
                <span className="text-sm font-extrabold text-rose-600 bg-white/80 px-3 py-1 rounded-lg shadow-sm">FUN + DEEP</span>
              </div>
            </div>
            
            {/* Axis Labels - More playful */}
            <div className="absolute inset-x-0 top-0 h-16 flex justify-center items-center">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-xl text-base font-extrabold shadow-lg transform -translate-y-1/2 border-2 border-white">
                BRAIN FOOD 🧠
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-16 flex justify-center items-center">
              <div className="bg-gradient-to-r from-amber-500 to-pink-500 text-white px-5 py-2 rounded-xl text-base font-extrabold shadow-lg transform translate-y-1/2 border-2 border-white">
                ENTERTAINMENT 🎮
              </div>
            </div>
            <div className="absolute inset-y-0 left-0 w-16 flex justify-center items-center">
              <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-5 py-2 rounded-xl text-base font-extrabold shadow-lg transform -translate-x-1/2 -rotate-90 border-2 border-white">
                LIGHT 🪶
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 w-16 flex justify-center items-center">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-5 py-2 rounded-xl text-base font-extrabold shadow-lg transform translate-x-1/2 rotate-90 border-2 border-white">
                DEEP 🌊
              </div>
            </div>
            
            {/* Position Marker - Simple crosshair */}
            <div 
              className="absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ 
                left: `${position.x}%`, 
                top: `${position.y}%`
              }}
            >
              <div className="absolute inset-0 w-full h-full rounded-full border-4 border-dashed border-indigo-500 animate-pulse"></div>
              <div className="absolute inset-0 w-full h-px bg-indigo-500 top-1/2"></div>
              <div className="absolute inset-0 w-px h-full bg-indigo-500 left-1/2"></div>
            </div>
          </div>
          
          {/* Position Description */}
          <div className="absolute -bottom-12 left-0 right-0 text-center">
            <div className="inline-block bg-white px-4 py-2 rounded-xl shadow-md text-purple-700 font-medium border-2 border-purple-100">
              {position.x < 30 && position.y < 30 && "Super educational and easy to digest!"}
              {position.x >= 70 && position.y < 30 && "Deep learning that makes you think!"}
              {position.x < 30 && position.y >= 70 && "Light-hearted fun and entertainment!"}
              {position.x >= 70 && position.y >= 70 && "Mind-expanding entertainment with depth!"}
              
              {position.x >= 30 && position.x < 70 && position.y < 30 && "Balanced learning content!"}
              {position.x < 30 && position.y >= 30 && position.y < 70 && "Easy content with mixed value!"}
              {position.x >= 70 && position.y >= 30 && position.y < 70 && "Deep content with mixed appeal!"}
              {position.x >= 30 && position.x < 70 && position.y >= 70 && "Fun content with balanced depth!"}
              
              {position.x >= 30 && position.x < 70 && position.y >= 30 && position.y < 70 && "Perfectly balanced content!"}
            </div>
          </div>
        </div>
        
        {/* Tags Section - More playful */}
        <div className="mb-6 mt-16">
          <h3 className="text-xl font-extrabold text-purple-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">🏷️</span> Choose up to 3 tags:
          </h3>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <button
                key={index}
                onClick={() => handleTagClick(tag)}
                className={`py-3 px-5 rounded-xl text-lg flex items-center gap-2 transition-all transform hover:scale-105 ${
                  selectedTags.includes(tag)
                    ? `bg-gradient-to-r ${tag.color} text-white shadow-lg scale-105 border-2 border-white`
                    : 'bg-white text-gray-700 shadow-md border-2 border-purple-100'
                }`}
              >
                <span className="text-2xl">{tag.emoji}</span>
                <span className="font-bold">{tag.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Save Button */}
      <div className="bg-white p-6 rounded-2xl shadow-xl mx-4 mb-6 border-4 border-indigo-100">
        <button
          onClick={saveRating}
          disabled={!contentTitle}
          className={`w-full py-4 px-6 rounded-xl text-white font-extrabold text-xl flex items-center justify-center gap-3 transition-all transform ${
            contentTitle
              ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 hover:shadow-xl active:scale-95'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          <Save size={24} />
          SAVE YOUR RATING
        </button>
        
        {!contentTitle && (
          <p className="text-red-500 text-base mt-3 text-center font-medium">
            ⚠️ Please enter a title to save your rating
          </p>
        )}
      </div>
      
      {/* Success Message Overlay */}
      {showComplete && (
        <div className="fixed inset-0 flex items-center justify-center bg-indigo-900/70 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-3xl max-w-md animate-bounce-in shadow-2xl border-4 border-pink-200">
            <div className="text-center">
              <div className="text-8xl mb-4 animate-bounce">🎉</div>
              <h3 className="text-3xl font-extrabold text-purple-700 mb-3">Awesome Job!</h3>
              <p className="text-lg text-indigo-800 font-medium">
                Your rating for "{contentTitle}" has been saved!
              </p>
              <div className="mt-6 flex justify-center">
                <div className="inline-flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes bounce-in {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default MediaMunch;