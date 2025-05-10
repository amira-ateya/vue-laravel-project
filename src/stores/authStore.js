// src/stores/authStore.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    login(email, password) {
      // logic here
    },
    logout() {
      // logic here
    },
    autoLogin() {
      // logic here
    },
    register(newUser) {
      // logic here
    }
  }
})
