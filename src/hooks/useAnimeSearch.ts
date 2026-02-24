import { useState, useEffect } from 'react'

import { AnimeSearchResult } from '@/lib/definitions'
import { fetchJikanAnime } from '@/lib/utils'


export function useAnimeSearch(defaultValue: string) {
    const [query, setQuery] = useState(defaultValue)
    const [debouncedQuery, setDebouncedQuery] = useState(defaultValue)
    const [results, setResults] = useState<AnimeSearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    // Debounce logic
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [query])

    // Fetch logic
    useEffect(() => {
        const fetchAnime = async () => {
            if (!debouncedQuery || debouncedQuery.length < 3) {
                setResults([])
                return
            }

            setLoading(true)
            try {
                const results = await fetchJikanAnime(debouncedQuery, 5)
                setResults(results)
                setShowDropdown(true)
            } catch (error) {
                console.error('Failed to fetch anime:', error)
            } finally {
                setLoading(false)
            }
        }

        // Only fetch if query has changed from defaultValue or is actively being typed
        if (debouncedQuery !== defaultValue) {
            fetchAnime()
        }
    }, [debouncedQuery, defaultValue])

    return {
        query,
        setQuery,
        results,
        loading,
        showDropdown,
        setShowDropdown
    }
}
