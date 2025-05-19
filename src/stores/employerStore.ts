// src/stores/employerStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

interface User {
  id: number
  name: string
  email: string
  password: string
  role: string
  profile_picture: string | null
  created_at: string
  updated_at: string
}

interface Employer {
  id: number
  user_id: number
  company_name: string
  company_website: string
  company_logo: string | null
  bio: string
  created_at: string
  updated_at: string
}

export const useEmployerStore = defineStore('employer', () => {
  const employer = ref<Partial<User & Employer> | null>(null)
  const employers = ref<Employer[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const stats = ref({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0
  })

  const apiUrl = 'http://localhost:8000/api'

  // [GET ALL EMPLOYERS]
  const fetchEmployers = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get<Employer[]>(`${apiUrl}/employers`)
      employers.value = res.data
    } catch (err) {
      error.value = 'Failed to load company data'
    } finally {
      loading.value = false
    }
  }

  // [GET SINGLE EMPLOYER PROFILE]
  const fetchEmployerProfile = async (userId: number) => {
    loading.value = true
    error.value = null
    try {
      const [userRes, employerRes] = await Promise.all([
        axios.get<User>(`${apiUrl}/users/${userId}`),
        axios.get<Employer[]>(`${apiUrl}/employers?user_id=${userId}`)
      ])
      employer.value = {
        ...userRes.data,
        ...employerRes.data[0]
      }
    } catch (err) {
      error.value = 'Failed to load employer profile'
    } finally {
      loading.value = false
    }
  }

  // [POST CREATE EMPLOYER]
  const createEmployer = async (
    employerData: Omit<Employer, 'id' | 'created_at' | 'updated_at'>
  ) => {
    loading.value = true
    error.value = null
    try {
      const res = await axios.post<Employer>(`${apiUrl}/employers`, employerData)
      employers.value.push(res.data)
    } catch (err) {
      error.value = 'Create company account failed'
    } finally {
      loading.value = false
    }
  }

  // [PATCH UPDATE EMPLOYER]
  const updateEmployerProfile = async (id: number, profileData: Partial<Employer>) => {
    loading.value = true
    error.value = null
    try {
      const res = await axios.patch<Employer>(`${apiUrl}/employers/${id}`, profileData)
      employer.value = {
        ...(employer.value || {}),
        ...res.data
      }
    } catch (err) {
      error.value = 'Failed to update profile'
    } finally {
      loading.value = false
    }
  }

  // [GET STATS]
  const fetchEmployerStats = async (employerId: number) => {
    error.value = null
    try {
      const jobsRes = await axios.get<any[]>(`${apiUrl}/jobs?employer_id=${employerId}`)
      const jobs = jobsRes.data

      const jobIds = jobs.map(j => j.id)
      let apps: any[] = []

      if (jobIds.length) {
        const query = jobIds.map(id => `job_id=${id}`).join('&')
        const appsRes = await axios.get<any[]>(`${apiUrl}/applications?${query}`)
        apps = appsRes.data
      }

      stats.value = {
        totalJobs: jobs.length,
        activeJobs: jobs.filter(j => j.status === 'approved').length,
        totalApplications: apps.length,
        pendingApplications: apps.filter(a => a.status === 'pending').length
      }
    } catch (err) {
      error.value = 'Failed to load stats'
    }
  }

  return {
    employer,
    employers,
    loading,
    error,
    stats,
    fetchEmployerProfile,
    fetchEmployers,
    fetchEmployerStats,
    updateEmployerProfile,
    createEmployer
  }
})
