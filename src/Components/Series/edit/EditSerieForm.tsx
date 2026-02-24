'use client'

import Input from '@/Components/forms/Input'
import { useFormState } from 'react-dom'
import { SerieUpdateType } from '@/lib/definitions'
import { updateSerie } from '@/lib/actions/seriesActions'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import TextArea from '@/Components/forms/TextArea'
import { animeRateOptions } from '@/lib/consts'
import { RateSelect } from '@/Components/Animes/edit/RateSelect'

export default function EditSerieForm({ id, title, poster, rate, description }: SerieUpdateType) {
  const updateSerieWithID = updateSerie.bind(null, id)
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
    <div className='w-full sm:w-[80%] flex flex-col py-10'>
      <form className='flex flex-col gap-5' action={dispatch}>
        <div className='flex px-10 py-5 bar flex-col gap-5'>
          <Input
            name='serie-title'
            placeholder='Title'
            describedBy='serie-title-error'
            border={false}
            style='text-4xl text-noir-blue'
            defaultValue={title}
          />
          <FormErrorMessage id='serie-title-error' errors={state.errors.title} />

          <div className='flex gap-2 flex-col'>
            <Input
              name='serie-poster'
              placeholder='Image URL'
              describedBy='serie-poster-error'
              defaultValue={poster}
            />
            <img className='rounded self-center w-[70%]' src={poster} alt={`${title} poster`} />
            <FormErrorMessage id='serie-poster-error' errors={state.errors.poster} />
          </div>

          <div className='flex flex-col gap-2'>
            <RateSelect
              id={`edit-serie-rate-${id}`}
              name='serie-rate'
              defaultValue={rate}
              describedBy='serie-rate-error'
              options={Object.values(animeRateOptions)}
              width='w-full text-white'
            />
            <FormErrorMessage id='serie-rate-error' errors={state.errors.rate} />
          </div>

          <div className='w-full h-max'>
            <TextArea
              name='serie-description'
              border={false}
              placeholder='Description'
              describedBy='serie-description-error'
              defaultValue={description}
            />
            <FormErrorMessage id='serie-description-error' errors={state.errors.rate} />
          </div>

          <FormErrorMessage id='serie-external-error' errors={state.errors.external} />
        </div>

        <div className='bg-[#000000] w-full px-10 pt-4 pb-8'>
          <button className='bg-transparent border border-[#333333] rounded px-3 py-2 font-medium text-gray-500 hover:text-white hover:border-noir-blue hover:shadow-[0_0_25px_5px_var(--noir-blue)] hover:bg-noir-blue/20 transition-all w-full'>
            UPDATE SERIE
          </button>
        </div>

        {/* <SuccesModal show={succes} message='series Succesfully Added.' /> */}
      </form>
    </div>
  )
}
