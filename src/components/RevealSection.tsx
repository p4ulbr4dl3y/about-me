import { useEffect, useRef, type ReactNode } from 'react'

interface RevealSectionProps {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
}

export function RevealSection({ children, className = '', id, delay = 0 }: RevealSectionProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('visible')
          }, delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <section ref={ref} className={`reveal-section ${className}`} id={id}>
      {children}
    </section>
  )
}
