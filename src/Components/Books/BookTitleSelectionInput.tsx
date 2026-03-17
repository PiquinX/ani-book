'use client'

import React, { useState, useEffect, useRef } from 'react'
import Input from '@/Components/forms/Input'
import { useMediaSearch } from '@/hooks/useMediaSearch'
import { BookSearchResult } from '@/lib/definitions'
import { Loader2 } from "lucide-react";


interface BookTitleSelectionInputProps {
    onSelectTitle: (title: string, poster: string, author: string, description: string) => void
    defaultValue?: string
    describedBy?: string
    border?: boolean
    style?: string
}

const BookTitleSelectionInput: React.FC<BookTitleSelectionInputProps> = ({ onSelectTitle, defaultValue = '', describedBy = '', border = true, style = '' }) => {
    const { query, setQuery, results, loading, showDropdown, setShowDropdown } = useMediaSearch(defaultValue, 'book')

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

    const handleSelectResult = (book: BookSearchResult) => {
        setQuery(book.title)
        onSelectTitle(book.title, book.images?.image_url || '', book.author || '', book.description || '')
        setShowDropdown(false)
    }

    return (
        <div className='relative w-full' ref={containerRef}>
            <Input
                name='book-title'
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
                <div className='absolute right-3 top-2 text-sm text-gray-400 z-10'>
                    <Loader2 className="animate-spin w-5 h-5 shrink-0" />
                </div>
            )}

            {showDropdown && results.length > 0 && (
                <div className='absolute z-40 w-full mt-1 bg-[#000000] border border-noir-blue rounded-md shadow-[0_0_25px_5px_rgba(0,0,255,0.6)] overflow-hidden max-h-60 overflow-y-auto'>
                    {(results as BookSearchResult[]).map((book: BookSearchResult) => (
                        <div
                            key={book.id}
                            onClick={() => handleSelectResult(book)}
                            className='flex items-center gap-3 p-2 hover:bg-noir-blue/20 cursor-pointer border-b border-[#333333] last:border-0'
                        >
                            <img
                                src={book.images?.image_url || '/placeholder.png'}
                                alt={book.title}
                                className='w-10 h-14 object-cover rounded'
                            />
                            <div className='flex flex-col'>
                                <span className='text-sm font-medium text-white line-clamp-1'>
                                    {book.title}
                                </span>
                                {book.author && (
                                    <span className='text-xs text-gray-400 line-clamp-1'>
                                        {book.author}
                                    </span>
                                )}
                                <span className='text-[10px] text-gray-500'>
                                    {book.publishedDate ? book.publishedDate.substring(0, 4) : 'Unknown Year'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BookTitleSelectionInput
