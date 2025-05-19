import { defineStore } from 'pinia'
import axios from 'axios'

// make it default 
axios.defaults.baseURL = 'http://localhost:8000/api'

// store
export const useAuthStore = defineStore('auth', {

  // data
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),

  // methods
  actions: {

    // login
    async login(credentials) {
      try {
        // post credentials
        const response = await axios.post('/login', credentials)
        const { user, token } = response.data

        // store the token [local storage + header]
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        this.user = user
        this.token = token

        return { status: 200, data: user }

      } catch (err) {
        console.error('Login failed:', err.response?.data?.message || err.message)

        // optional cleanup if needed
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        this.user = null
        this.token = null

        return {
          status: err.response?.status || 401,
          message: err.response?.data?.message || 'Login failed'
        }
      }
    },

    // logout function
    async logout() {
      try {
        await axios.post('/logout') // ==> Laravel route must exist and be protected by auth:sanctum
      } catch (e) {
        console.warn('Logout request failed or token already invalid') 
      }

      // remove from local storage
      localStorage.removeItem('token')

      // remove it from header
      delete axios.defaults.headers.common['Authorization']

      // reset state
      this.user = null
      this.token = null
    },

    // check authentication for protected pages
    async checkAuth() {
      const token = localStorage.getItem('token')

      if (!token) return false

      try {
        // apply token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        // fetch user info
        const res = await axios.get('/user')

        this.user = res.data
        this.token = token
        return true

      } catch (err) {
        console.error('checkAuth error:', err.response?.data?.message || err.message)
        this.logout() // clear state
        return false
      }
    }
  }
})
