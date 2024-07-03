'use client'

import { updateBook } from '@/lib/actions/bookActions'
import Input from '@/Components/forms/Input'
import { useFormState } from 'react-dom'
import { BookUpdateType } from '@/lib/definitions'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import TextArea from '@/Components/forms/TextArea'

export default function EditBookForm ({ id, title, poster, rate, description }: BookUpdateType) {
  const updateBookWithID = updateBook.bind(null, id)
  const initialState = {
    message: '',
    errors: {
      title: [],
      poster: [],
      rate: [],
      description: [],
      isFinished: [],
      external: [],
    },
  }
  const [state, dispatch] = useFormState(updateBookWithID, initialState)

  return (
    <div className='w-[80%] h-full flex flex-col py-10'>
        <form className='flex overflow-hidden flex-col gap-5' action={dispatch}>
          <div className='flex px-10 py-5 bar overflow-hidden overflow-y-scroll flex-col gap-5'>
            <Input
              name='book-title'
              placeholder='Title'
              border={false}
              style='text-4xl text-blue-600'
              describedBy='book-title-error'
              defaultValue={title}
            />
            <FormErrorMessage id='book-title-error' errors={state.errors.title} />

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

            <Input
              type='number'
              name='book-rate'
              placeholder='Rate from 0 to 100'
              describedBy='book-rate-error'
              border={false}
              style='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              defaultValue={rate}
            />
            <FormErrorMessage id='book-rate-error' errors={state.errors.rate} />

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

          <button className='hover:bg-blue-600 hover:text-white duration-200 w-full py-2 border-2 font-medium rounded text-blue-600 border-blue-600'>
            UPDATE BOOK
          </button>

            {/* <SuccesModal show={succes} message='Books Succesfully Added.' /> */}
        </form>
    </div>
  )
}
