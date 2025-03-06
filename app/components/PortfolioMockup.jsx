// "use client"
// import React, { useState, useEffect, useRef } from 'react';
// import { X, Maximize2, Award, Code, Users, Briefcase, Book, Rocket, ChevronDown, ChevronRight, ExternalLink, Github, Twitter, Linkedin, Mail, Filter, Calendar, Tag, CheckSquare, Square } from 'lucide-react';

// const PortfolioMockup = () => {
//   const [viewMode, setViewMode] = useState('overview'); // 'overview', 'descriptive', 'impact'
//   const [expandedCard, setExpandedCard] = useState(null);
//   const [columnCount, setColumnCount] = useState(3);
//   const [filters, setFilters] = useState({
//     types: [],
//     statuses: [],
//     years: []
//   });

//   // For masonry layout
//   const columnRefs = useRef([]);

//   // Sample data for demonstration
//   const involvements = [
//     {
//       id: 1,
//       title: "Nebula AI Assistant",
//       subtitle: "Lead Developer",
//       type: "project",
//       tags: ["AI", "Product", "SaaS"],
//       status: "active",
//       year: 2023,
//       image: "project",
//       color: "#6366F1",
//       description: "Created an AI-powered personal assistant that helps users manage their daily tasks and schedule.",
//       impact: {
//         metrics: "5,000+ active users, 4.8/5 rating",
//         challenges: "Optimizing for low-latency responses while maintaining accuracy",
//         learnings: "Deep understanding of NLP models and user experience design for conversational interfaces"
//       }
//     },
//     {
//       id: 2,
//       title: "Tech Mentorship Program",
//       subtitle: "Senior Mentor",
//       type: "community",
//       tags: ["Education", "Leadership"],
//       status: "completed",
//       year: 2022,
//       image: "community",
//       color: "#EC4899",
//       description: "Provided guidance to 12 junior developers through a structured 6-month mentorship program.",
//       impact: {
//         metrics: "10 out of 12 mentees secured promotions within 8 months",
//         challenges: "Adapting mentorship style to diverse learning approaches",
//         learnings: "Effective feedback techniques and developmental psychology insights"
//       }
//     },
//     {
//       id: 3,
//       title: "PixelPerfect Design Agency",
//       subtitle: "UX Consultant",
//       type: "work",
//       tags: ["Design", "Consulting"],
//       status: "past",
//       year: 2021,
//       image: "work",
//       color: "#10B981",
//       description: "Consulted on user experience for enterprise clients, focusing on accessibility and conversion optimization.",
//       impact: {
//         metrics: "Improved client conversion rates by an average of 23%",
//         challenges: "Balancing aesthetic design with data-driven decisions",
//         learnings: "Developed framework for integrating qualitative and quantitative UX research"
//       }
//     },
//     {
//       id: 4,
//       title: "AWS Solutions Architect",
//       subtitle: "Professional Certification",
//       type: "certification",
//       tags: ["Cloud", "Technical"],
//       status: "acquired",
//       year: 2023,
//       image: null,
//       color: "#F59E0B",
//       description: "Earned professional-level certification in designing distributed applications on AWS infrastructure.",
//       impact: {
//         metrics: "Implemented solutions reducing client infrastructure costs by 35%",
//         challenges: "Mastering the breadth of AWS services while gaining depth in key areas",
//         learnings: "Cloud architecture patterns that balance performance, cost, and security"
//       }
//     },
//     {
//       id: 5,
//       title: "OpenSource Contribution",
//       subtitle: "React Performance Library",
//       type: "project",
//       tags: ["Open Source", "Frontend"],
//       status: "active",
//       year: 2022,
//       image: "opensource",
//       color: "#6366F1",
//       description: "Created and maintained a library for optimizing React application performance used by 200+ projects.",
//       impact: {
//         metrics: "2.3k GitHub stars, adopted by 3 enterprise-level applications",
//         challenges: "Ensuring backward compatibility while introducing new features",
//         learnings: "Open source community management and technical documentation best practices"
//       }
//     },
//     {
//       id: 6,
//       title: "Digital Ethics Conference",
//       subtitle: "Keynote Speaker",
//       type: "community",
//       tags: ["Speaking", "Thought Leadership"],
//       status: "completed",
//       year: 2023,
//       image: "speaking",
//       color: "#EC4899",
//       description: "Delivered keynote on ethical considerations in AI development to an audience of 500+ industry professionals.",
//       impact: {
//         metrics: "Talk received 4.9/5 rating, resulted in 3 consulting opportunities",
//         challenges: "Communicating technical concepts to a mixed technical/non-technical audience",
//         learnings: "Public speaking techniques and effective storytelling for technical topics"
//       }
//     },
//     {
//       id: 7,
//       title: "EcoTrack Mobile App",
//       subtitle: "Side Project",
//       type: "project",
//       tags: ["Mobile", "Sustainability"],
//       status: "acquired",
//       year: 2021,
//       image: "mobile",
//       color: "#6366F1",
//       description: "Developed and launched a mobile app that helps users track and reduce their carbon footprint through daily activities.",
//       impact: {
//         metrics: "Acquired by GreenTech Inc. for $120K, 25K downloads prior to acquisition",
//         challenges: "Balancing accuracy of carbon calculations with user-friendly experience",
//         learnings: "Mobile app monetization strategies and acquisition preparation"
//       }
//     },
//     {
//       id: 8,
//       title: "Machine Learning Specialization",
//       subtitle: "Stanford University",
//       type: "certification",
//       tags: ["AI", "Education"],
//       status: "acquired",
//       year: 2022,
//       image: null,
//       color: "#F59E0B",
//       description: "Completed 5-course specialization covering foundations to advanced ML techniques and practical applications.",
//       impact: {
//         metrics: "Applied techniques to increase prediction accuracy by 18% in a work project",
//         challenges: "Implementing complex algorithms with limited computational resources",
//         learnings: "Practical application of theoretical ML concepts to real-world problems"
//       }
//     },
//     {
//       id: 9,
//       title: "Freelance Design Service",
//       subtitle: "UI/UX Design",
//       type: "service",
//       tags: ["Design", "Freelance"],
//       status: "active",
//       year: 2020,
//       image: "design",
//       color: "#8B5CF6",
//       description: "Provide tailored UI/UX design services for startups and small businesses looking to improve their digital products.",
//       impact: {
//         metrics: "Served 15+ clients, 90% retention rate for follow-on projects",
//         challenges: "Managing client expectations and scope creep in creative work",
//         learnings: "Client communication frameworks and value-based pricing strategies"
//       }
//     },
//     {
//       id: 10,
//       title: "Local Tech Meetup",
//       subtitle: "Organizer",
//       type: "community",
//       tags: ["Community Building", "Networking"],
//       status: "active",
//       year: 2021,
//       image: "meetup",
//       color: "#EC4899",
//       description: "Founded and organize a monthly meetup for local tech professionals to share knowledge and network.",
//       impact: {
//         metrics: "Grown to 200+ members, average of 65 attendees per event",
//         challenges: "Finding diverse speakers and maintaining consistent attendance",
//         learnings: "Community building strategies and event management techniques"
//       }
//     },
//     {
//       id: 11,
//       title: "Data Privacy Certification",
//       subtitle: "IAPP CIPP/E",
//       type: "certification",
//       tags: ["Privacy", "Legal"],
//       status: "acquired",
//       year: 2023,
//       image: null,
//       color: "#F59E0B",
//       description: "Earned certification in European data protection laws, regulations and compliance requirements.",
//       impact: {
//         metrics: "Led GDPR compliance initiative saving company potential €2M in penalties",
//         challenges: "Translating complex legal requirements into actionable technical specifications",
//         learnings: "Balancing innovation with privacy by design principles"
//       }
//     },
//     {
//       id: 12,
//       title: "Mindfulness Workshop Series",
//       subtitle: "Creator & Facilitator",
//       type: "service",
//       tags: ["Wellness", "Education"],
//       status: "past",
//       year: 2020,
//       image: "workshop",
//       color: "#8B5CF6",
//       description: "Developed and facilitated a 6-week workshop series on mindfulness techniques for tech professionals.",
//       impact: {
//         metrics: "4 cohorts completed, 97% reported reduced work stress",
//         challenges: "Adapting traditional mindfulness practices for high-performance tech environments",
//         learnings: "Intersection of wellness and productivity in knowledge work"
//       }
//     }
//   ];

