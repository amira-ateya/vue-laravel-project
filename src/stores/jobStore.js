import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useJobStore = defineStore('job', () => {
    const jobs = ref([])
    const loading = ref(false)
    const error = ref(null)

    const clearError = () => {
        error.value = null
    }

    const handleError = (err, defaultMessage) => {
        let errorMessage = defaultMessage
        if (err.response && err.response.data && err.response.data.message) {
            errorMessage = err.response.data.message
        } else if (err.message) {
            errorMessage = err.message
        }
        error.value = errorMessage
        throw new Error(errorMessage)
    }

    const fetchJobs = async() => {
        loading.value = true
        clearError()
        try {
            const response = await axios.get('http://localhost:8000/api/jobs') //updated
            jobs.value = response.data
            return response.data
        } catch (err) {
            handleError(err, 'Failed to load jobs. Please try again.')
        } finally {
            loading.value = false
        }
    }

    const createJob = async(jobData) => {
        loading.value = true
        clearError()
        try {
            const response = await axios.post('http://localhost:3000/jobs', {
                ...jobData,
                id: Date.now().toString(),
                status: 'active',
                createdAt: new Date().toISOString()
            })
            jobs.value.push(response.data)
            return response.data
        } catch (err) {
            handleError(err, 'Failed to create job. Please check your data.')
        } finally {
            loading.value = false
        }
    }

    const updateJob = async(id, jobData) => {
        loading.value = true
        clearError()
        try {
            const response = await axios.put(`http://localhost:3000/jobs/${id}`, jobData)
            const index = jobs.value.findIndex(job => job.id === id)
            if (index !== -1) {
                jobs.value[index] = response.data
            }
            return response.data
        } catch (err) {
            handleError(err, 'Failed to update job. It may have been modified or deleted.')
        } finally {
            loading.value = false
        }
    }

    const deleteJob = async(id) => {
        loading.value = true
        clearError()
        try {
            await axios.delete(`http://localhost:3000/jobs/${id}`)
            jobs.value = jobs.value.filter(job => job.id !== id)
        } catch (err) {
            handleError(err, 'Failed to delete job. It may have already been deleted.')
        } finally {
            loading.value = false
        }
    }

    const getJobById = async(id) => {
        loading.value = true
        clearError()
        try {
            const localJob = jobs.value.find(job => job.id === id)
            if (localJob) return localJob

            const response = await axios.get(`http://localhost:3000/jobs/${id}`)
            return response.data
        } catch (err) {
            handleError(err, 'Job not found. It may have been deleted.')
        } finally {
            loading.value = false
        }
    }

    return {
        jobs,
        loading,
        error,
        clearError,
        fetchJobs,
        createJob,
        updateJob,
        deleteJob,
        getJobById
    }
})
