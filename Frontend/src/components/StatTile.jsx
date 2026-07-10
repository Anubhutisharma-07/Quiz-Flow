import { cn } from '../utils/helpers'

/**
 * Reusable stat tile for use inside cards/lists.
 */
export default function StatTile({ icon: Icon, label, value, tone = 'brand', className }) {
  const tones = {
    brand: 'bg-brand-50 text-brand-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    rose: 'bg-rose-50 text-rose-600',
    amber: 'bg-amber-50 text-amber-600',
    slate: 'bg-slate-100 text-slate-600',
  }
  return (
    <div className={cn('flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3', className)}>
      <span className={cn('flex h-9 w-9 items-center justify-center rounded-lg', tones[tone])}>
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="font-display text-lg font-bold leading-none text-slate-900">{value}</div>
        <div className="mt-1 text-xs text-slate-500">{label}</div>
      </div>
    </div>
  )
}
