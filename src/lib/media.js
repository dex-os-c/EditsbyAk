// Swaps an <img> to its placeholder if the real file 404s (not uploaded
// yet), and marks it so it only ever tries once -- otherwise a missing
// placeholder would itself 404 into an infinite error loop.
export function onImgError(fallbackSrc) {
  return (e) => {
    if (e.target.dataset.fallbackApplied) return
    e.target.dataset.fallbackApplied = 'true'
    e.target.src = fallbackSrc
  }
}
