'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function RouteChangeTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Fetch current document.title dynamically
    const pageTitle = document.title

    if (window.gtag) {
      window.gtag('config', 'G-NR9HQHE5F4', {
        page_path: pathname,
        page_title: pageTitle,
      })
    }
  }, [pathname])

  return null
}
