import { SERVICES } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import ServiceCard from './ServiceCard.jsx'
import './Services.css'

export default function Services() {
  const [headRef, headVisible] = useReveal()

  return (
    <section id="services">
      <div className="container">
        <div ref={headRef} className={`section-head reveal${headVisible ? ' in' : ''}`}>
          <span className="kicker">What I Do</span>
          <h2>Services</h2>
        </div>
        <div className="services-grid">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
