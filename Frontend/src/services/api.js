import axios from 'axios'

/**
 * Base API client for the Spring Boot backend.
 *
 * Backend URL:
 * http://localhost:8080
 */

const baseURL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 20000,
})

export const TOKEN_KEY = 'quizflow_token'
export const USER_KEY = 'quizflow_user'

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

// Automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Handle expired or invalid token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status

    if (status === 401 || status === 403) {
      removeToken()

      if (
        typeof window !== 'undefined' &&
        !window.location.pathname.startsWith('/login')
      ) {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api