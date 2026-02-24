import React from 'react'

import { AnimeSearchResult } from '@/lib/definitions'

interface Props {
    show: boolean
    anime: AnimeSearchResult | null
    onClose: () => void
    onSelect: (title: string, poster: string) => void
}

const TitleSelectionModal: React.FC<Props> = ({ show, anime, onClose, onSelect }) => {
    if (!show || !anime) return null

    const englishTitle = anime.title_english || anime.title
    const japaneseTitle = anime.title_japanese || anime.title

    const poster = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url

    return (
        <div className='w-full bg-[#0004] backdrop-blur-sm h-full fixed top-0 left-0 z-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-md bg-[#000000] border border-[#333333] shadow-[0_0_25px_5px_rgba(0,0,0,0.8)] rounded-lg overflow-hidden animate-appear-fast'>
                <div className='p-6'>
                    <h2 className='text-xl font-bold mb-4 text-white text-center'>Select Title Version</h2>
                    <p className='text-sm text-gray-400 mb-6 text-center'>
                        Which title do you want to use for this entry?
                    </p>

                    <div className='flex flex-col gap-4'>
                        <button
                            type="button"
                            onClick={() => onSelect(englishTitle, poster)}
                            className='w-full py-3 cursor-pointer px-4 bg-transparent hover:bg-noir-blue/20 border border-[#333333] hover:border-noir-blue hover:shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] rounded-md transition-all text-left group'
                        >
                            <span className='block text-xs text-gray-500 uppercase tracking-wider mb-1'>Primary / English / Romaji</span>
                            <span className='block text-lg font-medium text-gray-300 group-hover:text-white'>{englishTitle}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => onSelect(japaneseTitle, poster)}
                            className='w-full py-3 cursor-pointer px-4 bg-transparent hover:bg-noir-blue/20 border border-[#333333] hover:border-noir-blue hover:shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] rounded-md transition-all text-left group'
                        >
                            <span className='block text-xs text-gray-500 uppercase tracking-wider mb-1'>Japanese (Kanji / Kana Only)</span>
                            <span className='block text-lg font-medium text-gray-300 group-hover:text-white'>{japaneseTitle}</span>
                        </button>
                    </div>
                </div>

                <div className='bg-transparent px-6 py-4 flex justify-end border-t border-[#333333]'>
                    <button
                        type="button"
                        onClick={onClose}
                        className='px-4 py-2 cursor-pointer text-sm font-medium text-gray-400 hover:text-white transition-colors'
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TitleSelectionModal
