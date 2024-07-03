'use client'

import Input from '@/Components/forms/Input'
import { useFormState } from 'react-dom'
import { AnimeRate, AnimeUpdateType } from '@/lib/definitions'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import { updateAnime } from '@/lib/actions/animeActions'
import TextArea from '@/Components/forms/TextArea'
import { Select } from '@/Components/forms/Select'
import { animeIsFinishedOptions } from '@/lib/consts'
import EditRateValueInput from './EditRateValueInput'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function EditAnimeForm ({ id, title, poster, rate, description, isFinished }: AnimeUpdateType) {
  const updateAnimeWithID = updateAnime.bind(null, id)
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
  const [state, dispatch] = useFormState(updateAnimeWithID, initialState)

  const [currentRate, setCurrentRate] = useState<AnimeRate[]>(rate)

  const handleAddRate = () => {
    const newRate = structuredClone(currentRate)
    newRate.push({
      value: '',
      rate: null
    })
    setCurrentRate(newRate)
  }

  const handleRemoveRate = () => {
    if (currentRate.length === 1) return
    const newRate = structuredClone(currentRate)
    newRate.pop()
    setCurrentRate(newRate)
  }

  return (
    <div className='w-[80%] h-full flex flex-col py-10'>
        <form className='flex overflow-hidden flex-col gap-5' action={dispatch}>
          <div className='flex px-10 py-5 bar overflow-hidden overflow-y-scroll flex-col gap-5'>
            <Input
              name='anime-title'
              placeholder='Title'
              describedBy='anime-title-error'
              border={false}
              style='text-4xl text-blue-600'
              defaultValue={title}
            />
            <FormErrorMessage id='anime-title-error' errors={state.errors.title} />

            <div className='flex gap-2 flex-col'>
              <Input
                name='anime-poster'
                placeholder='Image URL'
                describedBy='anime-poster-error'
                defaultValue={poster}
              />
              <img className='rounded self-center w-[70%]' src={poster} alt={`${title} poster`} />
              <FormErrorMessage id='anime-poster-error' errors={state.errors.poster} />
            </div>

            <div className='flex flex-col gap-6'>
              <div className='grid grid-cols-rates gap-5'>
                {
                  currentRate.map((value, index) => (
                    <div className='flex flex-col gap-5' key={index}>
                      <EditRateValueInput
                        defaultValue={value.value}
                        name='anime-rate-value'
                      />
                      <Input
                        type='number'
                        name='anime-rate'
                        placeholder='Rate from 0 to 100'
                        describedBy='anime-rate-error'
                        border={false}
                        style='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        defaultValue={value.rate}
                      />
                    </div>
                  ))
                }
              </div>
              <div className='flex gap-5'>
                <div
                  className='hover:bg-green-600 text-center cursor-pointer hover:text-white duration-200 w-full py-2 border-2 font-medium rounded text-green-600 border-green-600'
                  onClick={handleAddRate}
                >
                  Add
                </div>
                <div
                  className={`${currentRate.length === 1
                      ? 'cursor-not-allowed'
                      : 'hover:bg-red-600 cursor-pointer hover:text-white'
                    }
                      text-center  duration-200 w-full py-2 border-2 font-medium rounded text-red-600 border-red-600`
                  }
                  onClick={handleRemoveRate}
                >
                  Remove Last
                </div>
              </div>

              <FormErrorMessage id='anime-rate-error' errors={state.errors.rate} />
            </div>

            <div className='flex flex-col items-center'>
              <Select
                options={Object.values(animeIsFinishedOptions)}
                defaultValue={isFinished ? animeIsFinishedOptions.finished : animeIsFinishedOptions.notFinished}
                describedBy='anime-isfinished-error'
                name='anime-isfinished'
              />
              <FormErrorMessage id='anime-isfinished-error' errors={state.errors.isFinished} />
            </div>

            <div className='w-full h-max'>
              <TextArea
                name='anime-description'
                border={false}
                placeholder='Description'
                describedBy='anime-description-error'
                defaultValue={description}
              />
              <FormErrorMessage id='anime-description-error' errors={state.errors.rate} />
            </div>

            <FormErrorMessage id='anime-external-error' errors={state.errors.external} />
          </div>

          <div className='bg-white w-full px-10'>
            <button className='hover:bg-blue-600 hover:text-white duration-200 w-full py-2 border-2 font-medium rounded text-blue-600 border-blue-600'>
              UPDATE ANIME
            </button>
          </div>

            {/* <SuccesModal show={succes} message='animes Succesfully Added.' /> */}
        </form>
    </div>
  )
}
