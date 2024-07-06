'use client'

import Input from '@/Components/forms/Input'
import { useFormState } from 'react-dom'
import { SerieUpdateType } from '@/lib/definitions'
import { updateSerie } from '@/lib/actions/seriesActions'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import TextArea from '@/Components/forms/TextArea'

export default function EditSerieForm ({ id, title, poster, rate, description }: SerieUpdateType) {
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
    <div className='w-[80%] h-full flex flex-col py-10'>
        <form className='flex overflow-hidden flex-col gap-5' action={dispatch}>
          <div className='flex px-10 py-5 bar overflow-hidden overflow-y-scroll flex-col gap-5'>
            <Input
              name='serie-title'
              placeholder='Title'
              describedBy='serie-title-error'
              border={false}
              style='text-4xl text-blue-600'
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

            <Input
              type='number'
              name='serie-rate'
              placeholder='Rate from 0 to 100'
              describedBy='serie-rate-error'
              border={false}
              style='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              defaultValue={rate.toString()}
            />
            <FormErrorMessage id='serie-rate-error' errors={state.errors.rate} />

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

          <div className='bg-white w-full px-10'>
            <button className='hover:bg-blue-600 hover:text-white duration-200 w-full py-2 border-2 font-medium rounded text-blue-600 border-blue-600'>
              UPDATE SERIE
            </button>
          </div>

            {/* <SuccesModal show={succes} message='series Succesfully Added.' /> */}
        </form>
    </div>
  )
}
