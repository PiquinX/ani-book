import { useEffect, useId } from 'react'
import { handleCloseModal } from '@/lib/serverUtils'

export function usePopUp ({ newPath }: { newPath: string }) {
  const popUpData = useId()

  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    
    handleCloseModal({
      isRedirectable: target.getAttribute('data-pop-up') === popUpData,
      newPath
    })
  }

  useEffect(() => {
    addEventListener('mousedown', handleClick)

    return () => {
      removeEventListener('mousedown', handleClick)
    }
  }, [])

  return ({ popUpData })
}
