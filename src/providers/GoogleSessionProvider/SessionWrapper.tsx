"use client"
import React from 'react'
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

const SessionWrapper = ({ children, session }: { children: React.ReactNode; session: Session | null }) => {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false} refetchInterval={0}>
        {children}
    </SessionProvider>
  )
}

export default SessionWrapper
