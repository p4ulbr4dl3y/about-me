import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-content">
        <h2 className="section-title">projects</h2>

        <div className="projects-list">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
