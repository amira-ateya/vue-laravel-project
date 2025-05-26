<template>
  <div class="application-details-container">
    <!-- Header Section -->
    <div class="header-section">
      <div class="breadcrumb">
        <router-link to="/employer/applications" class="breadcrumb-link">
          <svg class="breadcrumb-icon" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          Back to Applications
        </router-link>
      </div>
      <div class="header-content">
        <div class="header-text">
          <h1 class="application-title">Application #{{ application.id }}</h1>
          <p class="application-subtitle">For {{ application.job?.title }} position</p>
        </div>
        <div class="header-actions">
          <span class="status-badge" :class="application.status">{{ application.status }}</span>
          <div class="action-buttons" v-if="application.status === 'pending'">
            <button @click="updateStatus('approved')" class="action-button approve" :disabled="paymentLoading">
              <svg class="action-icon" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              <span v-if="!paymentLoading">Approve</span>
              <span v-else>Processing Payment...</span>
            </button>
            <button @click="updateStatus('rejected')" class="action-button reject">
              <svg class="action-icon" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
              </svg>
              Reject
            </button>
          </div>
          <div v-else class="status-message">
            Application was <span :class="application.status">{{ application.status }}</span> on {{ formatDate(application.updated_at) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Candidate Profile Section -->
      <div class="profile-section">
        <div class="profile-header">
          <div class="avatar-container">
            <div class="avatar-initials">{{ getInitials(application.candidate?.user?.name) }}</div>
          </div>
          <div class="profile-info">
            <h2 class="candidate-name">{{ application.candidate?.user?.name }}</h2>
            <p class="candidate-title">{{ application.candidate?.current_job }}</p>
            <div class="candidate-meta">
              <span class="meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {{ application.candidate?.location }}
              </span>
              <span class="meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1.9-2 2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"/>
                </svg>
                {{ application.candidate?.experience_level }}
              </span>
              <span class="meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24">
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                </svg>
                {{ application.candidate?.highest_qualification }}
              </span>
            </div>
          </div>
          <div class="profile-actions">
            <a :href="getResumeUrl(application.resume_snapshot)" target="_blank" class="profile-button download">
              <svg class="button-icon" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              Download CV
            </a>
            <a :href="application.candidate?.linkedin_profile" target="_blank" class="profile-button linkedin">
              <svg class="button-icon" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        <div class="profile-details">
          <div class="detail-section">
            <h3 class="detail-title">Contact Information</h3>
            <div class="detail-grid">
              <div class="detail-item">
                <label>Phone</label>
                <p>{{ application.contact_phone }}</p>
              </div>
              <div class="detail-item">
                <label>Email</label>
                <p>{{ application.candidate?.user?.email }}</p>
              </div>
              <div class="detail-item">
                <label>Applied On</label>
                <p>{{ formatDate(application.created_at) }}</p>
              </div>
              <div class="detail-item">
                <label>Last Updated</label>
                <p>{{ formatDate(application.updated_at) }}</p>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h3 class="detail-title">Professional Bio</h3>
            <p class="bio-text">{{ application.candidate?.bio }}</p>
          </div>
        </div>
      </div>

      <!-- Job Details Section -->
      <div class="job-section">
        <div class="job-header">
          <h2 class="job-title">{{ application.job?.title }}</h2>
          <div class="job-meta">
            <span class="job-meta-item">
              <svg class="meta-icon" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {{ application.job?.location }}
            </span>
            <span class="job-meta-item">
              <svg class="meta-icon" viewBox="0 0 24 24">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
              </svg>
              {{ application.job?.work_type }}
            </span>
            <span class="job-meta-item">
              <svg class="meta-icon" viewBox="0 0 24 24">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
              </svg>
              EGP {{ application.job?.salary_from }} - {{ application.job?.salary_to }}
            </span>
          </div>
        </div>

        <div class="job-details">
          <div class="detail-section">
            <h3 class="detail-title">Job Description</h3>
            <p class="job-description">{{ application.job?.description }}</p>
          </div>

          <div class="detail-columns">
            <div class="detail-column">
              <h3 class="detail-title">Responsibilities</h3>
              <ul class="responsibilities-list">
                <li v-for="(item, index) in formattedResponsibilities" :key="'resp-'+index">
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="detail-column">
              <h3 class="detail-title">Benefits</h3>
              <ul class="benefits-list">
                <li v-for="(item, index) in formattedBenefits" :key="'ben-'+index">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>

          <div class="job-footer">
            <div class="job-deadline">
              <svg class="meta-icon" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1.9-2 2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
              </svg>
              Application Deadline: {{ formatDate(application.job?.deadline) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Update Modal -->
    <div v-if="showStatusModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Update Application Status</h3>
        <p>Are you sure you want to mark this application as <strong>{{ newStatus }}</strong>?</p>
        <div class="modal-actions">
          <button class="modal-cancel" @click="showStatusModal = false">Cancel</button>
          <button class="modal-confirm" @click="confirmStatusUpdate">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const application = ref({})
    const loading = ref(true)
    const showStatusModal = ref(false)
    const newStatus = ref("")
    const paymentLoading = ref(false)

    // Fetch application details
    const fetchApplication = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/employer/applications/${route.params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        application.value = response.data
      } catch (error) {
        console.error('Error fetching application:', error)
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
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
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

    // Format responsibilities and benefits
    const formatTextList = (text) => {
      if (!text) return []
      return text.split('.')
        .map(item => item.trim())
        .filter(item => item.length > 0)
    }

    // Update application status
    const updateStatus = (status) => {
      newStatus.value = status
      
      if (status === 'approved') {
        initiatePayment()
      } else {
        showStatusModal.value = true
      }
    }

    // Initiate Stripe payment
    const initiatePayment = async () => {
      paymentLoading.value = true
      
      try {
        const payload = {
          employer_id: application.value.employer_id,
          job_id: application.value.job_id,
          application_id: application.value.id
        }

        const response = await axios.post(
          'http://localhost:8000/api/create-checkout-session',
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          }
        )

        if (response.data.checkout_url) {
          window.location.href = response.data.checkout_url
        }
      } catch (error) {
        console.error('Payment error:', error)
        alert('Failed to initiate payment. Please try again.')
      } finally {
        paymentLoading.value = false
      }
    }

    // Confirm status update
    const confirmStatusUpdate = async () => {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/employer/applications/${application.value.id}`,
          { status: newStatus.value },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          }
        )

        application.value.status = newStatus.value
        application.value.updated_at = new Date().toISOString()
        showStatusModal.value = false
        
        alert(response.data.message || `Application has been ${newStatus.value} successfully!`)
      } catch (error) {
        console.error('Error updating status:', error)
        alert('Failed to update status. Please try again.')
      }
    }

    // Check payment status on page load
    const checkPaymentStatus = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const paymentStatus = urlParams.get('payment_status')
      
      if (paymentStatus === 'success') {
        alert('Payment successful! Application has been approved.')
        application.value.status = 'approved'
        // Refresh application data
        fetchApplication()
      } else if (paymentStatus === 'cancel') {
        alert('Payment was cancelled. Please try again if you want to approve this application.')
      }
    }

    onMounted(() => {
      fetchApplication()
      checkPaymentStatus()
    })

    return {
      application,
      loading,
      showStatusModal,
      newStatus,
      paymentLoading,
      formatDate,
      getInitials,
      getResumeUrl,
      formattedResponsibilities: computed(() => formatTextList(application.value.job?.responsibilities)),
      formattedBenefits: computed(() => formatTextList(application.value.job?.benefits)),
      updateStatus,
      confirmStatusUpdate
    }
  }
}
</script>

<style scoped>
.application-details-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #333;
}

/* Header Section */
.header-section {
  margin-bottom: 2rem;
}

.breadcrumb {
  margin-bottom: 1rem;
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: #4640DE;
}

.breadcrumb-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  fill: currentColor;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-text {
  flex: 1;
}

.application-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: #1a1a1a;
}

.application-subtitle {
  font-size: 1rem;
  color: #666;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge.pending {
  background-color: #FFF4E5;
  color: #A95C00;
}

.status-badge.approved {
  background-color: #E6F4EA;
  color: #1A7F37;
}

.status-badge.rejected {
  background-color: #FCE8E6;
  color: #C62828;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.action-button.approve {
  background-color: #E6F4EA;
  color: #1A7F37;
}

.action-button.approve:hover {
  background-color: #CEEAD6;
}

.action-button.reject {
  background-color: #FCE8E6;
  color: #C62828;
}

.action-button.reject:hover {
  background-color: #FAD2CF;
}

.action-button.neutral {
  background-color: #F0F0F0;
  color: #333;
}

.action-button.neutral:hover {
  background-color: #E0E0E0;
}

.action-icon {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
}

/* Main Content */
.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

/* Profile Section */
.profile-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.profile-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.avatar-container {
  flex-shrink: 0;
}

.avatar-initials {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #4640DE;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
}

.profile-info {
  flex: 1;
}

.candidate-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.candidate-title {
  font-size: 0.95rem;
  color: #666;
  margin: 0 0 1rem 0;
}

.candidate-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #666;
}

.meta-icon {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 150px;
}

.profile-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
}

.profile-button.download {
  background-color: #F0F5FF;
  color: #4640DE;
}

.profile-button.download:hover {
  background-color: #E0EBFF;
}

.profile-button.linkedin {
  background-color: #EDF3FF;
  color: #0A66C2;
}

.profile-button.linkedin:hover {
  background-color: #DBE6FF;
}

.button-icon {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
}

.profile-details {
  padding: 1.5rem;
}

.detail-section {
  margin-bottom: 1.5rem;
}

.detail-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #1a1a1a;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.detail-item {
  margin-bottom: 0.5rem;
}

.detail-item label {
  display: block;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.detail-item p {
  margin: 0;
  font-size: 0.95rem;
}

.bio-text {
  margin: 0;
  line-height: 1.6;
  color: #444;
}

/* Job Section */
.job-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.job-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.job-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.job-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.job-meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.job-details {
  padding: 1.5rem;
}

.job-description {
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
  color: #444;
}

.detail-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.detail-column {
  flex: 1;
}

.responsibilities-list, .benefits-list {
  margin: 0;
  padding-left: 1.25rem;
  color: #444;
}

.responsibilities-list li, .benefits-list li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.job-footer {
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.job-deadline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
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
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-content h3 {
  margin-top: 0;
  color: #1a1a1a;
  font-size: 1.25rem;
}

.modal-content p {
  margin: 1rem 0 1.5rem;
  color: #444;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.modal-cancel, .modal-confirm {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-cancel {
  background: white;
  border: 1px solid #e0e0e0;
  color: #666;
}

.modal-cancel:hover {
  background: #f5f5f5;
}

.modal-confirm {
  background: #4640DE;
  border: 1px solid #4640DE;
  color: white;
}

.modal-confirm:hover {
  background: #372eb6;
  border-color: #372eb6;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
  }
  
  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .action-buttons {
    flex-wrap: wrap;
  }
  
  .profile-header {
    flex-direction: column;
  }
  
  .profile-actions {
    width: 100%;
    flex-direction: row;
    margin-top: 1rem;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .detail-columns {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .application-details-container {
    padding: 1rem;
  }
  
  .profile-button {
    font-size: 0;
    padding: 0.75rem;
    justify-content: center;
  }
  
  .button-icon {
    margin-right: 0;
  }
}
</style>