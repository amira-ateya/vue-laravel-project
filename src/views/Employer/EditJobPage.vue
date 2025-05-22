<template>
  <div class="job-edit-container">
    <div class="edit-card">
      <!-- Header with animated gradient -->
      <div class="card-header">
        <div class="header-content">
          <h1 class="card-title">Edit Job Posting</h1>
          <p class="card-subtitle">Update your job details to attract the best candidates</p>
        </div>
        <div class="header-icon">
          <i class="fas fa-briefcase"></i>
        </div>
      </div>

      <!-- Main Form -->
      <form @submit.prevent="updateJob" class="job-form">
        <!-- Job Title -->
        <div class="form-group floating-label">
          <input 
            v-model="form.title" 
            type="text" 
            class="form-input" 
            placeholder=" "
            @input="clearError('title')"
            :class="{ 'input-error': errors.title }"
          />
          <label>Job Title *</label>
          <div class="input-underline" :class="{ 'error-line': errors.title }"></div>
          <transition name="fade">
            <div v-if="errors.title" class="error-message-container">
              <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <span class="error-message">{{ errors.title }}</span>
            </div>
          </transition>
        </div>

        <!-- Work Type & Location -->
        <div class="form-row">
          <div class="form-group floating-label">
            <select 
              v-model="form.work_type" 
              class="form-input" 
              @change="clearError('work_type')"
              :class="{ 'input-error': errors.work_type }"
            >
              <option disabled value=""></option>
              <option v-for="type in workTypes" :key="type" :value="type">{{ type }}</option>
            </select>
            <label>Work Type *</label>
            <div class="input-underline" :class="{ 'error-line': errors.work_type }"></div>
            <transition name="fade">
              <div v-if="errors.work_type" class="error-message-container">
                <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="error-message">{{ errors.work_type }}</span>
              </div>
            </transition>
          </div>

          <div class="form-group floating-label">
            <input 
              v-model="form.location" 
              type="text" 
              class="form-input" 
              placeholder=" "
              @input="clearError('location')"
              :class="{ 'input-error': errors.location }"
            />
            <label>Location *</label>
            <div class="input-underline" :class="{ 'error-line': errors.location }"></div>
            <transition name="fade">
              <div v-if="errors.location" class="error-message-container">
                <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="error-message">{{ errors.location }}</span>
              </div>
            </transition>
          </div>
        </div>

        <!-- Category & Deadline -->
        <div class="form-row">
          <div class="form-group floating-label">
            <select 
              v-model="form.category_id" 
              class="form-input"
              @change="clearError('category_id')"
              :class="{ 'input-error': errors.category_id }"
            >
              <option disabled value=""></option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.category_name }}
              </option>
            </select>
            <label>Category *</label>
            <div class="input-underline" :class="{ 'error-line': errors.category_id }"></div>
            <transition name="fade">
              <div v-if="errors.category_id" class="error-message-container">
                <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="error-message">{{ errors.category_id }}</span>
              </div>
            </transition>
          </div>

          <div class="form-group floating-label">
            <input 
              v-model="form.deadline" 
              type="date" 
              class="form-input" 
              placeholder=" "
              @input="clearError('deadline')"
              :class="{ 'input-error': errors.deadline }"
            />
            <label>Application Deadline *</label>
            <div class="input-underline" :class="{ 'error-line': errors.deadline }"></div>
            <transition name="fade">
              <div v-if="errors.deadline" class="error-message-container">
                <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="error-message">{{ errors.deadline }}</span>
              </div>
            </transition>
          </div>
        </div>

        <!-- Salary Range -->
        <div class="form-row">
          <div class="form-group floating-label">
            <div class="input-with-icon">
              <span class="currency-icon">$</span>
              <input 
                v-model.number="form.salary_from" 
                type="number" 
                class="form-input" 
                placeholder=" "
                @input="validateSalary('salary_from')"
                :class="{ 'input-error': errors.salary_from }"
                min="0"
              />
            </div>
            <label>Salary From</label>
            <div class="input-underline" :class="{ 'error-line': errors.salary_from }"></div>
            <transition name="fade">
              <div v-if="errors.salary_from" class="error-message-container">
                <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="error-message">{{ errors.salary_from }}</span>
              </div>
            </transition>
          </div>

          <div class="form-group floating-label">
            <div class="input-with-icon">
              <span class="currency-icon">$</span>
              <input 
                v-model.number="form.salary_to" 
                type="number" 
                class="form-input" 
                placeholder=" "
                @input="validateSalary('salary_to')"
                :class="{ 'input-error': errors.salary_to }"
                min="0"
              />
            </div>
            <label>Salary To</label>
            <div class="input-underline" :class="{ 'error-line': errors.salary_to }"></div>
            <transition name="fade">
              <div v-if="errors.salary_to" class="error-message-container">
                <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="error-message">{{ errors.salary_to }}</span>
              </div>
            </transition>
          </div>
        </div>

        <!-- Description -->
        <div class="form-group floating-label">
          <textarea 
            v-model="form.description" 
            class="form-input textarea" 
            placeholder=" "
            @input="clearError('description')"
            :class="{ 'input-error': errors.description }"
          ></textarea>
          <label>Job Description *</label>
          <div class="input-underline" :class="{ 'error-line': errors.description }"></div>
          <transition name="fade">
            <div v-if="errors.description" class="error-message-container">
              <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <span class="error-message">{{ errors.description }}</span>
            </div>
          </transition>
        </div>

        <!-- Responsibilities -->
        <div class="form-group floating-label">
          <textarea 
            v-model="form.responsibilities" 
            class="form-input textarea" 
            placeholder=" "
            @input="clearError('responsibilities')"
            :class="{ 'input-error': errors.responsibilities }"
          ></textarea>
          <label>Key Responsibilities *</label>
          <div class="input-underline" :class="{ 'error-line': errors.responsibilities }"></div>
          <transition name="fade">
            <div v-if="errors.responsibilities" class="error-message-container">
              <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <span class="error-message">{{ errors.responsibilities }}</span>
            </div>
          </transition>
        </div>

        <!-- Benefits -->
        <div class="form-group floating-label">
          <textarea 
            v-model="form.benefits" 
            class="form-input textarea" 
            placeholder=" "
            @input="clearError('benefits')"
            :class="{ 'input-error': errors.benefits }"
          ></textarea>
          <label>Benefits & Perks *</label>
          <div class="input-underline" :class="{ 'error-line': errors.benefits }"></div>
          <transition name="fade">
            <div v-if="errors.benefits" class="error-message-container">
              <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <span class="error-message">{{ errors.benefits }}</span>
            </div>
          </transition>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button 
            type="button" 
            class="btn-secondary"
            @click="router.push('/employer/job-listing')"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="btn-primary"
            :disabled="isSubmitting"
          >
            <span v-if="!isSubmitting">Update Job</span>
            <span v-else class="button-loading">
              <span class="spinner"></span>
              Saving...
            </span>
          </button>
        </div>
      </form>
    </div>

    <!-- Success Notification -->
    <transition name="slide-fade">
      <div v-if="showSuccess" class="success-notification">
        <i class="fas fa-check-circle"></i>
        <span>Job updated successfully!</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const jobId = route.params.id

