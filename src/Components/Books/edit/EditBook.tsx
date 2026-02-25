'use client'

import EditBookForm from './EditBookForm'
import Link from 'next/link'
import { BookType } from '@/lib/definitions'
import { usePopUp } from '@/hooks/usePopUp'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SuccessModal from '@/Components/SuccessModal'

const EditBook = ({ book }: { book: BookType }) => {
  const { popUpData } = usePopUp({ newPath: '/books' })
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const router = useRouter()

  if (showSuccessModal) {
    return (
      <SuccessModal
        show={showSuccessModal}
        message='Book Successfully Updated!'
        onClose={() => {
          router.refresh();
          router.push('/books');
        }}
      />
    );
  }

  return (
    <div
      data-pop-up={popUpData}
      className='bg-[#0001] backdrop-blur z-50 w-screen h-screen fixed top-0 px-10 left-0 flex items-start justify-center overflow-y-auto'
    >
      <div
        className='rounded-lg border border-noir-blue shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] bg-[#000000] opacity-100 w-full md:w-152 lg:w-3xl h-max my-10 flex flex-col items-center justify-center relative'
      >
        <Link
          scroll={false}
          href='/books'
          className='absolute text-3xl text-gray-500 animate-appear-fast top-5 right-6'
        >
          <i className="fa-solid fa-xmark duration-150 hover:rotate-90 hover:text-red-500" />
        </Link>
        <EditBookForm {...book} onSuccess={() => setShowSuccessModal(true)} />
      </div>
    </div>
  )
}

export default EditBook
