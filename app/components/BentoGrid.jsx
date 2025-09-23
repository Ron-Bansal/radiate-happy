import React, { useState } from 'react';
import { portfolioContent } from './portfolioContent';

const BentoGrid = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  // Group content by sections
  const sections = portfolioContent.reduce((acc, item) => {
    const sectionKey = item.section || 'default';
    if (!acc[sectionKey]) {
      acc[sectionKey] = [];
    }
    acc[sectionKey].push(item);
    return acc;
  }, {});

  const getGridColSpan = (colSpan) => {
    // Mobile: max 2 columns, desktop: original spans
    switch (colSpan) {
      case 1: return 'col-span-1 md:col-span-1';
      case 2: return 'col-span-2 md:col-span-2';
      case 3: return 'col-span-2 md:col-span-3'; // Wrap to 2 cols on mobile
      case 4: return 'col-span-2 md:col-span-4'; // Wrap to 2 cols on mobile
      default: return 'col-span-1 md:col-span-1';
    }
  };

  const getGridRowSpan = (rowSpan) => {
    switch (rowSpan) {
      case 1: return 'row-span-1';
      case 2: return 'row-span-2';
      case 3: return 'row-span-3';
      default: return 'row-span-1';
    }
  };

//   const getAspectRatio = (colSpan, rowSpan) => {
//     // For square cells (1x1, 2x2, etc.), use aspect-square
//     if (colSpan === rowSpan) {
//       return 'aspect-square';
//     }
//     // For rectangular cells, calculate the ratio
//     const ratio = colSpan / rowSpan;
//     if (ratio === 2) return 'aspect-[2/1] md:aspect-[2/1]';
//     if (ratio === 0.5) return 'aspect-[1/2] md:aspect-[1/2]';
//     if (ratio === 4) return 'aspect-[2/1] md:aspect-[4/1]'; // Mobile friendly
//     if (ratio === 3) return 'aspect-[2/1] md:aspect-[3/1]'; // Mobile friendly
//     if (ratio === 1.5) return 'aspect-[2/1] md:aspect-[3/2]';
//     return 'aspect-auto';
//   };

const getAspectRatio = (colSpan, rowSpan) => {
  const c = colSpan || 1;
  const r = rowSpan || 1;

  // Perfect squares
  if (c === r) return 'aspect-square';

  // General rule: use colSpan/rowSpan
  return `aspect-[${c}/${r}]`;
};

  const shouldCenterCell = (item, sectionItems, itemIndex) => {
    // Check if this is an odd leftover cell that should be centered and full width
    const remainingItems = sectionItems.slice(itemIndex);
    const totalSpan = remainingItems.reduce((sum, item) => sum + (item.colSpan || 1), 0);
    return totalSpan === 1 && itemIndex === sectionItems.length - 1;
  };

  const renderGridItem = (item, index, sectionItems) => {
    const isHovered = hoveredItem === item.id;
    const hasHoverEffect = item.caption || item.link;
    const shouldCenter = shouldCenterCell(item, sectionItems, index);

    return (
      <div
        key={item.id}
        className={`
          ${shouldCenter ? 'col-span-2 md:col-span-1 mx-auto w-full max-w-md' : getGridColSpan(item.colSpan || 1)}
          ${getGridRowSpan(item.rowSpan || 1)}
          ${getAspectRatio(item.colSpan || 1, item.rowSpan || 1)}
          ${item.backgroundColor || 'bg-gray-200'}
          ${item.customClasses || ''}
          rounded
          overflow-hidden
          relative
          group
          transition-all duration-500 ease-out
          ${hasHoverEffect ? 'cursor-pointer hover:shadow-2xl hover:shadow-black/20' : ''}
          ${isHovered ? 'scale-[1.02] -rotate-1' : ''}
        `}
        onMouseEnter={() => hasHoverEffect && setHoveredItem(item.id)}
        onMouseLeave={() => hasHoverEffect && setHoveredItem(null)}
        onClick={() => item.link && window.open(item.link, '_blank')}
      >
        {/* Background Content */}
        <div className={`w-full h-full flex items-center justify-center transition-all duration-500 ${isHovered ? 'scale-110 blur-sm' : ''} ${item.image ? 'p-0' : 'p-6'}`}>
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.alt || item.title} 
              className="w-full h-full object-cover"
            />
          ) : item.icon ? (
            <div className="text-5xl md:text-6xl">{item.icon}</div>
          ) : (
            <div className="text-center max-w-full">
              {item.title && (
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight mb-2 font-inter">
                  {item.title}
                </h3>
              )}
              {item.subtitle && (
                <p className="text-sm md:text-base text-gray-600 leading-relaxed font-inter">
                  {item.subtitle}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Elegant Hover Overlay */}
        {hasHoverEffect && (
          <>
            {/* Gradient backdrop */}
            <div 
              className={`
                absolute inset-0 
                bg-gradient-to-br from-black/70 via-black/50 to-transparent
                transition-all duration-500 ease-out
                ${isHovered ? 'opacity-100' : 'opacity-0'}
              `}
            />
            
            {/* Animated border */}
            <div 
              className={`
                absolute inset-0 rounded-xl
                bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20
                transition-all duration-500 ease-out
                ${isHovered ? 'opacity-100 animate-pulse' : 'opacity-0'}
              `}
            //   style={{
            //     background: isHovered ? 
            //       'linear-gradient(45deg, rgba(59,130,246,0.3), rgba(168,85,247,0.3), rgba(236,72,153,0.3))' : 
            //       'transparent'
            //   }}
            />

            {/* Content overlay */}
            <div 
              className={`
                absolute inset-0 
                flex items-center justify-center p-6
                transition-all duration-500 ease-out
                ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <div className="text-center text-white transform transition-all duration-500">
                {item.caption && (
                  <p className="text-lg md:text-xl font-semibold mb-4 tracking-wide drop-shadow-lg font-inter">
                    {item.caption}
                  </p>
                )}
                {item.link && (
                  <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 font-inter">
                    <span className="text-sm font-medium">Explore</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Subtle glow effect */}
            <div 
              className={`
                absolute -inset-1 rounded-xl
                bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 
                blur-lg
                transition-all duration-500
                ${isHovered ? 'opacity-60' : 'opacity-0'}
              `}
              style={{ zIndex: -1 }}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 font-inter">
      {/* Header */}
      <div className="mb-8 md:mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 tracking-tight">
          Portfolio Garden 🌱
        </h1>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Informal collection of mini projects, thoughts, & explorations
        </p>
      </div>

      {/* Grid Sections */}
      <div className="space-y-6 md:space-y-8">
        {Object.entries(sections).map(([sectionKey, items], sectionIndex) => (
          <div 
            key={sectionKey}
            className={`
              grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-min items-start
              ${sectionIndex > 0 ? 'mt-8 md:mt-12' : ''}
            `}
            style={{
              marginTop: sectionIndex > 0 ? `${items[0]?.sectionSpacing || 48}px` : 0
            }}
          >
            {items.map((item, index) => renderGridItem(item, index, items))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BentoGrid;