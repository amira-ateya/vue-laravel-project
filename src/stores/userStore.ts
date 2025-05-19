import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  // reactive state variables
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)
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
      users.value = res.data
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
