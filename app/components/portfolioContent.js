import { title } from "process";

export const portfolioContent = [
  // Header Section
  {
    id: 'header',
    section: 'header',
    // title: 'Garden 🌱',
    // subtitle: 'Informal collection of mini projects, thoughts, & explorations',
    colSpan: 4,
    rowSpan: 1,
    backgroundColor: 'bg-gradient-to-r from-blue-100 to-purple-100',
    customClasses: 'rounded-t-3xl',
    image: '../assets/garden/header-banner.png',
    title: "garden 🪴",
    subtitle: "an informal collection of my explorations, projects, & photos",
    sectionSpacing: 32,
  },

  // First Content Row
  {
    id: 'purple-card',
    section: 'row1',
    colSpan: 1,
    rowSpan: 1, // This will be square now
    backgroundColor: 'bg-purple-400',
    customClasses: 'shadow-lg shadow-purple-500/25',
    caption: 'Purple project exploration',
    link: '#purple-project',
  },
  {
    id: 'main-feature',
    section: 'row1',
    colSpan: 2,
    rowSpan: 1,
    backgroundColor: 'bg-blue-200',
    customClasses: 'border border-blue-300/30',
    title: 'Main Feature',
    subtitle: 'Large content area',
  },
  {
    id: 'side-card',
    section: 'row1',
    colSpan: 1,
    rowSpan: 1, // This will be square now
    backgroundColor: 'bg-gray-300',
    customClasses: 'shadow-md',
    title: 'Side Card',
  },

  // Question Section
  {
    id: 'question-card',
    section: 'row2',
    colSpan: 2,
    rowSpan: 1,
    backgroundColor: 'bg-blue-300',
    customClasses: 'border-l-4 border-blue-600',
    title: 'What if you could ask questions about your spending like a friend?',
    sectionSpacing: 24,
  },
  {
    id: 'large-feature',
    section: 'row2',
    colSpan: 2,
    rowSpan: 2, // This will be square (2x2)
    backgroundColor: 'bg-gray-200',
    customClasses: 'shadow-xl border border-gray-300/50',
    caption: 'Major project showcase',
    link: '#major-project',
  },

  // Additional cards in the question section
  {
    id: 'small-card-1',
    section: 'row2',
    colSpan: 1,
    rowSpan: 1, // This will be square
    backgroundColor: 'bg-gray-400',
    customClasses: 'opacity-90 hover:opacity-100 transition-opacity',
  },
  {
    id: 'small-card-2',
    section: 'row2',
    colSpan: 1,
    rowSpan: 1, // This will be square
    backgroundColor: 'bg-gray-500',
    customClasses: 'opacity-90 hover:opacity-100 transition-opacity',
  },

  // Projects Row
  {
    id: 'green-project',
    section: 'row3',
    colSpan: 1,
    rowSpan: 1, // This will be square
    backgroundColor: 'bg-green-400',
    image: "https://images.unsplash.com/photo-1731435265797-136ba0b95cda?q=80&w=1152&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    customClasses: 'shadow-lg shadow-green-500/25 ring-1 ring-green-500/20',
    caption: 'Green energy project',
    link: '#green-project',
    sectionSpacing: 32,
  },
  {
    id: 'orange-project',
    section: 'row3',
    colSpan: 1,
    rowSpan: 1, // This will be square
    backgroundColor: 'bg-orange-400',
    customClasses: 'shadow-lg shadow-orange-500/25',
    title: 'Orange Project',
  },
  {
    id: 'workspace-image',
    section: 'row3',
    colSpan: 2,
    rowSpan: 1,
    backgroundColor: 'bg-yellow-100',
    customClasses: 'xborder border-yellow-200',
    image: 'https://images.unsplash.com/photo-1586227740560-8cf2732c1531?w=800&h=400&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Workspace setup',
    caption: 'My current workspace setup',
  },

  // Gallery Row
  {
    id: 'toast-icon',
    section: 'row4',
    colSpan: 1,
    rowSpan: 1, // This will be square
    backgroundColor: 'bg-white',
    customClasses: 'shadow-md border border-gray-100',
    icon: '🍞',
    caption: 'Toast notification system',
    link: '#toast-project',
    sectionSpacing: 24,
  },
  {
    id: 'art-gallery',
    section: 'row4',
    colSpan: 3,
    rowSpan: 1,
    backgroundColor: 'bg-gradient-to-r from-purple-200 to-pink-200',
    customClasses: 'border border-purple-300/50',
    title: 'Art Gallery',
    subtitle: 'Collection of digital artwork',
  },

  // Final Row
  {
    id: 'green-section-1',
    section: 'row5',
    colSpan: 2,
    rowSpan: 1,
    backgroundColor: 'bg-green-600',
    customClasses: 'shadow-xl',
    caption: 'Nature photography',
    link: '#nature-photos',
    sectionSpacing: 32,
  },
  {
    id: 'green-section-2',
    section: 'row5',
    colSpan: 2,
    rowSpan: 1,
    backgroundColor: 'bg-green-700',
    customClasses: 'shadow-xl',
    title: 'Environmental Data',
    subtitle: 'Climate tracking dashboard',
  },

  // Final Row 2
  {
    id: 'big-section-1',
    section: 'row6',
    colSpan: 2,
    rowSpan: 2,
    backgroundColor: 'bg-blue-600',
    customClasses: 'shadow-xl',
    caption: 'Nature photography',
    link: '#nature-photos',
    sectionSpacing: 32,
  },
  {
    id: 'big-section-2',
    section: 'row6',
    colSpan: 2,
    rowSpan: 2,
    backgroundColor: 'bg-blue-700',
    customClasses: 'shadow-xl',
    title: 'Environmental Data',
    subtitle: 'Climate tracking dashboard',
  },
];

// Configuration options
export const gridConfig = {
  maxWidth: '7xl', // Tailwind max-width class
  padding: 6, // Tailwind padding value
  gap: 4, // Grid gap
  defaultSectionSpacing: 32, // Default spacing between sections in pixels
  hoverTransition: 500, // Hover transition duration in ms
  defaultAspectRatio: 'square', // Default aspect ratio for 1x1 cells
  mobileColumns: 2, // Number of columns on mobile
  desktopColumns: 4, // Number of columns on desktop
};