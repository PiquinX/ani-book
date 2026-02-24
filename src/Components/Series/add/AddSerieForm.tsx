import Input from '@/Components/forms/Input'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import { useFormState } from 'react-dom'
import { createSerie } from '@/lib/actions/seriesActions'
import TextArea from '@/Components/forms/TextArea'

import { animeRateOptions } from '@/lib/consts'
import { RateSelect } from '@/Components/Animes/edit/RateSelect'
import { useId, useState } from 'react'

export default function AddSerieForm() {
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
  const [state, dispatch] = useFormState(createSerie, initialState)
  const selectId = useId()
  const [posterUrl, setPosterUrl] = useState('')

  return (
    <div className='w-full sm:w-[80%] flex flex-col py-10'>
      <h3 className='text-center text-2xl font-semibold text-noir-blue'>Add a new serie to the list.</h3>
      <form className='flex flex-col gap-5' action={dispatch}>
        <div className='flex px-10 py-5 bar flex-col gap-5'>
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
            value={posterUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPosterUrl(e.target.value)}
          />
          <FormErrorMessage id='serie-poster-error' errors={state.errors.poster} />
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
              name='serie-rate'
              defaultValue={0}
              describedBy='serie-rate-error'
              options={Object.values(animeRateOptions)}
              width='w-full'
            />
          </div>
          <FormErrorMessage id='serie-rate-error' errors={state.errors.rate} />

          <TextArea
            name='serie-description'
            placeholder='Description'
            describedBy='serie-description-error'
          />
          <FormErrorMessage id='serie-description-error' errors={state.errors.rate} />

          <FormErrorMessage id='serie-external-error' errors={state.errors.external} />
        </div>

        <div className='bg-[#000000] w-full px-10 pt-4 pb-8'>
          <button className='bg-transparent border border-[#333333] rounded px-3 py-2 font-medium text-gray-500 hover:text-white hover:border-noir-blue hover:shadow-[0_0_25px_5px_var(--noir-blue)] hover:bg-noir-blue/20 transition-all w-full'>
            ADD SERIE
          </button>
        </div>

        {/* <SuccesModal show={succes} message='series Succesfully Added.' /> */}
      </form>
    </div>
  )
}
