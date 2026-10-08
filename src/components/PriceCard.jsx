import { Fragment } from 'react'
import { useCounter } from '../hooks/useCounter'
import { useReveal } from '../hooks/useReveal'
import Icon from './Icon.jsx'

function PriceAmount({ amount, start, delay }) {
  const value = useCounter({ target: amount.target, start, duration: 1300, delay })
  return <span className="price-num">{amount.prefix || ''}{value}{amount.suffix || ''}</span>
}

export default function PriceCard({ plan, index }) {
  const [ref, visible] = useReveal()

  return (
    <div ref={ref} className={`price-card${visible ? ' in' : ''}`}>
      <div className="price-icon"><Icon name={plan.icon} size={20} /></div>
      <h3>{plan.title}</h3>
      <div className="price-amount">
        {plan.amounts.map((amount, i) => (
          <Fragment key={i}>
            {i > 0 && <span className="price-sep">{plan.separator}</span>}
            <PriceAmount amount={amount} start={visible} delay={index * 90} />
          </Fragment>
        ))}
      </div>
      <p className="price-note">{plan.note}</p>
    </div>
  )
}
