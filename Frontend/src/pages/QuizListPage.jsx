import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, SlidersHorizontal, ListChecks, X } from 'lucide-react'
import QuizCard from '../components/QuizCard'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import { quizService } from '../services'
import { cn, difficultyStyle } from '../utils/helpers'

const mockQuizzes = [
  { id: 1, title: 'JavaScript Fundamentals', description: 'Core concepts, types, and closures.', category: 'Programming', difficulty: 'Medium', totalQuestions: 10, durationMinutes: 15 },
  { id: 2, title: 'World History', description: 'From ancient civilizations to modern eras.', category: 'History', difficulty: 'Easy', totalQuestions: 12, durationMinutes: 20 },
  { id: 3, title: 'Data Structures', description: 'Arrays, trees, graphs, and complexity.', category: 'Computer Science', difficulty: 'Hard', totalQuestions: 15, durationMinutes: 30 },
  { id: 4, title: 'General Science', description: 'Physics, chemistry, and biology basics.', category: 'Science', difficulty: 'Easy', totalQuestions: 8, durationMinutes: 10 },
  { id: 5, title: 'React Deep Dive', description: 'Hooks, context, rendering, and patterns.', category: 'Programming', difficulty: 'Hard', totalQuestions: 14, durationMinutes: 25 },
  { id: 6, title: 'Geography Explorer', description: 'Capitals, rivers, mountains, and more.', category: 'Geography', difficulty: 'Easy', totalQuestions: 10, durationMinutes: 12 },
  { id: 7, title: 'Mathematics Basics', description: 'Algebra, geometry, and number theory.', category: 'Mathematics', difficulty: 'Medium', totalQuestions: 12, durationMinutes: 20 },
  { id: 8, title: 'Art & Culture', description: 'Renaissance to contemporary movements.', category: 'Art', difficulty: 'Medium', totalQuestions: 9, durationMinutes: 15 },
]

const categories = ['All', 'Programming', 'History', 'Science', 'Computer Science', 'Geography', 'Mathematics', 'Art']
const difficulties = ['All', 'Easy', 'Medium', 'Hard']

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState(mockQuizzes)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('All')

  useEffect(() => {
    let active = true
    setLoading(true)
    quizService
      .getQuizzes()
      .then((data) => {
        if (active && Array.isArray(data) && data.length) setQuizzes(data)
      })
      .catch(() => {})
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  const filtered = useMemo(() => {
    return quizzes.filter((q) => {
      const matchesQuery =
        !query ||
        q.title.toLowerCase().includes(query.toLowerCase()) ||
        q.description?.toLowerCase().includes(query.toLowerCase())
      const matchesCat = category === 'All' || q.category === category
      const matchesDiff = difficulty === 'All' || q.difficulty === difficulty
      return matchesQuery && matchesCat && matchesDiff
    })
  }, [quizzes, query, category, difficulty])

  const hasFilters = query || category !== 'All' || difficulty !== 'All'

  const clearFilters = () => {
    setQuery('')
    setCategory('All')
    setDifficulty('All')
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-extrabold text-slate-900">Browse Quizzes</h2>
        <p className="text-sm text-slate-500">Pick a quiz that matches your mood and skill level.</p>
      </div>

      {/* Search + filters */}
      <div className="glass-card p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search quizzes by title or topic..."
              className="input-field pl-11"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-slate-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All categories' : c}</option>
              ))}
            </select>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>{d === 'All' ? 'All levels' : d}</option>
              ))}
            </select>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="shrink-0">
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Quick difficulty chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {difficulties.map((d) => {
            const active = difficulty === d
            const ds = d !== 'All' ? difficultyStyle(d) : null
            return (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-semibold transition-all',
                  active
                    ? d === 'All'
                      ? 'bg-gradient-brand text-white shadow-glow'
                      : cn(ds.className, 'ring-2 ring-offset-1')
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                )}
              >
                {d}
              </button>
            )
          })}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {loading ? 'Loading quizzes...' : `${filtered.length} quiz${filtered.length === 1 ? '' : 'es'} found`}
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={ListChecks}
          title="No quizzes match your filters"
          description="Try adjusting your search or clearing filters to see more quizzes."
          action={<Button onClick={clearFilters}>Clear all filters</Button>}
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((q, i) => (
            <QuizCard key={q.id} quiz={q} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
