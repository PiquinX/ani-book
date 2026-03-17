'use client'

import { useRouter } from "next/navigation"
import { CloseButton } from "@/Components/ui/LocalSidebar"
import AnimeSeasonsFilter from "./animeFilters/AnimeSeasonsFilter"
import AnimeRateFilter from "./animeFilters/AnimeRateFilter"
import AnimeIsFinishedFilter from "./animeFilters/AnimeIsFinishedFilter"
import AnimeSort from "./animeFilters/AnimeSort"
import { X } from "lucide-react";


const AnimeFilters = () => {
    const { replace } = useRouter()

    const handleClearFilters = () => {
        replace('/animes', {
            scroll: false
        })
    }

    return (
        <>
            <header className='flex items-center justify-between w-full p-4 border-b border-[#333333]'>
                <h3 className='font-semibold'>FILTERS</h3>
                <CloseButton className='w-max'>
                    <X className="text-gray-500 cursor-pointer w-7 h-7 duration-150 hover:rotate-90 hover:text-red-500 shrink-0" />
                </CloseButton>
            </header>
            <main className='h-full overflow-y-scroll bar'>
                {/* <AnimeSeasonsFilter /> */}
                <AnimeRateFilter />
                <AnimeIsFinishedFilter />
                <AnimeSort />
            </main>
            <footer className='flex items-center justify-center py-4 border-t border-[#333333]'>
                <button
                    className='px-5 py-2 text-gray-500 cursor-pointer transition-all duration-150 border border-[#333333] rounded-lg hover:text-white hover:border-noir-blue hover:bg-noir-blue/20 hover:shadow-[0_0_25px_5px_var(--noir-blue)] bg-transparent'
                    onClick={handleClearFilters}
                >
                    Clear Filters
                </button>
            </footer>
        </>
    )
}

export default AnimeFilters
