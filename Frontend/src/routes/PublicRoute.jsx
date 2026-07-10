import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * PublicRoute — for login/register pages. Prevents authenticated users
 * from seeing auth pages; bounces them to the dashboard.
 */
export default function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-brand-soft">
        <div className="h-10 w-10 animate-spin-slow rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
