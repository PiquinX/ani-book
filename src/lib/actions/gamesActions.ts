'use server'

import { revalidatePath } from 'next/cache'
import { AnimeRate, AnimeResponseType, AnimeType, AnimesListType, animeState } from '../definitions'
import { redirect } from 'next/navigation'
import { CreateAnimeFormSchema } from '../schemas'
import { animeIsFinishedOptions } from '../consts'

export const getAnimes = async (): Promise<AnimesListType | false> => {
  try {
    const response = await fetch('http://localhost:777/animes')

    const animes = await response.json()

    return animes.map((anime: AnimeResponseType) => ({
      id: anime._id,
      title: anime.title,
      poster: anime.poster,
      createdAt: anime.createdAt,
      rate: anime.rate.map(value => ({
        value: value.value,
        rate: value.rate
      })),
      description: anime.description,
      isFinished: anime.isFinished,
      averageRate: anime.averageRate
    }))
  } catch (err) {
    return false
  }
}

export const getAnimeByID = async ({ id }: { id: string }): Promise<AnimeType | false> => {
  try {
    const response = await fetch(`http://localhost:777/animes/${id}`)

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
    return false
  }
}

export const createAnime = async (prevState: animeState, formData : FormData) => {
  const rates = formData.getAll('anime-rate')
  const validatedFields = CreateAnimeFormSchema.safeParse({
    title: formData.get('anime-title'),
    poster: formData.get('anime-poster'),
    rate: rates.map((value, index) => ({
      rate: parseInt(value),
      value: formData.getAll('anime-rate-value')[index]
    })),
    description: formData.get('anime-description'),
    isFinished: formData.get('anime-isfinished') === animeIsFinishedOptions.finished
  })

  console.log(validatedFields)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Anime.'
    }
  }

  console.log(validatedFields.data)

  try {
    const response = await fetch('http://localhost:777/animes', {
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
          external: [newAnime.errorMessage]
        },
        message: newAnime.errorMessage
      }
    }
  } catch (err) {
    console.log(err)
    return {
      errors: {
        external: ['Unexpected Error, try again']
      },
      message: 'Unexpected Error, try again'
    }
  }

  revalidatePath('/animes')
  redirect('/animes')
}

export const updateAnime = async (id: string, prevState: animeState, formData : FormData) => {
  const rates = formData.getAll('anime-rate')
  const validatedFields = CreateAnimeFormSchema.safeParse({
    title: formData.get('anime-title'),
    poster: formData.get('anime-poster'),
    rate: rates.map((value, index) => ({
      rate: parseInt(value),
      value: formData.getAll('anime-rate-value')[index]
    })),
    description: formData.get('anime-description'),
    isFinished: formData.get('anime-isfinished') === animeIsFinishedOptions.finished
  })

  console.log(validatedFields)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Edit Anime.'
    }
  }

  try {
    const response = await fetch(`http://localhost:777/animes/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ ...validatedFields.data })
    })
    const updatedAnime = await response.json()

    console.log(updatedAnime)

    if (updatedAnime.errorMessage) {
      return {
        errors: {
          external: [updatedAnime.errorMessage]
        },
        message: updatedAnime.errorMessage
      }
    }
  } catch (err) {
    return {
      errors: {
        external: ['Unexpected Error, try again']
      },
      message: 'Unexpected Error, try again'
    }
  }

  revalidatePath(`/animes/edit-anime/${id}`)
  revalidatePath('/animes')
  redirect('/animes')
}

// export const addAnimeRate = async ({ id } : { id: string}): Promise<void> => {
//   try {
//     await fetch(`http://localhost:777/animes/add-rate/${id}`, {
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       method: 'PATCH'
//     })
//   } catch (err) {
//   }

//   revalidatePath(`/animes/edit-anime/${id}`)
//   revalidatePath('/animes')
// }

// export const removeAnimeRate = async ({ id, rate }: { id: string, rate: AnimeRate}) => {
//   try {
//     await fetch(`http://localhost:777/animes/remove-rate/${id}`, {
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       method: 'PATCH',
//       body: JSON.stringify(rate)
//     })
//   } catch (err) {
//   }

//   revalidatePath(`/animes/edit-anime/${id}`)
//   revalidatePath('/animes')
// }
