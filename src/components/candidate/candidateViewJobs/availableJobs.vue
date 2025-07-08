<template>
  <!-- Animated job card wrapper -->
  <div class="mx-5 animate__animated animate__fadeIn">
    <!-- header section with subtle animation -->
    <div class="p-3 d-flex justify-content-between align-items-center animate__animated animate__fadeInDown">
      <div>
        <h2 class="fw-bold gradient-text">All Jobs</h2>
        <h5 class="text-muted">Showing {{ filteredJobs.length }} results</h5>
      </div>
      <div class="search-pulse" v-if="filteredJobs.length > 0">
        <i class="fas fa-search fa-lg text-purple"></i>
      </div>
    </div>

    <!-- show job list with staggered animations -->
    <div v-if="filteredJobs.length > 0">
      <transition-group name="staggered-fade" tag="div" appear>
        <div 
          v-for="(job, index) in paginatedJobs" 
          :key="job.id"
          :data-index="index"
          class="job-card"
          @mouseenter="hoverCard(index)"
          @mouseleave="unhoverCard(index)"
        >
          <!-- job card with hover effects -->
          <div class="border p-4 d-flex justify-content-between align-items-center my-3 rounded-4 shadow-sm card-inner">
            <!-- left: logo + title + location + tags -->
            <div class="d-flex">
              <!-- logo with animation -->
              <div class="me-4 logo-container">
                <img
                  :src="getLogoUrl(job, index)"
                  alt="company logo"
                  class="company-logo"
                  @error="onImageError($event, index)"
                  :class="{'logo-spin': spinningLogos.includes(index)}"
                />
              </div>

              <!-- job info -->
              <div class="d-flex flex-column gap-1">
                <h3 class="job-title">{{ job.title }}</h3>
                <h5 class="text-secondary mb-3 d-flex align-items-center">
                  <i class="fas fa-map-marker-alt me-2"></i>{{ job.location }}
                </h5>
                <span>
                  <!-- work type with animation -->
                  <span 
                    class="badge rounded-pill cstm-bg-text-green me-2 tag-hover"
                    style="font-size: 1.1rem; padding: 0.5em 0.9em;"
                  >
                    <i class="fas fa-briefcase me-1"></i>{{ job.work_type }}
                  </span>

                  <!-- category with animation -->
                  <span 
                    class="badge border rounded-pill me-2 border-text-purple tag-hover"
                    style="font-size: 1.1rem; padding: 0.5em 0.9em;"
                  >
                    <i class="fas fa-tag me-1"></i>{{ job.category?.category_name || 'Unknown Category' }}
                  </span>
                </span>
              </div>
            </div>

            <!-- right: apply + progress + count -->
            <div style="width: 200px;" class="d-flex flex-column justify-content-between gap-3">
              <!-- apply btn with animation -->
              <button 
                class="btn w-100 rounded-pill px-5 py-3 fw-bold fs-5 bg-purple text-white btn-purple apply-btn"
                @click="goToJobDetails(job.id)"
                @mouseenter="pulseButton($event)"
              >
                <span class="btn-content">
                  <span class="btn-text">Apply Now</span>
                  <i class="fas fa-paper-plane btn-icon"></i>
                </span>
              </button>

              <!-- animated progress bar -->
              <div class="progress-container">
                <div class="d-flex justify-content-between mb-1">
                  <small class="fw-bold">{{ job.candidates_id?.length || 0 }} applied</small>
                  <small class="text-muted">10 capacity</small>
                </div>
                <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100"
                  :aria-valuenow="applicantsPercent(job)">
                  <div
                    class="progress-bar progress-bar-animated"
                    :style="{ width: applicantsPercent(job) + '%' }"
                  ></div>
                </div>
              </div>

              <!-- salary estimate with animation -->
              <div class="salary-estimate animate__animated" :class="{'animate__pulse': hoveredCard === index}">
                <i class="fas fa-coins text-warning me-2"></i>
                <span class="fw-bold">${{ randomSalary() }}k/yr</span>
              </div>
            </div>
          </div>
        </div>
      </transition-group>

      <!-- pagination with animations -->
      <div class="d-flex justify-content-center align-items-center my-4 gap-2 flex-wrap animate__animated animate__fadeInUp">
        <button 
          class="btn btn-outline-purple pagination-btn" 
          @click="prevPage" 
          :disabled="currentPage === 1"
        >
          <i class="fas fa-chevron-left me-1"></i> Prev
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="['btn', 'pagination-btn', page === currentPage ? 'btn-purple' : 'btn-outline-purple']"
        >
          {{ page }}
        </button>

        <button 
          class="btn btn-outline-purple pagination-btn" 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
        >
          Next <i class="fas fa-chevron-right ms-1"></i>
        </button>
      </div>
    </div>

    <!-- no job found with animation -->
    <div v-else class="text-center mt-5 text-secondary fs-4 animate__animated animate__fadeIn">
      <div class="no-results-container">
        <i class="fas fa-search fa-3x mb-3 text-muted"></i>
        <h3 class="mb-3">No jobs found</h3>
        <p class="text-muted">Try adjusting your search or filters</p>
        <button class="btn btn-purple mt-3" @click="resetFilters">
          <i class="fas fa-sync-alt me-2"></i>Reset Filters
        </button>
      </div>
    </div>

    <!-- floating action button -->
    <div class="fab animate__animated animate__fadeInUp" @click="scrollToTop" v-show="showFab">
      <i class="fas fa-arrow-up"></i>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch, onBeforeUnmount } from 'vue'
