import Link from 'next/link'
import React from 'react'
import { AddCardProps } from '@/lib/definitions'

const AddCard: React.FC<AddCardProps> = ({ link }) => {
  return (
    <Link
      href={link}
      scroll={false}
      className="justify-self-center flex items-center justify-center rounded hover:scale-105 duration-150 border-4 w-72 min-h-[500px] animate-appear-fast py-28 "
    >
      <i className="fa-solid fa-plus text-8xl text-gray-500" />
    </Link>
  )
}

export default AddCard
