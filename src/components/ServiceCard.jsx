import { useReveal } from '../hooks/useReveal'
import Icon from './Icon.jsx'

export default function ServiceCard({ service }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`service-card${visible ? ' in' : ''}`}>
      <div className="service-icon"><Icon name={service.icon} /></div>
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
    </div>
  )
}
