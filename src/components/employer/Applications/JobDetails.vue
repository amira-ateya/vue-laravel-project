<template>
    <div class="job-details">
      <div class="info-grid">
        <!-- Job Details -->
        <div class="info-section">
          <h3 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" class="section-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            Job Details
          </h3>
          <div class="info-items">
            <div class="info-item">
              <span class="info-label">Title:</span>
              <span class="info-value">{{ job.title }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Location:</span>
              <span class="info-value">{{ job.location }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Work Type:</span>
              <span class="info-value">{{ job.work_type }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Salary Range:</span>
              <span class="info-value">{{ job.salary_range }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Category:</span>
              <span class="info-value">{{ job.category }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Deadline:</span>
              <span class="info-value">{{ formatDate(job.deadline) }}</span>
            </div>
          </div>
        </div>
  
        <!-- Requirements -->
        <div class="info-section">
          <h3 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" class="section-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            Requirements
          </h3>
          <div class="info-items">
            <div class="info-item">
              <span class="info-label">Skills:</span>
              <span class="info-value">{{ job.skills }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Technologies:</span>
              <span class="info-value">{{ job.technologies }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Benefits:</span>
              <span class="info-value">{{ job.benefits }}</span>
            </div>
          </div>
        </div>
  
        <!-- Job Description -->
        <div class="info-section full-width">
          <h3 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" class="section-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
            </svg>
            Job Description
          </h3>
          <div class="job-description">
            {{ job.description }}
          </div>
        </div>
  
        <!-- Responsibilities -->
        <div class="info-section full-width">
          <h3 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" class="section-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            Responsibilities
          </h3>
          <div class="responsibilities">
            {{ job.responsibilities }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    job: {
      type: Object,
      required: true
    }
  })
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }
  </script>
  
  <style scoped>
  /* نفس الأنماط السابقة */
  </style>