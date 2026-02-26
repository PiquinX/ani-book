import { Suspense } from 'react';
import BooksController from '@/Controllers/Books/BooksController'
import LoadingItemsSkeleton from '@/Components/skeletons';

export default function BooksLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<LoadingItemsSkeleton />}>
        <BooksController />
      </Suspense>
      {children}
    </>
  )
}
