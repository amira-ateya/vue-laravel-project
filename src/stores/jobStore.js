// src/stores/jobStore.js
import { defineStore } from 'pinia'

export const useJobStore = defineStore('jobStore', {
  state: () => ({
    jobs: [],
  }),
  actions: {
    fetchJobs() {
      // logic here
    },
    addJob(newJob) {
      // logic here
    },
    updateJob(id, updatedData) {
      // logic here
    },
    deleteJob(id) {
      // logic here
    },
    approveJob(id) {
      // logic here (admin use)
    },
    filterJobs(filters) {
      // logic here
    }
  }
})
