import { useState, useEffect } from 'react'
import { resolveAsset } from '../utils/resolveAsset'

const consoleLines = [
  { type: 'comment', text: '# Привет! Я Егор — ML инженер и разработчик' },
  { type: 'command', text: '$ cat about.txt' },
  { type: 'output', text: 'В программирование я пришёл в 2019 году — начинал с JavaScript' },
  { type: 'output', text: 'и написания ботов для Discord. Со временем интерес сместился' },
  { type: 'output', text: 'от скриптов к более глубоким задачам.' },
  { type: 'empty', text: '' },
  { type: 'command', text: '$ cat interests.txt' },
  { type: 'output', text: 'Мне нравится решать интересные задачи, применяя нейросети' },
  { type: 'output', text: 'в пайплайнах, — работать с большими моделями и находить' },
  { type: 'output', text: 'способы встроить их в реальные продукты.' },
]

export function Hero() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < consoleLines.length) {
        setVisibleLines(prev => prev + 1)
        i++
      } else {
        clearInterval(interval)
      }
    }, 150)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero-section" id="about">
      <div className="hero-content">
        <div className="terminal-bar">
          <span className="terminal-dot red"></span>
          <span className="terminal-dot yellow"></span>
          <span className="terminal-dot green"></span>
          <span className="terminal-bar-text">p4ulbr4dl3y@portfolio:~</span>
        </div>
        <div className="hero-body">
          <div className="hero-text">
            <h1>whoami</h1>

            <div className="bio">
              {consoleLines.slice(0, visibleLines).map((line, i) => (
                <p key={i} className={`console-line console-${line.type}`}>
                  {line.text}
                </p>
              ))}
            </div>
          </div>
          <div className="avatar-container">
            <img src={resolveAsset('/assets/avatar.jpg')} alt="Егор" className="avatar" loading="eager" />
          </div>
        </div>
      </div>
    </section>
  )
}
