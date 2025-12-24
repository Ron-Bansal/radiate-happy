// "use client"
// import React, { useState, useRef, useEffect } from 'react';

// export default function MSPaintWebcam() {
//   const [tool, setTool] = useState('pencil');
//   const [primaryColor, setPrimaryColor] = useState('#000000');
//   const [secondaryColor, setSecondaryColor] = useState('#ffffff');
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [webcamColors, setWebcamColors] = useState(Array(12).fill('#808080'));
//   const [webcamPos, setWebcamPos] = useState({ x: 200, y: 150, width: 320, height: 240 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [isResizing, setIsResizing] = useState(false);
//   const [resizeCorner, setResizeCorner] = useState('');
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const [audioData, setAudioData] = useState(Array(20).fill(0));
  
//   const containerRef = useRef(null);
//   const videoRef = useRef(null);
//   const hiddenVideoRef = useRef(null);
//   const drawingCanvasRef = useRef(null);
//   const audioContextRef = useRef(null);
//   const analyserRef = useRef(null);
//   const animationFrameRef = useRef(null);

//   // Initialize webcam and audio
//   useEffect(() => {
//     const initMedia = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ 
//           video: true, 
//           audio: true 
//         });
        
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//         if (hiddenVideoRef.current) {
//           hiddenVideoRef.current.srcObject = stream;
//         }

//         const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//         const analyser = audioContext.createAnalyser();
//         analyser.fftSize = 64;
//         analyser.smoothingTimeConstant = 0.8;
//         const source = audioContext.createMediaStreamSource(stream);
//         source.connect(analyser);
        
//         audioContextRef.current = audioContext;
//         analyserRef.current = analyser;

//         const updateAudio = () => {
//           const dataArray = new Uint8Array(analyser.frequencyBinCount);
//           analyser.getByteFrequencyData(dataArray);
//           setAudioData(Array.from(dataArray).slice(0, 20));
//           animationFrameRef.current = requestAnimationFrame(updateAudio);
//         };
//         updateAudio();

//       } catch (err) {
//         console.error('Error accessing media:', err);
//       }
//     };

//     initMedia();

//     return () => {
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, []);

//   // Extract colors from webcam
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (hiddenVideoRef.current && hiddenVideoRef.current.readyState === 4) {
//         const canvas = document.createElement('canvas');
//         const w = hiddenVideoRef.current.videoWidth;
//         const h = hiddenVideoRef.current.videoHeight;
//         canvas.width = w;
//         canvas.height = h;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(hiddenVideoRef.current, 0, 0, w, h);
        
//         const colors = [];
//         for (let row = 0; row < 2; row++) {
//           for (let col = 0; col < 6; col++) {
//             const sampleWidth = Math.floor(w / 6);
//             const sampleHeight = Math.floor(h / 2);
//             const x = col * sampleWidth + sampleWidth / 4;
//             const y = row * sampleHeight + sampleHeight / 4;
//             const sampleSize = Math.min(sampleWidth, sampleHeight) / 2;
            
//             try {
//               const imageData = ctx.getImageData(x, y, sampleSize, sampleSize);
//               const data = imageData.data;
              
//               let r = 0, g = 0, b = 0, count = 0;
//               for (let j = 0; j < data.length; j += 4) {
//                 r += data[j];
//                 g += data[j + 1];
//                 b += data[j + 2];
//                 count++;
//               }
              
//               r = Math.floor(r / count);
//               g = Math.floor(g / count);
//               b = Math.floor(b / count);
              
//               colors.push(`rgb(${r}, ${g}, ${b})`);
//             } catch (e) {
//               colors.push('#808080');
//             }
//           }
//         }
//         setWebcamColors(colors);
//       }
//     }, 300);

//     return () => clearInterval(interval);
//   }, []);

//   // Drawing functions
//   const getCanvasCoords = (e) => {
//     const canvas = drawingCanvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     return {
//       x: (e.clientX - rect.left) * (canvas.width / rect.width),
//       y: (e.clientY - rect.top) * (canvas.height / rect.height)
//     };
//   };

//   const startDrawing = (e) => {
//     const { x, y } = getCanvasCoords(e);
    
//     if (tool === 'fill') {
//       floodFill(x, y);
//       return;
//     }
    
//     setIsDrawing(true);
//     const canvas = drawingCanvasRef.current;
//     const ctx = canvas.getContext('2d');
//     ctx.strokeStyle = primaryColor;
//     ctx.fillStyle = primaryColor;
//     ctx.lineWidth = 2;
//     ctx.lineCap = 'round';
//     ctx.lineJoin = 'round';
    
//     if (tool === 'pencil') {
//       ctx.beginPath();
//       ctx.moveTo(x, y);
//     } else if (tool === 'rectangle') {
//       setDragStart({ x, y });
//     }
//   };

//   const draw = (e) => {
//     if (!isDrawing) return;
    
//     const { x, y } = getCanvasCoords(e);
//     const ctx = drawingCanvasRef.current.getContext('2d');
    
//     if (tool === 'pencil') {
//       ctx.lineTo(x, y);
//       ctx.stroke();
//     }
//   };

//   const stopDrawing = (e) => {
//     if (!isDrawing) return;
    
//     if (tool === 'rectangle') {
//       const { x, y } = getCanvasCoords(e);
//       const ctx = drawingCanvasRef.current.getContext('2d');
      
//       const width = x - dragStart.x;
//       const height = y - dragStart.y;
//       ctx.strokeRect(dragStart.x, dragStart.y, width, height);
//     }
    
//     setIsDrawing(false);
//   };

//   const floodFill = (startX, startY) => {
//     const canvas = drawingCanvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const data = imageData.data;
    
//     startX = Math.floor(startX);
//     startY = Math.floor(startY);
    
//     const targetColor = getPixelColor(data, startX, startY, canvas.width);
//     const fillColor = hexToRgb(primaryColor);
    
//     if (colorsMatch(targetColor, fillColor)) return;
    
//     const stack = [[startX, startY]];
//     const visited = new Set();
    
//     while (stack.length > 0 && visited.size < 50000) {
//       const [x, y] = stack.pop();
//       const key = `${x},${y}`;
      
//       if (visited.has(key)) continue;
//       if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;
      
//       const currentColor = getPixelColor(data, x, y, canvas.width);
//       if (!colorsMatch(currentColor, targetColor)) continue;
      
//       visited.add(key);
//       setPixelColor(data, x, y, canvas.width, fillColor);
      
//       stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
//     }
    
//     ctx.putImageData(imageData, 0, 0);
//   };

//   const getPixelColor = (data, x, y, width) => {
//     const index = (y * width + x) * 4;
//     return [data[index], data[index + 1], data[index + 2], data[index + 3]];
//   };

//   const setPixelColor = (data, x, y, width, color) => {
//     const index = (y * width + x) * 4;
//     data[index] = color[0];
//     data[index + 1] = color[1];
//     data[index + 2] = color[2];
//     data[index + 3] = 255;
//   };

//   const colorsMatch = (a, b) => {
//     return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
//   };

//   const hexToRgb = (hex) => {
//     if (hex.startsWith('rgb')) {
//       const matches = hex.match(/\d+/g);
//       return matches ? [parseInt(matches[0]), parseInt(matches[1]), parseInt(matches[2])] : [0, 0, 0];
//     }
//     const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     return result ? [
//       parseInt(result[1], 16),
//       parseInt(result[2], 16),
//       parseInt(result[3], 16)
//     ] : [0, 0, 0];
//   };

//   // Webcam dragging and resizing
//   const handleWebcamMouseDown = (e, action, corner = '') => {
//     e.stopPropagation();
//     if (action === 'drag') {
//       setIsDragging(true);
//       setDragStart({ x: e.clientX - webcamPos.x, y: e.clientY - webcamPos.y });
//     } else if (action === 'resize') {
//       setIsResizing(true);
//       setResizeCorner(corner);
//       setDragStart({ 
//         x: e.clientX, 
//         y: e.clientY,
//         startWidth: webcamPos.width,
//         startHeight: webcamPos.height,
//         startX: webcamPos.x,
//         startY: webcamPos.y
//       });
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       setWebcamPos(prev => ({
//         ...prev,
//         x: e.clientX - dragStart.x,
//         y: e.clientY - dragStart.y
//       }));
//     } else if (isResizing) {
//       const deltaX = e.clientX - dragStart.x;
//       const deltaY = e.clientY - dragStart.y;
      
//       setWebcamPos(prev => {
//         let newState = { ...prev };
        
//         if (resizeCorner === 'se') {
//           newState.width = Math.max(160, dragStart.startWidth + deltaX);
//           newState.height = Math.max(120, dragStart.startHeight + deltaY);
//         } else if (resizeCorner === 'sw') {
//           newState.width = Math.max(160, dragStart.startWidth - deltaX);
//           newState.height = Math.max(120, dragStart.startHeight + deltaY);
//           newState.x = dragStart.startX + (dragStart.startWidth - newState.width);
//         } else if (resizeCorner === 'ne') {
//           newState.width = Math.max(160, dragStart.startWidth + deltaX);
//           newState.height = Math.max(120, dragStart.startHeight - deltaY);
//           newState.y = dragStart.startY + (dragStart.startHeight - newState.height);
//         } else if (resizeCorner === 'nw') {
//           newState.width = Math.max(160, dragStart.startWidth - deltaX);
//           newState.height = Math.max(120, dragStart.startHeight - deltaY);
//           newState.x = dragStart.startX + (dragStart.startWidth - newState.width);
//           newState.y = dragStart.startY + (dragStart.startHeight - newState.height);
//         }
        
//         return newState;
//       });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     setIsResizing(false);
//   };

//   const clearCanvas = () => {
//     const canvas = drawingCanvasRef.current;
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//   };

//   const saveImage = () => {
//     const tempCanvas = document.createElement('canvas');
//     const container = containerRef.current;
//     const rect = container.getBoundingClientRect();
//     tempCanvas.width = rect.width;
//     tempCanvas.height = rect.height;
//     const ctx = tempCanvas.getContext('2d');
    
//     ctx.fillStyle = '#ffffff';
//     ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    
//     const scale = tempCanvas.width / drawingCanvasRef.current.width;
//     ctx.drawImage(drawingCanvasRef.current, 0, 0, tempCanvas.width, tempCanvas.height);
//     ctx.drawImage(videoRef.current, webcamPos.x * scale, webcamPos.y * scale, webcamPos.width * scale, webcamPos.height * scale);
    
//     const link = document.createElement('a');
//     link.download = 'paint-webcam.png';
//     link.href = tempCanvas.toDataURL();
//     link.click();
//   };

//   return (
//     <div className="flex flex-col h-screen bg-[#c0c0c0]" style={{ fontFamily: 'MS Sans Serif, sans-serif' }}>
//       {/* Title bar */}
//       <div className="bg-[#000080] text-white px-1 py-0.5 flex items-center text-sm">
//         <div className="flex items-center gap-1 flex-1">
//           <div className="w-4 h-4 bg-white flex items-center justify-center text-[10px] font-bold text-black">P</div>
//           <span className="font-bold">untitled - Paint</span>
//         </div>
//         <div className="flex gap-0.5">
//           <button className="w-4 h-4 bg-[#c0c0c0] text-black text-xs">_</button>
//           <button className="w-4 h-4 bg-[#c0c0c0] text-black text-xs">□</button>
//           <button className="w-4 h-4 bg-[#c0c0c0] text-black text-xs">×</button>
//         </div>
//       </div>

//       {/* Menu bar */}
//       <div className="bg-[#c0c0c0] border-b border-white text-xs px-1">
//         <button className="px-2 py-0.5 hover:bg-[#000080] hover:text-white">File</button>
//         <button onClick={clearCanvas} className="px-2 py-0.5 hover:bg-[#000080] hover:text-white">Edit</button>
//         <button className="px-2 py-0.5 hover:bg-[#000080] hover:text-white">View</button>
//         <button className="px-2 py-0.5 hover:bg-[#000080] hover:text-white">Image</button>
//         <button className="px-2 py-0.5 hover:bg-[#000080] hover:text-white">Options</button>
//         <button onClick={saveImage} className="px-2 py-0.5 hover:bg-[#000080] hover:text-white">Help</button>
//       </div>

//       {/* Main content */}
//       <div className="flex flex-1 overflow-hidden border-t-2 border-l-2 border-white">
//         {/* Tool palette */}
//         <div className="bg-[#c0c0c0] p-1 border-r-2 border-gray-500 border-b-2">
//           <div className="grid grid-cols-2 gap-0">
//             {[
//               { icon: '✎', name: 'pencil' },
//               { icon: '▭', name: 'rectangle' },
//               { icon: '💧', name: 'fill' },
//             ].map(({ icon, name }) => (
//               <button
//                 key={name}
//                 onClick={() => setTool(name)}
//                 className={`w-7 h-7 border flex items-center justify-center text-sm ${
//                   tool === name 
//                     ? 'border-gray-800 bg-white shadow-inner' 
//                     : 'border-t-white border-l-white border-r-gray-800 border-b-gray-800 bg-[#c0c0c0]'
//                 }`}
//               >
//                 {icon}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Canvas area */}
//         <div 
//           ref={containerRef}
//           className="flex-1 relative overflow-hidden bg-white border-2 border-gray-800"
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//         >
//           <canvas
//             ref={drawingCanvasRef}
//             width={1600}
//             height={1200}
//             className="absolute inset-0 w-full h-full"
//             style={{ cursor: 'crosshair' }}
//             onMouseDown={startDrawing}
//             onMouseMove={draw}
//             onMouseUp={stopDrawing}
//             onMouseLeave={stopDrawing}
//           />
          
//           {/* Webcam element */}
//           <div
//             className="absolute border-2 border-dashed border-black bg-black"
//             style={{
//               left: webcamPos.x,
//               top: webcamPos.y,
//               width: webcamPos.width,
//               height: webcamPos.height
//             }}
//           >
//             <div 
//               className="absolute inset-0 cursor-move"
//               onMouseDown={(e) => handleWebcamMouseDown(e, 'drag')}
//             >
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 playsInline
//                 muted
//                 className="w-full h-full object-cover"
//               />
//             </div>
            
//             {/* Resize handles */}
//             <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-black cursor-nwse-resize"
//               onMouseDown={(e) => handleWebcamMouseDown(e, 'resize', 'nw')} />
//             <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-black cursor-nesw-resize"
//               onMouseDown={(e) => handleWebcamMouseDown(e, 'resize', 'ne')} />
//             <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-black cursor-nesw-resize"
//               onMouseDown={(e) => handleWebcamMouseDown(e, 'resize', 'sw')} />
//             <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-black cursor-nwse-resize"
//               onMouseDown={(e) => handleWebcamMouseDown(e, 'resize', 'se')} />
//           </div>

//           {/* Audio visualizer */}
//           <div className="absolute bottom-2 left-2 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-800 p-1">
//             <div className="flex items-end gap-px h-8 w-20">
//               {audioData.map((value, i) => {
//                 const height = Math.max(2, (value / 255) * 32);
//                 return (
//                   <div
//                     key={i}
//                     className="flex-1 bg-black"
//                     style={{ height: `${height}px` }}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Color palette */}
//       <div className="bg-[#c0c0c0] p-1 border-t-2 border-white flex items-start gap-2">
//         {/* Color swatches */}
//         <div className="flex flex-col items-center">
//           <div className="relative w-8 h-8 border-2 border-gray-800">
//             <div 
//               className="absolute inset-0 border-2 border-r-0 border-b-0 border-white"
//               style={{ backgroundColor: primaryColor }}
//             />
//             <div 
//               className="absolute right-0 bottom-0 w-4 h-4 border-2 border-l-0 border-t-0 border-gray-800"
//               style={{ backgroundColor: secondaryColor }}
//             />
//           </div>
//         </div>

//         {/* Palette colors */}
//         <div className="grid grid-cols-6 gap-0">
//           {webcamColors.map((color, i) => (
//             <button
//               key={i}
//               className="w-4 h-4 border border-gray-400"
//               style={{ backgroundColor: color }}
//               onClick={() => setPrimaryColor(color)}
//               onContextMenu={(e) => {
//                 e.preventDefault();
//                 setSecondaryColor(color);
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Status bar */}
//       <div className="bg-[#c0c0c0] border-t-2 border-white text-xs px-1 py-0.5 flex gap-2">
//         <div className="border-t border-l border-gray-800 border-r border-b border-white px-1">For Help, click Help Topics on the Help Menu.</div>
//       </div>

//       {/* Hidden video for color sampling */}
//       <video
//         ref={hiddenVideoRef}
//         autoPlay
//         playsInline
//         muted
//         className="hidden"
//       />
//     </div>
//   );
// }

"use client"
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   Brush,
//   Square,
//   Slash,
//   Type as TypeIcon,
//   PaintBucket,
//   Undo2,
//   Redo2,
// } from "lucide-react";

// /**
//  * MS Paint-ish UI (responsive) + V4.1 fixes
//  * Fixes:
//  * - Tools not working: text overlay no longer steals pointer events unless Text tool is active.
//  * - Rectangle options: each option shows a single icon (no duplicated 3-icon glyph).
//  * - Text options UI: more MS Paint-like (compact inset controls).
//  *
//  * Features:
//  * - Tools: brush, rectangle, line, text, fill
//  * - Palette: 12 colors (2x6)
//  * - Secondary color use:
//  *   - Right-click on canvas draws with secondary
//  *   - Press X to swap primary/secondary
//  *   - Click the color wells to swap (tooltip hints X)
//  * - Undo/Redo: snapshot stack (canvas-only)
//  * - Brush options panel (classic-ish) + a couple extra tips
//  * - Rectangle options (outline / fill / outline+fill)
//  * - Text tool: non-raster text elements (editable/movable/resizable) rendered as overlay
//  */
// export default function MSPaintV0() {
//   const palette = useMemo(
//     () => [
//       "#000000",
//       "#7f7f7f",
//       "#ffffff",
//       "#ff0000",
//       "#ffff00",
//       "#00ff00",
//       "#00ffff",
//       "#0000ff",
//       "#ff00ff",
//       "#ff7f00",
//       "#7f3f00",
//       "#3f3f3f",
//     ],
//     []
//   );

//   type Tool = "brush" | "rect" | "line" | "text" | "fill";
//   const [tool, setTool] = useState<Tool>("brush");
//   const [primary, setPrimary] = useState(palette[0]);
//   const [secondary, setSecondary] = useState(palette[2]);

//   // keep refs in sync so swap is always correct
//   const primaryRef = useRef(primary);
//   const secondaryRef = useRef(secondary);
//   useEffect(() => void (primaryRef.current = primary), [primary]);
//   useEffect(() => void (secondaryRef.current = secondary), [secondary]);

//   const swapColors = () => {
//     const p = primaryRef.current;
//     const s = secondaryRef.current;
//     setPrimary(s);
//     setSecondary(p);
//   };

//   // Brush presets (classic-ish) + a couple extra
//   type BrushKind = "round" | "square" | "calligraphy" | "spray" | "marker";
//   type BrushPreset = {
//     id: string;
//     kind: BrushKind;
//     size: number;
//     angleDeg?: number; // for calligraphy
//     alpha?: number; // for marker
//     density?: number; // for spray
//   };

//   const brushPresets: BrushPreset[] = useMemo(
//     () => [
//       { id: "r2", kind: "round", size: 2 },
//       { id: "r4", kind: "round", size: 4 },
//       { id: "r6", kind: "round", size: 6 },
//       { id: "r10", kind: "round", size: 10 },
//       { id: "s2", kind: "square", size: 2 },
//       { id: "s4", kind: "square", size: 4 },
//       { id: "s6", kind: "square", size: 6 },
//       { id: "s10", kind: "square", size: 10 },
//       { id: "c10", kind: "calligraphy", size: 10, angleDeg: 35 },
//       { id: "c16", kind: "calligraphy", size: 16, angleDeg: 35 },
//       { id: "m12", kind: "marker", size: 12, alpha: 0.35 },
//       { id: "spr", kind: "spray", size: 14, density: 22 },
//     ],
//     []
//   );

//   const [brushPresetId, setBrushPresetId] = useState<string>(brushPresets[0].id);
//   const brushPreset = useMemo(
//     () => brushPresets.find((b) => b.id === brushPresetId) ?? brushPresets[0],
//     [brushPresetId, brushPresets]
//   );

//   // Rectangle options (classic MS Paint: outline / fill / outline+fill)
//   type RectMode = "outline" | "fill" | "both";
//   const [rectMode, setRectMode] = useState<RectMode>("outline");

//   // Text options (simple, MS Paint-ish)
//   const textFonts = useMemo(
//     () => [
//       { id: "ms", name: "MS Sans Serif", css: "MS Sans Serif, Tahoma, system-ui" },
//       { id: "tahoma", name: "Tahoma", css: "Tahoma, system-ui" },
//       { id: "courier", name: "Courier New", css: "'Courier New', ui-monospace, SFMono-Regular, Menlo, monospace" },
//       { id: "georgia", name: "Georgia", css: "Georgia, serif" },
//     ],
//     []
//   );
//   const [textFontId, setTextFontId] = useState(textFonts[0].id);
//   const textFont = useMemo(
//     () => textFonts.find((f) => f.id === textFontId) ?? textFonts[0],
//     [textFontId, textFonts]
//   );
//   const [textSize, setTextSize] = useState(18);

//   type TextItem = {
//     id: string;
//     x: number; // canvas coords
//     y: number;
//     w: number; // canvas coords
//     h: number;
//     text: string;
//     fontCss: string;
//     fontName: string;
//     fontSize: number;
//     color: string; // always primary at creation time
//   };
//   const [texts, setTexts] = useState<TextItem[]>([]);
//   const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
//   const [editingTextId, setEditingTextId] = useState<string | null>(null);

//   // Canvas
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const canvasHostRef = useRef<HTMLDivElement | null>(null);
//   const appRef = useRef<HTMLDivElement | null>(null);
//   const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

//   const isDown = useRef(false);
//   const startPt = useRef<{ x: number; y: number } | null>(null);
//   const lastPt = useRef<{ x: number; y: number } | null>(null);
//   const previewSnapshot = useRef<ImageData | null>(null);
//   const drawColorRef = useRef<string>(primary);

//   // Undo/redo snapshot stacks (canvas only)
//   const undoStack = useRef<ImageData[]>([]);
//   const redoStack = useRef<ImageData[]>([]);
//   const [, bumpHistory] = useState(0);

//   const toolButtons = useMemo(
//     () =>
//       [
//         { k: "brush" as const, label: "Brush", Icon: Brush },
//         { k: "line" as const, label: "Line", Icon: Slash },
//         { k: "rect" as const, label: "Rectangle", Icon: Square },
//         { k: "fill" as const, label: "Fill", Icon: PaintBucket },
//         { k: "text" as const, label: "Text", Icon: TypeIcon },
//       ] as const,
//     []
//   );

//   function getCtx() {
//     if (!ctxRef.current && canvasRef.current) {
//       ctxRef.current = canvasRef.current.getContext("2d", {
//         willReadFrequently: true,
//       });
//     }
//     return ctxRef.current;
//   }

//   function getPos(e: React.PointerEvent) {
//     const canvas = canvasRef.current;
//     if (!canvas) return { x: 0, y: 0 };
//     const r = canvas.getBoundingClientRect();
//     const x = (e.clientX - r.left) * (canvas.width / r.width);
//     const y = (e.clientY - r.top) * (canvas.height / r.height);
//     return {
//       x: Math.max(0, Math.min(canvas.width - 1, x)),
//       y: Math.max(0, Math.min(canvas.height - 1, y)),
//     };
//   }

//   function withCtx<T>(fn: (ctx: CanvasRenderingContext2D) => T) {
//     const ctx = getCtx();
//     if (!ctx) return null;
//     return fn(ctx);
//   }

//   function setCommonStyle(ctx: CanvasRenderingContext2D, color: string) {
//     ctx.strokeStyle = color;
//     ctx.fillStyle = color;
//     ctx.imageSmoothingEnabled = false;
//     ctx.globalAlpha = 1;
//   }

//   function setStrokeStyleFromBrush(
//     ctx: CanvasRenderingContext2D,
//     color: string,
//     preset: BrushPreset
//   ) {
//     setCommonStyle(ctx, color);

//     ctx.globalAlpha = preset.alpha ?? 1;
//     ctx.lineJoin = "round";

//     if (preset.kind === "square") {
//       ctx.lineCap = "square";
//       ctx.lineWidth = preset.size;
//       return;
//     }

//     if (preset.kind === "marker") {
//       ctx.lineCap = "round";
//       ctx.lineWidth = preset.size;
//       return;
//     }

//     ctx.lineCap = "round";
//     ctx.lineWidth = preset.size;
//   }

//   function savePreviewSnapshot() {
//     const ctx = getCtx();
//     const canvas = canvasRef.current;
//     if (!ctx || !canvas) return;
//     previewSnapshot.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
//   }

//   function restorePreviewSnapshot() {
//     const ctx = getCtx();
//     const canvas = canvasRef.current;
//     if (!ctx || !canvas || !previewSnapshot.current) return;
//     ctx.putImageData(previewSnapshot.current, 0, 0);
//   }

//   function pushUndo() {
//     const ctx = getCtx();
//     const canvas = canvasRef.current;
//     if (!ctx || !canvas) return;
//     const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     undoStack.current.push(img);
//     redoStack.current = [];
//     bumpHistory((n) => n + 1);
//   }

//   function canUndo() {
//     return undoStack.current.length > 1;
//   }

//   function canRedo() {
//     return redoStack.current.length > 0;
//   }

//   function applyImage(img: ImageData) {
//     const ctx = getCtx();
//     const canvas = canvasRef.current;
//     if (!ctx || !canvas) return;

//     if (canvas.width !== img.width || canvas.height !== img.height) {
//       canvas.width = img.width;
//       canvas.height = img.height;
//     }
//     ctx.putImageData(img, 0, 0);
//   }

//   function undo() {
//     if (!canUndo()) return;
//     const current = undoStack.current.pop();
//     if (!current) return;
//     redoStack.current.push(current);
//     const prev = undoStack.current[undoStack.current.length - 1];
//     if (prev) applyImage(prev);
//     bumpHistory((n) => n + 1);
//   }

//   function redo() {
//     if (!canRedo()) return;
//     const img = redoStack.current.pop();
//     if (!img) return;
//     undoStack.current.push(img);
//     applyImage(img);
//     bumpHistory((n) => n + 1);
//   }

//   function drawBrushSegment(
//     from: { x: number; y: number },
//     to: { x: number; y: number },
//     color: string,
//     preset: BrushPreset
//   ) {
//     return withCtx((ctx) => {
//       setStrokeStyleFromBrush(ctx, color, preset);

//       if (preset.kind === "spray") {
//         const density = preset.density ?? 18;
//         const r = preset.size;

//         const dx = to.x - from.x;
//         const dy = to.y - from.y;
//         const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 3));

//         for (let s = 0; s <= steps; s++) {
//           const t = s / steps;
//           const cx = from.x + dx * t;
//           const cy = from.y + dy * t;
//           for (let i = 0; i < density; i++) {
//             const a = Math.random() * Math.PI * 2;
//             const rr = Math.random() * r;
//             const px = cx + Math.cos(a) * rr;
//             const py = cy + Math.sin(a) * rr;
//             ctx.fillRect(px, py, 1, 1);
//           }
//         }
//         ctx.globalAlpha = 1;
//         return;
//       }

//       if (preset.kind === "calligraphy") {
//         const angle = ((preset.angleDeg ?? 35) * Math.PI) / 180;
//         const w = preset.size;
//         const h = Math.max(2, Math.floor(preset.size / 3));

//         const dx = to.x - from.x;
//         const dy = to.y - from.y;
//         const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 2));

//         for (let s = 0; s <= steps; s++) {
//           const t = s / steps;
//           const cx = from.x + dx * t;
//           const cy = from.y + dy * t;
//           ctx.save();
//           ctx.translate(cx, cy);
//           ctx.rotate(angle);
//           ctx.fillRect(-w / 2, -h / 2, w, h);
//           ctx.restore();
//         }

//         ctx.globalAlpha = 1;
//         return;
//       }

//       ctx.beginPath();
//       ctx.moveTo(from.x, from.y);
//       ctx.lineTo(to.x, to.y);
//       ctx.stroke();
//       ctx.globalAlpha = 1;
//     });
//   }

//   function drawLine(a: { x: number; y: number }, b: { x: number; y: number }, color: string) {
//     return withCtx((ctx) => {
//       restorePreviewSnapshot();
//       setCommonStyle(ctx, color);
//       ctx.lineWidth = 2;
//       ctx.lineCap = "round";
//       ctx.beginPath();
//       ctx.moveTo(a.x, a.y);
//       ctx.lineTo(b.x, b.y);
//       ctx.stroke();
//     });
//   }

//   function drawRect(
//     a: { x: number; y: number },
//     b: { x: number; y: number },
//     strokeColor: string,
//     mode: RectMode
//   ) {
//     return withCtx((ctx) => {
//       restorePreviewSnapshot();

//       const x = Math.min(a.x, b.x);
//       const y = Math.min(a.y, b.y);
//       const w = Math.abs(a.x - b.x);
//       const h = Math.abs(a.y - b.y);

//       setCommonStyle(ctx, strokeColor);
//       ctx.lineWidth = 2;

//       if (mode === "fill") {
//         ctx.fillStyle = strokeColor;
//         ctx.fillRect(x, y, w, h);
//         return;
//       }

//       if (mode === "both") {
//         ctx.fillStyle = secondaryRef.current;
//         ctx.fillRect(x, y, w, h);
//         ctx.strokeStyle = strokeColor;
//         ctx.strokeRect(x, y, w, h);
//         return;
//       }

//       ctx.strokeStyle = strokeColor;
//       ctx.strokeRect(x, y, w, h);
//     });
//   }

//   function hexToRgba(hex: string) {
//     const h = hex.replace("#", "");
//     const normalized =
//       h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
//     const v = parseInt(normalized, 16);
//     const r = (v >> 16) & 255;
//     const g = (v >> 8) & 255;
//     const b = v & 255;
//     return [r, g, b, 255] as const;
//   }

//   function floodFill(x0: number, y0: number, color: string) {
//     const ctx = getCtx();
//     const canvas = canvasRef.current;
//     if (!ctx || !canvas) return;

//     const w = canvas.width;
//     const h = canvas.height;
//     const img = ctx.getImageData(0, 0, w, h);
//     const data = img.data;

//     const ix = (x0 | 0) + (y0 | 0) * w;
//     const i0 = ix * 4;

//     const target = [
//       data[i0],
//       data[i0 + 1],
//       data[i0 + 2],
//       data[i0 + 3],
//     ] as const;
//     const fill = hexToRgba(color);

//     if (
//       target[0] === fill[0] &&
//       target[1] === fill[1] &&
//       target[2] === fill[2] &&
//       target[3] === fill[3]
//     )
//       return;

//     const stack: number[] = [ix];
//     const visited = new Uint8Array(w * h);

//     const match = (i: number) => {
//       const p = i * 4;
//       return (
//         data[p] === target[0] &&
//         data[p + 1] === target[1] &&
//         data[p + 2] === target[2] &&
//         data[p + 3] === target[3]
//       );
//     };

//     const paint = (i: number) => {
//       const p = i * 4;
//       data[p] = fill[0];
//       data[p + 1] = fill[1];
//       data[p + 2] = fill[2];
//       data[p + 3] = fill[3];
//     };

//     while (stack.length) {
//       const i = stack.pop()!;
//       if (visited[i]) continue;
//       visited[i] = 1;
//       if (!match(i)) continue;

//       paint(i);

//       const x = i % w;
//       const y = (i / w) | 0;
//       if (x > 0) stack.push(i - 1);
//       if (x < w - 1) stack.push(i + 1);
//       if (y > 0) stack.push(i - w);
//       if (y < h - 1) stack.push(i + w);
//     }

//     ctx.putImageData(img, 0, 0);
//   }

//   function beginActionColorFromButton(button: number) {
//     drawColorRef.current = button === 2 ? secondaryRef.current : primaryRef.current;
//   }

//   function onPointerDown(e: React.PointerEvent) {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     beginActionColorFromButton(e.button);

//     const p = getPos(e);
//     isDown.current = true;
//     startPt.current = p;
//     lastPt.current = p;

//     if (tool === "line" || tool === "rect") {
//       savePreviewSnapshot();
//     }

//     if (tool === "fill") {
//       floodFill(p.x | 0, p.y | 0, drawColorRef.current);
//       pushUndo();
//       isDown.current = false;
//       return;
//     }

//     if (tool === "text") {
//       // Clicking canvas creates a new text element and enters edit.
//       // Clicking existing text is handled by the text layer itself.
//       const id = `t_${Math.random().toString(16).slice(2)}`;
//       const item: TextItem = {
//         id,
//         x: p.x,
//         y: p.y,
//         w: Math.max(140, textSize * 10),
//         h: Math.max(44, Math.round(textSize * 2.6)),
//         text: "",
//         fontCss: textFont.css,
//         fontName: textFont.name,
//         fontSize: textSize,
//         color: primaryRef.current,
//       };
//       setTexts((arr) => [...arr, item]);
//       setSelectedTextId(id);
//       setEditingTextId(id);
//       isDown.current = false;
//       return;
//     }

//     if (tool === "brush") {
//       drawBrushSegment(
//         p,
//         { x: p.x + 0.01, y: p.y + 0.01 },
//         drawColorRef.current,
//         brushPreset
//       );
//     }

//     canvas.setPointerCapture(e.pointerId);
//   }

//   function onPointerMove(e: React.PointerEvent) {
//     if (!isDown.current) return;
//     const p = getPos(e);

//     if (tool === "brush") {
//       const last = lastPt.current;
//       if (last) drawBrushSegment(last, p, drawColorRef.current, brushPreset);
//       lastPt.current = p;
//       return;
//     }

//     if (tool === "line") {
//       const a = startPt.current;
//       if (a) drawLine(a, p, drawColorRef.current);
//       return;
//     }

//     if (tool === "rect") {
//       const a = startPt.current;
//       if (a) drawRect(a, p, drawColorRef.current, rectMode);
//       return;
//     }
//   }

//   function onPointerUp(e: React.PointerEvent) {
//     if (!isDown.current) return;
//     isDown.current = false;

//     if (tool === "brush" || tool === "line" || tool === "rect") {
//       pushUndo();
//     }

//     startPt.current = null;
//     lastPt.current = null;

//     const canvas = canvasRef.current;
//     if (canvas) canvas.releasePointerCapture(e.pointerId);
//   }

//   // Global shortcuts: X swap colors, Cmd/Ctrl+Z undo, Cmd/Ctrl+Shift+Z redo
//   useEffect(() => {
//     const onKeyDown = (e: KeyboardEvent) => {
//       const key = e.key.toLowerCase();
//       if (key === "x") {
//         e.preventDefault();
//         swapColors();
//         return;
//       }

//       const mod = e.metaKey || e.ctrlKey;
//       if (!mod) return;

//       if (key === "z" && e.shiftKey) {
//         e.preventDefault();
//         redo();
//         return;
//       }
//       if (key === "z") {
//         e.preventDefault();
//         undo();
//       }
//     };

//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Disable context menu on app (right-click used for secondary drawing and palette)
//   useEffect(() => {
//     const el = appRef.current;
//     if (!el) return;
//     const onCtx = (ev: MouseEvent) => ev.preventDefault();
//     el.addEventListener("contextmenu", onCtx);
//     return () => el.removeEventListener("contextmenu", onCtx);
//   }, []);

//   // Resize canvas to a crisp square matching its rendered size
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const host = canvasHostRef.current;
//     if (!canvas || !host) return;

//     const ro = new ResizeObserver(() => {
//       const r = host.getBoundingClientRect();
//       const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
//       const size = Math.floor(Math.min(r.width, r.height) * dpr);
//       if (size <= 0) return;

//       const ctx = getCtx();
//       if (!ctx) return;

//       const prevW = canvas.width || 1;
//       const prevH = canvas.height || 1;
//       const old = ctx.getImageData(0, 0, prevW, prevH);

//       canvas.width = size;
//       canvas.height = size;

//       const ctx2 = getCtx();
//       if (!ctx2) return;
//       ctx2.putImageData(old, 0, 0);

//       if (undoStack.current.length === 0) {
//         undoStack.current.push(ctx2.getImageData(0, 0, canvas.width, canvas.height));
//         bumpHistory((n) => n + 1);
//       }
//     });

//     ro.observe(host);
//     return () => ro.disconnect();
//   }, []);

//   const rectModes: { k: RectMode; label: string }[] = [
//     { k: "outline", label: "Outline" },
//     { k: "fill", label: "Fill" },
//     { k: "both", label: "Outline + Fill" },
//   ];

//   const canvasCursor =
//     tool === "text" ? "text" : tool === "fill" ? "cell" : "crosshair";

//   return (
//     <div
//       ref={appRef}
//       className="min-h-screen w-full bg-[#9db3c7] flex items-center justify-center p-6 text-black"
//       style={{ fontFamily: "MS Sans Serif, Tahoma, system-ui" }}
//     >
//       <div className="w-full max-w-[980px]">
//         <div className="win95">
//           {/* Title bar */}
//           <div className="flex items-center justify-between px-2 py-1 text-white bg-gradient-to-b from-[#2f65c7] to-[#0a2a7a]">
//             <div className="flex items-center gap-2 min-w-0">
//               <div className="h-4 w-4 bg-white border border-black relative">
//                 <div
//                   className="absolute left-[2px] top-[2px] h-2.5 w-2.5 border border-black"
//                   style={{
//                     background:
//                       "radial-gradient(circle at 30% 30%, #ff4, #f80)",
//                   }}
//                 />
//               </div>
//               <div className="font-bold text-[13px] truncate">untitled - Paint</div>
//             </div>
//             <div className="flex gap-1">
//               <button className="winbtn" title="Minimize">
//                 _
//               </button>
//               <button className="winbtn" title="Maximize">
//                 ▢
//               </button>
//               <button className="winbtn winbtnClose" title="Close">
//                 ✕
//               </button>
//             </div>
//           </div>

//           {/* Menu */}
//           <div className="flex items-center justify-between gap-2 px-2 py-1 border-b border-[#7f7f7f]">
//             <div className="flex gap-2">
//               {["File", "Edit", "View", "Image", "Options", "Help"].map((m) => (
//                 <button
//                   key={m}
//                   className="px-2 py-0.5 text-[13px] hover:bg-white/30"
//                 >
//                   {m}
//                 </button>
//               ))}
//             </div>

//             <div className="flex items-center gap-1">
//               <button
//                 className="toolTop"
//                 title="Undo (Ctrl/⌘+Z)"
//                 onClick={undo}
//                 disabled={!canUndo()}
//               >
//                 <Undo2 className="h-4 w-4" />
//               </button>
//               <button
//                 className="toolTop"
//                 title="Redo (Ctrl/⌘+Shift+Z)"
//                 onClick={redo}
//                 disabled={!canRedo()}
//               >
//                 <Redo2 className="h-4 w-4" />
//               </button>
//             </div>
//           </div>

//           {/* Body */}
//           <div className="flex h-[min(62vh,620px)] min-h-[420px]">
//             {/* Tools */}
//             <div className="w-[124px] border-r border-[#7f7f7f] p-2 flex flex-col gap-2">
//               <div className="grid grid-cols-2 gap-2">
//                 {toolButtons.map(({ k, label, Icon }) => {
//                   const on = tool === k;
//                   return (
//                     <button
//                       key={k}
//                       onClick={() => {
//                         setTool(k);
//                         if (k !== "text") {
//                           setEditingTextId(null);
//                           setSelectedTextId(null);
//                         }
//                       }}
//                       className={`tool95 ${on ? "tool95On" : ""}`}
//                       title={label}
//                       aria-pressed={on}
//                     >
//                       <Icon className="h-4 w-4" strokeWidth={2} />
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* Brush options */}
//               {tool === "brush" && (
//                 <div className="winInset p-2 bg-[#d6d6d6]">
//                   <div className="grid grid-cols-2 gap-2">
//                     {brushPresets.map((bp) => {
//                       const on = bp.id === brushPresetId;
//                       return (
//                         <button
//                           key={bp.id}
//                           className={`brushOpt ${on ? "brushOptOn" : ""}`}
//                           onClick={() => setBrushPresetId(bp.id)}
//                           title={brushPresetTitle(bp)}
//                           aria-pressed={on}
//                         >
//                           <BrushPreview preset={bp} />
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Rectangle options */}
//               {tool === "rect" && (
//                 <div className="winInset p-2 bg-[#d6d6d6]">
//                   <div className="grid grid-cols-1 gap-2">
//                     {rectModes.map((m) => {
//                       const on = rectMode === m.k;
//                       return (
//                         <button
//                           key={m.k}
//                           className={`rectOpt ${on ? "rectOptOn" : ""}`}
//                           onClick={() => setRectMode(m.k)}
//                           title={m.label}
//                           aria-pressed={on}
//                         >
//                           <RectModeIcon mode={m.k} />
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Text options (MS Paint-ish: compact, inset) */}
//               {tool === "text" && (
//                 <div className="winInset p-2 bg-[#d6d6d6]">
//                   <div className="textOptRow">
//                     <div className="textOptLabel">Font:</div>
//                     <select
//                       className="winSelect"
//                       value={textFontId}
//                       onChange={(e) => setTextFontId(e.target.value)}
//                       title="Font"
//                     >
//                       {textFonts.map((f) => (
//                         <option key={f.id} value={f.id}>
//                           {f.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="textOptRow">
//                     <div className="textOptLabel">Size:</div>
//                     <input
//                       className="winInput"
//                       type="number"
//                       min={8}
//                       max={96}
//                       value={textSize}
//                       onChange={(e) => setTextSize(Math.max(8, Math.min(96, parseInt(e.target.value || "18", 10))))}
//                       title="Size"
//                     />
//                   </div>

