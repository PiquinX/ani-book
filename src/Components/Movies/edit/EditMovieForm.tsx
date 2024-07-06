'use client'

import { updateMovie } from '@/lib/actions/moviesActions'
import Input from '@/Components/forms/Input'
import { useFormState } from 'react-dom'
import { MovieUpdateType } from '@/lib/definitions'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import TextArea from '@/Components/forms/TextArea'

export default function EditMovieForm ({ id, title, poster, rate, description }: MovieUpdateType) {
  const updateSerieWithID = updateMovie.bind(null, id)
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
  const [state, dispatch] = useFormState(updateSerieWithID, initialState)

  return (
    <div className='w-[80%] h-full flex flex-col py-10'>
        <form className='flex overflow-hidden flex-col gap-5' action={dispatch}>
          <div className='flex px-10 py-5 bar overflow-hidden overflow-y-scroll flex-col gap-5'>
            <Input
              name='movie-title'
              placeholder='Title'
              describedBy='movie-title-error'
              border={false}
              style='text-4xl text-blue-600'
              defaultValue={title}
            />
            <FormErrorMessage id='movie-title-error' errors={state.errors.title} />

            <div className='flex gap-2 flex-col'>
              <Input
                name='movie-poster'
                placeholder='Image URL'
                describedBy='movie-poster-error'
                defaultValue={poster}
              />
              <img className='rounded self-center w-[70%]' src={poster} alt={`${title} poster`} />
              <FormErrorMessage id='movie-poster-error' errors={state.errors.poster} />
            </div>

            <Input
              type='number'
              name='movie-rate'
              placeholder='Rate from 0 to 100'
              describedBy='movie-rate-error'
              border={false}
              style='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              defaultValue={rate.toString()}
            />
            <FormErrorMessage id='movie-rate-error' errors={state.errors.rate} />

            <div className='w-full h-max'>
              <TextArea
                name='movie-description'
                border={false}
                placeholder='Description'
                describedBy='movie-description-error'
                defaultValue={description}
              />
              <FormErrorMessage id='movie-description-error' errors={state.errors.rate} />
            </div>

            <FormErrorMessage id='movie-external-error' errors={state.errors.external} />
          </div>

          <div className='bg-white w-full px-10'>
            <button className='hover:bg-blue-600 hover:text-white duration-200 w-full py-2 border-2 font-medium rounded text-blue-600 border-blue-600'>
              UPDATE MOVIE
            </button>
          </div>

            {/* <SuccesModal show={succes} message='series Succesfully Added.' /> */}
        </form>
    </div>
  )
}
