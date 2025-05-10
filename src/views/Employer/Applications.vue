<template>
  <div class="employer-applications">
    <!-- Header -->
    <header class="applications-header">
      <div class="header-content">
        <h1>Job Applications Management</h1>
        <p>View and manage all applications for your job postings</p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="applications-main">
      <!-- Stats Overview -->
      <StatsCards :stats="stats" />

      <!-- Filter and Applications with right-side filter -->
      <div class="applications-container">
        <!-- Applications List -->
        <div class="applications-list">
          <div class="applications-card">
            <!-- Applications Header with white text -->
            <div class="applications-header white-text">
              <h2>{{ selectedJob ? `Applications for ${selectedJob.title}` : 'All Applications' }}</h2>
              <p>Showing {{ paginatedApplications.length }} of {{ filteredApplications.length }} applications</p>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="loading-state">
              <div class="loading-spinner"></div>
              <p>Loading applications...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="filteredApplications.length === 0" class="empty-state">
              <div class="empty-icon">📭</div>
              <p>No applications found</p>
            </div>

            <!-- Applications List with Pagination -->
            <div v-else>
              <ul class="applications-items">
                <transition-group name="fade-list">
                  <ApplicationCard
                    v-for="application in paginatedApplications"
                    :key="application.id"
                    :application="application"
                    @status-change="updateApplicationStatus"
                  />
                </transition-group>
              </ul>

              <!-- Pagination Controls -->
              <div class="pagination-controls">
                <div class="pagination-info">
                  Showing {{ paginationStart }} to {{ paginationEnd }} of {{ filteredApplications.length }} entries
                </div>
                <div class="pagination-buttons">
                  <button 
                    @click="prevPage" 
                    :disabled="currentPage === 1"
                    class="pagination-button"
                  >
                    Previous
                  </button>
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="goToPage(page)"
                    :class="{ active: page === currentPage, 'ellipsis': page === '...' }"
                    class="page-button"
                    :disabled="page === '...'"
                  >
                    {{ page }}
                  </button>
                  <button 
                    @click="nextPage" 
                    :disabled="currentPage === totalPages"
                    class="pagination-button"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter Sidebar - Right side -->
        <JobFilter 
          :jobs="jobs"
          :stats="stats"
          @filter="handleFilter"
          class="filter-sidebar right-sidebar"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import StatsCards from '@/components/employer/Applications/StatsCards.vue'
import JobFilter from '@/components/employer/Applications/JobFilter.vue'
import ApplicationCard from '@/components/employer/Applications/ApplicationCard.vue'

export default {
  components: { StatsCards, JobFilter, ApplicationCard },
  
  setup() {
    const loading = ref(true)
    const applications = ref([])
    const jobs = ref([])
    const selectedJob = ref(null)
    const searchQuery = ref('')
    const selectedStatuses = ref([])
    
    // Pagination variables
    const currentPage = ref(1)
    const itemsPerPage = ref(3)

    // Fetch data from JSON
    onMounted(async () => {
      try {
        const response = await fetch('/db.json')
        const db = await response.json()

        applications.value = db.applications.map(app => ({
          ...app,
          candidate: db.users.find(u => u.id === app.candidate_id),
          job: db.jobs.find(j => j.id === app.job_id)
        }))

        jobs.value = db.jobs.filter(job => job.status === 'approved')
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        loading.value = false
      }
    })

    // Reset to first page when filters change
    watch([selectedJob, searchQuery, selectedStatuses], () => {
      currentPage.value = 1
    })

    // Calculate stats
    const stats = computed(() => ({
      total: applications.value.length,
      pending: applications.value.filter(a => a.status === 'pending').length,
      accepted: applications.value.filter(a => a.status === 'accepted').length,
      rejected: applications.value.filter(a => a.status === 'rejected').length
    }))

    // Filter applications
    const filteredApplications = computed(() => {
      let result = applications.value
      
      // Filter by selected job
      if (selectedJob.value) {
        result = result.filter(app => app.job_id === selectedJob.value.id)
      }
      
      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(app => 
          app.candidate.name.toLowerCase().includes(query) ||
          app.job.title.toLowerCase().includes(query)
        )
      }
      
      // Filter by status
      if (selectedStatuses.value.length > 0) {
        result = result.filter(app => selectedStatuses.value.includes(app.status))
      }
      
      return result
    })

    // Pagination calculations
    const totalPages = computed(() => {
      return Math.ceil(filteredApplications.value.length / itemsPerPage.value)
    })

    const paginatedApplications = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return filteredApplications.value.slice(start, end)
    })

    const paginationStart = computed(() => {
      return (currentPage.value - 1) * itemsPerPage.value + 1
    })

    const paginationEnd = computed(() => {
      const end = currentPage.value * itemsPerPage.value
      return end > filteredApplications.value.length ? filteredApplications.value.length : end
    })

    const visiblePages = computed(() => {
      const pages = []
      const maxVisiblePages = 5
      
      if (totalPages.value <= maxVisiblePages) {
        for (let i = 1; i <= totalPages.value; i++) {
          pages.push(i)
        }
      } else {
        // Always show first page
        pages.push(1)
        
        // Calculate window around current page
        let start = Math.max(2, currentPage.value - 1)
        let end = Math.min(totalPages.value - 1, currentPage.value + 1)
        
        // Add ellipsis if needed
        if (start > 2) {
          pages.push('...')
        }
        
        // Add middle pages
        for (let i = start; i <= end; i++) {
          pages.push(i)
        }
        
        // Add ellipsis if needed
        if (end < totalPages.value - 1) {
          pages.push('...')
        }
        
        // Always show last page
        pages.push(totalPages.value)
      }
      
      return pages
    })

    // Pagination methods
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
      if (page !== '...') {
        currentPage.value = page
      }
    }

    // Methods
    const handleFilter = (filter) => {
      selectedJob.value = filter.job
      searchQuery.value = filter.search
      selectedStatuses.value = filter.statuses
    }

    const updateApplicationStatus = (id, status) => {
      const index = applications.value.findIndex(app => app.id === id)
      if (index !== -1) {
        applications.value[index].status = status
      }
    }

    return {
      loading,
      applications,
      jobs,
      selectedJob,
      searchQuery,
      selectedStatuses,
      stats,
      filteredApplications,
      paginatedApplications,
      currentPage,
      totalPages,
      paginationStart,
      paginationEnd,
      visiblePages,
      nextPage,
      prevPage,
      goToPage,
      handleFilter,
      updateApplicationStatus
    }
  }
}
</script>

