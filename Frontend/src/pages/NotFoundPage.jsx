import { Link } from 'react-router-dom'
import { Chrome as Home, Compass } from 'lucide-react'
import Button from '../components/Button'
import Logo from '../components/Logo'

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-brand-soft px-6 text-center">
      <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-60" />
      <div className="absolute -left-20 top-20 -z-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl animate-float" />
      <div className="absolute -right-16 bottom-20 -z-10 h-80 w-80 rounded-full bg-accent-200/40 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <Link to="/" className="mb-10">
        <Logo />
      </Link>

      <div className="relative">
        <p className="font-display text-[120px] font-extrabold leading-none gradient-text sm:text-[180px]">
          404
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <Compass className="h-16 w-16 text-brand-400/30 animate-spin-slow sm:h-24 sm:w-24" />
        </div>
      </div>

      <h1 className="mt-4 font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-slate-600">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/">
          <Button size="lg" className="w-full sm:w-auto">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
