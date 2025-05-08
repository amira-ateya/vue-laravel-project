<template>
    <div class="employer-form-view">
      <h1>{{ isEditing ? 'Edit Job Posting' : 'Create New Job Posting' }}</h1>
      
      <JobPostForm 
        :jobData="currentJob" 
        @submit="handleFormSubmit" 
      />
  
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import JobPostForm from '@/components/employer/jobListingPage/JobPostForm.vue'
  import { useEmployerStore } from '@/stores/employerStore'
  
  const route = useRoute()
  const router = useRouter()
  const employerStore = useEmployerStore()
  
  const currentJob = ref(null)
  const isEditing = ref(false)
  const error = ref(null)
  
  // Check if we're editing an existing job
  onMounted(() => {
    if (route.params.id) {
      isEditing.value = true
      fetchJob(route.params.id)
    }
  })
  
  const fetchJob = async (id) => {
    try {
      const job = await employerStore.fetchJobById(id)
      currentJob.value = job
    } catch (err) {
      error.value = 'Failed to load job data: ' + (err.message || 'Unknown error')
      console.error(error.value)
    }
  }
  
  const handleFormSubmit = async (formData) => {
    try {
      const jobData = {
        ...formData,
        employer_id: 1, // In real app, get from auth store
        status: 'pending'
      }
  
      if (isEditing.value) {
        await employerStore.updateJob(currentJob.value.id, jobData)
        alert('Job updated successfully!')
      } else {
        await employerStore.createJob(jobData)
        alert('Job created successfully!')
      }
      
      router.push('/employer/job-listing')
    } catch (err) {
      error.value = isEditing.value 
        ? 'Failed to update job: ' + (err.message || 'Unknown error')
        : 'Failed to create job: ' + (err.message || 'Unknown error')
      console.error(error.value)
    }
  }
  </script>
  
  <style scoped>
  .employer-form-view {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    margin-bottom: 30px;
    color: #333;
    text-align: center;
  }
  
  .error-message {
    color: #f44336;
    margin-top: 20px;
    padding: 10px;
    background: #ffebee;
    border-radius: 4px;
    text-align: center;
  }
  </style>