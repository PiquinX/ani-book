import { useState, useEffect } from 'react'

export function useSelect (id: string): {
    isShowing: boolean,
    setIsShowing: (value: boolean) => void
    } {
  // estado que contiene si el select se muesta o no.
  const [isShowing, setIsShowing] = useState(false)

  // Efecto que agrega el event listener para que el select tenga funcionalidad
  useEffect(() => {
    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement
  
      const isSelectButton = target.getAttribute('id') === id
  
      if (!isSelectButton) setIsShowing(false)
    })
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return { isShowing, setIsShowing }
}
