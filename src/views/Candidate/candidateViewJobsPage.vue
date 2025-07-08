<template>
  <!-- Main container with fade-in animation -->
  <div class="jobs-container animate__animated animate__fadeIn">
    
    <!-- Search Section with floating animation -->
    <div class="search-section animate__animated animate__fadeInDown">
      <SearchJob @search="onSearch" />
    </div>

    <!-- Main Content Area -->
    <div class="jobs-layout">
      
      <!-- Filters Sidebar with slide-in animation -->
      <aside class="filters-sidebar animate__animated animate__fadeInLeft">
        <JobFilters 
          @filter-employment-type-changed="handleEmploymentTypeFilter"
          @filter-categories-changed="handleCategoriesFilter"
          @filter-job-level-changed="handleJobLevelFilter"
          class="sticky-filters"
        />
      </aside>

      <!-- Jobs List with staggered animations -->
      <main class="jobs-main animate__animated animate__fadeIn">
        <AvailableJobs 
          :search="{ searchTerm: searchTitle, location: searchLocation }" 
          :employment-type-filter="selectedEmploymentTypes"
          :category-filter="selectedCategories"
          :level-filter="selectedJobLevels"
          class="jobs-list"
        />
      </main>
    </div>

    <!-- Floating filter toggle for mobile -->
    <div class="filter-fab animate__animated animate__fadeInUp" @click="toggleMobileFilters">
      <i class="fas" :class="showMobileFilters ? 'fa-times' : 'fa-filter'"></i>
      <span class="filter-badge" v-if="activeFilterCount > 0">{{ activeFilterCount }}</span>
    </div>

    <!-- Mobile filters overlay -->
    <div class="mobile-filters-overlay" :class="{ 'show': showMobileFilters }">
      <div class="mobile-filters-content">
        <div class="mobile-filters-header">
          <h3>Filters</h3>
          <button @click="toggleMobileFilters" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <JobFilters 
          @filter-employment-type-changed="handleEmploymentTypeFilter"
          @filter-categories-changed="handleCategoriesFilter"
          @filter-job-level-changed="handleJobLevelFilter"
        />
        <button class="apply-filters-btn" @click="toggleMobileFilters">
          Apply Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AvailableJobs from '@/components/candidate/candidateViewJobs/availableJobs.vue'
import JobFilters from '@/components/candidate/candidateViewJobs/JobFilters.vue'
import SearchJob from '@/components/candidate/candidateViewJobs/searchJob.vue'

// Search state
const searchTitle = ref('')
const searchLocation = ref('')

// Filter states
const selectedEmploymentTypes = ref([])
const selectedCategories = ref([])
const selectedJobLevels = ref([])
const showMobileFilters = ref(false)

// Compute active filter count for badge
const activeFilterCount = computed(() => {
  return selectedEmploymentTypes.value.length + 
         selectedCategories.value.length + 
         selectedJobLevels.value.length
})

// Event handlers
const onSearch = ({ title, location }) => {
  searchTitle.value = title
  searchLocation.value = location
}

const handleEmploymentTypeFilter = ({ employmentTypes }) => {
  selectedEmploymentTypes.value = employmentTypes
}

const handleCategoriesFilter = ({ categories }) => {
  selectedCategories.value = categories
}

const handleJobLevelFilter = ({ jobLevels }) => {
  selectedJobLevels.value = jobLevels
}

const toggleMobileFilters = () => {
  showMobileFilters.value = !showMobileFilters.value
  document.body.style.overflow = showMobileFilters.value ? 'hidden' : 'auto'
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

/* Main container */
.jobs-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
}

/* Search section */
.search-section {
  background: #ffffff;
  border-radius: 16px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.search-section:hover {
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* Layout */
.jobs-layout {
  display: flex;
  gap: 30px;
  position: relative;
}

/* Filters sidebar */
.filters-sidebar {
  flex: 0 0 300px;
  background: #ffffff;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  height: fit-content;
  transition: all 0.3s ease;
}

.sticky-filters {
  position: sticky;
  top: 20px;
}

/* Jobs main content */
.jobs-main {
  flex: 1;
  background: #ffffff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.jobs-main:hover {
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

/* Floating filter button for mobile */
.filter-fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4444dc, #6a11cb);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(68, 68, 220, 0.3);
  z-index: 998;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.filter-fab:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 12px 24px rgba(68, 68, 220, 0.4);
}

.filter-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
}

/* Mobile filters overlay */
.mobile-filters-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-end;
}

.mobile-filters-overlay.show {
  opacity: 1;
  visibility: visible;
}

.mobile-filters-content {
  background: white;
  width: 100%;
  max-height: 80vh;
  border-radius: 20px 20px 0 0;
  padding: 25px;
  overflow-y: auto;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.mobile-filters-overlay.show .mobile-filters-content {
  transform: translateY(0);
}

.mobile-filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #666;
}

.apply-filters-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #4444dc, #6a11cb);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  margin-top: 20px;
  font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .jobs-layout {
    gap: 20px;
  }
  
  .filters-sidebar {
    flex: 0 0 260px;
    padding: 20px;
  }
}

@media (max-width: 992px) {
  .filters-sidebar {
    display: none;
  }
  
  .jobs-main {
    padding: 25px;
  }
}

@media (max-width: 768px) {
  .jobs-container {
    padding: 15px;
  }
  
  .search-section {
    padding: 20px;
  }
  
  .jobs-main {
    padding: 20px;
    border-radius: 12px;
  }
  
  .filter-fab {
    width: 50px;
    height: 50px;
    font-size: 1rem;
    bottom: 20px;
    right: 20px;
  }
}

@media (min-width: 993px) {
  .mobile-filters-overlay {
    display: none;
  }
  
  .filter-fab {
    display: none;
  }
}
</style>