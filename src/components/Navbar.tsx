import { useState, useEffect, useCallback } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Determine active section
      const sections = ['skills', 'projects']
      const scrollPos = window.scrollY + 120

      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const bottom = top + el.offsetHeight
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(id)
            return
          }
        }
      }
      if (window.scrollY < 200) setActiveSection('')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <>
      <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo" onClick={closeMobile}>
          ~/ <span>yegor</span>
        </a>
        <button
          className={`nav-toggle ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <a
            href="#skills"
            className={activeSection === 'skills' ? 'active' : ''}
            onClick={closeMobile}
          >
            Навыки
          </a>
          <a
            href="#projects"
            className={activeSection === 'projects' ? 'active' : ''}
            onClick={closeMobile}
          >
            Проекты
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" onClick={closeMobile}>
            GitHub
          </a>
        </div>
      </nav>
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99,
          }}
          onClick={closeMobile}
        />
      )}
    </>
  )
}
