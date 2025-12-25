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

"use client";
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
 * MS Paint-ish UI
 * - Camera elements (draggable/resizable), per-element style options
 * - Menus (File/Edit/View/...) with working dropdowns
 * - Live Palette mode: extracts top colors from webcam stream (stable + configurable)
 * - Hotkeys: B Brush, F Fill, C Camera, T Text, R Rect, L Line
 * - X swaps colors (disabled while typing/editing text)
 * - P toggles Live Palette (disabled while typing); Shift+P manual refresh (when enabled)
 */

export default function MSPaintV0() {
  // ---------- Base palette (fallback) ----------
  const defaultPalette = useMemo(
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

  // Live palette state
  const [livePaletteEnabled, setLivePaletteEnabled] = useState(false);
  const [livePalette, setLivePalette] = useState<string[]>(defaultPalette);
  const [paletteMode, setPaletteMode] = useState<"auto" | "manual">("auto");
  const [paletteIntervalSec, setPaletteIntervalSec] = useState<1 | 3 | 5 | 10>(
    3
  );
  const [paletteSensitivity, setPaletteSensitivity] = useState<number>(28); // 8..64 (higher = more grouping)
  const [paletteLastUpdated, setPaletteLastUpdated] = useState<number>(0);

  const palette = livePaletteEnabled ? livePalette : defaultPalette;

  type Tool = "brush" | "rect" | "line" | "text" | "fill" | "camera";
  const [tool, setTool] = useState<Tool>("brush");

  const [primary, setPrimary] = useState(palette[0]);
  const [secondary, setSecondary] = useState(palette[2]);

  // keep refs in sync so swap is always correct
  const primaryRef = useRef(primary);
  const secondaryRef = useRef(secondary);
  useEffect(() => void (primaryRef.current = primary), [primary]);
  useEffect(() => void (secondaryRef.current = secondary), [secondary]);

  // when palette changes (live toggled / updated), keep primary/secondary stable unless they’re not in palette
  useEffect(() => {
    // keep your selections as-is; do nothing
  }, [palette]);

  const swapColors = () => {
    const p = primaryRef.current;
    const s = secondaryRef.current;
    setPrimary(s);
    setSecondary(p);
  };

  // ---------- Brush presets ----------
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

  const [brushPresetId, setBrushPresetId] = useState<string>(
    brushPresets[0].id
  );
  const brushPreset = useMemo(
    () => brushPresets.find((b) => b.id === brushPresetId) ?? brushPresets[0],
    [brushPresetId, brushPresets]
  );

  // ---------- Rectangle options ----------
  type RectMode = "outline" | "fill" | "both";
  const [rectMode, setRectMode] = useState<RectMode>("outline");

  // ---------- Text options ----------
  const textFonts = useMemo(
    () => [
      {
        id: "ms",
        name: "MS Sans Serif",
        css: "MS Sans Serif, Tahoma, system-ui",
      },
      { id: "tahoma", name: "Tahoma", css: "Tahoma, system-ui" },
      {
        id: "courier",
        name: "Courier New",
        css: "'Courier New', ui-monospace, SFMono-Regular, Menlo, monospace",
      },
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

  // ---------- Camera items ----------
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
    accentColor: string;
  };

  const [cams, setCams] = useState<CameraItem[]>([]);
  const [selectedCamId, setSelectedCamId] = useState<string | null>(null);

  // Defaults for new cameras (tool options)
  const [camDefaultFrame, setCamDefaultFrame] = useState<CamFrame>("classic");
  const [camDefaultBorderStyle, setCamDefaultBorderStyle] =
    useState<CamBorderStyle>("solid");
  const [camDefaultBorderWidth, setCamDefaultBorderWidth] = useState<number>(1);

  function applyCamOptionToSelected(patch: Partial<CameraItem>) {
    if (!selectedCamId) return;
    setCams((arr) =>
      arr.map((c) => (c.id === selectedCamId ? { ...c, ...patch } : c))
    );
  }

  // ---------- Media stream (shared) ----------
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [mediaStreamState, setMediaStreamState] = useState<MediaStream | null>(
    null
  );
  const [streamVersion, setStreamVersion] = useState(0);
  const [mediaStatus, setMediaStatus] = useState<
    "idle" | "ready" | "denied" | "error"
  >("idle");
  const [videoReady, setVideoReady] = useState(false);

  // device selection
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideoDeviceId, setSelectedVideoDeviceId] =
    useState<string>("");
  const [selectedAudioDeviceId, setSelectedAudioDeviceId] =
    useState<string>("");

  async function refreshDeviceLists() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setVideoDevices(devices.filter((d) => d.kind === "videoinput"));
      setAudioDevices(devices.filter((d) => d.kind === "audioinput"));
    } catch {
      // ignore
    }
  }

  function stopMedia() {
    const s = mediaStreamRef.current;
    if (s) {
      s.getTracks().forEach((t) => {
        try {
          t.stop();
        } catch {}
      });
    }
    mediaStreamRef.current = null;
    setMediaStreamState(null);
    setStreamVersion((v) => v + 1);
    setMediaStatus("idle");
    setVideoReady(false);
  }

  async function startMediaWithDevices() {
    try {
      const constraints: MediaStreamConstraints = {
        video: selectedVideoDeviceId
          ? { deviceId: { exact: selectedVideoDeviceId } }
          : { facingMode: "user" },
        audio: selectedAudioDeviceId
          ? { deviceId: { exact: selectedAudioDeviceId } }
          : true,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaStreamRef.current = stream;
      setMediaStreamState(stream);
      setStreamVersion((v) => v + 1);
      setMediaStatus("ready");
      setVideoReady(false);
      refreshDeviceLists();
      return stream;
    } catch (e: any) {
      if (e?.name === "NotAllowedError") setMediaStatus("denied");
      else setMediaStatus("error");
      return null;
    }
  }

  async function ensureMedia() {
    if (mediaStreamRef.current) return mediaStreamRef.current;
    refreshDeviceLists();
    const stream = await startMediaWithDevices();
    return stream;
  }

  // device change events
  useEffect(() => {
    const onChange = () => refreshDeviceLists();
    navigator.mediaDevices?.addEventListener?.("devicechange", onChange);
    refreshDeviceLists();
    return () =>
      navigator.mediaDevices?.removeEventListener?.("devicechange", onChange);
  }, []);

  // restart stream if user changes selected devices AND stream already existed
  useEffect(() => {
    if (!mediaStreamRef.current) return;
    (async () => {
      stopMedia();
      const s = await startMediaWithDevices();
      if (s) startMicBars(s);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVideoDeviceId, selectedAudioDeviceId]);

  // ---------- Mic analyser ----------
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const [micBars, setMicBars] = useState<number[]>(() =>
    Array.from({ length: 12 }, () => 0)
  );

  function startMicBars(stream: MediaStream) {
    if (analyserRef.current) return;
    try {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
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

  // cleanup audio
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try {
        audioCtxRef.current?.close();
      } catch {}
    };
  }, []);
  // ---------- Offscreen video/canvas for live palette ----------
  const paletteVideoRef = useRef<HTMLVideoElement | null>(null);
  const paletteCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // attach stream to palette sampler video whenever stream changes
  useEffect(() => {
    const v = paletteVideoRef.current;
    if (!v) return;
    if (!mediaStreamState) return;

    try {
      if (v.srcObject !== mediaStreamState) v.srcObject = mediaStreamState;
      v.muted = true;
      v.playsInline = true;

      const play = () => {
        v.play().catch(() => {});
      };

      const onReady = () => setVideoReady(true);

      v.onloadedmetadata = () => {
        play();
        onReady();
      };
      // if already ready
      if (v.readyState >= 2) {
        play();
        onReady();
      }
    } catch {
      // ignore
    }
  }, [mediaStreamState, streamVersion]);

  // Extract top colors from the webcam video
  function rgbToHex(r: number, g: number, b: number) {
    const to = (n: number) => n.toString(16).padStart(2, "0");
    return `#${to(r)}${to(g)}${to(b)}`.toLowerCase();
  }

  function clamp01(n: number) {
    return Math.max(0, Math.min(1, n));
  }

  function distSq(a: [number, number, number], b: [number, number, number]) {
    const dr = a[0] - b[0];
    const dg = a[1] - b[1];
    const db = a[2] - b[2];
    return dr * dr + dg * dg + db * db;
  }

  // quantize to bins of size "q" (sensitivity)
  function quantize(n: number, q: number) {
    return Math.round(n / q) * q;
  }

  function extractPaletteFromVideo(): string[] | null {
    const v = paletteVideoRef.current;
    const c = paletteCanvasRef.current;
    if (!v || !c) return null;
    if (!videoReady) return null;
    if (v.videoWidth <= 0 || v.videoHeight <= 0) return null;

    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;

    // Downsample: small for performance
    const W = 72;
    const H = 72;
    c.width = W;
    c.height = H;

    try {
      ctx.drawImage(v, 0, 0, W, H);
    } catch {
      return null;
    }

    const img = ctx.getImageData(0, 0, W, H);
    const data = img.data;

    const q = Math.max(8, Math.min(64, Math.round(paletteSensitivity))); // 8..64
    const counts = new Map<string, number>();

    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3];
      if (a < 30) continue;

      const r = quantize(data[i], q);
      const g = quantize(data[i + 1], q);
      const b = quantize(data[i + 2], q);

      const key = `${r},${g},${b}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);

    // pick 12 with diversity (avoid all-gray)
    const picked: [number, number, number][] = [];
    const minDist = 52; // higher = more diverse
    const minDistSq = minDist * minDist;

    for (const [key] of sorted) {
      if (picked.length >= 12) break;
      const [r, g, b] = key.split(",").map((x) => parseInt(x, 10)) as [
        number,
        number,
        number
      ];

      // reject near-duplicates
      if (picked.some((p) => distSq(p, [r, g, b]) < minDistSq)) continue;

      // avoid extreme low-sat by mixing in colored options naturally
      picked.push([r, g, b]);
    }

    // if we still don't have 12, relax diversity
    if (picked.length < 12) {
      for (const [key] of sorted) {
        if (picked.length >= 12) break;
        const [r, g, b] = key.split(",").map((x) => parseInt(x, 10)) as [
          number,
          number,
          number
        ];
        if (picked.some((p) => distSq(p, [r, g, b]) < 22 * 22)) continue;
        picked.push([r, g, b]);
      }
    }

    const out = picked.map(([r, g, b]) => rgbToHex(r, g, b));

    // final safety fallback
    if (out.length < 12) {
      const fill = defaultPalette.slice(0, 12);
      while (out.length < 12) out.push(fill[out.length]);
    }

    return out.slice(0, 12);
  }

  // Live palette refresh loop (stable + matches settings)
  const paletteTimerRef = useRef<number | null>(null);

  const runPaletteRefresh = (reason: "timer" | "manual" | "enable") => {
    if (!livePaletteEnabled) return;
    if (!mediaStreamRef.current) return;

    const p = extractPaletteFromVideo();
    if (!p) return;

    setLivePalette(p);
    setPaletteLastUpdated(Date.now());
  };

  useEffect(() => {
    // stop any existing timer
    if (paletteTimerRef.current) {
      window.clearInterval(paletteTimerRef.current);
      paletteTimerRef.current = null;
    }

    if (!livePaletteEnabled) {
      setLivePalette(defaultPalette);
      return;
    }

    // Ensure media exists for live palette
    (async () => {
      const s = await ensureMedia();
      if (s) startMicBars(s);
      // first refresh after enabling (once video ready)
      window.setTimeout(() => runPaletteRefresh("enable"), 180);
    })();

    if (paletteMode === "auto") {
      paletteTimerRef.current = window.setInterval(() => {
        runPaletteRefresh("timer");
      }, paletteIntervalSec * 1000);
    }

    return () => {
      if (paletteTimerRef.current) {
        window.clearInterval(paletteTimerRef.current);
        paletteTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    livePaletteEnabled,
    paletteMode,
    paletteIntervalSec,
    paletteSensitivity,
    videoReady,
    streamVersion,
  ]);

  // ---------- Canvas ----------
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
        { k: "brush" as const, label: "Brush", Icon: Brush, hotkey: "B" },
        { k: "line" as const, label: "Line", Icon: Slash, hotkey: "L" },
        { k: "rect" as const, label: "Rectangle", Icon: Square, hotkey: "R" },
        { k: "fill" as const, label: "Fill", Icon: PaintBucket, hotkey: "F" },
        { k: "text" as const, label: "Text", Icon: TypeIcon, hotkey: "T" },
        { k: "camera" as const, label: "Camera", Icon: Camera, hotkey: "C" },
      ] as const,
    []
  );

  function getCtx() {
    if (!ctxRef.current && canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext("2d", {
        willReadFrequently: true,
      });
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

  function setStrokeStyleFromBrush(
    ctx: CanvasRenderingContext2D,
    color: string,
    preset: BrushPreset
  ) {
    setCommonStyle(ctx, color);
    ctx.globalAlpha = preset.alpha ?? 1;
    ctx.lineJoin = "round";

    if (preset.kind === "square") {
      ctx.lineCap = "square";
      ctx.lineWidth = preset.size;
      return;
    }

    if (preset.kind === "marker") {
      ctx.lineCap = "round";
      ctx.lineWidth = preset.size;
      return;
    }

    ctx.lineCap = "round";
    ctx.lineWidth = preset.size;
  }

  function savePreviewSnapshot() {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    previewSnapshot.current = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
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
  function drawBrushSegment(
    from: { x: number; y: number },
    to: { x: number; y: number },
    color: string,
    preset: BrushPreset
  ) {
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

  function drawLine(
    a: { x: number; y: number },
    b: { x: number; y: number },
    color: string
  ) {
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

  function drawRect(
    a: { x: number; y: number },
    b: { x: number; y: number },
    strokeColor: string,
    mode: RectMode
  ) {
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
    const normalized =
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h;
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

    const target = [
      data[i0],
      data[i0 + 1],
      data[i0 + 2],
      data[i0 + 3],
    ] as const;
    const fill = hexToRgba(color);

    if (
      target[0] === fill[0] &&
      target[1] === fill[1] &&
      target[2] === fill[2] &&
      target[3] === fill[3]
    )
      return;

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
    drawColorRef.current =
      button === 2 ? secondaryRef.current : primaryRef.current;
  }

  function resetCanvasAll() {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.save();
    ctx.globalAlpha = 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    undoStack.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
    redoStack.current = [];
    bumpHistory((n) => n + 1);

    setTexts([]);
    setSelectedTextId(null);
    setEditingTextId(null);

    setCams([]);
    setSelectedCamId(null);
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
        w: 240,
        h: 72,
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
        accentColor: primaryRef.current, // snapshot at creation time
      };
      setCams((arr) => [...arr, cam]);
      setSelectedCamId(id);
      isDown.current = false;
      return;
    }

    if (tool === "brush") {
      drawBrushSegment(
        p,
        { x: p.x + 0.01, y: p.y + 0.01 },
        drawColorRef.current,
        brushPreset
      );
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
  function drawBrushSegment(
    from: { x: number; y: number },
    to: { x: number; y: number },
    color: string,
    preset: BrushPreset
  ) {
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

  function drawLine(
    a: { x: number; y: number },
    b: { x: number; y: number },
    color: string
  ) {
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

  function drawRect(
    a: { x: number; y: number },
    b: { x: number; y: number },
    strokeColor: string,
    mode: RectMode
  ) {
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
    const normalized =
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h;
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

    const target = [
      data[i0],
      data[i0 + 1],
      data[i0 + 2],
      data[i0 + 3],
    ] as const;
    const fill = hexToRgba(color);

    if (
      target[0] === fill[0] &&
      target[1] === fill[1] &&
      target[2] === fill[2] &&
      target[3] === fill[3]
    )
      return;

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
    drawColorRef.current =
      button === 2 ? secondaryRef.current : primaryRef.current;
  }

  function resetCanvasAll() {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.save();
    ctx.globalAlpha = 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    undoStack.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
    redoStack.current = [];
    bumpHistory((n) => n + 1);

    setTexts([]);
    setSelectedTextId(null);
    setEditingTextId(null);

    setCams([]);
    setSelectedCamId(null);
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
        w: 240,
        h: 72,
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
        accentColor: primaryRef.current, // snapshot at creation time
      };
      setCams((arr) => [...arr, cam]);
      setSelectedCamId(id);
      isDown.current = false;
      return;
    }

    if (tool === "brush") {
      drawBrushSegment(
        p,
        { x: p.x + 0.01, y: p.y + 0.01 },
        drawColorRef.current,
        brushPreset
      );
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
  // ---------- Menus ----------
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuBarRef = useRef<HTMLDivElement | null>(null);

  // close menus on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (menuBarRef.current?.contains(t)) return;
      setOpenMenu(null);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  // ---------- Typing guard (hotkeys shouldn’t fire) ----------
  function isTypingContext() {
    const el = document.activeElement as HTMLElement | null;
    if (!el) return false;
    const tag = el.tagName?.toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return true;
    if ((el as any).isContentEditable) return true;
    return false;
  }

  // ---------- Global shortcuts ----------
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      // do not hijack keys while typing / editing text
      const typing = isTypingContext() || editingTextId !== null;

      // Delete camera (when camera tool active, not typing)
      if (
        !typing &&
        (key === "Backspace" || key === "Delete") &&
        tool === "camera" &&
        selectedCamId
      ) {
        e.preventDefault();
        setCams((arr) => arr.filter((c) => c.id !== selectedCamId));
        setSelectedCamId(null);
        return;
      }

      // Toggle live palette (P) + manual refresh (Shift+P) — not while typing
      if (!typing && (key === "p" || key === "P")) {
        e.preventDefault();
        if (e.shiftKey) {
          // manual refresh only when enabled
          if (livePaletteEnabled) runPaletteRefresh("manual");
        } else {
          setLivePaletteEnabled((v) => !v);
        }
        return;
      }

      // Tool hotkeys (not while typing)
      if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const k = key.toLowerCase();
        if (k === "b") setToolSafe("brush");
        if (k === "f") setToolSafe("fill");
        if (k === "c") setToolSafe("camera");
        if (k === "t") setToolSafe("text");
        if (k === "r") setToolSafe("rect");
        if (k === "l") setToolSafe("line");
      }

      // Swap colors (X) — not while typing
      if (!typing && key.toLowerCase() === "x") {
        e.preventDefault();
        swapColors();
        return;
      }

      // Undo/redo
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;

      if (key.toLowerCase() === "z" && e.shiftKey) {
        e.preventDefault();
        redo();
        return;
      }
      if (key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tool,
    selectedCamId,
    editingTextId,
    livePaletteEnabled,
    paletteMode,
    paletteIntervalSec,
    paletteSensitivity,
    videoReady,
  ]);

  function setToolSafe(next: Tool) {
    setTool(next);
    setOpenMenu(null);

    if (next !== "text") {
      setEditingTextId(null);
      setSelectedTextId(null);
    }
    if (next !== "camera") {
      // keep selection if you want; but safer to clear
      // setSelectedCamId(null);
    }
  }

  // Disable context menu on app (right-click used for secondary color)
  useEffect(() => {
    const el = appRef.current;
    if (!el) return;
    const onCtx = (ev: MouseEvent) => ev.preventDefault();
    el.addEventListener("contextmenu", onCtx);
    return () => el.removeEventListener("contextmenu", onCtx);
  }, []);

  // Resize canvas to crisp square matching rendered size
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
        undoStack.current.push(
          ctx2.getImageData(0, 0, canvas.width, canvas.height)
        );
        bumpHistory((n) => n + 1);
      }
    });

    ro.observe(host);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rectModes: { k: RectMode; label: string }[] = [
    { k: "outline", label: "Outline" },
    { k: "fill", label: "Fill" },
    { k: "both", label: "Outline + Fill" },
  ];

  const canvasCursor =
    tool === "text"
      ? "text"
      : tool === "fill"
      ? "cell"
      : tool === "camera"
      ? "copy"
      : "crosshair";

  // ---------- Render ----------
  return (
    <div
      ref={appRef}
      className="min-h-screen w-full bg-[#9db3c7] flex items-center justify-center p-6 text-black"
      style={{ fontFamily: "MS Sans Serif, Tahoma, system-ui" }}
    >
      {/* offscreen sampler (does not display) */}
      <video ref={paletteVideoRef} className="hidden" />
      <canvas ref={paletteCanvasRef} className="hidden" />

      <div className="w-full max-w-[980px]">
        <div className="win95">
          {/* Title bar */}
          <div className="flex items-center justify-between px-2 py-1 text-white bg-gradient-to-b from-[#2f65c7] to-[#0a2a7a]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="h-4 w-4 bg-white border border-black relative">
                <div
                  className="absolute left-[2px] top-[2px] h-2.5 w-2.5 border border-black"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #ff4, #f80)",
                  }}
                />
              </div>
              <div className="font-bold text-[13px] truncate">
                untitled - Paint
              </div>
            </div>
            <div className="flex gap-1">
              <button className="winbtn" title="Minimize">
                _
              </button>
              <button className="winbtn" title="Maximize">
                ▢
              </button>
              <button className="winbtn winbtnClose" title="Close">
                ✕
              </button>
            </div>
          </div>

          {/* Menu bar */}
          <div ref={menuBarRef} className="menuBar">
            <MenuButton
              label="File"
              open={openMenu === "File"}
              onClick={() => setOpenMenu(openMenu === "File" ? null : "File")}
            />
            <MenuButton
              label="Edit"
              open={openMenu === "Edit"}
              onClick={() => setOpenMenu(openMenu === "Edit" ? null : "Edit")}
            />
            <MenuButton
              label="View"
              open={openMenu === "View"}
              onClick={() => setOpenMenu(openMenu === "View" ? null : "View")}
            />
            <MenuButton
              label="Image"
              open={openMenu === "Image"}
              onClick={() => setOpenMenu(openMenu === "Image" ? null : "Image")}
            />
            <MenuButton
              label="Options"
              open={openMenu === "Options"}
              onClick={() =>
                setOpenMenu(openMenu === "Options" ? null : "Options")
              }
            />
            <MenuButton
              label="Help"
              open={openMenu === "Help"}
              onClick={() => setOpenMenu(openMenu === "Help" ? null : "Help")}
            />

            <div className="ml-auto flex items-center gap-1">
              <button
                className="toolTop"
                title="Undo (Ctrl/⌘+Z)"
                onClick={undo}
                disabled={!canUndo()}
              >
                <Undo2 className="h-4 w-4" />
              </button>
              <button
                className="toolTop"
                title="Redo (Ctrl/⌘+Shift+Z)"
                onClick={redo}
                disabled={!canRedo()}
              >
                <Redo2 className="h-4 w-4" />
              </button>
            </div>

            {/* Dropdowns */}
            {openMenu && (
              <MenuDropdown anchor={openMenu}>
                {openMenu === "File" && (
                  <>
                    <MenuItem
                      label="Reset Canvas"
                      onClick={() => {
                        resetCanvasAll();
                        setOpenMenu(null);
                      }}
                    />
                    <MenuSep />
                    <MenuItem
                      label="Stop Camera/Mic"
                      onClick={() => {
                        stopMedia();
                        setOpenMenu(null);
                      }}
                      disabled={!mediaStreamRef.current}
                    />
                  </>
                )}

                {openMenu === "Edit" && (
                  <>
                    <MenuItem
                      label="Undo"
                      hotkey="Ctrl/⌘+Z"
                      onClick={() => {
                        undo();
                        setOpenMenu(null);
                      }}
                      disabled={!canUndo()}
                    />
                    <MenuItem
                      label="Redo"
                      hotkey="Ctrl/⌘+Shift+Z"
                      onClick={() => {
                        redo();
                        setOpenMenu(null);
                      }}
                      disabled={!canRedo()}
                    />
                  </>
                )}

                {openMenu === "View" && (
                  <>
                    <MenuItem
                      label="Live Palette Mode"
                      hotkey="P"
                      checked={livePaletteEnabled}
                      onClick={() => setLivePaletteEnabled((v) => !v)}
                    />
                    {livePaletteEnabled && (
                      <>
                        <MenuSep />
                        <MenuLabel text="Refresh cadence" />
                        <MenuRadio
                          label="1s"
                          checked={
                            paletteMode === "auto" && paletteIntervalSec === 1
                          }
                          onClick={() => {
                            setPaletteMode("auto");
                            setPaletteIntervalSec(1);
                          }}
                        />
                        <MenuRadio
                          label="3s"
                          checked={
                            paletteMode === "auto" && paletteIntervalSec === 3
                          }
                          onClick={() => {
                            setPaletteMode("auto");
                            setPaletteIntervalSec(3);
                          }}
                        />
                        <MenuRadio
                          label="5s"
                          checked={
                            paletteMode === "auto" && paletteIntervalSec === 5
                          }
                          onClick={() => {
                            setPaletteMode("auto");
                            setPaletteIntervalSec(5);
                          }}
                        />
                        <MenuRadio
                          label="10s"
                          checked={
                            paletteMode === "auto" && paletteIntervalSec === 10
                          }
                          onClick={() => {
                            setPaletteMode("auto");
                            setPaletteIntervalSec(10);
                          }}
                        />
                        <MenuRadio
                          label="Manual"
                          checked={paletteMode === "manual"}
                          onClick={() => setPaletteMode("manual")}
                        />
                        <MenuSep />
                        <MenuItem
                          label="Refresh Palette Now"
                          hotkey="Shift+P"
                          onClick={() => runPaletteRefresh("manual")}
                          disabled={!livePaletteEnabled}
                        />
                        <MenuSep />
                        <div className="menuRow">
                          <div className="menuSmall">Sensitivity</div>
                          <input
                            className="menuSlider"
                            type="range"
                            min={8}
                            max={64}
                            value={paletteSensitivity}
                            onChange={(e) =>
                              setPaletteSensitivity(
                                parseInt(e.target.value, 10)
                              )
                            }
                          />
                        </div>
                        <div className="menuMeta">
                          Updated{" "}
                          {paletteLastUpdated
                            ? `${Math.max(
                                0,
                                Math.round(
                                  (Date.now() - paletteLastUpdated) / 1000
                                )
                              )}s ago`
                            : "—"}
                        </div>
                      </>
                    )}
                  </>
                )}

                {openMenu === "Image" && (
                  <>
                    <MenuItem
                      label="Reset Canvas"
                      onClick={() => {
                        resetCanvasAll();
                        setOpenMenu(null);
                      }}
                    />
                  </>
                )}

                {openMenu === "Options" && (
                  <>
                    <MenuLabel text="(Placeholder)" />
                  </>
                )}

                {openMenu === "Help" && (
                  <>
                    <MenuLabel text="(Placeholder)" />
                  </>
                )}
              </MenuDropdown>
            )}
          </div>
          {/* Body */}
          <div className="flex h-[min(62vh,620px)] min-h-[420px]">
            {/* Tools */}
            <div className="w-[124px] border-r border-[#7f7f7f] p-2 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                {toolButtons.map(({ k, label, Icon, hotkey }) => {
                  const on = tool === k;
                  return (
                    <button
                      key={k}
                      onClick={() => setToolSafe(k)}
                      className={`tool95 ${on ? "tool95On" : ""}`}
                      title={`${label} (${hotkey})`}
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
                    Click to place • Drag to move • Corner to resize •
                    Double-click to edit • (Hotkeys disabled while typing)
                  </div>
                </div>
              )}

              {/* Camera options */}
              {tool === "camera" && (
                <div className="winInset p-2 bg-[#d6d6d6]">
                  <div className="text-[12px] leading-snug">
                    <div className="mb-2 opacity-85">
                      {mediaStatus === "idle" &&
                        "Camera/mic will ask permission on first use."}
                      {mediaStatus === "ready" && "Camera + mic active."}
                      {mediaStatus === "denied" &&
                        "Permission denied (check browser settings)."}
                      {mediaStatus === "error" && "Couldn’t start camera/mic."}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <button
                        className="winMiniBtn"
                        onClick={async () => {
                          const s = await ensureMedia();
                          if (s) startMicBars(s);
                          refreshDeviceLists();
                        }}
                        title="Start camera/mic"
                      >
                        Start
                      </button>

                      <button
                        className="winMiniBtn"
                        onClick={() => stopMedia()}
                        title="Stop camera/mic"
                        disabled={!mediaStreamRef.current}
                      >
                        Stop
                      </button>

                      <button
                        className="winMiniBtn"
                        onClick={refreshDeviceLists}
                        title="Refresh devices"
                      >
                        Refresh
                      </button>
                    </div>

                    <div className="border-t border-black/20 pt-2">
                      <div className="text-[12px] mb-1">Camera source</div>
                      <select
                        className="winSelect"
                        value={selectedVideoDeviceId}
                        onChange={(e) =>
                          setSelectedVideoDeviceId(e.target.value)
                        }
                      >
                        <option value="">Default camera</option>
                        {videoDevices.map((d) => (
                          <option key={d.deviceId} value={d.deviceId}>
                            {d.label || `Camera (${d.deviceId.slice(0, 6)}…)`}
                          </option>
                        ))}
                      </select>

                      <div className="mt-2 text-[12px] mb-1">Mic source</div>
                      <select
                        className="winSelect"
                        value={selectedAudioDeviceId}
                        onChange={(e) =>
                          setSelectedAudioDeviceId(e.target.value)
                        }
                      >
                        <option value="">Default microphone</option>
                        {audioDevices.map((d) => (
                          <option key={d.deviceId} value={d.deviceId}>
                            {d.label || `Mic (${d.deviceId.slice(0, 6)}…)`}
                          </option>
                        ))}
                      </select>

                      <div className="mt-3 text-[12px] mb-1">
                        Frame (selected)
                      </div>
                      <select
                        className="winSelect"
                        value={
                          selectedCamId
                            ? cams.find((c) => c.id === selectedCamId)?.frame ??
                              camDefaultFrame
                            : camDefaultFrame
                        }
                        onChange={(e) => {
                          const v = e.target.value as CamFrame;
                          if (selectedCamId)
                            applyCamOptionToSelected({ frame: v });
                          else setCamDefaultFrame(v);
                        }}
                      >
                        <option value="classic">Classic</option>
                        <option value="flatShadow">Flat shadow (accent)</option>
                        <option value="rounded">Rounded</option>
                        <option value="neumorph">Neumorphic</option>
                        <option value="ellipse">Ellipse</option>
                      </select>

                      <div className="mt-2 text-[12px] mb-1">
                        Border (selected)
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          className="winSelect"
                          value={
                            selectedCamId
                              ? cams.find((c) => c.id === selectedCamId)
                                  ?.borderStyle ?? camDefaultBorderStyle
                              : camDefaultBorderStyle
                          }
                          onChange={(e) => {
                            const v = e.target.value as CamBorderStyle;
                            if (selectedCamId)
                              applyCamOptionToSelected({ borderStyle: v });
                            else setCamDefaultBorderStyle(v);
                          }}
                        >
                          <option value="none">No border</option>
                          <option value="solid">Solid</option>
                          <option value="dashed">Dashed</option>
                        </select>

                        <select
                          className="winSelect winSelectNarrow"
                          value={
                            selectedCamId
                              ? cams.find((c) => c.id === selectedCamId)
                                  ?.borderWidth ?? camDefaultBorderWidth
                              : camDefaultBorderWidth
                          }
                          onChange={(e) => {
                            const n = parseInt(e.target.value, 10);
                            if (selectedCamId)
                              applyCamOptionToSelected({ borderWidth: n });
                            else setCamDefaultBorderWidth(n);
                          }}
                          title="Border width"
                        >
                          <option value={1}>1px</option>
                          <option value={2}>2px</option>
                          <option value={3}>3px</option>
                        </select>
                      </div>

                      <div className="mt-2 text-[12px] mb-1">
                        Accent (selected)
                      </div>
                      <button
                        className="winMiniBtn"
                        onClick={() =>
                          selectedCamId &&
                          applyCamOptionToSelected({
                            accentColor: primaryRef.current,
                          })
                        }
                        disabled={!selectedCamId}
                        title="Set selected camera accent to current primary"
                      >
                        Use primary
                      </button>

                      <div className="mt-2 text-[11px] opacity-75">
                        Tip: Select a camera then adjust options • Del/Backspace
                        deletes (Camera tool)
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
                    <div
                      ref={canvasHostRef}
                      className="relative w-full h-full max-h-full max-w-full aspect-square"
                    >
                      <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full bg-white"
                        style={{ cursor: canvasCursor }}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                      />

                      {/* Text overlay wrapper */}
                      <div className="absolute inset-0 pointer-events-none z-20">
                        {texts.map((t) => (
                          <TextBox
                            key={t.id}
                            item={t}
                            tool={tool}
                            selected={selectedTextId === t.id}
                            editing={editingTextId === t.id}
                            onSelect={() =>
                              tool === "text" && setSelectedTextId(t.id)
                            }
                            onDoubleClick={() => {
                              if (tool === "text") {
                                setSelectedTextId(t.id);
                                setEditingTextId(t.id);
                              }
                            }}
                            onChangeText={(val) =>
                              setTexts((arr) =>
                                arr.map((x) =>
                                  x.id === t.id ? { ...x, text: val } : x
                                )
                              )
                            }
                            onCommitEdit={() => setEditingTextId(null)}
                            onCancelEdit={() => {
                              setEditingTextId(null);
                              setTexts((arr) =>
                                arr.filter(
                                  (x) =>
                                    !(x.id === t.id && x.text.trim() === "")
                                )
                              );
                            }}
                            onMove={(dx, dy) =>
                              setTexts((arr) =>
                                arr.map((x) =>
                                  x.id === t.id
                                    ? {
                                        ...x,
                                        x: clamp(x.x + dx, -9999, 9999),
                                        y: clamp(x.y + dy, -9999, 9999),
                                      }
                                    : x
                                )
                              )
                            }
                            onResize={(dw, dh) =>
                              setTexts((arr) =>
                                arr.map((x) => {
                                  if (x.id !== t.id) return x;
                                  const w = Math.max(60, x.w + dw);
                                  const h = Math.max(40, x.h + dh);
                                  // slower growth: tie to min(w,h)
                                  const fontSize = clamp(
                                    Math.round(Math.min(h * 0.58, w * 0.18)),
                                    10,
                                    96
                                  );
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
                            onSelect={() =>
                              tool === "camera" && setSelectedCamId(c.id)
                            }
                            onMove={(dx, dy) =>
                              setCams((arr) =>
                                arr.map((x) =>
                                  x.id === c.id
                                    ? { ...x, x: x.x + dx, y: x.y + dy }
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
              <button
                className="relative h-[44px] w-[56px]"
                onClick={swapColors}
                title="Swap colors (X)"
              >
                <div
                  className="absolute left-1 top-2 h-7 w-9 border border-black winInset"
                  style={{ background: primary }}
                />
                <div
                  className="absolute left-5 top-0 h-7 w-9 border border-black winInset"
                  style={{ background: secondary }}
                />
                <div
                  className="absolute left-1 top-2 h-7 w-9 border border-black winInset z-10 pointer-events-none"
                  style={{ background: primary }}
                />
              </button>

              <div className="winInset inline-block p-2 bg-[#d6d6d6]">
                <div className="grid grid-cols-6 gap-1">
                  {palette.map((c) => (
                    <button
                      key={c}
                      className={`swatch95 ${
                        c === primary ? "swatch95P" : ""
                      } ${c === secondary ? "swatch95S" : ""}`}
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
                Right-click uses secondary • <span className="winKey">X</span>{" "}
                swaps • <span className="winKey">P</span> live palette
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-2 py-1 border-t border-[#dfdfdf]">
            <div className="text-[12px] truncate">
              For Help, click Help Topics on the Help Menu
            </div>
            <div className="flex items-center gap-2">
              <div className="winInset px-2 py-0.5 text-[12px] min-w-[250px]">
                {tool}
                {tool === "brush" ? ` • ${brushPresetTitle(brushPreset)}` : ""}
                {tool === "rect" ? ` • ${rectMode}` : ""}
                {tool === "text" ? ` • ${textFont.name}` : ""}
                {tool === "camera"
                  ? ` • ${
                      mediaStatus === "ready" ? "Camera Active" : mediaStatus
                    }`
                  : ""}
                {livePaletteEnabled
                  ? ` • Live palette ${
                      paletteMode === "auto"
                        ? `${paletteIntervalSec}s`
                        : "manual"
                    }`
                  : ""}
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
function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function brushPresetTitle(p: {
  kind: string;
  size: number;
  alpha?: number;
  density?: number;
  angleDeg?: number;
}) {
  if (p.kind === "spray") return `Spray ${p.size}px`;
  if (p.kind === "marker") return `Marker ${p.size}px`;
  if (p.kind === "calligraphy") return `Calligraphy ${p.size}px`;
  return `${p.kind[0].toUpperCase() + p.kind.slice(1)} ${p.size}px`;
}

function BrushPreview({
  preset,
}: {
  preset: { kind: string; size: number; angleDeg?: number };
}) {
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
        <g
          transform={`translate(${mid} ${mid}) rotate(${
            preset.angleDeg ?? 35
          })`}
        >
          <rect x={-8} y={-2} width={16} height={4} fill="#000" />
        </g>
      </svg>
    );
  }

  if (preset.kind === "square") {
    const w = Math.min(12, Math.max(3, Math.round(preset.size / 2)));
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
        <rect
          x={mid - w / 2}
          y={mid - w / 2}
          width={w}
          height={w}
          fill="#000"
        />
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
      {mode === "outline" && (
        <rect
          x="7"
          y="4"
          width="30"
          height="10"
          fill="none"
          stroke="#000"
          strokeWidth="2"
        />
      )}
      {mode === "fill" && (
        <rect x="7" y="4" width="30" height="10" fill="#666" stroke="none" />
      )}
      {mode === "both" && (
        <>
          <rect x="7" y="4" width="30" height="10" fill="#666" />
          <rect
            x="7"
            y="4"
            width="30"
            height="10"
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
}

/* ---------------- Menus ---------------- */
function MenuButton({
  label,
  open,
  onClick,
}: {
  label: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`menuBtn ${open ? "menuBtnOn" : ""}`}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {label}
      <ChevronDown className="h-3 w-3 opacity-70" />
    </button>
  );
}

function MenuDropdown({
  anchor,
  children,
}: {
  anchor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="menuDrop" style={{ left: menuLeft(anchor) }}>
      {children}
    </div>
  );
}

function menuLeft(anchor: string) {
  // basic fixed positions aligned to buttons order (File, Edit, View, Image, Options, Help)
  const map: Record<string, number> = {
    File: 0,
    Edit: 70,
    View: 140,
    Image: 210,
    Options: 290,
    Help: 380,
  };
  return map[anchor] ?? 0;
}

function MenuItem({
  label,
  hotkey,
  onClick,
  disabled,
  checked,
}: {
  label: string;
  hotkey?: string;
  onClick: () => void;
  disabled?: boolean;
  checked?: boolean;
}) {
  return (
    <button
      className={`menuItem ${disabled ? "menuItemDis" : ""}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <div className="menuItemLeft">
        {typeof checked === "boolean" ? (
          <span className="menuCheck">
            {checked ? <Check className="h-3 w-3" /> : null}
          </span>
        ) : (
          <span className="menuCheck" />
        )}
        <span>{label}</span>
      </div>
      {hotkey && <span className="menuHotkey">{hotkey}</span>}
    </button>
  );
}

