import SeriesController from '@/Controllers/Series/SeriesController'

export default function BooksLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <SeriesController />
        {children}
    </>
  )
}
