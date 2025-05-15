// src/stores/applicationStore.ts

// [SENU]: where is axios?

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useApplicationStore = defineStore('applications', () => {
  const applications = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentApplication = ref(null)


  // FETCHING THE APPLICATIONS
  const fetchApplications = async () => {
    try {

      // INIT VARIABLES
      loading.value = true
      error.value = null

      // FETCHING THE WHOLE DATA
      const response = await fetch('/db.json')
      const data = await response.json()

      console.log("fetchApplications: data = ", data); //debug: worked and contain the applications


      // READING APPLICATION DATA + INSERT IT INTO APPLICATION
      applications.value = data.applications.map(app => {

        // GET USER + GET CANDIDATE + GET JOB 
        const user = data.users.find(u => u.id == app.candidate_id) || {}
        const candidateProfile = data.candidates.find(c => c.user_id == app.candidate_id) || {}
        const job = data.jobs.find(j => j.id == app.job_id) || {}


        // DEBUG : worked all data fetched
        console.log("fetchApplications: user = ", user);
        console.log("fetchApplications: cnaidate = ", candidateProfile);
        console.log("fetchApplications: job = ", job);


        // [INFO] app: application element in the data application table in data
        console.log("fetchApplications: app = ", app); //debug
      
        return {
          ...app,
          candidate: {
            ...user,
            ...candidateProfile
          },
          job
        }
      })

    } catch (err) {
      error.value = err.message || 'Failed to fetch applications'
      console.error('Error fetching applications:', err)
    } finally {
      loading.value = false
    }
  }

  // FETCH APPLICATION
  const fetchApplication = async (id) => {
    try {
      loading.value = true
      error.value = null
      if (applications.value.length == 0) {
        await fetchApplications()
      }
      currentApplication.value = applications.value.find(app => app.id == id )
    } catch (err) {
      error.value = err.message || 'Failed to fetch application'
      console.error('Error fetching application:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchApplicationById = async (id) => {
    try {
      loading.value = true
      const response = await fetch('/db.json')
      const data = await response.json()

      const app = data.applications.find(a => a.id == id)
      if (!app) throw new Error('Application not found')

      currentApplication.value = {
        ...app,
        candidate: data.candidates.find(c => c.id == app.candidate_id) || {},
        job: data.jobs.find(j => j.id == app.job_id) || {}
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getApplicationById = (id) => {

    // [SENU] there is no need to convert to integer

    console.log("getApplicationById : ", id); //debug
    console.log("applications.value = ", applications.value); //debug: so the applications data not fetched...
    return applications.value.find(app => app.id == id)
  }




  const updateApplicationStatus = async (id, status) => {
    try {
      const appIndex = applications.value.findIndex(app => app.id == id)
      if (appIndex !== -1) {
        applications.value[appIndex].status = status
        applications.value[appIndex].updated_at = new Date().toISOString()
      }

      // Simulated DB update
      const response = await fetch('/db.json')
      const db = await response.json()

      const dbAppIndex = db.applications.findIndex(app => app.id == id)
      if (dbAppIndex !== -1) {
        db.applications[dbAppIndex].status = status
        db.applications[dbAppIndex].updated_at = new Date().toISOString()
        console.log('Application status updated:', db.applications[dbAppIndex])
      }

      return true
    } catch (err) {
      console.error('Error updating application status:', err)
      return false
    }
  }

  return {
    applications,
    loading,
    error,
    currentApplication,
    fetchApplications,
    fetchApplication,
    fetchApplicationById,
    getApplicationById,
    updateApplicationStatus
  }
})
