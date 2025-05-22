<template>
    <div class="candidate-profile-container">
      <!-- Personal Information Section -->
      <div class="profile-section">
        <div class="section-header">
          <svg xmlns="http://www.w3.org/2000/svg" class="section-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
          <h3 class="section-title">Personal Information</h3>
        </div>
        
        <div class="info-grid">
          <InfoCard 
            icon="user"
            title="Full Name"
            :value="candidate.name"
          />
          
          <InfoCard 
            icon="envelope"
            title="Email"
            :value="candidate.email"
            type="email"
          />
          
          <InfoCard 
            icon="phone"
            title="Phone"
            :value="candidate.phone_number"
            type="phone"
          />
          
          <InfoCard 
            icon="map-marker"
            title="Location"
            :value="candidate.location"
          />
          
          <InfoCard 
            icon="calendar"
            title="Date of Birth"
            :value="formatDate(candidate.date_of_birth)"
          />
          
          <InfoCard 
            icon="language"
            title="Languages"
            :value="candidate.languages"
          />
        </div>
      </div>
  
      <!-- Professional Information Section -->
      <div class="profile-section">
        <div class="section-header">
          <svg xmlns="http://www.w3.org/2000/svg" class="section-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
          <h3 class="section-title">Professional Information</h3>
        </div>
        
        <div class="info-grid">
          <InfoCard 
            icon="briefcase"
            title="Current Job"
            :value="candidate.current_job || 'Not specified'"
          />
          
          <InfoCard 
            icon="clock"
            title="Experience"
            :value="candidate.experience_years ? `${candidate.experience_years} years` : 'Not specified'"
          />
          
          <InfoCard 
            icon="graduation-cap"
            title="Highest Qualification"
            :value="candidate.highest_qualification || 'Not specified'"
          />
          
          <InfoCard 
            icon="tools"
            title="Skills"
            :value="candidate.skills"
            type="tags"
          />
          
          <InfoCard 
            icon="linkedin"
            title="LinkedIn"
            :value="candidate.linkedin_profile"
            type="link"
          />
          
          <InfoCard 
            icon="globe"
            title="Website"
            :value="candidate.website"
            type="link"
          />
        </div>
      </div>
  
      <!-- About Candidate Section -->
      <div class="profile-section">
        <div class="section-header">
          <svg xmlns="http://www.w3.org/2000/svg" class="section-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
          <h3 class="section-title">About Candidate</h3>
        </div>
        
        <div class="bio-content">
          <p v-if="candidate.bio">{{ candidate.bio }}</p>
          <p v-else class="text-gray-500">No bio provided by the candidate.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  import InfoCard from './InfoCard.vue'
  
  const props = defineProps({
    candidate: {
      type: Object,
      required: true,
      default: () => ({})
    }
  })
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified'
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }
  </script>
  
  <style scoped>
  .candidate-profile-container {
    @apply space-y-8;
  }
  
  .profile-section {
    @apply bg-white rounded-xl shadow-sm p-6;
  }
  
  .section-header {
    @apply flex items-center mb-6 pb-4 border-b border-gray-100;
  }
  
  .section-icon {
    @apply w-5 h-5 text-indigo-600 mr-3;
  }
  
  .section-title {
    @apply text-lg font-semibold text-gray-800;
  }
  
  .info-grid {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
  }
  
  .bio-content {
    @apply text-gray-700 leading-relaxed;
  }
  
  .bio-content p {
    @apply mb-4 last:mb-0;
  }
  </style>