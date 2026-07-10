import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Brain, ChartLine as LineChart, Trophy, Zap, ShieldCheck, Clock, Users, Star, Quote, CircleCheck as CheckCircle2, Play } from 'lucide-react'
import PublicLayout from '../layouts/PublicLayout'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { useCountUp } from '../hooks/useCountUp'

const features = [
  {
    icon: Brain,
    title: 'Smart Question Banks',
    desc: 'Curated questions across dozens of categories, tagged by difficulty and skill to target exactly what you need to learn.',
  },
  {
    icon: LineChart,
    title: 'Detailed Analytics',
    desc: 'Track every attempt with rich charts and insights. See strengths, weaknesses, and trends over time at a glance.',
  },
  {
    icon: Trophy,
    title: 'Leaderboards & Streaks',
    desc: 'Stay motivated with streaks, badges, and competitive leaderboards that turn practice into a habit you enjoy.',
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    desc: 'Get immediate results after every quiz with explanations, score breakdowns, and recommendations for what to study next.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Reliable',
    desc: 'JWT-secured sessions and a robust backend keep your progress safe. Focus on learning — we handle the rest.',
  },
  {
    icon: Clock,
    title: 'Learn Anywhere, Anytime',
    desc: 'A fully responsive experience means your quizzes are always one tap away, on any device, online or offline-ready.',
  },
]

const stats = [
  { label: 'Active Learners', value: 125000, suffix: '+', icon: Users },
  { label: 'Quizzes Completed', value: 840000, suffix: '+', icon: CheckCircle2 },
  { label: 'Avg. Score Lift', value: 32, suffix: '%', icon: LineChart },
  { label: 'Questions Available', value: 15000, suffix: '+', icon: Brain },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CS Student, MIT',
    quote: 'QuizFlow completely changed how I prep for exams. The analytics show me exactly where I\'m weak, and the streaks keep me consistent.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop',
  },
  {
    name: 'Marcus Reed',
    role: 'Frontend Engineer',
    quote: 'I use it to keep my technical skills sharp. The question quality is genuinely high and the UI is the cleanest I\'ve seen in a quiz app.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop',
  },
  {
    name: 'Aisha Patel',
    role: 'Product Manager',
    quote: 'Our team adopted QuizFlow for weekly knowledge checks. Engagement went way up and the dashboard makes progress easy to celebrate.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop',
  },
]

function StatBlock({ stat, index }) {
  const val = useCountUp(stat.value, 1500 + index * 120)
  const display =
    stat.value >= 1000 ? `${Math.round(val).toLocaleString()}` : Math.round(val).toString()
  return (
    <div
      className="glass-card flex flex-col items-center gap-2 p-6 text-center animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
        <stat.icon className="h-5 w-5" />
      </span>
      <div className="font-display text-4xl font-extrabold gradient-text">
        {display}
        {stat.suffix}
      </div>
      <div className="text-sm font-medium text-slate-500">{stat.label}</div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <PublicLayout>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-44">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-70" />
        <div className="absolute -left-20 top-20 -z-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl animate-float" />
        <div className="absolute -right-16 top-40 -z-10 h-80 w-80 rounded-full bg-accent-200/40 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="section-container text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-700 backdrop-blur animate-fade-in">
            <Sparkles className="h-4 w-4" />
            Learn smarter, not harder
          </div>

          <h1 className="mx-auto max-w-4xl font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 animate-fade-in sm:text-6xl lg:text-7xl">
            The modern way to
            <span className="block gradient-text">master any subject</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 animate-fade-in animate-delay-200">
            QuizFlow turns studying into a delightful habit. Take beautifully crafted quizzes, track
            your progress with rich analytics, and stay motivated with streaks and leaderboards.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 animate-fade-in animate-delay-300 sm:flex-row">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <Play className="h-4 w-4" />
                Sign in
              </Button>
            </Link>
          </div>

          <p className="mt-5 text-xs text-slate-400 animate-fade-in animate-delay-500">
            No credit card required. Start your first quiz in under a minute.
          </p>

          {/* Floating preview card */}
          <div className="relative mx-auto mt-16 max-w-5xl animate-fade-in-scale animate-delay-500">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-brand opacity-20 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-card-hover backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs font-medium text-slate-400">quizflow.app/dashboard</span>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-3">
                {[
                  { label: 'Quizzes Taken', val: '24', tone: 'from-brand-500 to-accent-500' },
                  { label: 'Avg. Score', val: '87%', tone: 'from-emerald-500 to-teal-500' },
                  { label: 'Current Streak', val: '12 days', tone: 'from-amber-500 to-orange-500' },
                ].map((m) => (
                  <div key={m.label} className="rounded-2xl border border-slate-100 bg-white p-5 text-left">
                    <div className={`mb-3 h-1.5 w-12 rounded-full bg-gradient-to-r ${m.tone}`} />
                    <div className="font-display text-3xl font-extrabold text-slate-900">{m.val}</div>
                    <div className="mt-1 text-xs font-medium text-slate-500">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section id="stats" className="relative py-20">
        <div className="section-container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Trusted by learners worldwide
            </h2>
            <p className="mt-3 text-slate-600">
              Real numbers from a community that loves to learn.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s, i) => (
              <StatBlock key={s.label} stat={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="relative py-20">
        <div className="section-container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              <Zap className="h-3.5 w-3.5" />
              Features
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to learn faster
            </h2>
            <p className="mt-3 text-slate-600">
              Thoughtfully designed tools that make practice effective and genuinely fun.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-fade-in"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft text-brand-600 transition-transform duration-300 group-hover:scale-110 group-hover:bg-gradient-brand group-hover:text-white">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="relative py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-brand-soft" />
        <div className="section-container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
              Loved by learners
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Don't just take our word for it
            </h2>
            <p className="mt-3 text-slate-600">
              Hear from students, engineers, and teams who learn with QuizFlow.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                className="glass-card flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover animate-fade-in"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <Quote className="h-8 w-8 text-brand-200" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
                    loading="lazy"
                  />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-20">
        <div className="section-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-brand px-6 py-16 text-center shadow-glow sm:px-12">
            <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
            <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-12 -right-8 h-56 w-56 rounded-full bg-accent-300/20 blur-3xl" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to start your learning streak?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
                Join thousands of learners today. It's free to start, and your first quiz is just a
                click away.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/register">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Create Free Account
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/quizzes">
                  <Button
                    size="lg"
                    className="w-full border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:w-auto"
                  >
                    Browse Quizzes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PublicLayout>
  )
}
