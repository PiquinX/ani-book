'use server'

import { revalidatePath } from 'next/cache'
import { BookResponseType, BookType, BooksListType, State } from '../definitions'
import { CreateBookFormSchema } from '../schemas'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { APIstring } from '../consts'

export const getBooks = async (): Promise<BooksListType | false> => {
  const session = await getServerSession()
  const email = session?.user?.email

  try {
    const response = await fetch(`${APIstring}/books/${email}`)

    const books = await response.json()

    return books.map((book: BookResponseType) => ({
      id: book._id,
      title: book.title,
      poster: book.poster,
      createdAt: book.createdAt,
      rate: book.rate,
      description: book.description
    }))
  } catch (err) {
    return false
  }
}

export const getBookByID = async ({ id }: { id: string }): Promise<BookType | false> => {
  const session = await getServerSession()
  const email = session?.user?.email

  try {
    const response = await fetch(`${APIstring}/books/${id}/${email}`)

    const book = await response.json()

    if (!book._id) return false

    return {
      id: book._id,
      title: book.title,
      poster: book.poster,
      createdAt: book.createdAt,
      rate: book.rate,
      description: book.description
    }
  } catch (err) {
    return false
  }
}

export const createBook = async (prevState: State, formData : FormData) => {
  const session = await getServerSession()
  const email = session?.user?.email

  const validatedFields = CreateBookFormSchema.safeParse({
    title: formData.get('book-title'),
    poster: formData.get('book-poster'),
    rate: parseInt(formData.get('book-rate')),
    description: formData.get('book-description')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Book.'
    }
  }

  console.log(validatedFields.data)

  try {
    const response = await fetch(`${APIstring}/books/${email}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ ...validatedFields.data })
    })
    const newBook = await response.json()

    console.log(newBook)

    if (newBook.errorMessage) {
      return {
        errors: {
          external: [newBook.errorMessage]
        },
        message: newBook.errorMessage
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

  revalidatePath('/books')
  redirect('/books')
}

export const updateBook = async (id: string, prevState: State, formData : FormData) => {
  const session = await getServerSession()
  const email = session?.user?.email

  const validatedFields = CreateBookFormSchema.safeParse({
    title: formData.get('book-title'),
    poster: formData.get('book-poster'),
    rate: parseInt(formData.get('book-rate')),
    description: formData.get('book-description')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Edit Book.'
    }
  }

  console.log(validatedFields.data)

  try {
    const response = await fetch(`${APIstring}/books/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ email, book: validatedFields.data })
    })
    const updatedBook = await response.json()

    console.log(updatedBook)

    if (updatedBook.errorMessage) {
      return {
        errors: {
          external: [updatedBook.errorMessage]
        },
        message: updatedBook.errorMessage
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

  revalidatePath(`/books/edit-book/${id}`)
  revalidatePath('/books')
  redirect('/books')
}
