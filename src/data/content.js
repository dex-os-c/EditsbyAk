// Real filenames from the client's original site. Each has a matching
// placeholder in public/assets/ as a fallback (see the onImgError helper
// in src/lib/media.js) so the site never shows a broken image before
// these are uploaded.
export const PROFILE_IMAGE = { src: '/assets/profile.jpg', fallback: '/assets/placeholder-profile.svg' }
export const CARD_IMAGE = { src: '/assets/card.png', fallback: '/assets/placeholder-card.svg' }

export const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Work' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
]

export const STATS = [
  { target: 2, suffix: '+', label: 'Years of Experience' },
  { target: 100, suffix: '+', label: 'Successful Projects' },
  { target: 98.9, suffix: '%', decimals: 1, label: 'Customer Satisfaction' },
  { target: 200, prefix: '₹', suffix: '+', label: 'Starting Reel Price' },
]

export const CAPABILITIES = [
  'Video Editing',
  'Reel Creation',
  'Short-form Content',
  'Cinematic Editing',
  'Color Grading',
  'Motion Graphics',
  'Thumbnail Design',
  'Social Media Content',
]

export const SERVICES = [
  {
    title: 'Video Editing',
    desc: 'Professional editing designed around storytelling, pacing and audience engagement.',
    icon: 'video',
  },
  {
    title: 'Reel Creation',
    desc: 'Fast-paced and engaging short-form content optimized for Instagram/Reels and social media.',
    icon: 'reel',
  },
  {
    title: 'Color Grading',
    desc: 'Cinematic color correction and grading to establish the right mood and visual identity.',
    icon: 'grade',
  },
  {
    title: 'Motion Graphics',
    desc: 'Dynamic titles, transitions, animations and visual effects.',
    icon: 'motion',
  },
  {
    title: 'Thumbnail Design',
    desc: 'Attention-grabbing thumbnails designed to improve visual appeal and click potential.',
    icon: 'thumbnail',
  },
  {
    title: 'Client Collaboration',
    desc: 'Clear, responsive communication from brief to delivery — revisions handled without friction.',
    icon: 'collab',
  },
]

// Filenames match the client's original site exactly (assets/wedding.mp4,
// assets/festival.mp4, etc.) -- see public/assets/README.md for where to
// drop the real files. `thumb` is only the fallback shown until the video
// loads (or if it 404s because the file hasn't been uploaded yet); once a
// real video is in place its own first frame is what visitors actually see.
export const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'festival', label: 'Festival' },
  { value: 'motion', label: 'Motion Graphics' },
  { value: 'reels', label: 'Insta Reels' },
]

export const PROJECTS = [
  {
    title: 'Wedding Edit',
    category: 'wedding',
    desc: 'Cinematic wedding highlight film — color graded and paced for emotion.',
    thumb: '/assets/placeholder-project.svg',
    video: '/assets/wedding.mp4',
  },
  {
    title: 'Festival Edit',
    category: 'festival',
    desc: 'High-energy festival recap cut synced to music and crowd moments.',
    thumb: '/assets/placeholder-project.svg',
    video: '/assets/festival.mp4',
  },
  {
    title: 'Motion Graphics Edit',
    category: 'motion',
    desc: 'Kinetic titles, transitions and animated visual effects showcase.',
    thumb: '/assets/placeholder-project.svg',
    video: '/assets/motion-graphics.mp4',
  },
  {
    title: 'Insta Reel Edit',
    category: 'reels',
    desc: 'Fast-paced short-form reel edited for maximum scroll-stop on Instagram.',
    thumb: '/assets/placeholder-project.svg',
    video: '/assets/insta-reel.mp4',
  },
]

// The cinematic showcase section's play button opens this in the shared
// project modal -- in the original static site that button had no click
// handler at all (just a decorative ripple), so clicking it silently did
// nothing. Drop a showreel.mp4 in public/assets/ to enable playback.
export const SHOWCASE_REEL = {
  title: 'Showcase Reel',
  desc: 'A quick look at the range of work AK EDITS takes on — weddings, festivals, reels and motion graphics.',
  thumb: '/assets/placeholder-profile.svg',
  video: '/assets/showreel.mp4',
}

export const PRICING = [
  { title: 'Insta Reel — Basic Edit', amounts: [{ target: 200, prefix: '₹' }], note: 'Flat Starting Price', icon: 'reel' },
  { title: 'Professional Edits', amounts: [{ target: 500, prefix: '₹' }, { target: 1000, prefix: '₹' }], separator: '–', note: 'Price Range', icon: 'video' },
  { title: 'Cinematic Edits', amounts: [{ target: 500, prefix: '₹' }], note: 'Starting From', icon: 'grade' },
  { title: 'Festival Edits', amounts: [{ target: 300, prefix: '₹' }], note: 'Starting From', icon: 'festival' },
  { title: 'Motion Graphics', amounts: [{ target: 500, prefix: '₹' }], note: 'Starting From', icon: 'motion' },
  { title: 'Thumbnails', amounts: [{ target: 200, prefix: '₹' }], note: 'Starting From', icon: 'thumbnail' },
]

export const PROCESS = [
  { num: '01', title: 'Discuss', desc: "Understand the client's idea and requirements." },
  { num: '02', title: 'Plan', desc: 'Develop the editing direction and visual style.' },
  { num: '03', title: 'Edit', desc: 'Transform the footage with professional editing.' },
  { num: '04', title: 'Refine', desc: 'Color grading, motion graphics, sound and final polishing.' },
  { num: '05', title: 'Deliver', desc: 'Deliver the final video ready for the intended platform.' },
]

export const CONTACT = {
  phone: '+91 63822 80785',
  phoneHref: 'tel:+916382280785',
  email: 'anjanumar10@gmail.com',
  location: 'Periyar Nagar, Hosur',
  // TODO: replace with the real Instagram profile URL.
  instagram: '#',
  instagramHandle: '@ak.__edits',
}
