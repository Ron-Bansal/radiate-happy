// "use client"
// import { useState, useEffect, useRef } from 'react';

// const CSSRedBlueLensEffect = () => {
//   const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
//   const [lensSize, setLensSize] = useState(60);
//   const [activeFilter, setActiveFilter] = useState('none'); // 'none', 'red', or 'blue'
//   const containerRef = useRef(null);
//   const targetSizeRef = useRef(60);
  
//   // Animation loop for smooth size transitions
//   useEffect(() => {
//     let animationId;
    
//     const animateSize = () => {
//       setLensSize(current => {
//         const target = targetSizeRef.current;
//         const diff = target - current;
        
//         // If we're close enough, snap to target
//         if (Math.abs(diff) < 0.5) return target;
        
//         // Otherwise move towards target with easing
//         return current + (diff * 0.15);
//       });
      
//       animationId = requestAnimationFrame(animateSize);
//     };
    
//     animationId = requestAnimationFrame(animateSize);
    
//     return () => cancelAnimationFrame(animationId);
//   }, []);
  
//   // Set up event listeners
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;
    
//     const handleMouseMove = (e) => {
//       const rect = container.getBoundingClientRect();
//       setMousePos({
//         x: ((e.clientX - rect.left) / rect.width) * 100,
//         y: ((e.clientY - rect.top) / rect.height) * 100
//       });
//     };
    
//     const handleMouseDown = (e) => {
//       e.preventDefault();
      
//       // For trackpads, use ctrl+click for right click equivalent
//       if (e.ctrlKey || e.button === 2) {
//         setActiveFilter('blue');
//         targetSizeRef.current = 120; // Grow lens
//       } else {
//         setActiveFilter('red');
//         targetSizeRef.current = 120; // Grow lens
//       }
//     };
    
//     const handleMouseUp = () => {
//       setActiveFilter('none');
//       targetSizeRef.current = 60; // Shrink lens
//     };
    
//     const preventContextMenu = (e) => {
//       e.preventDefault();
//       return false;
//     };
    
//     // Add event listeners
//     container.addEventListener('mousemove', handleMouseMove);
//     container.addEventListener('mousedown', handleMouseDown);
//     window.addEventListener('mouseup', handleMouseUp);
//     container.addEventListener('contextmenu', preventContextMenu);
    
//     // Add keyboard controls
//     const handleKeyDown = (e) => {
//       if (e.key === 'r') {
//         setActiveFilter('red');
//         targetSizeRef.current = 120;
//       } else if (e.key === 'b') {
//         setActiveFilter('blue');
//         targetSizeRef.current = 120;
//       }
//     };
    
//     const handleKeyUp = (e) => {
//       if (e.key === 'r' || e.key === 'b') {
//         setActiveFilter('none');
//         targetSizeRef.current = 60;
//       }
//     };
    
//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);
    
//     return () => {
//       container.removeEventListener('mousemove', handleMouseMove);
//       container.removeEventListener('mousedown', handleMouseDown);
//       window.removeEventListener('mouseup', handleMouseUp);
//       container.removeEventListener('contextmenu', preventContextMenu);
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//     };
//   }, []);
  
//   // Calculate lens styles
//   const getLensStyle = () => {
//     return {
//       left: `${mousePos.x}%`,
//       top: `${mousePos.y}%`,
//       width: `${lensSize}px`,
//       height: `${lensSize}px`,
//       transform: 'translate(-50%, -50%)',
//       borderRadius: '50%',
//       position: 'absolute',
//       pointerEvents: 'none',
//       boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
//       border: `2px solid ${
//         activeFilter === 'red' ? 'red' : 
//         activeFilter === 'blue' ? 'blue' : 
//         '#333'
//       }`,
//       mixBlendMode: 
//         activeFilter === 'red' ? 'screen' : 
//         activeFilter === 'blue' ? 'screen' : 
//         'normal',
//       backgroundColor: 
//         activeFilter === 'red' ? 'rgba(255, 0, 0, 0.8)' : 
//         activeFilter === 'blue' ? 'rgba(0, 0, 255, 0.8)' : 
//         'transparent',
//       zIndex: 20,
//       transition: 'background-color 0.15s ease',
//     };
//   };

//   // Get background image style
//   const getRedImageStyle = () => {
//     return {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       // backgroundImage: 'url(/api/placeholder/800/500)',
//       backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/877/162/432/3d-animals-red-blue-wallpaper-preview.jpg)',
//       backgroundSize: 'contain',
//       filter: 'brightness(1.2) contrast(1.1) saturate(1.5)',
//       mixBlendMode: 'multiply',
//       opacity: activeFilter === 'blue' ? 0 : 1, // Hide red layer in blue lens
//       zIndex: 10,
//     };
//   };

