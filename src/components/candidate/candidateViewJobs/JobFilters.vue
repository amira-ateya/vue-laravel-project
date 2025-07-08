<template>
  <div class="filters-container">
    <!-- Filter sections with accordion animations -->
    <div class="filter-section" v-for="(section, index) in filterSections" :key="index">
      <div class="filter-header" @click="toggleSection(index)">
        <h3 class="filter-title">{{ section.title }}</h3>
        <i class="fas" :class="section.open ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
      </div>
      
      <transition name="expand">
        <div class="filter-options" v-show="section.open">
          <div 
            class="filter-option" 
            v-for="option in section.options" 
            :key="option"
            @click="toggleOption(section.key, option)"
          >
            <div class="option-checkbox" :class="{ 'checked': isOptionSelected(section.key, option) }">
              <i class="fas fa-check" v-if="isOptionSelected(section.key, option)"></i>
            </div>
            <span class="option-label">{{ option }}</span>
            <span class="option-count" v-if="getOptionCount(option)">{{ getOptionCount(option) }}</span>
          </div>
        </div>
      </transition>
    </div>
    
    <!-- Clear all button -->
    <button class="clear-all-btn" @click="clearAllFilters" v-if="hasActiveFilters">
      <i class="fas fa-times"></i> Clear All
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Define filter sections
const filterSections = ref([
  { 
    title: 'Employment Type', 
    key: 'employmentTypes', 
    options: ['Full-time', 'Part-time', 'Freelance', 'Internship'],
    open: true 
  },
  { 
    title: 'Categories', 
    key: 'categories', 
    options: ['Design', 'Sales', 'Marketing', 'Business', 'Development'],
    open: true 
  },
  { 
    title: 'Job Level', 
    key: 'jobLevels', 
    options: ['Entry', 'Mid', 'Senior', 'Director'],
    open: true 
  }
])

// Selected filters
const selectedFilters = ref({
  employmentTypes: [],
  categories: [],
  jobLevels: []
})

// Sample count data (would come from API in real app)
const optionCounts = {
  'Full-time': 124,
  'Part-time': 42,
  'Freelance': 36,
  'Internship': 28,
  'Design': 89,
  'Sales': 56,
  'Marketing': 72,
  'Business': 45,
  'Development': 112,
  'Entry': 94,
  'Mid': 156,
  'Senior': 78,
  'Director': 32
}

const emit = defineEmits([
  'filter-employment-type-changed',
  'filter-categories-changed',
  'filter-job-level-changed'
])

// Computed properties
const hasActiveFilters = computed(() => {
  return selectedFilters.value.employmentTypes.length > 0 ||
         selectedFilters.value.categories.length > 0 ||
         selectedFilters.value.jobLevels.length > 0
})

// Methods
const toggleSection = (index) => {
  filterSections.value[index].open = !filterSections.value[index].open
}

const toggleOption = (sectionKey, option) => {
  const index = selectedFilters.value[sectionKey].indexOf(option)
  if (index === -1) {
    selectedFilters.value[sectionKey].push(option)
  } else {
    selectedFilters.value[sectionKey].splice(index, 1)
  }
  emitFilterChange(sectionKey)
}

const isOptionSelected = (sectionKey, option) => {
  return selectedFilters.value[sectionKey].includes(option)
}

const getOptionCount = (option) => {
  return optionCounts[option] || null
}

const clearAllFilters = () => {
  selectedFilters.value = {
    employmentTypes: [],
    categories: [],
    jobLevels: []
  }
  emitFilterChange('employmentTypes')
  emitFilterChange('categories')
  emitFilterChange('jobLevels')
}

const emitFilterChange = (sectionKey) => {
  const eventName = `filter-${sectionKey.toLowerCase().replace('types', 'type')}-changed`
  emit(eventName, { [sectionKey]: selectedFilters.value[sectionKey] })
}
</script>

<style scoped>
.filters-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.filter-section {
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
  user-select: none;
}

.filter-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 10px;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px 5px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.filter-option:hover {
  background: rgba(68, 68, 220, 0.05);
}

.option-checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.option-checkbox.checked {
  background: #4444dc;
  border-color: #4444dc;
  color: white;
}

.option-checkbox .fa-check {
  font-size: 0.7rem;
}

.option-label {
  flex: 1;
  font-size: 0.95rem;
}

.option-count {
  font-size: 0.85rem;
  color: #6c757d;
}

.clear-all-btn {
  background: none;
  border: none;
  color: #4444dc;
  font-weight: 500;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.clear-all-btn:hover {
  color: #6a11cb;
}

/* Accordion expand transition */
.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from, .expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to, .expand-leave-from {
  opacity: 1;
  max-height: 500px;
}

/* Responsive */
@media (max-width: 768px) {
  .filter-section {
    padding-bottom: 15px;
  }
  
  .filter-title {
    font-size: 1rem;
  }
  
  .filter-options {
    gap: 10px;
  }
  
  .filter-option {
    padding: 6px 5px;
  }
}
</style>