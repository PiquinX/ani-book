'use client'

import { SideBar, SideBarContainer } from "toggle-navbar"

const FiltersToogleNav = ({ children }: { children: React.ReactNode }) => {
    return (
        <SideBarContainer>
            <SideBar
                side="left"
                buttonContent={
                    <span className='flex items-center gap-2 my-3 sm:my-6 cursor-pointer w-max'>
                        <i className='text-blue-500 text-xl fa-solid fa-filter'/>Filters
                    </span>
                }
                navClass='bg-white w-[90%] xs:w-72 xl:w-96 relative grid grid-rows-cart'
            >
                {children}
            </SideBar>
        </SideBarContainer>
    )
}

export default FiltersToogleNav