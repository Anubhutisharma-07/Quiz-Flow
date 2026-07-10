import { cn } from '../utils/helpers'

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger:
    'inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-rose-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2',
  outline:
    'inline-flex items-center justify-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-5 py-2.5 text-sm font-semibold text-brand-700 transition-all duration-200 hover:bg-brand-100 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2',
}

const sizes = {
  sm: 'px-3.5 py-2 text-xs',
  md: '',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  loading = false,
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(variants[variant] ?? variants.primary, sizes[size], className)}
      {...props}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
