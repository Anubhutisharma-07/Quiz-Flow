import { useEffect, useMemo, useState, useCallback } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Clock, ChevronLeft, ChevronRight, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Loader as Loader2, ArrowLeft, ListChecks } from 'lucide-react'
import { quizService } from '../services'
import { useCountdown } from '../hooks/useCountdown'
import { formatTime, cn, gradientFor } from '../utils/helpers'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import Alert from '../components/Alert'
import { useAuth } from '../context/AuthContext'

// Mock quiz for graceful fallback when the backend isn't reachable yet.
const mockQuiz = {
  id: 1,
  title: 'JavaScript Fundamentals',
  description: 'Core concepts, types, and closures.',
  category: 'Programming',
  difficulty: 'Medium',
  totalQuestions: 10,
  durationMinutes: 15,
  questions: [
    { id: 1, text: 'Which keyword declares a block-scoped variable?', options: [{ id: 'a', text: 'var' }, { id: 'b', text: 'let' }, { id: 'c', text: 'function' }, { id: 'd', text: 'global' }], correctOptionId: 'b' },
    { id: 2, text: 'What does "===" check in JavaScript?', options: [{ id: 'a', text: 'Value only' }, { id: 'b', text: 'Type only' }, { id: 'c', text: 'Value and type' }, { id: 'd', text: 'Reference address' }], correctOptionId: 'c' },
    { id: 3, text: 'Which method adds an element to the end of an array?', options: [{ id: 'a', text: 'push()' }, { id: 'b', text: 'shift()' }, { id: 'c', text: 'concat()' }, { id: 'd', text: 'slice()' }], correctOptionId: 'a' },
    { id: 4, text: 'What is a closure in JavaScript?', options: [{ id: 'a', text: 'A loop construct' }, { id: 'b', text: 'A function with access to its outer scope' }, { id: 'c', text: 'A type of array' }, { id: 'd', text: 'A class modifier' }], correctOptionId: 'b' },
    { id: 5, text: 'Which value is falsy in JavaScript?', options: [{ id: 'a', text: '"0"' }, { id: 'b', text: '[]' }, { id: 'c', text: '0' }, { id: 'd', text: '{}' }], correctOptionId: 'c' },
  ],
}

