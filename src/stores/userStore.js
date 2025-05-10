// src/stores/userStore.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
  }),
  actions: {
    fetchUsers() {
      // logic here
    },
    addUser(newUser) {
      // logic here
    },
    findUserByEmailAndPassword(email, password) {
      // logic here
    },
    updateUser(id, updatedData) {
      // logic here
    }
  }
})
