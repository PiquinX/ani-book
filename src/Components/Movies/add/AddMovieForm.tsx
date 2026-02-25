import { createMovie } from '@/lib/actions/moviesActions'
import Input from '@/Components/forms/Input'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import { useFormState } from 'react-dom'
import TextArea from '@/Components/forms/TextArea'

import { animeRateOptions } from '@/lib/consts'
import { RateSelect } from '@/Components/Animes/edit/RateSelect'
import { useId, useState, useEffect } from 'react'
import SubmitButton from '@/Components/forms/SubmitButton'

export default function AddMovieForm({ onSuccess }: { onSuccess?: () => void }) {
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
  const [state, dispatch] = useFormState(createMovie, initialState)
  const selectId = useId()
  const [posterUrl, setPosterUrl] = useState('')

  useEffect(() => {
    if ((state as any)?.success && onSuccess) {
      onSuccess();
    }
  }, [state, onSuccess]);

  return (
    <div className='w-full sm:w-[80%] flex flex-col py-10'>
      <h3 className='text-center text-2xl font-semibold text-noir-blue'>Add a new movie to the list.</h3>
      <form className='flex flex-col gap-5' action={dispatch}>
        <div className='flex px-10 py-5 bar flex-col gap-5'>
          <Input
            name='movie-title'
            placeholder='Title'
            describedBy='movie-title-error'
          />
          <FormErrorMessage id='movie-title-error' errors={state?.errors?.title} />

          <Input
            name='movie-poster'
            placeholder='Image URL'
            describedBy='movie-poster-error'
            value={posterUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPosterUrl(e.target.value)}
          />
          <FormErrorMessage id='movie-poster-error' errors={state?.errors?.poster} />
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
              name='movie-rate'
              defaultValue={1}
              describedBy='movie-rate-error'
              options={Object.values(animeRateOptions)}
              width='w-full'
            />
          </div>
          <FormErrorMessage id='movie-rate-error' errors={state?.errors?.rate} />

          <TextArea
            name='movie-description'
            placeholder='Description'
            describedBy='movie-description-error'
          />
          <FormErrorMessage id='movie-description-error' errors={state?.errors?.description} />

          <FormErrorMessage id='movie-external-error' errors={state?.errors?.external} />
        </div>

        <div className='bg-[#000000] w-full px-10 pt-4 pb-8'>
          <SubmitButton>
            ADD MOVIE
          </SubmitButton>
        </div>

        {/* <SuccesModal show={succes} message='movies Succesfully Added.' /> */}
      </form>
    </div>
  )
}
