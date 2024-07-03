import Input from '@/Components/forms/Input'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import { useFormState } from 'react-dom'
import { createSerie } from '@/lib/actions/seriesActions'
import TextArea from '@/Components/forms/TextArea'

export default function AddMovieForm () {
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
  const [state, dispatch] = useFormState(createSerie, initialState)

  return (
    <div className='w-[80%] h-full flex flex-col py-10'>
        <h3 className='text-center text-2xl font-semibold text-blue-600'>Add a new serie to the list.</h3>
        <form className='flex h-full overflow-hidden flex-col gap-5' action={dispatch}>
          <div className='flex px-10 py-5 bar h-full overflow-hidden overflow-y-scroll flex-col gap-5'>
            <Input
              name='serie-title'
              placeholder='Title'
              describedBy='serie-title-error'
            />
            <FormErrorMessage id='serie-title-error' errors={state.errors.title} />

            <Input
              name='serie-poster'
              placeholder='Image URL'
              describedBy='serie-poster-error'
            />
            <FormErrorMessage id='serie-poster-error' errors={state.errors.poster} />

            <Input
              name='serie-rate'
              placeholder='Rate from 0 to 100'
              describedBy='serie-rate-error'
            />
            <FormErrorMessage id='serie-rate-error' errors={state.errors.rate} />

            <TextArea
              name='serie-description'
              placeholder='Description'
              describedBy='serie-description-error'
            />
            <FormErrorMessage id='serie-description-error' errors={state.errors.rate} />

            <FormErrorMessage id='serie-external-error' errors={state.errors.external} />
          </div>

            <div className='bg-white w-full px-10'>
              <button className='hover:bg-blue-600 hover:text-white duration-200 w-full py-2 border-2 font-medium rounded text-blue-600 border-blue-600'>
                ADD SERIE
              </button>
            </div>

            {/* <SuccesModal show={succes} message='series Succesfully Added.' /> */}
        </form>
    </div>
  )
}
