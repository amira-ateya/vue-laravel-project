<template>
  <div class="timeline">
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading timeline...</p>
    </div>
    
    <div v-else-if="error" class="error-state">
      <div class="error-icon">⚠️</div>
      <p>Failed to load timeline</p>
    </div>
    
    <div v-else-if="events.length === 0" class="empty-state">
      <p>No activity yet</p>
    </div>
    
    <div v-else class="timeline-events">
      <div v-for="(event, index) in events" :key="index" class="timeline-event">
        <div class="timeline-marker">
          <div class="marker-dot"></div>
          <div v-if="index !== events.length - 1" class="marker-line"></div>
        </div>
        <div class="event-content">
          <div class="event-header">
            <h4 class="event-title">{{ event.title }}</h4>
            <span class="event-date">{{ formatDate(event.date) }}</span>
          </div>
          <p v-if="event.description" class="event-description">{{ event.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApplicationStore } from '@/stores/applicationStore'

const props = defineProps({
  applicationId: {
    type: Number,
    required: true
  }
})

const events = ref([])
const loading = ref(true)
const error = ref(null)

const fetchTimeline = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 500))
    
    events.value = [
      {
        id: 1,
        title: 'Application Submitted',
        date: new Date().toISOString(),
        description: 'Candidate applied for the position'
      },
      {
        id: 2,
        title: 'Application Viewed',
        date: new Date(Date.now() - 3600000).toISOString(),
        description: 'You viewed this application'
      }
    ]
  } catch (err) {
    error.value = err.message || 'Failed to load timeline'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

onMounted(() => {
  fetchTimeline()
})
</script>

<style scoped>
.timeline {
  position: relative;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid rgba(74, 108, 247, 0.1);
  border-top-color: #4a6cf7;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

.error-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.timeline-events {
  position: relative;
}

.timeline-event {
  display: flex;
  gap: 1rem;
  padding-bottom: 1.5rem;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1.5rem;
  flex-shrink: 0;
}

.marker-dot {
  width: 0.75rem;
  height: 0.75rem;
  background-color: #4a6cf7;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 2px #4a6cf7;
}

.marker-line {
  flex: 1;
  width: 2px;
  background-color: #e5e7eb;
  margin: 0.25rem 0;
}

.event-content {
  flex: 1;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.event-title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
}

.event-date {
  font-size: 0.75rem;
  color: #6b7280;
}

.event-description {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>