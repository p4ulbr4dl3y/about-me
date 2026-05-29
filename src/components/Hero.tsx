import { useState, useEffect } from 'react'

const subtitleText = 'ML Engineer & Full-Stack Developer'

export function Hero() {
  const [displayed, setDisplayed] = useState('')
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < subtitleText.length) {
        setDisplayed(subtitleText.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setTypingDone(true)
      }
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Привет, я Егор</h1>
          <p className="subtitle">
            {displayed}
            {!typingDone && <span className="subtitle-cursor" />}
          </p>
          <div className="location-age">
            <span className="badge">22 года</span>
            <span className="badge">Архангельск</span>
            <span className="badge">САФУ, 3 курс</span>
            <span className="badge">Интеллектуальные системы и машинное обучение</span>
          </div>
          <div className="bio">
            <p>В программирование я пришёл в 2019 году — начинал с JavaScript и написания ботов для Discord. Со временем интерес сместился от скриптов к более глубоким задачам.</p>
            <p>Мне нравится решать интересные задачи, применяя нейросети в пайплайнах, — работать с большими моделями и находить способы встроить их в реальные продукты.</p>
          </div>
        </div>
        <div className="avatar-container">
          <img src="/assets/avatar.jpg" alt="Егор" className="avatar" loading="eager" />
        </div>
      </div>
    </header>
  )
}
