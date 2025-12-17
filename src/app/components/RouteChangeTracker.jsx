'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function RouteChangeTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Fetch current document.title dynamically
    const pageTitle = document.title

    if (window.gtag) {
      window.gtag('config', 'G-M4Q3C3DJQM', {
        page_path: pathname,
        page_title: pageTitle,
      })
    }
  }, [pathname])

  return null
}
