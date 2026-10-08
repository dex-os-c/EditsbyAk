import { useCounter } from '../hooks/useCounter'

export default function StatCard({ stat, start }) {
  const value = useCounter({
    target: stat.target,
    start,
    decimals: stat.decimals || 0,
  })
  return (
    <div className={`stat-card${start ? ' in' : ''}`}>
      <div className="stat-num">{stat.prefix || ''}{value}{stat.suffix || ''}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  )
}