//                   <div className="textOptHint">
//                     Click to place • Drag to move • Corner to resize • Double‑click to edit
//                   </div>
//                 </div>
//               )}

//               <div className="flex-1 winInset" />
//             </div>

//             {/* Work area */}
//             <div className="flex-1 p-2">
//               <div className="winInset h-full p-2 bg-[#bdbdbd]">
//                 <div className="relative h-full w-full bg-white border border-black">
//                   <div className="absolute inset-2 flex items-center justify-center">
//                     <div
//                       ref={canvasHostRef}
//                       className="relative w-full h-full max-h-full max-w-full aspect-square"
//                     >
//                       <canvas
//                         ref={canvasRef}
//                         className="absolute inset-0 w-full h-full bg-white"
//                         style={{ cursor: canvasCursor }}
//                         onPointerDown={onPointerDown}
//                         onPointerMove={onPointerMove}
//                         onPointerUp={onPointerUp}
//                       />

//                       {/* Text layer overlay (non-raster)
//                           IMPORTANT: pointer-events disabled unless Text tool is active.
//                       */}
//                       <div
//                         className="absolute inset-0"
//                         style={{
//                           pointerEvents: tool === "text" ? "auto" : "none",
//                           cursor: tool === "text" ? "text" : "default",
//                         }}
//                         onPointerDown={(e) => {
//                           // clicking blank area should clear selection
//                           if (tool !== "text") return;
//                           if (e.target === e.currentTarget) {
//                             setSelectedTextId(null);
//                             setEditingTextId(null);
//                           }
//                         }}
//                       >
//                         {texts.map((t) => (
//                           <TextBox
//                             key={t.id}
//                             item={t}
//                             tool={tool}
//                             selected={selectedTextId === t.id}
//                             editing={editingTextId === t.id}
//                             onSelect={() => {
//                               if (tool === "text") setSelectedTextId(t.id);
//                             }}
//                             onDoubleClick={() => {
//                               if (tool === "text") {
//                                 setSelectedTextId(t.id);
//                                 setEditingTextId(t.id);
//                               }
//                             }}
//                             onChangeText={(val) =>
//                               setTexts((arr) =>
//                                 arr.map((x) => (x.id === t.id ? { ...x, text: val } : x))
//                               )
//                             }
//                             onCommitEdit={() => setEditingTextId(null)}
//                             onCancelEdit={() => {
//                               setEditingTextId(null);
//                               setTexts((arr) =>
//                                 arr.filter((x) => !(x.id === t.id && x.text.trim() === ""))
//                               );
//                             }}
//                             onMove={(dx, dy) =>
//                               setTexts((arr) =>
//                                 arr.map((x) =>
//                                   x.id === t.id
//                                     ? {
//                                         ...x,
//                                         x: clamp(
//                                           x.x + dx,
//                                           0,
//                                           (canvasRef.current?.width ?? 1) - 1
//                                         ),
//                                         y: clamp(
//                                           x.y + dy,
//                                           0,
//                                           (canvasRef.current?.height ?? 1) - 1
//                                         ),
//                                       }
//                                     : x
//                                 )
//                               )
//                             }
//                             onResize={(dw, dh) =>
//                               setTexts((arr) =>
//                                 arr.map((x) =>
//                                   x.id === t.id
//                                     ? {
//                                         ...x,
//                                         w: Math.max(40, x.w + dw),
//                                         h: Math.max(26, x.h + dh),
//                                       }
//                                     : x
//                                 )
//                               )
//                             }
//                             canvasRef={canvasRef}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Bottom bar */}
//           <div className="border-t border-[#dfdfdf] border-b border-[#7f7f7f] px-2 py-2">
//             <div className="flex items-end gap-3">
//               <button
//                 className="relative h-[44px] w-[56px]"
//                 onClick={swapColors}
//                 title="Click to swap colors (or press X)"
//               >
//                 <div
//                   className="absolute left-1 top-2 h-7 w-9 border border-black winInset"
//                   style={{ background: primary }}
//                   aria-hidden
//                 />
//                 <div
//                   className="absolute left-5 top-0 h-7 w-9 border border-black winInset"
//                   style={{ background: secondary }}
//                   aria-hidden
//                 />
//                 <div
//                   className="absolute left-1 top-2 h-7 w-9 border border-black winInset z-10 pointer-events-none"
//                   style={{ background: primary }}
//                   aria-hidden
//                 />
//               </button>

