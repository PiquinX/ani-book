import Input from '@/Components/forms/Input'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import { useFormState } from 'react-dom'
import { createSerie } from '@/lib/actions/seriesActions'
import TextArea from '@/Components/forms/TextArea'

import { animeRateOptions } from '@/lib/consts'
import { RateSelect } from '@/Components/Animes/edit/RateSelect'
import { useId } from 'react'

export default function AddMovieForm() {
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

  return (
    <div className='w-[80%] h-full flex flex-col py-10 bg-[#000000] text-white'>
      <h3 className='text-center text-2xl font-semibold text-noir-blue'>Add a new serie to the list.</h3>
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
          <button className='bg-transparent border border-[#333333] rounded px-3 py-2 font-medium text-gray-500 hover:text-white hover:border-noir-blue hover:shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] hover:bg-noir-blue/20 transition-all w-full'>
            ADD SERIE
          </button>
        </div>

        {/* <SuccesModal show={succes} message='series Succesfully Added.' /> */}
      </form>
    </div>
  )
}
