import { getAnimes } from "../actions/animeActions"
import { getBooks } from "../actions/bookActions"

export async function getFavorites() {
    const [animes, books] = await Promise.all([
        getAnimes(),
        getBooks()
    ])

    const getTop4Favorites = (items: any[], getRate: (item: any) => number) => {
        if (!items || items.length === 0) return []

        // Group by rate
        const grouped = items.reduce((acc: any, item: any) => {
            const rate = getRate(item)
            if (!acc[rate]) acc[rate] = []
            acc[rate].push(item)
            return acc
        }, {})

        // Sort rates descending
        const sortedRates = Object.keys(grouped).map(Number).sort((a, b) => b - a)

        const selected: any[] = []
        for (const rate of sortedRates) {
            const group = grouped[rate]
            // Shuffle the group to randomize if there are ties
            const shuffled = [...group].sort(() => 0.5 - Math.random())

            const needed = 4 - selected.length
            selected.push(...shuffled.slice(0, needed))

            if (selected.length === 4) break
        }

        return selected
    }

    return {
        favoriteAnimes: getTop4Favorites(animes || [], (item) => item.averageRate),
        favoriteBooks: getTop4Favorites(books || [], (item) => item.rate)
    }
}