//               <div className="winInset inline-block p-2 bg-[#d6d6d6]">
//                 <div className="grid grid-cols-6 gap-1">
//                   {palette.map((c) => (
//                     <button
//                       key={c}
//                       className={`swatch95 ${c === primary ? "swatch95P" : ""} ${
//                         c === secondary ? "swatch95S" : ""
//                       }`}
//                       style={{ background: c }}
//                       title={`${c} (click=primary, right-click=secondary)`}
//                       onClick={() => setPrimary(c)}
//                       onContextMenu={(e) => {
//                         e.preventDefault();
//                         setSecondary(c);
//                       }}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="ml-auto text-[12px] opacity-80 select-none">
//                 Right-click uses secondary • <span className="winKey">X</span> swaps • Undo <span className="winKey">Ctrl/⌘+Z</span>
//               </div>
//             </div>
//           </div>

//           {/* Status bar */}
//           <div className="flex items-center justify-between px-2 py-1 border-t border-[#dfdfdf]">
//             <div className="text-[12px] truncate">
//               For Help, click Help Topics on the Help Menu
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="winInset px-2 py-0.5 text-[12px] min-w-[210px]">
//                 {tool}
//                 {tool === "brush" ? ` • ${brushPresetTitle(brushPreset)}` : ""}
//                 {tool === "rect" ? ` • ${rectMode}` : ""}
//                 {tool === "text" ? ` • ${textFont.name} ${textSize}px` : ""}
//               </div>
//               <div className="h-4 w-5 winInset bg-[repeating-linear-gradient(135deg,#a6a6a6_0_2px,#cfcfcf_2px_4px)]" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{styles}</style>
//     </div>
//   );
// }

// function clamp(n: number, a: number, b: number) {
//   return Math.max(a, Math.min(b, n));
// }

// function brushPresetTitle(p: {
//   kind: string;
//   size: number;
//   alpha?: number;
//   density?: number;
//   angleDeg?: number;
// }) {
//   if (p.kind === "spray") return `Spray ${p.size}px`;
//   if (p.kind === "marker") return `Marker ${p.size}px`;
//   if (p.kind === "calligraphy") return `Calligraphy ${p.size}px`;
//   return `${p.kind[0].toUpperCase() + p.kind.slice(1)} ${p.size}px`;
// }

// function BrushPreview({
//   preset,
// }: {
//   preset: {
//     kind: string;
//     size: number;
//     angleDeg?: number;
//   };
// }) {
//   const s = 22;
//   const mid = s / 2;

//   if (preset.kind === "spray") {
//     return (
//       <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
//         {Array.from({ length: 12 }).map((_, i) => {
//           const a = (i / 12) * Math.PI * 2;
//           const r = 6 + (i % 3);
//           const x = mid + Math.cos(a) * r;
//           const y = mid + Math.sin(a) * r;
//           return <rect key={i} x={x} y={y} width="1" height="1" fill="#000" />;
//         })}
//         <rect x={mid} y={mid} width="1" height="1" fill="#000" />
//       </svg>
//     );
//   }

//   if (preset.kind === "calligraphy") {
//     return (
//       <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
//         <g transform={`translate(${mid} ${mid}) rotate(${preset.angleDeg ?? 35})`}>
//           <rect x={-8} y={-2} width={16} height={4} fill="#000" />
//         </g>
//       </svg>
//     );
//   }

//   if (preset.kind === "square") {
//     const w = Math.min(12, Math.max(3, Math.round(preset.size / 2)));
//     return (
//       <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
//         <rect x={mid - w / 2} y={mid - w / 2} width={w} height={w} fill="#000" />
//       </svg>
//     );
//   }

//   const r = Math.min(6, Math.max(2, Math.round(preset.size / 3)));
//   return (
//     <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
//       <circle cx={mid} cy={mid} r={r} fill="#000" />
//     </svg>
//   );
// }

// function RectModeIcon({ mode }: { mode: "outline" | "fill" | "both" }) {
//   // Single glyph per option (matches classic left sidebar style)
//   return (
//     <svg width={44} height={18} viewBox="0 0 44 18" aria-hidden>
//       {mode === "outline" && (
//         <rect x="7" y="4" width="30" height="10" fill="none" stroke="#000" strokeWidth="2" />
//       )}
//       {mode === "fill" && (
//         <rect x="7" y="4" width="30" height="10" fill="#666" stroke="none" />
//       )}
//       {mode === "both" && (
//         <>
//           <rect x="7" y="4" width="30" height="10" fill="#666" />
//           <rect x="7" y="4" width="30" height="10" fill="none" stroke="#000" strokeWidth="2" />
//         </>
//       )}
//     </svg>
//   );
// }

// function TextBox({
//   item,
//   tool,
//   selected,
//   editing,
//   onSelect,
//   onDoubleClick,
//   onChangeText,
//   onCommitEdit,
//   onCancelEdit,
//   onMove,
//   onResize,
//   canvasRef,
// }: {
//   item: {
//     id: string;
//     x: number;
//     y: number;
//     w: number;
//     h: number;
//     text: string;
//     fontCss: string;
//     fontName: string;
//     fontSize: number;
//     color: string;
//   };
//   tool: "brush" | "rect" | "line" | "text" | "fill";
//   selected: boolean;
//   editing: boolean;
//   onSelect: () => void;
//   onDoubleClick: () => void;
//   onChangeText: (val: string) => void;
//   onCommitEdit: () => void;
//   onCancelEdit: () => void;
//   onMove: (dx: number, dy: number) => void;
//   onResize: (dw: number, dh: number) => void;
//   canvasRef: React.RefObject<HTMLCanvasElement | null>;
// }) {
//   const [px, setPx] = useState<{ left: number; top: number; w: number; h: number } | null>(null);
//   const drag = useRef<{ x: number; y: number } | null>(null);
//   const resize = useRef<{ x: number; y: number } | null>(null);

//   useEffect(() => {
//     const c = canvasRef.current;
//     if (!c) return;
//     const r = c.getBoundingClientRect();

//     const left = (item.x / c.width) * r.width;
//     const top = (item.y / c.height) * r.height;
//     const w = (item.w / c.width) * r.width;
//     const h = (item.h / c.height) * r.height;
//     setPx({ left, top, w, h });
//   }, [canvasRef, item.x, item.y, item.w, item.h]);

//   const interactive = tool === "text";

//   const onPointerDown = (e: React.PointerEvent) => {
//     if (!interactive || editing) return;
//     e.stopPropagation();
//     onSelect();
//     drag.current = { x: e.clientX, y: e.clientY };
//     (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
//   };

//   const onPointerMove = (e: React.PointerEvent) => {
//     if (!interactive || editing) return;
//     if (!drag.current) return;
//     const c = canvasRef.current;
//     if (!c) return;
//     const r = c.getBoundingClientRect();

//     const dxPx = e.clientX - drag.current.x;
//     const dyPx = e.clientY - drag.current.y;
//     drag.current = { x: e.clientX, y: e.clientY };

//     const dxCanvas = (dxPx / r.width) * c.width;
//     const dyCanvas = (dyPx / r.height) * c.height;
//     onMove(dxCanvas, dyCanvas);
//   };

//   const onPointerUp = (e: React.PointerEvent) => {
//     if (!interactive) return;
//     drag.current = null;
//     resize.current = null;
//     try {
//       (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
//     } catch {
//       // ignore
//     }
//   };

//   const onResizeDown = (e: React.PointerEvent) => {
//     if (!interactive || editing) return;
//     e.stopPropagation();
//     onSelect();
//     resize.current = { x: e.clientX, y: e.clientY };
//     (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
//   };

//   const onResizeMove = (e: React.PointerEvent) => {
//     if (!interactive || editing) return;
//     if (!resize.current) return;
//     const c = canvasRef.current;
//     if (!c) return;
//     const r = c.getBoundingClientRect();

//     const dxPx = e.clientX - resize.current.x;
//     const dyPx = e.clientY - resize.current.y;
//     resize.current = { x: e.clientX, y: e.clientY };

//     const dwCanvas = (dxPx / r.width) * c.width;
//     const dhCanvas = (dyPx / r.height) * c.height;
//     onResize(dwCanvas, dhCanvas);
//   };

//   const onResizeUp = (e: React.PointerEvent) => {
//     if (!interactive) return;
//     resize.current = null;
//     try {
//       (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
//     } catch {
//       // ignore
//     }
//   };

//   if (!px) return null;

//   return (
//     <div
//       className={`textBox ${selected ? "textBoxSel" : ""}`}
//       style={{
//         left: px.left,
//         top: px.top,
//         width: px.w,
//         height: px.h,
//         fontFamily: item.fontCss,
//         fontSize: `${item.fontSize}px`,
//         color: item.color,
//         pointerEvents: interactive ? "auto" : "none",
//       }}
//       onPointerDown={onPointerDown}
//       onPointerMove={onPointerMove}
//       onPointerUp={onPointerUp}
//       onDoubleClick={(e) => {
//         if (!interactive) return;
//         e.stopPropagation();
//         onDoubleClick();
//       }}
//       title={interactive ? "Double-click to edit" : undefined}
//     >
//       {editing ? (
//         <textarea
//           autoFocus
//           value={item.text}
//           onChange={(e) => onChangeText(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Escape") {
//               e.preventDefault();
//               onCancelEdit();
//             }
//             if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
//               e.preventDefault();
//               onCommitEdit();
//             }
//           }}
//           onBlur={onCommitEdit}
//           className="textEdit"
//           placeholder="Type… (Ctrl/⌘+Enter to finish)"
//         />
//       ) : (
//         <div className="textDisplay">{item.text}</div>
//       )}

//       {selected && interactive && !editing && (
//         <div
//           className="resizeHandle"
//           onPointerDown={onResizeDown}
//           onPointerMove={onResizeMove}
//           onPointerUp={onResizeUp}
//           title="Drag to resize"
//         />
//       )}
//     </div>
//   );
// }

// const styles = `
// /* Win95-ish surfaces */
// .win95{
//   background:#c0c0c0;
//   border:2px solid #000;
//   box-shadow: 0 0 0 1px #dfdfdf, 0 0 0 2px #000;
//   overflow:hidden;
// }

// .winInset{
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #404040;
// }

// .winbtn{
//   width:28px;
//   height:22px;
//   background:#c0c0c0;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
//   font-size:12px;
//   line-height:1;
//   display:flex;
//   align-items:center;
//   justify-content:center;
// }
// .winbtn:active{
//   box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
// }
// .winbtnClose{ font-weight:800; }

// .toolTop{
//   width:28px;
//   height:22px;
//   background:#c0c0c0;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
//   display:flex;
//   align-items:center;
//   justify-content:center;
// }
// .toolTop:disabled{ opacity:0.45; }
// .toolTop:active:not(:disabled){
//   box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
// }

// .tool95{
//   height:34px;
//   background:#c0c0c0;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
//   display:flex;
//   align-items:center;
//   justify-content:center;
// }
// .tool95:active{
//   box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
// }
// .tool95On{
//   background:#b9b9b9;
//   box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
// }

// .brushOpt{
//   width:28px;
//   height:28px;
//   background:#c0c0c0;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
//   display:flex;
//   align-items:center;
//   justify-content:center;
// }
// .brushOpt:active{
//   box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
// }
// .brushOptOn{
//   background:#b9b9b9;
//   box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
// }

// .rectOpt{
//   width:100%;
//   height:32px;
//   background:#c0c0c0;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
//   display:flex;
//   align-items:center;
//   justify-content:center;
// }
// .rectOpt:active{
//   box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
// }
// .rectOptOn{
//   background:#b9b9b9;
//   box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
// }

// .swatch95{
//   width:18px;
//   height:18px;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 rgba(255,255,255,.75), inset -1px -1px 0 rgba(0,0,0,.25);
// }
// .swatch95P{ outline: 2px dotted #000; outline-offset: 1px; }
// .swatch95S{ box-shadow: inset 1px 1px 0 rgba(255,255,255,.75), inset -1px -1px 0 rgba(0,0,0,.25), 0 0 0 2px #fff; }

// .winKey{
//   display:inline-block;
//   padding:0 6px;
//   border:1px solid #000;
//   background:#d6d6d6;
//   box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #404040;
//   line-height:18px;
// }

// /* MS Paint-ish text options */
// .textOptRow{
//   display:flex;
//   align-items:center;
//   gap:8px;
//   margin-bottom:8px;
// }
// .textOptLabel{
//   width:40px;
//   font-size:12px;
// }
// .winSelect{
//   flex:1;
//   height:24px;
//   background:#fff;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #404040;
//   font-family: "MS Sans Serif", Tahoma, system-ui;
//   font-size: 12px;
//   padding: 0 6px;
// }
// .winInput{
//   width:64px;
//   height:24px;
//   background:#fff;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #404040;
//   font-family: "MS Sans Serif", Tahoma, system-ui;
//   font-size: 12px;
//   padding: 0 6px;
// }
// .textOptHint{
//   font-size:11px;
//   opacity:.8;
//   line-height:1.2;
// }

// /* Text overlay */
// .textBox{
//   position:absolute;
//   background: transparent;
//   border: 1px dashed transparent;
//   padding: 2px;
//   box-sizing: border-box;
//   user-select: none;
// }
// .textBoxSel{
//   border-color:#0b2b7a;
// }
// .textDisplay{
//   width:100%;
//   height:100%;
//   white-space: pre-wrap;
//   overflow:hidden;
// }
// .textEdit{
//   width:100%;
//   height:100%;
//   font: inherit;
//   color: inherit;
//   background: rgba(255,255,255,0.92);
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #404040;
//   padding: 4px 6px;
//   resize: none;
//   outline: none;
// }
// .resizeHandle{
//   position:absolute;
//   width:10px;
//   height:10px;
//   right:-6px;
//   bottom:-6px;
//   background:#0b2b7a;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 rgba(255,255,255,.7), inset -1px -1px 0 rgba(0,0,0,.2);
//   cursor: nwse-resize;
// }

// @media (max-width: 720px){
//   .tool95{ height:32px; }
// }
// `;


// WORKING WELLL !!!
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   Brush,
//   Square,
//   Slash,
//   Type as TypeIcon,
//   PaintBucket,
//   Undo2,
//   Redo2,
//   Camera,
// } from "lucide-react";

// /**
//  * MS Paint-ish UI (responsive)
//  *
//  * Added:
//  * - Camera tool: click canvas to place a live webcam element (draggable/resizable, crop via object-fit: cover)
//  *   - Bigger white corner handles
//  *   - Bottom-right mic waveform bars overlay (no outline)
//  *   - Camera layer sits above pixel canvas drawings
//  *   - Camera delete: Backspace/Delete removes selected camera (Camera tool)
//  *   - Camera frame options: border / rounded / neumorphic
//  *
//  * Fixed:
//  * - Webcam black: camera boxes now react to stream readiness via stream state/version (refs don't trigger renders)
//  * - Text sizing: remove font-size control; resizing the text element scales the font instead
//  */
// export default function MSPaintV0() {
//   const palette = useMemo(
//     () => [
//       "#000000",
//       "#7f7f7f",
//       "#ffffff",
//       "#ff0000",
//       "#ffff00",
//       "#00ff00",
//       "#00ffff",
//       "#0000ff",
//       "#ff00ff",
//       "#ff7f00",
//       "#7f3f00",
//       "#3f3f3f",
//     ],
//     []
//   );

//   type Tool = "brush" | "rect" | "line" | "text" | "fill" | "camera";
//   const [tool, setTool] = useState<Tool>("brush");
//   const [primary, setPrimary] = useState(palette[0]);
//   const [secondary, setSecondary] = useState(palette[2]);

//   // keep refs in sync so swap is always correct
//   const primaryRef = useRef(primary);
//   const secondaryRef = useRef(secondary);
//   useEffect(() => void (primaryRef.current = primary), [primary]);
//   useEffect(() => void (secondaryRef.current = secondary), [secondary]);

//   const swapColors = () => {
//     const p = primaryRef.current;
//     const s = secondaryRef.current;
//     setPrimary(s);
//     setSecondary(p);
//   };

//   // Brush presets (classic-ish) + a couple extra
//   type BrushKind = "round" | "square" | "calligraphy" | "spray" | "marker";
//   type BrushPreset = {
//     id: string;
//     kind: BrushKind;
//     size: number;
//     angleDeg?: number; // for calligraphy
//     alpha?: number; // for marker
//     density?: number; // for spray
//   };

//   const brushPresets: BrushPreset[] = useMemo(
//     () => [
//       { id: "r2", kind: "round", size: 2 },
//       { id: "r4", kind: "round", size: 4 },
//       { id: "r6", kind: "round", size: 6 },
//       { id: "r10", kind: "round", size: 10 },
//       { id: "s2", kind: "square", size: 2 },
//       { id: "s4", kind: "square", size: 4 },
//       { id: "s6", kind: "square", size: 6 },
//       { id: "s10", kind: "square", size: 10 },
//       { id: "c10", kind: "calligraphy", size: 10, angleDeg: 35 },
//       { id: "c16", kind: "calligraphy", size: 16, angleDeg: 35 },
//       { id: "m12", kind: "marker", size: 12, alpha: 0.35 },
//       { id: "spr", kind: "spray", size: 14, density: 22 },
//     ],
//     []
//   );

//   const [brushPresetId, setBrushPresetId] = useState<string>(brushPresets[0].id);
//   const brushPreset = useMemo(
//     () => brushPresets.find((b) => b.id === brushPresetId) ?? brushPresets[0],
//     [brushPresetId, brushPresets]
//   );

//   // Rectangle options (classic MS Paint: outline / fill / outline+fill)
//   type RectMode = "outline" | "fill" | "both";
//   const [rectMode, setRectMode] = useState<RectMode>("outline");

//   // Text options (simple, MS Paint-ish) — resized via element handles
//   const textFonts = useMemo(
//     () => [
//       { id: "ms", name: "MS Sans Serif", css: "MS Sans Serif, Tahoma, system-ui" },
//       { id: "tahoma", name: "Tahoma", css: "Tahoma, system-ui" },
//       {
//         id: "courier",
//         name: "Courier New",
//         css: "'Courier New', ui-monospace, SFMono-Regular, Menlo, monospace",
//       },
//       { id: "georgia", name: "Georgia", css: "Georgia, serif" },
//     ],
//     []
//   );
//   const [textFontId, setTextFontId] = useState(textFonts[0].id);
//   const textFont = useMemo(
//     () => textFonts.find((f) => f.id === textFontId) ?? textFonts[0],
//     [textFontId, textFonts]
//   );
//   const DEFAULT_TEXT_SIZE = 18;

//   type TextItem = {
//     id: string;
//     x: number; // canvas coords
//     y: number;
//     w: number; // canvas coords
//     h: number;
//     text: string;
//     fontCss: string;
//     fontName: string;
//     fontSize: number;
//     color: string; // always primary at creation time
//   };
//   const [texts, setTexts] = useState<TextItem[]>([]);
//   const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
//   const [editingTextId, setEditingTextId] = useState<string | null>(null);

//   // Camera items
//   type CameraItem = {
//     id: string;
//     x: number;
//     y: number;
//     w: number;
//     h: number;
//   };
//   const [cams, setCams] = useState<CameraItem[]>([]);
//   const [selectedCamId, setSelectedCamId] = useState<string | null>(null);

//   type CamFrame = "classic" | "rounded" | "neumorph";
//   const [camBorder, setCamBorder] = useState(true);
//   const [camFrame, setCamFrame] = useState<CamFrame>("classic");

//   // One shared media stream for all camera elements + mic waveform
//   const mediaStreamRef = useRef<MediaStream | null>(null);
//   const [mediaStreamState, setMediaStreamState] = useState<MediaStream | null>(null);
//   const [streamVersion, setStreamVersion] = useState(0);
//   const [mediaStatus, setMediaStatus] = useState<"idle" | "ready" | "denied" | "error">("idle");

//   // Mic analyser -> 12 bar levels
//   const audioCtxRef = useRef<AudioContext | null>(null);
//   const analyserRef = useRef<AnalyserNode | null>(null);
//   const rafRef = useRef<number | null>(null);
//   const [micBars, setMicBars] = useState<number[]>(() => Array.from({ length: 12 }, () => 0));

//   // Canvas
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const canvasHostRef = useRef<HTMLDivElement | null>(null);
//   const appRef = useRef<HTMLDivElement | null>(null);
//   const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

//   const isDown = useRef(false);
//   const startPt = useRef<{ x: number; y: number } | null>(null);
//   const lastPt = useRef<{ x: number; y: number } | null>(null);
//   const previewSnapshot = useRef<ImageData | null>(null);
//   const drawColorRef = useRef<string>(primary);

//   // Undo/redo snapshot stacks (canvas only)
//   const undoStack = useRef<ImageData[]>([]);
//   const redoStack = useRef<ImageData[]>([]);
//   const [, bumpHistory] = useState(0);

//   const toolButtons = useMemo(
//     () =>
//       [
//         { k: "brush" as const, label: "Brush", Icon: Brush },
//         { k: "line" as const, label: "Line", Icon: Slash },
//         { k: "rect" as const, label: "Rectangle", Icon: Square },
//         { k: "fill" as const, label: "Fill", Icon: PaintBucket },
//         { k: "text" as const, label: "Text", Icon: TypeIcon },
//         { k: "camera" as const, label: "Camera", Icon: Camera },
//       ] as const,
//     []
//   );

