import { Link } from 'react-router-dom'
import { cn } from '../utils/helpers'

export default function StatCard({ icon: Icon, label, value, sub, accent = 'brand', delay = 0 }) {
  const accents = {
    brand: 'from-brand-500 to-accent-500 text-white',
    sky: 'from-sky-500 to-brand-500 text-white',
    emerald: 'from-emerald-500 to-teal-500 text-white',
    amber: 'from-amber-500 to-orange-500 text-white',
    rose: 'from-rose-500 to-pink-500 text-white',
  }
  return (
    <div
      className="glass-card group p-5 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm',
            accents[accent],
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        {sub && (
          <span className="text-xs font-medium text-slate-400 transition-colors group-hover:text-slate-500">
            {sub}
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="font-display text-3xl font-extrabold text-slate-900">{value}</div>
        <div className="mt-1 text-sm font-medium text-slate-500">{label}</div>
      </div>
    </div>
  )
}

export function StatLink({ to, children }) {
  return (
    <Link to={to} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
      {children}
    </Link>
  )
}
