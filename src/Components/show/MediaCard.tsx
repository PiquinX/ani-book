import Link from 'next/link'
import React from 'react'
import { RateTier } from '@/Components/Animes/show/RateTier'
import { Date } from '@/Components/show/Date'
import { MediaCardProps } from '@/lib/definitions'

export const MediaCard: React.FC<MediaCardProps> = ({ title, poster, rate, createdAt, href, extraInfo }) => {
    return (
        <Link
            href={href}
            scroll={false}
            className="group hover:scale-105 animate-appear-fast w-full p-5 flex flex-col gap-5 bg-[#000000] rounded-sm overflow-hidden border border-[#333333] hover:border-noir-blue hover:shadow-[0_0_25px_5px_var(--noir-blue)] transition-all duration-300 relative text-white"
        >
            <h4 className='truncate h-8 font-bold z-10'>{title}</h4>
            <img
                className="w-full h-[360px] md:h-[400px] rounded-sm grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-300 object-cover z-10 bg-gray-900"
                src={poster}
                alt={title} />
            <div className='flex font-bold justify-between items-center z-10'>
                <p className='font-bold text-lg'>
                    <RateTier rate={rate} type={href.includes('book') ? 'book' : 'anime'} />
                </p>
                {extraInfo && (
                    <div className='text-sm'>
                        {extraInfo}
                    </div>
                )}
            </div>
            <div className='flex w-full justify-between z-10 text-sm'>
                Created at: <Date date={createdAt} />
            </div>
        </Link>
    )
}
