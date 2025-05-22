<template>
  <div class="employer-profile-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <!-- Profile Header -->
    <div class="profile-header">
      <div class="cover-photo"></div>
      <div class="profile-info">
        <div class="avatar-container">
          <img v-if="profileData.employer.company_logo" :src="profileData.employer.company_logo" alt="Company Logo" class="company-logo">
          <div v-else class="logo-placeholder">
            {{ getInitials(profileData.employer.company_name) }}
          </div>
        </div>
        <div class="profile-meta">
          <h1 class="company-name">{{ profileData.employer.company_name }}</h1>
          <p class="company-location">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {{ profileData.employer.location }}
          </p>
          <a v-if="profileData.employer.company_website" :href="profileData.employer.company_website" target="_blank" class="website-link">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
            </svg>
            Visit Website
          </a>
        </div>
        <button class="edit-profile-btn" @click="editProfile">
          <svg class="edit-icon" viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
          Edit Profile
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="profile-content">
      <!-- Left Column -->
      <div class="left-column">
        <!-- About Section -->
        <div class="profile-section">
          <h2 class="section-title">About</h2>
          <div class="section-content">
            <p class="company-bio">{{ profileData.employer.bio || 'No bio provided' }}</p>
            
            <div class="info-item">
              <svg class="icon" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <div>
                <h3>Email</h3>
                <p>{{ profileData.user.email }}</p>
              </div>
            </div>

            <div class="info-item">
              <svg class="icon" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <div>
                <h3>Phone</h3>
                <p>{{ profileData.employer.phone || 'Not provided' }}</p>
              </div>
            </div>

            <div class="info-item">
              <svg class="icon" viewBox="0 0 24 24">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"/>
              </svg>
              <div>
                <h3>Member Since</h3>
                <p>{{ formatDate(profileData.user.created_at) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Company Description Section -->
        <div class="profile-section" v-if="profileData.employer.company_description">
          <h2 class="section-title">Company Description</h2>
          <div class="section-content">
            <p class="company-description">{{ profileData.employer.company_description }}</p>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Recent Activity Section -->
        <div class="profile-section">
          <h2 class="section-title">Recent Activity</h2>
          <div class="section-content">
            <div class="activity-item">
              <div class="activity-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                </svg>
              </div>
              <div class="activity-details">
                <h3>Posted a new job</h3>
                <p>Senior Frontend Developer - 2 days ago</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
                </svg>
              </div>
              <div class="activity-details">
                <h3>Approved application</h3>
                <p>Mohamed Ahmed for UX Designer - 5 days ago</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="profile-section">
          <h2 class="section-title">Company Stats</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">24</div>
              <div class="stat-label">Jobs Posted</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">156</div>
              <div class="stat-label">Applications</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">32</div>
              <div class="stat-label">Hired</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">4.8</div>
              <div class="stat-label">Avg. Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Edit Profile</h2>
        <form @submit.prevent="saveProfile">
          <div class="form-group">
            <label>Company Name</label>
            <input type="text" v-model="editForm.company_name">
          </div>
          <div class="form-group">
            <label>Location</label>
            <input type="text" v-model="editForm.location">
          </div>
          <div class="form-group">
            <label>Website</label>
            <input type="url" v-model="editForm.company_website">
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" v-model="editForm.phone">
          </div>
          <div class="form-group">
            <label>Bio</label>
            <textarea v-model="editForm.bio"></textarea>
          </div>
          <div class="form-group">
            <label>Company Description</label>
            <textarea v-model="editForm.company_description"></textarea>
          </div>
          <div class="form-group">
            <label>Company Logo</label>
            <input type="file" @change="handleLogoUpload">
          </div>
          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="showEditModal = false">Cancel</button>
            <button type="submit" class="save-btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const profileData = ref({
      user: {},
      employer: {}
    })
    const loading = ref(true)
    const showEditModal = ref(false)
    const editForm = ref({
      company_name: '',
      location: '',
      company_website: '',
      phone: '',
      bio: '',
      company_description: '',
      company_logo: null
    })

    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/employer/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        profileData.value = response.data
        // Initialize edit form with current data
        editForm.value = {
          company_name: response.data.employer.company_name,
          location: response.data.employer.location,
          company_website: response.data.employer.company_website,
          phone: response.data.employer.phone,
          bio: response.data.employer.bio,
          company_description: response.data.employer.company_description,
          company_logo: null
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        loading.value = false
      }
    }

    // Format date
    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })
    }

    // Get initials from company name
    const getInitials = (name) => {
      if (!name) return ''
      return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }

    // Open edit modal
    const editProfile = () => {
      showEditModal.value = true
    }

    // Handle logo upload
    const handleLogoUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        editForm.value.company_logo = file
      }
    }

    // Save profile changes
    const saveProfile = async () => {
      try {
        const formData = new FormData()
        Object.keys(editForm.value).forEach(key => {
          if (editForm.value[key] !== null) {
            formData.append(key, editForm.value[key])
          }
        })

        const response = await axios.post('http://localhost:8000/api/employer/profile', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        })

        profileData.value.employer = response.data
        showEditModal.value = false
      } catch (error) {
        console.error('Error updating profile:', error)
      }
    }

    // Fetch profile on component mount
    onMounted(fetchProfile)

    return {
      profileData,
      loading,
      showEditModal,
      editForm,
      formatDate,
      getInitials,
      editProfile,
      handleLogoUpload,
      saveProfile
    }
  }
}
</script>

