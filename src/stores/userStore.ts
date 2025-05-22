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
  const validationErrors = ref({})  // <-- hold backend validation errors here

  // API URL
  const apiUrl = 'http://localhost:8000/api/users'

  // [GET: ALL USERS] Method=========================
  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    try {

      // give me the array of the users in objects
      const res = await axios.get(apiUrl) // GET request

      users.value = res.data
      
    } catch (err) {
      error.value = 'Failed to load users'
    } finally {
      loading.value = false
    }
  }
  //====================================================

  // [POST: CREATE USER] Method
  const createUser = async (userData: any) => {
    // reset error states before request
    error.value = null
    validationErrors.value = {}

    try {
      console.log('userStore: userData = ', userData)
      const res = await axios.post(apiUrl, userData)
      users.value.push(res.data)
      return res.data
    } catch (err: any) {

      // check if validation error from backend
      if (err.response && err.response.status === 422) {
        validationErrors.value = err.response.data.errors // store validation errors
      } else {
        error.value = 'Failed to create the user' // generic error message
      }
      throw err // rethrow to let calling code handle if needed
    }
  }

  // [GET: USERS BY ROLE] Method
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

  // expose state and methods
  return {
    users,
    loading,
    error,
    validationErrors,
    fetchUsers,
    fetchByRole,
    createUser
  }
})