//   // Get unique filter options
//   const types = [...new Set(involvements.map(item => item.type))];
//   const statuses = [...new Set(involvements.map(item => item.status))];
//   const years = [...new Set(involvements.map(item => item.year))].sort((a, b) => b - a);

//   // Apply filters to the involvements
//   const filteredInvolvements = involvements.filter(item => {
//     return (
//       (filters.types.length === 0 || filters.types.includes(item.type)) &&
//       (filters.statuses.length === 0 || filters.statuses.includes(item.status)) &&
//       (filters.years.length === 0 || filters.years.includes(item.year))
//     );
//   });

//   // Initialize column heights for masonry layout
//   useEffect(() => {
//     columnRefs.current = Array(columnCount).fill().map(() => []);
//   }, [columnCount]);

//   // Distribute items into columns for masonry layout
//   const distributedItems = () => {
//     const columns = Array(columnCount).fill().map(() => []);

//     filteredInvolvements.forEach((item, index) => {
//       const columnIndex = index % columnCount;
//       columns[columnIndex].push(item);
//     });

//     return columns;
//   };

//   // Helper function to render the appropriate icon for each involvement type
//   const renderTypeIcon = (type) => {
//     switch(type) {
//       case 'project':
//         return <Code size={20} />;
//       case 'community':
//         return <Users size={20} />;
//       case 'work':
//         return <Briefcase size={20} />;
//       case 'certification':
//         return <Award size={20} />;
//       case 'service':
//         return <Rocket size={20} />;
//       default:
//         return <Book size={20} />;
//     }
//   };

//   // Helper function to get status badge style
//   const getStatusStyle = (status) => {
//     switch(status) {
//       case 'active':
//         return 'bg-green-100 text-green-800';
//       case 'completed':
//         return 'bg-blue-100 text-blue-800';
//       case 'acquired':
//         return 'bg-purple-100 text-purple-800';
//       case 'past':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Image placeholders based on type
//   const getImagePlaceholder = (type) => {
//     switch(type) {
//       case 'project':
//         return '/assets/moonstone-golden.png';
//       case 'community':
//         return '/assets/moonstone-square.png';
//       case 'work':
//         return '/assets/moonstone-golden.png';
//       case 'mobile':
//         return '/assets/napkin-notes-golden.png';
//       case 'design':
//         return '/assets/napkin-notes-tall.webp';
//       case 'meetup':
//         return '/assets/napkin-notes-golden.png';
//       case 'workshop':
//         return '/assets/moonstone-tall.png';
//       case 'opensource':
//         return '/assets/napkin-notes-tall.webp';
//       case 'speaking':
//         return '/api/placeholder/400/240';
//       default:
//         return '/assets/moonstone-golden.png';
//     }
//   };

//   // Toggle expanded state for a card
//   const toggleExpand = (id) => {
//     if (expandedCard === id) {
//       setExpandedCard(null);
//     } else {
//       setExpandedCard(id);
//     }
//   };

//   // Toggle filter selection
//   const toggleFilter = (filterType, value) => {
//     setFilters(prev => {
//       const currentValues = prev[filterType];
//       const newValues = currentValues.includes(value)
//         ? currentValues.filter(v => v !== value)
//         : [...currentValues, value];

