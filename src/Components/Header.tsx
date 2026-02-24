'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import LogoutModal from './LogoutModal'

const links = [
  { name: 'Movies', href: '/movies' },
  { name: 'Series', href: '/series' },
  { name: 'Books', href: '/books' },
  { name: 'Animes', href: '/animes' }
]

export const Header = () => {
  const pathName = usePathname()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl border-b border-gray-800 flex w-full justify-between xs:gap-1 text-xs sm:gap-4 sm:text-base">
      <div className='flex xs:gap-1 sm:gap-4 w-max'>
        {
          links.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              scroll={false}
              className={`${pathName === link.href ? 'border-white text-white' : 'hover:border-white hover:text-white text-gray-400 border-transparent opacity-50'} px-2 xs:px-3 py-2 rounded-t-md font-semibold duration-200 border-b-2`}
            >
              {link.name}
            </Link>
          ))
        }
      </div>
      <button
        className='px-3 py-2 cursor-pointer rounded-t-md border-transparent hover:border-white hover:text-white text-gray-400 opacity-50 font-semibold duration-200 border-b-2'
        onClick={() => setIsLogoutModalOpen(true)}
      >
        Log Out
      </button>

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
