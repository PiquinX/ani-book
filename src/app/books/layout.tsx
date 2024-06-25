import BooksController from '@/Controllers/Books/BooksController'

export default function BooksLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <BooksController />
        {children}
    </>
  )
}
