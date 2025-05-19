<template>
  <div class="d-flex vh-100">
    <!-- banner on the left -->
    <img src="./login.png" alt="banner" class="img-fluid h-100 w-auto" />

    <!-- form on the right -->
    <div class="container d-flex align-items-center justify-content-center">
      <div class="w-100" style="max-width: 1100px">
        <h1 class="text-center fw-bold mb-4">Just a step to Go</h1>

        <div class="row">
          <!-- Left Column: Profile + Inputs -->
          <div class="col-md-3">
            <!-- Profile Image -->
            <div class="mb-4">
              <div class="d-flex flex-column justify-content-center align-items-center gap-3">
                <img
                  :src="imagePreview"
                  alt="Profile Preview"
                  class="rounded"
                  style="width: 200px; height: 200px; object-fit: cover; margin-right: 15px;"
                />
                <input type="file" accept="image/*" @change="handleImageUpload" class="form-control" />
              </div>
            </div>

            <!-- Phone -->
            <div class="mb-3">
              <label class="form-label fw-bold fs-5 text-muted">Phone Number</label>
              <input
                type="tel"
                class="form-control p-3 rounded-0"
                placeholder="Enter phone number"
                v-model="phone"
                :class="{ 'is-invalid': submitted && !validPhone }"
              />
              <div class="invalid-feedback">Please enter a valid phone number.</div>
            </div>

            <!-- LinkedIn -->
            <div class="mb-3">
              <label class="form-label fw-bold fs-5 text-muted">LinkedIn Profile</label>
              <input
                type="url"
                class="form-control p-3 rounded-0"
                placeholder="Paste your LinkedIn URL"
                v-model="linkedin"
                :class="{ 'is-invalid': submitted && !validLinkedin }"
              />
              <div class="invalid-feedback">Please enter a valid LinkedIn URL.</div>
            </div>

            <!-- Submit -->
            <button class="btn bg-purple rounded-0 text-white fw-bold p-3 fs-5 w-100 mt-4" @click="handleSubmit">
              Submit Profile
            </button>
          </div>

          <!-- Right Column: Resume PDF + Info -->
          <div class="col-md-6">
            <div class="mb-4">
              <iframe
                :src="pdfPreview"
                style="width: 100%; height: 200px; border: 1px solid #ccc;"
              ></iframe>
              <input type="file" accept=".pdf" class="form-control mt-2 mb-3" @change="handlePdfUpload" />
            </div>

            <!-- Location -->
            <div class="mb-3">
              <label class="form-label fw-bold fs-5 text-muted">Location</label>
              <input
                type="text"
                class="form-control p-3 rounded-0"
                placeholder="Enter your location"
                v-model="location"
                :class="{ 'is-invalid': submitted && !location }"
              />
              <div class="invalid-feedback">Location is required.</div>
            </div>

            <!-- Experience Level -->
            <div class="mb-3">
              <label class="form-label fw-bold fs-5 text-muted">Experience Level</label>
              <select
                class="form-select p-3 rounded-0"
                v-model="experience"
                :class="{ 'is-invalid': submitted && !experience }"
              >
                <option disabled value="">Select experience level</option>
                <option>Entry Level</option>
                <option>Mid Level</option>
                <option>Senior Level</option>
              </select>
              <div class="invalid-feedback">Please select your experience level.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRegisterStore } from './../../../stores/registerStore.js'
import { useUserStore } from './../../../stores/userStore.ts'
import { useCandidateStore } from '@/stores/candidateStore.ts'

const router = useRouter()
const registerStore = useRegisterStore()
const userStore = useUserStore()
const candidateStore = useCandidateStore()

// redirect to /register if step1Data is not filled
onMounted(() => {
  const { fullName, email, password } = registerStore.step1Data
  if (!fullName || !email || !password) {
    router.push('/register')
  }
})

// Image and PDF preview
const imagePreview = ref("https://cdn-icons-png.flaticon.com/512/847/847969.png")
const pdfPreview = ref("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf")

// Form fields
const phone = ref("")
const linkedin = ref("")
const location = ref("")
const experience = ref("")
const submitted = ref(false)

// Validations
const validPhone = computed(() => /^\+?\d{10,15}$/.test(phone.value))
const validLinkedin = computed(() => /^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(linkedin.value))

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    imagePreview.value = URL.createObjectURL(file)
  }
}

function handlePdfUpload(event) {
  const file = event.target.files[0]
  if (file && file.type === "application/pdf") {
    pdfPreview.value = URL.createObjectURL(file)
  }
}

async function handleSubmit() {
  submitted.value = true

  if (validPhone.value && validLinkedin.value && location.value.trim() && experience.value) {
    try {
      const timestamp = new Date().toISOString()

      const userData = {
      name: registerStore.step1Data.fullName,
      email: registerStore.step1Data.email,
      password: registerStore.step1Data.password,
      password_confirmation: registerStore.step1Data.password,
      profile_picture: imagePreview.value,
      role: 'candidate',
      created_at: timestamp,
      updated_at: timestamp
    }

    console.log("candidateRegister: handleSubmit: userData", userData); //debug


      const createdUser = await userStore.createUser(userData)
      console.log("candidateRegister: handleSubmit: createdUser", createdUser); //debug

      const candidateData = {
        user_id: createdUser.data.id,
        resume: pdfPreview.value,
        linkedin_profile: linkedin.value,
        phone_number: phone.value,
        experience_level: experience.value,
        location: location.value,
        created_at: timestamp,
        updated_at: timestamp
      }

      console.log('candidateRegister: handleSubmit: candidateData = ', candidateData); //debug

      await candidateStore.createCandidate(candidateData)

      router.push('/login')
    } catch (err) {
      console.error(err)
    }
  } else {
    console.log("Validation failed")
  }
}
</script>

<style scoped>
.bg-purple {
  background-color: #4444dc !important;
}
</style>
