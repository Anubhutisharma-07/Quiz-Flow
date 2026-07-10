import api, { setToken, USER_KEY } from './api'

export const authService = {

  async login({ email, password }) {

    const { data } = await api.post('/users/login', {
      email,
      password,
    })

    setToken(data.token)

   localStorage.setItem(
  USER_KEY,
  JSON.stringify({
    userId: data.userId,
    email: data.email,
    role: data.role,
  })
)

    return data
  },

  async register({ username, email, password }) {

    const { data } = await api.post('/users/register', {
      username,
      email,
      password,
    })

    return data
  },

  logout() {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem('quizflow_token')
  },
}

export default authService
