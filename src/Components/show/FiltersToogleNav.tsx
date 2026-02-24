'use client'

import { SideBar } from "@/Components/ui/LocalSidebar"
import { SideBarContainer, useSidebar } from "@/context/SidebarContext"
import { Filter } from "lucide-react"

const FiltersToogleNav = ({ children }: { children: React.ReactNode }) => {
    return (
        <SideBarContainer>
            <FilterToggleButton />
            <SideBar
                side="right"
                buttonContent={null}
                navClass='w-[320px] bg-[#000000] border-l border-l-3 border-[#333333] shadow-[-10px_0_25px_0_rgba(0,0,255,0.6)] grid grid-rows-[auto_1fr_auto] overflow-x-hidden'
            >
                {children}
            </SideBar>
        </SideBarContainer>
    )
}

function FilterToggleButton() {
    const { setIsOpen } = useSidebar()
    return (
        <button
            onClick={() => setIsOpen(true)}
            className='flex items-center gap-2 cursor-pointer w-max px-3 py-2 hover:bg-noir-blue/20 bg-transparent border border-[#333333] rounded text-gray-500 font-medium hover:text-white hover:border-noir-blue transition-all hover:shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] group'
        >
            <Filter size={20} className="text-gray-500 group-hover:text-noir-blue transition-colors" />
            <span>Filters</span>
        </button>
    )
}

export default FiltersToogleNav
