import { createBook } from '@/lib/actions/bookActions'
import Input from '@/Components/forms/Input'
import { useFormState } from 'react-dom'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import TextArea from '@/Components/forms/TextArea'

import { animeRateOptions } from '@/lib/consts'
import { RateSelect } from '@/Components/Animes/edit/RateSelect'
import { useId } from 'react'

export default function AddBookForm() {
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

  return (
    <div className='w-[80%] h-full flex flex-col py-10 bg-[#000000] text-white'>
      <h3 className='text-center text-2xl font-semibold text-noir-blue'>Add a new Book to the list.</h3>
      <form className='flex h-full overflow-hidden flex-col gap-5' action={dispatch}>
        <div className='flex px-10 py-5 bar h-full overflow-hidden overflow-y-scroll flex-col gap-5'>
          <Input
            name='book-title'
            placeholder='Title'
            describedBy='book-title-error'
          />
          <FormErrorMessage id='book-title-error' errors={state.errors.title} />

          <Input
            name='book-poster'
            placeholder='Image URL'
            describedBy='book-poster-error'
          />
          <FormErrorMessage id='book-poster-error' errors={state.errors.poster} />

          <div className='w-full flex justify-center'>
            <RateSelect
              id={selectId}
              name='book-rate'
              defaultValue={0}
              describedBy='book-rate-error'
              options={Object.values(animeRateOptions)}
              width='w-full'
            />
          </div>
          <FormErrorMessage id='book-rate-error' errors={state.errors.rate} />

          <TextArea
            name='book-description'
            placeholder='Description'
            describedBy='book-description-error'
          />
          <FormErrorMessage id='book-description-error' errors={state.errors.rate} />

          <FormErrorMessage id='book-external-error' errors={state.errors.external} />
        </div>

        <div className='bg-[#000000] w-full px-10 pt-4 pb-8'>
          <button className='bg-transparent border border-[#333333] rounded px-3 py-2 font-medium text-gray-500 hover:text-white hover:border-noir-blue hover:shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] hover:bg-noir-blue/20 transition-all w-full'>
            ADD BOOK
          </button>
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
