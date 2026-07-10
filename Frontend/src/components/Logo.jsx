import { cn } from '../utils/helpers'

export default function Logo({ className, showText = true, textClassName }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-brand shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" aria-hidden="true">
          <path
            d="M5 7h14M5 12h9M5 17h6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="18" cy="15.5" r="3.2" fill="white" />
          <path
            d="M16.8 15.5l1.1 1.1 1.9-1.9"
            stroke="#4f46e5"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      {showText && (
        <span className={cn('font-display text-lg font-extrabold tracking-tight text-slate-900', textClassName)}>
          Quiz<span className="gradient-text">Flow</span>
        </span>
      )}
    </div>
  )
}
