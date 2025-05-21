<template>
  <div class="container-fluid p-4">
    <div class="row mb-4 align-items-center">
      <div class="col-md-6">
        <h2 class="mb-0">Job Listings</h2>
        <p class="text-muted mb-0">Manage your posted jobs</p>
      </div>
      <!-- <div class="col-md-6 text-end">
        <router-link to="/employer/post-job" class="btn btn-primary">
          <i class="fas fa-plus me-2"></i> Post New Job
        </router-link>
      </div> -->
    </div>

    <div v-if="error" class="alert alert-danger alert-dismissible fade show mb-4">
      {{ error }}
      <button type="button" class="btn-close" @click="error = null"></button>
    </div>

    <div class="card shadow-sm">
      <div class="card-body p-0">
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-else-if="jobs.length === 0" class="text-center py-5">
          <i class="fas fa-briefcase fa-4x text-muted mb-3"></i>
          <h5>No Jobs Posted Yet</h5>
          <p class="text-muted">Get started by posting your first job</p>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Type</th>
                <th>Status</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="job in jobs" :key="job.id">
                <td>{{ job.title }}</td>
                <td>{{ job.location }}</td>
                <td>
                  <span class="badge bg-info text-capitalize">{{ job.work_type }}</span>
                </td>
                <td>
                  <span class="badge bg-success text-capitalize">{{ job.status }}</span>
                </td>
                <td class="text-end">
                  <div class="d-flex justify-content-end gap-2">
                    <router-link 
                      :to="`/employer/edit-job/${job.id}`" 
                      class="btn btn-sm btn-outline-primary"
                      title="Edit"
                    >
                      <i class="fas fa-edit"></i>
                    </router-link>
                    <button 
                      @click="confirmDelete(job.id)" 
                      class="btn btn-sm btn-outline-danger"
                      title="Delete"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const jobs = ref([])
const loading = ref(false)
const error = ref(null)

// Load jobs from backend
const fetchJobs = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get('/employer/jobs')
    jobs.value = response.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to fetch jobs.'
  } finally {
    loading.value = false
  }
}

// Delete job
const confirmDelete = async (id) => {
  if (confirm('Are you sure you want to delete this job?')) {
    try {
      await axios.delete(`/employer/jobs/${id}`)
      await fetchJobs() // Reload after delete
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete job.'
    }
  }
}

onMounted(() => {
  fetchJobs()
})
</script>

<style scoped>
.card {
  border: none;
  border-radius: 0.5rem;
}

.table {
  margin-bottom: 0;
}

.table th {
  border-top: none;
  font-weight: 500;
  color: #6c757d;
}

.badge {
  font-size: 0.8em;
  padding: 0.35em 0.65em;
}

.btn {
  border-radius: 0.3rem;
  padding: 0.25rem 0.5rem;
}

.alert {
  border-radius: 0.5rem;
}
</style>
