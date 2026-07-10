import { Link } from 'react-router-dom'
import {
  Trophy, ListChecks, Target, Flame, ArrowRight, Clock, TrendingUp, Sparkles,
} from 'lucide-react'
import StatCard from '../components/StatCard'
import QuizCard from '../components/QuizCard'
import Card, { CardHeader } from '../components/Card'
import EmptyState from '../components/EmptyState'
import ProgressBar from '../components/ProgressBar'
import Badge from '../components/Badge'
import { useAuth } from '../context/AuthContext'
import { quizService, userService } from '../services'
import { useEffect, useState } from 'react'
import { timeAgo, difficultyStyle, gradientFor, cn } from '../utils/helpers'

// Fallback mock data — used until the Spring Boot backend is connected.
const mockQuizzes = [
  { id: 1, title: 'JavaScript Fundamentals', description: 'Core concepts, types, and closures.', category: 'Programming', difficulty: 'Medium', totalQuestions: 10, durationMinutes: 15 },
  { id: 2, title: 'World History', description: 'From ancient civilizations to modern eras.', category: 'History', difficulty: 'Easy', totalQuestions: 12, durationMinutes: 20 },
  { id: 3, title: 'Data Structures', description: 'Arrays, trees, graphs, and complexity.', category: 'Computer Science', difficulty: 'Hard', totalQuestions: 15, durationMinutes: 30 },
  { id: 4, title: 'General Science', description: 'Physics, chemistry, and biology basics.', category: 'Science', difficulty: 'Easy', totalQuestions: 8, durationMinutes: 10 },
]

const mockAttempts = [
  { id: 101, quizTitle: 'JavaScript Fundamentals', score: 8, total: 10, percentage: 80, completedAt: new Date(Date.now() - 3600_000).toISOString() },
  { id: 102, quizTitle: 'World History', score: 11, total: 12, percentage: 92, completedAt: new Date(Date.now() - 86400_000).toISOString() },
  { id: 103, quizTitle: 'General Science', score: 6, total: 8, percentage: 75, completedAt: new Date(Date.now() - 2 * 86400_000).toISOString() },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [quizzes, setQuizzes] = useState(mockQuizzes)
  const [attempts, setAttempts] = useState(mockAttempts)
  const [stats, setStats] = useState({ totalQuizzes: 24, avgScore: 87, currentStreak: 12, bestScore: 100 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    Promise.allSettled([
      quizService.getQuizzes({ limit: 3 }),
      userService.getRecentAttempts(4),
      userService.getStats(),
    ]).then(([q, a, s]) => {
      if (!active) return
      if (q.status === 'fulfilled' && Array.isArray(q.value) && q.value.length) setQuizzes(q.value.slice(0, 3))
      if (a.status === 'fulfilled' && Array.isArray(a.value) && a.value.length) setAttempts(a.value.slice(0, 4))
      if (s.status === 'fulfilled' && s.value) setStats(s.value)
      setLoading(false)
    })
    return () => { active = false }
  }, [])

  const firstName = (user?.fullName || user?.name || 'there').split(' ')[0]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 sm:p-8 shadow-glow">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-12 left-1/3 h-40 w-40 rounded-full bg-accent-300/20 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              {greeting()}
            </div>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">
              Welcome back, {firstName}!
            </h2>
            <p className="mt-1.5 max-w-md text-sm text-white/85">
              You're on a {stats.currentStreak}-day streak. Keep the momentum going — pick up where
              you left off or try something new.
            </p>
          </div>
          <Link to="/quizzes">
            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
              Browse Quizzes
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={ListChecks} label="Quizzes Taken" value={stats.totalQuizzes} accent="brand" delay={0} />
        <StatCard icon={Target} label="Avg. Score" value={`${stats.avgScore}%`} accent="sky" delay={80} />
        <StatCard icon={Flame} label="Current Streak" value={`${stats.currentStreak}d`} accent="amber" delay={160} />
        <StatCard icon={Trophy} label="Best Score" value={`${stats.bestScore}%`} accent="emerald" delay={240} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Available quizzes */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-slate-900">Available Quizzes</h3>
            <Link to="/quizzes" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {quizzes.slice(0, 4).map((q, i) => (
              <QuizCard key={q.quizid} quiz={q} index={i} />
            ))}
          </div>
        </div>

        {/* Recent attempts */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-slate-900">Recent Attempts</h3>
          </div>
          <Card className="p-0">
            {attempts.length === 0 ? (
              <EmptyState
                icon={Clock}
                title="No attempts yet"
                description="Your quiz history will appear here once you complete a quiz."
                action={<Link to="/quizzes"><button className="btn-primary">Start a quiz</button></Link>}
              />
            ) : (
              <ul className="divide-y divide-slate-100">
                {attempts.map((att) => {
                  const passed = att.percentage >= 60
                  return (
                    <li key={att.id} className="flex items-center gap-3 p-4 transition-colors hover:bg-slate-50/60">
                      <span
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white',
                          gradientFor(att.quizTitle),
                        )}
                      >
                        <TrendingUp className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">{att.quizTitle}</p>
                        <p className="text-xs text-slate-500">{timeAgo(att.completedAt)}</p>
                      </div>
                      <div className="text-right">
                        <div className={cn('text-sm font-bold', passed ? 'text-emerald-600' : 'text-rose-600')}>
                          {att.percentage}%
                        </div>
                        <div className="text-xs text-slate-400">{att.score}/{att.total}</div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}
