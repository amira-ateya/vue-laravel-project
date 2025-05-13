// stores/authStore.js
import { defineStore } from 'pinia'
import { SignJWT, jwtVerify } from 'jose'
import { useUserStore } from '@/stores/userStore'

const secret = new TextEncoder().encode('senu')

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),

  actions: {

    async login(fullUserData) {
      const payload = { id: fullUserData.id, role: fullUserData.role }

      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('4h')
        .sign(secret)

      localStorage.setItem('token', token)
      this.token = token
      this.user = fullUserData
      return { status: 200, data: fullUserData }
    },

    // CHECK AUTH — fixed
    async checkAuth() {
      const token = localStorage.getItem('token')
      if (!token) return false

      try {
        const { payload } = await jwtVerify(token, secret)
        const userStore = useUserStore()
        if (userStore.users.length === 0) {
          await userStore.fetchUsers()
        }

        const fullUser = userStore.users.find(u => u.id === payload.id)
        this.user  = fullUser || { id: payload.id, role: payload.role }
        this.token = token
        return true
      } catch (err) {
        console.error('checkAuth failed:', err)
        this.logout()
        return false
      }
    },

    logout() {
      this.user  = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