//   function getCtx() {
//     if (!ctxRef.current && canvasRef.current) {
//       ctxRef.current = canvasRef.current.getContext("2d", {
//         willReadFrequently: true,
//       });
//     }
//     return ctxRef.current;
//   }

//   function getPos(e: React.PointerEvent) {
//     const canvas = canvasRef.current;
//     if (!canvas) return { x: 0, y: 0 };
//     const r = canvas.getBoundingClientRect();
//     const x = (e.clientX - r.left) * (canvas.width / r.width);
//     const y = (e.clientY - r.top) * (canvas.height / r.height);
//     return {
//       x: Math.max(0, Math.min(canvas.width - 1, x)),
//       y: Math.max(0, Math.min(canvas.height - 1, y)),
//     };
//   }

//   function withCtx<T>(fn: (ctx: CanvasRenderingContext2D) => T) {
//     const ctx = getCtx();
//     if (!ctx) return null;
//     return fn(ctx);
//   }

//   function setCommonStyle(ctx: CanvasRenderingContext2D, color: string) {
//     ctx.strokeStyle = color;
//     ctx.fillStyle = color;
//     ctx.imageSmoothingEnabled = false;
//     ctx.globalAlpha = 1;
//   }

//   function setStrokeStyleFromBrush(ctx: CanvasRenderingContext2D, color: string, preset: BrushPreset) {
//     setCommonStyle(ctx, color);

//     ctx.globalAlpha = preset.alpha ?? 1;
//     ctx.lineJoin = "round";

//     if (preset.kind === "square") {
//       ctx.lineCap = "square";
//       ctx.lineWidth = preset.size;
//       return;
//     }

//     if (preset.kind === "marker") {
//       ctx.lineCap = "round";
//       ctx.lineWidth = preset.size;
//       return;
//     }

//     ctx.lineCap = "round";
//     ctx.lineWidth = preset.size;
//   }

//   function savePreviewSnapshot() {
//     const ctx = getCtx();
//     const canvas = canvasRef.current;
//     if (!ctx || !canvas) return;
//     previewSnapshot.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
//   }

//   function restorePreviewSnapshot() {
//     const ctx = getCtx();
//     const canvas = canvasRef.current;
//     if (!ctx || !canvas || !previewSnapshot.current) return;
//     ctx.putImageData(previewSnapshot.current, 0, 0);
//   }

//   function pushUndo() {
//     const ctx = getCtx();
//     const canvas = canvasRef.current;
//     if (!ctx || !canvas) return;
//     const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     undoStack.current.push(img);
//     redoStack.current = [];
//     bumpHistory((n) => n + 1);
//   }

//   function canUndo() {
//     return undoStack.current.length > 1;
//   }

//   function canRedo() {
//     return redoStack.current.length > 0;
//   }

//   function applyImage(img: ImageData) {
//     const ctx = getCtx();
//     const canvas = canvasRef.current;
//     if (!ctx || !canvas) return;

//     if (canvas.width !== img.width || canvas.height !== img.height) {
//       canvas.width = img.width;
//       canvas.height = img.height;
//     }
//     ctx.putImageData(img, 0, 0);
//   }

//   function undo() {
//     if (!canUndo()) return;
//     const current = undoStack.current.pop();
//     if (!current) return;
//     redoStack.current.push(current);
//     const prev = undoStack.current[undoStack.current.length - 1];
//     if (prev) applyImage(prev);
//     bumpHistory((n) => n + 1);
//   }

//   function redo() {
//     if (!canRedo()) return;
//     const img = redoStack.current.pop();
//     if (!img) return;
//     undoStack.current.push(img);
//     applyImage(img);
//     bumpHistory((n) => n + 1);
//   }

//   function drawBrushSegment(
//     from: { x: number; y: number },
//     to: { x: number; y: number },
//     color: string,
//     preset: BrushPreset
//   ) {
//     return withCtx((ctx) => {
//       setStrokeStyleFromBrush(ctx, color, preset);

//       if (preset.kind === "spray") {
//         const density = preset.density ?? 18;
//         const r = preset.size;

//         const dx = to.x - from.x;
//         const dy = to.y - from.y;
//         const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 3));

//         for (let s = 0; s <= steps; s++) {
//           const t = s / steps;
//           const cx = from.x + dx * t;
//           const cy = from.y + dy * t;
//           for (let i = 0; i < density; i++) {
//             const a = Math.random() * Math.PI * 2;
//             const rr = Math.random() * r;
//             const px = cx + Math.cos(a) * rr;
//             const py = cy + Math.sin(a) * rr;
//             ctx.fillRect(px, py, 1, 1);
//           }
//         }
//         ctx.globalAlpha = 1;
//         return;
//       }

//       if (preset.kind === "calligraphy") {
//         const angle = ((preset.angleDeg ?? 35) * Math.PI) / 180;
//         const w = preset.size;
//         const h = Math.max(2, Math.floor(preset.size / 3));

//         const dx = to.x - from.x;
//         const dy = to.y - from.y;
//         const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 2));

//         for (let s = 0; s <= steps; s++) {
//           const t = s / steps;
//           const cx = from.x + dx * t;
//           const cy = from.y + dy * t;
//           ctx.save();
//           ctx.translate(cx, cy);
//           ctx.rotate(angle);
//           ctx.fillRect(-w / 2, -h / 2, w, h);
//           ctx.restore();
//         }

//         ctx.globalAlpha = 1;
//         return;
//       }

//       ctx.beginPath();
//       ctx.moveTo(from.x, from.y);
//       ctx.lineTo(to.x, to.y);
//       ctx.stroke();
//       ctx.globalAlpha = 1;
//     });
//   }

//   function drawLine(a: { x: number; y: number }, b: { x: number; y: number }, color: string) {
//     return withCtx((ctx) => {
//       restorePreviewSnapshot();
//       setCommonStyle(ctx, color);
//       ctx.lineWidth = 2;
//       ctx.lineCap = "round";
//       ctx.beginPath();
//       ctx.moveTo(a.x, a.y);
//       ctx.lineTo(b.x, b.y);
//       ctx.stroke();
//     });
//   }

//   function drawRect(a: { x: number; y: number }, b: { x: number; y: number }, strokeColor: string, mode: RectMode) {
//     return withCtx((ctx) => {
//       restorePreviewSnapshot();

//       const x = Math.min(a.x, b.x);
//       const y = Math.min(a.y, b.y);
//       const w = Math.abs(a.x - b.x);
//       const h = Math.abs(a.y - b.y);

//       setCommonStyle(ctx, strokeColor);
//       ctx.lineWidth = 2;

//       if (mode === "fill") {
//         ctx.fillStyle = strokeColor;
//         ctx.fillRect(x, y, w, h);
//         return;
//       }

//       if (mode === "both") {
//         ctx.fillStyle = secondaryRef.current;
//         ctx.fillRect(x, y, w, h);
//         ctx.strokeStyle = strokeColor;
//         ctx.strokeRect(x, y, w, h);
//         return;
//       }

//       ctx.strokeStyle = strokeColor;
//       ctx.strokeRect(x, y, w, h);
//     });
//   }

//   function hexToRgba(hex: string) {
//     const h = hex.replace("#", "");
//     const normalized = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
//     const v = parseInt(normalized, 16);
//     const r = (v >> 16) & 255;
//     const g = (v >> 8) & 255;
//     const b = v & 255;
//     return [r, g, b, 255] as const;
//   }

//   function floodFill(x0: number, y0: number, color: string) {
//     const ctx = getCtx();
//     const canvas = canvasRef.current;
//     if (!ctx || !canvas) return;

//     const w = canvas.width;
//     const h = canvas.height;
//     const img = ctx.getImageData(0, 0, w, h);
//     const data = img.data;

//     const ix = (x0 | 0) + (y0 | 0) * w;
//     const i0 = ix * 4;

//     const target = [data[i0], data[i0 + 1], data[i0 + 2], data[i0 + 3]] as const;
//     const fill = hexToRgba(color);

//     if (target[0] === fill[0] && target[1] === fill[1] && target[2] === fill[2] && target[3] === fill[3]) return;

//     const stack: number[] = [ix];
//     const visited = new Uint8Array(w * h);

//     const match = (i: number) => {
//       const p = i * 4;
//       return data[p] === target[0] && data[p + 1] === target[1] && data[p + 2] === target[2] && data[p + 3] === target[3];
//     };

//     const paint = (i: number) => {
//       const p = i * 4;
//       data[p] = fill[0];
//       data[p + 1] = fill[1];
//       data[p + 2] = fill[2];
//       data[p + 3] = fill[3];
//     };

//     while (stack.length) {
//       const i = stack.pop()!;
//       if (visited[i]) continue;
//       visited[i] = 1;
//       if (!match(i)) continue;

//       paint(i);

//       const x = i % w;
//       const y = (i / w) | 0;
//       if (x > 0) stack.push(i - 1);
//       if (x < w - 1) stack.push(i + 1);
//       if (y > 0) stack.push(i - w);
//       if (y < h - 1) stack.push(i + w);
//     }

//     ctx.putImageData(img, 0, 0);
//   }

//   function beginActionColorFromButton(button: number) {
//     drawColorRef.current = button === 2 ? secondaryRef.current : primaryRef.current;
//   }

//   async function ensureMedia() {
//     if (mediaStreamRef.current) return mediaStreamRef.current;
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "user" },
//         audio: true,
//       });
//       mediaStreamRef.current = stream;
//       setMediaStreamState(stream);
//       setStreamVersion((v) => v + 1);
//       setMediaStatus("ready");
//       return stream;
//     } catch (e: any) {
//       if (e?.name === "NotAllowedError") setMediaStatus("denied");
//       else setMediaStatus("error");
//       return null;
//     }
//   }

//   function startMicBars(stream: MediaStream) {
//     if (analyserRef.current) return;
//     try {
//       const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
//       const ac: AudioContext = new AudioCtx();
//       audioCtxRef.current = ac;
//       const source = ac.createMediaStreamSource(stream);
//       const analyser = ac.createAnalyser();
//       analyser.fftSize = 256;
//       analyser.smoothingTimeConstant = 0.82;
//       source.connect(analyser);
//       analyserRef.current = analyser;

//       const data = new Uint8Array(analyser.frequencyBinCount);

//       const tick = () => {
//         analyser.getByteFrequencyData(data);
//         const bars = 12;
//         const step = Math.floor(data.length / bars);
//         const out: number[] = [];
//         for (let i = 0; i < bars; i++) {
//           let sum = 0;
//           const start = i * step;
//           const end = Math.min(data.length, start + step);
//           for (let j = start; j < end; j++) sum += data[j];
//           const avg = sum / Math.max(1, end - start);
//           out.push(avg / 255);
//         }
//         setMicBars(out);
//         rafRef.current = requestAnimationFrame(tick);
//       };
//       rafRef.current = requestAnimationFrame(tick);
//     } catch {
//       // ignore
//     }
//   }

//   function onPointerDown(e: React.PointerEvent) {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     beginActionColorFromButton(e.button);

//     const p = getPos(e);
//     isDown.current = true;
//     startPt.current = p;
//     lastPt.current = p;

//     if (tool === "line" || tool === "rect") {
//       savePreviewSnapshot();
//     }

//     if (tool === "fill") {
//       floodFill(p.x | 0, p.y | 0, drawColorRef.current);
//       pushUndo();
//       isDown.current = false;
//       return;
//     }

//     if (tool === "text") {
//       const id = `t_${Math.random().toString(16).slice(2)}`;
//       const item: TextItem = {
//         id,
//         x: p.x,
//         y: p.y,
//         w: 220,
//         h: 54,
//         text: "",
//         fontCss: textFont.css,
//         fontName: textFont.name,
//         fontSize: DEFAULT_TEXT_SIZE,
//         color: primaryRef.current,
//       };
//       setTexts((arr) => [...arr, item]);
//       setSelectedTextId(id);
//       setEditingTextId(id);
//       isDown.current = false;
//       return;
//     }

//     if (tool === "camera") {
//       (async () => {
//         const stream = await ensureMedia();
//         if (stream) startMicBars(stream);
//       })();
//       const id = `c_${Math.random().toString(16).slice(2)}`;
//       const cam: CameraItem = {
//         id,
//         x: p.x,
//         y: p.y,
//         w: 260,
//         h: 180,
//       };
//       setCams((arr) => [...arr, cam]);
//       setSelectedCamId(id);
//       isDown.current = false;
//       return;
//     }

//     if (tool === "brush") {
//       drawBrushSegment(p, { x: p.x + 0.01, y: p.y + 0.01 }, drawColorRef.current, brushPreset);
//     }

//     canvas.setPointerCapture(e.pointerId);
//   }

//   function onPointerMove(e: React.PointerEvent) {
//     if (!isDown.current) return;
//     const p = getPos(e);

//     if (tool === "brush") {
//       const last = lastPt.current;
//       if (last) drawBrushSegment(last, p, drawColorRef.current, brushPreset);
//       lastPt.current = p;
//       return;
//     }

//     if (tool === "line") {
//       const a = startPt.current;
//       if (a) drawLine(a, p, drawColorRef.current);
//       return;
//     }

//     if (tool === "rect") {
//       const a = startPt.current;
//       if (a) drawRect(a, p, drawColorRef.current, rectMode);
//       return;
//     }
//   }

//   function onPointerUp(e: React.PointerEvent) {
//     if (!isDown.current) return;
//     isDown.current = false;

//     if (tool === "brush" || tool === "line" || tool === "rect") {
//       pushUndo();
//     }

//     startPt.current = null;
//     lastPt.current = null;

//     const canvas = canvasRef.current;
//     if (canvas) canvas.releasePointerCapture(e.pointerId);
//   }

//   // Global shortcuts: X swap colors, Cmd/Ctrl+Z undo, Cmd/Ctrl+Shift+Z redo, Del/Backspace delete selected camera (camera tool)
//   useEffect(() => {
//     const onKeyDown = (e: KeyboardEvent) => {
//       const key = e.key.toLowerCase();

//       // camera delete
//       if ((e.key === "Backspace" || e.key === "Delete") && tool === "camera" && selectedCamId) {
//         e.preventDefault();
//         setCams((arr) => arr.filter((c) => c.id !== selectedCamId));
//         setSelectedCamId(null);
//         return;
//       }

//       if (key === "x") {
//         e.preventDefault();
//         swapColors();
//         return;
//       }

//       const mod = e.metaKey || e.ctrlKey;
//       if (!mod) return;

//       if (key === "z" && e.shiftKey) {
//         e.preventDefault();
//         redo();
//         return;
//       }
//       if (key === "z") {
//         e.preventDefault();
//         undo();
//       }
//     };

//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [tool, selectedCamId]);

//   // Disable context menu on app (right-click used for secondary drawing and palette)
//   useEffect(() => {
//     const el = appRef.current;
//     if (!el) return;
//     const onCtx = (ev: MouseEvent) => ev.preventDefault();
//     el.addEventListener("contextmenu", onCtx);
//     return () => el.removeEventListener("contextmenu", onCtx);
//   }, []);

//   // Resize canvas to a crisp square matching its rendered size
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const host = canvasHostRef.current;
//     if (!canvas || !host) return;

//     const ro = new ResizeObserver(() => {
//       const r = host.getBoundingClientRect();
//       const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
//       const size = Math.floor(Math.min(r.width, r.height) * dpr);
//       if (size <= 0) return;

//       const ctx = getCtx();
//       if (!ctx) return;

//       const prevW = canvas.width || 1;
//       const prevH = canvas.height || 1;
//       const old = ctx.getImageData(0, 0, prevW, prevH);

//       canvas.width = size;
//       canvas.height = size;

//       const ctx2 = getCtx();
//       if (!ctx2) return;
//       ctx2.putImageData(old, 0, 0);

//       if (undoStack.current.length === 0) {
//         undoStack.current.push(ctx2.getImageData(0, 0, canvas.width, canvas.height));
//         bumpHistory((n) => n + 1);
//       }
//     });

//     ro.observe(host);
//     return () => ro.disconnect();
//   }, []);

//   // Cleanup audio RAF on unmount
//   useEffect(() => {
//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       try {
//         audioCtxRef.current?.close();
//       } catch {
//         // ignore
//       }
//     };
//   }, []);

//   const rectModes: { k: RectMode; label: string }[] = [
//     { k: "outline", label: "Outline" },
//     { k: "fill", label: "Fill" },
//     { k: "both", label: "Outline + Fill" },
//   ];

//   const canvasCursor = tool === "text" ? "text" : tool === "fill" ? "cell" : tool === "camera" ? "copy" : "crosshair";

//   return (
//     <div
//       ref={appRef}
//       className="min-h-screen w-full bg-[#9db3c7] flex items-center justify-center p-6 text-black"
//       style={{ fontFamily: "MS Sans Serif, Tahoma, system-ui" }}
//     >
//       <div className="w-full max-w-[980px]">
//         <div className="win95">
//           {/* Title bar */}
//           <div className="flex items-center justify-between px-2 py-1 text-white bg-gradient-to-b from-[#2f65c7] to-[#0a2a7a]">
//             <div className="flex items-center gap-2 min-w-0">
//               <div className="h-4 w-4 bg-white border border-black relative">
//                 <div
//                   className="absolute left-[2px] top-[2px] h-2.5 w-2.5 border border-black"
//                   style={{ background: "radial-gradient(circle at 30% 30%, #ff4, #f80)" }}
//                 />
//               </div>
//               <div className="font-bold text-[13px] truncate">untitled - Paint</div>
//             </div>
//             <div className="flex gap-1">
//               <button className="winbtn" title="Minimize">
//                 _
//               </button>
//               <button className="winbtn" title="Maximize">
//                 ▢
//               </button>
//               <button className="winbtn winbtnClose" title="Close">
//                 ✕
//               </button>
//             </div>
//           </div>

//           {/* Menu */}
//           <div className="flex items-center justify-between gap-2 px-2 py-1 border-b border-[#7f7f7f]">
//             <div className="flex gap-2">
//               {["File", "Edit", "View", "Image", "Options", "Help"].map((m) => (
//                 <button key={m} className="px-2 py-0.5 text-[13px] hover:bg-white/30">
//                   {m}
//                 </button>
//               ))}
//             </div>

//             <div className="flex items-center gap-1">
//               <button className="toolTop" title="Undo (Ctrl/⌘+Z)" onClick={undo} disabled={!canUndo()}>
//                 <Undo2 className="h-4 w-4" />
//               </button>
//               <button className="toolTop" title="Redo (Ctrl/⌘+Shift+Z)" onClick={redo} disabled={!canRedo()}>
//                 <Redo2 className="h-4 w-4" />
//               </button>
//             </div>
//           </div>

//           {/* Body */}
//           <div className="flex h-[min(62vh,620px)] min-h-[420px]">
//             {/* Tools */}
//             <div className="w-[124px] border-r border-[#7f7f7f] p-2 flex flex-col gap-2">
//               <div className="grid grid-cols-2 gap-2">
//                 {toolButtons.map(({ k, label, Icon }) => {
//                   const on = tool === k;
//                   return (
//                     <button
//                       key={k}
//                       onClick={() => {
//                         setTool(k);
//                         if (k !== "text") {
//                           setEditingTextId(null);
//                           setSelectedTextId(null);
//                         }
//                         if (k !== "camera") {
//                           setSelectedCamId(null);
//                         }
//                       }}
//                       className={`tool95 ${on ? "tool95On" : ""}`}
//                       title={label}
//                       aria-pressed={on}
//                     >
//                       <Icon className="h-4 w-4" strokeWidth={2} />
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* Brush options */}
//               {tool === "brush" && (
//                 <div className="winInset p-2 bg-[#d6d6d6]">
//                   <div className="grid grid-cols-2 gap-2">
//                     {brushPresets.map((bp) => {
//                       const on = bp.id === brushPresetId;
//                       return (
//                         <button
//                           key={bp.id}
//                           className={`brushOpt ${on ? "brushOptOn" : ""}`}
//                           onClick={() => setBrushPresetId(bp.id)}
//                           title={brushPresetTitle(bp)}
//                           aria-pressed={on}
//                         >
//                           <BrushPreview preset={bp} />
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Rectangle options */}
//               {tool === "rect" && (
//                 <div className="winInset p-2 bg-[#d6d6d6]">
//                   <div className="grid grid-cols-1 gap-2">
//                     {rectModes.map((m) => {
//                       const on = rectMode === m.k;
//                       return (
//                         <button
//                           key={m.k}
//                           className={`rectOpt ${on ? "rectOptOn" : ""}`}
//                           onClick={() => setRectMode(m.k)}
//                           title={m.label}
//                           aria-pressed={on}
//                         >
//                           <RectModeIcon mode={m.k} />
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Text options */}
//               {tool === "text" && (
//                 <div className="winInset p-2 bg-[#d6d6d6]">
//                   <div className="textOptRow">
//                     <div className="textOptLabel">Font:</div>
//                     <select
//                       className="winSelect"
//                       value={textFontId}
//                       onChange={(e) => setTextFontId(e.target.value)}
//                       title="Font"
//                     >
//                       {textFonts.map((f) => (
//                         <option key={f.id} value={f.id}>
//                           {f.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="textOptHint">Click to place • Drag to move • Corner to resize (scales text) • Double‑click to edit</div>
//                 </div>
//               )}

//               {/* Camera options */}
//               {tool === "camera" && (
//                 <div className="winInset p-2 bg-[#d6d6d6]">
//                   <div className="text-[12px] leading-snug">
//                     Click the canvas to place a camera.
//                     <div className="mt-2 opacity-80">
//                       {mediaStatus === "idle" && "Camera/mic will ask permission on first use."}
//                       {mediaStatus === "ready" && "Camera + mic active."}
//                       {mediaStatus === "denied" && "Permission denied (check browser settings)."}
//                       {mediaStatus === "error" && "Couldn’t start camera/mic."}
//                     </div>

//                     <div className="mt-2 text-[11px] opacity-75">Tip: Camera tool → drag to move, corner to resize • Del/Backspace deletes</div>

//                     <div className="mt-3 border-t border-black/20 pt-2">
//                       <label className="flex items-center gap-2 text-[12px]">
//                         <input
//                           type="checkbox"
//                           checked={camBorder}
//                           onChange={(e) => setCamBorder(e.target.checked)}
//                         />
//                         Border
//                       </label>

