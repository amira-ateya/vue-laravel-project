<template>
  <PostJob v-if="jobData" :jobData="jobData" :isEditing="true" />
  <div v-else class="container-fluid p-4">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card shadow-sm">
          <div class="card-body text-center py-5">
            <div v-if="loading" class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div v-else-if="error" class="alert alert-danger">
              <div class="d-flex justify-content-between align-items-center">
                <span>{{ error }}</span>
                <div>
                  <button @click="tryAgain" class="btn btn-sm btn-outline-danger ms-3">
                    Try Again
                  </button>
                  <router-link to="/employer/job-listing" class="btn btn-sm btn-outline-secondary ms-2">
                    Back to Listings
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobStore } from '@/stores/jobStore'
import PostJob from '@/views/Employer/PostJob.vue'

const route = useRoute()
const router = useRouter()
const jobStore = useJobStore()

const jobData = ref(null)
const loading = ref(true)
const error = ref(null)

const loadJob = async () => {
  loading.value = true
  error.value = null
  try {
    const job = await jobStore.getJobById(route.params.id)
    if (job) {
      jobData.value = job
    } else {
      throw new Error('Job not found')
    }
  } catch (err) {
    error.value = jobStore.error?.message || 'Failed to load job data.'
  } finally {
    loading.value = false
  }
}

const tryAgain = () => {
  loadJob()
}

onMounted(() => {
  loadJob()
})
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}

.alert {
  border-radius: 0.5rem;
}
</style>