import { useJobStore } from '@/stores/jobStore.js'
import { useCategoryStore } from '@/stores/categoryStore'
import { useEmployerStore } from '@/stores/employerStore'
import { useRouter } from 'vue-router'
import { toRefs } from 'vue'

// props from parent for search
const props = defineProps({
  search: {
    type: Object,
    default: () => ({ searchTerm: '', location: '' })
  }
})
const { search } = toRefs(props)

// get stores
const jobStore = useJobStore()
const categoryStore = useCategoryStore()
const employerStore = useEmployerStore()
const router = useRouter()

// animation states
const spinningLogos = ref([])
const hoveredCard = ref(null)
const showFab = ref(false)

// fetch data on mount
onMounted(async () => {
  await jobStore.fetchJobs()
  window.addEventListener('scroll', handleScroll)
  
  // Random logo spins on load
  setTimeout(() => {
    const randomIndexes = [...Array(jobStore.jobs.length).keys()]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
    spinningLogos.value = randomIndexes
    setTimeout(() => {
      spinningLogos.value = []
    }, 1000)
  }, 500)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  showFab.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// filter jobs by title + location
const filteredJobs = computed(() => {
  const titleTerm = search.value.searchTerm.toLowerCase().trim()
  const locationTerm = search.value.location.toLowerCase().trim()
  return jobStore.jobs.filter(job => {
    const titleMatch = job.title.toLowerCase().includes(titleTerm)
    const locationMatch = job.location.toLowerCase().includes(locationTerm)
    return titleMatch && locationMatch
  })
})

// pagination
const currentPage = ref(1)
const pageSize = 5
const totalPages = computed(() => Math.ceil(filteredJobs.value.length / pageSize))
const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredJobs.value.slice(start, start + pageSize)
})
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

// go to job page
const goToJobDetails = (id) => {
  router.push(`/candidate/jobs/${id}`)
}

// get logo or default
const getLogoUrl = (job, index) => {
  if (job?.employer?.company_logo) {
    return `http://localhost:8000/storage/${job.employer.company_logo}`
  }
  // Using higher quality random logos from Unsplash
  return `https://source.unsplash.com/random/200x200/?logo,company,business&sig=${index}`
}

