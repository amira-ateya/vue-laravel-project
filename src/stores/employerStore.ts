import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useEmployerStore = defineStore('employer', () => {
  const employer = ref(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0
  })

  const apiUrl = 'http://localhost:3000'

  const fetchEmployerProfile = async (userId: number) => {
    loading.value = true
    try {
      const [userRes, employerRes] = await Promise.all([
        axios.get(`${apiUrl}/users/${userId}`),       // بيانات المستخدم من db.json
        axios.get(`${apiUrl}/employers?user_id=${userId}`) // بيانات صاحب العمل
      ]);
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
  const fetchEmployerStats = async (employerId: number) => {
    try {
      const jobsRes = await axios.get(`${apiUrl}/jobs?employer_id=${employerId}`)
      const jobIds = jobsRes.data.map((j: any) => j.id).join('&job_id=')
      const appsRes = await axios.get(`${apiUrl}/applications?${jobIds ? 'job_id=' + jobIds : ''}`)
  
      stats.value = {
        totalJobs: jobsRes.data.length,
        activeJobs: jobsRes.data.filter((j: any) => j.status === 'approved').length,
        totalApplications: appsRes.data.length,
        pendingApplications: appsRes.data.filter((a: any) => a.status === 'pending').length
      }
    } catch (err) {
      error.value = 'Failed to load stats'
    }
  }
  const updateEmployerProfile = async (id: number, profileData: any) => {
    try {
      const res = await axios.patch(`${apiUrl}/employers/${id}`, profileData)
      employer.value = {
        ...(employer.value || {}),
        ...res.data
      }
      
          } catch (err) {
      error.value = 'Failed to update profile'
    }
  }

  return {
    employer,
    stats,
    loading,
    error,
    fetchEmployerProfile,
    fetchEmployerStats,
    updateEmployerProfile
  }
})