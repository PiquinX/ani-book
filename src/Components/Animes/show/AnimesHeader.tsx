'use client'

import AnimeSearchInput from "@/Components/Animes/show/AnimeSearchInput"
import Link from "next/link"
import { Plus } from "lucide-react"
import FiltersToogleNav from "../../show/FiltersToogleNav"
import AnimeFilters from "./AnimeFilters"
import { useSearchParams } from "next/navigation"

const AnimesHeader = () => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    return (
        <div className='flex justify-between items-center text-sm sm:text-base mb-5'>
            <Link
                href={`animes/add-anime?${params.toString()}`}
                className="bg-transparent hover:bg-noir-blue/20 border border-[#333333] rounded px-3 py-2 font-medium text-gray-500 hover:text-white hover:border-noir-blue hover:shadow-[0_0_25px_5px_var(--noir-blue)] transition-all hidden md:block"
                scroll={false}
            >
                + Add Anime
            </Link>
            <Link
                href={`animes/add-anime?${params.toString()}`}
                className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-black border border-noir-blue rounded-full flex items-center justify-center text-white shadow-[0_0_15px_2px_var(--noir-blue)] hover:shadow-[0_0_25px_5px_var(--noir-blue)] transition-all z-50 animate-appear-fast"
                scroll={false}
            >
                <Plus className="w-6 h-6" />
            </Link>

            <div className="flex justify-end">
                <AnimeSearchInput />
                <FiltersToogleNav>
                    <AnimeFilters />
                </FiltersToogleNav>
            </div>
        </div>
    )
}
export default AnimesHeader
