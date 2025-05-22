// src/stores/jobStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useJobStore = defineStore('job', () => {
  const jobs = ref<Job[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const apiUrl = 'http://localhost:8000/api/employer/jobs' //update the api [worked]

  // inteface
  interface Job {
    id?: number
    employer_id?: number
    title: string
    description: string
    responsibilities: string[]
    skills: string[]
    category: string
    location: string
    technologies?: string
    work_type: 'remote' | 'hybrid' | 'onsite'
    salary_from: number
    salary_to: number
    benefits: Array<{
      title: string
      description: string
    }>
    deadline: string
    status?: 'approved' | 'pending' | 'rejected'
    created_at?: string
    updated_at?: string
    candidates_id?: number[]
  }


  // fetching:
  const fetchJobs = async (): Promise<void> => {

    loading.value = true
    error.value = null
    try {

      console.log("before getting the jobs hiii");

      // get method: in the api 
      const apiUrl = 'http://localhost:8000/api/jobs';

      // add the token in the header
      const $token = localStorage.getItem('token')
      const response = await axios.get<Job[]>(apiUrl, {
        headers: {
          Accept : 'application/json',
          Authorization: `Bearer ${$token}` 
        }
      });
      
      console.log(response.data);
      

      console.log("response = ", response); //debug

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
