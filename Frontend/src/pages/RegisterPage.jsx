import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, ArrowRight, CircleAlert as AlertCircle, CircleCheck as CheckCircle2 } from 'lucide-react'
import AuthLayout from '../layouts/AuthLayout'
import Input from '../components/Input'
import Button from '../components/Button'
import Alert from '../components/Alert'
import { useAuth } from '../context/AuthContext'
import { cn } from '../utils/helpers'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((er) => ({ ...er, [field]: undefined }))
    setServerError('')
  }

  // Password strength meter
  const strength = (() => {
    const p = form.password
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    return score
  })()
  const strengthLabels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColors = ['bg-slate-200', 'bg-rose-400', 'bg-amber-400', 'bg-sky-400', 'bg-emerald-500']

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    else if (form.fullName.trim().length < 2) e.fullName = 'Name is too short'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (form.confirmPassword !== form.password) e.confirmPassword = 'Passwords do not match'
    if (!form.terms) e.terms = 'Please accept the terms to continue'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setServerError('')
    try {
      
        await register({
  username: form.fullName,
  email: form.email,
  password: form.password,
})
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Unable to create account. Please try again.'
      setServerError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start learning with beautiful quizzes in minutes."
    >
      {serverError && (
        <Alert variant="error" icon={AlertCircle} className="mb-5">
          {serverError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          name="fullName"
          placeholder="Jane Doe"
          icon={User}
          value={form.fullName}
          onChange={update('fullName')}
          error={errors.fullName}
          autoComplete="name"
          required
        />

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={form.email}
          onChange={update('email')}
          error={errors.email}
          autoComplete="email"
          required
        />

        <div>
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Create a strong password"
            icon={Lock}
            value={form.password}
            onChange={update('password')}
            error={errors.password}
            autoComplete="new-password"
            required
          />
          {form.password && (
            <div className="mt-2">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-1.5 flex-1 rounded-full transition-colors duration-300',
                      i <= strength ? strengthColors[strength] : 'bg-slate-200',
                    )}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {strengthLabels[strength] || strengthLabels[0]}
              </p>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          icon={Lock}
          value={form.confirmPassword}
          onChange={update('confirmPassword')}
          error={errors.confirmPassword}
          autoComplete="new-password"
          required
        />

        <label className="flex items-start gap-2.5 text-sm text-slate-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={form.terms}
            onChange={(e) => {
              setForm((f) => ({ ...f, terms: e.target.checked }))
              setErrors((er) => ({ ...er, terms: undefined }))
            }}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-400"
          />
          <span>
            I agree to the{' '}
            <Link to="/" className="font-semibold text-brand-600 hover:text-brand-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/" className="font-semibold text-brand-600 hover:text-brand-700">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.terms && <p className="-mt-3 text-xs font-medium text-rose-600">{errors.terms}</p>}

        <Button type="submit" size="lg" loading={loading} className="w-full">
          Create Account
          {!loading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
