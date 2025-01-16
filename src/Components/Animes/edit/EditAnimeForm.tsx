'use client'

import Input from '@/Components/forms/Input'
import { useFormState } from 'react-dom'
import { AnimeRate, AnimeUpdateType } from '@/lib/definitions'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import { updateAnime } from '@/lib/actions/animeActions'
import TextArea from '@/Components/forms/TextArea'
import { Select } from '@/Components/forms/Select'
import { animeIsFinishedOptions, animeRateOptions } from '@/lib/consts'
import EditRateValueInput from './EditRateValueInput'
import { useId, useState } from 'react'
import { RateSelect } from './RateSelect'
import { useSearchParams } from 'next/navigation'

export default function EditAnimeForm ({ id, title, poster, rate, description, isFinished }: AnimeUpdateType) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const updateAnimeWithID = updateAnime.bind(null, id, params.toString())
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

  const selectId = useId()

  return (
    <div className='w-full sm:w-[80%] h-[90%] flex flex-col sm:pb-4'>
        <form className='flex overflow-hidden flex-col gap-5' action={dispatch}>
          <div className='flex px-4 xs:px-6 sm:px-10 py-5 bar h-full overflow-hidden overflow-y-scroll flex-col gap-5'>
            <Input
              name='anime-title'
              placeholder='Title'
              describedBy='anime-title-error'
              border={false}
              style='text-lg sm:text-2xl md:text-4xl text-blue-600'
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
              <img className='rounded self-center w-full px-2' src={poster} alt={`${title} poster`} />
              <FormErrorMessage id='anime-poster-error' errors={state.errors.poster} />
            </div>

            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center lg:grid lg:grid-cols-rates gap-5'>
                {
                  currentRate.map((value, index) => (
                    <div className='flex flex-col gap-5' key={index}>
                      <EditRateValueInput
                        defaultValue={value.value}
                        name='anime-rate-value'
                      />
                      <RateSelect 
                        id={selectId}
                        defaultValue={value.rate || 0} 
                        describedBy='anime-rate-error' 
                        name='anime-rate' 
                        options={Object.values(animeRateOptions)}
                      />
                    </div>
                  ))
                }
              </div>
              <div className='flex gap-1 xs:gap-2 sm:gap-5'>
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
