import { getRateColor, getRateTier } from '@/lib/utils'
import React from 'react'

interface Props {
    rate: number
}

export const RateTier: React.FC<Props> = ({ rate }) => {
    return (
        <span className={getRateColor(rate)}>
            {getRateTier(rate)}
        </span>
    )
}
