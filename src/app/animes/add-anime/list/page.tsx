'use client'

import { usePopUp } from '@/hooks/usePopUp'
import AddAnimeForm from '@/Components/Animes/add/AddAnimeForm'
import Link from 'next/link'
import AddAnimeListForm from '@/Components/Animes/add/AddAnimeListForm'

export default function Page () {
  const { popUpData } = usePopUp({ newPath: '/animes' })

  return (
        <div
            data-pop-up={popUpData}
            className='bg-[#0001] backdrop-blur z-50 w-screen h-screen fixed top-0 px-10 left-0 flex items-center justify-center'
        >
            <div
                className='rounded-lg animate-appear-fast border bg-white opacity-100 w-full md:w-[38rem] lg:w-[48rem] h-[70%] duration-150 py-5 flex flex-col items-center justify-center relative'
            >
              <div className='flex items-center justify-between w-full px-6 pb-5'>
                <Link
                  href='/animes/add-anime'
                  className="bg-blue-500 rounded px-3 py-2 font-medium text-white"
                  scroll={false}
                >
                  Return
                </Link>
                <Link
                  href='/animes'
                  scroll={false}
                  className='text-3xl text-gray-500'
                >
                  <i className="fa-solid fa-xmark duration-150 hover:rotate-90 hover:text-red-500"/>
                </Link>
              </div>
              <AddAnimeListForm />
            </div>
        </div>
  )
}
