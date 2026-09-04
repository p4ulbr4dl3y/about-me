import type { Project } from '../data/projects'
import { AsciiDiagram } from './AsciiDiagram'
import { ImageWithLightbox } from './ImageWithLightbox'
import { useLightbox } from './useLightbox'
import { resolveAsset } from '../utils/resolveAsset'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { openLightbox } = useLightbox()

  return (
    <div className="project-card" id={project.id}>
      <div className="project-header">
        <div className="project-title-area">
          <h3>{project.title}</h3>
        </div>
        {project.tags && project.tags.length > 0 && (
          <div className="project-tags">
            {project.tags.map(tag => (
              <span key={tag} className="project-tag">
                <span className="project-tag-hash">#</span>{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="project-info-side">
        <div className="project-full-desc">
          {project.description.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
          {project.descriptionHtml && (
            <p dangerouslySetInnerHTML={{ __html: project.descriptionHtml }} />
          )}
        </div>

        {project.certificates && project.certificates.length > 0 && (
          <div className="project-cert-group">
            {project.certificates.map(cert => (
              <button
                key={cert.src}
                type="button"
                className="project-cert-btn"
                onClick={() => openLightbox(resolveAsset(cert.src), cert.title)}
                aria-label={`Открыть скан: ${cert.title}`}
              >
                <span>{cert.badge}</span>
                <span className="cert-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        )}

        {project.diagrams?.map(diagram => (
          <AsciiDiagram key={diagram.file} file={diagram.file} title={diagram.title} />
        ))}

        {project.images && project.images.length > 0 && (
          <div className={`inference-gallery ${project.images.length > 1 && !project.images[0].fullWidth ? 'inference-gallery-grid' : ''}`}>
            {project.images.map(image => (
              <ImageWithLightbox
                key={image.src}
                src={image.src}
                alt={image.alt}
                fullWidth={image.fullWidth}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
