import { useReveal } from '../hooks/useReveal'
import { useModal } from '../lib/modalStore'
import Icon from './Icon.jsx'

export default function ProjectCard({ project, visible: filterVisible }) {
  const [ref, revealed] = useReveal()
  const { openModal } = useModal()

  return (
    <div
      ref={ref}
      className={`project-card${revealed ? ' in' : ''}${filterVisible ? '' : ' hidden'}`}
      onClick={() => openModal(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(project) } }}
      aria-label={`View ${project.title}`}
    >
      {project.video ? (
        <video src={`${project.video}#t=1`} muted playsInline preload="metadata" poster={project.thumb} />
      ) : (
        <img src={project.thumb} alt={project.title} loading="lazy" />
      )}
      <div className="project-overlay">
        <div className="project-cat">{project.category.toUpperCase()}</div>
        <div className="project-title">{project.title}</div>
      </div>
      <div className="play-btn"><Icon name="play" size={18} /></div>
    </div>
  )
}
