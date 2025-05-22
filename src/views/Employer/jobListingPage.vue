<template>
  <div class="dashboard-container">
    <!-- Header Section -->
    <div class="dashboard-header">
      <div>
        <h1>Job Management</h1>
        <p class="subtitle">Manage your job postings and applications</p>
      </div>
      <div class="header-actions">
        <router-link to="/employer/post-job" class="btn primary">
          <i class="fas fa-plus"></i> Post New Job
        </router-link>
      </div>
    </div>

    <!-- Search and Filter Bar -->
    <div class="search-filter-bar">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search jobs..." 
          @input="handleSearch"
        >
      </div>
      <div class="filter-controls">
        <select v-model="statusFilter" @change="filterJobs" class="filter-select">
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select v-model="typeFilter" @change="filterJobs" class="filter-select">
          <option value="">All Types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-briefcase"></i>
        </div>
        <div>
          <span class="stat-value">{{ filteredJobs.length }}</span>
          <span class="stat-label">Total Jobs</span>
        </div>
      </div>
      <div class="stat-card highlight">
        <div class="stat-icon">
          <i class="fas fa-file-alt"></i>
        </div>
        <div>
          <span class="stat-value">{{ totalApplications }}</span>
          <span class="stat-label">Applications</span>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="content-section">
      <!-- Error State -->
      <div v-if="error" class="error-state">
        <i class="fas fa-exclamation-triangle"></i>
        <p>{{ error }}</p>
        <button @click="fetchJobs" class="btn primary">
          Retry
        </button>
      </div>

      <!-- Loading State -->
      <div v-else-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading your job listings...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredJobs.length === 0" class="empty-state">
        <h3>No jobs found</h3>
        <p>Try adjusting your search or post a new job</p>
        <router-link to="/employer/post-job" class="btn primary">
          Post a Job
        </router-link>
      </div>

      <!-- Job Cards Grid -->
      <div v-else class="jobs-grid">
        <div v-for="job in paginatedJobs" :key="job.id" class="job-card">
          <div class="job-card-header">
            <h3 class="job-title">{{ job.title }}</h3>
            <span class="job-status" :class="job.status.toLowerCase()">{{ job.status }}</span>
          </div>
          
          <div class="job-details">
            <div class="detail-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ job.location }}</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-clock"></i>
              <span>{{ formatWorkType(job.work_type) }}</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-money-bill-wave"></i>
              <span v-if="job.salary_from || job.salary_to">
                {{ formatSalary(job.salary_from) }} - {{ formatSalary(job.salary_to) }}
              </span>
              <span v-else>Salary not specified</span>
            </div>
          </div>
          
          <div class="job-footer">
            <div class="applications-count">
              <i class="fas fa-users"></i>
              <span>{{ job.applications_count || 0 }} Applications</span>
            </div>
            <div class="job-actions">
              <router-link 
                :to="`/employer/job/${job.id}/applications`" 
                class="btn-icon view"
                title="View Applications"
              >
                <i class="fas fa-eye"></i>
              </router-link>
              <router-link 
                :to="`/employer/edit-job/${job.id}`" 
                class="btn-icon edit"
                title="Edit Job"
              >
                <i class="fas fa-pencil-alt"></i>
              </router-link>
              <button 
                @click="confirmDelete(job.id)" 
                class="btn-icon delete"
                title="Delete Job"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div v-if="filteredJobs.length > itemsPerPage" class="pagination-controls">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
          class="pagination-btn"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <div class="page-numbers">
          <button 
            v-for="page in totalPages" 
            :key="page"
            @click="goToPage(page)"
            :class="{ active: page === currentPage }"
            class="page-btn"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
          class="pagination-btn"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Confirm Deletion</h3>
          <button @click="showDeleteModal = false" class="modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this job posting? This action cannot be undone.</p>
        </div>
        <div class="modal-footer">
          <button @click="showDeleteModal = false" class="btn secondary">
            Cancel
          </button>
          <button @click="deleteJob" class="btn danger">
            Delete Job
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const jobs = ref([])
    const loading = ref(false)
    const error = ref(null)
    const searchQuery = ref('')
    const statusFilter = ref('')
    const typeFilter = ref('')
    const showDeleteModal = ref(false)
    const jobToDelete = ref(null)
    const currentPage = ref(1)
    const itemsPerPage = ref(6)

    // Format work type for display
    const formatWorkType = (type) => {
      const types = {
        'full-time': 'Full Time',
        'part-time': 'Part Time',
        'contract': 'Contract',
        'freelance': 'Freelance',
        'hybrid': 'Hybrid',
        'remote': 'Remote'
      }
      return types[type] || type.charAt(0).toUpperCase() + type.slice(1)
    }

    // Format salary for display
    const formatSalary = (amount) => {
      if (!amount && amount !== 0) return 'Salary not specified';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EGP',
        maximumFractionDigits: 0
      }).format(amount)
    }

    // Load jobs from backend
    const fetchJobs = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await axios.get('/employer/jobs')
        jobs.value = response.data
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to fetch jobs. Please try again.'
      } finally {
        loading.value = false
      }
    }

    // Filter jobs based on search and filters
    const filteredJobs = computed(() => {
      return jobs.value.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                             job.location.toLowerCase().includes(searchQuery.value.toLowerCase())
        
        const matchesStatus = !statusFilter.value || job.status.toLowerCase() === statusFilter.value.toLowerCase()
        const matchesType = !typeFilter.value || job.work_type === typeFilter.value
        
        return matchesSearch && matchesStatus && matchesType
      })
    })

    // Calculate total applications
    const totalApplications = computed(() => {
      return filteredJobs.value.reduce((total, job) => total + (job.applications_count || 0), 0)
    })

    // Pagination logic
    const totalPages = computed(() => {
      return Math.ceil(filteredJobs.value.length / itemsPerPage.value)
    })

    const paginatedJobs = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return filteredJobs.value.slice(start, end)
    })

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const goToPage = (page) => {
      currentPage.value = page
    }

    // Search handler with debounce
    let searchTimeout = null
    const handleSearch = () => {
      clearTimeout(searchTimeout)
      searchTimeout = setTimeout(() => {
        currentPage.value = 1
      }, 300)
    }

    // Filter handler
    const filterJobs = () => {
      currentPage.value = 1
    }

    // Delete job
    const confirmDelete = (id) => {
      jobToDelete.value = id
      showDeleteModal.value = true
    }

    const deleteJob = async () => {
      try {
        await axios.delete(`/employer/jobs/${jobToDelete.value}`)
        await fetchJobs()
        showDeleteModal.value = false
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to delete job. Please try again.'
      }
    }

    onMounted(() => {
      fetchJobs()
    })

    return {
      jobs,
      loading,
      error,
      searchQuery,
      statusFilter,
      typeFilter,
      filteredJobs,
      totalApplications,
      paginatedJobs,
      currentPage,
      itemsPerPage,
      totalPages,
      showDeleteModal,
      jobToDelete,
      formatWorkType,
      formatSalary,
      handleSearch,
      filterJobs,
      nextPage,
      prevPage,
      goToPage,
      confirmDelete,
      deleteJob
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Header Styles */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.25rem 0;
}

