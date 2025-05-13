import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

interface User {
  id: string;                   
  name: string;                 
  email: string;                
  password: string;            
  role: 'admin' | 'employer' | 'candidate'; 
  profile_picture: string | null;  
  created_at: string;           
  updated_at: string;          
}


export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([]) // users is an array of User objects
  const loading = ref(false)
  const error = ref<string | null>(null)

  const apiUrl = 'http://localhost:3000/users'

  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get(apiUrl)
      users.value = res.data // Now TypeScript knows users is an array of User objects
    } catch (err) {
      error.value = 'Failed to load users'
    } finally {
      loading.value = false
    }
  }

  const createUser = async (userData: User) => { // Now userData is typed as a User object
    try {
      const res = await axios.post(apiUrl, userData)
      users.value.push(res.data)
      return res.data 
    } catch (err) {
      error.value = 'Failed to create the user'
      throw err 
    }
  }

  const fetchByRole = async (role: 'admin' | 'employer' | 'candidate') => {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get(`${apiUrl}?role=${role}`)
      users.value = res.data // Again, TypeScript knows this is an array of User objects
    } catch (err) {
      error.value = 'Failed to load users by type'
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
    fetchByRole,
    createUser
  }
})
