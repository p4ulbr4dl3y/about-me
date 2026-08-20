import { resolveAsset } from '../utils/resolveAsset'

export function Hero() {
  return (
    <section className="hero-section" id="about">
      <div className="hero-content">
        <div className="hero-body">
          <div className="hero-text">
            <h1>whoami</h1>

            <div className="bio">
              <p className="bio-greeting">Привет! Я Егор :)</p>
              <p>
                В программирование я пришёл в 2019 году — начинал с JavaScript
                и написания ботов для Discord. Со временем интерес сместился
                от скриптов к более глубоким задачам.
              </p>
              <p>
                Мне нравится решать интересные задачи, применяя нейросети
                в пайплайнах, — работать с большими моделями и находить
                способы встроить их в реальные продукты.
              </p>
            </div>
          </div>
          <div className="avatar-container">
            <img
              src={resolveAsset('/assets/avatar.jpg')}
              alt="Егор"
              className="avatar"
              loading="eager"
              width="180"
              height="180"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
