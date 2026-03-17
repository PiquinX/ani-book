'use client'

import React, { useState, useEffect, useRef } from 'react'
import Input from '@/Components/forms/Input'
import TitleSelectionModal from './TitleSelectionModal'
import { useMediaSearch } from '@/hooks/useMediaSearch'
import { AnimeSearchResult } from '@/lib/definitions'
import { Loader2 } from "lucide-react";


interface AnimeTitleSelectionInputProps {
    onSelectTitle: (title: string, poster: string) => void
    defaultValue?: string
    describedBy?: string
    border?: boolean
    style?: string
}

const AnimeTitleSelectionInput: React.FC<AnimeTitleSelectionInputProps> = ({ onSelectTitle, defaultValue = '', describedBy = '', border = true, style = '' }) => {
    const { query, setQuery, results, loading, showDropdown, setShowDropdown } = useMediaSearch(defaultValue, 'anime')

    const [selectedAnime, setSelectedAnime] = useState<AnimeSearchResult | null>(null)
    const [showModal, setShowModal] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)


    // Click outside listener to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSelectResult = (anime: AnimeSearchResult) => {
        setSelectedAnime(anime)
        setShowModal(true)
        setShowDropdown(false)
    }

    const handleModalSelect = (title: string, poster: string) => {
        setQuery(title)
        onSelectTitle(title, poster)
        setShowModal(false)
    }

    return (
        <div className='relative w-full' ref={containerRef}>
            <Input
                name='anime-title'
                placeholder='Title'
                describedBy={describedBy}
                border={border}
                style={style}
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                onClick={() => {
                    if (results.length > 0) setShowDropdown(true)
                }}
                autoComplete='off'
            />

            {loading && (
                <div className='absolute right-3 top-2 text-sm text-gray-400'>
                    <Loader2 className="animate-spin w-5 h-5 shrink-0" />
                </div>
            )}

            {showDropdown && results.length > 0 && (
                <div className='absolute z-40 w-full mt-1 bg-[#000000] border border-noir-blue rounded-md shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] overflow-hidden max-h-60 overflow-y-auto'>
                    {(results as AnimeSearchResult[]).map((anime: AnimeSearchResult) => (
                        <div
                            key={anime.mal_id}
                            onClick={() => handleSelectResult(anime)}
                            className='flex items-center gap-3 p-2 hover:bg-noir-blue/20 cursor-pointer border-b border-gray-800 last:border-0'
                        >
                            <img
                                src={anime.images?.jpg?.small_image_url || anime.images?.jpg?.image_url}
                                alt={anime.title}
                                className='w-10 h-14 object-cover rounded'
                            />
                            <div className='flex flex-col'>
                                <span className='text-sm font-medium text-white line-clamp-1'>
                                    {anime.title_english || anime.title}
                                </span>
                                {anime.title_japanese && (
                                    <span className='text-xs text-gray-400 line-clamp-1'>
                                        {anime.title_japanese}
                                    </span>
                                )}
                                <span className='text-[10px] text-gray-500'>
                                    {anime.year ? anime.year : 'Unknown Year'} • {anime.type}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <TitleSelectionModal
                show={showModal}
                anime={selectedAnime}
                onClose={() => setShowModal(false)}
                onSelect={handleModalSelect}
            />
        </div>
    )
}

export default AnimeTitleSelectionInput
