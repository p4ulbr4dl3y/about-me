import { awards } from '../data/awards'
import { useLightbox } from './useLightbox'
import { resolveAsset } from '../utils/resolveAsset'

export function AwardsSection() {
  const { openLightbox } = useLightbox()

  return (
    <section className="awards-section" id="awards">
      <div className="awards-content">
        <h2 className="section-title">awards</h2>

        <div className="awards-card">
          <div className="awards-list">
            {awards.map((award) => (
              <button
                key={award.id}
                type="button"
                className="award-row"
                onClick={() =>
                  openLightbox(
                    resolveAsset(award.certificateSrc),
                    award.certificateAlt,
                  )
                }
                aria-label={`Открыть скан: ${award.title}`}
              >
                <span className="award-year">{award.year}</span>
                <span className="award-rank">
                  <span className="award-bracket">[</span>
                  {award.rank}
                  <span className="award-bracket">]</span>
                </span>
                <span className="award-title">{award.title}</span>
                <span className="award-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
