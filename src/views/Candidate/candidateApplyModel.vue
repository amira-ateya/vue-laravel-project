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
          <label class="form-label">Full name</label>
          <input v-model="form.fullName" type="text" class="form-control" placeholder="Enter your fullname" required />
          <div class="invalid-feedback">Full name is required.</div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input v-model="form.email" type="email" class="form-control" placeholder="Enter your email address" required />
          <div class="invalid-feedback">A valid email is required.</div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Phone number</label>
          <input v-model="form.phone" type="tel" class="form-control" placeholder="Enter your phone number" required />
          <div class="invalid-feedback">Phone number is required.</div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Current or previous job title</label>
          <input v-model="form.jobTitle" type="text" class="form-control" placeholder="What's your current or previous job title?" required />
          <div class="invalid-feedback">Job title is required.</div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">LinkedIn URL</label>
          <input v-model="form.linkedin" type="url" class="form-control" placeholder="Link to your LinkedIn URL" required />
          <div class="invalid-feedback">LinkedIn URL is required.</div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Portfolio URL</label>
          <input v-model="form.portfolio" type="url" class="form-control" placeholder="Link to your portfolio URL" required />
          <div class="invalid-feedback">Portfolio URL is required.</div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Additional information</label>
          <textarea
            v-model="form.additionalInfo"
            class="form-control"
            rows="4"
            placeholder="Add a cover letter or anything else you want to share"
            maxlength="500"
          ></textarea>
          <div class="form-text text-end">{{ form.additionalInfo.length }} / 500</div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Attach your resume</label>
          <input type="file" class="form-control" @change="handleFileUpload" required />
          <div class="invalid-feedback">Resume upload is required.</div>
        </div>
  
        <button type="submit" class="btn bg-indigo-600 w-100 text-light" >
          Submit Application
        </button>
      </form>
  
      <p class="text-muted mt-3 small">
        By sending the request you can confirm that you accept our
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </p>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue'
  import { useApplicationStore } from '@/stores/applicationStore.ts'
  const applicationStore = useApplicationStore()
  
  const form = reactive({
    fullName: '',
    email: '',
    phone: '',
    jobTitle: '',
    linkedin: '',
    portfolio: '',
    additionalInfo: '',
    resume: null
  })
  
  
  const submitted = ref(false)
  const showSuccess = ref(false)
  
  const submitForm = async () => {
    submitted.value = true
    const formElement = document.querySelector('form')
    if (formElement.checkValidity()) {
      try {
        await applicationStore.createCandidate({ ...form })
        showSuccess.value = true
      } catch (err) {
        console.error('Failed to submit application', err)
      }
    }
  }
  
  
  </script>
  <style scoped>
  .btn{
    background-color: rgb(63, 2, 216);
  }
  .btn:hover{
    background-color:  rgb(69, 5, 230);
  }
  </style>