//                       <div className="mt-2 text-[12px]">Frame:</div>
//                       <div className="mt-1 grid grid-cols-1 gap-1">
//                         {([
//                           { k: "classic" as const, label: "Classic" },
//                           { k: "rounded" as const, label: "Rounded" },
//                           { k: "neumorph" as const, label: "Neumorphic" },
//                         ] as const).map((o) => (
//                           <label key={o.k} className="flex items-center gap-2">
//                             <input
//                               type="radio"
//                               name="camFrame"
//                               checked={camFrame === o.k}
//                               onChange={() => setCamFrame(o.k)}
//                             />
//                             {o.label}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="flex-1 winInset" />
//             </div>

//             {/* Work area */}
//             <div className="flex-1 p-2">
//               <div className="winInset h-full p-2 bg-[#bdbdbd]">
//                 <div className="relative h-full w-full bg-white border border-black">
//                   <div className="absolute inset-2 flex items-center justify-center">
//                     <div ref={canvasHostRef} className="relative w-full h-full max-h-full max-w-full aspect-square">
//                       <canvas
//                         ref={canvasRef}
//                         className="absolute inset-0 w-full h-full bg-white"
//                         style={{ cursor: canvasCursor }}
//                         onPointerDown={onPointerDown}
//                         onPointerMove={onPointerMove}
//                         onPointerUp={onPointerUp}
//                       />

//                       {/* Text overlay wrapper MUST NOT steal clicks */}
//                       <div className="absolute inset-0 pointer-events-none z-20">
//                         {texts.map((t) => (
//                           <TextBox
//                             key={t.id}
//                             item={t}
//                             tool={tool}
//                             selected={selectedTextId === t.id}
//                             editing={editingTextId === t.id}
//                             onSelect={() => {
//                               if (tool === "text") setSelectedTextId(t.id);
//                             }}
//                             onDoubleClick={() => {
//                               if (tool === "text") {
//                                 setSelectedTextId(t.id);
//                                 setEditingTextId(t.id);
//                               }
//                             }}
//                             onChangeText={(val) =>
//                               setTexts((arr) => arr.map((x) => (x.id === t.id ? { ...x, text: val } : x)))
//                             }
//                             onCommitEdit={() => setEditingTextId(null)}
//                             onCancelEdit={() => {
//                               setEditingTextId(null);
//                               setTexts((arr) => arr.filter((x) => !(x.id === t.id && x.text.trim() === "")));
//                             }}
//                             onMove={(dx, dy) =>
//                               setTexts((arr) =>
//                                 arr.map((x) =>
//                                   x.id === t.id
//                                     ? {
//                                         ...x,
//                                         x: clamp(x.x + dx, 0, (canvasRef.current?.width ?? 1) - 1),
//                                         y: clamp(x.y + dy, 0, (canvasRef.current?.height ?? 1) - 1),
//                                       }
//                                     : x
//                                 )
//                               )
//                             }
//                             onResize={(dw, dh) =>
//                               setTexts((arr) =>
//                                 arr.map((x) => {
//                                   if (x.id !== t.id) return x;
//                                   const w = Math.max(40, x.w + dw);
//                                   const h = Math.max(26, x.h + dh);
//                                   const fontSize = clamp(Math.round(h * 0.55), 8, 96);
//                                   return { ...x, w, h, fontSize };
//                                 })
//                               )
//                             }
//                             canvasRef={canvasRef}
//                           />
//                         ))}
//                       </div>

//                       {/* Camera overlay layer */}
//                       <div className="absolute inset-0 pointer-events-none z-30">
//                         {cams.map((c) => (
//                           <CameraBox
//                             key={c.id}
//                             item={c}
//                             tool={tool}
//                             selected={selectedCamId === c.id}
//                             onSelect={() => {
//                               if (tool === "camera") setSelectedCamId(c.id);
//                             }}
//                             onMove={(dx, dy) =>
//                               setCams((arr) =>
//                                 arr.map((x) =>
//                                   x.id === c.id
//                                     ? {
//                                         ...x,
//                                         x: clamp(x.x + dx, 0, (canvasRef.current?.width ?? 1) - 1),
//                                         y: clamp(x.y + dy, 0, (canvasRef.current?.height ?? 1) - 1),
//                                       }
//                                     : x
//                                 )
//                               )
//                             }
//                             onResize={(dw, dh) =>
//                               setCams((arr) =>
//                                 arr.map((x) =>
//                                   x.id === c.id
//                                     ? {
//                                         ...x,
//                                         w: Math.max(120, x.w + dw),
//                                         h: Math.max(90, x.h + dh),
//                                       }
//                                     : x
//                                 )
//                               )
//                             }
//                             canvasRef={canvasRef}
//                             stream={mediaStreamState}
//                             streamVersion={streamVersion}
//                             micBars={micBars}
//                             frame={camFrame}
//                             border={camBorder}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Bottom bar */}
//           <div className="border-t border-[#dfdfdf] border-b border-[#7f7f7f] px-2 py-2">
//             <div className="flex items-end gap-3">
//               <button
//                 className="relative h-[44px] w-[56px]"
//                 onClick={swapColors}
//                 title="Click to swap colors (or press X)"
//               >
//                 <div className="absolute left-1 top-2 h-7 w-9 border border-black winInset" style={{ background: primary }} />
//                 <div className="absolute left-5 top-0 h-7 w-9 border border-black winInset" style={{ background: secondary }} />
//                 {/* primary on top (z) */}
//                 <div
//                   className="absolute left-1 top-2 h-7 w-9 border border-black winInset z-10 pointer-events-none"
//                   style={{ background: primary }}
//                 />
//               </button>

//               <div className="winInset inline-block p-2 bg-[#d6d6d6]">
//                 <div className="grid grid-cols-6 gap-1">
//                   {palette.map((c) => (
//                     <button
//                       key={c}
//                       className={`swatch95 ${c === primary ? "swatch95P" : ""} ${c === secondary ? "swatch95S" : ""}`}
//                       style={{ background: c }}
//                       title={`${c} (click=primary, right-click=secondary)`}
//                       onClick={() => setPrimary(c)}
//                       onContextMenu={(e) => {
//                         e.preventDefault();
//                         setSecondary(c);
//                       }}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="ml-auto text-[12px] opacity-80 select-none">
//                 Right-click uses secondary • <span className="winKey">X</span> swaps • Undo <span className="winKey">Ctrl/⌘+Z</span>
//               </div>
//             </div>
//           </div>

//           {/* Status bar */}
//           <div className="flex items-center justify-between px-2 py-1 border-t border-[#dfdfdf]">
//             <div className="text-[12px] truncate">For Help, click Help Topics on the Help Menu</div>
//             <div className="flex items-center gap-2">
//               <div className="winInset px-2 py-0.5 text-[12px] min-w-[250px]">
//                 {tool}
//                 {tool === "brush" ? ` • ${brushPresetTitle(brushPreset)}` : ""}
//                 {tool === "rect" ? ` • ${rectMode}` : ""}
//                 {tool === "text" ? ` • ${textFont.name}` : ""}
//                 {tool === "camera" ? ` • ${mediaStatus}` : ""}
//               </div>
//               <div className="h-4 w-5 winInset bg-[repeating-linear-gradient(135deg,#a6a6a6_0_2px,#cfcfcf_2px_4px)]" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{styles}</style>
//     </div>
//   );
// }

// function clamp(n: number, a: number, b: number) {
//   return Math.max(a, Math.min(b, n));
// }

// function brushPresetTitle(p: { kind: string; size: number; alpha?: number; density?: number; angleDeg?: number }) {
//   if (p.kind === "spray") return `Spray ${p.size}px`;
//   if (p.kind === "marker") return `Marker ${p.size}px`;
//   if (p.kind === "calligraphy") return `Calligraphy ${p.size}px`;
//   return `${p.kind[0].toUpperCase() + p.kind.slice(1)} ${p.size}px`;
// }

// function BrushPreview({ preset }: { preset: { kind: string; size: number; angleDeg?: number } }) {
//   const s = 22;
//   const mid = s / 2;

//   if (preset.kind === "spray") {
//     return (
//       <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
//         {Array.from({ length: 12 }).map((_, i) => {
//           const a = (i / 12) * Math.PI * 2;
//           const r = 6 + (i % 3);
//           const x = mid + Math.cos(a) * r;
//           const y = mid + Math.sin(a) * r;
//           return <rect key={i} x={x} y={y} width="1" height="1" fill="#000" />;
//         })}
//         <rect x={mid} y={mid} width="1" height="1" fill="#000" />
//       </svg>
//     );
//   }

//   if (preset.kind === "calligraphy") {
//     return (
//       <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
//         <g transform={`translate(${mid} ${mid}) rotate(${preset.angleDeg ?? 35})`}>
//           <rect x={-8} y={-2} width={16} height={4} fill="#000" />
//         </g>
//       </svg>
//     );
//   }

//   if (preset.kind === "square") {
//     const w = Math.min(12, Math.max(3, Math.round(preset.size / 2)));
//     return (
//       <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
//         <rect x={mid - w / 2} y={mid - w / 2} width={w} height={w} fill="#000" />
//       </svg>
//     );
//   }

//   const r = Math.min(6, Math.max(2, Math.round(preset.size / 3)));
//   return (
//     <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
//       <circle cx={mid} cy={mid} r={r} fill="#000" />
//     </svg>
//   );
// }

// function RectModeIcon({ mode }: { mode: "outline" | "fill" | "both" }) {
//   return (
//     <svg width={44} height={18} viewBox="0 0 44 18" aria-hidden>
//       {mode === "outline" && <rect x="7" y="4" width="30" height="10" fill="none" stroke="#000" strokeWidth="2" />}
//       {mode === "fill" && <rect x="7" y="4" width="30" height="10" fill="#666" stroke="none" />}
//       {mode === "both" && (
//         <>
//           <rect x="7" y="4" width="30" height="10" fill="#666" />
//           <rect x="7" y="4" width="30" height="10" fill="none" stroke="#000" strokeWidth="2" />
//         </>
//       )}
//     </svg>
//   );
// }

// function TextBox({
//   item,
//   tool,
//   selected,
//   editing,
//   onSelect,
//   onDoubleClick,
//   onChangeText,
//   onCommitEdit,
//   onCancelEdit,
//   onMove,
//   onResize,
//   canvasRef,
// }: {
//   item: {
//     id: string;
//     x: number;
//     y: number;
//     w: number;
//     h: number;
//     text: string;
//     fontCss: string;
//     fontName: string;
//     fontSize: number;
//     color: string;
//   };
//   tool: "brush" | "rect" | "line" | "text" | "fill" | "camera";
//   selected: boolean;
//   editing: boolean;
//   onSelect: () => void;
//   onDoubleClick: () => void;
//   onChangeText: (val: string) => void;
//   onCommitEdit: () => void;
//   onCancelEdit: () => void;
//   onMove: (dx: number, dy: number) => void;
//   onResize: (dw: number, dh: number) => void;
//   canvasRef: React.RefObject<HTMLCanvasElement | null>;
// }) {
//   const [px, setPx] = useState<{ left: number; top: number; w: number; h: number } | null>(null);
//   const drag = useRef<{ x: number; y: number } | null>(null);
//   const resize = useRef<{ x: number; y: number } | null>(null);

//   useEffect(() => {
//     const c = canvasRef.current;
//     if (!c) return;
//     const r = c.getBoundingClientRect();

//     const left = (item.x / c.width) * r.width;
//     const top = (item.y / c.height) * r.height;
//     const w = (item.w / c.width) * r.width;
//     const h = (item.h / c.height) * r.height;
//     setPx({ left, top, w, h });
//   }, [canvasRef, item.x, item.y, item.w, item.h]);

//   const interactive = tool === "text";

//   const onPointerDown = (e: React.PointerEvent) => {
//     if (!interactive || editing) return;
//     e.stopPropagation();
//     onSelect();
//     drag.current = { x: e.clientX, y: e.clientY };
//     (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
//   };

//   const onPointerMove = (e: React.PointerEvent) => {
//     if (!interactive || editing) return;
//     if (!drag.current) return;
//     const c = canvasRef.current;
//     if (!c) return;
//     const r = c.getBoundingClientRect();

//     const dxPx = e.clientX - drag.current.x;
//     const dyPx = e.clientY - drag.current.y;
//     drag.current = { x: e.clientX, y: e.clientY };

//     const dxCanvas = (dxPx / r.width) * c.width;
//     const dyCanvas = (dyPx / r.height) * c.height;
//     onMove(dxCanvas, dyCanvas);
//   };

//   const onPointerUp = (e: React.PointerEvent) => {
//     if (!interactive) return;
//     drag.current = null;
//     resize.current = null;
//     try {
//       (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
//     } catch {
//       // ignore
//     }
//   };

//   const onResizeDown = (e: React.PointerEvent) => {
//     if (!interactive || editing) return;
//     e.stopPropagation();
//     onSelect();
//     resize.current = { x: e.clientX, y: e.clientY };
//     (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
//   };

//   const onResizeMove = (e: React.PointerEvent) => {
//     if (!interactive || editing) return;
//     if (!resize.current) return;
//     const c = canvasRef.current;
//     if (!c) return;
//     const r = c.getBoundingClientRect();

//     const dxPx = e.clientX - resize.current.x;
//     const dyPx = e.clientY - resize.current.y;
//     resize.current = { x: e.clientX, y: e.clientY };

//     const dwCanvas = (dxPx / r.width) * c.width;
//     const dhCanvas = (dyPx / r.height) * c.height;
//     onResize(dwCanvas, dhCanvas);
//   };

//   const onResizeUp = (e: React.PointerEvent) => {
//     if (!interactive) return;
//     resize.current = null;
//     try {
//       (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
//     } catch {
//       // ignore
//     }
//   };

//   if (!px) return null;

//   return (
//     <div
//       className={`textBox ${selected ? "textBoxSel" : ""}`}
//       style={{
//         left: px.left,
//         top: px.top,
//         width: px.w,
//         height: px.h,
//         fontFamily: item.fontCss,
//         fontSize: `${item.fontSize}px`,
//         color: item.color,
//         pointerEvents: interactive ? "auto" : "none",
//         cursor: interactive ? "text" : "default",
//         zIndex: 5,
//       }}
//       onPointerDown={onPointerDown}
//       onPointerMove={onPointerMove}
//       onPointerUp={onPointerUp}
//       onDoubleClick={(e) => {
//         if (!interactive) return;
//         e.stopPropagation();
//         onDoubleClick();
//       }}
//     >
//       {editing ? (
//         <textarea
//           autoFocus
//           value={item.text}
//           onChange={(e) => onChangeText(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Escape") {
//               e.preventDefault();
//               onCancelEdit();
//             }
//             if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
//               e.preventDefault();
//               onCommitEdit();
//             }
//           }}
//           onBlur={onCommitEdit}
//           className="textEdit"
//           placeholder="Type… (Ctrl/⌘+Enter to finish)"
//         />
//       ) : (
//         <div className="textDisplay">{item.text}</div>
//       )}

//       {selected && interactive && !editing && (
//         <div
//           className="resizeHandle"
//           onPointerDown={onResizeDown}
//           onPointerMove={onResizeMove}
//           onPointerUp={onResizeUp}
//           title="Drag to resize"
//         />
//       )}
//     </div>
//   );
// }

// function CameraBox({
//   item,
//   tool,
//   selected,
//   onSelect,
//   onMove,
//   onResize,
//   canvasRef,
//   stream,
//   streamVersion,
//   micBars,
//   frame,
//   border,
// }: {
//   item: { id: string; x: number; y: number; w: number; h: number };
//   tool: "brush" | "rect" | "line" | "text" | "fill" | "camera";
//   selected: boolean;
//   onSelect: () => void;
//   onMove: (dx: number, dy: number) => void;
//   onResize: (dw: number, dh: number) => void;
//   canvasRef: React.RefObject<HTMLCanvasElement | null>;
//   stream: MediaStream | null;
//   streamVersion: number;
//   micBars: number[];
//   frame: "classic" | "rounded" | "neumorph";
//   border: boolean;
// }) {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const [px, setPx] = useState<{ left: number; top: number; w: number; h: number } | null>(null);
//   const drag = useRef<{ x: number; y: number } | null>(null);
//   const resize = useRef<{ x: number; y: number } | null>(null);

//   useEffect(() => {
//     const c = canvasRef.current;
//     if (!c) return;
//     const r = c.getBoundingClientRect();

//     const left = (item.x / c.width) * r.width;
//     const top = (item.y / c.height) * r.height;
//     const w = (item.w / c.width) * r.width;
//     const h = (item.h / c.height) * r.height;
//     setPx({ left, top, w, h });
//   }, [canvasRef, item.x, item.y, item.w, item.h]);

//   // Important: stream is set via state; version bumps ensure this effect re-runs
//   useEffect(() => {
//     const v = videoRef.current;
//     if (!v) return;
//     if (!stream) return;

//     try {
//       if (v.srcObject !== stream) v.srcObject = stream;
//       v.muted = true;
//       v.playsInline = true;

//       const play = () => {
//         v.play().catch(() => {
//           // Some browsers can block autoplay; user gesture (placing camera) usually allows this.
//         });
//       };

//       if (v.readyState >= 2) play();
//       else v.onloadedmetadata = play;
//     } catch {
//       // ignore
//     }
//   }, [stream, streamVersion]);

//   const interactive = tool === "camera";

//   const onPointerDown = (e: React.PointerEvent) => {
//     if (!interactive) return;
//     e.stopPropagation();
//     onSelect();
//     drag.current = { x: e.clientX, y: e.clientY };
//     (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
//   };

//   const onPointerMove = (e: React.PointerEvent) => {
//     if (!interactive) return;
//     if (!drag.current) return;
//     const c = canvasRef.current;
//     if (!c) return;
//     const r = c.getBoundingClientRect();

//     const dxPx = e.clientX - drag.current.x;
//     const dyPx = e.clientY - drag.current.y;
//     drag.current = { x: e.clientX, y: e.clientY };

//     const dxCanvas = (dxPx / r.width) * c.width;
//     const dyCanvas = (dyPx / r.height) * c.height;
//     onMove(dxCanvas, dyCanvas);
//   };

//   const onPointerUp = (e: React.PointerEvent) => {
//     if (!interactive) return;
//     drag.current = null;
//     resize.current = null;
//     try {
//       (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
//     } catch {
//       // ignore
//     }
//   };

//   const onResizeDown = (e: React.PointerEvent) => {
//     if (!interactive) return;
//     e.stopPropagation();
//     onSelect();
//     resize.current = { x: e.clientX, y: e.clientY };
//     (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
//   };

//   const onResizeMove = (e: React.PointerEvent) => {
//     if (!interactive) return;
//     if (!resize.current) return;
//     const c = canvasRef.current;
//     if (!c) return;
//     const r = c.getBoundingClientRect();

//     const dxPx = e.clientX - resize.current.x;
//     const dyPx = e.clientY - resize.current.y;
//     resize.current = { x: e.clientX, y: e.clientY };

//     const dwCanvas = (dxPx / r.width) * c.width;
//     const dhCanvas = (dyPx / r.height) * c.height;
//     onResize(dwCanvas, dhCanvas);
//   };

//   const onResizeUp = (e: React.PointerEvent) => {
//     if (!interactive) return;
//     resize.current = null;
//     try {
//       (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
//     } catch {
//       // ignore
//     }
//   };

//   if (!px) return null;

//   const pad = frame === "neumorph" ? 7 : 0;
//   const radius = frame === "rounded" || frame === "neumorph" ? 12 : 0;

//   return (
//     <div
//       className={`camBox ${selected ? "camBoxSel" : ""} ${frame === "neumorph" ? "camNeu" : ""}`}
//       style={{
//         left: px.left,
//         top: px.top,
//         width: px.w,
//         height: px.h,
//         pointerEvents: interactive ? "auto" : "none",
//         cursor: interactive ? "move" : "default",
//         border: border ? "1px solid #000" : "none",
//         borderRadius: radius,
//         padding: pad,
//       }}
//       onPointerDown={onPointerDown}
//       onPointerMove={onPointerMove}
//       onPointerUp={onPointerUp}
//     >
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         muted
//         className="camVideo"
//         style={{
//           objectFit: "cover",
//           inset: pad,
//           borderRadius: Math.max(0, radius - 2),
//         }}
//       />

//       {/* waveform overlay */}
//       <div className="camWave" aria-hidden>
//         {micBars.slice(0, 12).map((v, i) => (
//           <div
//             key={i}
//             className="camBar"
//             style={{ height: `${Math.max(3, Math.round(3 + v * 18))}px`, opacity: 0.85 }}
//           />
//         ))}
//       </div>

//       {/* selection handles */}
//       {selected && interactive && (
//         <>
//           <div className="camHandle camTL" />
//           <div className="camHandle camTR" />
//           <div className="camHandle camBL" />
//           <div
//             className="camHandle camBR"
//             onPointerDown={onResizeDown}
//             onPointerMove={onResizeMove}
//             onPointerUp={onResizeUp}
//             title="Resize"
//           />
//         </>
//       )}
//     </div>
//   );
// }

// const styles = `
// /* Win95-ish surfaces */
// .win95{
//   background:#c0c0c0;
//   border:2px solid #000;
//   box-shadow: 0 0 0 1px #dfdfdf, 0 0 0 2px #000;
//   overflow:hidden;
// }

// .winInset{
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #404040;
// }

// .winbtn{
//   width:28px;
//   height:22px;
//   background:#c0c0c0;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
//   font-size:12px;
//   line-height:1;
//   display:flex;
//   align-items:center;
//   justify-content:center;
// }
// .winbtn:active{
//   box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
// }
// .winbtnClose{ font-weight:800; }

// .toolTop{
//   width:28px;
//   height:22px;
//   background:#c0c0c0;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
//   display:flex;
//   align-items:center;
//   justify-content:center;
// }
// .toolTop:disabled{ opacity:0.45; }
// .toolTop:active:not(:disabled){
//   box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
// }

// .tool95{
//   height:34px;
//   background:#c0c0c0;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
//   display:flex;
//   align-items:center;
//   justify-content:center;
// }
// .tool95:active{
//   box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
// }
// .tool95On{
//   background:#b9b9b9;
//   box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
// }

// .brushOpt{
//   width:28px;
//   height:28px;
//   background:#c0c0c0;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
//   display:flex;
//   align-items:center;
//   justify-content:center;
// }
// .brushOpt:active{
//   box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
// }
// .brushOptOn{
//   background:#b9b9b9;
//   box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
// }

// .rectOpt{
//   width:100%;
//   height:32px;
//   background:#c0c0c0;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
//   display:flex;
//   align-items:center;
//   justify-content:center;
// }
// .rectOpt:active{
//   box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
// }
// .rectOptOn{
//   background:#b9b9b9;
//   box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
// }

