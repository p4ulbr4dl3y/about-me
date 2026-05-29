import { useRef, useState, useEffect, useCallback } from 'react'
import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'

function smoothScrollTo(targetY: number, duration = 500) {
  const startY = window.scrollY
  const diff = targetY - startY
  if (Math.abs(diff) < 2) return

  let startTime: number | null = null

  function step(time: number) {
    if (!startTime) startTime = time
    const elapsed = time - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    window.scrollTo(0, startY + diff * ease)
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const prevIndexRef = useRef(0)
  const scrollTimerRef = useRef<number | null>(null)

  const scrollToProject = useCallback((index: number) => {
    const container = containerRef.current
    if (!container) return
    const cards = container.querySelectorAll('.project-card')
    const card = cards[index] as HTMLElement | undefined
    if (card) {
      const containerRect = container.getBoundingClientRect()
      const cardRect = card.getBoundingClientRect()
      const scrollLeft = card.offsetLeft - (containerRect.width / 2) + (cardRect.width / 2)
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const cards = container.querySelectorAll('.project-card')
      const containerCenter = container.scrollLeft + container.clientWidth / 2

      let closest = 0
      let minDist = Infinity
      cards.forEach((card, i) => {
        const cardCenter = (card as HTMLElement).offsetLeft + (card as HTMLElement).offsetWidth / 2
        const dist = Math.abs(containerCenter - cardCenter)
        if (dist < minDist) {
          minDist = dist
          closest = i
        }
      })

      if (closest !== prevIndexRef.current) {
        prevIndexRef.current = closest
        setActiveIndex(closest)

        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
        scrollTimerRef.current = window.setTimeout(() => {
          const card = cards[closest] as HTMLElement
          if (card) {
            const cardTop = card.getBoundingClientRect().top + window.scrollY
            const offset = 40
            smoothScrollTo(cardTop - offset, 600)
          }
        }, 300)
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    }
  }, [])

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-title">ls projects/</h2>

      <div className="projects-container" ref={containerRef}>
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="project-nav">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`project-dot ${activeIndex === i ? 'active' : ''}`}
            onClick={() => scrollToProject(i)}
            aria-label={`Перейти к проекту ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
