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
            required
          />
          <div class="input-focus-line"></div>
        </div>

        <!-- Work Type & Location -->
        <div class="form-row">
          <div class="form-group">
            <label class="input-label">Work Type *</label>
            <select v-model="form.work_type" class="form-input" required>
              <option disabled value="">Select Work Type</option>
              <option v-for="type in workTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
            <div class="input-focus-line"></div>
          </div>

          <div class="form-group">
            <label class="input-label">Location</label>
            <input 
              v-model="form.location" 
              type="text" 
              placeholder="e.g. Cairo, Egypt or Remote" 
              class="form-input"
            />
            <div class="input-focus-line"></div>
          </div>
        </div>

        <!-- Category & Deadline -->
        <div class="form-row">
          <div class="form-group">
            <label class="input-label">Category *</label>
            <select v-model="form.category_id" class="form-input" required>
              <option disabled value="">Select Category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.category_name }}
              </option>
            </select>
            <div class="input-focus-line"></div>
          </div>

          <div class="form-group">
            <label class="input-label">Application Deadline *</label>
            <input 
              v-model="form.deadline" 
              type="date" 
              class="form-input"
              required
            />
            <div class="input-focus-line"></div>
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
              />
            </div>
            <div class="input-focus-line"></div>
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
              />
            </div>
            <div class="input-focus-line"></div>
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
            required
          ></textarea>
          <div class="input-focus-line"></div>
        </div>

        <!-- Responsibilities -->
        <div class="form-group">
          <label class="input-label">Key Responsibilities</label>
          <textarea 
            v-model="form.responsibilities" 
            placeholder="List the main responsibilities..." 
            class="form-input textarea"
            rows="3"
          ></textarea>
          <div class="input-focus-line"></div>
        </div>

        <!-- Benefits -->
        <div class="form-group">
          <label class="input-label">Benefits & Perks</label>
          <textarea 
            v-model="form.benefits" 
            placeholder="What do you offer to candidates?" 
            class="form-input textarea"
            rows="3"
          ></textarea>
          <div class="input-focus-line"></div>
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

const postJob = async () => {
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
  margin-bottom: 0.5rem;
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

/* Animations */
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