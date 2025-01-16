import { ControlledSelect } from "@/Components/forms/ControlledSelect"
import { FILTERPARAMSOPTIONS, sortOptions } from "@/lib/consts"
import { useRouter, useSearchParams } from "next/navigation"
import { useId } from "react"

const AnimeSort = () => {
    const id = useId()
    const searchParams = useSearchParams()
    const { replace } = useRouter()

    const sortBy = searchParams.get(FILTERPARAMSOPTIONS.sort) || sortOptions.dateOldToNew

    const handleUpdateSortBy = (newValue: string) => {
        const params = new URLSearchParams(searchParams)

        params.set(FILTERPARAMSOPTIONS.sort, newValue)
        
        replace(`/animes?${params.toString()}`, {
            scroll: false
        })
    }

    return(
        <div className='flex flex-col gap-4 py-6 px-4 border-b sm:px-10'>
            <div>
                <h4 className='pb-2 border-b-2 border-black w-max'>Sort</h4>
            </div>
            <div className='flex justify-center'>
                <ControlledSelect
                    id={id}
                    onOptionChange={handleUpdateSortBy}
                    name="sort-select"
                    width="w-full"
                    value={sortBy}
                    options={Object.values(sortOptions)}
                />
            </div>
        </div>
    )
}

export default AnimeSort