.subtitle {
  font-size: 1rem;
  color: #64748b;
  margin: 0;
}

.header-actions .btn {
  padding: 0.75rem 1.5rem;
  font-weight: 500;
}

/* Search and Filter Bar */
.search-filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
}

.search-box {
  flex: 1;
  min-width: 300px;
  position: relative;
}

.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.search-box input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
}

.search-box input:focus {
  outline: none;
  border-color: #a5b4fc;
  box-shadow: 0 0 0 3px rgba(165, 180, 252, 0.2);
}

.filter-controls {
  display: flex;
  gap: 0.75rem;
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: #a5b4fc;
}

/* Stats Overview */
.stats-overview {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  flex: 1;
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.stat-card.highlight {
  border-left: 4px solid #4f46e5;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #4f46e5;
}

.stat-card.highlight .stat-icon {
  background-color: #e0e7ff;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #64748b;
}

/* Content Section */
.content-section {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

/* Error State */
.error-state {
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #dc2626;
}

.error-state i {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.error-state p {
  margin: 0 0 1.5rem 0;
}

/* Loading State */
.loading-state {
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid #e2e8f0;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Empty State */
.empty-state {
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-state h3 {
  font-size: 1.25rem;
  color: #1e293b;
  margin: 0;
}

.empty-state p {
  color: #64748b;
  margin: 0 0 1.5rem 0;
}

/* Jobs Grid */
.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.job-card {
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.2s;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-color: #c7d2fe;
}

.job-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.job-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.job-status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.job-status.active {
  background-color: #dcfce7;
  color: #166534;
}

.job-status.pending {
  background-color: #fef3c7;
  color: #92400e;
}

.job-status.closed {
  background-color: #fee2e2;
  color: #b91c1c;
}

.job-status.approved {
  background-color: #dcfce7;
  color: #166534;
}

.job-status.rejected {
  background-color: #fee2e2;
  color: #b91c1c;
}

.job-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #475569;
  font-size: 0.9rem;
}

.detail-item i {
  color: #94a3b8;
  width: 1rem;
  text-align: center;
}

.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f1f5f9;
  padding-top: 1rem;
}

.applications-count {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #475569;
}

.applications-count i {
  color: #4f46e5;
}

.job-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-icon.view {
  color: #4f46e5;
  background-color: #e0e7ff;
}

.btn-icon.view:hover {
  background-color: #c7d2fe;
}

.btn-icon.edit {
  color: #2563eb;
  background-color: #dbeafe;
}

.btn-icon.edit:hover {
  background-color: #bfdbfe;
}

.btn-icon.delete {
  color: #dc2626;
  background-color: #fee2e2;
}

.btn-icon.delete:hover {
  background-color: #fecaca;
}

/* Pagination Controls */
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.pagination-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn:not(:disabled):hover {
  background-color: #f1f5f9;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover {
  background-color: #f1f5f9;
}

.page-btn.active {
  background-color: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.25rem;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

/* Button Styles */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  border: none;
}

.btn i {
  font-size: 0.9rem;
}

.btn.primary {
  background-color: #4f46e5;
  color: white;
}

.btn.primary:hover {
  background-color: #4338ca;
}

.btn.secondary {
  background-color: #f1f5f9;
  color: #334155;
}

.btn.secondary:hover {
  background-color: #e2e8f0;
}

.btn.danger {
  background-color: #dc2626;
  color: white;
}

.btn.danger:hover {
  background-color: #b91c1c;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }
  
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .header-actions .btn {
    width: 100%;
  }
  
  .search-filter-bar {
    flex-direction: column;
  }
  
  .search-box {
    min-width: 100%;
  }
  
  .filter-controls {
    width: 100%;
  }
  
  .filter-select {
    flex: 1;
  }
  
  .stats-overview {
    flex-direction: column;
  }
  
  .jobs-grid {
    grid-template-columns: 1fr;
  }
}
</style>