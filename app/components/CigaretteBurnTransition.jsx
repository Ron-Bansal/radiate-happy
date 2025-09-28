'use client'

import { useEffect, useState } from 'react'

const CigaretteBurnTransition = () => {
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate transform values based on scroll position
  const calculateTransform = () => {
    const startTrigger = window.innerHeight // Start when first section is scrolled past
    const stretchDistance = window.innerHeight * 1.3 // 130vh stretch distance
    const totalEffectDistance = stretchDistance * 2 // Total distance for the entire effect
    
    const relativeScroll = Math.max(0, scrollY - startTrigger)
    const progress = Math.min(relativeScroll / totalEffectDistance, 1)
    
    let scaleY, translateY
    
    if (progress <= 0.5) {
      // First half: stretch from bottom (pinned bottom, growing upward)
      const stretchProgress = progress * 2
      scaleY = 0.01 + (stretchProgress * (stretchDistance / 100))
      translateY = 50 - (stretchProgress * 50) // Start at 50% (bottom), move to 0%
    } else {
      // Second half: unpin and flatten at top
      const shrinkProgress = (progress - 0.5) * 2
      scaleY = (stretchDistance / 100) * (1 - shrinkProgress * 0.99)
      translateY = -50 * shrinkProgress // Move from 0% to -50% (top)
    }
    
    return { scaleY: Math.max(0.01, scaleY), translateY }
  }

  const { scaleY, translateY } = calculateTransform()

  return (
    <div className="relative">
      {/* First section with dark background */}
      <div className="h-screen flex items-center justify-center" style={{ backgroundColor: '#212220' }}>
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Scroll down to see the effect</h1>
          <p className="text-lg">The image will stretch from the bottom as you scroll</p>
        </div>
      </div>

      {/* Sticky container for the transition effect */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div 
          className="w-full h-full origin-bottom"
          style={{
            transform: `scaleY(${scaleY}) translateY(${translateY}%)`,
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10
          }}
        >
          {/* Replace this with your actual SVG/image */}
          <div 
            className="w-full h-full bg-gradient-to-t from-purple-900 to-purple-600"
            style={{
              background: `linear-gradient(to top, #2B1F4B 0%, #4C3B7A 50%, #6B5B95 100%)`
            }}
          >
            {/* Placeholder for your SVG content */}
            {/* <div className="flex items-center justify-center h-full text-white text-2xl font-bold"> */}
              <img className="flex items-center justify-center w-full text-white text-2xl font-bold" src="/assets/garden/diapixel.svg" alt="" srcset="" />
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* Spacer to allow for scroll distance */}
      <div style={{ height: `${window.innerHeight * 2.6}px` }} />

      {/* Final section with matching background */}
      <div className="h-screen flex items-center justify-center" style={{ backgroundColor: '#2B1F4B' }}>
        <div className="text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Transition Complete</h2>
          <p className="text-lg">The image has flattened at the top</p>
        </div>
      </div>
    </div>
  )
}

export default CigaretteBurnTransition