'use client'

import { useRouter } from "next/navigation"
import { CloseButton } from "toggle-navbar"
import AnimeSeasonsFilter from "./animeFilters/AnimeSeasonsFilter"
import AnimeRateFilter from "./animeFilters/AnimeRateFilter"
import AnimeIsFinishedFilter from "./animeFilters/AnimeIsFinishedFilter"
import AnimeSort from "./animeFilters/AnimeSort"

const AnimeFilters = () => {
    const { replace } = useRouter()

    const handleClearFilters = () => {
        replace('/animes', {
            scroll: false
        })
    }

    return (
        <>
            <header className='flex items-center justify-around w-full h-full pl-4 pr-5 border-b sm:justify-between sm:pl-10'>
                <h3 className=''>FILTERS</h3>
                <CloseButton className='w-max'>
                    <i className='text-gray-500 cursor-pointer text-4xl fa-solid fa-xmark duration-150 hover:rotate-90 hover:text-red-500'/>
                </CloseButton>
            </header>
            <main className='h-full overflow-y-scroll bar'>
                {/* <AnimeSeasonsFilter /> */}
                <AnimeRateFilter />
                <AnimeIsFinishedFilter />
                <AnimeSort />
            </main>
            <footer className='flex items-center justify-center py-1 border-t'>
                <button 
                    className='px-5 py-2 text-blue-700 duration-75 border-2 border-blue-700 rounded-lg hover:text-white hover:bg-blue-700'
                    onClick={handleClearFilters}
                >
                    Clear Filters
                </button>
            </footer>
        </>
    )
}

export default AnimeFilters