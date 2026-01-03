
'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export default function ReactQueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0, // Data is immediately stale - always fetch fresh
        gcTime: 5 * 60 * 1000, // Garbage collect after 5 minutes
        refetchOnWindowFocus: true, // Refetch when user returns to tab
        refetchOnMount: true, // Refetch when component mounts
        refetchOnReconnect: true, // Refetch when network reconnects
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}