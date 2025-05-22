import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useJobStore = defineStore('job', () => {
    const jobs = ref([])
    const loading = ref(false)
    const error = ref(null)

    // clear error
    const clearError = () => {
        error.value = null
    }

    // handle error
    const handleError = (err, defaultMessage) => {
        let errorMessage = defaultMessage
        if (err.response?.data?.message) {
            errorMessage = err.response.data.message
        } else if (err.message) {
            errorMessage = err.message
        }
        error.value = errorMessage
        throw new Error(errorMessage)
    }

    // get jobs only if status is approved
    const fetchJobs = async () => {
        loading.value = true
        clearError()
        try {
            const response = await axios.get('http://localhost:8000/api/jobs')
            jobs.value = response.data.filter(job => job.status === 'approved')
            return jobs.value
        } catch (err) {
            handleError(err, 'failed to load jobs')
        } finally {
            loading.value = false
        }
    }

    // create a job
    const createJob = async (jobData) => {
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
            handleError(err, 'failed to create job')
        } finally {
            loading.value = false
        }
    }

    // update a job
    const updateJob = async (id, jobData) => {
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
            handleError(err, 'failed to update job')
        } finally {
            loading.value = false
        }
    }

    // delete a job
    const deleteJob = async (id) => {
        loading.value = true
        clearError()
        try {
            await axios.delete(`http://localhost:3000/jobs/${id}`)
            jobs.value = jobs.value.filter(job => job.id !== id)
        } catch (err) {
            handleError(err, 'failed to delete job')
        } finally {
            loading.value = false
        }
    }

    // get job by id
    const getJobById = async (id) => {
        loading.value = true
        clearError()
        try {
            const localJob = jobs.value.find(job => job.id === id)
            if (localJob) return localJob

            const response = await axios.get(`http://localhost:3000/jobs/${id}`)
            return response.data
        } catch (err) {
            handleError(err, 'job not found')
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
