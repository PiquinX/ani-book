import Link from 'next/link'
import { getAnimes } from '@/lib/actions/animeActions'
import { AnimesList } from '@/Components/Animes/show/AnimesList'
import { getSession } from 'next-auth/react'

const AnimesController = async () => {
  const animes = await getAnimes()

  if (animes) {
    return (
    <>
      <div className='flex items-end mb-5'>
        <Link
          href='/animes/add-anime'
          className="bg-blue-500 rounded px-3 py-2 font-medium text-white"
          scroll={false}
        >
          + Add Anime
        </Link>
      </div>
      <AnimesList animes={animes} />
    </>
    )
  } else return <div>Something happened...</div>
}

export default AnimesController
