import { useContext } from 'react'
import { LightboxContext } from './lightboxContextValue'

export function useLightbox() {
  const ctx = useContext(LightboxContext)
  if (!ctx) throw new Error('useLightbox must be used within LightboxProvider')
  return ctx
}
