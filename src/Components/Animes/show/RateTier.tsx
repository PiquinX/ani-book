import { getRateColor, getRateTier } from '@/lib/utils'
import React from 'react'

interface Props {
    rate: number
    type?: 'anime' | 'book' | 'movie' | 'serie'
}

export const RateTier: React.FC<Props> = ({ rate, type }) => {
    return (
        <span className={getRateColor(rate)}>
            {getRateTier(rate, type)}
        </span>
    )
}
