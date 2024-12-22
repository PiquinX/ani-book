import AnimesHeader from '@/Components/Animes/show/AnimesHeader';
import AnimesController from '@/Controllers/Animes/AnimesController'
import { getAnimes } from '@/lib/actions/animeActions';

export default async function AnimeLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const animes = await getAnimes()

  return (
    <>
        <AnimesHeader />
        <AnimesController animes={animes} />
        {children}
    </>
  )
}
