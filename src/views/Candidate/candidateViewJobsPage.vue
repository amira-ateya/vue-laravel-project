<template>
  <div class="container-fluid">
    <!-- Search Row -->
    <!-- Listen to 'search' event emitted from SearchJob component -->
    <SearchJob @search="onSearch" />
    <hr />

    <div class="row">
      <!-- Filters Column -->
      <div class="col-3">
        <!-- Listen to filter change events if needed -->
        <JobFilters @filter-changed="onFilterChanged" />
      </div>

      <!-- Jobs Column -->
      <div class="col">
        <!-- Pass search parameters as a single object prop -->
        <AvailableJobs :search="{ searchTerm: searchTitle, location: searchLocation }" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Import child components
import AvailableJobs from '@/components/candidate/candidateViewJobs/availableJobs.vue'
import JobFilters from '@/components/candidate/candidateViewJobs/JobFilters.vue'
import SearchJob from '@/components/candidate/candidateViewJobs/searchJob.vue'

// Reactive variables to hold the current search inputs
const searchTitle = ref('')
const searchLocation = ref('')

// Handler to receive emitted search event data from SearchJob.vue
const onSearch = ({ title, location }) => {
  // Update reactive variables with new search terms
  searchTitle.value = title
  searchLocation.value = location
}

// Placeholder for filter changes (optional)
const onFilterChanged = (filters) => {
  // You can handle filter logic here later if needed
}
</script>
