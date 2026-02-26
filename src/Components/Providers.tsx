"use client"

import { SessionProvider } from "next-auth/react"
import { LoaderProvider } from "@/context/LoaderContext"
import LoaderOverlay from "@/Components/ui/LoaderOverlay"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <LoaderProvider>
                <LoaderOverlay />
                {children}
            </LoaderProvider>
        </SessionProvider>
    )
}
