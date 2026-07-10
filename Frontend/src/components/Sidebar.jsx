import { NavLink, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  ListChecks,
  UserRound,
  LogOut,
  Sparkles,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { navItems } from '../routes/nav'
import { cn } from '../utils/helpers'
import Logo from './Logo'
import Avatar from './Avatar'

const iconMap = { LayoutDashboard, ListChecks, UserRound }

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200/70 bg-white/80 backdrop-blur-xl transition-transform duration-300 ease-out lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between px-5">
          <Link to="/dashboard" onClick={onClose}>
            <Logo />
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Menu
          </p>
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] ?? LayoutDashboard
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-gradient-brand text-white shadow-glow'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn(
                        'h-5 w-5 transition-transform duration-200 group-hover:scale-110',
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand-500',
                      )}
                    />
                    {item.label}
                  </>
                )}
              </NavLink>
            )
          })}

          {/* Promo card */}
          <div className="mt-6 overflow-hidden rounded-2xl bg-gradient-brand p-4 text-white shadow-glow">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Pro Tip</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-white/90">
              Take quizzes daily to build streaks and climb the leaderboard.
            </p>
          </div>
        </nav>

        {/* User footer */}
        <div className="border-t border-slate-200/70 p-3">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <Avatar name={user?.fullName || user?.name || 'User'} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                {user?.fullName || user?.name || 'User'}
              </p>
              <p className="truncate text-xs text-slate-500">{user?.email || ''}</p>
            </div>
            <button
              onClick={logout}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
              aria-label="Log out"
              title="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
