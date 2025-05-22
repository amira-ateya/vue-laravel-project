<template>
    <div class="applicant-profile">
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading applicant data...</p>
      </div>
  
      <div v-else-if="error" class="error-container">
        <p>Error loading applicant data: {{ error }}</p>
        <button @click="fetchData" class="retry-button">Try Again</button>
      </div>
  
      <div v-else-if="application" class="profile-container">
        <!-- Header -->
        <div class="profile-header">
          <h1>Applicant Details</h1>
          <button @click="goBack" class="back-button">← Back to Applications</button>
        </div>
  
        <!-- Main Content -->
        <div class="profile-content">
          <!-- Left Column -->
          <div class="left-column">
            <!-- Basic Info Section -->
            <section class="profile-section">
              <h2>{{ applicant.name }}</h2>
              <p class="job-title">{{ applicant.current_job || 'Not specified' }}</p>
              <p class="rating">4.0 ★</p>
            </section>
  
            <!-- Job Section -->
            <section class="profile-section">
              <h3>{{ application.job?.title || 'Unknown Job' }}</h3>
              <p class="job-type">{{ application.job?.work_type || 'Unknown' }} - {{ application.job?.category || 'Unknown' }}</p>
              
              <div class="status-tags">
                <span :class="['status-tag', application.status]">
                  {{ application.status }}
                </span>
                <span class="status-tag">Interview</span>
              </div>
            </section>
  
            <!-- Contact Section -->
            <section class="profile-section contact-section">
              <h3>Contact</h3>
              <ul class="contact-list">
                <li>Email {{ applicant.email || 'Not specified' }}</li>
                <li>Phone {{ applicant.phone_number || 'Not specified' }}</li>
                <li v-if="applicant.linkedin_profile">
                  LinkedIn {{ applicant.linkedin_profile }}
                </li>
                <li v-if="applicant.twitter_profile">
                  Twitter {{ applicant.twitter_profile }}
                </li>
                <li v-if="applicant.website">
                  Website {{ applicant.website }}
                </li>
              </ul>
            </section>
  
            <!-- Navigation Section -->
            <section class="profile-section">
              <h3>Applicant Profile</h3>
              <ul class="profile-nav">
                <li><a href="#" @click.prevent="activeTab = 'resume'">Resume</a></li>
                <li><a href="#" @click.prevent="activeTab = 'progress'">Hiring Progress</a></li>
                <li><a href="#" @click.prevent="activeTab = 'schedule'">Interview Schedule</a></li>
              </ul>
            </section>
          </div>
  
          <!-- Right Column -->
          <div class="right-column">
            <!-- Personal Info Section -->
            <section class="profile-section">
              <h3>Personal Info</h3>
              <div class="info-grid">
                <div class="info-label">Full Name</div>
                <div class="info-value">{{ applicant.name }}</div>
                
                <div class="info-label">Gender</div>
                <div class="info-value">{{ applicant.gender || 'Not specified' }}</div>
                
                <div class="info-label">Date of Birth</div>
                <div class="info-value">{{ formatDate(applicant.date_of_birth) }}</div>
                
                <div class="info-label">Language</div>
                <div class="info-value">{{ applicant.languages || 'Not specified' }}</div>
                
                <div class="info-label">Address</div>
                <div class="info-value">{{ applicant.address || 'Not specified' }}</div>
              </div>
            </section>
  
            <!-- Professional Info Section -->
            <section class="profile-section">
              <h3>Professional Info</h3>
              <div class="about-me">
                <h4>About Me</h4>
                <p>{{ applicant.bio || 'No bio provided' }}</p>
              </div>
              
              <div class="info-grid">
                <div class="info-label">Current Job</div>
                <div class="info-value">{{ applicant.current_job || 'Not specified' }}</div>
                
                <div class="info-label">Highest Qualification</div>
                <div class="info-value">{{ applicant.highest_qualification || 'Not specified' }}</div>
                
                <div class="info-label">Experience</div>
                <div class="info-value">{{ applicant.experience_years || '0' }} Years</div>
                
                <div class="info-label">Skill set</div>
                <div class="info-value">
                  <div v-if="applicant.skills">
                    {{ applicant.skills }}
                  </div>
                  <div v-else>No skills specified</div>
                </div>
              </div>
            </section>
  
            <!-- Action Buttons -->
            <div class="action-buttons">
              <button 
                @click="updateStatus('accepted')" 
                class="status-button accept"
                :disabled="application.status === 'accepted'"
              >
                Accept Application
              </button>
              <button 
                @click="updateStatus('rejected')" 
                class="status-button reject"
                :disabled="application.status === 'rejected'"
              >
                Reject Application
              </button>
              <a 
                :href="application.resume_snapshot" 
                target="_blank"
                class="status-button view-resume"
              >
                View Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useApplicationsStore } from '@/stores/applicationStore.js'
  
  const route = useRoute()
  const router = useRouter()
  const applicationsStore = useApplicationsStore()
  
  const activeTab = ref('resume')
  
  const loading = computed(() => applicationsStore.loading)
  const error = computed(() => applicationsStore.error)
  const application = computed(() => applicationsStore.currentApplication)
  const applicant = computed(() => application.value?.candidate || {})
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  
  const goBack = () => {
    router.push({ name: 'employer-applications' })
  }
  
  const updateStatus = async (status) => {
    const success = await applicationsStore.updateApplicationStatus(application.value.id, status)
    if (success) {
      // Optional: Show success message
    }
  }
  
  const fetchData = async () => {
    await applicationsStore.fetchApplicationById(route.params.id)
  }
  
  onMounted(fetchData)
  </script>
  
  <style scoped>
  .applicant-profile {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .loading-container,
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
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
  
  .error-container {
    color: #ef4444;
  }
  
  .retry-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #3a4a6d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eaeef5;
  }
  
  .profile-header h1 {
    margin: 0;
    color: #3a4a6d;
    font-size: 1.75rem;
  }
  
  .back-button {
    background: none;
    border: none;
    color: #3a4a6d;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }
  
  .back-button:hover {
    background-color: #f1f5f9;
  }
  
  .profile-content {
    display: flex;
    gap: 2rem;
  }
  
  .left-column {
    flex: 1;
    max-width: 300px;
  }
  
  .right-column {
    flex: 2;
  }
  
  .profile-section {
    margin-bottom: 1.5rem;
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .profile-section h2 {
    margin: 0 0 0.5rem;
    color: #3a4a6d;
    font-size: 1.5rem;
  }
  
  .job-title {
    margin: 0;
    color: #64748b;
    font-size: 1rem;
  }
  
  .rating {
    color: #f59e0b;
    font-weight: bold;
    margin: 0.5rem 0 0;
  }
  
  .profile-section h3 {
    margin: 0 0 1rem;
    color: #3a4a6d;
    font-size: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #eaeef5;
  }
  
  .job-type {
    color: #64748b;
    font-size: 0.875rem;
    margin: 0.5rem 0 1rem;
  }
  
  .status-tags {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  .status-tag {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .status-tag.pending {
    background-color: #fef3c7;
    color: #92400e;
  }
  
  .status-tag.accepted {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  .status-tag.rejected {
    background-color: #fee2e2;
    color: #991b1b;
  }
  
  .status-tag:not(.pending):not(.accepted):not(.rejected) {
    background-color: #e0e7ff;
    color: #4f46e5;
  }
  
  .contact-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .contact-list li {
    margin-bottom: 0.5rem;
    color: #64748b;
    font-size: 0.875rem;
  }
  
  .profile-nav {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .profile-nav li {
    margin-bottom: 0.75rem;
  }
  
  .profile-nav a {
    color: #3a4a6d;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.875rem;
  }
  
  .profile-nav a:hover {
    color: #4f46e5;
    text-decoration: underline;
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 0.75rem;
    margin-top: 1rem;
  }
  
  .info-label {
    color: #64748b;
    font-size: 0.875rem;
  }
  
  .info-value {
    color: #3a4a6d;
    font-weight: 500;
    font-size: 0.875rem;
  }
  
  .about-me {
    margin-bottom: 1.5rem;
  }
  
  .about-me h4 {
    margin: 0 0 0.5rem;
    color: #3a4a6d;
    font-size: 1rem;
  }
  
  .about-me p {
    margin: 0;
    color: #64748b;
    font-size: 0.875rem;
    line-height: 1.6;
  }
  
  .action-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    flex-wrap: wrap;
  }
  
  .status-button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.875rem;
  }
  
  .status-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .status-button.accept {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  .status-button.reject {
    background-color: #fee2e2;
    color: #991b1b;
  }
  
  .status-button.view-resume {
    background-color: #e0e7ff;
    color: #4f46e5;
    text-decoration: none;
  }
  
  .status-button:hover:not(:disabled) {
    opacity: 0.9;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @media (max-width: 768px) {
    .profile-content {
      flex-direction: column;
    }
    
    .left-column {
      max-width: 100%;
    }
    
    .info-grid {
      grid-template-columns: 1fr;
    }
    
    .action-buttons {
      flex-direction: column;
    }
    
    .status-button {
      width: 100%;
    }
  }
  </style>