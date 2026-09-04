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

            <div className="hero-contacts">
              <a
                href="https://github.com/p4ulbr4dl3y"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <img src={resolveAsset('/assets/icons/github.svg')} alt="" className="contact-icon" width="16" height="16" />
                <span>GitHub</span>
                <span className="contact-arrow" aria-hidden="true">↗</span>
              </a>
              <a
                href="https://huggingface.co/p4ulbr4dl3y"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <img src={resolveAsset('/assets/icons/huggingface.svg')} alt="" className="contact-icon" width="16" height="16" />
                <span>Hugging Face</span>
                <span className="contact-arrow" aria-hidden="true">↗</span>
              </a>
              <a
                href="https://t.me/p4ulbr4dl3y"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <img src={resolveAsset('/assets/icons/telegram.svg')} alt="" className="contact-icon" width="16" height="16" />
                <span>Telegram</span>
                <span className="contact-arrow" aria-hidden="true">↗</span>
              </a>
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