const form = ref({
  title: '',
  work_type: '',
  location: '',
  category_id: '',
  salary_from: '',
  salary_to: '',
  deadline: '',
  description: '',
  responsibilities: '',
  benefits: '',
})

const categories = ref([])
const workTypes = ref([])
const isSubmitting = ref(false)
const showSuccess = ref(false)
const errors = ref({})

const fetchCategories = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/categories')
    categories.value = res.data
  } catch (err) {
    console.error('Failed to load categories', err)
  }
}

const fetchWorkTypes = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/job/options')
    workTypes.value = res.data.work_types
  } catch (err) {
    console.error('Failed to load work types', err)
  }
}

const fetchJob = async () => {
  if (!jobId) return

  try {
    const res = await axios.get(`http://localhost:8000/api/employer/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    const job = res.data

    form.value = {
      title: job.title || '',
      work_type: job.work_type || '',
      location: job.location || '',
      category_id: job.category_id || '',
      salary_from: job.salary_from || '',
      salary_to: job.salary_to || '',
      deadline: job.deadline ? job.deadline.slice(0, 10) : '',
      description: job.description || '',
      responsibilities: job.responsibilities || '',
      benefits: job.benefits || '',
    }

  } catch (err) {
    console.error('Failed to fetch job data', err)
  }
}

const validateForm = () => {
  let isValid = true
  errors.value = {}

  // Job Title validation (min 10 chars)
  if (!form.value.title.trim()) {
    errors.value.title = 'Job title is required'
    isValid = false
  } else if (form.value.title.trim().length < 10) {
    errors.value.title = 'Job title must be at least 10 characters'
    isValid = false
  }

  // Work Type validation
  if (!form.value.work_type) {
    errors.value.work_type = 'Work type is required'
    isValid = false
  }

  // Location validation
  if (!form.value.location.trim()) {
    errors.value.location = 'Location is required'
    isValid = false
  }

  // Category validation
  if (!form.value.category_id) {
    errors.value.category_id = 'Category is required'
    isValid = false
  }

  // Deadline validation
  if (!form.value.deadline) {
    errors.value.deadline = 'Deadline is required'
    isValid = false
  } else {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const deadlineDate = new Date(form.value.deadline)
    if (deadlineDate < today) {
      errors.value.deadline = 'Deadline must be in the future'
      isValid = false
    }
  }

  // Job Description validation (min 10 chars)
  if (!form.value.description.trim()) {
    errors.value.description = 'Description is required'
    isValid = false
  } else if (form.value.description.trim().length < 10) {
    errors.value.description = 'Description must be at least 10 characters'
    isValid = false
  }

  // Responsibilities validation (min 10 chars)
  if (!form.value.responsibilities.trim()) {
    errors.value.responsibilities = 'Responsibilities are required'
    isValid = false
  } else if (form.value.responsibilities.trim().length < 10) {
    errors.value.responsibilities = 'Responsibilities must be at least 10 characters'
    isValid = false
  }

  // Benefits validation (min 10 chars)
  if (!form.value.benefits.trim()) {
    errors.value.benefits = 'Benefits are required'
    isValid = false
  } else if (form.value.benefits.trim().length < 10) {
    errors.value.benefits = 'Benefits must be at least 10 characters'
    isValid = false
  }

  // Salary validation
  if (form.value.salary_from !== '' && form.value.salary_from < 0) {
    errors.value.salary_from = 'Salary cannot be negative'
    isValid = false
  }

  if (form.value.salary_to !== '' && form.value.salary_to < 0) {
    errors.value.salary_to = 'Salary cannot be negative'
    isValid = false
  }

  if (form.value.salary_from !== '' && form.value.salary_to !== '' && 
      parseFloat(form.value.salary_from) > parseFloat(form.value.salary_to)) {
    errors.value.salary_from = 'Minimum salary cannot be higher than maximum'
    errors.value.salary_to = 'Maximum salary cannot be lower than minimum'
    isValid = false
  }

  return isValid
}

const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}

const validateSalary = (field) => {
  clearError(field)
  if (form.value[field] !== '' && form.value[field] < 0) {
    errors.value[field] = 'Salary cannot be negative'
    return false
  }
  
  // Validate salary range if both fields have values
  if (form.value.salary_from !== '' && form.value.salary_to !== '' && 
      parseFloat(form.value.salary_from) > parseFloat(form.value.salary_to)) {
    errors.value.salary_from = 'Minimum salary cannot be higher than maximum'
    errors.value.salary_to = 'Maximum salary cannot be lower than minimum'
    return false
  }
  
  return true
}

const updateJob = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  try {
    await axios.put(`http://localhost:8000/api/employer/jobs/${jobId}`, form.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    
    // Show success notification
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
      router.push('/employer/job-listing')
    }, 2000)
    
  } catch (error) {
    console.error('Failed to update job', error.response?.data || error.message)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchCategories()
  fetchWorkTypes()
  fetchJob()
})

watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchJob()
  }
})
</script>

<style scoped>
/* Base Styles */
.job-edit-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.edit-card {
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  transform: translateY(0);
  transition: transform 0.4s cubic-bezier(0.1, 0.9, 0.2, 1);
}

.edit-card:hover {
  transform: translateY(-4px);
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #0078d4 0%, #004e8c 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.card-header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.header-content {
  flex: 1;
}

.card-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-subtitle {
  font-size: 1rem;
  opacity: 0.9;
}

.header-icon {
  font-size: 2.5rem;
  opacity: 0.2;
  margin-left: 1.5rem;
  animation: pulse 4s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
}

/* Form Styles */
.job-form {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.75rem;
}

/* Floating Label Inputs */
.form-group {
  position: relative;
}

.floating-label label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #495057;
  font-size: 0.9375rem;
  pointer-events: none;
  transition: all 0.2s ease;
  transform-origin: left center;
}

.floating-label .form-input:focus ~ label,
.floating-label .form-input:not(:placeholder-shown) ~ label {
  transform: translateY(-1.5rem) scale(0.85);
  color: #0078d4;
}

.form-input {
  width: 100%;
  padding: 1.75rem 1rem 0.75rem;
  font-size: 0.9375rem;
  border: none;
  border-radius: 0;
  background-color: transparent;
  border-bottom: 1px solid #dee2e6;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-bottom-color: #0078d4;
}

.input-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #0078d4;
  transition: width 0.4s cubic-bezier(0.1, 0.9, 0.2, 1);
}

.form-input:focus ~ .input-underline {
  width: 100%;
}

/* Textarea */
.textarea {
  min-height: 100px;
  resize: vertical;
  padding-top: 1.75rem;
}

/* Input with Icon */
.input-with-icon {
  position: relative;
}

.currency-icon {
  position: absolute;
  left: 1rem;
  top: 1.75rem;
  color: #6c757d;
  font-weight: 500;
}

.input-with-icon .form-input {
  padding-left: 2rem;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.3, 0, 0, 1);
}

.btn-primary {
  background: #0078d4;
  color: white;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 120, 212, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background: #106ebe;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 120, 212, 0.3);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  border: 1px solid #ced4da;
  color: #495057;
}

.btn-secondary:hover {
  background: #f8f9fa;
  border-color: #adb5bd;
}

/* Loading Spinner */
.button-loading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Success Notification */
.success-notification {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #28a745;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.success-notification i {
  font-size: 1.25rem;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-50%) translateY(20px);
  opacity: 0;
}

/* Error Styles */
.input-error {
  border-bottom-color: #e53e3e !important;
  background-color: #fff5f5 !important;
}

.error-line {
  background: #e53e3e !important;
  width: 100% !important;
}

.error-message-container {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #fff5f5;
  border-radius: 4px;
}

.error-icon {
  width: 1rem;
  height: 1rem;
  color: #e53e3e;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.error-message {
  font-size: 0.8125rem;
  color: #e53e3e;
  line-height: 1.4;
}

/* Animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .job-edit-container {
    padding: 1rem;
  }
  
  .card-header {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }
  
  .header-icon {
    margin: 1rem 0 0;
  }
  
  .job-form {
    padding: 1.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>