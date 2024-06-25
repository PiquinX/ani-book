import MoviesController from '@/Controllers/Movies/MoviesController'

export default function BooksLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <MoviesController />
        {children}
    </>
  )
}
