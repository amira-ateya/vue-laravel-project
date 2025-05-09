import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCandidateStore = defineStore('candidate', () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  type Candidate = {
    id: number
    user_id: number
    resume: string
    linkedin_profile: string
    phone_number: string
    experience_level: string
    location: string
    created_at: string
    updated_at: string
  }

  type User = {
    id: number
    name: string
    email: string
    password: string
    role: 'admin' | 'employer' | 'candidate'
    profile_picture: string | null
    created_at: string
    updated_at: string
  }
  const users = ref<User[]>([])


  const apiUrl = 'http://localhost:3000/candidates'

  // جلب قائمة المرشحين
  const fetchUsers = async () => {
    loading.value = true
    try {
      const res = await axios.get('http://localhost:3000/users')
      users.value = res.data
    } catch (err) {
      console.error("Error fetching users:", err)
      error.value = 'Failed to load users'
    } finally {
      loading.value = false
    }
  }
  
  // إنشاء مرشح جديد
  const createCandidate = async (candidateData: Candidate) => {
    try {
      const res = await axios.post(apiUrl, candidateData)
      users.value.push(res.data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error creating candidate:", err.message)
      } else {
        console.error("Unknown error:", err)
      }
      error.value = 'Failed to create candidate account'
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
    createCandidate
  }
})
