import { defineStore } from 'pinia'
import axios from 'axios'

export const useApplicationsStore = defineStore('applications', {
  state: () => ({
    applications: [],
    currentApplication: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchApplications() {
      this.loading = true
      try {
        const response = await axios.get('http://localhost:3000/applications?_expand=candidate&_expand=job')
        this.applications = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async fetchApplicationById(id) {
      this.loading = true
      try {
        const response = await axios.get(`http://localhost:3000/applications/${id}?_expand=candidate&_expand=job`)
        this.currentApplication = response.data
        
        // Fetch additional candidate details
        if (response.data.candidate_id) {
          const candidateResponse = await axios.get(`http://localhost:3000/candidates/${response.data.candidate_id}`)
          this.currentApplication.candidate = { 
            ...this.currentApplication.candidate,
            ...candidateResponse.data 
          }
          
          // Fetch user details
          if (candidateResponse.data.user_id) {
            const userResponse = await axios.get(`http://localhost:3000/users/${candidateResponse.data.user_id}`)
            this.currentApplication.candidate = {
              ...this.currentApplication.candidate,
              ...userResponse.data
            }
          }
        }
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async updateApplicationStatus(id, status) {
      try {
        await axios.patch(`http://localhost:3000/applications/${id}`, { status })
        const index = this.applications.findIndex(app => app.id === id)
        if (index !== -1) {
          this.applications[index].status = status
        }
        if (this.currentApplication?.id === id) {
          this.currentApplication.status = status
        }
      } catch (error) {
        this.error = error.message
      }
    }
  }
})