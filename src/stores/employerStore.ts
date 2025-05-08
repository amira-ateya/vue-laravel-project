import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useEmployerStore = defineStore('employer', () => {
  // State
  const employers = ref([])
  const jobs = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentEmployer = ref(null)

  // Configuration
  const API_BASE_URL = 'http://localhost:3000'
  const JOBS_ENDPOINT = `${API_BASE_URL}/jobs`
  const EMPLOYERS_ENDPOINT = `${API_BASE_URL}/employers`

  // Utility function for API error handling
  const handleApiError = (err, defaultMessage) => {
    const errorMessage = err.response?.data?.message || 
                        err.message || 
                        defaultMessage
    error.value = errorMessage
    console.error('API Error:', err)
    throw new Error(errorMessage)
  }

  // Actions

  /**
   * Fetch employer profile
   * @param {string} employerId - The employer's ID
   * @returns {Promise<Object>} - Employer data
   */
  const fetchEmployer = async (employerId) => {
    loading.value = true
    error.value = null
    
    try {
      const res = await axios.get(`${EMPLOYERS_ENDPOINT}/${employerId}`)
      currentEmployer.value = res.data
      return res.data
    } catch (err) {
      return handleApiError(err, 'Failed to load employer profile')
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch all jobs for a specific employer
   * @param {string} employerId - The employer's ID
   * @returns {Promise<Array>} - Array of jobs
   */
  const fetchJobs = async (employerId) => {
    loading.value = true
    error.value = null
    
    try {
      const params = { employer_id: employerId }
      const res = await axios.get(JOBS_ENDPOINT, { params })
      jobs.value = res.data
      return res.data
    } catch (err) {
      return handleApiError(err, 'Failed to load jobs')
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch a single job by ID
   * @param {string} id - Job ID
   * @returns {Promise<Object>} - Job data
   */
  const fetchJobById = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const res = await axios.get(`${JOBS_ENDPOINT}/${id}`)
      return res.data
    } catch (err) {
      return handleApiError(err, 'Failed to load job')
    } finally {
      loading.value = false
    }
  }

  /**
   * Create a new job
   * @param {Object} jobData - Job data to create
   * @returns {Promise<Object>} - Created job data
   */
  const createJob = async (jobData) => {
    loading.value = true
    error.value = null
    
    try {
      const res = await axios.post(JOBS_ENDPOINT, jobData)
      jobs.value.push(res.data)
      return res.data
    } catch (err) {
      return handleApiError(err, 'Failed to create job')
    } finally {
      loading.value = false
    }
  }

  /**
   * Update an existing job
   * @param {string} jobId - Job ID to update
   * @param {Object} jobData - Updated job data
   * @returns {Promise<Object>} - Updated job data
   */
  const updateJob = async (jobId, jobData) => {
    loading.value = true
    error.value = null
    
    try {
      const res = await axios.put(`${JOBS_ENDPOINT}/${jobId}`, jobData)
      const index = jobs.value.findIndex(j => j.id === jobId)
      if (index !== -1) jobs.value[index] = res.data
      return res.data
    } catch (err) {
      return handleApiError(err, 'Failed to update job')
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete a job
   * @param {string} jobId - Job ID to delete
   * @returns {Promise<void>}
   */
  const deleteJob = async (jobId) => {
    loading.value = true
    error.value = null
    
    try {
      await axios.delete(`${JOBS_ENDPOINT}/${jobId}`)
      jobs.value = jobs.value.filter(j => j.id !== jobId)
    } catch (err) {
      return handleApiError(err, 'Failed to delete job')
    } finally {
      loading.value = false
    }
  }

  /**
   * Clear all jobs from store
   */
  const clearJobs = () => {
    jobs.value = []
  }

  /**
   * Clear error state
   */
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    employers,
    jobs,
    currentEmployer,
    loading,
    error,

    // Actions
    fetchEmployer,
    fetchJobs,
    fetchJobById,
    createJob,
    updateJob,
    deleteJob,
    clearJobs,
    clearError
  }
})