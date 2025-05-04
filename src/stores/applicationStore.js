// src/stores/applicationStore.js
import { defineStore } from 'pinia'

export const useApplicationStore = defineStore('applicationStore', {
  state: () => ({
    applications: [],
  }),
  actions: {
    fetchApplications() {
      // logic here
    },
    applyToJob(applicationData) {
      // logic here
    },
    cancelApplication(id) {
      // logic here
    },
    respondToApplication(id, response) {
      // logic here (employer: accept/reject)
    }
  }
})
