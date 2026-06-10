import { useRef, useState, useEffect, useCallback } from 'react'
import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'

function smoothScrollTo(targetY: number, duration = 600) {
  const startY = window.scrollY
  const diff = targetY - startY
  if (Math.abs(diff) < 2) return () => {}

  let startTime: number | null = null
  let frameId: number | null = null
  let cancelled = false

  function step(time: number) {
    if (cancelled) return
    if (!startTime) startTime = time
    const elapsed = time - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    window.scrollTo(0, startY + diff * ease)
    if (progress < 1) frameId = requestAnimationFrame(step)
  }

  frameId = requestAnimationFrame(step)

  return () => {
    cancelled = true
    if (frameId !== null) cancelAnimationFrame(frameId)
  }
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const prevIndexRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)
  const scrollTimerRef = useRef<number | null>(null)
  const pageScrollCancelRef = useRef<(() => void) | null>(null)
  const cardsRef = useRef<HTMLElement[]>([])

  const refreshCards = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    cardsRef.current = Array.from(
      container.querySelectorAll<HTMLElement>('.project-card'),
    )
  }, [])

  const scrollToProject = useCallback((index: number) => {
    const container = containerRef.current
    if (!container) return
    const card = cardsRef.current[index] ?? container.querySelectorAll<HTMLElement>('.project-card')[index]
    if (!card) return
    if (pageScrollCancelRef.current) pageScrollCancelRef.current()
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current)
      scrollTimerRef.current = null
    }
    const containerLeft = container.getBoundingClientRect().left
    const cardLeft = card.getBoundingClientRect().left
    const delta = cardLeft - containerLeft - (container.clientWidth - card.offsetWidth) / 2
    container.scrollBy({ left: delta, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    refreshCards()

    const handleScroll = () => {
      if (rafIdRef.current !== null) return
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null
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
        if (closest !== prevIndexRef.current) {
          prevIndexRef.current = closest
          setActiveIndex(closest)

          if (pageScrollCancelRef.current) pageScrollCancelRef.current()
          if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
          scrollTimerRef.current = window.setTimeout(() => {
            scrollTimerRef.current = null
            const card = cards[closest]
            if (card) {
              const cardTop = card.getBoundingClientRect().top + window.scrollY
              const offset = 40
              pageScrollCancelRef.current = smoothScrollTo(cardTop - offset)
            }
          }, 300)
        }
      })
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
      if (pageScrollCancelRef.current) pageScrollCancelRef.current()
    }
  }, [refreshCards])

  return (
    <section className="projects-section" id="projects">
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
