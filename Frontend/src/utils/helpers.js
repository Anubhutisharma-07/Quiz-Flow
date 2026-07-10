/**
 * Tiny class-name joiner — filters falsy values and joins with spaces.
 * Keeps components free of clsx/cn dependencies.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Format seconds as mm:ss.
 */
export function formatTime(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds))
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

/**
 * Compact date formatter.
 */
export function formatDate(value) {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

/**
 * Relative-time helper ("2h ago", "just now").
 */
export function timeAgo(value) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  const diff = Date.now() - d.getTime()
  const sec = Math.floor(diff / 1000)
  if (sec < 60) return 'just now'
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}m ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h ago`
  const day = Math.floor(hr / 24)
  if (day < 30) return `${day}d ago`
  return formatDate(value)
}

/**
 * Initials from a full name (max 2 chars).
 */
export function initials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

/**
 * Deterministic gradient class from a string seed — used for quiz icon chips.
 */
export function gradientFor(seed = '') {
  const gradients = [
    'from-brand-500 to-accent-500',
    'from-sky-500 to-brand-500',
    'from-violet-500 to-fuchsia-500',
    'from-emerald-500 to-teal-500',
    'from-amber-500 to-orange-500',
    'from-rose-500 to-pink-500',
    'from-cyan-500 to-blue-500',
    'from-indigo-500 to-purple-500',
  ]
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return gradients[hash % gradients.length]
}

/**
 * Friendly difficulty styling map.
 */
export const difficultyStyles = {
  Easy: { label: 'Easy', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  Medium: { label: 'Medium', className: 'bg-amber-50 text-amber-700 ring-amber-200' },
  Hard: { label: 'Hard', className: 'bg-rose-50 text-rose-700 ring-rose-200' },
}

export function difficultyStyle(level) {
  return difficultyStyles[level] ?? difficultyStyles.Medium
}