//       return {
//         ...prev,
//         [filterType]: newValues
//       };
//     });
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-4 md:p-8">
//       {/* Header Section */}
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
//           <div className="mb-4 md:mb-0">
//             <h1 className="text-3xl font-bold text-gray-800">Alex Rivera</h1>
//             <p className="text-gray-600 mb-2">Developer • Designer • Community Builder</p>
//             <div className="flex space-x-3">
//               <a href="#" className="text-gray-500 hover:text-gray-700">
//                 <Github size={20} />
//               </a>
//               <a href="#" className="text-gray-500 hover:text-gray-700">
//                 <Twitter size={20} />
//               </a>
//               <a href="#" className="text-gray-500 hover:text-gray-700">
//                 <Linkedin size={20} />
//               </a>
//               <a href="#" className="text-gray-500 hover:text-gray-700">
//                 <Mail size={20} />
//               </a>
//             </div>
//           </div>
//           <div className="flex flex-col space-y-2 md:items-end">
//             <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md transition-colors font-medium">
//               Contact Me
//             </button>
//             <p className="text-sm text-gray-500">Currently available for new opportunities</p>
//           </div>
//         </div>

//         {/* Controls Section */}
//         <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
//           <div className="flex flex-col md:flex-row md:items-center justify-between">
//             {/* View Mode Selector */}
//             <div className="mb-4 md:mb-0 md:mr-4">
//               <h2 className="text-lg font-medium text-gray-700">View Mode</h2>
//               <div className="flex space-x-2 mt-2">
//                 <button
//                   onClick={() => setViewMode('overview')}
//                   className={`px-4 py-2 rounded-md transition-colors ${viewMode === 'overview'
//                     ? 'bg-indigo-100 text-indigo-800 font-medium'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   onClick={() => setViewMode('descriptive')}
//                   className={`px-4 py-2 rounded-md transition-colors ${viewMode === 'descriptive'
//                     ? 'bg-indigo-100 text-indigo-800 font-medium'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//                 >
//                   Descriptive
//                 </button>
//                 <button
//                   onClick={() => setViewMode('impact')}
//                   className={`px-4 py-2 rounded-md transition-colors ${viewMode === 'impact'
//                     ? 'bg-indigo-100 text-indigo-800 font-medium'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//                 >
//                   Impact
//                 </button>
//               </div>
//             </div>

//             {/* Column Selector */}
//             <div className="mb-4 md:mb-0 md:mr-4">
//               <h2 className="text-lg font-medium text-gray-700">Layout</h2>
//               <div className="flex space-x-2 mt-2">
//                 <button
//                   onClick={() => setColumnCount(2)}
//                   className={`px-4 py-2 rounded-md transition-colors ${columnCount === 2
//                     ? 'bg-indigo-100 text-indigo-800 font-medium'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//                 >
//                   2 Columns
//                 </button>
//                 <button
//                   onClick={() => setColumnCount(3)}
//                   className={`px-4 py-2 rounded-md transition-colors ${columnCount === 3
//                     ? 'bg-indigo-100 text-indigo-800 font-medium'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//                 >
//                   3 Columns
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Filters Section */}
//           <div className="mt-6 pt-4 border-t border-gray-100">
//             <div className="flex items-center justify-between mb-3">
//               <div className="flex items-center">
//                 <Filter size={18} className="text-gray-400 mr-2" />
//                 <h2 className="text-lg font-medium text-gray-700">Filters</h2>
//               </div>

//               {/* Reset Filters */}
//               <button
//                 onClick={() => setFilters({ types: [], statuses: [], years: [] })}
//                 className={`text-indigo-600 hover:text-indigo-800 text-sm font-medium px-3 py-1 ${
//                   filters.types.length === 0 && filters.statuses.length === 0 && filters.years.length === 0
//                   ? 'opacity-50 cursor-not-allowed'
//                   : ''
//                 }`}
//                 disabled={filters.types.length === 0 && filters.statuses.length === 0 && filters.years.length === 0}
//               >
//                 Clear All Filters
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Type Filter */}
//               <div className="bg-gray-50 rounded-lg p-3">
//                 <h3 className="font-medium text-gray-700 mb-2 pb-1 border-b border-gray-200">Project Type</h3>
//                 <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
//                   {types.map(type => (
//                     <div
//                       key={type}
//                       className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
//                       onClick={() => toggleFilter('types', type)}
//                     >
//                       {filters.types.includes(type) ? (
//                         <CheckSquare size={16} className="text-indigo-600" />
//                       ) : (
//                         <Square size={16} className="text-gray-400" />
//                       )}
//                       <span className={`text-sm ${filters.types.includes(type) ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}>
//                         {type.charAt(0).toUpperCase() + type.slice(1)}
//                       </span>
//                       <span className="text-xs text-gray-400 ml-auto">
//                         {involvements.filter(item => item.type === type).length}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Status Filter */}
//               <div className="bg-gray-50 rounded-lg p-3">
//                 <h3 className="font-medium text-gray-700 mb-2 pb-1 border-b border-gray-200">Status</h3>
//                 <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
//                   {statuses.map(status => (
//                     <div
//                       key={status}
//                       className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
//                       onClick={() => toggleFilter('statuses', status)}
//                     >
//                       {filters.statuses.includes(status) ? (
//                         <CheckSquare size={16} className="text-indigo-600" />
//                       ) : (
//                         <Square size={16} className="text-gray-400" />
//                       )}
//                       <span className={`text-sm ${filters.statuses.includes(status) ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}>
//                         {status.charAt(0).toUpperCase() + status.slice(1)}
//                       </span>
//                       <span className="text-xs text-gray-400 ml-auto">
//                         {involvements.filter(item => item.status === status).length}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Year Filter */}
//               <div className="bg-gray-50 rounded-lg p-3">
//                 <h3 className="font-medium text-gray-700 mb-2 pb-1 border-b border-gray-200">Year</h3>
//                 <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
//                   {years.map(year => (
//                     <div
//                       key={year}
//                       className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
//                       onClick={() => toggleFilter('years', year)}
//                     >
//                       {filters.years.includes(year) ? (
//                         <CheckSquare size={16} className="text-indigo-600" />
//                       ) : (
//                         <Square size={16} className="text-gray-400" />
//                       )}
//                       <span className={`text-sm ${filters.years.includes(year) ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}>
//                         {year}
//                       </span>
//                       <span className="text-xs text-gray-400 ml-auto">
//                         {involvements.filter(item => item.year === year).length}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Active Filters */}
//             {(filters.types.length > 0 || filters.statuses.length > 0 || filters.years.length > 0) && (
//               <div className="mt-4 flex flex-wrap items-center">
//                 <span className="text-sm text-gray-500 mr-2">Active filters:</span>

