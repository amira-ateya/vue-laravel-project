<template>
  <!-- JOB CARD WRAPPER -->
  <div class="mx-5">

    <!-- hero section for jobs -->
    <div class="p-3 d-flex justify-content-between align-items-center">
      <div>
        <h2 class="fw-bold">All Jobs</h2>
        <h5>Showing {{ filteredJobs.length }} results</h5>
      </div>
    </div>

    <!-- Looping through jobs -->
    <div v-if="filteredJobs.length > 0">
      <div v-for="(job, index) in filteredJobs" :key="job.id">

        <!-- JOB CARD -->
        <div class="border p-4 d-flex justify-content-between align-items-center my-3">

          <!-- Left side: company image + title + location + categories -->
          <div class="d-flex">
            <!-- company logo -->
            <div class="me-4">
              <img
                :src="getLogoUrl(job, index)"
                alt="company logo"
                style="width: 60px; height: 60px; object-fit: cover;"
                @error="onImageError($event, index)"
              />
            </div>

            <!-- text info -->
            <div class="d-flex flex-column gap-1">
              <h3>{{ job.title }}</h3>
              <h5 class="text-secondary mb-3">{{ job.location }}</h5>
              <span>
                <!-- Work Type Badge -->
                <span class="badge rounded-pill cstm-bg-text-green" style="font-size: 1.1rem; padding: 0.5em 0.9em;">
                  {{ job.work_type }}
                </span>

                <!-- Category Badge -->
                <span class="badge border rounded-pill me-2 border-text-purple" style="font-size: 1.1rem; padding: 0.5em 0.9em;">
                  {{ job.category?.category_name || 'Unknown Category' }}
                </span>
              </span>
            </div>
          </div>

          <!-- Right side: apply button + progress + applicants -->
          <div style="width: 200px;" class="d-flex flex-column justify-content-between gap-3">

            <!-- Apply Button -->
            <button class="btn w-100 rounded-0 px-5 py-3 fw-bold fs-5 bg-purple text-white" @click="goToJobDetails(job.id)">
              Apply
            </button>

            <!-- Progress Bar -->
            <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100"
              :aria-valuenow="applicantsPercent(job)">
              <div
                class="progress-bar"
                :style="{ width: applicantsPercent(job) + '%' }"
              ></div>
            </div>

            <!-- Applicants Count -->
            <div style="font-size: 1.15rem;">
              <span class="fw-bold">{{ job.candidates_id?.length || 0 }} applied</span> 
              <span class="text-secondary"> of 10 capacity</span>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- No jobs message -->
    <div v-else class="text-center mt-5 text-secondary fs-4">
      No jobs found based on your search or filters.
    </div>

  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useJobStore } from '@/stores/jobStore.js'
import { useCategoryStore } from '@/stores/categoryStore'
import { useEmployerStore } from '@/stores/employerStore'
import { useRouter } from 'vue-router'
import { toRefs } from 'vue'

const props = defineProps({
  search: {
    type: Object,
    default: () => ({ searchTerm: '', location: '' })
  }
})

const { search } = toRefs(props)

const jobStore = useJobStore()
const categoryStore = useCategoryStore()
const employerStore = useEmployerStore()
const router = useRouter()

onMounted(async () => {
  await jobStore.fetchJobs()
})

// Filtering jobs by search
const filteredJobs = computed(() => {
  return jobStore.jobs.filter(job => {
    const titleMatch = job.title.toLowerCase().includes(search.value.searchTerm.toLowerCase())
    const locationMatch = job.location.toLowerCase().includes(search.value.location.toLowerCase())
    return titleMatch && locationMatch
  })
})

// Navigate to job detail page
const goToJobDetails = (id) => router.push(`/candidate/jobs/${id}`)

// Get image URL from local server, fallback if null or invalid
const getLogoUrl = (job, index) => {
  if (job?.employer?.company_logo) {
    return `http://localhost:8000/storage/${job.employer.company_logo}`
  }
  return `https://cdn-icons-png.flaticon.com/512/300/30022${(index + 1) % 10}.png`
}

// Handle image loading error
const onImageError = (event, index) => {
  event.target.src = `https://cdn-icons-png.flaticon.com/512/300/30022${(index + 1) % 10}.png`
}

// Get applicants progress %
const applicantsPercent = (job) => {
  const applied = job.candidates_id?.length || 0
  const capacity = 10
  const percent = (applied / capacity) * 100
  return percent > 100 ? 100 : percent
}
</script>

<style scoped>
.border-text-yellow {
  border-color: #fcc24a !important;
  color: #fcc24a !important;
}

.border-text-purple {
  border-color: #4444dc !important;
  color: #4444dc !important;
}

.bg-purple {
  background-color: #4444dc !important;
}

/* type of job */
.cstm-bg-text-green {
  background-color: #effaf7;
  color: #64d1b3;
}

.progress {
  height: 6px;
  border-radius: 0px;
}

.progress-bar {
  background-color: #73cda9;
}
</style>