<style scoped>
/* Base Styles */
.employer-applications {
  min-height: 100vh;
  background-color: #f5f7fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.applications-header {
  background-color: #3a4a6d;
  color: white;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.header-content h1 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
}

.header-content p {
  margin: 0.5rem 0 0;
  color: #a3b8ff;
  font-size: 1rem;
}

.applications-main {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

/* Main container with right-side filter */
.applications-container {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  margin-top: 2rem;
}

.filter-sidebar {
  flex: 0 0 300px;
}

/* Right sidebar specific styles */
.right-sidebar {
  position: sticky;
  top: 20px;
  height: fit-content;
  align-self: flex-start;
  margin-left: auto;
}

.applications-list {
  flex: 1;
  min-width: 0;
}

.applications-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* White text for applications header */
.applications-header.white-text {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #eaeef5;
  background-color: #3a4a6d;
  color: white;
}

.applications-header.white-text h2 {
  color: white;
  margin: 0;
  font-size: 1.5rem;
}

.applications-header.white-text p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0.5rem 0 0;
}

.loading-state {
  padding: 3rem;
  text-align: center;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 4px solid rgba(74, 108, 247, 0.1);
  border-top-color: #4a6cf7;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: #718096;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.applications-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Pagination Styles */
.pagination-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  gap: 1rem;
  border-top: 1px solid #eaeef5;
}

.pagination-info {
  color: #64748b;
  font-size: 0.875rem;
}

.pagination-buttons {
  display: flex;
  gap: 0.5rem;
}

.pagination-button {
  padding: 0.5rem 1rem;
  background-color: white;
  color: #3a4a6d;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-button:hover:not(:disabled) {
  background-color: #f1f5f9;
  border-color: #3a4a6d;
}

.pagination-button:disabled {
  color: #a0aec0;
  cursor: not-allowed;
  opacity: 0.7;
}

.page-button {
  min-width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-button:hover:not(.ellipsis):not(.active) {
  background-color: #f1f5f9;
  border-color: #3a4a6d;
}

.page-button.active {
  background-color: #3a4a6d;
  color: white;
  border-color: #3a4a6d;
}

.page-button.ellipsis {
  cursor: default;
  border: none;
  background: transparent;
}

/* Animations */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.3s ease;
}

.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 992px) {
  .applications-container {
    flex-direction: column;
  }
  
  .right-sidebar {
    position: static;
    margin-left: 0;
    width: 100%;
    order: -1;
  }
  
  .filter-sidebar {
    flex: 0 0 auto;
  }

  .pagination-buttons {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>