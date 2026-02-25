'use client'

import { useEffect } from 'react'
import SubmitButton from '@/Components/forms/SubmitButton'

import { updateBook } from '@/lib/actions/bookActions'
import Input from '@/Components/forms/Input'
import { useFormState } from 'react-dom'
import { BookUpdateType } from '@/lib/definitions'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import TextArea from '@/Components/forms/TextArea'
import { bookRateOptions } from '@/lib/consts'
import { RateSelect } from '@/Components/Animes/edit/RateSelect'
import { useState } from 'react'
import BookTitleSelectionInput from '@/Components/Books/BookTitleSelectionInput'

export default function EditBookForm({ id, title, poster, rate, description, onSuccess }: BookUpdateType & { onSuccess?: () => void }) {
  const updateBookWithID = updateBook.bind(null, id)
  const initialState = {
    message: '',
    errors: {
      title: [],
      poster: [],
      rate: [],
      description: [],
      external: [],
    },
  }
  const [state, dispatch] = useFormState(updateBookWithID, initialState)
  const [posterUrl, setPosterUrl] = useState(poster)
  const [currentDescription, setCurrentDescription] = useState(description)

  useEffect(() => {
    if ((state as any)?.success && onSuccess) {
      onSuccess();
    }
  }, [state, onSuccess]);

  return (
    <div className='w-full sm:w-[80%] flex flex-col py-10'>
      <form className='flex flex-col gap-5' action={dispatch}>
        <div className='flex px-10 py-5 bar flex-col gap-5'>
          <BookTitleSelectionInput
            describedBy='book-title-error'
            border={false}
            style='text-4xl text-noir-blue bg-transparent outline-none focus:border-b-2 focus:border-noir-blue focus:shadow-[0_4px_15px_rgba(30,58,138,0.6)] transition-all animate-appear-fast'
            defaultValue={title}
            onSelectTitle={(title, poster, author, desc) => {
              setPosterUrl(poster)
              setCurrentDescription(author ? `By ${author}` : '')
            }}
          />
          <FormErrorMessage id='book-title-error' errors={state.errors?.title} />

          <div className='flex gap-2 flex-col animate-appear-fast'>
            <Input
              name='book-poster'
              placeholder='Image URL'
              describedBy='book-poster-error'
              value={posterUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPosterUrl(e.target.value)}
            />
            <img className='rounded self-center w-[70%]' src={posterUrl} alt={`${title} poster`} />
            <FormErrorMessage id='book-poster-error' errors={state?.errors?.poster} />
          </div>

          <div className='flex flex-col gap-2 animate-appear-fast'>
            <RateSelect
              id={`edit-book-rate-${id}`}
              name='book-rate'
              defaultValue={rate}
              describedBy='book-rate-error'
              options={Object.values(bookRateOptions)}
              width='w-full text-white'
              type='book'
            />
            <FormErrorMessage id='book-rate-error' errors={state?.errors?.rate} />
          </div>

          <div className='w-full h-max animate-appear-fast'>
            <TextArea
              key={currentDescription}
              name='book-description'
              border={false}
              placeholder='Description'
              describedBy='book-description-error'
              defaultValue={currentDescription}
            />
            <FormErrorMessage id='book-description-error' errors={state?.errors?.rate} />
          </div>

          <FormErrorMessage id='book-external-error' errors={state?.errors?.external} />
        </div>

        <div className='bg-[#000000] w-full px-10 pt-4 pb-8 animate-appear-fast'>
          <SubmitButton>
            UPDATE BOOK
          </SubmitButton>
        </div>

        {/* <SuccesModal show={succes} message='Books Succesfully Added.' /> */}
      </form>
    </div>
  )
}
