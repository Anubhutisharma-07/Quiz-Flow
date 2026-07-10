import { cn } from '../utils/helpers'

/**
 * Glassmorphism card with optional hover lift and gradient border.
 */
export default function Card({ children, className, hover = false, glow = false, ...props }) {
  return (
    <div
      className={cn(
        'glass-card p-6 transition-all duration-300',
        hover && 'hover:shadow-card-hover hover:-translate-y-1',
        glow && 'shadow-glow',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, icon: Icon, action }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {Icon && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand-soft text-brand-600">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div>
          <h3 className="font-display text-lg font-bold text-slate-900">{title}</h3>
          {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}
