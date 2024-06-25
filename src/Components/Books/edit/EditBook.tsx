'use client'

import EditBookForm from './EditBookForm'
import Link from 'next/link'
import { BookType } from '@/lib/definitions'
import { usePopUp } from '@/hooks/usePopUp'

const EditBook = ({ book }: {book : BookType}) => {
  const { popUpData } = usePopUp({ newPath: '/books' })

  return (
    <div
        data-pop-up={popUpData}
        className='bg-[#0001] backdrop-blur z-50 w-screen h-screen fixed top-0 px-10 left-0 flex items-center justify-center'
    >
        <div
            className='rounded-lg animate-appear-fast border bg-white opacity-100 w-full md:w-[38rem] lg:w-[48rem] h-[85%] duration-150 flex items-center justify-center relative'
        >
          <Link
            scroll={false}
            href='/books'
            className='absolute text-3xl text-gray-500  top-5 right-6'
          >
            <i className="fa-solid fa-xmark duration-150 hover:rotate-90 hover:text-red-500"/>
          </Link>
          <EditBookForm {...book} />
        </div>
    </div>
  )
}

export default EditBook