export default function QuizAttemptPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    quizService
      .getQuiz(id)
      .then((data) => {
        console.log(data)
        if (!active) return
        if (data && data.questions?.length) setQuiz(data)
        else setError('This quiz has no questions yet.')
      })
      .catch(() => {
        if (!active) return
        // Fallback to mock for demo when backend not connected
        setQuiz({ ...mockQuiz, id: Number(id) || 1 })
      })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [id])

  const totalSeconds = (quiz?.durationMinutes || 15) * 60
  const remaining = useCountdown(totalSeconds, {
    active: Boolean(quiz) && !submitting,
    onComplete: () => handleSubmit(true),
  })

  const questions = (quiz?.questions ?? []).map((q) => ({
  id: q.questionId,
  text: q.questionText,

  options: [
    { id: "A", text: q.optionA },
    { id: "B", text: q.optionB },
    { id: "C", text: q.optionC },
    { id: "D", text: q.optionD },
  ],

  correctAnswer: q.correctAnswer,
}))
  const total = questions.length
  const question = questions[current]
  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount === total

  const selectOption = useCallback((questionId, optionId) => {
    setAnswers((a) => ({ ...a, [questionId]: optionId }))
  }, [])

  const goNext = () => setCurrent((c) => Math.min(total - 1, c + 1))
  const goPrev = () => setCurrent((c) => Math.max(0, c - 1))

  const handleSubmit = async (auto = false) => {
    if (!quiz) return
    if (!auto && !allAnswered) {
      setShowConfirm(true)
      return
    }
    setSubmitting(true)
    setShowConfirm(false)
    try {
      const payload = {
        userId: user.userId,
        quizId: quiz.quizId,
        answers: questions.map((q) => ({
          questionId: q.id,
          selectedAnswer:
            q.options.find((opt) => opt.id === answers[q.id])?.text || "",
        })),
      }

      const result = await quizService.submitQuiz(payload)
      const resultId = result?.resultId ?? result?.id ?? 'latest'
      navigate(`/quizzes/${quiz.quizId}/result`, {
        state: { result, quizTitle: quiz.title, total: total },
      })
    } catch (err) {
      // Backend not connected — compute locally from mock for a graceful demo
      const correct = questions.filter((q) => {
  const selected = q.options.find(opt => opt.id === answers[q.id])?.text
  return selected === q.correctAnswer
}).length
      const wrong = total - correct
      const percentage = Math.round((correct / total) * 100)
      navigate(`/quizzes/${quiz.quizId}/result`, {
        state: {
          result: { score: correct, total, percentage, correct, wrong },
          quizTitle: quiz.title,
          total,
        },
      })
    } finally {
      setSubmitting(false)
    }
  }

  const lowTime = remaining <= 30

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-brand-soft">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
          <p className="text-sm font-medium text-slate-500">Loading your quiz...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-brand-soft px-6">
        <div className="glass-card max-w-md p-8 text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-rose-500" />
          <h2 className="mt-4 font-display text-xl font-bold text-slate-900">{error}</h2>
          <Link to="/quizzes" className="mt-6 inline-block">
            <Button variant="secondary">Back to quizzes</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-brand-soft">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link to="/quizzes" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Exit quiz</span>
          </Link>
          <div className="min-w-0 flex-1 px-4 text-center">
            <p className="truncate font-display text-sm font-bold text-slate-900 sm:text-base">{quiz.title}</p>
          </div>
          <div className={cn(
            'inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-bold tabular-nums transition-colors',
            lowTime ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-brand-50 text-brand-700',
          )}>
            <Clock className="h-4 w-4" />
            {formatTime(remaining)}
          </div>
        </div>
        {/* Progress */}
        <div className="mx-auto max-w-4xl px-4 pb-3 sm:px-6">
          <ProgressBar value={answeredCount} max={total} size="sm" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Question counter + palette */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-white">
              {current + 1}
            </span>
            of {total}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {questions.map((q, i) => {
              const answered = Boolean(answers[q.id])
              const isCurrent = i === current
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all',
                    isCurrent
                      ? 'bg-gradient-brand text-white shadow-glow ring-2 ring-brand-300 ring-offset-1'
                      : answered
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50',
                  )}
                  aria-label={`Go to question ${i + 1}`}
                >
                  {answered && !isCurrent ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </button>
              )
            })}
          </div>
        </div>

        {/* Question card */}
        {question && (
          <div key={question.id} className="glass-card animate-fade-in-scale p-6 sm:p-8">
            <div className="mb-2 flex items-center gap-2">
              <span className={cn('inline-flex h-7 items-center rounded-full bg-gradient-to-r px-2.5 text-xs font-bold text-white', gradientFor(quiz.category))}>
                <ListChecks className="mr-1 h-3.5 w-3.5" />
                {quiz.category}
              </span>
              <span className="text-xs font-medium text-slate-400">Question {current + 1}</span>
            </div>
            <h2 className="font-display text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
              {question.text}
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {question.options.map((opt, i) => {
                const selected = answers[question.id] === opt.id
                return (
                  <button
                    key={opt.id}
                    onClick={() => selectOption(question.id, opt.id)}
                    className={cn(
                      'group flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200',
                      selected
                        ? 'border-brand-500 bg-brand-50 shadow-glow'
                        : 'border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50/40',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all',
                        selected
                          ? 'bg-gradient-brand text-white'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-brand-100 group-hover:text-brand-600',
                      )}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className={cn('text-sm font-medium', selected ? 'text-brand-900' : 'text-slate-700')}>
                      {opt.text}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Nav controls */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="secondary"
            onClick={goPrev}
            disabled={current === 0}
            className="w-full sm:w-auto"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <p className="order-first text-center text-xs text-slate-400 sm:order-none">
            {answeredCount} of {total} answered
          </p>

          {current < total - 1 ? (
            <Button onClick={goNext} className="w-full sm:w-auto">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={() => handleSubmit(false)} loading={submitting} className="w-full sm:w-auto">
              <CheckCircle2 className="h-4 w-4" />
              Submit Quiz
            </Button>
          )}
        </div>

        {/* Confirm submit modal */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-card-hover animate-fade-in-scale">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="text-center font-display text-lg font-bold text-slate-900">
                Submit without answering all questions?
              </h3>
              <p className="mt-2 text-center text-sm text-slate-500">
                You've answered {answeredCount} of {total} questions. Unanswered questions will be
                marked as incorrect.
              </p>
              <div className="mt-6 flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setShowConfirm(false)}>
                  Keep going
                </Button>
                <Button className="flex-1" onClick={() => handleSubmit(false)} loading={submitting}>
                  Submit anyway
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
