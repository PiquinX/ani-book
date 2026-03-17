'use client'

import { usePopUp } from '@/hooks/usePopUp'
import AddBookForm from '@/Components/Books/add/AddBookForm'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SuccessModal from '@/Components/SuccessModal'
import { X } from "lucide-react";


export default function Page() {
  const { popUpData } = usePopUp({ newPath: '/books' })
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const router = useRouter()

  if (showSuccessModal) {
    return (
      <SuccessModal
        show={showSuccessModal}
        message='Book Successfully Added!'
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
      className='bg-[#0001] backdrop-blur z-50 w-screen h-screen fixed top-0 px-10 left-0 flex items-center justify-center'
    >
      <div
        className='rounded-lg border border-noir-blue shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] bg-[#000000] opacity-100 w-full md:w-152 lg:w-3xl max-h-[95vh] overflow-y-auto custom-scrollbar pt-5 flex flex-col items-center justify-start relative'
      >
        <Link
          href='/books'
          scroll={false}
          className='absolute text-3xl text-gray-500 animate-appear-fast top-5 right-6'
        >
          <X className="duration-150 hover:rotate-90 hover:text-red-500 w-8 h-8 shrink-0" />
        </Link>
        <AddBookForm onSuccess={() => setShowSuccessModal(true)} />
      </div>
    </div>
  )
}
