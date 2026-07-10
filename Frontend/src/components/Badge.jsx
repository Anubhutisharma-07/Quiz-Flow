import { cn } from '../utils/helpers'

const variants = {
  solid: 'bg-gradient-brand text-white',
  soft: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200',
  neutral: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  warning: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  danger: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200',
}

const sizes = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-xs',
  lg: 'px-4 py-2 text-sm',
}

export default function Badge({ children, variant = 'soft', size = 'md', className, icon: Icon }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-semibold',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </span>
  )
}
