'use server'

import { revalidatePath } from 'next/cache'
import { SerieResponseType, SerieType, SeriesListType, State } from '../definitions'
import { redirect } from 'next/navigation'
import { CreateSerieFormSchema } from '../schemas'
import { getServerSession } from 'next-auth/next'
import { APIstring } from '../consts'

export const getSeries = async (): Promise<SeriesListType | false> => {
  const session = await getServerSession()
  const email = session?.user?.email

  try {
    const response = await fetch(`${APIstring}/series/${email}`)

    const series = await response.json()

    return series.map((serie: SerieResponseType) => ({
      id: serie._id,
      title: serie.title,
      poster: serie.poster,
      createdAt: serie.createdAt,
      rate: serie.rate,
      description: serie.description
    }))
  } catch (err) {
    return false
  }
}

export const getSerieByID = async ({ id }: { id: string }): Promise<SerieType | false> => {
  const session = await getServerSession()
  const email = session?.user?.email

  try {
    const response = await fetch(`${APIstring}/series/${id}/${email}`)

    const serie = await response.json()

    if (!serie._id) return false

    return {
      id: serie._id,
      title: serie.title,
      poster: serie.poster,
      createdAt: serie.createdAt,
      rate: serie.rate,
      description: serie.description
    }
  } catch (err) {
    return false
  }
}

export const createSerie = async (prevState: State, formData : FormData) => {
  const session = await getServerSession()
  const email = session?.user?.email

  const validatedFields = CreateSerieFormSchema.safeParse({
    title: formData.get('serie-title'),
    poster: formData.get('serie-poster'),
    rate: parseInt(formData.get('serie-rate')?.toString() || '1'),
    description: formData.get('serie-description')
  })

  if (!validatedFields.success) {
    return {
      errors: {
        external: [],
        ...validatedFields.error.flatten().fieldErrors,
      }, 
      message: 'Missing Fields. Failed to Create Serie.'
    }
  }

  console.log(validatedFields.data)

  try {
    const response = await fetch(`${APIstring}/series/${email}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ ...validatedFields.data })
    })
    const newSerie = await response.json()

    console.log(newSerie)

    if (newSerie.errorMessage) {
      return {
        errors: {
          title: [],
          poster: [],
          rate: [],
          description: [],
          external: [newSerie.errorMessage]
        },
        message: newSerie.errorMessage
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
        external: ['Unexpected Error, try again']
      },
      message: 'Unexpected Error, try again'
    }
  }

  revalidatePath('/series')
  redirect('/series')
}

export const updateSerie = async (id: string, prevState: State, formData : FormData) => {
  const session = await getServerSession()
  const email = session?.user?.email

  const validatedFields = CreateSerieFormSchema.safeParse({
    title: formData.get('serie-title'),
    poster: formData.get('serie-poster'),
    rate: parseInt(formData.get('serie-rate')?.toString() || '1'),
    description: formData.get('serie-description')
  })

  if (!validatedFields.success) {
    return {
      errors: {
        external: [],
        ...validatedFields.error.flatten().fieldErrors,
      }, 
      message: 'Missing Fields. Failed to Edit Serie.'
    }
  }

  try {
    const response = await fetch(`${APIstring}/series/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ email, serie: validatedFields.data })
    })
    const updatedSerie = await response.json()

    console.log(updatedSerie)

    if (updatedSerie.errorMessage) {
      return {
        errors: {
          title: [],
          poster: [],
          rate: [],
          description: [],
          external: [updatedSerie.errorMessage]
        },
        message: updatedSerie.errorMessage
      }
    }
  } catch (err) {
    return {
      errors: {
        title: [],
        poster: [],
        rate: [],
        description: [],
        external: ['Unexpected Error, try again']
      },
      message: 'Unexpected Error, try again'
    }
  }

  revalidatePath(`/series/edit-serie/${id}`)
  revalidatePath('/series')
  redirect('/series')
}
