import { useState, useEffect, useCallback, useRef } from 'react'
import { projects } from '../data/projects'

export function ProjectsNav() {
  const [activeId, setActiveId] = useState<string>(projects[0]?.id || '')
  const navListRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let current = projects[0]?.id || ''
          for (const p of projects) {
            const el = document.getElementById(p.id)
            if (el) {
              const elRect = el.getBoundingClientRect()
              if (elRect.top <= 200) {
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

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-scroll horizontal chips on mobile when activeId changes
  useEffect(() => {
    if (!navListRef.current) return
    const activeBtn = navListRef.current.querySelector<HTMLElement>('.projects-nav-link.active')
    if (activeBtn && window.innerWidth <= 960) {
      activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
    }
  }, [activeId])

  const handleItemClick = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 30
    window.scrollTo({ top, behavior: 'smooth' })
    setActiveId(id)
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
                title={project.title}
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
