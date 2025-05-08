import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useJobStore = defineStore('job', () => {
  const jobs = ref([])
  const loading = ref(false)
  const error = ref(null)
  const apiUrl = 'http://localhost:3000/jobs'

  const fetchJobs = async () => {
    loading.value = true
    try {
      const res = await axios.get(apiUrl)
      jobs.value = res.data
    } catch (err) {
      error.value = 'Failed to load jobs: ' + err.message
    } finally {
      loading.value = false
    }
  }

  const fetchJobById = async (id) => {
    loading.value = true
    try {
      const res = await axios.get(`${apiUrl}/${id}`)
      return res.data
    } catch (err) {
      error.value = 'Failed to load job: ' + err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const createJob = async (jobData) => {
    loading.value = true
    try {
      const res = await axios.post(apiUrl, jobData)
      jobs.value.push(res.data)
      return res.data
    } catch (err) {
      error.value = 'Failed to create job: ' + err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateJob = async (id, jobData) => {
    loading.value = true
    try {
      const res = await axios.put(`${apiUrl}/${id}`, jobData)
      const index = jobs.value.findIndex(j => j.id === id)
      if (index !== -1) jobs.value[index] = res.data
      return res.data
    } catch (err) {
      error.value = 'Failed to update job: ' + err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteJob = async (id) => {
    loading.value = true
    try {
      await axios.delete(`${apiUrl}/${id}`)
      jobs.value = jobs.value.filter(job => job.id !== id)
    } catch (err) {
      error.value = 'Failed to delete job: ' + err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    fetchJobById,
    createJob,
    updateJob,
    deleteJob
  }
})