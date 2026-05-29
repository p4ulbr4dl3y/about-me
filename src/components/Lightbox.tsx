import { useEffect } from 'react'
import { useLightbox } from './LightboxContext'

export function Lightbox() {
  const { isOpen, src, alt, caption, closeLightbox } = useLightbox()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeLightbox()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeLightbox])

  if (!isOpen) return null

  return (
    <div className="lightbox-modal" style={{ display: 'flex' }} onClick={(e) => {
      if (e.target === e.currentTarget) closeLightbox()
    }}>
      <span className="lightbox-close" onClick={closeLightbox} role="button" tabIndex={0} aria-label="Close">
        &times;
      </span>
      <img className="lightbox-content" src={src} alt={alt} />
      <div className="lightbox-caption">{caption}</div>
    </div>
  )
}
