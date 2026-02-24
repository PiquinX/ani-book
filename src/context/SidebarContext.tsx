'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { SidebarContextType } from '@/lib/definitions'

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error('useSidebar must be used within a SideBarContainer')
    }
    return context
}

export function SideBarContainer({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(prev => !prev)

    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>
            {children}
        </SidebarContext.Provider>
    )
}
