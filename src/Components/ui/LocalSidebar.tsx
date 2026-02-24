'use client'

import { ReactNode } from 'react'
import { useSidebar } from '@/context/SidebarContext'


interface SideBarProps {
    side: 'left' | 'right'
    buttonContent: ReactNode
    navClass?: string
    children: ReactNode
}

export function SideBar({ side, buttonContent, navClass = '', children }: SideBarProps) {
    const { isOpen, toggle, setIsOpen } = useSidebar()

    const sideClass = side === 'left' ? 'left-0' : 'right-0'
    const transformClass = isOpen ? 'translate-x-0' : (side === 'left' ? '-translate-x-full' : 'translate-x-full')

    return (
        <>
            <div onClick={toggle}>
                {buttonContent}
            </div>

            <div
                className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            <div className={`fixed top-0 ${sideClass} h-full max-w-[85vw] z-50 transform transition-transform duration-300 ease-in-out ${transformClass} bg-black/30 backdrop-blur-3xl border-l border-gray-800 shadow-xl ${navClass}`}>
                {children}
            </div>
        </>
    )
}

export function CloseButton({ children, className = '' }: { children: ReactNode, className?: string }) {
    const { setIsOpen } = useSidebar()

    return (
        <div className={className} onClick={() => setIsOpen(false)}>
            {children}
        </div>
    )
}
