import { useState, useEffect } from 'react'

import { AnimeSearchResult, BookSearchResult } from '@/lib/definitions'
import { fetchMediaData } from '@/lib/utils'

export function useMediaSearch(defaultValue: string, type: 'anime' | 'book') {
    const [query, setQuery] = useState(defaultValue)
    const [debouncedQuery, setDebouncedQuery] = useState(defaultValue)
    const [results, setResults] = useState<(AnimeSearchResult | BookSearchResult)[]>([])
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
        const fetchMedia = async () => {
            if (!debouncedQuery || debouncedQuery.length < 3) {
                setResults([])
                return
            }

            setLoading(true)
            try {
                const results = await fetchMediaData(debouncedQuery, 5, type)
                setResults(results)
                setShowDropdown(true)
            } catch (error) {
                console.error(`Failed to fetch ${type}:`, error)
            } finally {
                setLoading(false)
            }
        }

        // Only fetch if query has changed from defaultValue or is actively being typed
        if (debouncedQuery !== defaultValue) {
            fetchMedia()
        }
    }, [debouncedQuery, defaultValue, type])

    return {
        query,
        setQuery,
        results,
        loading,
        showDropdown,
        setShowDropdown
    }
}
