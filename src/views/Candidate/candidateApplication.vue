<template>
  <div class="container mt-4">
    <!-- Empty State -->
    <div v-if="applications.length === 0" class="text-center my-5">
      <i class="fas fa-box-open fa-5x text-secondary mb-3"></i>
      <p class="fs-4 text-muted">No applications yet.</p>
    </div>

    <!-- Accordion for Applications -->
    <div v-else class="accordion" id="applicationsAccordion">
      <div
        class="accordion-item"
        v-for="(app, index) in applications"
        :key="app.id"
      >
        <h2 class="accordion-header" :id="'heading' + index">
          <button
            class="accordion-button collapsed custom-header-bg text-white"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + index"
            aria-expanded="false"
            :aria-controls="'collapse' + index"
          >
            <div class="w-100 d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <h3 class="fw-semibold m-0">{{ app.job.title }}</h3>
              </div>
              <div class="fs-6 text-light">{{ formatDate(app.created_at) }}</div>
              <div class="d-flex align-items-center gap-2">
                <div :class="['badge p-2 fs-6', statusBadge(app.status)]">
                  {{ app.status }}
                </div>
                <button
                  v-if="app.status === 'pending'"
                  class="btn btn-danger me-2"
                  @click.stop="openConfirmModal(app)"
                >
                  Cancel
                </button>
              </div>
            </div>
          </button>
        </h2>
        <div
          :id="'collapse' + index"
          class="accordion-collapse collapse"
          :aria-labelledby="'heading' + index"
          data-bs-parent="#applicationsAccordion"
        >
          <div class="accordion-body fs-6">
            <div class="row mb-3">
              <div class="col-md-6 mb-2">
                <i class="fas fa-phone-alt me-2 text-primary"></i>
                <strong>Contact Phone:</strong> {{ app.contact_phone }}
              </div>
              <div class="col-md-6 mb-2">
                <i class="fas fa-map-marker-alt me-2 text-success"></i>
                <strong>Location:</strong> {{ app.job.location }}
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6 mb-2">
                <i class="fas fa-dollar-sign me-2 text-info"></i>
                <strong>Salary:</strong> {{ app.job.salary_from }} - {{ app.job.salary_to }}
              </div>
              <div class="col-md-6 mb-2">
                <i class="fas fa-calendar-alt me-2 text-warning"></i>
                <strong>Deadline:</strong> {{ app.job.deadline }}
              </div>
            </div>

            <div class="mb-3">
              <i class="fas fa-align-left me-2 text-secondary"></i>
              <strong>Description:</strong>
              <div class="bg-light p-3 rounded border mt-1">
                {{ app.job.description }}
              </div>
            </div>

            <div>
              <i class="fas fa-tasks me-2 text-secondary"></i>
              <strong>Responsibilities:</strong>
              <ul class="list-group list-group-flush mt-2">
                <li
                  v-for="(item, idx) in splitResponsibilities(app.job.responsibilities)"
                  :key="idx"
                  class="list-group-item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div
      class="modal fade"
      id="confirmDeleteModal"
      tabindex="-1"
      aria-labelledby="confirmDeleteLabel"
      aria-hidden="true"
      ref="deleteModalRef"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmDeleteLabel">Confirm Deletion</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to cancel this application?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="confirmDelete">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

let applications = ref([])
let selectedApplication = ref(null)
let deleteModalRef = ref(null)
let modalInstance = null

onMounted(async () => {
  try {
    const userResponse = await axios.get('http://localhost:8000/api/user')
    const user = userResponse.data

    const candidateResponse = await axios.get(`http://localhost:8000/api/candidate/user/${user.id}`)
    const candidate = candidateResponse.data

    const appResponse = await axios.get(`http://localhost:8000/api/applications/candidate/${candidate.id}`)
    applications.value = appResponse.data.applications
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  const modalElement = deleteModalRef.value
  if (modalElement) {
    modalInstance = new bootstrap.Modal(modalElement)
  }
})

const openConfirmModal = (application) => {
  selectedApplication.value = application
  modalInstance.show()
}

const confirmDelete = async () => {
  if (!selectedApplication.value) return

  try {
    await axios.delete(`http://localhost:8000/api/applications/${selectedApplication.value.id}`)
    applications.value = applications.value.filter(
      (a) => a.id !== selectedApplication.value.id
    )
    modalInstance.hide()
  } catch (error) {
    console.error('Error deleting application:', error)
    alert('Failed to delete application.')
  }
}

const formatDate = (isoDate) => {
  const date = new Date(isoDate)
  return date.toLocaleString()
}

const statusBadge = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-warning text-dark'
    case 'accepted':
      return 'bg-success'
    case 'rejected':
      return 'bg-danger'
    default:
      return 'bg-secondary'
  }
}

const splitResponsibilities = (text) => {
  if (!text) return []
  return text
    .split('.')
    .map((str) => str.trim())
    .filter((str) => str.length > 0)
}
</script>

<style scoped>
.badge {
  padding: 0.5em 0.75em;
  font-size: 0.75rem;
}

.custom-header-bg {
  background-color: #5638ff;
}

.accordion-button {
  font-size: 1.1rem;
}

.accordion-body strong {
  color: #333;
}

.list-group-item {
  background-color: #f8f9fa;
  border: none;
  padding-left: 1.5rem;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.accordion-item {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>
