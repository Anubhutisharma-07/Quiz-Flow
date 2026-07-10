import { cn } from '../utils/helpers'

const variants = {
  info: 'border-brand-200 bg-brand-50 text-brand-800',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  error: 'border-rose-200 bg-rose-50 text-rose-800',
}

export default function Alert({ children, variant = 'info', icon: Icon, className }) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl border px-4 py-3 text-sm font-medium animate-fade-in',
        variants[variant],
        className,
      )}
      role="alert"
    >
      {Icon && <Icon className="mt-0.5 h-4 w-4 shrink-0" />}
      <div className="flex-1">{children}</div>
    </div>
  )
}
