'use client'

import { FILTERPARAMSOPTIONS } from "@/lib/consts"
import { useSearchParams, useRouter } from "next/navigation"
import debounce from 'just-debounce-it'
import { useCallback, useState } from "react"
import { Search, X } from "lucide-react";


const AnimeSearchInput = () => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const [search, setSearch] = useState(searchParams.get(FILTERPARAMSOPTIONS.search) || '')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateURL = useCallback(
    debounce((search: string) => {
      const params = new URLSearchParams(searchParams)

      if (search.length > 0) {
        // Changing the search
        params.set(FILTERPARAMSOPTIONS.search, search)
      } else {
        params.delete(FILTERPARAMSOPTIONS.search)
      }

      replace(`/animes?${params.toString()}`, {
        scroll: false
      })
    }, 350)
    , [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newSearch = event.target.value

    setSearch(newSearch)
    debouncedUpdateURL(newSearch)
  }

  const restartSearch = (): void => {
    const params = new URLSearchParams(searchParams)

    params.delete(FILTERPARAMSOPTIONS.search)

    setSearch('')
    replace(`/animes?${params.toString()}`)
  }


  // We apply styles depending on the length of the search.
  const inputClass = search.length > 0 ? 'w-44 pl-10 pr-7 z-400 shadow' : 'w-6 pl-6'
  const xmarkClass = search.length > 0 ? 'block' : 'hidden'

  return (
    <div className='relative group text-base'>
      <input
        tabIndex={1}
        id='search'
        onChange={handleChange}
        value={search}
        placeholder='Search'
        className={`peer ${inputClass} outline-0 duration-100 bg-[#000000] rounded px-3 py-2 font-medium text-white border-2 border-[#333333] transition-all
          focus:w-44 focus:bg-noir-blue/20 focus:z-400 focus:pl-10 focus:border-noir-blue focus:shadow-[0_0_25px_5px_rgba(0,0,255,0.6)]`}
      />

      <label htmlFor='search' className='text-gray-500 peer-focus:text-noir-blue transition-colors absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none'>
        <Search className="w-6 h-6 shrink-0" />
      </label>

      <label htmlFor='search' className={`${xmarkClass} absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center`}>
        <X
          onClick={restartSearch}
          className="w-5 h-5 text-white opacity-60 cursor-pointer transition-colors hover:text-red-500 shrink-0"
        />
      </label>
    </div>
  )
}
export default AnimeSearchInput
