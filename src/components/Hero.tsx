export function Hero() {
  return (
    <header className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Привет, я Егор</h1>
          <p className="subtitle">ML Engineer &amp; Full-Stack Developer</p>
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
          <img src="/assets/avatar.jpg" alt="Егор" className="avatar" />
        </div>
      </div>
    </header>
  )
}
