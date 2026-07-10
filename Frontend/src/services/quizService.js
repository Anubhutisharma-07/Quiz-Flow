import api from './api'

export const quizService = {

  // Get all quizzes
  async getQuizzes() {
    const { data } = await api.get('/quizzes')
    return data
  },

  // Get quiz by ID (includes questions)
  async getQuiz(id) {
    const { data } = await api.get(`/quizzes/${id}`)
    return data
  },

  // Create quiz
  async createQuiz(payload) {
    const { data } = await api.post('/quizzes', payload)
    return data
  },

  // Submit quiz
  async submitQuiz(payload) {
    const { data } = await api.post('/quiz-engine/submit', payload)
    return data
  },

  // Get result by attempt ID
  async getResult(attemptId) {
    const { data } = await api.get(`/quiz-engine/result/${attemptId}`)
    return data
  },

}

export default quizService