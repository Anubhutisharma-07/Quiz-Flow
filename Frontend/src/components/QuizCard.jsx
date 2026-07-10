import { Link } from 'react-router-dom'
import {
  Clock,
  ListChecks,
  ArrowRight,
  Play
} from 'lucide-react'

import Badge from './Badge'
import { cn, gradientFor } from '../utils/helpers'

export default function QuizCard({ quiz, index = 0, className }) {

  const grad = gradientFor(quiz.title)

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-card backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-fade-in',
        className,
      )}
      style={{
        animationDelay: `${Math.min(index, 8) * 60}ms`,
      }}
    >

      <div
        className={cn(
          'pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20',
          grad,
        )}
      />

      <div className="flex items-start justify-between">

        <span
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm',
            grad,
          )}
        >
          <Play className="h-5 w-5" fill="currentColor" />
        </span>

        <Badge variant="soft">
          Quiz
        </Badge>

      </div>

      <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
        {quiz.title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {quiz.description}
      </p>

      <div className="mt-5 flex items-center gap-4 text-xs text-slate-500">

        <span className="flex items-center gap-1">

          <ListChecks className="h-4 w-4" />

          {quiz.questions ? quiz.questions.length : 0} Questions

        </span>

        <span className="flex items-center gap-1">

          <Clock className="h-4 w-4" />

          15 min

        </span>

      </div>

      <Link
        to={`/quizzes/${quiz.quizId}`}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700"
      >

        Start Quiz

        <ArrowRight className="h-4 w-4" />

      </Link>

    </div>
  )
}