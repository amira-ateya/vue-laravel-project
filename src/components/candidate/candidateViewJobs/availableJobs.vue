<template>
  <!-- JOB CARD WRAPPER -->
  <div class="mx-5">

    <!-- hero section for jobs -->
    <div class="p-3 d-flex justify-content-between align-items-center">
      <div>
        <h2 class="fw-bold">All Jobs</h2>
        <h5>Showing {{ jobStore.jobs.length }} results</h5>
      </div>
    </div>

    <!-- Looping through jobs -->
    <div v-for="job in jobStore.jobs" :key="job.id">
      <!-- JOB CARD -->
      <div class="border p-4 d-flex justify-content-between align-items-center my-3">

        <!-- Left side: company image + title + location + categories -->
        <div class="d-flex">
          <!-- company logo -->
          <div class="me-4">

            <p>img: {{getEmployerLogo(job.employer_id)}}</p>
            <img
              :src="getEmployerLogo(job.employer_id)"
              alt="company logo"
              style="width: 60px; height: 60px; object-fit: cover;"
            >
          </div>

          <!-- text info -->
          <div class="d-flex flex-column gap-1">
            <h3 class="">{{ job.title }}</h3>
            <h5 class="text-secondary mb-3">{{ job.location }}</h5>
            <span>
              <span class="badge rounded-pill cstm-bg-text-green" style="font-size: 1.1rem; padding: 0.5em 0.9em;">
                {{ job.work_type }}
              </span>

              <!-- Categories -->
                <span class="badge border rounded-pill me-2 border-text-purple" style="font-size: 1.1rem; padding: 0.5em 0.9em;">
                  {{ categoryStore.getCategoryNameById(job.categories_id[0]) }}
                </span>


                <span class="badge border rounded-pill me-2 border-text-yellow" style="font-size: 1.1rem; padding: 0.5em 0.9em;">
                  {{ categoryStore.getCategoryNameById(job.categories_id[1]) }}
                </span>

            </span>
          </div>
        </div>

        <!-- Right side: apply button + progress + applicants -->
        <div style="width: 200px;" class="d-flex flex-column justify-content-between gap-3">
          <button class="btn w-100 rounded-0 px-5 py-3 fw-bold fs-5 bg-purple text-white">Apply</button>

          <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>

          <div style="font-size: 1.15rem;">
            <span class="fw-bold">{{ job.candidates_id?.length || 0 }} applied</span> 
            <span class="text-secondary"> of 10 capacity</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useJobStore } from '@/stores/jobStore'
import { useCategoryStore } from '@/stores/categoryStore'
import { useEmployerStore } from '@/stores/employerStore'

const jobStore = useJobStore()
const categoryStore = useCategoryStore()
const employerStore = useEmployerStore()

// Fetch everything on mount
onMounted(async () => {
  await Promise.all([
    jobStore.fetchJobs(),
    categoryStore.fetchCategories(),
    employerStore.fetchEmployers()
  ])
})

// Helper to get logo from employer ID
const getEmployerLogo = (employerId) => {
  const employer = employerStore.employers.find(e => e.id === employerId)
  return employer?.company_logo || '' // fallback image
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
