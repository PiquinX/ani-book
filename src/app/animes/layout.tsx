import { Suspense } from 'react';
import AnimesHeader from '@/Components/Animes/show/AnimesHeader';
import AnimesController from '@/Controllers/Animes/AnimesController'
import { getAnimes } from '@/lib/actions/animeActions';
import LoadingItemsSkeleton from '@/Components/skeletons';

export default function AnimeLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<LoadingItemsSkeleton />}>
        <AnimesHeader />
        <AnimesContent />
      </Suspense>
      {children}
    </>
  )
}

async function AnimesContent() {
  const animes = await getAnimes()
  return <AnimesController animes={animes} />
}
