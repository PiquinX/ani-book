'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import LogoutModal from './LogoutModal'
import { navigationLinks } from '@/lib/consts'
import { useLoader } from "@/context/LoaderContext"
import { Home } from 'lucide-react'

export const Header = () => {
  const pathName = usePathname()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const { setIsLoading } = useLoader()

  if (pathName === '/login') return null

  return (
    <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-gray-800 w-full max-w-full overflow-hidden text-xs sm:text-base">
      <div className="relative flex items-center justify-between w-full h-full">
        {/* Left Side: Navigation Links */}
        <div className="flex flex-1 justify-start">
          {/* Mobile Navigation (< 768px) */}
          <div className="flex md:hidden xs:gap-1 sm:gap-4 w-max">
            {navigationLinks.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                scroll={false}
                onClick={() => setIsLoading(true)}
                className={`${pathName === link.href ? 'border-white text-white' : 'hover:border-white hover:text-white text-gray-400 border-transparent opacity-50'} px-2 xs:px-3 py-2 rounded-t-md font-semibold duration-200 border-b-2`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Navigation (>= 768px) */}
          <div className="hidden md:flex">
            <Link
              href="/"
              scroll={false}
              onClick={() => setIsLoading(true)}
              className={`${pathName === '/' ? 'border-white text-white' : 'hover:border-white hover:text-white text-gray-400 border-transparent opacity-50'} flex items-center gap-2 px-3 py-2 rounded-t-md font-semibold duration-200 border-b-2`}
            >
              <Home size={18} />
              Home
            </Link>
          </div>
        </div>

        {/* Right Side: Log Out */}
        <div className="flex flex-1 justify-end">
          <button
            className="px-3 py-2 cursor-pointer rounded-t-md border-transparent hover:border-white hover:text-white text-gray-400 opacity-50 font-semibold duration-200 border-b-2"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            Log Out
          </button>
        </div>
      </div>

      <LogoutModal
        show={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={async () => {
          setIsLogoutModalOpen(false)
          await signOut()
        }}
      />
    </header>
  )
}
