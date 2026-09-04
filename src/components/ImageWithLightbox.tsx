import { useState, type ReactNode } from 'react'
import { useLightbox } from './useLightbox'
import { resolveAsset } from '../utils/resolveAsset'

interface ImageWithLightboxProps {
  src: string
  alt: string
  caption?: ReactNode
  fullWidth?: boolean
}

export function ImageWithLightbox({ src, alt, caption, fullWidth }: ImageWithLightboxProps) {
  const { openLightbox } = useLightbox()
  const [loaded, setLoaded] = useState(false)
  const resolvedSrc = resolveAsset(src)

  return (
    <div className={`inference-item ${fullWidth ? 'inference-item-full' : ''}`}>
      <button
        type="button"
        className="image-wrapper"
        aria-label={`Увеличить изображение: ${alt}`}
        onClick={() => openLightbox(resolvedSrc, alt, caption ?? null)}
      >
        {!loaded && <div className="image-skeleton" aria-hidden="true" />}
        <img
          src={resolvedSrc}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
        />
      </button>
      {caption && <div className="inference-caption">{caption}</div>}
    </div>
  )
}
