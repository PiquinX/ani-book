'use server'

import { revalidatePath } from 'next/cache'
import { MovieResponseType, MovieType, MoviesListType, State } from '../definitions'
import { CreateMovieFormSchema } from '../schemas'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const getMovies = async (): Promise<MoviesListType | false> => {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email

  try {
    const response = await fetch(`http://localhost:777/movies/${email}`)

    const movies = await response.json()

    return movies.map((movie: MovieResponseType) => ({
      id: movie._id,
      title: movie.title,
      poster: movie.poster,
      createdAt: movie.createdAt,
      rate: movie.rate,
      description: movie.description
    }))
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getMovieByID = async ({ id }: { id: string }): Promise<MovieType | false> => {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email

  try {
    const response = await fetch(`http://localhost:777/movies/${id}/${email}`)

    const movie = await response.json()

    if (!movie._id) return false

    return {
      id: movie._id,
      title: movie.title,
      poster: movie.poster,
      createdAt: movie.createdAt,
      rate: movie.rate,
      description: movie.description
    }
  } catch (err) {
    return false
  }
}

export const createMovie = async (prevState: State, formData : FormData) => {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email

  const validatedFields = CreateMovieFormSchema.safeParse({
    title: formData.get('movie-title'),
    poster: formData.get('movie-poster'),
    rate: parseInt(formData.get('movie-rate')),
    description: formData.get('movie-description')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Movie.'
    }
  }

  console.log(validatedFields.data)

  try {
    const response = await fetch(`http://localhost:777/movies/${email}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ ...validatedFields.data })
    })
    const newMovie = await response.json()

    console.log(newMovie)

    if (newMovie.errorMessage) {
      return {
        errors: {
          external: [newMovie.errorMessage]
        },
        message: newMovie.errorMessage
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

  revalidatePath('/movies')
  redirect('/movies')
}

export const updateMovie = async (id: string, prevState: State, formData : FormData) => {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email

  const validatedFields = CreateMovieFormSchema.safeParse({
    title: formData.get('movie-title'),
    poster: formData.get('movie-poster'),
    rate: parseInt(formData.get('movie-rate')),
    description: formData.get('movie-description')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Edit Movie.'
    }
  }

  try {
    const response = await fetch(`http://localhost:777/movies/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ email, movie: validatedFields.data })
    })
    const updatedMovie = await response.json()

    console.log(updatedMovie)

    if (updatedMovie.errorMessage) {
      return {
        errors: {
          external: [updatedMovie.errorMessage]
        },
        message: updatedMovie.errorMessage
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

  revalidatePath(`/movies/edit-movie/${id}`)
  revalidatePath('/movies')
  redirect('/movies')
}
