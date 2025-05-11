<template>
  <div class="application-details-page">
    <!-- Header with back button -->
    <div class="page-header">
      <router-link to="/employer/applications" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Applications
      </router-link>
      <h1>Application Details</h1>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading application details...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-state">
      <div class="error-icon">⚠️</div>
      <h3>Failed to load application</h3>
      <p>{{ error }}</p>
      <button @click="fetchApplication" class="retry-button">Retry</button>
    </div>

    <!-- Main content -->
    <div v-else-if="application" class="application-content">
      <div class="application-main">
        <!-- Candidate profile section -->
        <div class="candidate-profile">
          <div class="profile-header">
            <div class="avatar">
              {{ candidateInitial }}
            </div>
            <div class="profile-info">
              <h2>{{ application.candidate.name }}</h2>
              <p class="meta">
                Applied for <span class="highlight">{{ application.job.title }}</span>
                on <span class="highlight">{{ formatDate(application.created_at) }}</span>
              </p>
              <StatusChip :status="application.status" class="status-chip" />
            </div>
          </div>
          <div v-if="application.candidate">
  <h2>{{ application.candidate.name || 'No name provided' }}</h2>
  <p class="meta">Email: {{ application.candidate.email || 'Not specified' }}</p>
  
  <!-- عرض بيانات المرشح الإضافية إذا وجدت -->
  <div v-if="application.candidate.phone_number">
    <p>Phone: {{ application.candidate.phone_number }}</p>
  </div>
  <div v-if="application.candidate.bio">
    <h3>About</h3>
    <p>{{ application.candidate.bio }}</p>
  </div>
</div>
<div v-else>
  <p>Candidate information not available</p>
