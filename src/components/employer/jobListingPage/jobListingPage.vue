<template>
    <div class="job-listing-page">
      <h1>Job Listings</h1>
      
      <div v-if="loading" class="loading">Loading jobs...</div>
      <div v-if="error" class="error">{{ error }}</div>
  
      <div class="controls">
        <router-link 
          :to="{ name: 'CreateJob' }" 
          class="create-btn"
        >
          Create New Job
        </router-link>
        <div class="search-filter">
          <input 
            v-model="searchQuery" 
            placeholder="Search jobs..." 
            @input="filterJobs"
          >
          <select v-model="workTypeFilter" @change="filterJobs">
            <option value="">All Work Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
          </select>
        </div>
      </div>
  
      <div v-if="filteredJobs.length === 0 && !loading" class="no-results">
        No jobs found. Create your first job listing!
      </div>
  
      <div class="job-list">
        <div v-for="job in filteredJobs" :key="job.id" class="job-card">
          <h3>{{ job.title }}</h3>
          <p>{{ truncateDescription(job.description) }}</p>
          <div class="job-meta">
            <span class="work-type">{{ job.work_type }}</span>
            <span>Salary: ${{ job.salary_min }} - ${{ job.salary_max }}</span>
            <span>Posted: {{ formatDate(job.created_at) }}</span>
          </div>
          <div class="job-actions">
            <router-link 
              :to="{ name: 'EditJob', params: { id: job.id } }" 
              class="edit-btn"
            >
              Edit
            </router-link>
            <button @click="confirmDelete(job.id)" class="delete-btn">
              Delete
            </button>
            <router-link 
              :to="{ name: 'EmployerViewAllApplicants', query: { jobId: job.id } }" 
              class="applicants-btn"
            >
              View Applicants
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useJobStore } from '@/stores/jobStore'
  import { useRouter } from 'vue-router'
  
  const jobStore = useJobStore()
  const router = useRouter()
  
  const { jobs, loading, error, fetchJobs, deleteJob } = jobStore
  const searchQuery = ref('')
  const workTypeFilter = ref('')
  
  onMounted(() => {
    fetchJobs()
  })
  
  const filteredJobs = computed(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                           job.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesWorkType = workTypeFilter.value ? job.work_type === workTypeFilter.value : true
      return matchesSearch && matchesWorkType
    })
  })
  
  const confirmDelete = async (id) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(id)
      } catch (err) {
        console.error('Delete failed:', err)
      }
    }
  }
  
  const truncateDescription = (text, length = 100) => {
    return text.length > length ? text.substring(0, length) + '...' : text
  }
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  </script>
  
  <style scoped>
  /* Add to your existing styles */
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .search-filter {
    display: flex;
    gap: 1rem;
  }
  
  .search-filter input,
  .search-filter select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
  .work-type {
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: #e0f7fa;
    border-radius: 4px;
    font-size: 0.8rem;
  }
  
  .no-results {
    padding: 2rem;
    text-align: center;
    background: #f5f5f5;
    border-radius: 4px;
  }
  
  .applicants-btn {
    padding: 5px 10px;
    background: #673AB7;
    color: white;
    border-radius: 4px;
    text-decoration: none;
    font-size: 0.9rem;
  }
  
  /* Add responsive behavior */
  @media (max-width: 768px) {
    .controls {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .search-filter {
      width: 100%;
    }
    
    .search-filter input {
      flex-grow: 1;
    }
  }
  </style>