<template>
  <div class="container-fluid p-4">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-header bg-white border-bottom-0 pt-4">
            <h3 class="card-title mb-3">{{ isEditing ? 'Edit Job' : 'Post a Job' }}</h3>
            
            <div v-if="submitError" class="alert alert-danger alert-dismissible fade show mb-0">
              {{ submitError }}
              <button type="button" class="btn-close" @click="submitError = null"></button>
            </div>

            <ul class="nav nav-tabs nav-justified mt-4">
              <li class="nav-item">
                <button 
                  class="nav-link" 
                  :class="{ 'active': currentStep === 1 }"
                  @click="setStep(1)"
                >
                  <i class="fas fa-info-circle me-2"></i> Job Information
                </button>
              </li>
              <li class="nav-item">
                <button 
                  class="nav-link" 
                  :class="{ 'active': currentStep === 2 }"
                  @click="setStep(2)"
                  :disabled="!step1Valid"
                >
                  <i class="fas fa-file-alt me-2"></i> Description
                </button>
              </li>
              <li class="nav-item">
                <button 
                  class="nav-link" 
                  :class="{ 'active': currentStep === 3 }"
                  @click="setStep(3)"
                  :disabled="!step2Valid"
                >
                  <i class="fas fa-gift me-2"></i> Perks & Benefits
                </button>
              </li>
            </ul>
          </div>

          <div class="card-body py-4">
            <!-- Step 1: Job Information -->
            <div v-if="currentStep === 1" class="animate-fade">
              <div class="mb-3">
                <label class="form-label">Job Title*</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="job.title" 
                  :class="{ 'is-invalid': submitted && errors.title }"
                  placeholder="e.g. Senior Web Developer"
                  @input="validateStep1"
                >
                <div v-if="submitted && errors.title" class="invalid-feedback">Please provide a job title</div>
              </div>
              
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Work Type*</label>
                  <select class="form-select" v-model="job.work_type" @change="validateStep1">
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Location*</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="job.location" 
                    :class="{ 'is-invalid': submitted && errors.location }"
                    placeholder="e.g. New York, NY"
                    @input="validateStep1"
                  >
                  <div v-if="submitted && errors.location" class="invalid-feedback">Please provide a location</div>
                </div>
              </div>

              <div class="row g-3 mt-2">
                <div class="col-md-6">
                  <label class="form-label">Category*</label>

                  <!-- [SENU]: MAKE THE CATEGORIES FETCHED FROM CATEGORY TABLE -->

                  <select class="form-select" v-model="job.category" @change="validateStep1" :class="{ 'is-invalid': submitted && errors.category }">

                    <option value="" disabled selected>Select...</option>
                    <option 
                      v-for="cat in catStore.categories" 
                      :key="cat.id"  
                      :value="cat.id"
                    >
                      {{ cat.category_name }}
                    </option>
                    
                  </select>
                  <!--[SEMU] ERROR MESSAGE [IN CASE] -->
                  <div v-if="submitted && errors.category" class="invalid-feedback">Please select a category</div>
                </div>
                <!-- [SENU] END OF MY ALTER -->

                <div class="col-md-6">
                  <label class="form-label">Deadline*</label>
                  <input 
                    type="date" 
                    class="form-control" 
                    v-model="job.deadline" 
                    :class="{ 'is-invalid': submitted && errors.deadline }"
                    @change="validateStep1"
                  >
                  <div v-if="submitted && errors.deadline" class="invalid-feedback">Please select a deadline</div>
                </div>
              </div>

              <div class="mt-3">
                <label class="form-label">Salary Range*</label>
                <div class="row g-2">
                  <div class="col-md-6">
                    <input 
                      type="number" 
                      class="form-control" 
                      v-model="job.salary_from" 
                      :class="{ 'is-invalid': submitted && errors.salary_from }"
                      placeholder="From"
                      @input="validateStep1"
                    >
                    <div v-if="submitted && errors.salary_from" class="invalid-feedback">Please provide minimum salary</div>
                  </div>
                  <div class="col-md-6">
                    <input 
                      type="number" 
                      class="form-control" 
                      v-model="job.salary_to" 
                      :class="{ 'is-invalid': submitted && errors.salary_to }"
                      placeholder="To"
                      @input="validateStep1"
                    >
                    <div v-if="submitted && errors.salary_to" class="invalid-feedback">Please provide maximum salary</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 2: Job Description -->
            <div v-if="currentStep === 2" class="animate-fade">
              <div class="mb-3">
                <label class="form-label">Description*</label>
                <textarea 
                  class="form-control" 
                  v-model="job.description" 
                  rows="5"
                  :class="{ 'is-invalid': submitted && errors.description }"
                  placeholder="Describe the job responsibilities and requirements"
                  @input="validateStep2"
                ></textarea>
                <div v-if="submitted && errors.description" class="invalid-feedback">Please provide a description</div>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Responsibilities*</label>
                <div v-for="(item, index) in job.responsibilities" :key="index" class="mb-2 d-flex">
                  <input 
                    type="text" 
                    class="form-control me-2" 
                    v-model="job.responsibilities[index]"
                    :class="{ 'is-invalid': submitted && errors.responsibilities && job.responsibilities[index].trim() === '' }"
                    placeholder="Add responsibility"
                    @input="validateStep2"
                  >
                  <button 
                    @click="removeResponsibility(index)" 
                    class="btn btn-outline-danger"
                    type="button"
                    :disabled="job.responsibilities.length <= 1"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <button @click="addResponsibility" class="btn btn-outline-primary mt-2" type="button">
                  <i class="fas fa-plus me-2"></i> Add Responsibility
                </button>
                <div v-if="submitted && errors.responsibilities" class="text-danger small mt-1">At least one responsibility is required</div>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Required Skills*</label>
                <div v-for="(item, index) in job.skills" :key="index" class="mb-2 d-flex">
                  <input 
                    type="text" 
                    class="form-control me-2" 
                    v-model="job.skills[index]"
                    :class="{ 'is-invalid': submitted && errors.skills && job.skills[index].trim() === '' }"
                    placeholder="Add required skill"
                    @input="validateStep2"
                  >
                  <button 
                    @click="removeSkill(index)" 
                    class="btn btn-outline-danger"
                    type="button"
                    :disabled="job.skills.length <= 1"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <button @click="addSkill" class="btn btn-outline-primary mt-2" type="button">
                  <i class="fas fa-plus me-2"></i> Add Skill
                </button>
                <div v-if="submitted && errors.skills" class="text-danger small mt-1">At least one skill is required</div>
              </div>
            </div>

            <!-- Step 3: Perks & Benefits -->
            <div v-if="currentStep === 3" class="animate-fade">
              <div class="mb-4">
                <h5 class="mb-3">Perks & Benefits</h5>
                <p class="text-muted">Highlight what makes your company great</p>
              </div>
              
              <div v-if="job.benefits.length > 0" class="mb-4">
                <div v-for="(benefit, index) in job.benefits" :key="index" class="card mb-3">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 class="mb-1">{{ benefit.title }}</h6>
                        <p class="text-muted mb-0">{{ benefit.description }}</p>
                      </div>
                      <button 
                        @click="removeBenefit(index)" 
                        class="btn btn-sm btn-outline-danger"
                        type="button"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="card">
                <div class="card-body">
                  <div class="mb-3">
                    <label class="form-label">Benefit Title</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="newBenefit.title"
                      placeholder="e.g. Health Insurance"
                    >
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea 
                      class="form-control" 
                      v-model="newBenefit.description"
                      rows="3"
                      placeholder="Describe this benefit"
                    ></textarea>
                  </div>
                  <button 
                    @click="addBenefit" 
                    class="btn btn-primary"
                    type="button"
                    :disabled="!newBenefit.title || !newBenefit.description"
                  >
                    <i class="fas fa-plus me-2"></i> Add Benefit
                  </button>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-between mt-4 pt-3 border-top">
              <button 
                @click="previousStep" 
                class="btn btn-outline-secondary"
                type="button"
                v-if="currentStep > 1"
              >
                <i class="fas fa-arrow-left me-2"></i> Back
              </button>
              <div v-else></div>
              
              <button 
                @click="nextStep" 
                class="btn btn-primary"
                type="button"
                v-if="currentStep < 3"
                :disabled="currentStep === 1 ? !step1Valid : !step2Valid"
              >
                Next <i class="fas fa-arrow-right ms-2"></i>
              </button>
              
              <button 
                @click="submitJob" 
                class="btn btn-success"
                type="button"
                v-if="currentStep === 3"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">
                  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                  Processing...
                </span>
                <span v-else>
                  <i class="fas fa-check me-2"></i>
                  {{ isEditing ? 'Update Job' : 'Post Job' }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup>
// imports
import { ref, onMounted, computed } from 'vue'
import { useJobStore } from '@/stores/jobStore'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/categoryStore'

// properties to take
const props = defineProps({
  jobData: {
    type: Object,
    default: null
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

// VARS
const jobStore = useJobStore()
const catStore = useCategoryStore(); //[SENU] added
const router = useRouter()
const currentStep = ref(1)
const isSubmitting = ref(false)
const submitError = ref(null)
const submitted = ref(false)

// default values for jobs inputs
const job = ref({
  title: '',
  work_type: 'remote',
  location: '',
  category: '',
  salary_from: null,
  salary_to: null,
  deadline: '',
  description: '',
  responsibilities: [''],
  skills: [''],
  benefits: []
})

const newBenefit = ref({
  title: '',
  description: ''
})

const errors = ref({
  title: false,
  location: false,
  deadline: false,
  salary_from: false,
  salary_to: false,
  category: false, // [SENU] Added category error
  description: false,
  responsibilities: false,
  skills: false
})

// INITIALIZE FORM
onMounted(async () => {
  // Fetch categories
  await catStore.fetchCategories();

  if (props.isEditing && props.jobData) {
    job.value = {
      ...props.jobData,
      category: props.jobData.category || '', // [SENU]: if category is undefined
      responsibilities: props.jobData.responsibilities && props.jobData.responsibilities.length 
        ? [...props.jobData.responsibilities] 
        : [''],
      skills: props.jobData.skills && props.jobData.skills.length 
        ? [...props.jobData.skills] 
        : [''],
      benefits: props.jobData.benefits && props.jobData.benefits.length 
        ? [...props.jobData.benefits] 
        : []
    }
  }
})


//////////////VALIDATION//////////////////////////////////////////////
// VALIDATION [1]
const step1Valid = computed(() => {
  return (
    job.value.title.trim() &&
    job.value.location.trim() &&
    job.value.deadline &&
    job.value.salary_from !== null &&
    job.value.salary_to !== null &&
    job.value.category // [SENU] ensure category selection
  )
})


// VALIDATION [2]
const step2Valid = computed(() => {
  const hasValidResponsibilities = job.value.responsibilities.some(r => r.trim())
  const hasValidSkills = job.value.skills.some(s => s.trim())
  
  return (
    job.value.description.trim() &&
    hasValidResponsibilities &&
    hasValidSkills
  )
})


const setStep = (step) => {
  if (step === 2 && !step1Valid.value) {
    submitted.value = true
    validateStep1()
    submitError.value = 'Please complete all required fields in Job Information'
    return
  }
  if (step === 3 && !step2Valid.value) {
    submitted.value = true
    validateStep2()
    submitError.value = 'Please complete all required fields in Description'
    return
  }
  currentStep.value = step
  submitError.value = null
}

const validateStep1 = () => {
  errors.value = {
    ...errors.value,
    title: !job.value.title.trim(),
    location: !job.value.location.trim(),
    deadline: !job.value.deadline,
    salary_from: job.value.salary_from === null,
    salary_to: job.value.salary_to === null,
    category: !job.value.category // [SENU] check empty category 
  }
}

const validateStep2 = () => {
  const hasValidResponsibilities = job.value.responsibilities.some(r => r.trim())
  const hasValidSkills = job.value.skills.some(s => s.trim())
  
  errors.value = {
    ...errors.value,
    description: !job.value.description.trim(),
    responsibilities: !hasValidResponsibilities,
    skills: !hasValidSkills
  }
}
//////////////////////////////////////////////////////////////////////

const nextStep = () => {
  submitted.value = true
  
  if (currentStep.value === 1) {

    validateStep1()
    if (!step1Valid.value) {
      submitError.value = 'Please complete all required fields in Job Information'
      return
    }

  } else if (currentStep.value === 2) {

    validateStep2()
    if (!step2Valid.value) {
      submitError.value = 'Please complete all required fields in Description'
      return
    }

  }
  
  currentStep.value++
  submitError.value = null
}

const previousStep = () => {
  currentStep.value--
}

const addResponsibility = () => {
  job.value.responsibilities.push('')
}

const removeResponsibility = (index) => {
  if (job.value.responsibilities.length > 1) {
    job.value.responsibilities.splice(index, 1)
    validateStep2()
  }
}

const addSkill = () => {
  job.value.skills.push('')
}

const removeSkill = (index) => {
  if (job.value.skills.length > 1) {
    job.value.skills.splice(index, 1)
    validateStep2()
  }
}

const addBenefit = () => {
  if (newBenefit.value.title && newBenefit.value.description) {
    job.value.benefits.push({ ...newBenefit.value })
    newBenefit.value = { title: '', description: '' }
  }
}

const removeBenefit = (index) => {
  job.value.benefits.splice(index, 1)
}

const submitJob = async () => {
  submitted.value = true
  validateStep1()
  validateStep2()
  
  if (!step1Valid.value || !step2Valid.value) {
    submitError.value = 'Please complete all required fields'
    return
  }

  isSubmitting.value = true
  submitError.value = null

  try {
    // Clean up empty fields
    job.value.responsibilities = job.value.responsibilities.filter(r => r.trim())
    job.value.skills = job.value.skills.filter(s => s.trim())

    if (props.isEditing) {
      await jobStore.updateJob(job.value.id, job.value)
    } else {
      await jobStore.createJob(job.value)
    }
    router.push('/employer/job-listing')
  } catch (err) {
    submitError.value = jobStore.error || 'Failed to submit job. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>










<!--============================================================-->
<style scoped>
.nav-tabs {
  border-bottom: 2px solid #dee2e6;
}

.nav-tabs .nav-link {
  border: none;
  color: #6c757d;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: 0;
}

.nav-tabs .nav-link.active {
  color: #0d6efd;
  background-color: transparent;
  border-bottom: 2px solid #0d6efd;
}

.nav-tabs .nav-link:hover:not(.active) {
  border-bottom: 2px solid #dee2e6;
}

.nav-tabs .nav-link:disabled {
  color: #adb5bd;
  cursor: not-allowed;
}

.card {
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.form-control, .form-select {
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
}

.animate-fade {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.btn {
  border-radius: 0.375rem;
  padding: 0.5rem 1.25rem;
}

.invalid-feedback {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #dc3545;
}

.is-invalid {
  border-color: #dc3545;
}

.alert {
  border-radius: 0.5rem;
}
</style>