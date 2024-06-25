import { useState, useEffect } from 'react'
import { ClickEvent } from '@/lib/definitions'

export function useSelect (): {
    isShowing: boolean,
    setIsShowing: (value: boolean) => void
    } {
  // estado que contiene si el select se muesta o no.
  const [isShowing, setIsShowing] = useState(false)

  // Efecto que agrega el event listener para que el select tenga funcionalidad
  useEffect(() => {
    document.addEventListener('click', functinalitySelect)

    return () => {
      document.removeEventListener('click', functinalitySelect)
    }
  }, [])

  // funcion que chequea que estes tocando el select.
  const functinalitySelect = (e: ClickEvent) => {
    const isSelectButton = e.target.matches('[data-dropdown-button]')

    if (!isSelectButton) setIsShowing(false)
  }

  return { isShowing, setIsShowing }
}
