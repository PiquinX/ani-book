'use server'

import { revalidatePath } from 'next/cache'
import { AnimeRate, AnimeResponseType, AnimeType, AnimeState, AnimeListState, AnimeToShowType } from '../definitions'
import { redirect } from 'next/navigation'
import { CreateAnimeFormSchema } from '../schemas'
import { animeIsFinishedOptions, APIstring } from '../consts'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const getAnimes = async (): Promise<AnimeToShowType[] | null> => {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email

  try {
    const response = await fetch(`${APIstring}/animes/${email}`)

    const animes = await response.json()

    return animes.map((anime: AnimeResponseType) => ({
      id: anime._id,
      title: anime.title,
      poster: anime.poster,
      createdAt: anime.createdAt,
      description: anime.description,
      isFinished: anime.isFinished,
      averageRate: anime.averageRate,
      seasons: anime.rate.length
    }))
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getAnimeByID = async ({ id }: { id: string }): Promise<AnimeType | false> => {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email

  try {
    const response = await fetch(`${APIstring}/animes/${id}/${email}`)

    const anime = await response.json()

    console.log(anime)
    if (!anime._id) return false

    return {
      id: anime._id,
      title: anime.title,
      poster: anime.poster,
      createdAt: anime.createdAt,
      rate: anime.rate.map((value: AnimeRate) => ({
        value: value.value,
        rate: value.rate
      })),
      description: anime.description,
      isFinished: anime.isFinished,
      averageRate: anime.averageRate
    }
  } catch (err) {
    console.log(err)
    return false
  }
}

export async function createAnime(searchParams: string, prevState: AnimeState, formData: FormData) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email

  const rates = formData.getAll('anime-rate')
  const validatedFields = CreateAnimeFormSchema.safeParse({
    title: formData.get('anime-title'),
    poster: formData.get('anime-poster'),
    rate: rates.map((value, index) => ({
      rate: parseInt(value.toString()),
      value: formData.getAll('anime-rate-value')[index]
    })),
    description: formData.get('anime-description'),
    isFinished: formData.get('anime-isfinished') === animeIsFinishedOptions.finished
  })

  console.log(validatedFields)

  if (!validatedFields.success) {
    return {
      errors: {
        external: [],
        ...validatedFields.error.flatten().fieldErrors,
      },
      message: 'Missing Fields. Failed to Create Anime.'
    }
  }

  console.log(validatedFields.data)

  try {
    const response = await fetch(`${APIstring}/animes/${email}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ ...validatedFields.data })
    })
    const newAnime = await response.json()

    console.log(newAnime)

    if (newAnime.errorMessage) {
      return {
        errors: {
          title: [],
          poster: [],
          rate: [],
          description: [],
          isFinished: [],
          external: [newAnime.errorMessage]
        },
        message: newAnime.errorMessage
      }
    }
  } catch (err) {
    console.log(err)
    return {
      errors: {
        title: [],
        poster: [],
        rate: [],
        description: [],
        isFinished: [],
        external: ['Unexpected Error, try again']
      },
      message: 'Unexpected Error, try again'
    }
  }

  revalidatePath('/animes')
  return { success: true }
}

export const updateAnime = async (id: string, searchParams: string, prevState: AnimeState, formData: FormData) => {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email

  const rates = formData.getAll('anime-rate')
  const validatedFields = CreateAnimeFormSchema.safeParse({
    title: formData.get('anime-title'),
    poster: formData.get('anime-poster'),
    rate: rates.map((value, index) => ({
      rate: parseInt(value.toString()),
      value: formData.getAll('anime-rate-value')[index]
    })),
    description: formData.get('anime-description'),
    isFinished: formData.get('anime-isfinished') === animeIsFinishedOptions.finished
  })

  if (!validatedFields.success) {
    return {
      errors: {
        external: [],
        ...validatedFields.error.flatten().fieldErrors,
      },
      message: 'Missing Fields. Failed to Edit Anime.'
    }
  }

  try {
    const response = await fetch(`${APIstring}/animes/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ email, anime: validatedFields.data })
    })
    const updatedAnime = await response.json()

    console.log(updatedAnime)

    if (updatedAnime.errorMessage) {
      return {
        errors: {
          title: [],
          poster: [],
          rate: [],
          description: [],
          isFinished: [],
          external: [updatedAnime.errorMessage]
        },
        message: updatedAnime.errorMessage
      }
    }
  } catch (err) {
    console.log(err)
    return {
      errors: {
        title: [],
        poster: [],
        rate: [],
        description: [],
        isFinished: [],
        external: ['Unexpected Error, try again']
      },
      message: 'Unexpected Error, try again'
    }
  }

  console.log(searchParams)
  revalidatePath(`/animes/edit-anime/${id}`)
  revalidatePath('/animes')
  return { success: true }
}

export async function saveBulkAnimes(newAnimesList: any[]) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email

  if (!email) {
    return { success: false, errorMessage: 'Unauthorized' }
  }

  try {
    const response = await fetch(`${APIstring}/animes/add-list/${email}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(newAnimesList)
    })
    const newAnimes = await response.json()

    if (newAnimes.errorMessage) {
      return { success: false, errorMessage: newAnimes.errorMessage }
    }
  } catch (err) {
    console.log(err)
    return { success: false, errorMessage: 'Unexpected Error, try again' }
  }

  revalidatePath('/animes')
  return { success: true }
}

// export async function addAnimeList(prevState: AnimeListState, formData: FormData) {
//   const session = await getServerSession(authOptions)
//   const email = session?.user?.email

//   const list = (formData.get('anime-list') || '').toString().split('')

//   list.unshift('[')
//   list.push(']')

//   const stringList = list.join('')

//   try {
//     const response = await fetch(`${APIstring}/animes/add-list/${email}`, {
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       method: 'POST',
//       body: stringList
//     })
//     const newAnimes = await response.json()

//     console.log(newAnimes)

//     if (newAnimes.errorMessage) {
//       return {
//         errors: {
//           list: [newAnimes.errorMessage]
//         },
//         message: newAnimes.errorMessage
//       }
//     }
//   } catch (err) {
//     console.log(err)
//     return {
//       errors: {
//         list: ['Unexpected Error, try again']
//       },
//       message: 'Unexpected Error, try again'
//     }
//   }

//   revalidatePath('/animes')
//   redirect('/animes')
// }