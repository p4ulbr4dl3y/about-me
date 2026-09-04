import { useEffect, useRef } from 'react'
import { useLightbox } from './useLightbox'

export function Lightbox() {
  const { isOpen, src, alt, caption, closeLightbox } = useLightbox()
  const modalRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox()
        return
      }
      if (e.key !== 'Tab' || !modalRef.current) return
      const focusables = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeLightbox])

  useEffect(() => {
    if (!isOpen) return
    previousFocusRef.current = document.activeElement as HTMLElement | null
    modalRef.current?.focus()
    return () => {
      previousFocusRef.current?.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="lightbox-modal"
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Просмотр изображения'}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeLightbox()
      }}
    >
      <button
        ref={closeBtnRef}
        type="button"
        className="lightbox-close"
        onClick={closeLightbox}
        aria-label="Закрыть"
      >
        &times;
      </button>
      <img className="lightbox-content" src={src} alt={alt} />
      {caption && <div className="lightbox-caption">{caption}</div>}
    </div>
  )
}
