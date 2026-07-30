import { useRef, useState, useEffect, useCallback } from 'react'
import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const prevIndexRef = useRef(0)
  const cardsRef = useRef<HTMLElement[]>([])
  const scrollTimeoutRef = useRef<number | null>(null)

  const refreshCards = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    cardsRef.current = Array.from(
      container.querySelectorAll<HTMLElement>('.project-card'),
    )
  }, [])

  const alignSectionTop = useCallback(() => {
    const section = sectionRef.current
    if (!section) return
    const title = section.querySelector('.section-title') as HTMLElement | null
    const targetEl = title ?? section
    const rect = targetEl.getBoundingClientRect()
    if (rect.top < 0) {
      window.scrollTo({
        top: Math.max(0, window.scrollY + rect.top - 30),
        behavior: 'smooth',
      })
    }
  }, [])

  const scrollToProject = useCallback((index: number) => {
    const container = containerRef.current
    if (!container) return
    const card = cardsRef.current[index] ?? container.querySelectorAll<HTMLElement>('.project-card')[index]
    if (!card) return

    const containerLeft = container.getBoundingClientRect().left
    const cardLeft = card.getBoundingClientRect().left
    const delta = cardLeft - containerLeft - (container.clientWidth - card.offsetWidth) / 2
    container.scrollBy({ left: delta, behavior: 'smooth' })

    alignSectionTop()
  }, [alignSectionTop])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    refreshCards()

    const handleScroll = () => {
      const cards = cardsRef.current
      if (cards.length === 0) return

      const containerCenter = container.scrollLeft + container.clientWidth / 2
      let closest = 0
      let minDist = Infinity
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const dist = Math.abs(containerCenter - cardCenter)
        if (dist < minDist) {
          minDist = dist
          closest = i
        }
      }

      // ONLY align section top when active project card actually changes
      if (closest !== prevIndexRef.current) {
        prevIndexRef.current = closest
        setActiveIndex(closest)

        if (scrollTimeoutRef.current !== null) {
          window.clearTimeout(scrollTimeoutRef.current)
        }
        scrollTimeoutRef.current = window.setTimeout(() => {
          alignSectionTop()
        }, 150)
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current !== null) window.clearTimeout(scrollTimeoutRef.current)
    }
  }, [refreshCards, alignSectionTop])

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <h2 className="section-title">ls projects/</h2>

      <div className="projects-container" ref={containerRef}>
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="project-nav" role="tablist" aria-label="Навигация по проектам">
        {projects.map((project, i) => (
          <button
            key={project.id}
            type="button"
            role="tab"
            aria-selected={activeIndex === i}
            className={`project-dot ${activeIndex === i ? 'active' : ''}`}
            onClick={() => scrollToProject(i)}
            aria-label={`Перейти к проекту: ${project.title}`}
          />
        ))}
      </div>
    </section>
  )
}
