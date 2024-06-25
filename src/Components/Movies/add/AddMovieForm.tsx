import { createMovie } from '@/lib/actions/moviesActions'
import Input from '@/Components/forms/Input'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import { useFormState } from 'react-dom'
import TextArea from '@/Components/forms/TextArea'

export default function AddMovieForm () {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createMovie, initialState)

  return (
    <div className='w-[80%] h-full flex flex-col py-10'>
        <h3 className='text-center text-2xl font-semibold text-blue-600'>Add a new movie to the list.</h3>
        <form className='flex h-full overflow-hidden flex-col gap-5' action={dispatch}>
          <div className='flex px-10 py-5 bar h-full overflow-hidden overflow-y-scroll flex-col gap-5'>
            <Input
              name='movie-title'
              placeholder='Title'
              describedBy='movie-title-error'
            />
            <FormErrorMessage id='movie-title-error' errors={state.errors.title} />

            <Input
              name='movie-poster'
              placeholder='Image URL'
              describedBy='movie-poster-error'
            />
            <FormErrorMessage id='movie-poster-error' errors={state.errors.poster} />

            <Input
              name='movie-rate'
              placeholder='Rate from 0 to 100'
              describedBy='movie-rate-error'
            />
            <FormErrorMessage id='movie-rate-error' errors={state.errors.rate} />

            <TextArea
              name='movie-description'
              placeholder='Description'
              describedBy='movie-description-error'
            />
            <FormErrorMessage id='movie-description-error' errors={state.errors.rate} />

            <FormErrorMessage id='movie-external-error' errors={state.errors.external} />
          </div>

            <div className='bg-white w-full px-10'>
              <button className='hover:bg-blue-600 hover:text-white duration-200 w-full py-2 border-2 font-medium rounded text-blue-600 border-blue-600'>
                ADD MOVIE
              </button>
            </div>

            {/* <SuccesModal show={succes} message='movies Succesfully Added.' /> */}
        </form>
    </div>
  )
}
