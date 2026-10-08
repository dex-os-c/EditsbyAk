// Small inline icon set, matched 1:1 to the paths used in the original
// static site. Centralizing these means a service/price card just says
// `<Icon name="motion" />` instead of repeating a stroke-SVG block.
const PATHS = {
  video: <><rect x="2" y="5" width="15" height="14" rx="2" /><path d="M17 9l5-3v12l-5-3" /></>,
  reel: <><rect x="7" y="2" width="10" height="20" rx="3" /><path d="M12 18h.01" /></>,
  grade: <><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 000 18 5 5 0 000-10 3 3 0 010-6" /></>,
  motion: <path d="M4 17l6-6-6-6M12 19h8" />,
  thumbnail: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 15l5-5 4 4 6-6 3 3" /></>,
  collab: <path d="M21 11.5a8.4 8.4 0 01-9 8.4 8.5 8.5 0 01-4-1L3 20l1.1-4a8.4 8.4 0 01-1-4A8.4 8.4 0 0112 3.6a8.4 8.4 0 019 7.9z" />,
  festival: <path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" />,
  play: <path d="M8 5v14l11-7z" fill="currentColor" stroke="none" />,
  instagram: <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 6 10-6" /></>,
  phone: <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.7a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z" />,
  check: <path d="M20 6L9 17l-5-5" />,
}

export default function Icon({ name, size = 22, strokeWidth = 1.8, className }) {
  const path = PATHS[name]
  if (!path) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  )
}
