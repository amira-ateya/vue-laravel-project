<template>
  <div class="job-form-container">
    <div class="form-card">
      <div class="form-header">
        <h2 class="form-title">Post a New Job Opportunity</h2>
        <p class="form-subtitle">Fill in the details to attract top talent</p>
      </div>

      <form @submit.prevent="postJob" class="job-form">
        <!-- Job Title -->
        <div class="form-group">
          <label class="input-label">Job Title *</label>
          <input 
            v-model="form.title" 
            type="text" 
            placeholder="e.g. Senior Frontend Developer" 
            class="form-input"
            @input="clearError('title')"
            :class="{ 'input-error': errors.title }"
          />
          <div class="input-focus-line" :class="{ 'error-line': errors.title }"></div>
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
          <div class="form-group">
            <label class="input-label">Work Type *</label>
            <select 
              v-model="form.work_type" 
              class="form-input"
              @change="clearError('work_type')"
              :class="{ 'input-error': errors.work_type }"
            >
              <option disabled value="">Select Work Type</option>
              <option v-for="type in workTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
            <div class="input-focus-line" :class="{ 'error-line': errors.work_type }"></div>
            <transition name="fade">
              <div v-if="errors.work_type" class="error-message-container">
                <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="error-message">{{ errors.work_type }}</span>
              </div>
            </transition>
          </div>

          <div class="form-group">
            <label class="input-label">Location *</label>
            <input 
              v-model="form.location" 
              type="text" 
              placeholder="e.g. Cairo, Egypt or Remote" 
              class="form-input"
              @input="clearError('location')"
              :class="{ 'input-error': errors.location }"
            />
            <div class="input-focus-line" :class="{ 'error-line': errors.location }"></div>
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
          <div class="form-group">
            <label class="input-label">Category *</label>
            <select 
              v-model="form.category_id" 
              class="form-input"
              @change="clearError('category_id')"
              :class="{ 'input-error': errors.category_id }"
            >
              <option disabled value="">Select Category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.category_name }}
              </option>
            </select>
            <div class="input-focus-line" :class="{ 'error-line': errors.category_id }"></div>
            <transition name="fade">
              <div v-if="errors.category_id" class="error-message-container">
                <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="error-message">{{ errors.category_id }}</span>
              </div>
            </transition>
          </div>

          <div class="form-group">
            <label class="input-label">Application Deadline *</label>
            <input 
              v-model="form.deadline" 
              type="date" 
              class="form-input"
              @input="clearError('deadline')"
              :class="{ 'input-error': errors.deadline }"
            />
            <div class="input-focus-line" :class="{ 'error-line': errors.deadline }"></div>
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
          <div class="form-group">
            <label class="input-label">Salary From</label>
            <div class="input-with-icon">
              <span class="currency-icon">$</span>
              <input 
                v-model.number="form.salary_from" 
                type="number" 
                placeholder="Minimum" 
                class="form-input"
                @input="validateSalary('salary_from')"
                :class="{ 'input-error': errors.salary_from }"
                min="0"
              />
            </div>
            <div class="input-focus-line" :class="{ 'error-line': errors.salary_from }"></div>
            <transition name="fade">
              <div v-if="errors.salary_from" class="error-message-container">
                <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="error-message">{{ errors.salary_from }}</span>
              </div>
            </transition>
          </div>

          <div class="form-group">
            <label class="input-label">Salary To</label>
            <div class="input-with-icon">
              <span class="currency-icon">$</span>
              <input 
                v-model.number="form.salary_to" 
                type="number" 
                placeholder="Maximum" 
                class="form-input"
                @input="validateSalary('salary_to')"
                :class="{ 'input-error': errors.salary_to }"
                min="0"
              />
            </div>
            <div class="input-focus-line" :class="{ 'error-line': errors.salary_to }"></div>
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

        <!-- Job Description -->
        <div class="form-group">
          <label class="input-label">Job Description *</label>
          <textarea 
            v-model="form.description" 
            placeholder="Describe the role and requirements..." 
            class="form-input textarea"
            rows="4"
            @input="clearError('description')"
            :class="{ 'input-error': errors.description }"
          ></textarea>
          <div class="input-focus-line" :class="{ 'error-line': errors.description }"></div>
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
        <div class="form-group">
          <label class="input-label">Key Responsibilities *</label>
          <textarea 
            v-model="form.responsibilities" 
            placeholder="List the main responsibilities..." 
            class="form-input textarea"
            rows="3"
            @input="clearError('responsibilities')"
            :class="{ 'input-error': errors.responsibilities }"
          ></textarea>
          <div class="input-focus-line" :class="{ 'error-line': errors.responsibilities }"></div>
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
        <div class="form-group">
          <label class="input-label">Benefits & Perks *</label>
          <textarea 
            v-model="form.benefits" 
            placeholder="What do you offer to candidates?" 
            class="form-input textarea"
            rows="3"
            @input="clearError('benefits')"
            :class="{ 'input-error': errors.benefits }"
          ></textarea>
          <div class="input-focus-line" :class="{ 'error-line': errors.benefits }"></div>
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
          <button type="submit" class="submit-button" :disabled="isSubmitting">
            <span v-if="!isSubmitting">Post Job</span>
            <span v-else class="button-loading">
              <span class="spinner"></span>
              Posting...
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

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

