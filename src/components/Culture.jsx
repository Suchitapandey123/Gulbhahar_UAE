'use client'

import { useEffect, useState } from 'react'

export default function Culture() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center">
        <div 
          className={`w-1/4 sm:w-1/3 md:w-1/4 lg:w-1/3 h-full bg-gray-100 transform transition-all duration-1000 ease-in-out ${
            isVisible ? 'translate-x-0' : '-translate-x-full'
          }`} 
          style={{ transitionDelay: '200ms' }}
        />
        <div 
          className={`w-1/4 sm:w-1/3 md:w-1/4 lg:w-1/3 h-full bg-gray-100 transform transition-all duration-1000 ease-in-out ${
            isVisible ? 'translate-x-0' : 'translate-x-full'
          }`} 
          style={{ transitionDelay: '400ms' }}
        />
      </div>
      
      <h1 
        className={`relative font-black text-black tracking-[-0.05em] z-10 transition-opacity duration-1000
          text-[15vw] sm:text-[12vw] md:text-[12vw] lg:text-[12vw] xl:text-[14vw]
          px-4 sm:px-6 md:px-8 
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{ 
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
          textShadow: '0.5px 0.5px 0px rgba(0, 0, 0, 0.1)'
        }}
      >
        CULTURE
      </h1>
    </div>
  )
}

