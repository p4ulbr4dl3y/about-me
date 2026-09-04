import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { projects } from './data/projects'

describe('App', () => {
  it('renders all main sections', () => {
    render(<App />)

    expect(screen.getByText('whoami')).toBeInTheDocument()
    expect(screen.getByText('Привет! Я Егор :)')).toBeInTheDocument()
    expect(screen.getByText('projects')).toBeInTheDocument()
    expect(screen.getByText('worked with')).toBeInTheDocument()
    expect(screen.getByText('awards')).toBeInTheDocument()
  })

  it('renders every project title', () => {
    render(<App />)

    for (const p of projects) {
      expect(screen.getAllByText(p.title).length).toBeGreaterThan(0)
    }
  })

  it('renders project navigation buttons', () => {
    render(<App />)

    const nav = screen.getByLabelText('Навигация по проектам')
    expect(nav).toBeInTheDocument()
    expect(nav.querySelectorAll('button')).toHaveLength(projects.length)
  })

  it('opens lightbox from a project image', () => {
    render(<App />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    const firstImage = screen.getAllByRole('button', { name: /Увеличить изображение/ })[0]
    fireEvent.click(firstImage)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})