//   const getBlueImageStyle = () => {
//     return {
//       position: 'absolute',
//       top: '5px',
//       left: '5px', // Offset for 3D effect
//       width: '100%',
//       height: '100%',
//       // backgroundImage: 'url(/api/placeholder/800/500)',
//       backgroundImage: 'url(https://i.pinimg.com/736x/bc/e2/d4/bce2d451d5aebeadce5d1791f8f700cf.jpg)',
//       backgroundSize: 'contain',
//       filter: 'brightness(1.2) contrast(1.1) saturate(1.5) hue-rotate(240deg)',
//       mixBlendMode: 'multiply',
//       opacity: activeFilter === 'red' ? 0 : 1, // Hide blue layer in red lens
//       zIndex: 10,
//     };
//   };

//   // Create mask elements for the lens area
//   const getMaskStyles = () => {
//     return {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       zIndex: 15,
//       maskImage: `radial-gradient(circle ${lensSize/2}px at ${mousePos.x}% ${mousePos.y}%, transparent 50%, black 51%)`,
//       WebkitMaskImage: `radial-gradient(circle ${lensSize/2}px at ${mousePos.x}% ${mousePos.y}%, transparent 50%, black 51%)`,
//       display: activeFilter !== 'none' ? 'block' : 'none',
//     };
//   };

//   return (
//     <div className="flex flex-col items-center w-full h-full">
//       <h2 className="text-2xl font-bold mb-4">CSS Red/Blue Lens Effect</h2>
//       <p className="mb-4 text-gray-700">
//         Left click for red lens, Ctrl+Click or right click for blue lens.
//         <br/>
//         You can also use keyboard: hold 'R' for red or 'B' for blue.
//         <br/>
//         <span className="text-blue-600">Trackpad users: Use Ctrl+Click for blue lens!</span>
//       </p>
      
//       <div 
//         ref={containerRef}
//         className="relative border border-gray-300 rounded-lg overflow-hidden" 
//         style={{ width: '800px', height: '500px', cursor: 'none' }}
//       >
//         {/* Background layers */}
//         <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//           {/* Create a checkerboard pattern as base */}
//           <div 
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               width: '100%',
//               height: '100%',
//               backgroundImage: `
//                 linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
//                 linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
//                 linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
//                 linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
//               `,
//               backgroundSize: '20px 20px',
//               backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
//               zIndex: 1,
//             }}
//           />
          
//           {/* Red layer */}
//           <div style={getRedImageStyle()} />
          
//           {/* Blue layer (with offset) */}
//           <div style={getBlueImageStyle()} />
          
//           {/* Mask that hides everything except the lens area */}
//           <div style={getMaskStyles()} />
          
//           {/* The lens element */}
//           <div style={getLensStyle()} />
//         </div>

//         {/* Debug info overlay */}
//         <div 
//           style={{
//             position: 'absolute',
//             top: '10px',
//             left: '10px',
//             backgroundColor: 'rgba(255, 255, 255, 0.7)',
//             padding: '5px',
//             borderRadius: '4px',
//             fontSize: '12px',
//             zIndex: 30,
//           }}
//         >
//           Filter: {activeFilter} | Size: {lensSize.toFixed(1)}px
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CSSRedBlueLensEffect;

"use client"
import { useState, useEffect, useRef } from 'react';

