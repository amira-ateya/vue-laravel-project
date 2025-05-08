<template>
    <div class="job-post-form">
      <div class="progress-steps">
        <div 
          v-for="(step, index) in steps" 
          :key="index"
          :class="['step', { 'active': currentStep === index, 'completed': currentStep > index }]"
          @click="goToStep(index)"
        >
          {{ step.label }}
        </div>
      </div>
  
      <form @submit.prevent="handleSubmit">
        <!-- Step 1: Basic Information -->
        <div v-if="currentStep === 0" class="form-step">
          <h2>Basic Information</h2>
          <p>This information will be displayed publicly</p>
          
          <div class="form-group">
            <label for="job-title">Job Title *</label>
            <input 
              id="job-title" 
              v-model="formData.title" 
              type="text" 
              placeholder="e.g. Software Engineer" 
              required
            >
          </div>
  
          <div class="form-group">
            <label>Type of Employment *</label>
            <div class="employment-types">
              <label v-for="type in employmentTypes" :key="type.value" class="checkbox-label">
                <input 
                  type="checkbox" 
                  v-model="formData.work_type" 
                  :value="type.value"
                  required
                >
                {{ type.label }}
              </label>
            </div>
          </div>
  
          <div class="form-group">
            <label>Salary Range</label>
            <div class="salary-range">
              <input 
                v-model="formData.salary_min" 
                type="number" 
                placeholder="Min" 
                class="salary-input"
              >
              <span>to</span>
              <input 
                v-model="formData.salary_max" 
                type="number" 
                placeholder="Max" 
                class="salary-input"
              >
              <select v-model="formData.currency" class="currency-select">
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
              </select>
            </div>
          </div>
  
          <div class="form-group">
            <label>Job Categories</label>
            <select v-model="formData.category" multiple class="categories-select">
              <option value="programming">Programming</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="business">Business</option>
            </select>
          </div>
  
          <div class="form-group">
            <label>Required Skills</label>
            <div class="skills-input">
              <input 
                v-model="skillInput" 
                type="text" 
                placeholder="Add skill and press Enter"
                @keydown.enter.prevent="addSkill"
              >
              <div class="skills-tags">
                <span v-for="(skill, index) in formData.skills" :key="index" class="skill-tag">
                  {{ skill }}
                  <button type="button" @click="removeSkill(index)">&times;</button>
                </span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Step 2: Job Description -->
        <div v-if="currentStep === 1" class="form-step">
          <h2>Job Description</h2>
          
          <div class="form-group">
            <label for="job-description">Description *</label>
            <textarea 
              id="job-description" 
              v-model="formData.description" 
              rows="5"
              placeholder="Describe the job responsibilities and requirements"
              required
            ></textarea>
          </div>
  
          <div class="form-group">
            <label for="job-responsibilities">Responsibilities</label>
            <textarea 
              id="job-responsibilities" 
              v-model="formData.responsibilities" 
              rows="5"
              placeholder="List the main responsibilities"
            ></textarea>
          </div>
  
          <div class="form-group">
            <label>Work Location *</label>
            <div class="location-options">
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="formData.location_type" 
                  value="remote"
                  required
                >
                Remote
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="formData.location_type" 
                  value="onsite"
                >
                On-site
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="formData.location_type" 
                  value="hybrid"
                >
                Hybrid
              </label>
            </div>
          </div>
  
          <div class="form-group" v-if="formData.location_type !== 'remote'">
            <label for="job-location">Location Details *</label>
            <input 
              id="job-location" 
              v-model="formData.location" 
              type="text" 
              placeholder="e.g. New York, USA"
              :required="formData.location_type !== 'remote'"
            >
          </div>
  
          <div class="form-group">
            <label>Technologies</label>
            <input 
              v-model="formData.technologies" 
              type="text" 
              placeholder="List technologies used (comma separated)"
            >
          </div>
        </div>
  
        <!-- Step 3: Perks and Benefits -->
        <div v-if="currentStep === 2" class="form-step">
          <h2>Perks and Benefits</h2>
          <p>Encourage more people to apply by sharing the benefits you offer.</p>
          
          <div class="benefits-list">
            <div v-for="(benefit, index) in commonBenefits" :key="index" class="benefit-item">
              <label class="checkbox-label">
                <input type="checkbox" v-model="formData.benefits" :value="benefit.value">
                <div class="benefit-content">
                  <h4>{{ benefit.title }}</h4>
                  <p>{{ benefit.description }}</p>
                </div>
              </label>
            </div>
          </div>
  
          <div class="form-group">
            <label>Additional Benefits</label>
            <textarea 
              v-model="formData.additional_benefits" 
              rows="3"
              placeholder="Add any other benefits not listed above"
            ></textarea>
          </div>
  
          <div class="form-group">
            <label for="job-deadline">Application Deadline</label>
            <input id="job-deadline" v-model="formData.deadline" type="date">
          </div>
        </div>
  
        <!-- Navigation Buttons -->
        <div class="form-navigation">
          <button 
            v-if="currentStep > 0" 
            type="button" 
            class="btn-secondary" 
            @click="prevStep"
            :disabled="isSubmitting"
          >
            Back
          </button>
          
          <button 
            v-if="currentStep < steps.length - 1" 
            type="button" 
            class="btn-primary" 
            @click="nextStep"
            :disabled="isSubmitting"
          >
            Next
          </button>
          
          <button 
            v-if="currentStep === steps.length - 1" 
            type="submit" 
            class="btn-primary"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">Processing...</span>
            <span v-else>{{ isEditing ? 'Update Job' : 'Post Job' }}</span>
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue'
  
  const props = defineProps({
    jobData: {
      type: Object,
      default: null
    }
  })
  
  const emit = defineEmits(['submit'])
  
  const steps = [
    { label: 'Basic Information' },
    { label: 'Job Description' },
    { label: 'Perks & Benefits' }
  ]
  
  const currentStep = ref(0)
  const skillInput = ref('')
  const isSubmitting = ref(false)
  const isEditing = ref(false)
  
  const employmentTypes = [
    { value: 'full-time', label: 'Full-Time' },
    { value: 'part-time', label: 'Part-Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'temporary', label: 'Temporary' }
  ]
  
  const commonBenefits = [
    { 
      value: 'healthcare', 
      title: 'Health Insurance', 
      description: 'Comprehensive medical, dental, and vision coverage' 
    },
    { 
      value: 'remote', 
      title: 'Remote Work', 
      description: 'Option to work from anywhere' 
    },
    { 
      value: 'flexible', 
      title: 'Flexible Hours', 
      description: 'Adapt your work schedule to your lifestyle' 
    },
    { 
      value: 'learning', 
      title: 'Learning Budget', 
      description: 'Annual stipend for professional development' 
    }
  ]
  
  const formData = reactive({
    title: '',
    work_type: [],
    salary_min: '',
    salary_max: '',
    currency: 'USD',
    category: [],
    skills: [],
    description: '',
    responsibilities: '',
    location_type: 'remote',
    location: '',
    technologies: '',
    benefits: [],
    additional_benefits: '',
    deadline: ''
  })
  
  // Initialize form if editing
  onMounted(() => {
    if (props.jobData) {
      isEditing.value = true
      Object.assign(formData, props.jobData)
      
      // Convert string fields to arrays if needed
      if (typeof formData.skills === 'string') {
        formData.skills = formData.skills.split(',').map(s => s.trim()).filter(Boolean)
      }
      if (typeof formData.benefits === 'string') {
        formData.benefits = formData.benefits.split(',').map(b => b.trim()).filter(Boolean)
      }
      if (typeof formData.work_type === 'string') {
        formData.work_type = formData.work_type.split(',').map(w => w.trim()).filter(Boolean)
      }
      if (typeof formData.category === 'string') {
        formData.category = formData.category.split(',').map(c => c.trim()).filter(Boolean)
      }
    }
  })
  
  const addSkill = () => {
    const skill = skillInput.value.trim()
    if (skill && !formData.skills.includes(skill)) {
      formData.skills.push(skill)
      skillInput.value = ''
    }
  }
  
  const removeSkill = (index) => {
    formData.skills.splice(index, 1)
  }
  
  const nextStep = () => {
    if (validateStep(currentStep.value)) {
      currentStep.value++
    }
  }
  
  const prevStep = () => {
    currentStep.value--
  }
  
  const goToStep = (index) => {
    if (index < currentStep.value || validateStep(currentStep.value)) {
      currentStep.value = index
    }
  }
  
  const validateStep = (step) => {
    switch (step) {
      case 0:
        if (!formData.title.trim()) {
          alert('Please enter a job title')
          return false
        }
        if (formData.work_type.length === 0) {
          alert('Please select at least one employment type')
          return false
        }
        return true
      case 1:
        if (!formData.description.trim()) {
          alert('Please enter a job description')
          return false
        }
        if (!formData.location_type) {
          alert('Please select a work location type')
          return false
        }
        if (formData.location_type !== 'remote' && !formData.location.trim()) {
          alert('Please enter location details')
          return false
        }
        return true
      default:
        return true
    }
  }
  
  const handleSubmit = () => {
    if (!validateStep(currentStep.value)) return
    
    isSubmitting.value = true
    
    const submissionData = {
      ...formData,
      skills: formData.skills.join(','),
      benefits: formData.benefits.join(','),
      work_type: formData.work_type.join(','),
      category: formData.category.join(','),
      salary_range: formData.salary_min && formData.salary_max 
        ? `${formData.salary_min}-${formData.salary_max}`
        : null
    }
  
    emit('submit', submissionData)
    isSubmitting.value = false
  }
  </script>
  
  <style scoped>
  .job-post-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .progress-steps {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    position: relative;
  }
  
  .progress-steps::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: #e0e0e0;
    z-index: 1;
  }
  
  .step {
    position: relative;
    z-index: 2;
    background: #fff;
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid #e0e0e0;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .step.active {
    border-color: #4CAF50;
    background: #4CAF50;
    color: white;
  }
  
  .step.completed {
    border-color: #4CAF50;
    color: #4CAF50;
  }
  
  .form-step {
    margin-bottom: 30px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
  }
  
  label[required]::after {
    content: ' *';
    color: #f44336;
  }
  
  input[type="text"],
  input[type="number"],
  input[type="date"],
  textarea,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .salary-range {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .salary-input {
    flex: 1;
  }
  
  .currency-select {
    width: 100px;
  }
  
  .categories-select {
    height: auto;
    min-height: 100px;
  }
  
  .employment-types,
  .location-options {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin: 10px 0;
  }
  
  .checkbox-label,
  .radio-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background 0.2s;
  }
  
  .radio-label:hover,
  .checkbox-label:hover {
    background: #f5f5f5;
  }
  
  .skills-input {
    margin-top: 10px;
  }
  
  .skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  }
  
  .skill-tag {
    background: #e0e0e0;
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  
  .skill-tag button {
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    padding: 0 4px;
  }
  
  .benefits-list {
    margin-bottom: 20px;
  }
  
  .benefit-item {
    margin-bottom: 15px;
    padding: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    transition: all 0.2s;
  }
  
  .benefit-item:hover {
    border-color: #4CAF50;
  }
  
  .benefit-content h4 {
    margin: 0 0 5px 0;
    color: #333;
  }
  
  .benefit-content p {
    margin: 0;
    color: #666;
    font-size: 0.9em;
  }
  
  .form-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  
  .btn-primary {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.2s;
  }
  
  .btn-primary:hover:not(:disabled) {
    background: #3d8b40;
  }
  
  .btn-primary:disabled {
    background: #a5d6a7;
    cursor: not-allowed;
  }
  
  .btn-secondary {
    background: #fff;
    color: #4CAF50;
    border: 1px solid #4CAF50;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.2s;
  }
  
  .btn-secondary:hover:not(:disabled) {
    background: #f5f5f5;
  }
  
  .btn-secondary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  small {
    display: block;
    margin-top: 5px;
    color: #666;
    font-size: 0.9em;
  }
  </style>