function MenuRadio({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button className="menuItem" onClick={onClick}>
      <div className="menuItemLeft">
        <span className="menuCheck">
          {checked ? <Check className="h-3 w-3" /> : null}
        </span>
        <span>{label}</span>
      </div>
    </button>
  );
}

function MenuSep() {
  return <div className="menuSep" />;
}

function MenuLabel({ text }: { text: string }) {
  return <div className="menuLabel">{text}</div>;
}

/* ---------------- Text ---------------- */
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
  item: TextItemLike;
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
  const [px, setPx] = useState<{
    left: number;
    top: number;
    w: number;
    h: number;
  } | null>(null);
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
          title="Resize"
        />
      )}
    </div>
  );
}

type TextItemLike = {
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

/* ---------------- Camera ---------------- */
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
  const [px, setPx] = useState<{
    left: number;
    top: number;
    w: number;
    h: number;
  } | null>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const resize = useRef<{ x: number; y: number } | null>(null);
  const resizeSign = useRef<{ sx: number; sy: number }>({ sx: 1, sy: 1 });

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
    if (!v || !stream) return;

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

  const onResizeDownSigned = (e: React.PointerEvent, sx: number, sy: number) => {
  if (!interactive) return;
  e.stopPropagation();
  onSelect();
  resize.current = { x: e.clientX, y: e.clientY };
  resizeSign.current = { sx, sy };
  (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
};

const onResizeMoveSigned = (e: React.PointerEvent) => {
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

  const { sx, sy } = resizeSign.current;
  onResize(dwCanvas * sx, dhCanvas * sy);
};

const onResizeUpSigned = (e: React.PointerEvent) => {
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
      : `${item.borderWidth}px ${
          item.borderStyle === "dashed" ? "dashed" : "solid"
        } ${item.accentColor}`;

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
      className="camOuter"
      style={{
        left: px.left,
        top: px.top,
        width: px.w,
        height: px.h,
        pointerEvents: interactive ? "auto" : "none",
        cursor: interactive ? "move" : "default",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div
        className={`camInner ${item.frame === "neumorph" ? "camNeu" : ""}`}
        style={{
          border,
          borderRadius: ellipse ? "999px" : radius,
          padding: pad,
          boxShadow: dropShadow,
        }}
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

        <div className="camWave" aria-hidden>
          {micBars.slice(0, 12).map((v, i) => (
            <div
              key={i}
              className="camBar"
              style={{
                height: `${Math.max(3, Math.round(3 + v * 18))}px`,
                opacity: 0.85,
              }}
            />
          ))}
        </div>
      </div>

      {selected && <div className="camSelectRect" aria-hidden />}

      {selected && (
        <>
          <div
            className="camHandle camTL"
            onPointerDown={(e) => onResizeDownSigned(e, -1, -1)}
            onPointerMove={onResizeMoveSigned}
            onPointerUp={onResizeUpSigned}
            title="Resize"
          />
          <div
            className="camHandle camTR"
            onPointerDown={(e) => onResizeDownSigned(e, +1, -1)}
            onPointerMove={onResizeMoveSigned}
            onPointerUp={onResizeUpSigned}
            title="Resize"
          />
          <div
            className="camHandle camBL"
            onPointerDown={(e) => onResizeDownSigned(e, -1, +1)}
            onPointerMove={onResizeMoveSigned}
            onPointerUp={onResizeUpSigned}
            title="Resize"
          />
          <div
            className="camHandle camBR"
            onPointerDown={(e) => onResizeDownSigned(e, +1, +1)}
            onPointerMove={onResizeMoveSigned}
            onPointerUp={onResizeUpSigned}
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

/* Menu bar */
.menuBar{
  position:relative;
  z-index: 50;
  display:flex;
  align-items:center;
  gap:6px;
  padding: 4px 6px;
  border-bottom: 1px solid #7f7f7f;
}
.menuBtn{
  display:flex;
  align-items:center;
  gap:6px;
  padding: 2px 8px;
  font-size: 13px;
  border: 1px solid transparent;
}
.menuBtn:hover{ background: rgba(255,255,255,0.3); }
.menuBtnOn{
  border:1px solid #000;
  background:#d6d6d6;
  box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #404040;
}

.menuDrop{
  position:absolute;
  top: 30px;
  min-width: 220px;
  background:#d6d6d6;
  border:1px solid #000;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.35);
  padding: 6px;
}

.menuItem{
  width:100%;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;
  padding: 6px 6px;
  font-size: 12px;
  text-align:left;
}
.menuItem:hover{ background: rgba(255,255,255,0.35); }
.menuItemDis{ opacity:0.5; pointer-events:none; }
.menuItemLeft{ display:flex; align-items:center; gap:8px; }
.menuCheck{
  width:16px; height:16px;
  display:flex;
  align-items:center;
  justify-content:center;
  border:1px solid rgba(0,0,0,0.25);
  background: rgba(255,255,255,0.35);
}
.menuHotkey{ opacity:0.7; font-size: 11px; }
.menuSep{ height:1px; background: rgba(0,0,0,0.25); margin:6px 0; }
.menuLabel{ font-size: 11px; opacity:0.75; padding: 4px 6px; }
.menuRow{ padding: 6px; display:flex; align-items:center; gap:10px; }
.menuSmall{ font-size: 11px; opacity:0.8; width: 80px; }
.menuSlider{ flex:1; }
.menuMeta{ font-size: 10px; opacity:0.7; padding: 0 6px 6px 6px; }

/* Top buttons */
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

/* Select + mini */
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
.winSelectNarrow{ flex: none; width: 70px; }
.winMiniBtn{
  height:24px;
  padding: 0 8px;
  background:#c0c0c0;
  border:1px solid #000;
  box-shadow: inset 1px 1px 0 #f4f4f4, inset -1px -1px 0 #404040;
  font-size: 12px;
}
.winMiniBtn:disabled{ opacity:0.5; }
.winMiniBtn:active:not(:disabled){
  box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #f4f4f4;
}

/* Text overlay */
.textOptRow{ display:flex; align-items:center; gap:8px; margin-bottom:8px; }
.textOptLabel{ width:40px; font-size:12px; }
.textOptHint{ font-size:11px; opacity:.8; line-height:1.2; }

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

/* Camera */
.camOuter{
  position:absolute;
  overflow: visible;
  z-index: 10;
}
.camInner{
  position:absolute;
  inset:0;
  background:#000;
  overflow:hidden;
}
.camNeu{ background:#c8c8c8; }

.camVideo{ position:absolute; width:100%; height:100%; }

.camSelectRect{
  position:absolute;
  inset:-2px;
  border: 1px solid rgba(255,255,255,0.9);
  outline: 1px dotted rgba(0,0,0,0.55);
  outline-offset: -3px;
  pointer-events:none;
}

.camHandle{
  position:absolute;
  width:10px; height:10px;
  background:#fff;
  border:1px solid rgba(0,0,0,.9);
  box-shadow: inset 1px 1px 0 rgba(255,255,255,.65), inset -1px -1px 0 rgba(0,0,0,.12);
  outline: 1px solid rgba(0,0,0,.35);
  pointer-events:auto; /* allow dragging from any handle */
  cursor: nwse-resize;
}
.camTL{ left:-5px; top:-5px; cursor: nwse-resize;}
.camTR{ right:-5px; top:-5px; cursor: nesw-resize; }
.camBL{ left:-5px; bottom:-5px; cursor: nesw-resize; }
.camBR{ right:-5px; bottom:-5px; cursor: nwse-resize;}

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

@media (max-width: 720px){
  .tool95{ height:32px; }
}
`;