</div>

          <!-- Application actions -->
          <div class="application-actions">
            <button 
              @click="changeStatus('accepted')" 
              :disabled="application.status === 'accepted'"
              class="action-button accept"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Accept
            </button>
            <button 
              @click="changeStatus('rejected')" 
              :disabled="application.status === 'rejected'"
              class="action-button reject"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Reject
            </button>
            <a 
              :href="application.resume_snapshot" 
              target="_blank"
              class="action-button view-resume"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
              View Resume
            </a>
          </div>
        </div>

        <!-- Tabs navigation -->
        <div class="tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="{ active: activeTab === tab.id }"
            class="tab-button"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab content -->
        <div class="tab-content">
          <!-- Candidate Information -->
          <div v-if="activeTab === 'info'" class="tab-pane">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="info-section">
                <h3>Personal Information</h3>
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">Email:</span>
                    <span class="info-value">{{ application.candidate.email }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Phone:</span>
                    <span class="info-value">{{ application.candidate.phone_number }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Location:</span>
                    <span class="info-value">{{ application.candidate.location }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Experience Level:</span>
                    <span class="info-value">{{ application.candidate.experience_level }}</span>
                  </div>
                </div>
              </div>

              <div class="info-section">
                <h3>Professional Information</h3>
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">Current Job:</span>
                    <span class="info-value">{{ application.candidate.current_job || 'Not specified' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Experience:</span>
                    <span class="info-value">{{ application.candidate.experience_years }} years</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Highest Qualification:</span>
                    <span class="info-value">{{ application.candidate.highest_qualification || 'Not specified' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Skills:</span>
                    <span class="info-value">{{ application.candidate.skills }}</span>
                  </div>
                </div>
              </div>

              <div class="info-section col-span-full">
                <h3>About Candidate</h3>
                <p class="bio">{{ application.candidate.bio || 'No bio provided' }}</p>
              </div>
            </div>
          </div>

          <!-- Job Information -->
          <div v-if="activeTab === 'job'" class="tab-pane">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="info-section">
                <h3>Job Details</h3>
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">Title:</span>
                    <span class="info-value">{{ application.job.title }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Location:</span>
                    <span class="info-value">{{ application.job.location }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Work Type:</span>
                    <span class="info-value">{{ application.job.work_type }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Salary Range:</span>
                    <span class="info-value">{{ application.job.salary_range }}</span>
                  </div>
                </div>
              </div>

              <div class="info-section">
                <h3>Requirements</h3>
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">Skills:</span>
                    <span class="info-value">{{ application.job.skills }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Technologies:</span>
                    <span class="info-value">{{ application.job.technologies }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Experience Level:</span>
                    <span class="info-value">{{ application.job.category }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Application Deadline:</span>
                    <span class="info-value">{{ formatDate(application.job.deadline) }}</span>
                  </div>
                </div>
              </div>

              <div class="info-section col-span-full">
                <h3>Job Description</h3>
                <p class="job-description">{{ application.job.description }}</p>
              </div>

              <div class="info-section col-span-full">
                <h3>Responsibilities</h3>
                <p class="job-description">{{ application.job.responsibilities }}</p>
              </div>
            </div>
          </div>

          <!-- Resume Preview -->
          <div v-if="activeTab === 'resume'" class="tab-pane">
            <ResumeViewer :resumeUrl="application.resume_snapshot" />
          </div>

          <!-- Activity Timeline -->
          <div v-if="activeTab === 'activity'" class="tab-pane">
            <ApplicationTimeline :applicationId="application.id" />
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="application-sidebar">
        <div class="sidebar-card">
          <h3>Quick Actions</h3>
          <div class="action-buttons">
            <button 
              @click="changeStatus('accepted')" 
              :disabled="application.status === 'accepted'"
              class="sidebar-button accept"
            >
              Accept Application
            </button>
            <button 
              @click="changeStatus('rejected')" 
              :disabled="application.status === 'rejected'"
              class="sidebar-button reject"
            >
              Reject Application
            </button>
            <a 
              :href="`mailto:${application.candidate.email}`" 
              class="sidebar-button email"
            >
              Send Email
            </a>
            <a 
              :href="`tel:${application.candidate.phone_number}`" 
              class="sidebar-button phone"
            >
              Call Candidate
            </a>
          </div>
        </div>

        <div class="sidebar-card">
          <h3>Job Details</h3>
          <div class="job-meta">
            <div class="meta-item">
              <span class="meta-label">Position:</span>
              <span class="meta-value">{{ application.job.title }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Type:</span>
              <span class="meta-value">{{ application.job.work_type }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Location:</span>
              <span class="meta-value">{{ application.job.location }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Posted:</span>
              <span class="meta-value">{{ formatDate(application.job.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApplicationStore } from '@/stores/applicationStore'
import StatusChip from '@/components/employer/Applications/StatusChip.vue'
import ApplicationTimeline from '@/components/employer/Applications/ApplicationTimeline.vue'
import ResumeViewer from '@/components/employer/Applications/ResumeViewer.vue'

const route = useRoute()
const router = useRouter()
const applicationStore = useApplicationStore()

const application = ref(null)
const loading = ref(true)
const error = ref(null)
const activeTab = ref('info')

const tabs = [
  { id: 'info', label: 'Candidate Info' },
  { id: 'job', label: 'Job Details' },
  { id: 'resume', label: 'Resume' },
  { id: 'activity', label: 'Activity' }
]

const candidateInitial = computed(() => {
  return application.value?.candidate?.name?.charAt(0).toUpperCase() || ''
})

const fetchApplication = async () => {
  try {
    loading.value = true
    error.value = null
    const appId = parseInt(route.params.id)
    
    // جلب جميع البيانات أولاً إذا لم تكن محملة
    if (applicationStore.applications.length === 0) {
      await applicationStore.fetchApplications()
    }
    
    application.value = applicationStore.getApplicationById(appId)
    
    if (!application.value) {
      throw new Error('Application not found')
    }
    
    // Debugging: عرض البيانات في الكونسول
    console.log('Application:', application.value)
    console.log('Candidate:', application.value.candidate)
    console.log('Job:', application.value.job)
    
  } catch (err) {
    error.value = err.message || 'Failed to load application details'
    console.error('Error fetching application:', err)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

const changeStatus = async (status) => {
  try {
    await applicationStore.updateApplicationStatus(application.value.id, status)
    application.value.status = status
    
    // Force refresh the data
    await fetchApplication()
  } catch (err) {
    console.error('Error updating status:', err)
  }
}

onMounted(() => {
  fetchApplication()
})
</script>


<style scoped>
.application-details-page {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding-bottom: 2rem;
}

.page-header {
  background-color: #3a4a6d;
  color: white;
  padding: 1.5rem;
  position: relative;
}

.page-header h1 {
  margin: 0.5rem 0 0;
  font-size: 1.75rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s;
}

.back-button:hover {
  color: white;
}

.back-button svg {
  width: 1rem;
  height: 1rem;
}

.loading-state,
.error-state {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
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

.error-state {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-state h3 {
  margin: 0 0 0.5rem;
  color: #dc2626;
}

.error-state p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.retry-button {
  background-color: #4a6cf7;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.retry-button:hover {
  background-color: #3a56d4;
}

.application-content {
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 0 1.5rem;
  display: flex;
  gap: 1.5rem;
}

.application-main {
  flex: 1;
  min-width: 0;
}

.application-sidebar {
  flex: 0 0 300px;
  position: sticky;
  top: 20px;
  height: fit-content;
}

.candidate-profile {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.profile-header {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 4rem;
  height: 4rem;
  background-color: #3a4a6d;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
}

.profile-info h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #1f2937;
}

.meta {
  margin: 0.5rem 0 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.highlight {
  color: #3a4a6d;
  font-weight: 500;
}

.status-chip {
  margin-top: 0.75rem;
}

.application-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.action-button svg {
  width: 1rem;
  height: 1rem;
}

.action-button.accept {
  background-color: #d1fae5;
  color: #065f46;
  border-color: #a7f3d0;
}

.action-button.accept:hover:not(:disabled) {
  background-color: #a7f3d0;
}

.action-button.accept:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.action-button.reject {
  background-color: #fee2e2;
  color: #991b1b;
  border-color: #fecaca;
}

.action-button.reject:hover:not(:disabled) {
  background-color: #fecaca;
}

.action-button.reject:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.action-button.view-resume {
  background-color: #e0e7ff;
  color: #4a6cf7;
  border-color: #c7d2fe;
}

.action-button.view-resume:hover {
  background-color: #c7d2fe;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  position: relative;
  transition: all 0.2s;
}

.tab-button:hover {
  color: #4a6cf7;
}

.tab-button.active {
  color: #4a6cf7;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #4a6cf7;
}

.tab-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.tab-pane {
  animation: fadeIn 0.3s ease;
}

.info-section {
  margin-bottom: 1.5rem;
}

.info-section h3 {
  margin: 0 0 1rem;
  font-size: 1.125rem;
  color: #1f2937;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.info-value {
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 500;
}

.bio,
.job-description {
  color: #4b5563;
  line-height: 1.6;
  white-space: pre-line;
}

.sidebar-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.sidebar-card h3 {
  margin: 0 0 1rem;
  font-size: 1.125rem;
  color: #1f2937;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-button {
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  text-align: center;
  text-decoration: none;
  display: block;
}

.sidebar-button.accept {
  background-color: #d1fae5;
  color: #065f46;
}

.sidebar-button.accept:hover:not(:disabled) {
  background-color: #a7f3d0;
}

.sidebar-button.accept:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.sidebar-button.reject {
  background-color: #fee2e2;
  color: #991b1b;
}

.sidebar-button.reject:hover:not(:disabled) {
  background-color: #fecaca;
}

.sidebar-button.reject:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.sidebar-button.email {
  background-color: #e0e7ff;
  color: #4a6cf7;
}

.sidebar-button.email:hover {
  background-color: #c7d2fe;
}

.sidebar-button.phone {
  background-color: #ecfdf5;
  color: #047857;
}

.sidebar-button.phone:hover {
  background-color: #d1fae5;
}

.job-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
}

.meta-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.meta-value {
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 500;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 1024px) {
  .application-content {
    flex-direction: column;
  }
  
  .application-sidebar {
    flex: 0 0 auto;
    width: 100%;
  }
}

@media (max-width: 640px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .status-chip {
    margin: 0.75rem auto 0;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .tabs {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 0.5rem;
  }
  
  .tab-button {
    padding: 0.5rem 1rem;
  }
}
</style>