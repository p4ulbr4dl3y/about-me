import { useState, useEffect, useCallback, useRef } from 'react'
import { projects } from '../data/projects'

export function ProjectsNav() {
  const [activeId, setActiveId] = useState<string>(projects[0]?.id || '')
  const navListRef = useRef<HTMLUListElement>(null)
  const isProgrammaticScroll = useRef(false)
  const scrollTimeout = useRef<number | null>(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (isProgrammaticScroll.current) return

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (isProgrammaticScroll.current) {
            ticking = false
            return
          }
          let current = projects[0]?.id || ''
          const navOffset = window.innerWidth <= 960 ? 90 : 160
          for (const p of projects) {
            const el = document.getElementById(p.id)
            if (el) {
              const elRect = el.getBoundingClientRect()
              if (elRect.top <= navOffset) {
                current = p.id
              }
            }
          }
          setActiveId(current)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current !== null) {
        window.clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  // Auto-scroll horizontal chips on mobile when activeId changes
  useEffect(() => {
    if (!navListRef.current) return
    const activeBtn = navListRef.current.querySelector<HTMLElement>('.projects-nav-link.active')
    if (activeBtn && window.innerWidth <= 960) {
      activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [activeId])

  const handleItemClick = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    isProgrammaticScroll.current = true
    setActiveId(id)

    el.scrollIntoView({ behavior: 'smooth', block: 'start' })

    if (scrollTimeout.current !== null) {
      window.clearTimeout(scrollTimeout.current)
    }
    scrollTimeout.current = window.setTimeout(() => {
      isProgrammaticScroll.current = false
    }, 800)
  }, [])

  return (
    <nav className="projects-nav" aria-label="Навигация по проектам">
      <div className="projects-nav-header">// projects</div>
      <ul className="projects-nav-list" ref={navListRef}>
        {projects.map(project => {
          const isActive = project.id === activeId
          return (
            <li key={project.id} className="projects-nav-item">
              <button
                type="button"
                className={`projects-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => handleItemClick(project.id)}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="projects-nav-prefix">{isActive ? '❯' : '·'}</span>
                <span className="projects-nav-title">{project.title}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
