import { FILTERPARAMSOPTIONS } from "@/lib/consts"
import { useRouter, useSearchParams } from "next/navigation"

const AnimeSeasonsFilter = () => {
    const searchParams = useSearchParams()
    const { replace } = useRouter()

    const amountOfSeasons = {
        min: parseInt(searchParams.get(FILTERPARAMSOPTIONS.minSeasons) || '0'),
        max: parseInt(searchParams.get(FILTERPARAMSOPTIONS.maxSeasons) || '100')
    }

    const handleUpdateMinAmountOfSeasons = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value

        if(parseInt(newValue) > amountOfSeasons.max) return

        const params = new URLSearchParams(searchParams)

        params.set(FILTERPARAMSOPTIONS.minSeasons, newValue)
        
        replace(`/animes?${params.toString()}`, {
            scroll: false
        })
    }

    const handleUpdateMaxAmountOfSeasons = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value

        if(parseInt(newValue) < amountOfSeasons.min) return
        
        const params = new URLSearchParams(searchParams)

        params.set(FILTERPARAMSOPTIONS.maxSeasons, newValue)
        
        replace(`/animes?${params.toString()}`, {
            scroll: false
        })
    }

    return(
        <div className='flex flex-col gap-4 py-6 pl-4 border-b sm:pl-10'>
            <div>
                <h4 className='pb-2 border-b-2 border-black w-max'>Amount of seasons</h4>
            </div>
            <div className=''>
                <div className='flex px-2'>
                    <p className='w-[50%] xs:w-[130px] text-center'>min: {amountOfSeasons.min}</p>
                    <span> - </span>
                    <p className='w-[50%] xs:w-[130px] text-center'>max: {amountOfSeasons.max}</p>
                </div>

                <div className='flex gap-2 px-2'>
                    <input 
                        onChange={handleUpdateMinAmountOfSeasons}
                        className='w-[50%] xs:w-[130px]'
                        type='range' 
                        min={0} max={100} 
                        value={amountOfSeasons.min} 
                    />
                    <input 
                        onChange={handleUpdateMaxAmountOfSeasons}
                        className='w-[50%] xs:w-[130px]'
                        type='range' 
                        min={0} max={100} 
                        value={amountOfSeasons.max} 
                    />
                </div>
            </div>
        </div>
    )
}

export default AnimeSeasonsFilter
