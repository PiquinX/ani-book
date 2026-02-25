"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

interface LoaderContextType {
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined)

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false)
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Automatically hide loader when path or searchParams change (navigation completes)
    useEffect(() => {
        setIsLoading(false)
    }, [pathname, searchParams])

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoaderContext.Provider>
    )
}

export const useLoader = () => {
    const context = useContext(LoaderContext)
    if (context === undefined) {
        throw new Error('useLoader must be used within a LoaderProvider')
    }
    return context
}
