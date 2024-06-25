import AnimesController from '@/Controllers/Animes/AnimesController'

export default function BooksLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <AnimesController />
        {children}
    </>
  )
}