// .swatch95{
//   width:18px;
//   height:18px;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 rgba(255,255,255,.75), inset -1px -1px 0 rgba(0,0,0,.25);
// }
// .swatch95P{ outline: 2px dotted #000; outline-offset: 1px; }
// .swatch95S{ box-shadow: inset 1px 1px 0 rgba(255,255,255,.75), inset -1px -1px 0 rgba(0,0,0,.25), 0 0 0 2px #fff; }

// .winKey{
//   display:inline-block;
//   padding:0 6px;
//   border:1px solid #000;
//   background:#d6d6d6;
//   box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #404040;
//   line-height:18px;
// }

// /* MS Paint-ish text options */
// .textOptRow{ display:flex; align-items:center; gap:8px; margin-bottom:8px; }
// .textOptLabel{ width:40px; font-size:12px; }
// .winSelect{
//   flex:1;
//   height:24px;
//   background:#fff;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #404040;
//   font-family: "MS Sans Serif", Tahoma, system-ui;
//   font-size: 12px;
//   padding: 0 6px;
// }
// .textOptHint{ font-size:11px; opacity:.8; line-height:1.2; }

// /* Text overlay */
// .textBox{ position:absolute; background: transparent; border: 1px dashed transparent; padding: 2px; box-sizing: border-box; user-select: none; }
// .textBoxSel{ border-color:#0b2b7a; }
// .textDisplay{ width:100%; height:100%; white-space: pre-wrap; overflow:hidden; }
// .textEdit{
//   width:100%; height:100%; font: inherit; color: inherit;
//   background: rgba(255,255,255,0.92);
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #404040;
//   padding: 4px 6px;
//   resize: none;
//   outline: none;
// }
// .resizeHandle{
//   position:absolute;
//   width:10px; height:10px;
//   right:-6px; bottom:-6px;
//   background:#0b2b7a;
//   border:1px solid #000;
//   box-shadow: inset 1px 1px 0 rgba(255,255,255,.7), inset -1px -1px 0 rgba(0,0,0,.2);
//   cursor: nwse-resize;
// }

// /* Camera element */
// .camBox{
//   position:absolute;
//   background:#000;
//   overflow:hidden;
//   box-shadow: inset 1px 1px 0 rgba(255,255,255,.65), inset -1px -1px 0 rgba(0,0,0,.25);
// }
// .camNeu{
//   background:#c8c8c8;
//   box-shadow: 6px 6px 12px rgba(0,0,0,.22), -4px -4px 10px rgba(255,255,255,.65);
// }
// .camBoxSel{ outline: 1px dotted #fff; outline-offset: -3px; }
// .camVideo{ position:absolute; width:100%; height:100%; }

// .camHandle{
//   position:absolute;
//   width:12px; height:12px;
//   background:#fff;
//   border:1px solid rgba(0,0,0,.9);
//   box-shadow: 0 0 0 1px rgba(255,255,255,.35);
// }
// .camTL{ left:-7px; top:-7px; }
// .camTR{ right:-7px; top:-7px; }
// .camBL{ left:-7px; bottom:-7px; }
// .camBR{ right:-7px; bottom:-7px; cursor:nwse-resize; }

// .camWave{
//   position:absolute;
//   right:8px;
//   bottom:8px;
//   display:flex;
//   align-items:flex-end;
//   gap:2px;
//   padding:6px;
//   background: rgba(0,0,0,.18);
// }
// .camBar{ width:3px; background:#fff; }

// @media (max-width: 720px){
//   .tool95{ height:32px; }
// }
// `;


// ===== Chunk 1/5 =====
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Brush,
  Square,
  Slash,
  Type as TypeIcon,
  PaintBucket,
  Undo2,
  Redo2,
  Camera,
  ChevronDown,
  Check,
} from "lucide-react";

/**
 * MS Paint-ish UI (responsive)
 *
 * Fix pack:
 * - Robust Win95 menus (dropdowns, hit targets, no "dies after camera")
 * - Live Palette mode: reliable sampling loop + real video readiness gating
 *   - Hotkeys: P toggle Live Palette, O manual refresh (only when enabled + manual mode)
 * - Hotkeys never interfere while typing (inputs/textarea/select/contenteditable)
 * - Camera per-element options (frame/border/accent stored on each cam)
 * - Flat vs Classic distinct: one uses accent-colored drop shadow
 * - Ellipse frame: selection border + handles always show
 * - Camera delete: Backspace/Delete removes selected camera (any tool), unless typing
 *
 * Notes:
 * - Resizing: kept bottom-right only for reliability (matches your original behavior).
 */

export default function MSPaintV0() {
  const DEFAULT_PALETTE = useMemo(
    () => [
      "#000000",
      "#7f7f7f",
      "#ffffff",
      "#ff0000",
      "#ffff00",
      "#00ff00",
      "#00ffff",
      "#0000ff",
      "#ff00ff",
      "#ff7f00",
      "#7f3f00",
      "#3f3f3f",
    ],
    []
  );

  type Tool = "brush" | "rect" | "line" | "text" | "fill" | "camera";
  const [tool, setTool] = useState<Tool>("brush");

  // Palette (can be overridden by live palette)
  const [palette, setPalette] = useState<string[]>(DEFAULT_PALETTE);

  const [primary, setPrimary] = useState(palette[0]);
  const [secondary, setSecondary] = useState(palette[2]);

  // keep refs in sync so swap is always correct
  const primaryRef = useRef(primary);
  const secondaryRef = useRef(secondary);
  useEffect(() => void (primaryRef.current = primary), [primary]);
  useEffect(() => void (secondaryRef.current = secondary), [secondary]);

  // When palette changes (e.g., live palette), keep primary/secondary valid
  useEffect(() => {
    // If current primary/secondary no longer exist in palette, keep them as-is.
    // (MS Paint allows any color, but we only have palette buttons. This is fine.)
    // However, we should at least ensure initial palette sets default.
    if (!primary) setPrimary(palette[0] ?? "#000000");
    if (!secondary) setSecondary(palette[2] ?? "#ffffff");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palette]);

  const swapColors = () => {
    const p = primaryRef.current;
    const s = secondaryRef.current;
    setPrimary(s);
    setSecondary(p);
  };

  // ===== Brush presets =====
  type BrushKind = "round" | "square" | "calligraphy" | "spray" | "marker";
  type BrushPreset = {
    id: string;
    kind: BrushKind;
    size: number;
    angleDeg?: number;
    alpha?: number;
    density?: number;
  };

  const brushPresets: BrushPreset[] = useMemo(
    () => [
      { id: "r2", kind: "round", size: 2 },
      { id: "r4", kind: "round", size: 4 },
      { id: "r6", kind: "round", size: 6 },
      { id: "r10", kind: "round", size: 10 },
      { id: "s2", kind: "square", size: 2 },
      { id: "s4", kind: "square", size: 4 },
      { id: "s6", kind: "square", size: 6 },
      { id: "s10", kind: "square", size: 10 },
      { id: "c10", kind: "calligraphy", size: 10, angleDeg: 35 },
      { id: "c16", kind: "calligraphy", size: 16, angleDeg: 35 },
      { id: "m12", kind: "marker", size: 12, alpha: 0.35 },
      { id: "spr", kind: "spray", size: 14, density: 22 },
    ],
    []
  );

  const [brushPresetId, setBrushPresetId] = useState<string>(brushPresets[0].id);
  const brushPreset = useMemo(
    () => brushPresets.find((b) => b.id === brushPresetId) ?? brushPresets[0],
    [brushPresetId, brushPresets]
  );

  // ===== Rectangle options =====
  type RectMode = "outline" | "fill" | "both";
  const [rectMode, setRectMode] = useState<RectMode>("outline");

  // ===== Text options =====
  const textFonts = useMemo(
    () => [
      { id: "ms", name: "MS Sans Serif", css: "MS Sans Serif, Tahoma, system-ui" },
      { id: "tahoma", name: "Tahoma", css: "Tahoma, system-ui" },
      { id: "courier", name: "Courier New", css: "'Courier New', ui-monospace, SFMono-Regular, Menlo, monospace" },
      { id: "georgia", name: "Georgia", css: "Georgia, serif" },
    ],
    []
  );
  const [textFontId, setTextFontId] = useState(textFonts[0].id);
  const textFont = useMemo(
    () => textFonts.find((f) => f.id === textFontId) ?? textFonts[0],
    [textFontId, textFonts]
  );
  const DEFAULT_TEXT_SIZE = 18;

  type TextItem = {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    text: string;
    fontCss: string;
    fontName: string;
    fontSize: number;
    color: string;
  };
  const [texts, setTexts] = useState<TextItem[]>([]);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);

  // ===== Camera items =====
  type CamFrame = "classic" | "flatShadow" | "rounded" | "neumorph" | "ellipse";
  type CamBorderStyle = "none" | "solid" | "dashed";

  type CameraItem = {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    frame: CamFrame;
    borderStyle: CamBorderStyle;
    borderWidth: number;
    accentColor: string; // captured at creation / explicit edit
  };

  const [cams, setCams] = useState<CameraItem[]>([]);
  const [selectedCamId, setSelectedCamId] = useState<string | null>(null);

  // Defaults used only for NEW cameras (and applied to selected via options)
  const [camDefaultFrame, setCamDefaultFrame] = useState<CamFrame>("classic");
  const [camDefaultBorderStyle, setCamDefaultBorderStyle] = useState<CamBorderStyle>("solid");
  const [camDefaultBorderWidth, setCamDefaultBorderWidth] = useState<number>(1);

  // ===== Shared media stream (camera + mic) =====
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [mediaStreamState, setMediaStreamState] = useState<MediaStream | null>(null);
  const [streamVersion, setStreamVersion] = useState(0);
  const [mediaStatus, setMediaStatus] = useState<"idle" | "ready" | "denied" | "error">("idle");

  // Mic analyser -> 12 bar levels
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const [micBars, setMicBars] = useState<number[]>(() => Array.from({ length: 12 }, () => 0));

  // ===== Live Palette =====
  const [livePaletteOn, setLivePaletteOn] = useState(false);
  type PaletteRefreshMode = "1s" | "3s" | "5s" | "10s" | "manual";
  const [paletteRefreshMode, setPaletteRefreshMode] = useState<PaletteRefreshMode>("3s");
  const [paletteSensitivity, setPaletteSensitivity] = useState<number>(3); // 1..5 (1 = distinct, 5 = more grouping)
  const liveVideoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const paletteTimerRef = useRef<number | null>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);

  // ===== Canvas =====
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<HTMLDivElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const isDown = useRef(false);
  const startPt = useRef<{ x: number; y: number } | null>(null);
  const lastPt = useRef<{ x: number; y: number } | null>(null);
  const previewSnapshot = useRef<ImageData | null>(null);
  const drawColorRef = useRef<string>(primary);

  // Undo/redo snapshot stacks (canvas only)
  const undoStack = useRef<ImageData[]>([]);
  const redoStack = useRef<ImageData[]>([]);
  const [, bumpHistory] = useState(0);

  const toolButtons = useMemo(
    () =>
      [
        { k: "brush" as const, label: "Brush (B)", hotkey: "B", Icon: Brush },
        { k: "line" as const, label: "Line (L)", hotkey: "L", Icon: Slash },
        { k: "rect" as const, label: "Rectangle (R)", hotkey: "R", Icon: Square },
        { k: "fill" as const, label: "Fill (F)", hotkey: "F", Icon: PaintBucket },
        { k: "text" as const, label: "Text (T)", hotkey: "T", Icon: TypeIcon },
        { k: "camera" as const, label: "Camera (C)", hotkey: "C", Icon: Camera },
      ] as const,
    []
  );

  function getCtx() {
    if (!ctxRef.current && canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext("2d", { willReadFrequently: true });
    }
    return ctxRef.current;
  }

  function getPos(e: React.PointerEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const r = canvas.getBoundingClientRect();
    const x = (e.clientX - r.left) * (canvas.width / r.width);
    const y = (e.clientY - r.top) * (canvas.height / r.height);
    return {
      x: Math.max(0, Math.min(canvas.width - 1, x)),
      y: Math.max(0, Math.min(canvas.height - 1, y)),
    };
  }

  function withCtx<T>(fn: (ctx: CanvasRenderingContext2D) => T) {
    const ctx = getCtx();
    if (!ctx) return null;
    return fn(ctx);
  }

  function setCommonStyle(ctx: CanvasRenderingContext2D, color: string) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.imageSmoothingEnabled = false;
    ctx.globalAlpha = 1;
  }

  function setStrokeStyleFromBrush(ctx: CanvasRenderingContext2D, color: string, preset: BrushPreset) {
    setCommonStyle(ctx, color);
    ctx.globalAlpha = preset.alpha ?? 1;
    ctx.lineJoin = "round";

    if (preset.kind === "square") {
      ctx.lineCap = "square";
      ctx.lineWidth = preset.size;
      return;
    }

    ctx.lineCap = "round";
    ctx.lineWidth = preset.size;
  }
// ===== Chunk 2/5 =====
  function savePreviewSnapshot() {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    previewSnapshot.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  function restorePreviewSnapshot() {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas || !previewSnapshot.current) return;
    ctx.putImageData(previewSnapshot.current, 0, 0);
  }

  function pushUndo() {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undoStack.current.push(img);
    redoStack.current = [];
    bumpHistory((n) => n + 1);
  }

  function canUndo() {
    return undoStack.current.length > 1;
  }

  function canRedo() {
    return redoStack.current.length > 0;
  }

  function applyImage(img: ImageData) {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    if (canvas.width !== img.width || canvas.height !== img.height) {
      canvas.width = img.width;
      canvas.height = img.height;
    }
    ctx.putImageData(img, 0, 0);
  }

  function undo() {
    if (!canUndo()) return;
    const current = undoStack.current.pop();
    if (!current) return;
    redoStack.current.push(current);
    const prev = undoStack.current[undoStack.current.length - 1];
    if (prev) applyImage(prev);
    bumpHistory((n) => n + 1);
  }

  function redo() {
    if (!canRedo()) return;
    const img = redoStack.current.pop();
    if (!img) return;
    undoStack.current.push(img);
    applyImage(img);
    bumpHistory((n) => n + 1);
  }

  function drawBrushSegment(from: { x: number; y: number }, to: { x: number; y: number }, color: string, preset: BrushPreset) {
    return withCtx((ctx) => {
      setStrokeStyleFromBrush(ctx, color, preset);

      if (preset.kind === "spray") {
        const density = preset.density ?? 18;
        const r = preset.size;

        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 3));

        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const cx = from.x + dx * t;
          const cy = from.y + dy * t;
          for (let i = 0; i < density; i++) {
            const a = Math.random() * Math.PI * 2;
            const rr = Math.random() * r;
            const px = cx + Math.cos(a) * rr;
            const py = cy + Math.sin(a) * rr;
            ctx.fillRect(px, py, 1, 1);
          }
        }
        ctx.globalAlpha = 1;
        return;
      }

      if (preset.kind === "calligraphy") {
        const angle = ((preset.angleDeg ?? 35) * Math.PI) / 180;
        const w = preset.size;
        const h = Math.max(2, Math.floor(preset.size / 3));

        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 2));

        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const cx = from.x + dx * t;
          const cy = from.y + dy * t;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(angle);
          ctx.fillRect(-w / 2, -h / 2, w, h);
          ctx.restore();
        }

        ctx.globalAlpha = 1;
        return;
      }

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      ctx.globalAlpha = 1;
    });
  }

  function drawLine(a: { x: number; y: number }, b: { x: number; y: number }, color: string) {
    return withCtx((ctx) => {
      restorePreviewSnapshot();
      setCommonStyle(ctx, color);
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    });
  }

  function drawRect(a: { x: number; y: number }, b: { x: number; y: number }, strokeColor: string, mode: RectMode) {
    return withCtx((ctx) => {
      restorePreviewSnapshot();

      const x = Math.min(a.x, b.x);
      const y = Math.min(a.y, b.y);
      const w = Math.abs(a.x - b.x);
      const h = Math.abs(a.y - b.y);

      setCommonStyle(ctx, strokeColor);
      ctx.lineWidth = 2;

      if (mode === "fill") {
        ctx.fillStyle = strokeColor;
        ctx.fillRect(x, y, w, h);
        return;
      }

      if (mode === "both") {
        ctx.fillStyle = secondaryRef.current;
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = strokeColor;
        ctx.strokeRect(x, y, w, h);
        return;
      }

      ctx.strokeStyle = strokeColor;
      ctx.strokeRect(x, y, w, h);
    });
  }

  function hexToRgba(hex: string) {
    const h = hex.replace("#", "");
    const normalized = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const v = parseInt(normalized, 16);
    const r = (v >> 16) & 255;
    const g = (v >> 8) & 255;
    const b = v & 255;
    return [r, g, b, 255] as const;
  }

  function floodFill(x0: number, y0: number, color: string) {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    const w = canvas.width;
    const h = canvas.height;
    const img = ctx.getImageData(0, 0, w, h);
    const data = img.data;

    const ix = (x0 | 0) + (y0 | 0) * w;
    const i0 = ix * 4;

    const target = [data[i0], data[i0 + 1], data[i0 + 2], data[i0 + 3]] as const;
    const fill = hexToRgba(color);

    if (target[0] === fill[0] && target[1] === fill[1] && target[2] === fill[2] && target[3] === fill[3]) return;

    const stack: number[] = [ix];
    const visited = new Uint8Array(w * h);

    const match = (i: number) => {
      const p = i * 4;
      return (
        data[p] === target[0] &&
        data[p + 1] === target[1] &&
        data[p + 2] === target[2] &&
        data[p + 3] === target[3]
      );
    };

    const paint = (i: number) => {
      const p = i * 4;
      data[p] = fill[0];
      data[p + 1] = fill[1];
      data[p + 2] = fill[2];
      data[p + 3] = fill[3];
    };

    while (stack.length) {
      const i = stack.pop()!;
      if (visited[i]) continue;
      visited[i] = 1;
      if (!match(i)) continue;

      paint(i);

      const x = i % w;
      const y = (i / w) | 0;
      if (x > 0) stack.push(i - 1);
      if (x < w - 1) stack.push(i + 1);
      if (y > 0) stack.push(i - w);
      if (y < h - 1) stack.push(i + w);
    }

    ctx.putImageData(img, 0, 0);
  }

  function beginActionColorFromButton(button: number) {
    drawColorRef.current = button === 2 ? secondaryRef.current : primaryRef.current;
  }

  async function ensureMedia() {
    if (mediaStreamRef.current) return mediaStreamRef.current;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true,
      });
      mediaStreamRef.current = stream;
      setMediaStreamState(stream);
      setStreamVersion((v) => v + 1);
      setMediaStatus("ready");
      return stream;
    } catch (e: any) {
      if (e?.name === "NotAllowedError") setMediaStatus("denied");
      else setMediaStatus("error");
      return null;
    }
  }

  function startMicBars(stream: MediaStream) {
    if (analyserRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ac: AudioContext = new AudioCtx();
      audioCtxRef.current = ac;
      const source = ac.createMediaStreamSource(stream);
      const analyser = ac.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.82;
      source.connect(analyser);
      analyserRef.current = analyser;

      const data = new Uint8Array(analyser.frequencyBinCount);

      const tick = () => {
        analyser.getByteFrequencyData(data);
        const bars = 12;
        const step = Math.floor(data.length / bars);
        const out: number[] = [];
        for (let i = 0; i < bars; i++) {
          let sum = 0;
          const start = i * step;
          const end = Math.min(data.length, start + step);
          for (let j = start; j < end; j++) sum += data[j];
          const avg = sum / Math.max(1, end - start);
          out.push(avg / 255);
        }
        setMicBars(out);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } catch {
      // ignore
    }
  }

  // Attach stream to the hidden live palette video (and detect readiness)
  useEffect(() => {
    const v = liveVideoRef.current;
    if (!v) return;
    if (!mediaStreamState) return;

    try {
      if (v.srcObject !== mediaStreamState) v.srcObject = mediaStreamState;
      v.muted = true;
      v.playsInline = true;

      const play = () => {
        v.play().catch(() => {});
      };

      if (v.readyState >= 2) play();
      else v.onloadedmetadata = play;
    } catch {
      // ignore
    }
  }, [mediaStreamState, streamVersion]);

  useEffect(() => {
    const v = liveVideoRef.current;
    if (!v) return;

    const onReady = () => {
      if (v.videoWidth > 0 && v.videoHeight > 0) setVideoReady(true);
    };

    v.addEventListener("loadeddata", onReady);
    v.addEventListener("canplay", onReady);
    return () => {
      v.removeEventListener("loadeddata", onReady);
      v.removeEventListener("canplay", onReady);
    };
  }, []);
// ===== Chunk 3/5 =====
  function rgbToHex(r: number, g: number, b: number) {
    const h = (n: number) => n.toString(16).padStart(2, "0");
    return `#${h(r)}${h(g)}${h(b)}`;
  }

  function rgbToHsl(r: number, g: number, b: number) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    const d = max - min;
    if (d !== 0) {
      s = d / (1 - Math.abs(2 * l - 1));
      switch (max) {
        case r: h = ((g - b) / d) % 6; break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h *= 60;
      if (h < 0) h += 360;
    }
    return { h, s, l };
  }

  function colorDist(a: [number, number, number], b: [number, number, number]) {
    const dr = a[0] - b[0];
    const dg = a[1] - b[1];
    const db = a[2] - b[2];
    return Math.sqrt(dr * dr + dg * dg + db * db);
  }

  function pickTop12FromVideo(sensitivity: number): string[] | null {
    const v = liveVideoRef.current;
    if (!v) return null;
    if (!videoReady || v.videoWidth === 0 || v.videoHeight === 0) return null;

    const w = Math.min(240, v.videoWidth);
    const h = Math.round((w / v.videoWidth) * v.videoHeight);

    if (!offscreenRef.current) offscreenRef.current = document.createElement("canvas");
    const c = offscreenRef.current;
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;

    ctx.drawImage(v, 0, 0, w, h);
    const img = ctx.getImageData(0, 0, w, h);
    const data = img.data;

    // sensitivity: 1..5
    // 1 => finer buckets (more distinct), 5 => coarser buckets (more grouping)
    const step = [12, 16, 20, 28, 36][clamp(sensitivity - 1, 0, 4)];
    const key = (r: number, g: number, b: number) => {
      const rr = Math.round(r / step) * step;
      const gg = Math.round(g / step) * step;
      const bb = Math.round(b / step) * step;
      return `${rr},${gg},${bb}`;
    };

    const buckets = new Map<string, { count: number; r: number; g: number; b: number; score: number }>();

    // Sample stride to keep it cheap
    const stride = 4 * 6; // every ~6th pixel
    for (let i = 0; i < data.length; i += stride) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a < 160) continue;

      const k = key(r, g, b);
      const { s } = rgbToHsl(r, g, b);

      // Weight saturation a bit to avoid "all grey" palettes
      const satBoost = 0.55 + Math.min(0.45, s * 0.6);
      const prev = buckets.get(k);
      if (!prev) {
        buckets.set(k, { count: 1, r, g, b, score: satBoost });
      } else {
        prev.count += 1;
        // keep last rgb (fine) and update score a touch
        prev.score = (prev.score * 0.98) + satBoost * 0.02;
      }
    }

    if (buckets.size < 6) return null;

    const ranked = [...buckets.values()]
      .map((b) => ({
        ...b,
        weight: b.count * b.score,
        rgb: [b.r, b.g, b.b] as [number, number, number],
      }))
      .sort((a, b) => b.weight - a.weight);

    // Diversity picking
    const chosen: { rgb: [number, number, number]; hex: string }[] = [];
    const minDist = [70, 62, 54, 46, 38][clamp(sensitivity - 1, 0, 4)];

    for (const c of ranked) {
      if (chosen.length >= 12) break;
      const ok = chosen.every((x) => colorDist(x.rgb, c.rgb) >= minDist);
      if (ok) chosen.push({ rgb: c.rgb, hex: rgbToHex(c.rgb[0], c.rgb[1], c.rgb[2]) });
    }

    // If we didn't get enough, relax a bit
    if (chosen.length < 12) {
      for (const c of ranked) {
        if (chosen.length >= 12) break;
        const ok = chosen.every((x) => colorDist(x.rgb, c.rgb) >= minDist * 0.65);
        if (ok) chosen.push({ rgb: c.rgb, hex: rgbToHex(c.rgb[0], c.rgb[1], c.rgb[2]) });
      }
    }

    // Still not enough? Just fill from top ranked
    if (chosen.length < 12) {
      for (const c of ranked) {
        if (chosen.length >= 12) break;
        const hex = rgbToHex(c.rgb[0], c.rgb[1], c.rgb[2]);
        if (!chosen.some((x) => x.hex === hex)) chosen.push({ rgb: c.rgb, hex });
      }
    }

    return chosen.slice(0, 12).map((x) => x.hex);
  }

  function refreshLivePalette() {
    const next = pickTop12FromVideo(paletteSensitivity);
    if (!next) return;
    setPalette(next);
  }

  // Single source-of-truth controller for live palette loop
  useEffect(() => {
    if (paletteTimerRef.current) {
      clearInterval(paletteTimerRef.current);
      paletteTimerRef.current = null;
    }

    if (!livePaletteOn) {
      setPalette(DEFAULT_PALETTE);
      return;
    }

    // Ensure media exists when turning on live palette
    (async () => {
      const stream = await ensureMedia();
      if (stream) startMicBars(stream);
    })();

    if (!videoReady) return;

    refreshLivePalette();

    if (paletteRefreshMode === "manual") return;

    const intervalMs =
      paletteRefreshMode === "1s" ? 1000 :
      paletteRefreshMode === "3s" ? 3000 :
      paletteRefreshMode === "5s" ? 5000 :
      10000;

    paletteTimerRef.current = window.setInterval(() => {
      refreshLivePalette();
    }, intervalMs);

    return () => {
      if (paletteTimerRef.current) {
        clearInterval(paletteTimerRef.current);
        paletteTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [livePaletteOn, paletteRefreshMode, paletteSensitivity, videoReady]);

  function isTypingTarget(t: EventTarget | null) {
    const el = t as HTMLElement | null;
    if (!el) return false;
    const tag = el.tagName?.toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return true;
    if (el.isContentEditable) return true;
    return false;
  }

  function deleteSelectedCam() {
    if (!selectedCamId) return;
    setCams((arr) => arr.filter((c) => c.id !== selectedCamId));
    setSelectedCamId(null);
  }

  function applyCamOptionToSelected(patch: Partial<CameraItem>) {
    if (!selectedCamId) return;
    setCams((arr) =>
      arr.map((c) => (c.id === selectedCamId ? { ...c, ...patch } : c))
    );
  }

  function onPointerDown(e: React.PointerEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    beginActionColorFromButton(e.button);

    const p = getPos(e);
    isDown.current = true;
    startPt.current = p;
    lastPt.current = p;

    if (tool === "line" || tool === "rect") savePreviewSnapshot();

    if (tool === "fill") {
      floodFill(p.x | 0, p.y | 0, drawColorRef.current);
      pushUndo();
      isDown.current = false;
      return;
    }

    if (tool === "text") {
      const id = `t_${Math.random().toString(16).slice(2)}`;
      const item: TextItem = {
        id,
        x: p.x,
        y: p.y,
        w: 220,
        h: 54,
        text: "",
        fontCss: textFont.css,
        fontName: textFont.name,
        fontSize: DEFAULT_TEXT_SIZE,
        color: primaryRef.current,
      };
      setTexts((arr) => [...arr, item]);
      setSelectedTextId(id);
      setEditingTextId(id);
      isDown.current = false;
      return;
    }

    if (tool === "camera") {
      (async () => {
        const stream = await ensureMedia();
        if (stream) startMicBars(stream);
      })();

      const id = `c_${Math.random().toString(16).slice(2)}`;
      const cam: CameraItem = {
        id,
        x: p.x,
        y: p.y,
        w: 260,
        h: 180,
        frame: camDefaultFrame,
        borderStyle: camDefaultBorderStyle,
        borderWidth: camDefaultBorderWidth,
        accentColor: primaryRef.current, // capture at creation
      };
      setCams((arr) => [...arr, cam]);
      setSelectedCamId(id);
      isDown.current = false;
      return;
    }

    if (tool === "brush") {
      drawBrushSegment(p, { x: p.x + 0.01, y: p.y + 0.01 }, drawColorRef.current, brushPreset);
    }

    canvas.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDown.current) return;
    const p = getPos(e);

    if (tool === "brush") {
      const last = lastPt.current;
      if (last) drawBrushSegment(last, p, drawColorRef.current, brushPreset);
      lastPt.current = p;
      return;
    }

    if (tool === "line") {
      const a = startPt.current;
      if (a) drawLine(a, p, drawColorRef.current);
      return;
    }

    if (tool === "rect") {
      const a = startPt.current;
      if (a) drawRect(a, p, drawColorRef.current, rectMode);
      return;
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!isDown.current) return;
    isDown.current = false;

    if (tool === "brush" || tool === "line" || tool === "rect") pushUndo();

    startPt.current = null;
    lastPt.current = null;

    const canvas = canvasRef.current;
    if (canvas) canvas.releasePointerCapture(e.pointerId);
  }

  // ===== Menus =====
  type MenuKey = "File" | "Edit" | "View" | "Image" | "Options" | "Help" | null;
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const root = appRef.current;
      if (!root) return;
      if (!openMenu) return;
      const target = e.target as Node | null;
      if (!target) return;
      // close if click outside menu system
      const insideMenu = (target as HTMLElement).closest?.("[data-menu-root='1']");
      if (!insideMenu) setOpenMenu(null);
    };

    // capture helps avoid canvas pointer shenanigans
    window.addEventListener("pointerdown", onDown, true);
    return () => window.removeEventListener("pointerdown", onDown, true);
  }, [openMenu]);

  // Global shortcuts:
  // - X swap colors
  // - Ctrl/⌘+Z undo, Ctrl/⌘+Shift+Z redo
  // - Tool hotkeys: B/L/R/F/T/C
  // - Live palette: P toggle, O manual refresh (only when enabled+manual)
  // - Delete selected camera: Backspace/Delete (unless typing)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;

      const key = e.key.toLowerCase();
      const mod = e.metaKey || e.ctrlKey;

      // Undo/redo
      if (mod && key === "z" && e.shiftKey) {
        e.preventDefault();
        redo();
        return;
      }
      if (mod && key === "z") {
        e.preventDefault();
        undo();
        return;
      }

      // Delete selected camera
      if ((e.key === "Backspace" || e.key === "Delete") && selectedCamId) {
        e.preventDefault();
        deleteSelectedCam();
        return;
      }

      // Swap colors
      if (key === "x") {
        e.preventDefault();
        swapColors();
        return;
      }

      // Live palette toggle
      if (key === "p") {
        e.preventDefault();
        setLivePaletteOn((v) => !v);
        return;
      }

      // Manual palette refresh
      if (key === "o") {
        if (!livePaletteOn) return;
        if (paletteRefreshMode !== "manual") return;
        if (!videoReady) return;
        e.preventDefault();
        refreshLivePalette();
        return;
      }

      // Tool hotkeys
      if (key === "b") setToolSafe("brush");
      if (key === "l") setToolSafe("line");
      if (key === "r") setToolSafe("rect");
      if (key === "f") setToolSafe("fill");
      if (key === "t") setToolSafe("text");
      if (key === "c") setToolSafe("camera");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCamId, livePaletteOn, paletteRefreshMode, videoReady]);

  function setToolSafe(next: Tool) {
    setTool(next);
    setOpenMenu(null);
    if (next !== "text") {
      setEditingTextId(null);
      setSelectedTextId(null);
    }
    if (next !== "camera") {
      // keep selection, user wants delete regardless tool; but selection doesn't hurt.
      // setSelectedCamId(null);
    }
  }
