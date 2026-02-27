'use client'

import EditAnimeForm from './EditAnimeForm'
import Link from 'next/link'
import { AnimeType } from '@/lib/definitions'
import { usePopUp } from '@/hooks/usePopUp'
import { useSearchParams, useRouter } from 'next/navigation'
import SuccessModal from '@/Components/SuccessModal'
import ConfirmModal from '@/Components/ConfirmModal'
import { useState } from 'react'
import { deleteAnime } from '@/lib/actions/animeActions'


const EditAnime = ({ anime }: { anime: AnimeType }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const { popUpData } = usePopUp({ newPath: `/animes?${params.toString()}` })
  const [showSuccessModal, setShowSuccessModal] = useState<'updated' | 'deleted' | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deleteAnime(anime.id);
    setIsDeleting(false);
    if (res.success) {
      setShowConfirmModal(false);
      setShowSuccessModal('deleted');
    } else {
      alert(res.errorMessage || 'Failed to delete anime');
      setShowConfirmModal(false);
    }
  };

  if (showSuccessModal) {
    return (
      <SuccessModal
        show={!!showSuccessModal}
        message={showSuccessModal === 'deleted' ? 'Anime Successfully Deleted!' : 'Anime Successfully Updated!'}
        onClose={() => {
          router.push(`/animes?${params.toString()}`);
        }}
      />
    );
  }

  return (
    <div
      data-pop-up={popUpData}
      className='bg-[#0001] backdrop-blur z-50 w-screen h-screen fixed top-0 py-3 px-3 sm:px-10 left-0 flex items-start justify-center overflow-y-auto'
    >
      <div
        className='rounded-lg border border-noir-blue shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] bg-[#000000] opacity-100 w-full md:w-152 lg:w-3xl h-max my-10 duration-150 py-5 flex flex-col items-center justify-center relative'
      >
        <Link
          scroll={false}
          href={`/animes?${params.toString()}`}
          className='absolute text-3xl text-gray-500 animate-appear-fast top-5 right-6'
        >
          <i className="fa-solid fa-xmark duration-150 hover:rotate-90 hover:text-red-500" />
        </Link>
        <button
          type="button"
          onClick={() => setShowConfirmModal(true)}
          className='absolute flex items-center gap-2 px-3 py-1.5 border border-[#333333] rounded text-sm font-medium text-gray-500 animate-appear-fast top-5 left-6 hover:text-[#FF1111] hover:border-[#FF1111] hover:bg-[#FF1111]/10 hover:shadow-[0_0_15px_rgba(255,17,17,0.4)] transition-all cursor-pointer'
        >
          <i className="fa-solid fa-trash-can" />
          Delete
        </button>
        <EditAnimeForm {...anime} onSuccess={() => setShowSuccessModal('updated')} />
        <ConfirmModal
          show={showConfirmModal}
          title="Delete Anime"
          message="Are you sure you want to delete this anime? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmModal(false)}
          isProcessing={isDeleting}
        />
      </div>
    </div>
  )
}

export default EditAnime
