import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { cn } from '../utils/helpers'

const links = [
  { to: '/', label: 'Home' },
  { to: '/#features', label: 'Features' },
  { to: '/#stats', label: 'Stats' },
  { to: '/#testimonials', label: 'Reviews' },
]

export default function PublicLayout({ children }) {
  const { isAuthenticated } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-white">
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300',
          scrolled ? 'border-b border-slate-200/70 bg-white/80 backdrop-blur-xl' : 'bg-transparent',
        )}
      >
        <div className="section-container flex h-16 items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="sm">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-b border-slate-200 bg-white md:hidden animate-fade-in">
            <nav className="section-container flex flex-col gap-1 py-3">
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2 px-1">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="flex-1">
                    <Button size="sm" className="w-full">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full">
                        Sign in
                      </Button>
                    </Link>
                    <Link to="/register" className="flex-1">
                      <Button size="sm" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>
    </div>
  )
}
