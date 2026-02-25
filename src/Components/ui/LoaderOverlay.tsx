"use client"

import React from 'react'
import { useLoader } from '@/context/LoaderContext'

export default function LoaderOverlay() {
    const { isLoading } = useLoader()

    if (!isLoading) return null

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-appear-fast transition-opacity duration-300">
            <div className="w-16 h-16 border-4 border-[#333333] border-t-noir-blue rounded-full animate-spin shadow-[0_0_25px_5px_var(--noir-blue)]"></div>
        </div>
    )
}
