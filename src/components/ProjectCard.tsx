import type { Project } from '../data/projects'
import { AsciiDiagram } from './AsciiDiagram'
import { ImageWithLightbox } from './ImageWithLightbox'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="terminal-bar">
        <span className="terminal-dot red"></span>
        <span className="terminal-dot yellow"></span>
        <span className="terminal-dot green"></span>
        <span className="terminal-bar-text">{project.terminalTitle}</span>
      </div>
      <div className="project-header">
        <div className="project-title-area">
          <h3>{project.title}</h3>
        </div>
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
