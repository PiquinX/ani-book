'use client'

import EditBookForm from './EditBookForm'
import Link from 'next/link'
import { BookType } from '@/lib/definitions'
import { usePopUp } from '@/hooks/usePopUp'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SuccessModal from '@/Components/SuccessModal'
import ConfirmModal from '@/Components/ConfirmModal'
import ErrorModal from '@/Components/ErrorModal'
import { deleteBook } from '@/lib/actions/bookActions'
import { X, Trash2 } from "lucide-react";


const EditBook = ({ book }: { book: BookType }) => {
  const { popUpData } = usePopUp({ newPath: '/books' })
  const [showSuccessModal, setShowSuccessModal] = useState<'updated' | 'deleted' | null>(null)
  const [showErrorModal, setShowErrorModal] = useState<string | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deleteBook(book.id);
    setIsDeleting(false);
    if (res.success) {
      setShowConfirmModal(false);
      setShowSuccessModal('deleted');
    } else {
      setShowConfirmModal(false);
      setShowErrorModal(res.errorMessage || 'Failed to delete book');
    }
  };

  if (showSuccessModal) {
    return (
      <SuccessModal
        show={!!showSuccessModal}
        message={showSuccessModal === 'deleted' ? 'Book Successfully Deleted!' : 'Book Successfully Updated!'}
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
          scroll={false}
          href='/books'
          className='absolute text-3xl text-gray-500 animate-appear-fast top-5 right-6'
        >
          <X className="duration-150 hover:rotate-90 hover:text-red-500 w-8 h-8 shrink-0" />
        </Link>
        <button
          type="button"
          onClick={() => setShowConfirmModal(true)}
          className='absolute flex items-center gap-2 px-3 py-1.5 border border-[#333333] rounded text-sm font-medium text-gray-500 animate-appear-fast top-5 left-6 hover:text-[#FF1111] hover:border-[#FF1111] hover:bg-[#FF1111]/10 hover:shadow-[0_0_15px_rgba(255,17,17,0.4)] transition-all cursor-pointer'
        >
          <Trash2 className="w-5 h-5 shrink-0 text-red-500 cursor-pointer hover:text-red-400 duration-150" />
          Delete
        </button>
        <EditBookForm {...book} onSuccess={() => setShowSuccessModal('updated')} />
        <ConfirmModal
          show={showConfirmModal}
          title="Delete Book"
          message="Are you sure you want to delete this book? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmModal(false)}
          isProcessing={isDeleting}
        />
        <ErrorModal
          show={!!showErrorModal}
          message={showErrorModal || ''}
          onClose={() => setShowErrorModal(null)}
        />
      </div>
    </div>
  )
}

export default EditBook
