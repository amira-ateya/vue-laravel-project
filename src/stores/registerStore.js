import { defineStore } from 'pinia'

export const useRegisterStore = defineStore('register', {
  state: () => ({
    step1Data: {
      fullName: '',
      email: '',
      password: ''
    },
  }),

  actions: {
    setStep1Data(data) {
      this.step1Data = data
    },

    clearData() {
      this.step1Data = {
        fullName: '',
        email: '',
        password: ''
      }
    }
  }
})
