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
          {{ isJobSeeker ? 'Get More Opportunities' : 'Get Qualified Candidates' }}
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
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control p-3 rounded-0"
            placeholder="Enter Email"
            id="email"
            v-model="formData.email"
            :class="{
              'is-invalid':
                (submitted && !formData.email) ||
                (submitted && !isValidEmail(formData.email)) ||
                (submitted && emailTaken)
            }"
            required
          />

          <!-- Validation: empty -->
          <div v-if="submitted && !formData.email" class="invalid-feedback">
            Email is required.
          </div>

          <!-- Validation: invalid format -->
          <div v-else-if="submitted && !isValidEmail(formData.email)" class="invalid-feedback">
            Please enter a valid email address.
          </div>

          <!-- Validation: email already taken -->
          <div v-else-if="submitted && emailTaken" class="invalid-feedback">
            This email is already taken for this type of user.
        </div>
</div>


        <!-- INPUT: PASSWORD -->
<!-- INPUT: PASSWORD -->
        <div class="mb-3">
          <label class="form-label fw-bold fs-5 text-muted">Password</label>
          <input
            v-model="formData.password"
            type="password"
            class="form-control p-3 rounded-0"
            :class="{ 'is-invalid': submitted && (!formData.password || formData.password.length < 6) }"
            placeholder="Enter password"
          />
          <div v-if="submitted && !formData.password" class="invalid-feedback">
            Password is required.
          </div>
          <div v-else-if="submitted && formData.password.length < 6" class="invalid-feedback">
            Password must be at least 6 characters.
          </div>
        </div>


        <!-- INPUT: CONFIRM PASSWORD -->
        <div class="mb-3">
          <label class="form-label fw-bold fs-5 text-muted">Confirm Password</label>
          <input
            v-model="formData.password_confirmation"
            type="password"
            class="form-control p-3 rounded-0"
            :class="{ 'is-invalid': submitted && formData.password_confirmation !== formData.password }"
            placeholder="Enter password again"
          />
          <div v-if="submitted && formData.password_confirmation !== formData.password" class="invalid-feedback">
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
import { useUserStore } from '@/stores/userStore'
import { reactive, ref } from 'vue'

// VARIABLES
const router = useRouter()
const registerStore = useRegisterStore()
const userStore = useUserStore()
const submitted = ref(false)
const isJobSeeker = ref(true)
const emailTaken = ref(false)

const formData = reactive({
  fullName: '',
  email: '',
  password: '',
  password_confirmation: '',
})

// VALIDATOR
function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email)
}

// EMAIL UNIQUENESS CHECK
async function checkEmailUnique(email, role) {
  await userStore.fetchByRole(role)
  const existingUser = userStore.users.find(user => user.email.toLowerCase() === email.toLowerCase())
  return !existingUser
}

// SUBMIT HANDLER
async function sendData() {
  submitted.value = true
  emailTaken.value = false

  const userType = isJobSeeker.value ? 'candidate' : 'employer'

  // Basic validation
  if (
  !formData.fullName ||
  !isValidEmail(formData.email) ||
  !formData.password ||
  formData.password.length < 6 ||
  formData.password.trim() !== formData.password_confirmation.trim()
) {
  return
}


  // Check email uniqueness
  const isUnique = await checkEmailUnique(formData.email, userType)
  if (!isUnique) {
    emailTaken.value = true
    return
  }

  // SAVE DATA IN REGISTER STORE
  registerStore.setStep1Data({
    fullName: formData.fullName,
    email: formData.email,
    password: formData.password,
    role: userType,
  })

  // REDIRECT TO NEXT STEP
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
