import api, { USER_KEY } from './api'

/**
 * User/profile service — placeholder methods for profile management.
 * Adjust paths to match your Spring Boot user controllers.
 */
export const userService = {
  async getProfile() {
    const { data } = await api.get('/users/me')
    return data
  },

  async updateProfile(payload) {
    const { data } = await api.put('/users/me', payload)
    if (data) localStorage.setItem(USER_KEY, JSON.stringify(data))
    return data
  },

  async changePassword(payload) {
    const { data } = await api.put('/users/me/password', payload)
    return data
  },

  async getStats() {
    const { data } = await api.get('/users/me/stats')
    return data
  },

  async getRecentAttempts(limit = 5) {
    const { data } = await api.get('/users/me/attempts', { params: { limit } })
    return data
  },
}

export default userService
