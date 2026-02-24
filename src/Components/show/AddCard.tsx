import Link from 'next/link'
import React from 'react'
import { AddCardProps } from '@/lib/definitions'

const AddCard: React.FC<AddCardProps> = ({ link }) => {
  return (
    <Link
      href={link}
      scroll={false}
      className="flex items-center justify-center rounded-sm hover:scale-105 transition-all duration-300 border border-[#333333] hover:border-noir-blue hover:shadow-[0_0_25px_5px_var(--noir-blue)] w-full min-h-[500px] animate-appear-fast py-28 "
    >
      <i className="fa-solid fa-plus text-8xl text-gray-500" />
    </Link>
  )
}

export default AddCard
