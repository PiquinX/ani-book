'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'Movies', href: '/movies' },
  { name: 'Series', href: '/series' },
  { name: 'Books', href: '/books' },
  { name: 'Animes', href: '/animes' }
]

export const Header = () => {
  const pathName = usePathname()

  return (
        <header className="flex w-full justify-between xs:gap-1 border-b text-xs border-b-gray-300 sm:gap-4 sm:text-base">
          <div className='flex xs:gap-1 sm:gap-4 w-max'>
            {
              links.map((link, index) => (
                <Link
                  href={link.href}
                  key={index}
                  scroll={false}
                  className={`${pathName === link.href ? 'border-black' : 'hover:border-black border-transparent opacity-50'} px-2 xs:px-3 py-2 rounded-t-md font-semibold duration-200 border-b-2`}
                >
                  {link.name}
                </Link>
              ))
            }
          </div>
          <button 
            className='px-3 py-2 rounded-t-md border-transparent hover:border-black opacity-50 font-semibold duration-200 border-b-2'
            onClick={ async () => {
              await signOut()
            }}
          >
            Log Out
          </button>
        </header>
  )
}
