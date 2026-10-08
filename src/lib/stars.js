const FULL = '★★★★★'

export function starRating(rating) {
  const r = Math.max(0, Math.min(5, Math.round(rating)))
  return { filled: FULL.slice(0, r), dim: FULL.slice(r) }
}
