<template>
  <div class="container-fluid">
    <!-- Search Row -->
    <SearchJob @search="onSearch" />
    <hr />

    <!-- Main Content Row -->
    <div class="row">
      <!-- Filters -->
      <div class="col-3">
        <JobFilters @filter-changed="onFilterChanged" />
      </div>

      <!-- Jobs -->
      <div class="col">
        <AvailableJobs
          :search-title="searchTitle"
          :search-location="searchLocation"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AvailableJobs from '@/components/candidate/candidateViewJobs/availableJobs.vue'
import JobFilters from '@/components/candidate/candidateViewJobs/JobFilters.vue'
import SearchJob from '@/components/candidate/candidateViewJobs/searchJob.vue'

// reactive search parameters
const searchTitle = ref('')
const searchLocation = ref('')

// receives emitted search input
const onSearch = ({ title, location }) => {
  searchTitle.value = title
  searchLocation.value = location
}

// optional: if filters are needed later
const onFilterChanged = (filters) => {
  // handle filters if implemented
}
</script>
