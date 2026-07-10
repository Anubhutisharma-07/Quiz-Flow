import { Link } from 'react-router-dom'
import { ArrowLeft, CircleCheck as CheckCircle2 } from 'lucide-react'
import Logo from '../components/Logo'

const highlights = [
  'Adaptive quizzes that match your skill',
  'Track progress with detailed analytics',
  'Compete on leaderboards & earn badges',
]

/**
 * Split-screen auth layout: marketing panel on the left,
 * form content on the right. Collapses to single column on mobile.
 */
export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left brand panel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-brand lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-accent-400/20 blur-3xl" />

        <div className="relative z-10 flex h-full flex-col p-12">
          <Link to="/">
            <Logo textClassName="text-white" />
          </Link>

          <div className="my-auto max-w-md">
            <h2 className="font-display text-4xl font-extrabold leading-tight text-white">
              Master any subject, one quiz at a time.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              Join thousands of learners using QuizFlow to practice, measure progress, and stay
              motivated with beautifully crafted quizzes.
            </p>
            <ul className="mt-8 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-sm text-white/90">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-white" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <p className="relative z-10 text-xs text-white/60">
            &copy; {new Date().getFullYear()} QuizFlow. Crafted for modern learners.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full flex-col lg:w-1/2">
        <div className="flex items-center justify-between p-6 lg:hidden">
          <Link to="/">
            <Logo />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-12">
          <div className="w-full max-w-md animate-fade-in">
            <div className="mb-8 hidden lg:block">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
            </div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
              {title}
            </h1>
            {subtitle && <p className="mt-2 text-base text-slate-500">{subtitle}</p>}
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
