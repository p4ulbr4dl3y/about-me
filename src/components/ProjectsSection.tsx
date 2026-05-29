import { useRef, useState, useEffect, useCallback } from 'react'
import { ColregDiagram } from './ColregDiagram'
import { CellsistantDiagram } from './CellsistantDiagram'
import { VkDiagram } from './VkDiagram'
import { ImageWithLightbox } from './ImageWithLightbox'
import { ProjectTabs } from './ProjectTabs'

const PROJECT_COUNT = 3

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const prevIndexRef = useRef(0)

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

        // Scroll page so the project card top is visible
        const card = cards[closest] as HTMLElement
        if (card) {
          const cardTop = card.getBoundingClientRect().top + window.scrollY
          const offset = 40 // some padding from top
          window.scrollTo({
            top: cardTop - offset,
            behavior: 'smooth',
          })
        }
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-title">Проекты</h2>

      <div className="projects-container" ref={containerRef}>
        {/* Project 1: colreg-vision-node */}
        <div className="project-card">
          <div className="project-header">
            <div className="project-title-area">
              <h3>colreg-vision-node</h3>
              <p className="project-desc-short">
                Нода компьютерного зрения для автоматического определения навигационного статуса судов по МППСС-72 (COLREG) с использованием детекции знаков/огней и слияния данных сенсоров.
              </p>
            </div>
          </div>

          <ProjectTabs
            info={
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
                  <span className="tech-tag">Sensor Fusion</span>
                  <span className="tech-tag">OpenCV</span>
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
            }
            diagram={<ColregDiagram />}
          />
        </div>

        {/* Project 2: Cellsistant */}
        <div className="project-card">
          <div className="project-header">
            <div className="project-title-area">
              <h3>Cellsistant</h3>
              <p className="project-desc-short">
                Интеллектуальный ИИ-ассистент, встроенный непосредственно в интерфейс JupyterLab, для автоматизации написания кода, анализа данных, визуализации и работы с файловой системой.
              </p>
            </div>
          </div>

          <ProjectTabs
            info={
              <div className="project-info-side">
                <div className="project-full-desc">
                  <p>
                    Cellsistant превращает среду JupyterLab в интерактивную площадку под управлением ИИ-агента. Вместо простого генератора кода, расширение реализует полноценный цикл планирования и вызова инструментов (Tool Use / ReAct Loop).
                  </p>
                  <p>
                    Ассистент может самостоятельно создавать, редактировать и запускать ячейки ноутбука, анализировать полученные ошибки и графики с помощью зрения (Vision), искать информацию по коду, а также выполнять терминальные команды в безопасной песочнице с блокировкой деструктивных действий.
                  </p>
                </div>

                <div className="tech-stack-tags">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">JupyterLab Ext</span>
                  <span className="tech-tag">TypeScript</span>
                  <span className="tech-tag">LLM Agents</span>
                  <span className="tech-tag">ReAct Loop</span>
                </div>

                <div className="inference-gallery">
                  <ImageWithLightbox
                    src="/assets/cellsistant/demo.gif"
                    alt="Cellsistant Demo GIF"
                    fullWidth
                  />
                </div>
              </div>
            }
            diagram={<CellsistantDiagram />}
          />
        </div>

        {/* Project 3: VK Workspace Intelligent Search */}
        <div className="project-card">
          <div className="project-header">
            <div className="project-title-area">
              <h3>VK Workspace Intelligent Search</h3>
              <p className="project-desc-short">
                Высокопроизводительная поисковая система для экосистемы VK Workspace, показавшая прирост Recall@50 и nDCG@50 на хакатоне за счёт двухстадийного ранжирования и гибридного поиска.
              </p>
            </div>
          </div>

          <ProjectTabs
            info={
              <div className="project-info-side">
                <div className="project-full-desc">
                  <p>
                    Решение представляет собой интеллектуальный поисковый движок на базе FastAPI и Qdrant, предназначенный для мгновенного нахождения нужных чатов, сообщений и вложений. Индексация использует скользящее окно с перекрытием для чанков и обогащает сообщения «семантическими якорями» (авторство, цитирование, вложенные файлы).
                  </p>
                  <p>
                    В основе поиска лежит ансамбль <strong>Alpha-Blending</strong> (4 параллельных потока поиска: семантический dense, лексический sparse main/opt и расширение через HyDE), объединяемый по схеме <strong>RRF Fusion</strong> в Qdrant. Финальное ранжирование выполняется кросс-энкодером Llama-Nemotron-Reranker-1B, эвристическим бустингом и NDCG Sharpener.
                  </p>
                </div>
              </div>
            }
            diagram={<VkDiagram />}
          />
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