<style scoped>
.employer-profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #333;
}

/* Loading State */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #4640DE;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Profile Header */
.profile-header {
  position: relative;
  margin-bottom: 30px;
}

.cover-photo {
  height: 200px;
  background-color: #4640DE;
  background-image: linear-gradient(135deg, #4640DE 0%, #6B73FF 100%);
  border-radius: 10px;
}

.profile-info {
  display: flex;
  align-items: flex-end;
  margin-top: -50px;
  padding: 0 30px;
}

.avatar-container {
  margin-right: 30px;
}

.company-logo {
  width: 150px;
  height: 150px;
  border-radius: 10px;
  border: 5px solid white;
  background-color: white;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.logo-placeholder {
  width: 150px;
  height: 150px;
  border-radius: 10px;
  border: 5px solid white;
  background-color: #4640DE;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-meta {
  flex: 1;
}

.company-name {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 10px 0;
  color: #1a1a1a;
}

.company-location {
  display: flex;
  align-items: center;
  color: #666;
  margin: 0 0 15px 0;
}

.company-location .icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  fill: currentColor;
}

.website-link {
  display: inline-flex;
  align-items: center;
  color: #4640DE;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 15px;
  background-color: rgba(70, 64, 222, 0.1);
  border-radius: 6px;
  transition: all 0.2s;
}

.website-link:hover {
  background-color: rgba(70, 64, 222, 0.2);
}

.website-link .icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  fill: currentColor;
}

.edit-profile-btn {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 20px;
}

.edit-profile-btn:hover {
  background-color: #f5f5f5;
}

.edit-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  fill: currentColor;
}

/* Profile Content */
.profile-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.profile-section {
  background: white;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #1a1a1a;
}

.section-content {
  color: #444;
}

.company-bio, .company-description {
  line-height: 1.6;
  margin: 0 0 20px 0;
}

.info-item {
  display: flex;
  margin-bottom: 20px;
}

.info-item .icon {
  width: 24px;
  height: 24px;
  margin-right: 15px;
  flex-shrink: 0;
  fill: #666;
}

.info-item h3 {
  font-size: 14px;
  font-weight: 500;
  color: #666;
  margin: 0 0 5px 0;
}

.info-item p {
  font-size: 16px;
  margin: 0;
  color: #333;
}

/* Activity Items */
.activity-item {
  display: flex;
  margin-bottom: 20px;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(70, 64, 222, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.activity-icon svg {
  width: 20px;
  height: 20px;
  fill: #4640DE;
}

.activity-details h3 {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 5px 0;
}

.activity-details p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.stat-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #4640DE;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
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
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  padding: 30px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content h2 {
  font-size: 24px;
  margin: 0 0 25px 0;
  color: #1a1a1a;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: inherit;
  font-size: 16px;
}

.form-group textarea {
  min-height: 100px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
}

.cancel-btn {
  padding: 10px 20px;
  background: #f5f5f5;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.save-btn {
  padding: 10px 20px;
  background: #4640DE;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.save-btn:hover {
  background: #372eb6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-content {
    grid-template-columns: 1fr;
  }
  
  .profile-info {
    flex-direction: column;
    align-items: flex-start;
    margin-top: -80px;
  }
  
  .avatar-container {
    margin-right: 0;
    margin-bottom: 20px;
  }
  
  .edit-profile-btn {
    margin-top: 20px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .profile-header {
    margin-bottom: 20px;
  }
  
  .cover-photo {
    height: 150px;
  }
  
  .company-logo, .logo-placeholder {
    width: 100px;
    height: 100px;
  }
  
  .company-name {
    font-size: 24px;
  }
  
  .profile-section {
    padding: 20px;
  }
}
</style>