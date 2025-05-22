<template>
  <div class="applications-dashboard">
    <!-- Header Section -->
    <div class="dashboard-header">
      <h1 class="title">Job Applications</h1>
      <div class="controls">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search applications..." 
            @input="filterApplications"
          >
          <svg class="search-icon" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
        <div class="filter-dropdown">
          <select v-model="statusFilter" @change="filterApplications">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="stats-bar">
      <div class="stat-card">
        <div class="stat-value">{{ totalApplications }}</div>
        <div class="stat-label">Total</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ pendingCount }}</div>
        <div class="stat-label">Pending</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ acceptedCount }}</div>
        <div class="stat-label">Approved</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ rejectedCount }}</div>
        <div class="stat-label">Rejected</div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading applications...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredApplications.length === 0" class="empty-state">
      <svg class="empty-icon" viewBox="0 0 24 24">
        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
      </svg>
      <h3>No applications found</h3>
      <p v-if="searchQuery || statusFilter">Try adjusting your search or filter criteria</p>
      <p v-else>No applications have been submitted yet</p>
    </div>

    <!-- Applications Grid -->
    <div v-else class="applications-grid">
      <div v-for="app in paginatedApplications" :key="app.id" class="application-card">
        <div class="card-header">
          <div class="job-info">
            <h2 class="job-title">{{ app.job.title }}</h2>
            <div class="job-meta">
              <span class="job-location">
                <svg class="icon" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {{ app.job.location }}
              </span>
              <span class="job-type">
                <svg class="icon" viewBox="0 0 24 24">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                </svg>
                {{ app.job.work_type }}
              </span>
            </div>
          </div>
          <span class="status-badge" :class="app.status">{{ app.status }}</span>
        </div>

        <div class="card-body">
          <div class="candidate-info">
            <div class="candidate-avatar">
              {{ getInitials(app.candidate.user.name) }}
            </div>
            <div class="candidate-details">
              <h3 class="candidate-name">{{ app.candidate.user.name }}</h3>
              <p class="candidate-title">{{ app.candidate.current_job }}</p>
              <div class="candidate-meta">
                <span>
                  <svg class="icon" viewBox="0 0 24 24">
                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"/>
                  </svg>
                  {{ app.candidate.experience_level }}
                </span>
                <span>
                  <svg class="icon" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {{ app.candidate.location }}
                </span>
              </div>
            </div>
          </div>

          <div class="application-details">
            <div class="detail-row">
              <label>Applied On</label>
              <p>{{ formatDate(app.created_at) }}</p>
            </div>
            <div class="detail-row">
              <label>Contact</label>
              <p>{{ app.contact_phone }}</p>
            </div>
            <div class="detail-row">
              <label>Links</label>
              <div class="links">
                <a :href="app.candidate.linkedin_profile" target="_blank" class="link-button">
                  <svg class="icon" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  LinkedIn
                </a>
                <a :href="getResumeUrl(app.resume_snapshot)" target="_blank" class="link-button">
                  <svg class="icon" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
                  View CV
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <router-link :to="`/applications/${app.id}`" class="action-button">
            View Details
            <svg class="arrow-icon" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div v-if="filteredApplications.length > 0" class="pagination-controls">
      <button 
        class="pagination-button" 
        :disabled="currentPage === 1" 
        @click="currentPage--"
      >
        Previous
      </button>
      <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
      <button 
        class="pagination-button" 
        :disabled="currentPage === totalPages" 
        @click="currentPage++"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const applications = ref([])
const filteredApplications = ref([])
const loading = ref(true)
const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

