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
                Пишу код с 2019 года: прошёл путь от простых скриптов и ботов
                до бэкенд-архитектуры и машинного обучения.
              </p>
              <p>
                Учусь на 4 курсе САФУ («Интеллектуальные системы и машинное
                обучение»).
              </p>
              <p>
                Специализируюсь на внедрении ML в реальные сервисы: строю
                надежные пайплайны, работаю с большими моделями и вывожу их в прод.
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
