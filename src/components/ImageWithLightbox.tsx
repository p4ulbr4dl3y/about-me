import { useState, type ReactNode } from 'react'
import { useLightbox } from './LightboxContext'

interface ImageWithLightboxProps {
  src: string
  alt: string
  caption?: ReactNode
  fullWidth?: boolean
}

export function ImageWithLightbox({ src, alt, caption, fullWidth }: ImageWithLightboxProps) {
  const { openLightbox } = useLightbox()
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="inference-item" style={fullWidth ? { gridColumn: 'span 2' } : undefined}>
      <div className="image-wrapper" style={{ cursor: 'zoom-in', position: 'relative' }} onClick={() => openLightbox(src, alt, caption ?? null)}>
        {!loaded && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            fontSize: '0.8rem',
          }}>
            Загрузка...
          </div>
        )}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
        />
      </div>
      {caption && <div className="inference-caption">{caption}</div>}
    </div>
  )
}
