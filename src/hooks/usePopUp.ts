import { useEffect, useId } from 'react'
import { ClickEvent } from '@/lib/definitions'
import { handleCloseModal } from '@/lib/serverUtils'

export function usePopUp ({ newPath }: { newPath: string }) {
  const popUpData = useId()

  const handleClick = (event: ClickEvent) => {
    handleCloseModal({
      isRedirectable: event.target.getAttribute('data-pop-up') === popUpData,
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
