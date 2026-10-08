import { useReveal } from '../hooks/useReveal'

export default function ProcessStep({ step }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`process-item${visible ? ' in' : ''}`}>
      <div className="process-num">{step.num}</div>
      <div>
        <h3>{step.title}</h3>
        <p>{step.desc}</p>
      </div>
    </div>
  )
}
