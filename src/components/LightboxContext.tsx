import { useState, useCallback, useEffect, type ReactNode } from 'react'
import { LightboxContext, type LightboxContextValue } from './lightboxContextValue'

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [src, setSrc] = useState('')
  const [alt, setAlt] = useState('')
  const [caption, setCaption] = useState<ReactNode>(null)

  const openLightbox = useCallback((newSrc: string, newAlt: string, newCaption: ReactNode) => {
    setSrc(newSrc)
    setAlt(newAlt)
    setCaption(newCaption)
    setIsOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const value: LightboxContextValue = {
    isOpen,
    src,
    alt,
    caption,
    openLightbox,
    closeLightbox,
  }

  return (
    <LightboxContext.Provider value={value}>
      {children}
    </LightboxContext.Provider>
  )
}
