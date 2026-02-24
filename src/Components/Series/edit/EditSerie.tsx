'use client'

import Link from 'next/link'
import { SerieType } from '@/lib/definitions'
import EditSerieForm from './EditSerieForm'
import { usePopUp } from '@/hooks/usePopUp'

const EditSerie = ({ serie }: { serie: SerieType }) => {
  const { popUpData } = usePopUp({ newPath: '/series' })

  return (
    <div
      data-pop-up={popUpData}
      className='bg-[#0001] backdrop-blur z-50 w-screen h-screen fixed top-0 px-10 left-0 flex items-center justify-center'
    >
      <div
        className='rounded-lg animate-appear-fast border border-noir-blue shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] bg-[#000000] opacity-100 w-full md:w-152 lg:w-3xl h-[85%] flex items-center justify-center relative'
      >
        <Link
          href='/series'
          scroll={false}
          className='absolute text-3xl text-gray-500  top-5 right-6'
        >
          <i className="fa-solid fa-xmark duration-150 hover:rotate-90 hover:text-red-500" />
        </Link>
        <EditSerieForm {...serie} />
      </div>
    </div>
  )
}

export default EditSerie
