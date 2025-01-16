'use client'

import { FILTERPARAMSOPTIONS } from "@/lib/consts"
import { useSearchParams, useRouter } from "next/navigation"
import debounce from 'just-debounce-it'
import { useCallback, useState } from "react"

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
  const inputClass = search.length > 0 ? 'w-44 pl-10 pr-7 z-[400] shadow' : 'w-6 pl-6'
  const xmarkClass = search.length > 0 ? 'block' : 'hidden'

  return (
      <div className='relative group text-base'>
        <input
          tabIndex={1}
          id='search'
          onChange={handleChange}
          value={search}
          placeholder='Search'
          className={`${inputClass} outline-0 duration-100 bg-transparent rounded px-3 py-2  font-medium text-black border-2 shadow-white border-blue-500
          focus:w-44 focus:z-[400] focus:pl-10`}
        />

        <label htmlFor='search'>
          <i className='text-blue-500 absolute top-2 left-0 px-[.56rem] py-[0.15rem] text-2xl fa-solid fa-magnifying-glass cursor-pointer' />
        </label>

        <label htmlFor='search' className={`${xmarkClass}`}>
          <i
            onClick={restartSearch}
            className={`text-black absolute top-2 right-0 px-[.53rem] py-1 text-xl fa-solid fa-xmark opacity-60 cursor-pointer`}
          />
        </label>
      </div>
  )
}
export default AnimeSearchInput