// Fetch applications from API
const fetchApplications = async () => {
  try {
    loading.value = true
    const response = await axios.get('http://localhost:8000/api/employer/applications', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    applications.value = response.data
    filteredApplications.value = response.data
  } catch (error) {
    console.error('Error fetching applications:', error)
    if (error.response?.status === 401) {
      router.push('/login')
    }
  } finally {
    loading.value = false
  }
}

// Format date
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

// Get initials from name
const getInitials = (name) => {
  if (!name) return ''
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

// Get full resume URL
const getResumeUrl = (path) => {
  if (!path) return '#'
  return `http://localhost:8000/storage/${path}`
}

// Filter applications based on search and status
const filterApplications = () => {
  let filtered = [...applications.value]

  if (statusFilter.value) {
    filtered = filtered.filter(app => app.status === statusFilter.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(app =>
      (app.job?.title?.toLowerCase().includes(query)) ||
      (app.candidate?.user?.name?.toLowerCase().includes(query)) ||
      (app.candidate?.current_job?.toLowerCase().includes(query))
    )
  }

  filteredApplications.value = filtered
  currentPage.value = 1
}


// Computed properties
const totalApplications = computed(() => applications.value.length)
const pendingCount = computed(() => applications.value.filter(app => app.status === 'pending').length)
const acceptedCount = computed(() => applications.value.filter(app => app.status === 'approved').length)
const rejectedCount = computed(() => applications.value.filter(app => app.status === 'rejected').length)

const paginatedApplications = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredApplications.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredApplications.value.length / itemsPerPage)
})

// Fetch applications on component mount
onMounted(fetchApplications)
</script>

<style scoped>
.applications-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  min-width: 250px;
}

.search-box input {
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 100%;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.search-box input:focus {
  outline: none;
  border-color: #4640DE;
  box-shadow: 0 0 0 2px rgba(70, 64, 222, 0.1);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  fill: #9e9e9e;
}

.filter-dropdown select {
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9rem;
  background-color: white;
  cursor: pointer;
}

.filter-dropdown select:focus {
  outline: none;
  border-color: #4640DE;
}

.stats-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #4640DE;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(70, 64, 222, 0.1);
  border-radius: 50%;
  border-top-color: #4640DE;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 4rem 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.empty-icon {
  width: 4rem;
  height: 4rem;
  fill: #e0e0e0;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #666;
  margin: 0;
}

.applications-grid {
  display: grid;
  gap: 1.5rem;
}

.application-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.application-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.job-info {
  flex: 1;
}

.job-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
}

.job-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #666;
}

.job-meta span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.icon {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
}

.status-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge.pending {
  background-color: #FFF4E5;
  color: #A95C00;
}

.status-badge.accepted {
  background-color: #E6F4EA;
  color: #1A7F37;
}

.status-badge.rejected {
  background-color: #FCE8E6;
  color: #C62828;
}

.card-body {
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.candidate-info {
  display: flex;
  gap: 1rem;
}

.candidate-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #4640DE;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.candidate-details {
  flex: 1;
}

.candidate-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: #1a1a1a;
}

.candidate-title {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 0.75rem 0;
}

.candidate-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #666;
}

.candidate-meta span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.application-details {
  display: grid;
  gap: 1rem;
}

.detail-row {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 0.5rem;
}

.detail-row label {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}

.detail-row p {
  margin: 0;
  font-size: 0.9rem;
  color: #1a1a1a;
}

.links {
  display: flex;
  gap: 0.75rem;
}

.link-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: #f5f5f5;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #4640DE;
  text-decoration: none;
  transition: background 0.2s;
}

.link-button:hover {
  background: #e0e0e0;
}

.card-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #f0f0f0;
  text-align: right;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #4640DE;
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s;
}

.action-button:hover {
  background-color: #372eb6;
}

.arrow-icon {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-button {
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-button:hover:not(:disabled) {
  background: #f5f5f5;
  border-color: #d0d0d0;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.9rem;
  color: #666;
}

@media (max-width: 768px) {
  .card-body {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .detail-row {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
  
  .dashboard-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .controls {
    flex-direction: column;
  }
  
  .search-box, .filter-dropdown select {
    width: 100%;
  }
}
</style>