<template>
  <div class="d-flex vh-100">
    <!-- LEFT: BANNER IMAGE -->
    <img src="./login.png" alt="banner" class="img-fluid h-100 w-auto" />

    <!-- RIGHT: FORM -->
    <div class="container d-flex align-items-center justify-content-center">
      <div class="w-100" style="max-width: 500px">
        <!-- TWO BUTTONS: [JOBSEEKER :: COMPANY] -->
        <div class="d-flex justify-content-center mb-3">
          <button
            class="btn rounded-0 fs-5 fw-semibold"
            :class="isJobSeeker ? 'bg-text-purple' : 'text-purple'"
            @click="isJobSeeker = true"
          >
            Job Seeker
          </button>
          <button
            class="btn rounded-0 fs-5 fw-semibold"
            :class="!isJobSeeker ? 'bg-text-purple' : 'text-purple'"
            @click="isJobSeeker = false"
          >
            Company
          </button>
        </div>

        <!-- HEAD TEXT -->
        <h1 class="text-center fw-bold mb-4">
          {{ isJobSeeker ? 'Get More Opportunities' : 'Get High Quality Candidates' }}
        </h1>

        <!-- GOOGLE REGISTER BUTTON -->
        <button class="btn border-text-purple p-3 fw-bold rounded-0 w-100 mb-3 d-flex align-items-center justify-content-center">
          <img src="https://www.svgrepo.com/show/355037/google.svg" width="20" class="me-2" />
          Sign up with Google
        </button>

        <!-- LINE DIVIDE -->
        <div class="d-flex align-items-center text-muted mb-3">
          <hr class="flex-grow-1" />
          <span class="mx-2">Or sign up with us</span>
          <hr class="flex-grow-1" />
        </div>

        <!-- INPUT: NAME -->
        <div class="mb-3">
          <label class="form-label fw-bold fs-5 text-muted">Full Name</label>
          <input
            v-model="formData.fullName"
            type="text"
            class="form-control p-3 rounded-0"
            :class="{ 'is-invalid': submitted && !formData.fullName }"
            placeholder="Enter full name"
          />
          <div v-if="submitted && !formData.fullName" class="invalid-feedback">
            Full name is required.
          </div>
        </div>

        <!-- INPUT: EMAIL -->
        <div class="mb-3">
          <label class="form-label fw-bold fs-5 text-muted">Email Address</label>
          <input
            v-model="formData.email"
            type="email"
            class="form-control p-3 rounded-0"
            :class="{ 'is-invalid': submitted && !isValidEmail(formData.email) }"
            placeholder="Enter email address"
          />
          <div v-if="submitted && !isValidEmail(formData.email)" class="invalid-feedback">
            Valid email is required.
          </div>
        </div>

        <!-- INPUT: PASSWORD -->
        <div class="mb-3">
          <label class="form-label fw-bold fs-5 text-muted">Password</label>
          <input
            v-model="formData.password"
            type="password"
            class="form-control p-3 rounded-0"
            :class="{ 'is-invalid': submitted && !formData.password }"
            placeholder="Enter password"
          />
          <div v-if="submitted && !formData.password" class="invalid-feedback">
            Password is required.
          </div>
        </div>

        <!-- INPUT: CONFIRM PASSWORD -->
        <div class="mb-3">
          <label class="form-label fw-bold fs-5 text-muted">Confirm Password</label>
          <input
            v-model="formData.confirmPassword"
            type="password"
            class="form-control p-3 rounded-0"
            :class="{ 'is-invalid': submitted && formData.confirmPassword !== formData.password }"
            placeholder="Enter password again"
          />
          <div v-if="submitted && formData.confirmPassword !== formData.password" class="invalid-feedback">
            Passwords must match.
          </div>
        </div>

        <!-- CHECKBOX -->
        <div class="form-check mb-3">
          <input type="checkbox" class="form-check-input" id="rememberMe" />
          <label class="form-check-label" for="rememberMe">Remember me</label>
        </div>

        <!-- SUBMIT BUTTON -->
        <button @click="sendData" class="btn bg-purple rounded-0 text-white fw-bold p-3 fs-5 w-100 mb-3">
          Continue
        </button>

        <!-- ALREADY REGISTERED -->
        <p class="text-muted">
          Already have an account?
          <a href="/login" class="text-primary text-decoration-none">login</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// IMPORTS
import { useRouter } from 'vue-router'
import { useRegisterStore } from '@/stores/registerStore'
import { reactive, ref } from 'vue'

// VARIABLES
const router = useRouter()
const store = useRegisterStore()
const submitted = ref(false)
const isJobSeeker = ref(true)

const formData = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// VALIDATOR
function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email)
}

// SUBMIT HANDLER
function sendData() {
  submitted.value = true

  if (
    !formData.fullName ||
    !isValidEmail(formData.email) ||
    !formData.password ||
    formData.password !== formData.confirmPassword
  ) {
    return
  }

  const userType = isJobSeeker.value ? 'candidate' : 'employer'

  // SAVE DATA IN STORE
  store.setStep1Data({
    fullName: formData.fullName,
    email: formData.email,
    password: formData.password,
    role: userType,
  })


  console.log("store.setStep1Data = ", store.step1Data.fullName);

  // REDIRECT TO SPECIFIC REGISTRATION PAGE
  router.push(userType === 'candidate' ? '/candidateRegister' : '/employerRegister')
}
</script>

<style scoped>
.text-purple { color: #4444dc !important; }
.bg-purple { background-color: #4444dc !important; }
.border-text-purple { border-color: #4444dc !important; color: #4444dc !important; }
.bg-text-purple { background-color: #e9ebfd; color: #4444dc; }
.invalid-feedback { display: block; }
</style>
