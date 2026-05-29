import { useRef, useState, useEffect, useCallback } from 'react'
import { ImageWithLightbox } from './ImageWithLightbox'

const PROJECT_COUNT = 3

function smoothScrollTo(targetY: number, duration = 500) {
  const startY = window.scrollY
  const diff = targetY - startY
  if (Math.abs(diff) < 2) return

  let startTime: number | null = null

  function step(time: number) {
    if (!startTime) startTime = time
    const elapsed = time - startTime
    const progress = Math.min(elapsed / duration, 1)
    // ease-out cubic
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

        // Wait for horizontal scroll to settle before scrolling page
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
      <h2 className="section-title">Проекты</h2>

      <div className="projects-container" ref={containerRef}>
        {/* Project 1: colreg-vision-node */}
        <div className="project-card">
          <div className="project-header">
            <div className="project-title-area">
              <h3>COLREG Vision Node</h3>
            </div>
          </div>

          <div className="project-info-side">
            <div className="project-full-desc">
              <p>
                Система разработана для повышения безопасности автономного и ассистируемого судоходства. Она автоматически распознаёт навигационный статус встречных судов в соответствии с МППСС-72. Алгоритм анализирует дневные сигнальные фигуры (шары, цилиндры, ромбы, конусы) или ночные огни (топовые, бортовые, кормовые, круговые).
              </p>
              <p>
                Особое внимание уделено надёжности: при ухудшении видимости (туман, ночь, осадки) система переключается на мультимодальный режим с использованием ИК-камеры, совмещая тепловизионные рамки с цветным оптическим каналом.
              </p>
            </div>

            <div className="tech-stack-tags">
              <span className="tech-tag">PyTorch</span>
              <span className="tech-tag">YOLOv8</span>
              <span className="tech-tag">EfficientNet</span>
              <span className="tech-tag">OpenCV</span>
              <span className="tech-tag">NumPy</span>
              <span className="tech-tag">Pillow</span>
            </div>

            <div className="inference-gallery inference-gallery-grid">
              <ImageWithLightbox
                src="/assets/colreg/original_result_no_expansion.jpg"
                alt="Детекция в ИК спектре"
              />
              <ImageWithLightbox
                src="/assets/colreg/photo_result_nuc_at_2.5.jpg"
                alt="Детекция в RGB спектре"
              />
            </div>
          </div>
        </div>

        {/* Project 2: Cellsistant */}
        <div className="project-card">
          <div className="project-header">
            <div className="project-title-area">
              <h3>Cellsistant</h3>
            </div>
          </div>

          <div className="project-info-side">
            <div className="project-full-desc">
              <p>
                Cellsistant превращает среду JupyterLab в интерактивную площадку под управлением ИИ-агента. Расширение реализует полноценный цикл планирования и вызова инструментов (ReAct Loop) с 19 инструментами в 5 категориях: управление ноутбуками, файловая система, терминал, установка пакетов и поиск.
              </p>
              <p>
                Ассистент может самостоятельно создавать, редактировать и запускать ячейки ноутбука, анализировать графики с помощью зрения (Vision), а также выполнять терминальные команды в безопасной песочнице с 4 уровнями доступа и блокировкой деструктивных команд. Поддерживает два режима: Agent (полный доступ) и Ask (только чтение).
              </p>
            </div>

            <div className="tech-stack-tags">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">JupyterLab Ext</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">LLM Agents</span>
              <span className="tech-tag">ReAct Loop</span>
              <span className="tech-tag">OpenRouter</span>
              <span className="tech-tag">Vision</span>
              <span className="tech-tag">Rate Limiting</span>
            </div>

            <div className="inference-gallery">
              <ImageWithLightbox
                src="/assets/cellsistant/demo.gif"
                alt="Cellsistant Demo GIF"
                fullWidth
              />
            </div>
          </div>
        </div>

        {/* Project 3: VK Workspace Intelligent Search */}
        <div className="project-card">
          <div className="project-header">
            <div className="project-title-area">
              <h3>VK Workspace Intelligent Search</h3>
            </div>
          </div>

          <div className="project-info-side">
            <div className="project-full-desc">
              <p>
                Высокопроизводительный поисковый движок для экосистемы VK Workspace, разработанный на хакатоне Samsung IT Academy 2026. Индексация использует скользящее окно с перекрытием для чанков и обогащает сообщения «семантическими якорями» (авторство, цитирование, вложенные файлы).
              </p>
              <p>
                В основе поиска лежит ансамбль <strong>Alpha-Blending</strong> (4 параллельных потока: dense, HyDE, sparse main/opt), объединяемый по схеме <strong>RRF Fusion</strong> в Qdrant. Финальное ранжирование выполняется кросс-энкодером Llama-Nemotron-Reranker-1B с эвристическим бустингом. Результат: <strong>Recall@50 = 0.62</strong>, <strong>nDCG@50 = 0.52</strong>, улучшение на <strong>30%</strong> относительно бейзлайна.
              </p>
            </div>

            <div className="tech-stack-tags">
              <span className="tech-tag">FastAPI</span>
              <span className="tech-tag">Qdrant</span>
              <span className="tech-tag">Qwen3-Embedding</span>
              <span className="tech-tag">FastEmbed BM25</span>
              <span className="tech-tag">HyDE</span>
              <span className="tech-tag">RRF Fusion</span>
              <span className="tech-tag">Llama-Nemotron</span>
              <span className="tech-tag">Docker</span>
            </div>
          </div>
        </div>
      </div>

      <div className="project-nav">
        {Array.from({ length: PROJECT_COUNT }).map((_, i) => (
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
