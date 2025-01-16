import { ControlledSelect } from "@/Components/forms/ControlledSelect"
import { animeIsFinishedOptionsFilter, FILTERPARAMSOPTIONS } from "@/lib/consts"
import { useRouter, useSearchParams } from "next/navigation"
import { useId } from "react"

const AnimeIsFinishedFilter = () => {
    const id = useId()
    const searchParams = useSearchParams()
    const { replace } = useRouter()

    const isFinished = searchParams.get(FILTERPARAMSOPTIONS.isFinished) || animeIsFinishedOptionsFilter.default

    const handleUpdateIsFinished = (newValue: string) => {
        const params = new URLSearchParams(searchParams)

        params.set(FILTERPARAMSOPTIONS.isFinished, newValue)

        if(newValue == animeIsFinishedOptionsFilter.default) params.delete(FILTERPARAMSOPTIONS.isFinished)
        else params.set(FILTERPARAMSOPTIONS.isFinished, newValue)
        
        replace(`/animes?${params.toString()}`, {
            scroll: false
        })
    }

    return(
        <div className='flex flex-col gap-4 py-6 px-4 border-b sm:px-10'>
            <div>
                <h4 className='pb-2 border-b-2 border-black w-max'>Is Finished</h4>
            </div>
            <div className='flex justify-center'>
                <ControlledSelect
                    id={id}
                    onOptionChange={handleUpdateIsFinished}
                    name="sort-select"
                    width="w-full"
                    value={isFinished}
                    options={Object.values(animeIsFinishedOptionsFilter)}
                />
            </div>
        </div>
    )
}

export default AnimeIsFinishedFilter