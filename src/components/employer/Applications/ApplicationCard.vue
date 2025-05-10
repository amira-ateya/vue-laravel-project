<template>
    <li class="application-card">
      <div class="application-header">
        <!-- Candidate Info -->
        <div class="candidate-info">
          <div class="candidate-avatar">
            {{ candidateInitial }}
          </div>
          <div class="candidate-details">
            <p class="candidate-name">
  {{ application.candidate.name }}
</p>
         <p class="application-meta">
              Applied for <span class="job-title">{{ application.job.title }}</span>
              <span class="application-date">{{ formatDate(application.created_at) }}</span>
            </p>
          </div>
        </div>
  
        <!-- Status and Actions -->
        <div class="application-actions">
          <span :class="['status-badge', application.status]">
            {{ application.status }}
          </span>
          
          <div class="action-menu">
            <button class="action-button" @click="toggleActionMenu">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
            
            <div v-if="showActionMenu" class="action-dropdown">
              <button class="dropdown-item accept" @click="changeStatus('accepted')">
                Accept Application
              </button>
              <button class="dropdown-item reject" @click="changeStatus('rejected')">
                Reject Application
              </button>
              <a :href="application.resume_snapshot" target="_blank" class="dropdown-item view-resume">
                View Resume
              </a>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Application Details -->
      <div v-if="expanded" class="application-details">
        <div class="details-grid">
          <div class="detail-section">
            <h4 class="detail-title">Candidate Information</h4>
            <p class="detail-content">
              <span class="detail-label">Email:</span> 
              {{ application.contact_email }}
            </p>
            <p class="detail-content">
              <span class="detail-label">Phone:</span> 
              {{ application.contact_phone }}
            </p>
          </div>
          
          <div class="detail-section">
            <h4 class="detail-title">Job Information</h4>
            <p class="detail-content">
              <span class="detail-label">Location:</span> 
              {{ application.job.location }}
            </p>
            <p class="detail-content">
              <span class="detail-label">Work Type:</span> 
              {{ application.job.work_type }}
            </p>
          </div>
        </div>
      </div>
  
      <!-- Toggle Button -->
      <button class="toggle-details" @click="expanded = !expanded">
        {{ expanded ? 'Hide Details' : 'View Details' }}
        <svg :class="{ 'rotate': expanded }" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </li>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const props = defineProps({
    application: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['status-change'])
  
  const showActionMenu = ref(false)
  const expanded = ref(false)
  
  const candidateInitial = computed(() => {
    return props.application.candidate.name.charAt(0).toUpperCase()
  })
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }
  
  const toggleActionMenu = () => {
    showActionMenu.value = !showActionMenu.value
  }
  
  const changeStatus = (status) => {
    emit('status-change', props.application.id, status)
    showActionMenu.value = false
  }
  </script>
  
  <style scoped>
  .application-card {
    background-color: white;
    padding: 1.5rem;
    border-bottom: 1px solid #eaeef5;
    transition: all 0.3s ease;
  }
  
  .application-card:hover {
    background-color: #f8fafc;
  }
  
  .application-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .candidate-info {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .candidate-avatar {
    width: 3rem;
    height: 3rem;
    background-color: #3a4a6d;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.25rem;
    flex-shrink: 0;
  }
  
  .candidate-details {
    flex: 1;
  }
  
  .candidate-name {
    margin: 0;
    font-size: 1rem;
    color: #2d3748;
    font-weight: 600;
  }
  
  .application-meta {
    margin: 0.25rem 0 0;
    color: #718096;
    font-size: 0.875rem;
  }
  
  .job-title {
    color: #4a6cf7;
    font-weight: 500;
  }
  
  .application-date {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #a0aec0;
  }
  
  .application-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: capitalize;
  }
  
  .status-badge.pending {
    background-color: #fef3c7;
    color: #92400e;
  }
  
  .status-badge.accepted {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  .status-badge.rejected {
    background-color: #fee2e2;
    color: #991b1b;
  }
  
  .action-menu {
    position: relative;
  }
  
  .action-button {
    background: none;
    border: none;
    color: #a0aec0;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .action-button svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .action-button:hover {
    color: #4a6cf7;
  }
  
  .action-dropdown {
    position: absolute;
    right: 0;
    top: 100%;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    min-width: 180px;
    z-index: 10;
    overflow: hidden;
  }
  
  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s ease;
  }
  
  .dropdown-item:hover {
    background-color: #f8fafc;
  }
  
  .dropdown-item.accept {
    color: #10b981;
  }
  
  .dropdown-item.reject {
    color: #ef4444;
  }
  
  .dropdown-item.view-resume {
    color: #4a6cf7;
    border-top: 1px solid #eaeef5;
  }
  
  .application-details {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eaeef5;
  }
  
  .details-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (min-width: 640px) {
    .details-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .detail-section {
    flex: 1;
  }
  
  .detail-title {
    margin: 0 0 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4a5568;
  }
  
  .detail-content {
    margin: 0 0 0.5rem;
    font-size: 0.875rem;
    color: #718096;
  }
  
  .detail-label {
    font-weight: 500;
    color: #4a5568;
  }
  
  .toggle-details {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: none;
    border: none;
    color: #4a6cf7;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    margin-top: 1rem;
    padding: 0.25rem;
  }
  
  .toggle-details svg {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s ease;
  }
  
  .toggle-details svg.rotate {
    transform: rotate(180deg);
  }
  
  /* Animation */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>