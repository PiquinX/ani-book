'use client'

import { usePopUp } from '@/hooks/usePopUp'
import AddAnimeForm from '@/Components/Animes/add/AddAnimeForm'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';

export default function Page () {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { popUpData } = usePopUp({ newPath: `/animes?${params.toString()}` })

  return (
        <div
            data-pop-up={popUpData}
            className='bg-[#0001] backdrop-blur z-50 w-screen h-screen fixed top-0 px-10 left-0 flex items-center justify-center'
        >
            <div
                className='rounded-lg animate-appear-fast border bg-white opacity-100 w-full md:w-[38rem] lg:w-[48rem] h-[70%] duration-150 py-5 flex flex-col items-center justify-center relative'
            >
              <div className='flex items-center justify-end w-full px-6 pb-5'>
                {/* <Link
                  href='/animes/add-anime/list'
                  className="bg-blue-500 rounded px-3 py-2 font-medium text-white"
                  scroll={false}
                >
                  Add list
                </Link> */}
                <Link
                  href={`/animes?${params.toString()}`}
                  scroll={false}
                  className='text-3xl text-gray-500'
                >
                  <i className="fa-solid fa-xmark duration-150 hover:rotate-90 hover:text-red-500"/>
                </Link>
              </div>
              <AddAnimeForm  />
            </div>
        </div>
  )
}
