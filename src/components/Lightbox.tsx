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
      previousFocusRef.current?.focus({ preventScroll: true })
    }
  }, [isOpen])

  const touchStartPos = useRef<{ x: number; y: number } | null>(null)

  const handleClose = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    closeLightbox()
  }

  const handleBackdropTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && e.touches.length === 1) {
      touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    } else {
      touchStartPos.current = null
    }
  }

  const handleBackdropTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && touchStartPos.current && e.changedTouches.length === 1) {
      const touch = e.changedTouches[0]
      const dx = Math.abs(touch.clientX - touchStartPos.current.x)
      const dy = Math.abs(touch.clientY - touchStartPos.current.y)
      if (dx < 10 && dy < 10) {
        e.preventDefault()
        e.stopPropagation()
        closeLightbox()
      }
    }
    touchStartPos.current = null
  }

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
        if (e.target === e.currentTarget) handleClose(e)
      }}
      onTouchStart={handleBackdropTouchStart}
      onTouchEnd={handleBackdropTouchEnd}
    >
      <button
        ref={closeBtnRef}
        type="button"
        className="lightbox-close"
        onClick={handleClose}
        onTouchEnd={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleClose(e)
        }}
        aria-label="Закрыть"
      >
        &times;
      </button>
      <img className="lightbox-content" src={src} alt={alt} />
      {caption && <div className="lightbox-caption">{caption}</div>}
    </div>
  )
}
