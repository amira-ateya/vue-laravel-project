import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useJobStore = defineStore('job', () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const jobs = ref<Job[]>([])
  type Job = {
    id: number
    employer_id: number
    title: string
    description: string
    responsibilities: string
    skills: string
    category: string
    location: string
    technologies: string
    work_type: string
    salary_range: string
    benefits: string
    deadline: string
    status: 'approved' | 'pending'
    created_at: string
    updated_at: string
  }
  
  // API base URL
  const apiUrl = 'http://localhost:3000/jobs'

  // Get all jobs
  const fetchJobs = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get(apiUrl)
      jobs.value = res.data
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching jobs:", err.message)
      } else {
        console.error("Unknown error:", err)
      }
      error.value = 'Failed to load jobs'
    } finally {
      loading.value = false
    }
  }

  // Add new job
  const createJob = async (jobData: any) => {
    try {
      const res = await axios.post(apiUrl, jobData)
      jobs.value.push(res.data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error creating job:", err.message)
      } else {
        console.error("Unknown error:", err)
      }
      error.value = 'Failed to create job'
    }
  }

  // Delete job
  const deleteJob = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/${id}`)
      jobs.value = jobs.value.filter(job => job.id !== id)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error deleting job:", err.message)
      } else {
        console.error("Unknown error:", err)
      }
      error.value = 'Failed to delete job'
    }
  }

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    createJob,
    deleteJob
  }
})
