'use client'

import Link from 'next/link'
import React from 'react'
import { RateTier } from '@/Components/Animes/show/RateTier'
import { Date } from '@/Components/show/Date'
import { MediaCardProps } from '@/lib/definitions'
import Image from 'next/image'
import { motion } from 'framer-motion'

export const MediaCard: React.FC<MediaCardProps> = ({ title, poster, rate, createdAt, href, extraInfo }) => {
    return (
        <Link href={href} scroll={false} className="block w-full h-full outline-none">
            <motion.div
                className="w-full h-full p-5 flex flex-col gap-5 bg-[#000000] rounded-sm border border-[#333333] relative text-white"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover="hover"
                variants={{
                    hover: {
                        scale: 1.05,
                        borderColor: '#1111FF',
                        boxShadow: '0 0 25px 5px rgba(17,17,255,0.5)',
                        zIndex: 20,
                    }
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                style={{ transformOrigin: 'center center', backfaceVisibility: 'hidden' }}
            >
                <div className="pointer-events-none contents">
                    <h4 className="truncate h-8 font-bold select-none">{title}</h4>

                    <div className="relative w-full h-[360px] md:h-[400px] overflow-hidden">
                        <Image
                            className="rounded-sm object-cover absolute inset-0 grayscale"
                            src={poster}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            style={{ backfaceVisibility: 'hidden' }}
                        />
                        {/* Colour layer inherits the parent's "hover" variant automatically */}
                        <motion.div
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            variants={{ hover: { opacity: 1 } }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                            <Image
                                className="rounded-sm object-cover"
                                src={poster}
                                alt=""
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                style={{ backfaceVisibility: 'hidden' }}
                                aria-hidden
                            />
                        </motion.div>
                    </div>

                    <div className="flex font-bold justify-between items-center select-none">
                        <p className="font-bold text-lg">
                            <RateTier rate={rate} />
                        </p>
                        {extraInfo && <div className="text-sm">{extraInfo}</div>}
                    </div>

                    <div className="flex w-full justify-between text-sm select-none">
                        Created at: <Date date={createdAt} />
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
