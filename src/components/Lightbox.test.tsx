import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { LightboxProvider } from './LightboxContext'
import { ImageWithLightbox } from './ImageWithLightbox'
import { Lightbox } from './Lightbox'

function renderLightbox() {
  return render(
    <LightboxProvider>
      <ImageWithLightbox src="/assets/img.webp" alt="Скриншот" caption="Описание" />
      <Lightbox />
    </LightboxProvider>,
  )
}

describe('ImageWithLightbox + Lightbox', () => {
  it('opens lightbox on image click and shows caption', () => {
    renderLightbox()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Увеличить изображение: Скриншот' }))

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('aria-label', 'Скриншот')
    expect(within(dialog).getByText('Описание')).toBeInTheDocument()
    expect(within(dialog).getByRole('img', { name: 'Скриншот' })).toHaveAttribute('src', '/assets/img.webp')
  })

  it('closes lightbox via close button', () => {
    renderLightbox()
    fireEvent.click(screen.getByRole('button', { name: 'Увеличить изображение: Скриншот' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Закрыть' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes lightbox on Escape key', () => {
    renderLightbox()
    fireEvent.click(screen.getByRole('button', { name: 'Увеличить изображение: Скриншот' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes lightbox via touch on close button', () => {
    renderLightbox()
    fireEvent.click(screen.getByRole('button', { name: 'Увеличить изображение: Скриншот' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    const closeBtn = screen.getByRole('button', { name: 'Закрыть' })
    fireEvent.touchEnd(closeBtn)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes lightbox via tap on backdrop', () => {
    renderLightbox()
    fireEvent.click(screen.getByRole('button', { name: 'Увеличить изображение: Скриншот' }))
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    fireEvent.touchStart(dialog, { touches: [{ clientX: 50, clientY: 50 }] })
    fireEvent.touchEnd(dialog, { changedTouches: [{ clientX: 52, clientY: 51 }] })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})