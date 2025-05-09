<template>
    <div class="applications-container">
      <div class="applications-header">
        <h1>Job Applications</h1>
        <div class="header-actions">
          <div class="search-filter">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search applications..."
              class="search-input"
            >
            <select v-model="statusFilter" class="status-filter">
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <button class="export-btn">
            <i class="fas fa-download"></i> Export
          </button>
        </div>
      </div>
  
      <div class="applications-content">
        <div v-if="loading" class="loading-overlay">
          <div class="spinner"></div>
        </div>
  
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
  
        <div v-else>
          <div class="stats-summary">
            <div class="stat-card">
              <div class="stat-value">{{ totalApplications }}</div>
              <div class="stat-label">Total Applications</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ pendingCount }}</div>
              <div class="stat-label">Pending</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ acceptedCount }}</div>
              <div class="stat-label">Accepted</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ rejectedCount }}</div>
              <div class="stat-label">Rejected</div>
            </div>
          </div>
  
          <div class="applications-table-container">
            <table class="applications-table">
              <thead>
                <tr>
                  <th @click="sortApplications('candidate_name')">
                    Candidate
                    <i class="fas" :class="sortIcon('candidate_name')"></i>
                  </th>
                  <th @click="sortApplications('job_title')">
                    Job Position
                    <i class="fas" :class="sortIcon('job_title')"></i>
                  </th>
                  <th @click="sortApplications('created_at')">
                    Applied On
                    <i class="fas" :class="sortIcon('created_at')"></i>
                  </th>
                  <th @click="sortApplications('status')">
                    Status
                    <i class="fas" :class="sortIcon('status')"></i>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="app in filteredApplications" :key="app.id">
                  <td>
                    <div class="candidate-info">
                      <div class="candidate-avatar">
                        <i class="fas fa-user"></i>
                      </div>
                      <div>
                        <div class="candidate-name">{{ app.candidate_name }}</div>
                        <div class="candidate-email">{{ app.contact_email }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="job-title">{{ app.job_title }}</div>
                    <div class="job-id">#{{ app.job_id }}</div>
                  </td>
                  <td>{{ formatDate(app.created_at) }}</td>
                  <td>
                    <span class="status-badge" :class="app.status.toLowerCase()">
                      {{ app.status }}
                    </span>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <button 
                        class="action-btn view-btn"
                        @click="viewApplication(app.id)"
                      >
                        <i class="fas fa-eye"></i>
                      </button>
                      <button 
                        class="action-btn accept-btn"
                        @click="updateStatus(app.id, 'Accepted')"
                        :disabled="app.status === 'Accepted'"
                      >
                        <i class="fas fa-check"></i>
                      </button>
                      <button 
                        class="action-btn reject-btn"
                        @click="updateStatus(app.id, 'Rejected')"
                        :disabled="app.status === 'Rejected'"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                      <button 
                        class="action-btn delete-btn"
                        @click="confirmDelete(app.id)"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
  
            <div v-if="filteredApplications.length === 0" class="no-results">
              <i class="fas fa-inbox"></i>
              <p>No applications found matching your criteria</p>
            </div>
  
            <div class="pagination-controls" v-if="filteredApplications.length > 0">
              <button 
                @click="prevPage" 
                :disabled="currentPage === 1"
                class="pagination-btn"
              >
                <i class="fas fa-chevron-left"></i>
              </button>
              <span class="page-info">
                Page {{ currentPage }} of {{ totalPages }}
              </span>
              <button 
                @click="nextPage" 
                :disabled="currentPage === totalPages"
                class="pagination-btn"
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Application Detail Modal -->
      <div v-if="selectedApplication" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Application Details</h3>
            <button @click="selectedApplication = null" class="close-modal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="detail-section">
              <h4>Candidate Information</h4>
              <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span>{{ selectedApplication.candidate_name }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span>{{ selectedApplication.contact_email }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span>{{ selectedApplication.contact_phone }}</span>
              </div>
            </div>
  
            <div class="detail-section">
              <h4>Job Information</h4>
              <div class="detail-row">
                <span class="detail-label">Position:</span>
                <span>{{ selectedApplication.job_title }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Applied On:</span>
                <span>{{ formatDate(selectedApplication.created_at) }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="status-badge" :class="selectedApplication.status.toLowerCase()">
                  {{ selectedApplication.status }}
                </span>
              </div>
            </div>
  
            <div class="detail-section">
              <h4>Resume</h4>
              <div class="resume-preview">
                <iframe 
                  :src="selectedApplication.resume_snapshot" 
                  frameborder="0"
                  class="resume-iframe"
                ></iframe>
                <a 
                  :href="selectedApplication.resume_snapshot" 
                  target="_blank"
                  class="download-resume"
                >
                  <i class="fas fa-download"></i> Download Resume
                </a>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="selectedApplication = null" class="modal-close-btn">
              Close
            </button>
          </div>
        </div>
      </div>
  
      <!-- Delete Confirmation Modal -->
      <div v-if="applicationToDelete" class="confirm-modal-overlay">
        <div class="confirm-modal">
          <div class="confirm-modal-header">
            <h3>Confirm Deletion</h3>
          </div>
          <div class="confirm-modal-body">
            <p>Are you sure you want to delete this application?</p>
            <p>This action cannot be undone.</p>
          </div>
          <div class="confirm-modal-footer">
            <button @click="applicationToDelete = null" class="cancel-btn">
              Cancel
            </button>
            <button @click="deleteApplication" class="confirm-delete-btn">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useApplicationStore } from '@/stores/applicationStore'
  import { useJobStore } from '@/stores/jobStore'
  import { useCandidateStore } from '@/stores/candidateStore'
  import { format } from 'date-fns'
  
  const applicationStore = useApplicationStore()
  const jobStore = useJobStore()
  const candidateStore = useCandidateStore()
  
  // Data
  const searchQuery = ref('')
  const statusFilter = ref('')
  const sortField = ref('created_at')
  const sortDirection = ref('desc')
  const currentPage = ref(1)
  const itemsPerPage = 10
  const selectedApplication = ref(null)
  const applicationToDelete = ref(null)
  
  // Fetch data
  onMounted(async () => {
  try {
    console.log("Starting data loading...")
    
    // تحميل المستخدمين أولاً لأن المرشحين يحتاجونهم
    await candidateStore.fetchUsers()
    console.log("Users loaded:", candidateStore.users)
    
    // ثم المرشحين
    await candidateStore.fetchCandidates()
    console.log("Candidates loaded:", candidateStore.candidates)
    
    // ثم الوظائف
    await jobStore.fetchJobs()
    console.log("Jobs loaded:", jobStore.jobs)
    
    // وأخيراً التطبيقات
    await applicationStore.fetchApplications()
    console.log("Applications loaded:", applicationStore.applications)
    
    console.log("All data loaded successfully")
  } catch (error) {
    console.error("Error loading data:", error)
  }
})
  // Computed properties
  const applicationsWithDetails = computed(() => {
  return applicationStore.applications.map(app => {
    const job = jobStore.jobs.find(j => j.id === app.job_id) || {}
    const candidate = candidateStore.candidates.find(c => c.id === app.candidate_id) || {}
    const user = candidateStore.users.find(u => u.id === candidate.user_id) || {}
    
    return {
      ...app,
      job_title: job.title || 'Unknown Job',
      candidate_name: user.name || 'Unknown Candidate',
      contact_email: app.contact_email,
      created_at: app.created_at
    }
  })
})
  const filteredApplications = computed(() => {
    let filtered = applicationsWithDetails.value
  
    // Apply search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(app => 
  (app.candidate_name && app.candidate_name.toLowerCase().includes(query)) ||
  (app.job_title && app.job_title.toLowerCase().includes(query)) ||
  (app.contact_email && app.contact_email.toLowerCase().includes(query))
);
    }
  
    // Apply status filter
    if (statusFilter.value) {
  filtered = filtered.filter(app => 
    app.status.toLowerCase() === statusFilter.value.toLowerCase()
  )
}
  
    // Apply sorting
    filtered.sort((a, b) => {
      const fieldA = a[sortField.value]
      const fieldB = b[sortField.value]
      
      if (fieldA < fieldB) return sortDirection.value === 'asc' ? -1 : 1
      if (fieldA > fieldB) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  
    // Apply pagination
    const start = (currentPage.value - 1) * itemsPerPage
    return filtered.slice(start, start + itemsPerPage)
  })
  
  const totalApplications = computed(() => applicationsWithDetails.value.length)
  const pendingCount = computed(() => applicationsWithDetails.value.filter(app => app.status === 'pending').length)
  const acceptedCount = computed(() => applicationsWithDetails.value.filter(app => app.status === 'Accepted').length)
  const rejectedCount = computed(() => applicationsWithDetails.value.filter(app => app.status === 'Rejected').length)
  const totalPages = computed(() => Math.ceil(applicationsWithDetails.value.length / itemsPerPage))
  
  // Methods
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy')
  }
  
  const sortApplications = (field: string) => {
    if (sortField.value === field) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortField.value = field
      sortDirection.value = 'asc'
    }
  }
  
  const sortIcon = (field: string) => {
    if (sortField.value !== field) return 'fa-sort'
    return sortDirection.value === 'asc' ? 'fa-sort-up' : 'fa-sort-down'
  }
  
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
  
  const viewApplication = (id: number) => {
    selectedApplication.value = applicationsWithDetails.value.find(app => app.id === id)
  }
  
  const updateStatus = async (id: number, status: string) => {
    try {
      await applicationStore.updateApplicationStatus(id, status)
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }
  
  const confirmDelete = (id: number) => {
    applicationToDelete.value = id
  }
  
  const deleteApplication = async () => {
    if (applicationToDelete.value) {
      try {
        await applicationStore.deleteApplication(applicationToDelete.value)
        applicationToDelete.value = null
      } catch (error) {
        console.error('Failed to delete application:', error)
      }
    }
  }
  </script>
  
  <style scoped>
  .applications-container {
    padding: 2rem;
    background-color: #f8f9fa;
    min-height: 100vh;
  }
  
  .applications-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .applications-header h1 {
    font-size: 1.8rem;
    color: #202430;
    margin: 0;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .search-filter {
    display: flex;
    gap: 0.5rem;
  }
  
  .search-input {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    min-width: 250px;
  }
  
  .status-filter {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    background-color: white;
  }
  
  .export-btn {
    padding: 0.5rem 1rem;
    background-color: #4640DE;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background-color 0.2s;
  }
  
  .export-btn:hover {
    background-color: #3a36c9;
  }
  
  .stats-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .stat-card {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    text-align: center;
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 600;
    color: #202430;
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    color: #6c757d;
    font-size: 0.875rem;
  }
  
  .applications-table-container {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
  
  .applications-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .applications-table th {
    padding: 1rem;
    text-align: left;
    background-color: #f5f6fa;
    color: #6c757d;
    font-weight: 500;
    cursor: pointer;
    user-select: none;
  }
  
  .applications-table th:hover {
    background-color: #e9ebf5;
  }
  
  .applications-table td {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    color: #202430;
  }
  
  .candidate-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .candidate-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f5f6fa;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4640DE;
  }
  
  .candidate-name {
    font-weight: 500;
  }
  
  .candidate-email {
    font-size: 0.875rem;
    color: #6c757d;
  }
  
  .job-title {
    font-weight: 500;
  }
  
  .job-id {
    font-size: 0.875rem;
    color: #6c757d;
  }
  
  .status-badge {
    padding: 0.375rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: capitalize;
  }
  
  .status-badge.pending {
    background-color: #fff8e1;
    color: #ff9800;
  }
  
  .status-badge.accepted {
    background-color: #e8f5e9;
    color: #4caf50;
  }
  
  .status-badge.rejected {
    background-color: #ffebee;
    color: #f44336;
  }
  
  .action-buttons {
    display: flex;
    gap: 0.5rem;
  }
  
  .action-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }
  
  .action-btn:hover {
    background-color: #f5f6fa;
  }
  
  .view-btn {
    color: #4640DE;
  }
  
  .accept-btn {
    color: #4caf50;
  }
  
  .reject-btn {
    color: #f44336;
  }
  
  .delete-btn {
    color: #6c757d;
  }
  
  .action-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .no-results {
    padding: 3rem;
    text-align: center;
    color: #6c757d;
  }
  
  .no-results i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #ddd;
  }
  
  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border-top: 1px solid #eee;
  }
  
  .pagination-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid #ddd;
    background-color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.5rem;
  }
  
  .pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .page-info {
    margin: 0 1rem;
    color: #6c757d;
  }
  
  /* Modal Styles */
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
    border-radius: 0.5rem;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
  
  .modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-header h3 {
    margin: 0;
    color: #202430;
  }
  
  .close-modal {
    background: none;
    border: none;
    font-size: 1.25rem;
    color: #6c757d;
    cursor: pointer;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .detail-section {
    margin-bottom: 2rem;
  }
  
  .detail-section h4 {
    color: #202430;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
  }
  
  .detail-row {
    display: flex;
    margin-bottom: 0.75rem;
  }
  
  .detail-label {
    font-weight: 500;
    color: #6c757d;
    min-width: 150px;
  }
  
  .resume-preview {
    border: 1px solid #eee;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .resume-iframe {
    width: 100%;
    height: 500px;
    border: none;
  }
  
  .download-resume {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #4640DE;
    color: white;
    text-decoration: none;
    border-radius: 0.5rem;
    margin-top: 1rem;
    transition: background-color 0.2s;
  }
  
  .download-resume:hover {
    background-color: #3a36c9;
  }
  
  .modal-footer {
    padding: 1.5rem;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
  }
  
  .modal-close-btn {
    padding: 0.5rem 1.5rem;
    background-color: #f5f6fa;
    color: #6c757d;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .modal-close-btn:hover {
    background-color: #e9ebf5;
  }
  
  /* Delete Confirmation Modal */
  .confirm-modal-overlay {
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
  
  .confirm-modal {
    background-color: white;
    border-radius: 0.5rem;
    width: 90%;
    max-width: 400px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
  
  .confirm-modal-header {
    padding: 1.5rem;
    background-color: #f5f6fa;
    border-bottom: 1px solid #eee;
  }
  
  .confirm-modal-header h3 {
    margin: 0;
    color: #202430;
  }
  
  .confirm-modal-body {
    padding: 1.5rem;
    color: #6c757d;
  }
  
  .confirm-modal-footer {
    padding: 1.5rem;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  
  .cancel-btn {
    padding: 0.5rem 1.5rem;
    background-color: #f5f6fa;
    color: #6c757d;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .cancel-btn:hover {
    background-color: #e9ebf5;
  }
  
  .confirm-delete-btn {
    padding: 0.5rem 1.5rem;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .confirm-delete-btn:hover {
    background-color: #e53935;
  }
  
  /* Loading Spinner */
  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #4640DE;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .error-message {
    padding: 1rem;
    background-color: #ffebee;
    color: #f44336;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  </style>