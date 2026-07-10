import { cn } from '../utils/helpers'

/**
 * Progress bar with gradient fill and smooth width transition.
 */
export default function ProgressBar({ value = 0, max = 100, className, showLabel = false, size = 'md' }) {
  const pct = Math.min(100, Math.max(0, max > 0 ? (value / max) * 100 : 0))
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3.5' }
  return (
    <div className={cn('w-full', className)}>
      <div className={cn('relative w-full overflow-hidden rounded-full bg-slate-200', heights[size])}>
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-brand transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1.5 flex justify-between text-xs font-medium text-slate-500">
          <span>{Math.round(pct)}%</span>
          <span>
            {value}/{max}
          </span>
        </div>
      )}
    </div>
  )
}
