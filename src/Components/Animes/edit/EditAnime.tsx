'use client'

import EditAnimeForm from './EditAnimeForm'
import Link from 'next/link'
import { AnimeType } from '@/lib/definitions'
import { usePopUp } from '@/hooks/usePopUp'
import { useSearchParams } from 'next/navigation'


const EditAnime = ({ anime }: { anime : AnimeType }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { popUpData } = usePopUp({ newPath: `/animes?${params.toString()}` })

  return (
    <div
        data-pop-up={popUpData}
        className='bg-[#0001] backdrop-blur z-50 w-screen h-screen fixed top-0 py-3 px-3 sm:px-10 left-0 flex items-center justify-center'
    >
        <div
            className='rounded-lg animate-appear-fast border bg-white opacity-100 w-full md:w-[38rem] lg:w-[48rem] h-full sm:h-[90%] duration-150 py-5 flex flex-col items-center justify-center relative'
        >
          <Link
            scroll={false}
            href={`/animes?${params.toString()}`}
            className='absolute text-3xl text-gray-500  top-5 right-6'
          >
            <i className="fa-solid fa-xmark duration-150 hover:rotate-90 hover:text-red-500"/>
          </Link>
          <EditAnimeForm {...anime} />
        </div>
    </div>
  )
}

export default EditAnime
