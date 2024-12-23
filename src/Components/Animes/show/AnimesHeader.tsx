'use client'

import SearchInput from "@/Components/show/SearchInput"
import Link from "next/link"
import FiltersToogleNav from "../../show/FiltersToogleNav"
import AnimeFilters from "./AnimeFilters"
import { useSearchParams } from "next/navigation"

const AnimesHeader = () => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    return (
        <div className='flex justify-between items-center mb-5'>
            <Link
            href={`animes/add-anime?${params.toString()}`}
            className="bg-blue-500 rounded px-3 py-2 font-medium text-white"
            scroll={false}
            >
                + Add Anime
            </Link>

            <div className="flex items-center gap-4">
                <SearchInput />
                <FiltersToogleNav>
                    <AnimeFilters />
                </FiltersToogleNav>
            </div>
        </div>
    )
}
export default AnimesHeader