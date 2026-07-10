import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react'
import authService from '../services/authService'
import { getToken, removeToken, USER_KEY } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY)

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem(USER_KEY)
      }
    }

    setLoading(false)
  }, [])

  // Login
 const login = useCallback(async (credentials) => {

  const data = await authService.login(credentials)

  setUser({
  userId: data.userId,
  email: data.email,
  role: data.role,
})

  return data

}, [])

  // Register
  const register = useCallback(async (payload) => {

  return await authService.register(payload)

}, [])

  // Logout
  const logout = useCallback(() => {
    authService.logout()
    removeToken()
    setUser(null)
  }, [])

  // Update user
  const updateUser = useCallback((nextUser) => {
    setUser(nextUser)

    if (nextUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
    } else {
      localStorage.removeItem(USER_KEY)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(getToken()),
      login,
      register,
      logout,
      updateUser,
    }),
    [user, loading, login, register, logout, updateUser]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

export default AuthContext