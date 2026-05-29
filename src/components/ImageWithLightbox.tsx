import type { ReactNode } from 'react'
import { useLightbox } from './LightboxContext'

interface ImageWithLightboxProps {
  src: string
  alt: string
  caption: ReactNode
  fullWidth?: boolean
}

export function ImageWithLightbox({ src, alt, caption, fullWidth }: ImageWithLightboxProps) {
  const { openLightbox } = useLightbox()

  return (
    <div className="inference-item" style={fullWidth ? { gridColumn: 'span 2' } : undefined}>
      <div className="image-wrapper" style={{ cursor: 'zoom-in' }} onClick={() => openLightbox(src, alt, caption)}>
        <img src={src} alt={alt} />
      </div>
      <div className="inference-caption">{caption}</div>
    </div>
  )
}