onMounted(() => {
  fetchCategories()
  fetchWorkTypes()
})

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

const postJob = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  try {
    const res = await axios.post('http://localhost:8000/api/employer/jobs', form.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    // Success animation before redirect
    document.querySelector('.submit-button').classList.add('success-animation')
    setTimeout(() => {
      window.location.href = 'http://localhost:5173/employer/job-listing'
    }, 1500)
  } catch (error) {
    console.error('Error posting job', error.response?.data || error.message)
    // Error animation
    document.querySelector('.submit-button').classList.add('error-animation')
    setTimeout(() => {
      document.querySelector('.submit-button').classList.remove('error-animation')
    }, 1000)
  } finally {
    setTimeout(() => {
      isSubmitting.value = false
    }, 2000)
  }
}
</script>

<style scoped>
/* Base Styles */
.job-form-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.form-card {
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.form-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.form-header {
  padding: 2rem 2rem 1rem;
  background: linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%);
  color: white;
  text-align: center;
}

.form-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  animation: fadeInDown 0.6s ease;
}

.form-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  animation: fadeIn 0.8s ease 0.2s both;
}

.job-form {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Form Groups */
.form-group {
  position: relative;
  margin-bottom: 1rem;
}

.input-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #2d3748;
  transition: color 0.2s ease;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.9375rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: #f8fafc;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.form-input:focus {
  outline: none;
  border-color: #4299e1;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.input-focus-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #1a73e8 0%, #0d47a1 100%);
  transition: width 0.3s ease;
}

.form-input:focus ~ .input-focus-line {
  width: 100%;
}

.textarea {
  min-height: 100px;
  resize: vertical;
}

/* Form Rows */
.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* Input with Icon */
.input-with-icon {
  position: relative;
}

.currency-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
  font-weight: 500;
}

.input-with-icon .form-input {
  padding-left: 2rem;
}

/* Submit Button */
.submit-button {
  position: relative;
  padding: 0.875rem 1.75rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background: linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(26, 115, 232, 0.2);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(26, 115, 232, 0.3);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Loading Spinner */
.button-loading {
  display: flex;
  align-items: center;
  justify-content: center;
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

/* Error Styles */
.input-error {
  border-color: #e53e3e;
  background-color: #fff5f5;
}

.input-error:focus {
  border-color: #e53e3e;
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.2);
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
  animation: fadeIn 0.3s ease;
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

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.success-animation {
  animation: pulseSuccess 1.5s ease;
}

.error-animation {
  animation: shake 0.5s ease;
}

@keyframes pulseSuccess {
  0% { background: linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%); }
  50% { background: linear-gradient(135deg, #48bb78 0%, #2f855a 100%); }
  100% { background: linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .job-form-container {
    padding: 1rem;
  }
  
  .form-header {
    padding: 1.5rem 1rem;
  }
  
  .job-form {
    padding: 1.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>