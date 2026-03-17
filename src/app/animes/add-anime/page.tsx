'use client'

import { usePopUp } from '@/hooks/usePopUp'
import AddAnimeForm from '@/Components/Animes/add/AddAnimeForm'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import SuccessModal from '@/Components/SuccessModal';
import BulkTxtImportForm from '@/Components/Animes/add/BulkImportForm';
import { X } from "lucide-react";


export default function Page() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const { popUpData } = usePopUp({ newPath: `/animes?${params.toString()}` })
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');

  if (showSuccessModal) {
    return (
      <SuccessModal
        show={showSuccessModal}
        message='Anime Successfully Added!'
        onClose={() => {
          router.refresh();
          router.push(`/animes?${params.toString()}`);
        }}
      />
    );
  }

  return (
    <div
      data-pop-up={popUpData}
      className='bg-[#0001] backdrop-blur z-50 w-screen h-screen fixed top-0 py-3 px-3 sm:px-10 left-0 flex items-center justify-center'
    >
      <div
        className='rounded-lg animate-appear-fast shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] border border-noir-blue bg-[#000000] opacity-100 w-full md:w-152 lg:w-3xl max-h-[95vh] overflow-y-auto custom-scrollbar duration-150 pt-5 flex flex-col items-center justify-start relative'
      >
        <div className='flex items-end justify-between w-full px-6 border-b border-gray-800 mb-4 text-xs sm:text-base'>
          <div className='flex xs:gap-1 sm:gap-4 w-max -mb-px'>
            <button
              className={`${activeTab === 'single' ? 'border-white text-white' : 'hover:border-white hover:text-white text-gray-400 border-transparent opacity-50'} animate-appear-fast cursor-pointer px-2 xs:px-3 py-2 rounded-t-md font-semibold duration-200 border-b-2 transition-colors`}
              onClick={() => setActiveTab('single')}
            >
              Single Add
            </button>
            <button
              className={`${activeTab === 'bulk' ? 'border-white text-white' : 'hover:border-white hover:text-white text-gray-400 border-transparent opacity-50'} animate-appear-fast cursor-pointer px-2 xs:px-3 py-2 rounded-t-md font-semibold duration-200 border-b-2 transition-colors`}
              onClick={() => setActiveTab('bulk')}
            >
              Bulk Import
            </button>
          </div>
          <Link
            href={`/animes?${params.toString()}`}
            scroll={false}
            className='text-3xl text-gray-500 animate-appear-fast mb-1'
          >
            <X className="duration-150 hover:rotate-90 hover:text-red-500 w-8 h-8 shrink-0" />
          </Link>
        </div>
        {activeTab === 'single' ? (
          <div className='w-full flex-1 min-h-0 flex flex-col items-center justify-start pt-5'>
            <AddAnimeForm searchParams={params} onSuccess={() => setShowSuccessModal(true)} />
          </div>
        ) : (
          <div className='w-full flex-1 min-h-0 flex flex-col items-center justify-start pt-5'>
            <BulkTxtImportForm onSuccess={() => setShowSuccessModal(true)} />
          </div>
        )}
      </div>
    </div>
  )
}