// ===== Chunk 4/5 =====
  // Disable context menu on app (right-click used for secondary drawing and palette)
  useEffect(() => {
    const el = appRef.current;
    if (!el) return;
    const onCtx = (ev: MouseEvent) => ev.preventDefault();
    el.addEventListener("contextmenu", onCtx);
    return () => el.removeEventListener("contextmenu", onCtx);
  }, []);

  // Resize canvas to a crisp square matching its rendered size
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvasHostRef.current;
    if (!canvas || !host) return;

    const ro = new ResizeObserver(() => {
      const r = host.getBoundingClientRect();
      const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
      const size = Math.floor(Math.min(r.width, r.height) * dpr);
      if (size <= 0) return;

      const ctx = getCtx();
      if (!ctx) return;

      const prevW = canvas.width || 1;
      const prevH = canvas.height || 1;
      const old = ctx.getImageData(0, 0, prevW, prevH);

      canvas.width = size;
      canvas.height = size;

      const ctx2 = getCtx();
      if (!ctx2) return;
      ctx2.putImageData(old, 0, 0);

      if (undoStack.current.length === 0) {
        undoStack.current.push(ctx2.getImageData(0, 0, canvas.width, canvas.height));
        bumpHistory((n) => n + 1);
      }
    });

    ro.observe(host);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup audio RAF + palette timer on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (paletteTimerRef.current) clearInterval(paletteTimerRef.current);
      try {
        audioCtxRef.current?.close();
      } catch {}
    };
  }, []);

  const rectModes: { k: RectMode; label: string }[] = [
    { k: "outline", label: "Outline" },
    { k: "fill", label: "Fill" },
    { k: "both", label: "Outline + Fill" },
  ];

  const canvasCursor =
    tool === "text" ? "text" :
    tool === "fill" ? "cell" :
    tool === "camera" ? "copy" :
    "crosshair";

  // ===== Render =====
  return (
    <div
      ref={appRef}
      className="min-h-screen w-full bg-[#9db3c7] flex items-center justify-center p-6 text-black"
      style={{ fontFamily: "MS Sans Serif, Tahoma, system-ui" }}
    >
      <div className="w-full max-w-[980px]">
        <div className="win95">
          {/* Title bar */}
          <div className="flex items-center justify-between px-2 py-1 text-white bg-gradient-to-b from-[#2f65c7] to-[#0a2a7a]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="h-4 w-4 bg-white border border-black relative">
                <div
                  className="absolute left-[2px] top-[2px] h-2.5 w-2.5 border border-black"
                  style={{ background: "radial-gradient(circle at 30% 30%, #ff4, #f80)" }}
                />
              </div>
              <div className="font-bold text-[13px] truncate">untitled - Paint</div>
            </div>
            <div className="flex gap-1">
              <button className="winbtn" title="Minimize">_</button>
              <button className="winbtn" title="Maximize">▢</button>
              <button className="winbtn winbtnClose" title="Close">✕</button>
            </div>
          </div>

          {/* Menu bar (functional) */}
          <div data-menu-root="1" className="relative flex items-center justify-between gap-2 px-2 py-1 border-b border-[#7f7f7f]">
            <div className="flex gap-2">
              {(["File", "Edit", "View", "Image", "Options", "Help"] as const).map((m) => (
                <div key={m} className="relative">
                  <button
                    className={`px-2 py-0.5 text-[13px] hover:bg-white/30 ${openMenu === m ? "menuOn" : ""}`}
                    onClick={() => setOpenMenu((cur) => (cur === m ? null : m))}
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    {m}
                  </button>

                  {openMenu === m && (
                    <div className="menuDrop" onPointerDown={(e) => e.stopPropagation()}>
                      {m === "Edit" && (
                        <>
                          <MenuItem label="Undo (Ctrl/⌘+Z)" disabled={!canUndo()} onClick={() => { undo(); setOpenMenu(null); }} />
                          <MenuItem label="Redo (Ctrl/⌘+Shift+Z)" disabled={!canRedo()} onClick={() => { redo(); setOpenMenu(null); }} />
                        </>
                      )}

                      {m === "View" && (
                        <>
                          <MenuItem
                            label={`Live Palette (P)`}
                            right={livePaletteOn ? <Check className="h-4 w-4" /> : null}
                            onClick={() => setLivePaletteOn((v) => !v)}
                          />
                          <div className="menuSep" />
                          <div className="menuSubTitle">Live Palette mode</div>
                          <MenuRadioGroup<PaletteRefreshMode>
                            value={paletteRefreshMode}
                            setValue={setPaletteRefreshMode}
                            options={[
                              { v: "1s", label: "Refresh: 1s" },
                              { v: "3s", label: "Refresh: 3s" },
                              { v: "5s", label: "Refresh: 5s" },
                              { v: "10s", label: "Refresh: 10s" },
                              { v: "manual", label: "Refresh: Manual (O)" },
                            ]}
                          />
                          <div className="menuSep" />
                          <MenuItem
                            label="Refresh now (O)"
                            disabled={!livePaletteOn || paletteRefreshMode !== "manual" || !videoReady}
                            onClick={() => refreshLivePalette()}
                          />
                          <div className="menuSep" />
                          <div className="menuRow">
                            <div className="menuLbl">Sensitivity</div>
                            <input
                              type="range"
                              min={1}
                              max={5}
                              value={paletteSensitivity}
                              onChange={(e) => setPaletteSensitivity(parseInt(e.target.value, 10))}
                              className="menuRange"
                            />
                            <div className="menuVal">{paletteSensitivity}</div>
                          </div>
                          <div className="menuHint">
                            Lower = more distinct colours • Higher = more grouping
                          </div>
                        </>
                      )}

                      {m !== "Edit" && m !== "View" && (
                        <>
                          <MenuItem label="(Placeholder)" disabled />
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button className="toolTop" title="Undo (Ctrl/⌘+Z)" onClick={undo} disabled={!canUndo()}>
                <Undo2 className="h-4 w-4" />
              </button>
              <button className="toolTop" title="Redo (Ctrl/⌘+Shift+Z)" onClick={redo} disabled={!canRedo()}>
                <Redo2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex h-[min(62vh,620px)] min-h-[420px]">
            {/* Tools */}
            <div className="w-[124px] border-r border-[#7f7f7f] p-2 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                {toolButtons.map(({ k, label, Icon }) => {
                  const on = tool === k;
                  return (
                    <button
                      key={k}
                      onClick={() => setToolSafe(k)}
                      className={`tool95 ${on ? "tool95On" : ""}`}
                      title={label}
                      aria-pressed={on}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </button>
                  );
                })}
              </div>

              {/* Brush options */}
              {tool === "brush" && (
                <div className="winInset p-2 bg-[#d6d6d6]">
                  <div className="grid grid-cols-2 gap-2">
                    {brushPresets.map((bp) => {
                      const on = bp.id === brushPresetId;
                      return (
                        <button
                          key={bp.id}
                          className={`brushOpt ${on ? "brushOptOn" : ""}`}
                          onClick={() => setBrushPresetId(bp.id)}
                          title={brushPresetTitle(bp)}
                          aria-pressed={on}
                        >
                          <BrushPreview preset={bp} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Rectangle options */}
              {tool === "rect" && (
                <div className="winInset p-2 bg-[#d6d6d6]">
                  <div className="grid grid-cols-1 gap-2">
                    {rectModes.map((m) => {
                      const on = rectMode === m.k;
                      return (
                        <button
                          key={m.k}
                          className={`rectOpt ${on ? "rectOptOn" : ""}`}
                          onClick={() => setRectMode(m.k)}
                          title={m.label}
                          aria-pressed={on}
                        >
                          <RectModeIcon mode={m.k} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Text options */}
              {tool === "text" && (
                <div className="winInset p-2 bg-[#d6d6d6]">
                  <div className="textOptRow">
                    <div className="textOptLabel">Font:</div>
                    <select
                      className="winSelect"
                      value={textFontId}
                      onChange={(e) => setTextFontId(e.target.value)}
                      title="Font"
                    >
                      {textFonts.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="textOptHint">
                    Click to place • Drag to move • Corner to resize (scales text) • Double-click to edit
                  </div>
                </div>
              )}

              {/* Camera options (no extra text) */}
              {tool === "camera" && (
                <div className="winInset p-2 bg-[#d6d6d6]">
                  <div className="text-[12px] leading-snug">
                    <div className="mb-2 opacity-85">
                      {mediaStatus === "idle" && "Camera/mic will ask permission on first use."}
                      {mediaStatus === "ready" && "Camera + mic active."}
                      {mediaStatus === "denied" && "Permission denied (check browser settings)."}
                      {mediaStatus === "error" && "Couldn’t start camera/mic."}
                    </div>

                    <div className="border-t border-black/20 pt-2">
                      <div className="text-[12px] mb-1">Frame (selected)</div>
                      <select
                        className="winSelect"
                        value={selectedCamId ? (cams.find((c) => c.id === selectedCamId)?.frame ?? camDefaultFrame) : camDefaultFrame}
                        onChange={(e) => {
                          const v = e.target.value as CamFrame;
                          if (selectedCamId) applyCamOptionToSelected({ frame: v });
                          else setCamDefaultFrame(v);
                        }}
                      >
                        <option value="classic">Classic</option>
                        <option value="flatShadow">Flat shadow (accent)</option>
                        <option value="rounded">Rounded</option>
                        <option value="neumorph">Neumorphic</option>
                        <option value="ellipse">Ellipse</option>
                      </select>

                      <div className="mt-2 text-[12px] mb-1">Border (selected)</div>
                      <div className="flex items-center gap-2">
                        <select
                          className="winSelect"
                          value={selectedCamId ? (cams.find((c) => c.id === selectedCamId)?.borderStyle ?? camDefaultBorderStyle) : camDefaultBorderStyle}
                          onChange={(e) => {
                            const v = e.target.value as CamBorderStyle;
                            if (selectedCamId) applyCamOptionToSelected({ borderStyle: v });
                            else setCamDefaultBorderStyle(v);
                          }}
                        >
                          <option value="none">No border</option>
                          <option value="solid">Solid</option>
                          <option value="dashed">Dashed</option>
                        </select>

                        <select
                          className="winSelect winSelectNarrow"
                          value={selectedCamId ? (cams.find((c) => c.id === selectedCamId)?.borderWidth ?? camDefaultBorderWidth) : camDefaultBorderWidth}
                          onChange={(e) => {
                            const n = parseInt(e.target.value, 10);
                            if (selectedCamId) applyCamOptionToSelected({ borderWidth: n });
                            else setCamDefaultBorderWidth(n);
                          }}
                          title="Border width"
                        >
                          <option value={1}>1px</option>
                          <option value={2}>2px</option>
                          <option value={3}>3px</option>
                        </select>
                      </div>

                      <div className="mt-2 text-[12px] mb-1">Accent (selected)</div>
                      <button
                        className="winMiniBtn"
                        onClick={() => {
                          // Apply current primary to selected (or default for new)
                          if (selectedCamId) applyCamOptionToSelected({ accentColor: primaryRef.current });
                        }}
                        title="Set selected camera accent to current primary"
                        disabled={!selectedCamId}
                      >
                        Use primary
                      </button>

                      <div className="mt-2 text-[11px] opacity-75">
                        Tip: Select a camera then adjust options • Del/Backspace deletes selection
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex-1 winInset" />
            </div>

            {/* Work area */}
            <div className="flex-1 p-2">
              <div className="winInset h-full p-2 bg-[#bdbdbd]">
                <div className="relative h-full w-full bg-white border border-black">
                  <div className="absolute inset-2 flex items-center justify-center">
                    <div ref={canvasHostRef} className="relative w-full h-full max-h-full max-w-full aspect-square">
                      <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full bg-white"
                        style={{ cursor: canvasCursor }}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                      />

                      {/* Hidden video used only for palette sampling */}
                      <video ref={liveVideoRef} className="hidden" />

                      {/* Text overlay wrapper */}
                      <div className="absolute inset-0 pointer-events-none z-20">
                        {texts.map((t) => (
                          <TextBox
                            key={t.id}
                            item={t}
                            tool={tool}
                            selected={selectedTextId === t.id}
                            editing={editingTextId === t.id}
                            onSelect={() => {
                              if (tool === "text") setSelectedTextId(t.id);
                            }}
                            onDoubleClick={() => {
                              if (tool === "text") {
                                setSelectedTextId(t.id);
                                setEditingTextId(t.id);
                              }
                            }}
                            onChangeText={(val) =>
                              setTexts((arr) => arr.map((x) => (x.id === t.id ? { ...x, text: val } : x)))
                            }
                            onCommitEdit={() => setEditingTextId(null)}
                            onCancelEdit={() => {
                              setEditingTextId(null);
                              setTexts((arr) => arr.filter((x) => !(x.id === t.id && x.text.trim() === "")));
                            }}
                            onMove={(dx, dy) =>
                              setTexts((arr) =>
                                arr.map((x) =>
                                  x.id === t.id
                                    ? {
                                        ...x,
                                        x: clamp(x.x + dx, 0, (canvasRef.current?.width ?? 1) - 1),
                                        y: clamp(x.y + dy, 0, (canvasRef.current?.height ?? 1) - 1),
                                      }
                                    : x
                                )
                              )
                            }
                            onResize={(dw, dh) =>
                              setTexts((arr) =>
                                arr.map((x) => {
                                  if (x.id !== t.id) return x;
                                  const w = Math.max(40, x.w + dw);
                                  const h = Math.max(26, x.h + dh);
                                  const fontSize = clamp(Math.round(h * 0.55), 8, 96);
                                  return { ...x, w, h, fontSize };
                                })
                              )
                            }
                            canvasRef={canvasRef}
                          />
                        ))}
                      </div>

                      {/* Camera overlay layer */}
                      <div className="absolute inset-0 pointer-events-none z-30">
                        {cams.map((c) => (
                          <CameraBox
                            key={c.id}
                            item={c}
                            tool={tool}
                            selected={selectedCamId === c.id}
                            onSelect={() => setSelectedCamId(c.id)}
                            onMove={(dx, dy) =>
                              setCams((arr) =>
                                arr.map((x) =>
                                  x.id === c.id
                                    ? {
                                        ...x,
                                        x: clamp(x.x + dx, 0, (canvasRef.current?.width ?? 1) - 1),
                                        y: clamp(x.y + dy, 0, (canvasRef.current?.height ?? 1) - 1),
                                      }
                                    : x
                                )
                              )
                            }
                            onResize={(dw, dh) =>
                              setCams((arr) =>
                                arr.map((x) =>
                                  x.id === c.id
                                    ? {
                                        ...x,
                                        w: Math.max(120, x.w + dw),
                                        h: Math.max(90, x.h + dh),
                                      }
                                    : x
                                )
                              )
                            }
                            canvasRef={canvasRef}
                            stream={mediaStreamState}
                            streamVersion={streamVersion}
                            micBars={micBars}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#dfdfdf] border-b border-[#7f7f7f] px-2 py-2">
            <div className="flex items-end gap-3">
              <button className="relative h-[44px] w-[56px]" onClick={swapColors} title="Swap colors (X)">
                <div className="absolute left-1 top-2 h-7 w-9 border border-black winInset" style={{ background: primary }} />
                <div className="absolute left-5 top-0 h-7 w-9 border border-black winInset" style={{ background: secondary }} />
                <div className="absolute left-1 top-2 h-7 w-9 border border-black winInset z-10 pointer-events-none" style={{ background: primary }} />
              </button>

              <div className="winInset inline-block p-2 bg-[#d6d6d6]">
                <div className="grid grid-cols-6 gap-1">
                  {palette.map((c) => (
                    <button
                      key={c}
                      className={`swatch95 ${c === primary ? "swatch95P" : ""} ${c === secondary ? "swatch95S" : ""}`}
                      style={{ background: c }}
                      title={`${c} (click=primary, right-click=secondary)`}
                      onClick={() => setPrimary(c)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setSecondary(c);
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="ml-auto text-[12px] opacity-80 select-none">
                Right-click uses secondary • <span className="winKey">X</span> swaps • Palette <span className="winKey">P</span> • Refresh <span className="winKey">O</span>
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-2 py-1 border-t border-[#dfdfdf]">
            <div className="text-[12px] truncate">For Help, click Help Topics on the Help Menu</div>
            <div className="flex items-center gap-2">
              <div className="winInset px-2 py-0.5 text-[12px] min-w-[250px]">
                {tool}
                {tool === "brush" ? ` • ${brushPresetTitle(brushPreset)}` : ""}
                {tool === "rect" ? ` • ${rectMode}` : ""}
                {tool === "text" ? ` • ${textFont.name}` : ""}
                {tool === "camera" ? ` • ${mediaStatus}` : ""}
                {livePaletteOn ? ` • live palette ${paletteRefreshMode}` : ""}
              </div>
              <div className="h-4 w-5 winInset bg-[repeating-linear-gradient(135deg,#a6a6a6_0_2px,#cfcfcf_2px_4px)]" />
            </div>
          </div>
        </div>
      </div>

      <style>{styles}</style>
    </div>
  );
}

// ===== Small menu helpers =====
function MenuItem({
  label,
  onClick,
  disabled,
  right,
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  right?: React.ReactNode;
}) {
  return (
    <button
      className={`menuItem ${disabled ? "menuDis" : ""}`}
      onClick={disabled ? undefined : onClick}
      type="button"
    >
      <span>{label}</span>
      {right ? <span className="menuRight">{right}</span> : null}
    </button>
  );
}

function MenuRadioGroup<T extends string>({
  value,
  setValue,
  options,
}: {
  value: T;
  setValue: (v: T) => void;
  options: { v: T; label: string }[];
}) {
  return (
    <div className="menuRadio">
      {options.map((o) => (
        <button
          key={o.v}
          className="menuItem"
          onClick={() => setValue(o.v)}
          type="button"
        >
          <span className="menuDot">{value === o.v ? "●" : " "}</span>
          <span>{o.label}</span>
        </button>
      ))}
    </div>
  );
}
// ===== Chunk 5/5 =====
function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function brushPresetTitle(p: { kind: string; size: number; alpha?: number; density?: number; angleDeg?: number }) {
  if (p.kind === "spray") return `Spray ${p.size}px`;
  if (p.kind === "marker") return `Marker ${p.size}px`;
  if (p.kind === "calligraphy") return `Calligraphy ${p.size}px`;
  return `${p.kind[0].toUpperCase() + p.kind.slice(1)} ${p.size}px`;
}

function BrushPreview({ preset }: { preset: { kind: string; size: number; angleDeg?: number } }) {
  const s = 22;
  const mid = s / 2;

  if (preset.kind === "spray") {
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const r = 6 + (i % 3);
          const x = mid + Math.cos(a) * r;
          const y = mid + Math.sin(a) * r;
          return <rect key={i} x={x} y={y} width="1" height="1" fill="#000" />;
        })}
        <rect x={mid} y={mid} width="1" height="1" fill="#000" />
      </svg>
    );
  }

  if (preset.kind === "calligraphy") {
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
        <g transform={`translate(${mid} ${mid}) rotate(${preset.angleDeg ?? 35})`}>
          <rect x={-8} y={-2} width={16} height={4} fill="#000" />
        </g>
      </svg>
    );
  }

  if (preset.kind === "square") {
    const w = Math.min(12, Math.max(3, Math.round(preset.size / 2)));
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
        <rect x={mid - w / 2} y={mid - w / 2} width={w} height={w} fill="#000" />
      </svg>
    );
  }

  const r = Math.min(6, Math.max(2, Math.round(preset.size / 3)));
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
      <circle cx={mid} cy={mid} r={r} fill="#000" />
    </svg>
  );
}

function RectModeIcon({ mode }: { mode: "outline" | "fill" | "both" }) {
  return (
    <svg width={44} height={18} viewBox="0 0 44 18" aria-hidden>
      {mode === "outline" && <rect x="7" y="4" width="30" height="10" fill="none" stroke="#000" strokeWidth="2" />}
      {mode === "fill" && <rect x="7" y="4" width="30" height="10" fill="#666" stroke="none" />}
      {mode === "both" && (
        <>
          <rect x="7" y="4" width="30" height="10" fill="#666" />
          <rect x="7" y="4" width="30" height="10" fill="none" stroke="#000" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}

function TextBox({
  item,
  tool,
  selected,
  editing,
  onSelect,
  onDoubleClick,
  onChangeText,
  onCommitEdit,
  onCancelEdit,
  onMove,
  onResize,
  canvasRef,
}: {
  item: {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    text: string;
    fontCss: string;
    fontName: string;
    fontSize: number;
    color: string;
  };
  tool: "brush" | "rect" | "line" | "text" | "fill" | "camera";
  selected: boolean;
  editing: boolean;
  onSelect: () => void;
  onDoubleClick: () => void;
  onChangeText: (val: string) => void;
  onCommitEdit: () => void;
  onCancelEdit: () => void;
  onMove: (dx: number, dy: number) => void;
  onResize: (dw: number, dh: number) => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}) {
  const [px, setPx] = useState<{ left: number; top: number; w: number; h: number } | null>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const resize = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    const left = (item.x / c.width) * r.width;
    const top = (item.y / c.height) * r.height;
    const w = (item.w / c.width) * r.width;
    const h = (item.h / c.height) * r.height;
    setPx({ left, top, w, h });
  }, [canvasRef, item.x, item.y, item.w, item.h]);

  const interactive = tool === "text";

  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive || editing) return;
    e.stopPropagation();
    onSelect();
    drag.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!interactive || editing) return;
    if (!drag.current) return;
    const c = canvasRef.current;
    if (!c) return;
    const r = c.getBoundingClientRect();

    const dxPx = e.clientX - drag.current.x;
    const dyPx = e.clientY - drag.current.y;
    drag.current = { x: e.clientX, y: e.clientY };

    const dxCanvas = (dxPx / r.width) * c.width;
    const dyCanvas = (dyPx / r.height) * c.height;
    onMove(dxCanvas, dyCanvas);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!interactive) return;
    drag.current = null;
    resize.current = null;
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const onResizeDown = (e: React.PointerEvent) => {
    if (!interactive || editing) return;
    e.stopPropagation();
    onSelect();
    resize.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onResizeMove = (e: React.PointerEvent) => {
    if (!interactive || editing) return;
    if (!resize.current) return;
    const c = canvasRef.current;
    if (!c) return;
    const r = c.getBoundingClientRect();

    const dxPx = e.clientX - resize.current.x;
    const dyPx = e.clientY - resize.current.y;
    resize.current = { x: e.clientX, y: e.clientY };

    const dwCanvas = (dxPx / r.width) * c.width;
    const dhCanvas = (dyPx / r.height) * c.height;
    onResize(dwCanvas, dhCanvas);
  };

  const onResizeUp = (e: React.PointerEvent) => {
    if (!interactive) return;
    resize.current = null;
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  if (!px) return null;

  return (
    <div
      className={`textBox ${selected ? "textBoxSel" : ""}`}
      style={{
        left: px.left,
        top: px.top,
        width: px.w,
        height: px.h,
        fontFamily: item.fontCss,
        fontSize: `${item.fontSize}px`,
        color: item.color,
        pointerEvents: interactive ? "auto" : "none",
        cursor: interactive ? "text" : "default",
        zIndex: 5,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDoubleClick={(e) => {
        if (!interactive) return;
        e.stopPropagation();
        onDoubleClick();
      }}
    >
      {editing ? (
        <textarea
          autoFocus
          value={item.text}
          onChange={(e) => onChangeText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              onCancelEdit();
            }
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              onCommitEdit();
            }
          }}
          onBlur={onCommitEdit}
          className="textEdit"
          placeholder="Type… (Ctrl/⌘+Enter to finish)"
        />
      ) : (
        <div className="textDisplay">{item.text}</div>
      )}

      {selected && interactive && !editing && (
        <div
          className="resizeHandle"
          onPointerDown={onResizeDown}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeUp}
          title="Drag to resize"
        />
      )}
    </div>
  );
}

function CameraBox({
  item,
  tool,
  selected,
  onSelect,
  onMove,
  onResize,
  canvasRef,
  stream,
  streamVersion,
  micBars,
}: {
  item: {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    frame: "classic" | "flatShadow" | "rounded" | "neumorph" | "ellipse";
    borderStyle: "none" | "solid" | "dashed";
    borderWidth: number;
    accentColor: string;
  };
  tool: "brush" | "rect" | "line" | "text" | "fill" | "camera";
  selected: boolean;
  onSelect: () => void;
  onMove: (dx: number, dy: number) => void;
  onResize: (dw: number, dh: number) => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  stream: MediaStream | null;
  streamVersion: number;
  micBars: number[];
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [px, setPx] = useState<{ left: number; top: number; w: number; h: number } | null>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const resize = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    const left = (item.x / c.width) * r.width;
    const top = (item.y / c.height) * r.height;
    const w = (item.w / c.width) * r.width;
    const h = (item.h / c.height) * r.height;
    setPx({ left, top, w, h });
  }, [canvasRef, item.x, item.y, item.w, item.h]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!stream) return;

    try {
      if (v.srcObject !== stream) v.srcObject = stream;
      v.muted = true;
      v.playsInline = true;

      const play = () => v.play().catch(() => {});
      if (v.readyState >= 2) play();
      else v.onloadedmetadata = play;
    } catch {}
  }, [stream, streamVersion]);

  const interactive = tool === "camera";

  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    e.stopPropagation();
    onSelect();
    drag.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!interactive) return;
    if (!drag.current) return;
    const c = canvasRef.current;
    if (!c) return;
    const r = c.getBoundingClientRect();

    const dxPx = e.clientX - drag.current.x;
    const dyPx = e.clientY - drag.current.y;
    drag.current = { x: e.clientX, y: e.clientY };

    const dxCanvas = (dxPx / r.width) * c.width;
    const dyCanvas = (dyPx / r.height) * c.height;
    onMove(dxCanvas, dyCanvas);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!interactive) return;
    drag.current = null;
    resize.current = null;
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const onResizeDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    e.stopPropagation();
    onSelect();
    resize.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onResizeMove = (e: React.PointerEvent) => {
    if (!interactive) return;
    if (!resize.current) return;
    const c = canvasRef.current;
    if (!c) return;
    const r = c.getBoundingClientRect();

    const dxPx = e.clientX - resize.current.x;
    const dyPx = e.clientY - resize.current.y;
    resize.current = { x: e.clientX, y: e.clientY };

    const dwCanvas = (dxPx / r.width) * c.width;
    const dhCanvas = (dyPx / r.height) * c.height;
    onResize(dwCanvas, dhCanvas);
  };

  const onResizeUp = (e: React.PointerEvent) => {
    if (!interactive) return;
    resize.current = null;
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  if (!px) return null;

  const pad = item.frame === "neumorph" ? 7 : 0;
  const radius = item.frame === "rounded" || item.frame === "neumorph" ? 12 : 0;
  const ellipse = item.frame === "ellipse";

  const border =
    item.borderStyle === "none"
      ? "none"
      : `${item.borderWidth}px ${item.borderStyle === "dashed" ? "dashed" : "solid"} ${item.accentColor}`;

  const dropShadow =
    item.frame === "flatShadow"
      ? `4px 4px 0 ${item.accentColor}`
      : item.frame === "classic"
        ? `2px 2px 0 rgba(0,0,0,0.35)`
        : item.frame === "neumorph"
          ? `6px 6px 12px rgba(0,0,0,.22), -4px -4px 10px rgba(255,255,255,.65)`
          : `2px 2px 0 rgba(0,0,0,0.25)`;

  return (
    <div
      className={`camBox ${selected ? "camBoxSel" : ""} ${ellipse ? "camEllipse" : ""} ${item.frame === "neumorph" ? "camNeu" : ""}`}
      style={{
        left: px.left,
        top: px.top,
        width: px.w,
        height: px.h,
        pointerEvents: interactive ? "auto" : "none",
        cursor: interactive ? "move" : "default",
        border,
        borderRadius: ellipse ? "999px" : radius,
        padding: pad,
        boxShadow: dropShadow,
        outline: selected ? `1px dotted rgba(255,255,255,0.9)` : "none",
        outlineOffset: selected ? "-3px" : undefined,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="camVideo"
        style={{
          objectFit: "cover",
          inset: pad,
          borderRadius: ellipse ? "999px" : Math.max(0, radius - 2),
        }}
      />

      {/* waveform overlay */}
      <div className="camWave" aria-hidden>
        {micBars.slice(0, 12).map((v, i) => (
          <div key={i} className="camBar" style={{ height: `${Math.max(3, Math.round(3 + v * 18))}px`, opacity: 0.85 }} />
        ))}
      </div>

      {/* selection handles (always show on selection even in ellipse mode) */}
      {selected && interactive && (
        <>
          <div className="camHandle camTL" />
          <div className="camHandle camTR" />
          <div className="camHandle camBL" />
          <div
            className="camHandle camBR"
            onPointerDown={onResizeDown}
            onPointerMove={onResizeMove}
            onPointerUp={onResizeUp}
            title="Resize"
          />
        </>
      )}
    </div>
  );
}

const styles = `
/* Win95-ish surfaces */
.win95{
  background:#c0c0c0;
  border:2px solid #000;
  box-shadow: 0 0 0 1px #dfdfdf, 0 0 0 2px #000;
  overflow:hidden;
}
.winInset{
  border:1px solid #000;
  box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #404040;
}
.winbtn{
  width:28px;
  height:22px;
  background:#c0c0c0;
  border:1px solid #000;
  box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
  font-size:12px;
  line-height:1;
  display:flex;
  align-items:center;
  justify-content:center;
}
.winbtn:active{
  box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
}
.winbtnClose{ font-weight:800; }

.toolTop{
  width:28px;
  height:22px;
  background:#c0c0c0;
  border:1px solid #000;
  box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
  display:flex;
  align-items:center;
  justify-content:center;
}
.toolTop:disabled{ opacity:0.45; }
.toolTop:active:not(:disabled){
  box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
}

.tool95{
  height:34px;
  background:#c0c0c0;
  border:1px solid #000;
  box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
  display:flex;
  align-items:center;
  justify-content:center;
}
.tool95:active{
  box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
}
.tool95On{
  background:#b9b9b9;
  box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
}

.brushOpt{
  width:28px;
  height:28px;
  background:#c0c0c0;
  border:1px solid #000;
  box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
  display:flex;
  align-items:center;
  justify-content:center;
}
.brushOpt:active{
  box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
}
.brushOptOn{
  background:#b9b9b9;
  box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
}

.rectOpt{
  width:100%;
  height:32px;
  background:#c0c0c0;
  border:1px solid #000;
  box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
  display:flex;
  align-items:center;
  justify-content:center;
}
.rectOpt:active{
  box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
}
.rectOptOn{
  background:#b9b9b9;
  box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
}

.swatch95{
  width:18px;
  height:18px;
  border:1px solid #000;
  box-shadow: inset 1px 1px 0 rgba(255,255,255,.75), inset -1px -1px 0 rgba(0,0,0,.25);
}
.swatch95P{ outline: 2px dotted #000; outline-offset: 1px; }
.swatch95S{ box-shadow: inset 1px 1px 0 rgba(255,255,255,.75), inset -1px -1px 0 rgba(0,0,0,.25), 0 0 0 2px #fff; }

.winKey{
  display:inline-block;
  padding:0 6px;
  border:1px solid #000;
  background:#d6d6d6;
  box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #404040;
  line-height:18px;
}

.textOptRow{ display:flex; align-items:center; gap:8px; margin-bottom:8px; }
.textOptLabel{ width:40px; font-size:12px; }
.winSelect{
  flex:1;
  height:24px;
  background:#fff;
  border:1px solid #000;
  box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #404040;
  font-family: "MS Sans Serif", Tahoma, system-ui;
  font-size: 12px;
  padding: 0 6px;
}
.winSelectNarrow{ flex:0 0 auto; width:64px; }
.textOptHint{ font-size:11px; opacity:.8; line-height:1.2; }

.winMiniBtn{
  height:24px;
  padding:0 10px;
  background:#c0c0c0;
  border:1px solid #000;
  box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
  font-size:12px;
}
.winMiniBtn:disabled{ opacity:0.5; }
.winMiniBtn:active:not(:disabled){
  box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
}

/* Text overlay */
.textBox{ position:absolute; background: transparent; border: 1px dashed transparent; padding: 2px; box-sizing: border-box; user-select: none; }
.textBoxSel{ border-color:#0b2b7a; }
.textDisplay{ width:100%; height:100%; white-space: pre-wrap; overflow:hidden; }
.textEdit{
  width:100%; height:100%; font: inherit; color: inherit;
  background: rgba(255,255,255,0.92);
  border:1px solid #000;
  box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #404040;
  padding: 4px 6px;
  resize: none;
  outline: none;
}
.resizeHandle{
  position:absolute;
  width:10px; height:10px;
  right:-6px; bottom:-6px;
  background:#0b2b7a;
  border:1px solid #000;
  box-shadow: inset 1px 1px 0 rgba(255,255,255,.7), inset -1px -1px 0 rgba(0,0,0,.2);
  cursor: nwse-resize;
}

/* Camera element */
.camBox{
  position:absolute;
  background:#000;
  overflow:hidden;
}
.camNeu{
  background:#c8c8c8;
}
.camBoxSel{ }
.camEllipse{ }
.camVideo{ position:absolute; width:100%; height:100%; }

.camHandle{
  position:absolute;
  width:14px; height:14px;
  background:#fff;
  border:1px solid rgba(0,0,0,.9);
  box-shadow: 0 0 0 1px rgba(255,255,255,.35);
  outline: 1px solid rgba(0,0,0,.35);
}
.camTL{ left:-8px; top:-8px; }
.camTR{ right:-8px; top:-8px; }
.camBL{ left:-8px; bottom:-8px; }
.camBR{ right:-8px; bottom:-8px; cursor:nwse-resize; }

.camWave{
  position:absolute;
  right:8px;
  bottom:8px;
  display:flex;
  align-items:flex-end;
  gap:2px;
  padding:6px;
  background: rgba(0,0,0,.18);
}
.camBar{ width:3px; background:#fff; }

/* Menus */
.menuOn{
  background: rgba(255,255,255,0.35);
  outline: 1px dotted rgba(0,0,0,0.5);
  outline-offset: -2px;
}
.menuDrop{
  position:absolute;
  top: 26px;
  left: 0;
  min-width: 220px;
  background:#c0c0c0;
  border:1px solid #000;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.35);
  z-index: 200;
  padding: 4px;
  pointer-events: auto;
}
.menuItem{
  width:100%;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  padding: 4px 8px;
  font-size: 12px;
  border: 1px solid transparent;
  background: transparent;
  text-align:left;
}
.menuItem:hover{
  border-color:#0b2b7a;
  background: rgba(11,43,122,0.12);
}
.menuDis{
  opacity: 0.45;
  pointer-events: none;
}
.menuRight{ display:flex; align-items:center; }
.menuSep{
  height:1px;
  background: rgba(0,0,0,0.25);
  margin: 4px 2px;
}
.menuSubTitle{
  font-size: 11px;
  opacity: 0.8;
  padding: 2px 6px 4px;
}
.menuRadio .menuItem{ justify-content:flex-start; gap:8px; }
.menuDot{ width: 14px; display:inline-block; }
.menuRow{
  display:flex;
  align-items:center;
  gap:8px;
  padding: 4px 6px;
}
.menuLbl{ width: 74px; font-size: 12px; opacity: 0.9; }
.menuRange{ flex: 1; }
.menuVal{ width: 16px; text-align:right; font-size: 12px; opacity: 0.8; }
.menuHint{
  font-size: 11px;
  opacity: 0.75;
  padding: 0 6px 4px;
}

@media (max-width: 720px){
  .tool95{ height:32px; }
}
`;
