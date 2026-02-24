import React from 'react'

interface Props {
    averageRate: number
}

export const AnimesTier: React.FC<Props> = ({ averageRate }) => {
    if (averageRate >= 95) return (<span className='red-100 text-[#ff1a1a]'>S+</span>)
    if (averageRate >= 90) return (<span className='red-95 text-[#b91919]'>S</span>)
    if (averageRate >= 85) return (<span className='text-[#7fed09]'>A</span>)
    if (averageRate >= 80) return (<span className='text-[#ff6913]'>B</span>)
    if (averageRate >= 75) return (<span className='text-[#f1ee2a]'>C</span>)
    if (averageRate >= 65) return (<span className='text-[#2ffeb2]'>D</span>)
    if (averageRate >= 55) return (<span className='text-[#8c2dff]'>E</span>)
    if (averageRate >= 45) return (<span className='text-[#000000]'>F</span>)
    if (averageRate < 45) return (<span className='text-[#ff2de6]'>{`DON'T WATCH`}</span>) 
}
