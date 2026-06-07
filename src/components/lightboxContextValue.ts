import { createContext, type ReactNode } from 'react'

export interface LightboxContextValue {
  isOpen: boolean
  src: string
  alt: string
  caption: ReactNode
  openLightbox: (src: string, alt: string, caption: ReactNode) => void
  closeLightbox: () => void
}

export const LightboxContext = createContext<LightboxContextValue | null>(null)
