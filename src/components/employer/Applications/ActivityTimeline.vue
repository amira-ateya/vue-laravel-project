<template>
    <div class="activity-tab">
      <div v-if="activities.length" class="timeline">
        <div v-for="activity in activities" :key="activity.id" class="timeline-item">
          <div class="timeline-marker" :class="getStatusClass(activity.type)"></div>
          <div class="timeline-content">
            <div class="timeline-header">
              <span class="activity-type" :class="getStatusClass(activity.type)">
                {{ activity.type }}
              </span>
              <span class="activity-date">{{ formatDateTime(activity.created_at) }}</span>
            </div>
            <div class="activity-message">{{ activity.message }}</div>
            <div v-if="activity.user" class="activity-user">
              By {{ activity.user.name }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-activities">
        <i class="fas fa-history"></i>
        <h3>No Activities Found</h3>
        <p>There are no activities recorded for this application yet.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    activities: {
      type: Array,
      default: () => []
    }
  })
  
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A'
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }
  
  const getStatusClass = (type) => {
    switch(type.toLowerCase()) {
      case 'status update': return 'status-update'
      case 'application submitted': return 'submitted'
      case 'note added': return 'note-added'
      default: return ''
    }
  }
  </script>
  
  <style scoped>
  .activity-tab {
    padding: 15px 0;
  }
  
  .timeline {
    position: relative;
    padding-left: 30px;
  }
  
  .timeline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 10px;
    width: 2px;
    background-color: #eaeaea;
  }
  
  .timeline-item {
    position: relative;
    padding-bottom: 25px;
  }
  
  .timeline-marker {
    position: absolute;
    top: 0;
    left: -30px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #eaeaea;
    border: 3px solid white;
  }
  
  .timeline-marker.status-update {
    background-color: #4a6cf7;
  }
  
  .timeline-marker.submitted {
    background-color: #10b981;
  }
  
  .timeline-marker.note-added {
    background-color: #f59e0b;
  }
  
  .timeline-content {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  
  .timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  
  .activity-type {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    color: white;
  }
  
  .activity-type.status-update {
    background-color: #4a6cf7;
  }
  
  .activity-type.submitted {
    background-color: #10b981;
  }
  
  .activity-type.note-added {
    background-color: #f59e0b;
  }
  
  .activity-date {
    font-size: 12px;
    color: #718096;
  }
  
  .activity-message {
    margin-bottom: 5px;
    color: #2d3748;
  }
  
  .activity-user {
    font-size: 12px;
    color: #718096;
    font-style: italic;
  }
  
  .no-activities {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    text-align: center;
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  
  .no-activities i {
    font-size: 48px;
    color: #718096;
    margin-bottom: 15px;
  }
  
  .no-activities h3 {
    margin: 0 0 10px;
    color: #2d3748;
  }
  
  .no-activities p {
    margin: 0;
    color: #718096;
  }
  </style>