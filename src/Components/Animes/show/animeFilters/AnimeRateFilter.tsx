import { animeRateOptions, FILTERPARAMSOPTIONS } from "@/lib/consts"
import { useRouter, useSearchParams } from "next/navigation"
import { ControlledRateSelect } from "./ControlledRateSelect"
import { useId } from "react"

const AnimeRateFilter = () => {
    const id = useId()
    const searchParams = useSearchParams()
    const { replace } = useRouter()

    const rate = searchParams.get(FILTERPARAMSOPTIONS.rate) || 'ANY'

    const handleUpdateRate = (newValue: string) => {
        const params = new URLSearchParams(searchParams)

        if(newValue === 'ANY') params.delete(FILTERPARAMSOPTIONS.rate)
        else params.set(FILTERPARAMSOPTIONS.rate, newValue)
        
        replace(`/animes?${params.toString()}`, {
            scroll: false
        })
    }
    const options = Object.values(animeRateOptions)

    options.unshift('ANY')

    return(
        <div className='flex flex-col gap-4 py-6 pl-4 border-b sm:pl-10'>
            <div>
                <h4 className='pb-2 border-b-2 border-black w-max'>Rate</h4>
            </div>
            <div className='flex gap-2 px-2'>
                <ControlledRateSelect
                    id={id}
                    onOptionChange={handleUpdateRate}
                    rateValue={rate} 
                    name='anime-rate' 
                    options={options}
                />
            </div>
        </div>
    )
}

export default AnimeRateFilter