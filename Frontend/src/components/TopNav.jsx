import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, Search, Bell, LogOut, UserRound, Settings, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Avatar from './Avatar'

export default function TopNav({ onMenuClick, title = 'Dashboard' }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200/70 bg-white/70 px-4 backdrop-blur-xl sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate font-display text-lg font-bold text-slate-900 sm:text-xl">{title}</h1>
      </div>

      {/* Search (decorative on small screens) */}
      <div className="relative hidden md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search quizzes..."
          className="w-56 rounded-xl border border-slate-200 bg-white/70 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 transition-all focus:w-72 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100 lg:w-64"
        />
      </div>

      {/* Notifications */}
      <button
        className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
      </button>

      {/* Profile dropdown */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex items-center gap-2 rounded-xl p-1 pr-2 transition-colors hover:bg-slate-100"
          aria-label="Account menu"
        >
          <Avatar name={user?.fullName || user?.name || 'User'} size="sm" />
          <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 origin-top-right overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-card-hover animate-fade-in-scale">
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="truncate text-sm font-semibold text-slate-900">
                {user?.fullName || user?.name || 'User'}
              </p>
              <p className="truncate text-xs text-slate-500">{user?.email || ''}</p>
            </div>
            <div className="p-1.5">
              <Link
                to="/profile"
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                <UserRound className="h-4 w-4 text-slate-400" />
                My Profile
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                <Settings className="h-4 w-4 text-slate-400" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