//                 {filters.types.map(type => (
//                   <span
//                     key={`type-${type}`}
//                     className="bg-indigo-50 text-indigo-700 text-xs rounded-full px-3 py-1 flex items-center mr-2 mb-2"
//                   >
//                     <span>Type: {type.charAt(0).toUpperCase() + type.slice(1)}</span>
//                     <X
//                       size={14}
//                       className="ml-1 cursor-pointer"
//                       onClick={() => toggleFilter('types', type)}
//                     />
//                   </span>
//                 ))}

//                 {filters.statuses.map(status => (
//                   <span
//                     key={`status-${status}`}
//                     className="bg-indigo-50 text-indigo-700 text-xs rounded-full px-3 py-1 flex items-center mr-2 mb-2"
//                   >
//                     <span>Status: {status.charAt(0).toUpperCase() + status.slice(1)}</span>
//                     <X
//                       size={14}
//                       className="ml-1 cursor-pointer"
//                       onClick={() => toggleFilter('statuses', status)}
//                     />
//                   </span>
//                 ))}

//                 {filters.years.map(year => (
//                   <span
//                     key={`year-${year}`}
//                     className="bg-indigo-50 text-indigo-700 text-xs rounded-full px-3 py-1 flex items-center mr-2 mb-2"
//                   >
//                     <span>Year: {year}</span>
//                     <X
//                       size={14}
//                       className="ml-1 cursor-pointer"
//                       onClick={() => toggleFilter('years', year)}
//                     />
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Masonry Grid */}
//         <div className="flex gap-6 mt-6">
//           {distributedItems().map((column, columnIndex) => (
//             <div key={columnIndex} className="flex-1 space-y-6">
//               {column.map(involvement => (
//             <div
//               key={involvement.id}
//               className={`bg-gray-100 rounded-lg shadow-sm border overflow-hidden transition-all duration-300 ${
//                 expandedCard === involvement.id ? 'ring-2 ring-indigo-500' : 'hover:shadow-md'
//               }`}
//             >
//               {/* Card Header */}
//               <div className="p-4 flex justify-between items-start">
//                 <div className="flex items-start">
//                   <div className="p-2 rounded-md mr-3 mt-1" style={{ backgroundColor: `${involvement.color}20`, color: involvement.color }}>
//                     {renderTypeIcon(involvement.type)}
//                   </div>
//                   <div>
//                     <div className="flex items-center">
//                       <h3 className="font-semibold text-gray-800">{involvement.title}</h3>
//                       <span className="ml-2 text-gray-500 text-sm flex items-center">
//                         <Calendar size={14} className="mr-1" />
//                         {involvement.year}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-500">{involvement.subtitle}</p>

//                     {/* Status Badge */}
//                     <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${getStatusStyle(involvement.status)}`}>
//                       {involvement.status.charAt(0).toUpperCase() + involvement.status.slice(1)}
//                     </span>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => toggleExpand(involvement.id)}
//                   className="text-gray-400 hover:text-gray-600 p-1"
//                 >
//                   {expandedCard === involvement.id ? <X size={18} /> : <Maximize2 size={18} />}
//                 </button>
//               </div>

//               {/* Tags */}
//               <div className="px-4 pb-3 -mt-1 flex flex-wrap">
//                 {involvement.tags.map(tag => (
//                   <span key={tag} className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1 mr-2 mb-1 flex items-center">
//                     <Tag size={12} className="mr-1" />
//                     {tag}
//                   </span>
//                 ))}
//               </div>

//               {/* Card Image - Only shown in overview or if expanded, and only if image exists */}
//               {/* {involvement.image && (viewMode === 'overview' || expandedCard === involvement.id) && ( */}
//               {involvement.image && (viewMode !== 'hoverview' || expandedCard === involvement.id) && (
//                 <div className="w-full bg-gray-100 relative">
//                   <img
//                     src={getImagePlaceholder(involvement.image)}
//                     alt={involvement.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}

//               {/* Description - Shown in descriptive and impact modes or if expanded */}
//               {(viewMode === 'descriptive' || viewMode === 'impact' || expandedCard === involvement.id) && (
//                 <div className="p-4">
//                   <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
//                   <p className="text-sm text-gray-600">{involvement.description}</p>
//                 </div>
//               )}

//               {/* Impact - Only shown in impact mode or if expanded */}
//               {(viewMode === 'impact' || expandedCard === involvement.id) && (
//                 <div className="p-4 bg-gray-50">
//                   <h4 className="text-sm font-medium text-gray-700 mb-3">Impact & Insights</h4>

//                   <div className="space-y-3">
//                     <div>
//                       <div className="flex items-center text-sm font-medium text-gray-700 mb-1">
//                         <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
//                         Metrics
//                       </div>
//                       <p className="text-sm text-gray-600 ml-5">{involvement.impact.metrics}</p>
//                     </div>

//                     <div>
//                       <div className="flex items-center text-sm font-medium text-gray-700 mb-1">
//                         <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
//                         Challenges
//                       </div>
//                       <p className="text-sm text-gray-600 ml-5">{involvement.impact.challenges}</p>
//                     </div>

//                     <div>
//                       <div className="flex items-center text-sm font-medium text-gray-700 mb-1">
//                         <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
//                         Key Learnings
//                       </div>
//                       <p className="text-sm text-gray-600 ml-5">{involvement.impact.learnings}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredInvolvements.length === 0 && (
//           <div className="bg-white rounded-lg shadow-sm p-8 text-center my-8">
//             <div className="text-gray-400 mb-3">
//               <Filter size={48} className="mx-auto" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-700 mb-1">No matching results</h3>
//             <p className="text-gray-500 mb-4">Try adjusting your filters to find what you're looking for</p>
//             <button
//               onClick={() => setFilters({ types: [], statuses: [], years: [] })}
//               className="text-indigo-600 hover:text-indigo-800 font-medium"
//             >
//               Reset All Filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PortfolioMockup;

