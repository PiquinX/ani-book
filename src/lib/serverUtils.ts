'use server'

import { redirect } from 'next/navigation'

export const handleCloseModal = (
    { isRedirectable, newPath }: { isRedirectable: boolean, newPath: string }
  ) => {
    if (isRedirectable) redirect(newPath)
}