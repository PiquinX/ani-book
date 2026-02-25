'use client'

import { usePopUp } from '@/hooks/usePopUp'
import AddMovieForm from '@/Components/Movies/add/AddMovieForm'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SuccessModal from '@/Components/SuccessModal'

export default function Page() {
  const { popUpData } = usePopUp({ newPath: '/movies' })
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const router = useRouter()

  if (showSuccessModal) {
    return (
      <SuccessModal
        show={showSuccessModal}
        message='Movie Successfully Added!'
        onClose={() => {
          router.refresh();
          router.push('/movies');
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
        className='rounded-lg animate-appear-fast border border-noir-blue shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] bg-[#000000] opacity-100 w-full md:w-152 lg:w-3xl h-max flex flex-col items-center justify-center relative my-10'
      >
        <Link
          href='/movies'
          scroll={false}
          className='absolute text-3xl text-gray-500  top-5 right-6'
        >
          <i className="fa-solid fa-xmark duration-150 hover:rotate-90 hover:text-red-500" />
        </Link>
        <AddMovieForm onSuccess={() => setShowSuccessModal(true)} />
      </div>
    </div>
  )
}