// fallback logo if error
const onImageError = (event, index) => {
  event.target.src = `https://source.unsplash.com/random/200x200/?logo&sig=${index}`
}

// percent applied
const applicantsPercent = (job) => {
  const applied = job.candidates_id?.length || 0
  const percent = (applied / 10) * 100
  return percent > 100 ? 100 : percent
}

// animation methods
const hoverCard = (index) => {
  hoveredCard.value = index
}

const unhoverCard = (index) => {
  hoveredCard.value = null
}

const pulseButton = (event) => {
  event.target.classList.add('animate__animated', 'animate__pulse')
  setTimeout(() => {
    event.target.classList.remove('animate__animated', 'animate__pulse')
  }, 1000)
}

const resetFilters = () => {
  search.value.searchTerm = ''
  search.value.location = ''
  currentPage.value = 1
}

const randomSalary = () => {
  return Math.floor(Math.random() * 100) + 30
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

/* Main styling */
.gradient-text {
  background: linear-gradient(90deg, #4444dc, #6a11cb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

/* Job card animations */
.job-card {
  transition: all 0.3s ease;
}

.job-card:hover {
  transform: translateY(-5px);
}

.card-inner {
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.job-card:hover .card-inner {
  border-left: 4px solid #4444dc;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

/* Logo animation */
.logo-container {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.company-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  padding: 5px;
  transition: all 0.3s ease;
}

.job-card:hover .company-logo {
  transform: scale(1.1);
}

.logo-spin {
  animation: spin 1s ease-in-out;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Button styling */
.btn-purple {
  background: linear-gradient(135deg, #4444dc, #6a11cb);
  border: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.btn-purple:hover {
  background: linear-gradient(135deg, #6a11cb, #4444dc);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(106, 17, 203, 0.4);
}

.btn-outline-purple {
  border: 2px solid #4444dc;
  color: #4444dc;
  background-color: white;
  transition: all 0.3s ease;
}

.btn-outline-purple:hover {
  background-color: #4444dc;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(68, 68, 220, 0.3);
}

/* Apply button animation */
.apply-btn {
  position: relative;
  overflow: hidden;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-icon {
  transform: translateX(0);
  transition: all 0.3s ease;
}

.apply-btn:hover .btn-icon {
  transform: translateX(5px);
}

/* Progress bar animation */
.progress-container {
  transition: all 0.3s ease;
}

.progress {
  height: 8px;
  border-radius: 4px;
  background-color: #f0f0f0;
}

.progress-bar {
  background: linear-gradient(90deg, #64d1b3, #73cda9);
  border-radius: 4px;
  transition: width 1s ease-in-out;
}

.progress-bar-animated {
  position: relative;
  overflow: hidden;
}

.progress-bar-animated::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Tag hover effects */
.tag-hover {
  transition: all 0.3s ease;
  cursor: default;
}

.tag-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Salary estimate animation */
.salary-estimate {
  transition: all 0.3s ease;
  padding: 5px 10px;
  border-radius: 20px;
  background: rgba(255, 193, 7, 0.1);
}

/* Pagination button animations */
.pagination-btn {
  transition: all 0.3s ease;
  min-width: 40px;
}

.pagination-btn:hover {
  transform: translateY(-2px);
}

/* No results animation */
.no-results-container {
  animation: fadeIn 1s ease-in-out;
  padding: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.8);
  display: inline-block;
}

/* Search icon pulse */
.search-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Floating action button */
.fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4444dc, #6a11cb);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1000;
}

.fab:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

/* Staggered animations for job cards */
.staggered-fade-enter-active,
.staggered-fade-leave-active {
  transition: all 0.5s ease;
}

.staggered-fade-enter-from,
.staggered-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.staggered-fade-move {
  transition: transform 0.5s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .job-card {
    flex-direction: column;
  }
  
  .card-inner {
    flex-direction: column;
    gap: 20px;
  }
  
  .company-logo {
    width: 80px;
    height: 80px;
  }
}
</style>