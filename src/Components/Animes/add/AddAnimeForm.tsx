import Input from '@/Components/forms/Input'
import { useFormState } from 'react-dom'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import { createAnime } from '@/lib/actions/animeActions'
import TextArea from '@/Components/forms/TextArea'
import { Select } from '@/Components/forms/Select'
import { animeIsFinishedOptions, animeRateOptions } from '@/lib/consts'
import { useState, useId, useEffect } from 'react'
import { AnimeRate } from '@/lib/definitions'
import EditRateValueInput from '../edit/EditRateValueInput'
import { RateSelect } from '../edit/RateSelect'
import AnimeSearchInput from '../AnimeTitleSelectionInput'
import SubmitButton from '@/Components/forms/SubmitButton'

export default function AddAnimeForm({ searchParams, onSuccess }: { searchParams: URLSearchParams, onSuccess?: () => void }) {
  const params = searchParams ? searchParams.toString() : ''
  const createAnimeWithParams = createAnime.bind(null, params)
  const initialState = {
    message: null,
    errors: {
      title: [],
      poster: [],
      rate: [],
      description: [],
      isFinished: [],
      external: []
    }
  }
  const [state, dispatch] = useFormState(createAnimeWithParams, initialState);

  useEffect(() => {
    if (state?.success && onSuccess) {
      onSuccess();
    }
  }, [state, onSuccess]);

  const [currentRate, setCurrentRate] = useState<AnimeRate[]>([{
    value: 'Season 1',
    rate: null
  }])
  const [posterUrl, setPosterUrl] = useState('')

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
    <div className='w-full sm:w-[80%] flex flex-col pb-4'>
      <h3 className='text-center text-2xl font-semibold text-white animate-appear-fast'>Add a new anime to the list.</h3>
      <form className='flex flex-col gap-5 animate-appear-fast' action={dispatch}>
        <div className='flex px-4 xs:px-6 sm:px-10 py-5 bar flex-col gap-5'>
          <AnimeSearchInput
            describedBy='anime-title-error'
            onSelectTitle={(title, poster) => {
              setPosterUrl(poster)
            }}
          />
          <FormErrorMessage id='anime-title-error' errors={state?.errors?.title} />

          <Input
            name='anime-poster'
            placeholder='Image URL'
            describedBy='anime-poster-error'
            value={posterUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPosterUrl(e.target.value)}
          />
          <FormErrorMessage id='anime-poster-error' errors={state?.errors?.poster} />
          {
            posterUrl && (
              <div className='flex justify-center w-full my-1'>
                <img src={posterUrl} alt="Poster previsualization" className="h-[200px] w-[140px] sm:h-[240px] sm:w-[160px] object-cover rounded-md shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-[#333333]" />
              </div>
            )
          }

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
                      id={selectId + '-' + index}
                      defaultValue={value.rate || 1}
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
            <FormErrorMessage id='anime-rate-error' errors={state?.errors?.rate} />
          </div>

          <div className='flex flex-col items-center'>
            <Select
              options={Object.values(animeIsFinishedOptions)}
              describedBy='anime-isfinished-error'
              name='anime-isfinished'
              defaultValue={animeIsFinishedOptions.notFinished}
            />
            <FormErrorMessage id='anime-isfinished-error' errors={state?.errors?.isFinished} />
          </div>

          <TextArea
            name='anime-description'
            placeholder='Description'
            describedBy='anime-description-error'
          />
          <FormErrorMessage id='anime-description-error' errors={state?.errors?.description} />

          <FormErrorMessage id='anime-external-error' errors={state?.errors?.external} />
        </div>

        <div className='bg-[#000000] w-full px-10 pt-4 pb-8'>
          <SubmitButton>
            ADD ANIME
          </SubmitButton>
        </div>
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
