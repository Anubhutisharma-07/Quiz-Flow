import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, ArrowRight, CircleAlert as AlertCircle, Info } from 'lucide-react'
import AuthLayout from '../layouts/AuthLayout'
import Input from '../components/Input'
import Button from '../components/Button'
import Alert from '../components/Alert'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'
  const sessionExpired = new URLSearchParams(location.search).get('session') === 'expired'

  const [form, setForm] = useState({ email: '', password: '', remember: true })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((er) => ({ ...er, [field]: undefined }))
    setServerError('')
  }

  const validate = () => {
    const e = {}
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setServerError('')
    try {
      await login({ email: form.email, password: form.password })
      navigate(from, { replace: true })
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Unable to sign in. Please check your credentials.'
      setServerError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue your learning journey.">
      {sessionExpired && (
        <Alert variant="warning" icon={Info} className="mb-5">
          Your session has expired. Please sign in again.
        </Alert>
      )}
      {serverError && (
        <Alert variant="error" icon={AlertCircle} className="mb-5">
          {serverError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
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

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          icon={Lock}
          value={form.password}
          onChange={update('password')}
          error={errors.password}
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => setForm((f) => ({ ...f, remember: e.target.checked }))}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-400"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" loading={loading} className="w-full">
          Sign in
          {!loading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
          Create one free
        </Link>
      </p>
    </AuthLayout>
  )
}