"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Maximize2,
  Award,
  Code,
  Users,
  Briefcase,
  Book,
  Rocket,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Filter,
  Calendar,
  Tag,
  CheckSquare,
  Square,
} from "lucide-react";

const PortfolioMockup = () => {
  const [viewMode, setViewMode] = useState("overview"); // 'overview', 'descriptive', 'impact'
  const [expandedCard, setExpandedCard] = useState(null);
  const [columnCount, setColumnCount] = useState(3);
  const [filters, setFilters] = useState({
    types: [],
    statuses: [],
  });

  // For masonry layout
  const columnRefs = useRef([]);

  // Sample data for demonstration
  const involvements = [
    {
      id: 1,
      title: "Nebula AI Assistant",
      subtitle: "Lead Developer",
      type: "project",
      tags: ["AI", "Product", "SaaS"],
      status: "active",
      year: 2023,
      image: "project",
      color: "#6366F1",
      description:
        "Created an AI-powered personal assistant that helps users manage their daily tasks and schedule.",
      impact: {
        metrics: "5,000+ active users, 4.8/5 rating",
        challenges:
          "Optimizing for low-latency responses while maintaining accuracy",
        learnings:
          "Deep understanding of NLP models and user experience design for conversational interfaces",
      },
    },
    {
      id: 2,
      title: "Tech Mentorship Program",
      subtitle: "Senior Mentor",
      type: "community",
      tags: ["Education", "Leadership"],
      status: "completed",
      year: 2022,
      image: "community",
      color: "#EC4899",
      description:
        "Provided guidance to 12 junior developers through a structured 6-month mentorship program.",
      impact: {
        metrics: "10 out of 12 mentees secured promotions within 8 months",
        challenges: "Adapting mentorship style to diverse learning approaches",
        learnings:
          "Effective feedback techniques and developmental psychology insights",
      },
    },
    {
      id: 3,
      title: "PixelPerfect Design Agency",
      subtitle: "UX Consultant",
      type: "work",
      tags: ["Design", "Consulting"],
      status: "past",
      year: 2021,
      image: "work",
      color: "#10B981",
      description:
        "Consulted on user experience for enterprise clients, focusing on accessibility and conversion optimization.",
      impact: {
        metrics: "Improved client conversion rates by an average of 23%",
        challenges: "Balancing aesthetic design with data-driven decisions",
        learnings:
          "Developed framework for integrating qualitative and quantitative UX research",
      },
    },
    {
      id: 4,
      title: "AWS Solutions Architect",
      subtitle: "Professional Certification",
      type: "certification",
      tags: ["Cloud", "Technical"],
      status: "acquired",
      year: 2023,
      image: null,
      color: "#F59E0B",
      description:
        "Earned professional-level certification in designing distributed applications on AWS infrastructure.",
      impact: {
        metrics:
          "Implemented solutions reducing client infrastructure costs by 35%",
        challenges:
          "Mastering the breadth of AWS services while gaining depth in key areas",
        learnings:
          "Cloud architecture patterns that balance performance, cost, and security",
      },
    },
    {
      id: 5,
      title: "OpenSource Contribution",
      subtitle: "React Performance Library",
      type: "project",
      tags: ["Open Source", "Frontend"],
      status: "active",
      year: 2022,
      image: "opensource",
      color: "#6366F1",
      description:
        "Created and maintained a library for optimizing React application performance used by 200+ projects.",
      impact: {
        metrics:
          "2.3k GitHub stars, adopted by 3 enterprise-level applications",
        challenges:
          "Ensuring backward compatibility while introducing new features",
        learnings:
          "Open source community management and technical documentation best practices",
      },
    },
    {
      id: 6,
      title: "Digital Ethics Conference",
      subtitle: "Keynote Speaker",
      type: "community",
      tags: ["Speaking", "Thought Leadership"],
      status: "completed",
      year: 2023,
      image: "speaking",
      color: "#EC4899",
      description:
        "Delivered keynote on ethical considerations in AI development to an audience of 500+ industry professionals.",
      impact: {
        metrics:
          "Talk received 4.9/5 rating, resulted in 3 consulting opportunities",
        challenges:
          "Communicating technical concepts to a mixed technical/non-technical audience",
        learnings:
          "Public speaking techniques and effective storytelling for technical topics",
      },
    },
    {
      id: 7,
      title: "EcoTrack Mobile App",
      subtitle: "Side Project",
      type: "project",
      tags: ["Mobile", "Sustainability"],
      status: "acquired",
      year: 2021,
      image: "mobile",
      color: "#6366F1",
      description:
        "Developed and launched a mobile app that helps users track and reduce their carbon footprint through daily activities.",
      impact: {
        metrics:
          "Acquired by GreenTech Inc. for $120K, 25K downloads prior to acquisition",
        challenges:
          "Balancing accuracy of carbon calculations with user-friendly experience",
        learnings:
          "Mobile app monetization strategies and acquisition preparation",
      },
    },
    {
      id: 8,
      title: "Machine Learning Specialization",
      subtitle: "Stanford University",
      type: "certification",
      tags: ["AI", "Education"],
      status: "acquired",
      year: 2022,
      image: null,
      color: "#F59E0B",
      description:
        "Completed 5-course specialization covering foundations to advanced ML techniques and practical applications.",
      impact: {
        metrics:
          "Applied techniques to increase prediction accuracy by 18% in a work project",
        challenges:
          "Implementing complex algorithms with limited computational resources",
        learnings:
          "Practical application of theoretical ML concepts to real-world problems",
      },
    },
    {
        id: 18,
        title: "Machine Learning Specialization2",
        subtitle: "Stanford University",
        type: "certification",
        tags: ["AI", "Education"],
        status: "acquired",
        year: 2022,
        image: null,
        color: "#F59E0B",
        description:
          "Completed 5-course specialization covering foundations to advanced ML techniques and practical applications.",
        impact: {
          metrics:
            "Applied techniques to increase prediction accuracy by 18% in a work project",
          challenges:
            "Implementing complex algorithms with limited computational resources",
          learnings:
            "Practical application of theoretical ML concepts to real-world problems",
        },
      },
      {
        id: 28,
        title: "Machine Learning Specialization3",
        subtitle: "Stanford University",
        type: "certification",
        tags: ["AI", "Education"],
        status: "acquired",
        year: 2022,
        image: null,
        color: "#F59E0B",
        description:
          "Completed 5-course specialization covering foundations to advanced ML techniques and practical applications.",
        impact: {
          metrics:
            "Applied techniques to increase prediction accuracy by 18% in a work project",
          challenges:
            "Implementing complex algorithms with limited computational resources",
          learnings:
            "Practical application of theoretical ML concepts to real-world problems",
        },
      },
      {
        id: 48,
        title: "Machine Learning Specialization4",
        subtitle: "Stanford University",
        type: "certification",
        tags: ["AI", "Education"],
        status: "acquired",
        year: 2022,
        image: null,
        color: "#F59E0B",
        description:
          "Completed 5-course specialization covering foundations to advanced ML techniques and practical applications.",
        impact: {
          metrics:
            "Applied techniques to increase prediction accuracy by 18% in a work project",
          challenges:
            "Implementing complex algorithms with limited computational resources",
          learnings:
            "Practical application of theoretical ML concepts to real-world problems",
        },
      },
    {
      id: 9,
      title: "Freelance Design Service",
      subtitle: "UI/UX Design",
      type: "service",
      tags: ["Design", "Freelance"],
      status: "active",
      year: 2020,
      image: "design",
      color: "#8B5CF6",
      description:
        "Provide tailored UI/UX design services for startups and small businesses looking to improve their digital products.",
      impact: {
        metrics:
          "Served 15+ clients, 90% retention rate for follow-on projects",
        challenges:
          "Managing client expectations and scope creep in creative work",
        learnings:
          "Client communication frameworks and value-based pricing strategies",
      },
    },
    {
      id: 10,
      title: "Local Tech Meetup",
      subtitle: "Organizer",
      type: "community",
      tags: ["Community Building", "Networking"],
      status: "active",
      year: 2021,
      image: "meetup",
      color: "#EC4899",
      description:
        "Founded and organize a monthly meetup for local tech professionals to share knowledge and network.",
      impact: {
        metrics: "Grown to 200+ members, average of 65 attendees per event",
        challenges:
          "Finding diverse speakers and maintaining consistent attendance",
        learnings:
          "Community building strategies and event management techniques",
      },
    },
    {
      id: 11,
      title: "Data Privacy Certification",
      subtitle: "IAPP CIPP/E",
      type: "certification",
      tags: ["Privacy", "Legal"],
      status: "acquired",
      year: 2023,
      image: null,
      color: "#F59E0B",
      description:
        "Earned certification in European data protection laws, regulations and compliance requirements.",
      impact: {
        metrics:
          "Led GDPR compliance initiative saving company potential €2M in penalties",
        challenges:
          "Translating complex legal requirements into actionable technical specifications",
        learnings: "Balancing innovation with privacy by design principles",
      },
    },
    {
      id: 12,
      title: "Mindfulness Workshop Series",
      subtitle: "Creator & Facilitator",
      type: "service",
      tags: ["Wellness", "Education"],
      status: "past",
      year: 2020,
      image: "workshop",
      color: "#8B5CF6",
      description:
        "Developed and facilitated a 6-week workshop series on mindfulness techniques for tech professionals.",
      impact: {
        metrics: "4 cohorts completed, 97% reported reduced work stress",
        challenges:
          "Adapting traditional mindfulness practices for high-performance tech environments",
        learnings:
          "Intersection of wellness and productivity in knowledge work",
      },
    },
  ];

  // Get unique filter options
  const types = [...new Set(involvements.map((item) => item.type))];
  const statuses = [...new Set(involvements.map((item) => item.status))];
  const years = [...new Set(involvements.map((item) => item.year))].sort(
    (a, b) => b - a
  );

  // Apply filters to the involvements
  const filteredInvolvements = involvements.filter((item) => {
    return (
      (filters.types.length === 0 || filters.types.includes(item.type)) &&
      (filters.statuses.length === 0 || filters.statuses.includes(item.status))
    );
  });

  // Group involvements by year
  const groupedByYear = years.reduce((acc, year) => {
    const yearItems = filteredInvolvements.filter((item) => item.year === year);
    if (yearItems.length > 0) {
      acc[year] = yearItems;
    }
    return acc;
  }, {});

  // Initialize column heights for masonry layout
  useEffect(() => {
    columnRefs.current = Array(columnCount)
      .fill()
      .map(() => []);
  }, [columnCount]);

  // Helper function to render the appropriate icon for each involvement type
  const renderTypeIcon = (type) => {
    switch (type) {
      case "project":
        return <Code size={20} />;
      case "community":
        return <Users size={20} />;
      case "work":
        return <Briefcase size={20} />;
      case "certification":
        return <Award size={20} />;
      case "service":
        return <Rocket size={20} />;
      default:
        return <Book size={20} />;
    }
  };

  // Helper function to get status badge style
  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border border-green-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "acquired":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      case "past":
        return "bg-gray-100 text-gray-800 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Helper function to get card gradient based on type
  const getCardGradient = (type) => {
    switch (type) {
      case "project":
        return "bg-gradient-to-tr from-indigo-50 to-white";
      case "community":
        return "bg-gradient-to-tr from-pink-50 to-white";
      case "work":
        return "bg-gradient-to-tr from-emerald-50 to-white";
      case "certification":
        return "bg-gradient-to-tr from-amber-50 to-white";
      case "service":
        return "bg-gradient-to-tr from-violet-50 to-white";
      default:
        return "bg-gradient-to-tr from-gray-50 to-white";
    }
  };

  // Image placeholders based on type
  const getImagePlaceholder = (type) => {
    switch (type) {
      case "project":
        return "/assets/moonstone-tall.png";
      case "community":
        return "/assets/moonstone-square.png";
      case "work":
        return "/assets/moonstone-golden.png";
      case "mobile":
        return "/assets/napkin-notes-square.webp";
      case "design":
        return "/assets/napkin-notes-tall.webp";
      case "meetup":
        return "/assets/napkin-notes-golden.png";
      case "workshop":
        return "/assets/moonstone-tall.png";
      case "opensource":
        return "/assets/napkin-notes-tall.webp";
      case "speaking":
        return "/assets/napkin-notes-square.webp";
      default:
        return "/assets/moonstone-golden.png";
    }
  };

  // Toggle expanded state for a card
  const toggleExpand = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  // Toggle filter selection
  const toggleFilter = (filterType, value) => {
    setFilters((prev) => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [filterType]: newValues,
      };
    });
  };

  // Distribute items into columns for masonry layout within a year section
  const distributedItemsByYear = (yearItems) => {
    const columns = Array(columnCount)
      .fill()
      .map(() => []);

    yearItems.forEach((item, index) => {
      const columnIndex = index % columnCount;
      columns[columnIndex].push(item);
    });

    return columns;
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-gray-100 min-h-screen p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Alex Rivera
            </h1>
            <p className="text-gray-600 mb-2 text-lg">
              Developer • Designer • Community Builder
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div className="flex flex-col space-y-2 md:items-end">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium">
              Contact Me
            </button>
            <p className="text-sm text-gray-500">
              Currently available for new opportunities
            </p>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            {/* View Mode Selector */}
            <div className="mb-4 md:mb-0 md:mr-4">
              <h2 className="text-lg font-medium text-gray-700 mb-2">
                View Mode
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode("overview")}
                  className={`px-4 py-2 rounded-full transition-all ${
                    viewMode === "overview"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setViewMode("descriptive")}
                  className={`px-4 py-2 rounded-full transition-all ${
                    viewMode === "descriptive"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Descriptive
                </button>
                <button
                  onClick={() => setViewMode("impact")}
                  className={`px-4 py-2 rounded-full transition-all ${
                    viewMode === "impact"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Impact
                </button>
              </div>
            </div>

            {/* Column Selector */}
            <div className="mb-4 md:mb-0 md:mr-4">
              <h2 className="text-lg font-medium text-gray-700 mb-2">Layout</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setColumnCount(2)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    columnCount === 2
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  2 Columns
                </button>
                <button
                  onClick={() => setColumnCount(3)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    columnCount === 3
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  3 Columns
                </button>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Filter size={18} className="text-indigo-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-700">Filters</h2>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => setFilters({ types: [], statuses: [] })}
                className={`text-indigo-600 hover:text-indigo-800 text-sm font-medium px-3 py-1 ${
                  filters.types.length === 0 && filters.statuses.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  filters.types.length === 0 && filters.statuses.length === 0
                }
              >
                Clear All Filters
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Type Filter */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="font-medium text-gray-700 mb-2 pb-1 border-b border-gray-200">
                  Project Type
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1 pt-2">
                  {types.map((type) => (
                    <div
                      key={type}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors"
                      onClick={() => toggleFilter("types", type)}
                    >
                      <div
                        className="p-1.5 rounded-md"
                        style={{
                          backgroundColor: `${
                            type === "project"
                              ? "#6366F120"
                              : type === "community"
                              ? "#EC489920"
                              : type === "work"
                              ? "#10B98120"
                              : type === "certification"
                              ? "#F59E0B20"
                              : type === "service"
                              ? "#8B5CF620"
                              : "#94A3B820"
                          }`,
                          color:
                            type === "project"
                              ? "#6366F1"
                              : type === "community"
                              ? "#EC4899"
                              : type === "work"
                              ? "#10B981"
                              : type === "certification"
                              ? "#F59E0B"
                              : type === "service"
                              ? "#8B5CF6"
                              : "#94A3B8",
                        }}
                      >
                        {renderTypeIcon(type)}
                      </div>
                      <span
                        className={`text-sm ${
                          filters.types.includes(type)
                            ? "text-indigo-600 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </span>
                      {filters.types.includes(type) ? (
                        <CheckSquare
                          size={16}
                          className="text-indigo-600 ml-auto"
                        />
                      ) : (
                        <Square size={16} className="text-gray-400 ml-auto" />
                      )}
                      <span className="text-xs text-gray-400">
                        {
                          involvements.filter((item) => item.type === type)
                            .length
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="font-medium text-gray-700 mb-2 pb-1 border-b border-gray-200">
                  Status
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1 pt-2">
                  {statuses.map((status) => (
                    <div
                      key={status}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors"
                      onClick={() => toggleFilter("statuses", status)}
                    >
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          status === "active"
                            ? "bg-green-500"
                            : status === "completed"
                            ? "bg-blue-500"
                            : status === "acquired"
                            ? "bg-purple-500"
                            : "bg-gray-500"
                        }`}
                      ></span>
                      <span
                        className={`text-sm ${
                          filters.statuses.includes(status)
                            ? "text-indigo-600 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                      {filters.statuses.includes(status) ? (
                        <CheckSquare
                          size={16}
                          className="text-indigo-600 ml-auto"
                        />
                      ) : (
                        <Square size={16} className="text-gray-400 ml-auto" />
                      )}
                      <span className="text-xs text-gray-400">
                        {
                          involvements.filter((item) => item.status === status)
                            .length
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.types.length > 0 || filters.statuses.length > 0) && (
              <div className="mt-4 flex flex-wrap items-center">
                <span className="text-sm text-gray-500 mr-2">
                  Active filters:
                </span>

                {filters.types.map((type) => (
                  <span
                    key={`type-${type}`}
                    className="bg-indigo-50 text-indigo-700 text-xs rounded-full px-3 py-1 flex items-center mr-2 mb-2 border border-indigo-100"
                  >
                    <span>
                      Type: {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                    <X
                      size={14}
                      className="ml-1 cursor-pointer"
                      onClick={() => toggleFilter("types", type)}
                    />
                  </span>
                ))}

                {filters.statuses.map((status) => (
                  <span
                    key={`status-${status}`}
                    className="bg-indigo-50 text-indigo-700 text-xs rounded-full px-3 py-1 flex items-center mr-2 mb-2 border border-indigo-100"
                  >
                    <span>
                      Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                    <X
                      size={14}
                      className="ml-1 cursor-pointer"
                      onClick={() => toggleFilter("statuses", status)}
                    />
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Year Sections */}
        {years.map((year) => {
          const yearItems = groupedByYear[year] || [];
          if (yearItems.length === 0) return null;

          return (
            <div key={year} className="mb-12">
              {/* Year Header */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <div className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl rounded-full shadow-lg">
                    {year}
                  </div>
                </div>
              </div>

              {/* Masonry Grid for this year */}
              <div className="flex gap-6">
                {distributedItemsByYear(yearItems).map(
                  (column, columnIndex) => (
                    <div
                      key={`${year}-col-${columnIndex}`}
                      className="flex-1 space-y-6"
                    >
                      {column.map((involvement) => (
                        <div
                          key={involvement.id}
                          className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 ${getCardGradient(
                            involvement.type
                          )} border border-gray-100
                          ${
                            expandedCard === involvement.id
                              ? "ring-2 ring-offset-2 ring-indigo-500 transform scale-[1.01]"
                              : "hover:shadow-lg hover:transform hover:scale-[1.01]"
                          }`}
                        >
                          {/* Card Header */}
                          <div className="p-4 flex justify-between items-start border-b border-gray-100">
                            <div className="flex items-start">
                              <div
                                className="p-2.5 rounded-lg mr-3"
                                style={{
                                  backgroundColor: `${involvement.color}15`,
                                  color: involvement.color,
                                  boxShadow: `0 2px 8px ${involvement.color}20`,
                                }}
                              >
                                {renderTypeIcon(involvement.type)}
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-800 text-lg">
                                  {involvement.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {involvement.subtitle}
                                </p>

                                {/* Status Badge */}
                                <span
                                  className={`inline-block mt-2 text-xs px-2.5 py-1 rounded-full ${getStatusStyle(
                                    involvement.status
                                  )}`}
                                >
                                  {involvement.status.charAt(0).toUpperCase() +
                                    involvement.status.slice(1)}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => toggleExpand(involvement.id)}
                              className="text-gray-400 hover:text-indigo-600 p-1 transition-colors"
                              aria-label={
                                expandedCard === involvement.id
                                  ? "Collapse"
                                  : "Expand"
                              }
                            >
                              {expandedCard === involvement.id ? (
                                <X size={18} />
                              ) : (
                                <Maximize2 size={18} />
                              )}
                            </button>
                          </div>



                          {/* Card Image - Only shown in overview or if expanded, and only if image exists */}
                          {involvement.image &&
                            (viewMode === "overview" ||
                              expandedCard === involvement.id) && (
                              <div className="w-full bg-white relative">
                                <div
                                  className="relative overflow-hidden"
                                //   style={{
                                //     maxHeight:
                                //       expandedCard === involvement.id
                                //         ? "320px"
                                //         : "220px",
                                //   }}
                                >
                                  <img
                                    src={getImagePlaceholder(involvement.image)}
                                    alt={involvement.title}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-30"></div>
                                </div>
                              </div>
                            )}

                                                  {/* Tags */}
                                                  <div className="px-4 py-2 flex flex-wrap border-b border-gray-100 bg-white/70">
                            {involvement.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs bg-white text-gray-600 rounded-full px-2.5 py-1 mr-2 mb-1 flex items-center border border-gray-200 shadow-sm"
                              >
                                <Tag
                                  size={12}
                                  className="mr-1 text-indigo-500"
                                />
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Description - Shown in descriptive and impact modes or if expanded */}
                          {(viewMode === "descriptive" ||
                            viewMode === "impact" ||
                            expandedCard === involvement.id) && (
                            <div className="p-5 bg-white">
                              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <span className="w-1 h-5 bg-indigo-500 mr-2 rounded-full"></span>
                                Description
                              </h4>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {involvement.description}
                              </p>
                            </div>
                          )}

                          {/* Impact - Only shown in impact mode or if expanded */}
                          {(viewMode === "impact" ||
                            expandedCard === involvement.id) && (
                            <div className="p-5 bg-white border-t border-gray-100">
                              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                                <span className="w-1 h-5 bg-indigo-500 mr-2 rounded-full"></span>
                                Impact & Insights
                              </h4>

                              <div className="space-y-4">
                                <div className="bg-gradient-to-r from-green-50 to-white p-3 rounded-lg border border-green-100">
                                  <div className="flex items-center text-sm font-medium text-green-700 mb-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                    Metrics
                                  </div>
                                  <p className="text-sm text-gray-600 ml-4">
                                    {involvement.impact.metrics}
                                  </p>
                                </div>

                                <div className="bg-gradient-to-r from-amber-50 to-white p-3 rounded-lg border border-amber-100">
                                  <div className="flex items-center text-sm font-medium text-amber-700 mb-1">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                                    Challenges
                                  </div>
                                  <p className="text-sm text-gray-600 ml-4">
                                    {involvement.impact.challenges}
                                  </p>
                                </div>

                                <div className="bg-gradient-to-r from-blue-50 to-white p-3 rounded-lg border border-blue-100">
                                  <div className="flex items-center text-sm font-medium text-blue-700 mb-1">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                                    Key Learnings
                                  </div>
                                  <p className="text-sm text-gray-600 ml-4">
                                    {involvement.impact.learnings}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {Object.keys(groupedByYear).length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center my-8 border border-gray-100">
            <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter size={32} className="text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No matching results
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Try adjusting your filters to find what you're looking for
            </p>
            <button
              onClick={() => setFilters({ types: [], statuses: [] })}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioMockup;
