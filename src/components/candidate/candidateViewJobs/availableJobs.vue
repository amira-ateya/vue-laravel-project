<template>
  <!-- job card wrapper -->
  <div class="mx-5">

    <!-- header section -->
    <div class="p-3 d-flex justify-content-between align-items-center">
      <div>
        <h2 class="fw-bold">All Jobs</h2>
        <h5>Showing {{ filteredJobs.length }} results</h5>
      </div>
    </div>

    <!-- show job list -->
    <div v-if="filteredJobs.length > 0">
      <div v-for="(job, index) in paginatedJobs" :key="job.id">

        <!-- job card -->
        <div class="border p-4 d-flex justify-content-between align-items-center my-3 rounded-3 shadow-sm">

          <!-- left: logo + title + location + tags -->
          <div class="d-flex">
            <!-- logo -->
            <div class="me-4">
              <img
                :src="getLogoUrl(job, index)"
                alt="company logo"
                style="width: 60px; height: 60px; object-fit: cover;"
                @error="onImageError($event, index)"
              />
            </div>

            <!-- job info -->
            <div class="d-flex flex-column gap-1">
              <h3>{{ job.title }}</h3>
              <h5 class="text-secondary mb-3">{{ job.location }}</h5>
              <span>
                <!-- work type -->
                <span class="badge rounded-pill cstm-bg-text-green" style="font-size: 1.1rem; padding: 0.5em 0.9em;">
                  {{ job.work_type }}
                </span>

                <!-- category -->
                <span class="badge border rounded-pill me-2 border-text-purple" style="font-size: 1.1rem; padding: 0.5em 0.9em;">
                  {{ job.category?.category_name || 'Unknown Category' }}
                </span>
              </span>
            </div>
          </div>

          <!-- right: apply + progress + count -->
          <div style="width: 200px;" class="d-flex flex-column justify-content-between gap-3">

            <!-- apply btn -->
            <button class="btn w-100 rounded-0 px-5 py-3 fw-bold fs-5 bg-purple text-white btn-purple" @click="goToJobDetails(job.id)">
              Apply
            </button>

            <!-- progress -->
            <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100"
              :aria-valuenow="applicantsPercent(job)">
              <div
                class="progress-bar"
                :style="{ width: applicantsPercent(job) + '%' }"
              ></div>
            </div>

            <!-- applicants -->
            <div style="font-size: 1.15rem;">
              <span class="fw-bold">{{ job.candidates_id?.length || 0 }} applied</span> 
              <span class="text-secondary"> of 10 capacity</span>
            </div>

          </div>
        </div>
      </div>

      <!-- pagination -->
      <div class="d-flex justify-content-center align-items-center my-4 gap-2 flex-wrap">
        <button class="btn btn-outline-purple" @click="prevPage" :disabled="currentPage === 1">
          Prev
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="['btn', page === currentPage ? 'btn-purple' : 'btn-outline-purple']"
        >
          {{ page }}
        </button>

        <button class="btn btn-outline-purple" @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
    </div>

    <!-- no job found -->
    <div v-else class="text-center mt-5 text-secondary fs-4">
      No jobs found based on your search or filters.
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
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

// fetch data on mount
onMounted(async () => {
  await jobStore.fetchJobs()
})

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
const goToJobDetails = (id) => router.push(`/candidate/jobs/${id}`)

// get logo or default
const getLogoUrl = (job, index) => {
  if (job?.employer?.company_logo) {
    return `http://localhost:8000/storage/${job.employer.company_logo}`
  }
  return `https://cdn-icons-png.flaticon.com/512/300/30022${(index + 1) % 10}.png`
}

// fallback logo if error
const onImageError = (event, index) => {
  event.target.src = `https://cdn-icons-png.flaticon.com/512/300/30022${(index + 1) % 10}.png`
}

// percent applied
const applicantsPercent = (job) => {
  const applied = job.candidates_id?.length || 0
  const percent = (applied / 10) * 100
  return percent > 100 ? 100 : percent
}
</script>

<style scoped>
/* badge colors */
.border-text-yellow {
  border-color: #fcc24a !important;
  color: #fcc24a !important;
}
.border-text-purple {
  border-color: #4444dc !important;
  color: #4444dc !important;
}
.cstm-bg-text-green {
  background-color: #effaf7;
  color: #64d1b3;
}

/* button colors */
.btn-purple {
  background-color: #4444dc;
  color: white;
}
.btn-purple:hover {
  background-color: #3333b3;
  color: white;
}
.btn-outline-purple {
  border: 2px solid #4444dc;
  color: #4444dc;
  background-color: white;
}
.btn-outline-purple:hover {
  background-color: #4444dc;
  color: white;
}

/* progress */
.progress {
  height: 6px;
  border-radius: 0px;
}
.progress-bar {
  background-color: #73cda9;
}
</style>