const UniversalRedBlueLens = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [lensSize, setLensSize] = useState(60);
  const [activeFilter, setActiveFilter] = useState('none'); // 'none', 'red', or 'blue'
  const containerRef = useRef(null);
  const targetSizeRef = useRef(60);
  
  // Animation loop for smooth size transitions
  useEffect(() => {
    let animationId;
    
    const animateSize = () => {
      setLensSize(current => {
        const target = targetSizeRef.current;
        const diff = target - current;
        
        // If we're close enough, snap to target
        if (Math.abs(diff) < 0.5) return target;
        
        // Otherwise move towards target with easing
        return current + (diff * 0.15);
      });
      
      animationId = requestAnimationFrame(animateSize);
    };
    
    animationId = requestAnimationFrame(animateSize);
    
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  // Set up event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    const handleMouseDown = (e) => {
      e.preventDefault();
      
      // For trackpads, use ctrl+click for right click equivalent
      if (e.ctrlKey || e.button === 2) {
        setActiveFilter('blue');
        targetSizeRef.current = 120; // Grow lens
      } else {
        setActiveFilter('red');
        targetSizeRef.current = 120; // Grow lens
      }
    };
    
    const handleMouseUp = () => {
      setActiveFilter('none');
      targetSizeRef.current = 60; // Shrink lens
    };
    
    const preventContextMenu = (e) => {
      e.preventDefault();
      return false;
    };
    
    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('contextmenu', preventContextMenu);
    
    // Add keyboard controls
    const handleKeyDown = (e) => {
      if (e.key === 'r') {
        setActiveFilter('red');
        targetSizeRef.current = 120;
      } else if (e.key === 'b') {
        setActiveFilter('blue');
        targetSizeRef.current = 120;
      }
    };
    
    const handleKeyUp = (e) => {
      if (e.key === 'r' || e.key === 'b') {
        setActiveFilter('none');
        targetSizeRef.current = 60;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('contextmenu', preventContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Sample stereoscopic image - replace with your own
  // const anaglyphImageUrl = "https://c4.wallpaperflare.com/wallpaper/877/162/432/3d-animals-red-blue-wallpaper-preview.jpg";
  const anaglyphImageUrl = "https://i.pinimg.com/736x/bc/e2/d4/bce2d451d5aebeadce5d1791f8f700cf.jpg";

  return (
    <div className="flex flex-col items-center w-full h-full">
      <h2 className="text-2xl font-bold mb-4">Universal Red/Blue Lens Effect</h2>
      <p className="mb-4 text-gray-700">
        Works with any stereoscopic/anaglyph image. 
        Left click for red lens, Ctrl+Click or right click for blue lens.
        <br/>
        You can also use keyboard: hold &apos;R&apos; for red or &apos;B&apos; for blue.
      </p>
      
      <div 
        ref={containerRef}
        className="relative border border-gray-300 rounded-lg overflow-hidden" 
        style={{ 
          width: '800px', 
          height: '500px', 
          cursor: 'none',
          position: 'relative',
        }}
      >
        {/* The main anaglyph image */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${anaglyphImageUrl})`,
            backgroundSize: 'contain',
          }}
        />
        
        {/* Lens filter effect */}
        {activeFilter !== 'none' && (
          <div 
            style={{
              position: 'absolute',
              left: mousePos.x,
              top: mousePos.y,
              width: lensSize,
              height: lensSize,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              overflow: 'hidden',
              border: `2px solid ${activeFilter === 'red' ? 'red' : 'blue'}`,
              pointerEvents: 'none',
              zIndex: 20,
            }}
          >
            {/* The "lens" content */}
            <div
              style={{
                position: 'absolute',
                top: -mousePos.y + lensSize/2,
                left: -mousePos.x + lensSize/2,
                width: '800px',
                height: '500px',
                backgroundImage: `url(${anaglyphImageUrl})`,
                backgroundSize: 'contain',
                filter: activeFilter === 'red' 
                  ? 'url(#red-filter)' 
                  : 'url(#blue-filter)',
              }}
            />
          </div>
        )}
        
        {/* SVG filters for color isolation */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            {/* Red filter: Keeps red, removes blue/green */}
            <filter id="red-filter">
              <feColorMatrix type="matrix" values="
                1 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 1 0
              "/>
            </filter>
            
            {/* Blue filter: Keeps blue, removes red/green */}
            <filter id="blue-filter">
              <feColorMatrix type="matrix" values="
                0 0 0 0 0
                0 0 0 0 0
                0 0 1 0 0
                0 0 0 1 0
              "/>
            </filter>
          </defs>
        </svg>
        
        {/* Debug info overlay */}
        <div 
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            padding: '5px',
            borderRadius: '4px',
            fontSize: '12px',
            zIndex: 30,
          }}
        >
          Filter: {activeFilter} | Size: {lensSize.toFixed(1)}px
        </div>
      </div>
      
      {/* Additional examples of anaglyph images */}
      <div className="mt-4 flex gap-4 flex-wrap justify-center">
        <div className="w-64 h-48 border rounded overflow-hidden">
          <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
            Example 1
          </div>
        </div>
        <div className="w-64 h-48 border rounded overflow-hidden">
          <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
            Example 2
          </div>
        </div>
        <div className="w-64 h-48 border rounded overflow-hidden">
          <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
            Example 3
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-100 rounded-lg max-w-xl">
        <h3 className="font-bold text-lg">How it works:</h3>
        <p>
          This solution uses advanced SVG color matrix filters to isolate either the red or blue 
          channel from any stereoscopic image. The lens creates a circular window where only 
          one color channel is visible, simulating how 3D glasses work in real life.
        </p>
        <p className="mt-2">
          To use with your own image, simply replace the image URL with any anaglyph/stereoscopic image.
          This technique works with any image that has red/blue (or red/cyan) 3D effects built in.
        </p>
      </div>
    </div>
  );
};

export default UniversalRedBlueLens;