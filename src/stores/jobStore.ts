// src/stores/jobStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

interface Job {
  id?: number
  title: string
  work_type: 'remote' | 'hybrid' | 'onsite'
  location: string
  category: string
  salary_from: number
  salary_to: number
  deadline: string
  description: string
  responsibilities: string[]
  skills: string[]
  benefits: Array<{
    title: string
    description: string
  }>
  status?: 'approved' | 'pending' | 'rejected'
  candidates_id?: number[]
}

export const useJobStore = defineStore('job', () => {
  const jobs = ref<Job[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const apiUrl = 'http://localhost:3000/jobs'

  const fetchJobs = async (): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get<Job[]>(apiUrl)
      jobs.value = response.data
    } catch (err) {
      error.value = 'Failed to load jobs'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const createJob = async (jobData: Omit<Job, 'id'>): Promise<Job> => {
    try {
      const response = await axios.post<Job>(apiUrl, {
        ...jobData,
        status: 'pending',
        candidates_id: []
      })
      jobs.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = 'Failed to create job'
      console.error(err)
      throw err
    }
  }

  const updateJob = async (jobData: Job): Promise<Job> => {
    try {
      const response = await axios.put<Job>(`${apiUrl}/${jobData.id}`, jobData)
      const index = jobs.value.findIndex(j => j.id === jobData.id)
      if (index !== -1) {
        jobs.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = 'Failed to update job'
      console.error(err)
      throw err
    }
  }

  const deleteJob = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${apiUrl}/${id}`)
      jobs.value = jobs.value.filter(job => job.id !== id)
    } catch (err) {
      error.value = 'Failed to delete job'
      console.error(err)
    }
  }

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    createJob,
    updateJob,
    deleteJob
  }
})