import { useState } from 'react'
import { FILTERS, PROJECTS } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import ProjectCard from './ProjectCard.jsx'
import './Portfolio.css'

export default function Portfolio() {
  const [headRef, headVisible] = useReveal()
  const [filter, setFilter] = useState('all')

  return (
    <section id="portfolio">
      <div className="container">
        <div ref={headRef} className={`section-head reveal${headVisible ? ' in' : ''}`}>
          <span className="kicker">Selected Projects</span>
          <h2>My Work</h2>
        </div>
        <div className="filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter-btn${filter === f.value ? ' active' : ''}`}
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="portfolio-grid">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              visible={filter === 'all' || project.category === filter}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
