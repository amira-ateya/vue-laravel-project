<template>
  <div class="d-flex vh-100">
    <!-- Left image (banner) -->
    <img src="./login.png" alt="Login banner" class="img-fluid h-100 w-auto" />

    <!-- Form Section -->
    <div class="container d-flex align-items-center justify-content-center">
      <div class="w-100" style="max-width: 700px;">
        <h1 class="text-center fw-bold mb-4">Just a Step to Go</h1>

        <!-- Profile and Logo Upload -->
        <div class="d-flex justify-content-between mb-4">
          <!-- Profile Image -->
          <div class="me-2 w-50">
            <img
              :src="profileImageUrl || defaultProfileImage"
              alt="Profile preview"
              class="img-fluid rounded border mb-2"
              style="height: 150px; object-fit: cover;"
            />
            <input type="file" class="form-control" @change="handleProfileImageUpload" />
          </div>

          <!-- Company Logo -->
          <div class="ms-2 w-50">
            <img
              :src="companyLogoUrl || defaultCompanyLogo"
              alt="Company logo preview"
              class="img-fluid rounded border mb-2"
              style="height: 150px; object-fit: cover;"
            />
            <input type="file" class="form-control" @change="handleLogoUpload" />
          </div>
        </div>

        <!-- Company Info Fields -->
        <div class="mb-3">
          <label class="form-label">Company Name</label>
          <input
            type="text"
            class="form-control"
            v-model="companyName"
            :class="{ 'is-invalid': submitted && (!companyName || serverErrors.company_name) }"
            placeholder="Enter your company name"
          />
          <div v-if="submitted && !companyName" class="invalid-feedback">
            Company name is required.
          </div>
          <div v-if="serverErrors.company_name" class="invalid-feedback">
            {{ serverErrors.company_name[0] }}
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Company Bio</label>
          <textarea
            class="form-control"
            v-model="companyBio"
            :class="{ 'is-invalid': submitted && (!companyBio || serverErrors.company_bio) }"
            placeholder="Tell us about your company"
          ></textarea>
          <div v-if="submitted && !companyBio" class="invalid-feedback">
            Company bio is required.
          </div>
          <div v-if="serverErrors.company_bio" class="invalid-feedback">
            {{ serverErrors.company_bio[0] }}
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Location</label>
          <input
            type="text"
            class="form-control"
            v-model="location"
            :class="{ 'is-invalid': submitted && (!location || serverErrors.location) }"
            placeholder="City, Country"
          />
          <div v-if="submitted && !location" class="invalid-feedback">
            Location is required.
          </div>
          <div v-if="serverErrors.location" class="invalid-feedback">
            {{ serverErrors.location[0] }}
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Website</label>
          <input
            type="url"
            class="form-control"
            v-model="website"
            :class="{ 'is-invalid': submitted && (!website || serverErrors.website) }"
            placeholder="https://example.com"
          />
          <div v-if="submitted && !website" class="invalid-feedback">
            Website is required.
          </div>
          <div v-if="serverErrors.website" class="invalid-feedback">
            {{ serverErrors.website[0] }}
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Phone Number</label>
          <input
            type="tel"
            class="form-control"
            v-model="phone"
            :class="{ 'is-invalid': submitted && (!phone || !isValidPhone(phone) || serverErrors.phone) }"
            placeholder="Enter your phone number"
          />
          <div v-if="submitted && !phone" class="invalid-feedback">
            Phone number is required.
          </div>
          <div v-else-if="submitted && phone && !isValidPhone(phone)" class="invalid-feedback">
            Phone number must contain only digits.
          </div>
          <div v-if="serverErrors.phone" class="invalid-feedback">
            {{ serverErrors.phone[0] }}
          </div>
        </div>

        <!-- Submit Button -->
        <button class="btn bg-purple text-white fw-bold w-100 p-3 mt-3" @click="handleSubmit">
          Submit Company Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRegisterStore } from '@/stores/registerStore.js'
import { useUserStore } from '@/stores/userStore.ts'
import { useEmployerStore } from '@/stores/employerStore.ts'

const router = useRouter()
const registerStore = useRegisterStore()
const userStore = useUserStore()
const employerStore = useEmployerStore()

const companyName = ref("")
const companyBio = ref("")
const location = ref("")
const website = ref("")
const phone = ref("")
const submitted = ref(false)

const serverErrors = ref({}) // To hold server validation errors

const defaultProfileImage = "https://cdn-icons-png.flaticon.com/512/847/847969.png"
const defaultCompanyLogo = "https://cdn-icons-png.flaticon.com/512/847/847969.png"

const profileImageFile = ref(null)
const companyLogoFile = ref(null)

const profileImageUrl = ref("")
const companyLogoUrl = ref("")

function handleProfileImageUpload(event) {
  const file = event.target.files[0]
  if (file && file.type.startsWith("image/")) {
    profileImageFile.value = file
    profileImageUrl.value = URL.createObjectURL(file)
  }
}

function handleLogoUpload(event) {
  const file = event.target.files[0]
  if (file && file.type.startsWith("image/")) {
    companyLogoFile.value = file
    companyLogoUrl.value = URL.createObjectURL(file)
  }
}

function isValidPhone(phone) {
  return /^\d+$/.test(phone)
}

async function handleSubmit() {
  submitted.value = true
  serverErrors.value = {} // reset server errors before submit

  // Client-side validation before calling backend
  if (
    companyName.value &&
    companyBio.value &&
    location.value &&
    website.value &&
    phone.value &&
    isValidPhone(phone.value)
  ) {
    try {
      const userFormData = new FormData()
      userFormData.append('name', registerStore.step1Data.fullName)
      userFormData.append('email', registerStore.step1Data.email)
      userFormData.append('password', registerStore.step1Data.password)
      userFormData.append('password_confirmation', registerStore.step1Data.password)
      userFormData.append('role', 'employer')
      if (profileImageFile.value) {
        userFormData.append('profile_picture', profileImageFile.value)
      }

      const createdUser = await userStore.createUser(userFormData)

      const employerFormData = new FormData()
      employerFormData.append('user_id', createdUser.data.id)
      employerFormData.append('company_name', companyName.value)
      employerFormData.append('bio', companyBio.value)
      employerFormData.append('location', location.value)
      employerFormData.append('company_website', website.value)
      employerFormData.append('phone', phone.value)
      if (companyLogoFile.value) {
        employerFormData.append('company_logo', companyLogoFile.value)
      }

      await employerStore.createEmployer(employerFormData)

      router.push('/login')
    } catch (err) {
      // Check if error response has validation errors from backend
      if (err.response && err.response.data && err.response.data.errors) {
        serverErrors.value = err.response.data.errors
      } else {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>
.bg-purple {
  background-color: #6f42c1;
}
</style>
