import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCandidateStore = defineStore('candidate', () => {
  const candidate = ref(null)
  const applications = ref([])
  const jobs = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchCandidateProfile = async (candidateId) => {
    try {
      loading.value = true
      const response = await axios.get(`http://localhost:3000/candidates/${candidateId}`)
      
      if (!response.data) {
        throw new Error('Candidate data not found')
      }
  
      // جلب بيانات المستخدم المرتبطة
      const userResponse = await axios.get(`http://localhost:3000/users/${response.data.user_id}`)
      
      // دمج البيانات
      candidate.value = {
        ...response.data,
        name: userResponse.data.name,
        email: userResponse.data.email
      }
      
      return candidate.value
    } catch (err) {
      error.value = err.message
      console.error('Error fetching candidate:', err)
      throw err
    } finally {
      loading.value = false
    }
  }
  const fetchApplications = async (candidateId) => {
    try {
      loading.value = true
      const response = await axios.get(`http://localhost:3000/candidates/${candidateId}/applications`)
      applications.value = response.data
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  const updateCandidate = async (data) => {
    try {
      loading.value = true
      // Replace with your actual API endpoint
      const response = await axios.put('/api/candidate/profile', data)
      candidate.value = { ...candidate.value, ...response.data }
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const withdrawApplication = async (applicationId) => {
    try {
      loading.value = true
      // Replace with your actual API endpoint
      await axios.delete(`/api/candidate/applications/${applicationId}`)
      applications.value = applications.value.filter(app => app.id !== applicationId)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    candidate,
    applications,
    jobs,
    loading,
    error,
    fetchCandidateProfile,
    fetchApplications,
    updateCandidate,
    withdrawApplication,
    fetchApplications
  }
})