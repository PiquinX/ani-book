import z from 'zod'

export const CreateBookFormSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a text'
  }),
  poster: z.string({
    required_error: 'Image URL is required'
  }).url({
    message: 'Must provide the URL of an image'
  }),
  rate: z.number({
    required_error: 'Rate is required'
  }).gte(0, {
    message: 'Rate must be greater than 0'
  }).lte(100, {
    message: 'Rate must be lower or equal to 100'
  }),
  description: z.string()
})

export const CreateMovieFormSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a text'
  }),
  poster: z.string({
    required_error: 'Image URL is required'
  }).url({
    message: 'Must provide the URL of an image'
  }),
  rate: z.number({
    required_error: 'Rate is required'
  }).gte(0, {
    message: 'Rate must be greater than 0'
  }).lte(100, {
    message: 'Rate must be lower or equal to 100'
  }),
  description: z.string()
})

export const CreateSerieFormSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a text'
  }),
  poster: z.string({
    required_error: 'Image URL is required'
  }).url({
    message: 'Must provide the URL of an image'
  }),
  rate: z.number({
    required_error: 'Rate is required'
  }).gte(0, {
    message: 'Rate must be greater than 0'
  }).lte(100, {
    message: 'Rate must be lower or equal to 100'
  }),
  description: z.string()
})

export const CreateAnimeFormSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a text'
  }),
  poster: z.string({
    required_error: 'Image URL is required'
  }).url({
    message: 'Must provide the URL of an image'
  }),
  rate: z.array(z.object({
    value: z.string(),
    rate: z.number({
      required_error: 'Rate is required'
    }).gte(0, {
      message: 'Rate must be greater than 0'
    }).lte(100, {
      message: 'Rate must be lower or equal to 100'
    })
  })),
  description: z.string(),
  isFinished: z.boolean()
})
