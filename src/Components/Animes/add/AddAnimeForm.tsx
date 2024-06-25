import Input from '@/Components/forms/Input'
import { useFormState } from 'react-dom'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import { createAnime } from '@/lib/actions/animeActions'
import TextArea from '@/Components/forms/TextArea'
import { Select } from '@/Components/forms/Select'
import { animeIsFinishedOptions } from '@/lib/consts'
import { useState } from 'react'
import { AnimeRate } from '@/lib/definitions'
import EditRateValueInput from '../edit/EditRateValueInput'

export default function AddAnimeForm () {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createAnime, initialState)

  const [currentRate, setCurrentRate] = useState<AnimeRate[]>([{
    value: 'Season 1',
    rate: null
  }])

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
        <h3 className='text-center text-2xl font-semibold text-blue-600'>Add a new anime to the list.</h3>
        <form className='flex h-full overflow-hidden flex-col gap-5' action={dispatch}>
          <div className='flex px-10 py-5 bar h-full overflow-hidden overflow-y-scroll flex-col gap-5'>
            <Input
              name='anime-title'
              placeholder='Title'
              describedBy='anime-title-error'
            />
            <FormErrorMessage id='anime-title-error' errors={state.errors.title} />

            <Input
              name='anime-poster'
              placeholder='Image URL'
              describedBy='anime-poster-error'
            />
            <FormErrorMessage id='anime-poster-error' errors={state.errors.poster} />

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
                describedBy='anime-isfinished-error'
                name='anime-isfinished'
                defaultValue={animeIsFinishedOptions.finished}
              />
              <FormErrorMessage id='anime-isfinished-error' errors={state.errors.isFinished} />
            </div>

            <TextArea
              name='anime-description'
              placeholder='Description'
              describedBy='anime-description-error'
            />
            <FormErrorMessage id='anime-description-error' errors={state.errors.rate} />

            <FormErrorMessage id='anime-external-error' errors={state.errors.external} />
          </div>

            <div className='bg-white w-full px-10'>
              <button className='hover:bg-blue-600 hover:text-white duration-200 w-full py-2 border-2 font-medium rounded text-blue-600 border-blue-600'>
                ADD ANIME
              </button>
            </div>

            {/* <SuccesModal show={succes} message='animes Succesfully Added.' /> */}
        </form>
    </div>
  )
}

// const [succes, setSucces] = useState<boolean>(false)
// const { formData, handleChangePoster, handleChangeTitle, handleResetForm, error, setError, isInvalid } = useanimeForm()

// const handleSubmit = async () => {
//   if (isInvalid) return
//   const result = await createanime(formData)

//   if (result) setError(result)
//   else {
//     setSucces(true)
//     setTimeout(() => {
//       setSucces(false)
//       handleCloseModal()
//       handleResetForm()
//       // IDK if revalidateTag/revalidatePath is the correct way to do it
//       revalidateTag('animes')
//     }, 1000)
//   }
// }
