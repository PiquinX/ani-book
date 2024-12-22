import SearchInput from "@/Components/show/SearchInput"
import Link from "next/link"
import FiltersToogleNav from "../../show/FiltersToogleNav"
import AnimeFilters from "./AnimeFilters"

const AnimesHeader = () => {
    return (
        <div className='flex justify-between items-center mb-5'>
            <Link
            href='/animes/add-anime'
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