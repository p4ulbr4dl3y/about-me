import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface LightboxContextValue {
  isOpen: boolean
  src: string
  alt: string
  caption: ReactNode
  openLightbox: (src: string, alt: string, caption: ReactNode) => void
  closeLightbox: () => void
}

const LightboxContext = createContext<LightboxContextValue | null>(null)

export function useLightbox() {
  const ctx = useContext(LightboxContext)
  if (!ctx) throw new Error('useLightbox must be used within LightboxProvider')
  return ctx
}

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
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }, [])

  return (
    <LightboxContext.Provider value={{ isOpen, src, alt, caption, openLightbox, closeLightbox }}>
      {children}
    </LightboxContext.Provider>
  )
}
