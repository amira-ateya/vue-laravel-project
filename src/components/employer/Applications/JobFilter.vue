<template>
    <div class="job-filter">
      <div class="filter-header">
        <h2 class="filter-title">Filter Results</h2>
        <button class="reset-btn" @click="resetFilters">
          Reset Filters
        </button>
      </div>
  
      <!-- Search Filter -->
      <div class="filter-section">
        <label class="filter-label">Quick Search</label>
        <div class="search-input-container">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by candidate or job..."
            class="search-input"
            @input="emitFilters"
          >
          <svg class="search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
  
      <!-- Job Filter -->
      <div class="filter-section">
        <label class="filter-label">Jobs</label>
        <div class="job-options">
          <button
            v-for="job in jobs"
            :key="job.id"
            @click="toggleJobSelection(job)"
            :class="{ 'active': selectedJob?.id === job.id }"
            class="job-option"
          >
            {{ job.title }}
            <span v-if="selectedJob?.id === job.id" class="checkmark">
              ✓
            </span>
          </button>
        </div>
      </div>
  
      <!-- Status Filter -->
      <div class="filter-section">
        <label class="filter-label">Application Status</label>
        <div class="status-options">
          <label
            v-for="status in statusOptions"
            :key="status.value"
            class="status-option"
          >
            <input
              type="checkbox"
              :value="status.value"
              v-model="selectedStatuses"
              @change="emitFilters"
              class="status-checkbox"
            >
            <span class="custom-checkbox" :class="{ 'checked': selectedStatuses.includes(status.value) }"></span>
            <span class="status-label">{{ status.label }}</span>
            <span class="status-badge" :class="status.value">{{ getStatusCount(status.value) }}</span>
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const props = defineProps({
    jobs: {
      type: Array,
      required: true
    },
    stats: {
      type: Object,
      default: () => ({})
    }
  })
  
  const emit = defineEmits(['filter'])
  
  const searchQuery = ref('')
  const selectedJob = ref(null)
  const selectedStatuses = ref([])
  
  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' }
  ]
  
  const toggleJobSelection = (job) => {
    selectedJob.value = selectedJob.value?.id === job.id ? null : job
    emitFilters()
  }
  
  const resetFilters = () => {
    searchQuery.value = ''
    selectedJob.value = null
    selectedStatuses.value = []
    emitFilters()
  }
  
  const emitFilters = () => {
    emit('filter', {
      search: searchQuery.value,
      job: selectedJob.value,
      statuses: selectedStatuses.value
    })
  }
  
  const getStatusCount = (status) => {
    return props.stats[status] || 0
  }
  </script>
  
  <style scoped>
  .job-filter {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  }
  
  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eaeef5;
  }
  
  .filter-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0;
  }
  
  .reset-btn {
    background: none;
    border: none;
    color: #4a6cf7;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    transition: color 0.2s ease;
  }
  
  .reset-btn:hover {
    color: #3a56c7;
  }
  
  .filter-section {
    margin-bottom: 1.5rem;
  }
  
  .filter-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4a5568;
    margin-bottom: 0.75rem;
  }
  
  .search-input-container {
    position: relative;
  }
  
  .search-input {
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #4a6cf7;
    box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
  }
  
  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    color: #a0aec0;
  }
  
  .job-options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .job-option {
    width: 100%;
    padding: 0.5rem 1rem;
    text-align: left;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .job-option:hover {
    border-color: #4a6cf7;
    transform: translateX(5px);
  }
  
  .job-option.active {
    background-color: rgba(74, 108, 247, 0.1);
    border-color: #4a6cf7;
    color: #4a6cf7;
  }
  
  .checkmark {
    color: #4a6cf7;
    font-weight: bold;
  }
  
  .status-options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .status-option {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.75rem;
    cursor: pointer;
  }
  
  .status-checkbox {
    display: none;
  }
  
  .custom-checkbox {
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    flex-shrink: 0;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .custom-checkbox.checked {
    background-color: #4a6cf7;
    border-color: #4a6cf7;
  }
  
  .custom-checkbox.checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.5rem;
    height: 0.5rem;
    background-color: white;
    border-radius: 50%;
  }
  
  .status-label {
    font-size: 0.875rem;
    color: #4a5568;
  }
  
  .status-badge {
    font-size: 0.75rem;
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
    margin-left: auto;
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
  </style>