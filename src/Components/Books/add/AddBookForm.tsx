import { createBook } from '@/lib/actions/bookActions'
import Input from '@/Components/forms/Input'
import { useFormState } from 'react-dom'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import TextArea from '@/Components/forms/TextArea'

export default function AddBookForm () {
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

  return (
    <div className='w-[80%] h-full flex flex-col py-10'>
        <h3 className='text-center text-2xl font-semibold text-blue-600'>Add a new Book to the list.</h3>
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

            <Input
              name='book-rate'
              placeholder='Rate from 0 to 100'
              describedBy='book-rate-error'
            />
            <FormErrorMessage id='book-rate-error' errors={state.errors.rate} />

            <TextArea
              name='book-description'
              placeholder='Description'
              describedBy='book-description-error'
            />
            <FormErrorMessage id='book-description-error' errors={state.errors.rate} />

            <FormErrorMessage id='book-external-error' errors={state.errors.external} />
          </div>

            <div className='bg-white w-full px-10'>
              <button className='hover:bg-blue-600 hover:text-white duration-200 w-full py-2 border-2 font-medium rounded text-blue-600 border-blue-600'>
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
