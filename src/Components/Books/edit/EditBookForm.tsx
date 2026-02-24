'use client'

import { updateBook } from '@/lib/actions/bookActions'
import Input from '@/Components/forms/Input'
import { useFormState } from 'react-dom'
import { BookUpdateType } from '@/lib/definitions'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import TextArea from '@/Components/forms/TextArea'
import { animeRateOptions } from '@/lib/consts'
import { RateSelect } from '@/Components/Animes/edit/RateSelect'

export default function EditBookForm({ id, title, poster, rate, description }: BookUpdateType) {
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

  return (
    <div className='w-full sm:w-[80%] flex flex-col py-10'>
      <form className='flex flex-col gap-5' action={dispatch}>
        <div className='flex px-10 py-5 bar flex-col gap-5'>
          <Input
            name='book-title'
            placeholder='Title'
            border={false}
            style='text-4xl text-noir-blue'
            describedBy='book-title-error'
            defaultValue={title}
          />
          <FormErrorMessage id='book-title-error' errors={state.errors?.title} />

          <div className='flex gap-2 flex-col'>
            <Input
              name='book-poster'
              placeholder='Image URL'
              describedBy='book-poster-error'
              defaultValue={poster}
            />
            <img className='rounded self-center w-[70%]' src={poster} alt={`${title} poster`} />
            <FormErrorMessage id='book-poster-error' errors={state.errors.poster} />
          </div>

          <div className='flex flex-col gap-2'>
            <RateSelect
              id={`edit-book-rate-${id}`}
              name='book-rate'
              defaultValue={rate}
              describedBy='book-rate-error'
              options={Object.values(animeRateOptions)}
              width='w-full text-white'
            />
            <FormErrorMessage id='book-rate-error' errors={state.errors.rate} />
          </div>

          <div className='w-full h-max'>
            <TextArea
              name='book-description'
              border={false}
              placeholder='Description'
              describedBy='book-description-error'
              defaultValue={description}
            />
            <FormErrorMessage id='book-description-error' errors={state.errors.rate} />
          </div>

          <FormErrorMessage id='book-external-error' errors={state.errors.external} />
        </div>

        <button className='bg-transparent border border-[#333333] rounded px-3 py-2 font-medium text-gray-500 hover:text-white hover:border-noir-blue hover:shadow-[0_0_25px_5px_var(--noir-blue)] hover:bg-noir-blue/20 transition-all w-full'>
          UPDATE BOOK
        </button>

        {/* <SuccesModal show={succes} message='Books Succesfully Added.' /> */}
      </form>
    </div>
  )
}
