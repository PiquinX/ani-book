'use client'

import Link from 'next/link'
import React from 'react'
import { AddCardProps } from '@/lib/definitions'
import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'

const AddCard: React.FC<AddCardProps> = ({ link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, borderColor: 'var(--noir-blue)', boxShadow: '0 0 25px 5px var(--noir-blue)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 35 }}
      style={{ transformOrigin: 'center center' }}
      className="w-full min-h-[500px] rounded-sm border border-[#333333]"
    >
      <Link
        href={link}
        scroll={false}
        className="flex items-center justify-center w-full h-full py-28"
      >
        <Plus className="w-24 h-24 text-gray-500 shrink-0" />
      </Link>
    </motion.div>
  )
}

export default AddCard
