import { createBook } from '@/lib/actions/bookActions'
import Input from '@/Components/forms/Input'
import { useFormState } from 'react-dom'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import TextArea from '@/Components/forms/TextArea'

import { bookRateOptions } from '@/lib/consts'
import { RateSelect } from '@/Components/Animes/edit/RateSelect'
import { useId, useState, useEffect } from 'react'
import SubmitButton from '@/Components/forms/SubmitButton'

export default function AddBookForm({ onSuccess }: { onSuccess?: () => void }) {
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
  const [state, dispatch] = useFormState(createBook, initialState)
  const selectId = useId()
  const [posterUrl, setPosterUrl] = useState('')

  useEffect(() => {
    if ((state as any)?.success && onSuccess) {
      onSuccess();
    }
  }, [state, onSuccess]);

  return (
    <div className='w-full sm:w-[80%] flex flex-col py-10'>
      <h3 className='text-center text-2xl font-semibold text-noir-blue'>Add a new Book to the list.</h3>
      <form className='flex flex-col gap-5' action={dispatch}>
        <div className='flex px-10 py-5 bar flex-col gap-5'>
          <Input
            name='book-title'
            placeholder='Title'
            describedBy='book-title-error'
          />
          <FormErrorMessage id='book-title-error' errors={state?.errors?.title} />

          <Input
            name='book-poster'
            placeholder='Image URL'
            describedBy='book-poster-error'
            value={posterUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPosterUrl(e.target.value)}
          />
          <FormErrorMessage id='book-poster-error' errors={state?.errors?.poster} />
          {
            posterUrl && (
              <div className='flex justify-center w-full my-1'>
                <img src={posterUrl} alt="Poster previsualization" className="h-[200px] w-[140px] sm:h-[240px] sm:w-[160px] object-cover rounded-md shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-[#333333]" />
              </div>
            )
          }

          <div className='w-full flex justify-center'>
            <RateSelect
              id={selectId}
              name='book-rate'
              defaultValue={1}
              describedBy='book-rate-error'
              options={Object.values(bookRateOptions)}
              width='w-full'
              type='book'
            />
          </div>
          <FormErrorMessage id='book-rate-error' errors={state?.errors?.rate} />

          <TextArea
            name='book-description'
            placeholder='Description'
            describedBy='book-description-error'
          />
          <FormErrorMessage id='book-description-error' errors={state?.errors?.rate} />

          <FormErrorMessage id='book-external-error' errors={state?.errors?.external} />
        </div>

        <div className='bg-[#000000] w-full px-10 pt-4 pb-8'>
          <SubmitButton>
            ADD BOOK
          </SubmitButton>
        </div>

        {/* <SuccesModal show={succes} message='Books Succesfully Added.' /> */}
      </form>
    </div>
  )
}

// const [succes, setSucces] = useState<boolean>(false)
// const { formData, handleChangePoster, handleChangeTitle, handleResetForm, error, setError, isInvalid } = useBookForm()

// const handleSubmit = async () => {
//   if (isInvalid) return
//   const result = await createBook(formData)

//   if (result) setError(result)
//   else {
//     setSucces(true)
//     setTimeout(() => {
//       setSucces(false)
//       handleCloseModal()
//       handleResetForm()
//       // IDK if revalidateTag/revalidatePath is the correct way to do it
//       revalidateTag('books')
//     }, 1000)
//   }
// }
