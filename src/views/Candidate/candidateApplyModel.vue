<template>
  <div class="container mt-5 p-4 bg-white rounded shadow-sm" style="max-width: 600px;">
    <h2 class="h5 mb-3">Submit your application</h2>
    <p class="text-muted mb-4">
      The following is required and will only be shared with Nomad
    </p>

    <div v-if="showSuccess" class="alert alert-success alert-dismissible fade show" role="alert">
      Your application has been submitted successfully!
      <button type="button" class="btn-close" @click="showSuccess = false" aria-label="Close"></button>
    </div>

    <form @submit.prevent="submitForm" novalidate :class="{ 'was-validated': submitted }">
      <div class="mb-3">
        <label class="form-label">Phone number</label>
        <input v-model="form.contact_phone" type="tel" class="form-control" placeholder="Enter your phone number" required />
        <div class="invalid-feedback">Phone number is required.</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Attach your resume</label>
        <input type="file" class="form-control" @change="handleFileUpload" required />
        <div class="invalid-feedback">Resume upload is required.</div>
      </div>

      <button type="submit" class="btn bg-indigo-600 w-100 text-light">
        Submit Application
      </button>
    </form>

    <p class="text-muted mt-3 small">
      By sending the request you confirm that you accept our
      <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
    </p>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const form = reactive({
  contact_phone: '',
  resume_snapshot: null
})

const submitted = ref(false)
const showSuccess = ref(false)

const route = useRoute()
const job_id = ref(route.params.job_id)
const candidate_id = ref(null)

// Fetch logged-in user info (must be authenticated with Sanctum)
onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/user')
    candidate_id.value = res.data.id
  } catch (error) {
    console.error('Authentication error:', error)
  }
})

const handleFileUpload = (event) => {
  form.resume_snapshot = event.target.files[0]
}

const submitForm = async () => {
  submitted.value = true
  const formElement = document.querySelector('form')

  if (formElement.checkValidity()) {
    const formData = new FormData()
    formData.append('contact_phone', form.contact_phone)
    formData.append('resume_snapshot', form.resume_snapshot)
    formData.append('job_id', job_id.value)
    formData.append('candidate_id', candidate_id.value)

    try {
      await axios.post('http://localhost:8000/api/candidate/applications-add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      showSuccess.value = true
      submitted.value = false
    } catch (error) {
      console.error('Application submission failed:', error)
    }
  }
}
</script>

<style scoped>
.btn {
  background-color: rgb(63, 2, 216);
}
.btn:hover {
  background-color: rgb(69, 5, 230);
}
</style>
