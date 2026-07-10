import { useMemo } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { CircleCheck as CheckCircle2, Circle as XCircle, Trophy, Target, RotateCcw, ArrowLeft, Chrome as Home, Award, TrendingUp } from 'lucide-react'
import CircularProgress from '../components/CircularProgress'
import Button from '../components/Button'
import StatTile from '../components/StatTile'
import { useCountUp } from '../hooks/useCountUp'

export default function ResultPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const result = location.state?.result
  const quizTitle = location.state?.quizTitle || 'Quiz'
  const total = location.state?.total || result?.total || 0

  const correct = result?.correct ?? result?.score ?? 0
  const wrong = result?.wrong ?? total - correct
  const percentage = result?.percentage ?? (total > 0 ? Math.round((correct / total) * 100) : 0)

  const animatedPct = useCountUp(percentage, 1400)
  const animatedCorrect = useCountUp(correct, 1200)
  const animatedWrong = useCountUp(wrong, 1200)

  const { message, tone, Icon } = useMemo(() => {
    if (percentage >= 90) return { message: 'Outstanding! You aced this quiz.', tone: 'emerald', Icon: Trophy }
    if (percentage >= 75) return { message: 'Great job! You really know your stuff.', tone: 'brand', Icon: Award }
    if (percentage >= 60) return { message: 'Good effort! A little more practice and you\'ll master it.', tone: 'sky', Icon: Target }
    if (percentage >= 40) return { message: 'You\'re getting there. Review the material and try again.', tone: 'amber', Icon: TrendingUp }
    return { message: 'Keep going — every attempt makes you stronger.', tone: 'rose', Icon: Target }
  }, [percentage])

  const toneStyles = {
    emerald: { grad: 'from-emerald-500 to-teal-500', text: 'text-emerald-600' },
    brand: { grad: 'from-brand-500 to-accent-500', text: 'text-brand-600' },
    sky: { grad: 'from-sky-500 to-brand-500', text: 'text-sky-600' },
    amber: { grad: 'from-amber-500 to-orange-500', text: 'text-amber-600' },
    rose: { grad: 'from-rose-500 to-pink-500', text: 'text-rose-600' },
  }
  const { grad: gradClass, text: textClass } = toneStyles[tone] || toneStyles.brand

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-brand-soft px-6">
        <div className="glass-card max-w-md p-8 text-center">
          <Target className="mx-auto h-10 w-10 text-slate-400" />
          <h2 className="mt-4 font-display text-xl font-bold text-slate-900">No result to show</h2>
          <p className="mt-2 text-sm text-slate-500">Take a quiz to see your results here.</p>
          <Link to="/quizzes" className="mt-6 inline-block">
            <Button>Browse quizzes</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-brand-soft">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Header */}
        <div className="mb-8 text-center animate-fade-in">
          <span className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${gradClass} px-4 py-1.5 text-sm font-semibold text-white shadow-glow`}>

            <Icon className="h-4 w-4" />
            {quizTitle}
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Your Results
          </h1>
        </div>

        {/* Score card */}
        <div className="glass-card relative overflow-hidden p-8 text-center animate-fade-in-scale">
          <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${gradClass} opacity-10 blur-3xl`} />

          <CircularProgress value={animatedPct} size={200} strokeWidth={16}>
            <div className="text-center">
              <div className={`font-display text-5xl font-extrabold ${textClass}`}>
                {Math.round(animatedPct)}%
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Score
              </div>
            </div>
          </CircularProgress>

          <p className="mt-6 font-display text-lg font-bold text-slate-900">{message}</p>
          <p className="mt-1 text-sm text-slate-500">
            You answered {correct} out of {total} questions correctly.
          </p>
        </div>

        {/* Breakdown */}
        <div className="mt-6 grid grid-cols-3 gap-4 animate-fade-in animate-delay-200">
          <StatTile icon={CheckCircle2} label="Correct" value={Math.round(animatedCorrect)} tone="emerald" />
          <StatTile icon={XCircle} label="Wrong" value={Math.round(animatedWrong)} tone="rose" />
          <StatTile icon={Target} label="Total" value={total} tone="brand" />
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center animate-fade-in animate-delay-300">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate(`/quizzes/${id}`)}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="h-4 w-4" />
            Retry Quiz
          </Button>
          <Button
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Secondary link */}
        <div className="mt-6 text-center">
          <Link
            to="/quizzes"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Try another quiz
          </Link>
        </div>
      </div>
    </div>
  )
}
