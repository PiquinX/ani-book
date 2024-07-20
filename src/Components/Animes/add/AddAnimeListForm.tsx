import { useFormState } from 'react-dom'
import FormErrorMessage from '@/Components/forms/FormErrorMessage'
import { addAnimeList } from '@/lib/actions/animeActions'
import TextArea from '@/Components/forms/TextArea'

export default function AddAnimeListForm () {
  const initialState = {
    message: null,
    errors: {
      list: []
    }
  }
  const [state, dispatch] = useFormState(addAnimeList, initialState)

  return (
    <div className='w-[80%] h-full flex flex-col pb-4'>
        <h3 className='text-center text-2xl font-semibold text-blue-600'>Add animes to the list.</h3>
        <form className='flex h-full overflow-hidden flex-col gap-5' action={dispatch}>
          <div className='flex px-10 py-5 bar h-full overflow-hidden overflow-y-scroll flex-col gap-5'>
            <TextArea
              name='anime-list'
              placeholder='Anime list JSON'
              describedBy='anime-list-error'
            />
            <FormErrorMessage id='anime-list-error' errors={state.errors.list} />
          </div>

          <div className='bg-white w-full px-10'>
            <button className='hover:bg-blue-600 hover:text-white duration-200 w-full py-2 border-2 font-medium rounded text-blue-600 border-blue-600'>
              ADD ANIME LIST
            </button>
          </div>

            {/* <SuccesModal show={succes} message='animes Succesfully Added.' /> */}
        </form>
    </div>
  )
}