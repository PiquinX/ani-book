import { getFavorites } from "@/lib/utils/homeFavorites"
import FavoritesPile from "@/Components/ui/FavoritesPile"

export default async function Home() {
  const { favoriteAnimes, favoriteBooks } = await getFavorites()

  return (
    <div className="flex min-h-[75vh] flex-col items-center px-4 justify-center xs:p-12 w-full gap-12 xs:gap-24 mdl:gap-20 lg:gap-32 mdl:flex-row  overflow-hidden">
      <FavoritesPile
        items={favoriteAnimes}
        title="Animes"
        type="animes"
      />
      <div className="hidden mdl:block w-px h-64 bg-zinc-800" />
      <FavoritesPile
        items={favoriteBooks}
        title="Books"
        type="books"
      />
    </div>
  )
}
