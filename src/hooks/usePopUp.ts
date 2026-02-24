import { useEffect, useId } from 'react'
import { useRouter } from 'next/navigation'

export function usePopUp({ newPath }: { newPath: string }) {
  const popUpData = useId()
  const router = useRouter()

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // I was using a function to handle the click event but the agent replaced it with this
      if (target.getAttribute('data-pop-up') === popUpData) {
        router.push(newPath)
      }
    }

    addEventListener('mousedown', handleClick)

    return () => {
      removeEventListener('mousedown', handleClick)
    }
  }, [newPath, popUpData, router])

  return ({ popUpData })
}
