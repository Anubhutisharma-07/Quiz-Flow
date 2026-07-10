import { initials as toInitials } from '../utils/helpers'

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-20 w-20 text-2xl',
}

export default function Avatar({ name = '', src, size = 'md', className }) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-brand text-white font-semibold shadow-sm ring-2 ring-white ${sizes[size]} ${className ?? ''}`}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span>{toInitials(name) || '?'}</span>
      )}
    </div>
  )
}
