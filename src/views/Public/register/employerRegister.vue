<template>
  <div class="d-flex vh-100">
    <!-- Left image (banner) -->
    <img src="./login.png" alt="banner" class="img-fluid h-100 w-auto" />

    <!-- Form Section -->
    <div class="container d-flex align-items-center justify-content-center">
      <div class="w-100" style="max-width: 700px;">
        <h1 class="text-center fw-bold mb-4">Jus a Step to Go</h1>

        <!-- Profile and Logo Upload -->
        <div class="d-flex justify-content-between mb-4">
          <!-- Profile Image -->
          <div class="me-2 w-50">
            <img
              :src="profileImageUrl || defaultProfileImage"
              alt="Profile Preview"
              class="img-fluid rounded border mb-2"
              style="height: 150px; object-fit: cover;"
            />
            <input type="file" class="form-control" @change="handleProfileImageUpload" />
          </div>

          <!-- Company Logo -->
          <div class="ms-2 w-50">
            <img
              :src="companyLogoUrl || defaultCompanyLogo"
              alt="Company Logo Preview"
              class="img-fluid rounded border mb-2"
              style="height: 150px; object-fit: cover;"
            />
            <input type="file" class="form-control" @change="handleLogoUpload" />
          </div>
        </div>

        <!-- Company Info -->
        <div class="mb-3">
          <label class="form-label">Company Name</label>
          <input
            type="text"
            class="form-control"
            v-model="companyName"
            :class="{ 'is-invalid': submitted && !companyName }"
            placeholder="Enter your company name"
          />
          <div v-if="submitted && !companyName" class="invalid-feedback">
            Company name is required.
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Company Bio</label>
          <textarea
            class="form-control"
            v-model="companyBio"
            :class="{ 'is-invalid': submitted && !companyBio }"
            placeholder="Tell us about your company"
          ></textarea>
          <div v-if="submitted && !companyBio" class="invalid-feedback">
            Company bio is required.
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Location</label>
          <input
            type="text"
            class="form-control"
            v-model="location"
            :class="{ 'is-invalid': submitted && !location }"
            placeholder="City, Country"
          />
          <div v-if="submitted && !location" class="invalid-feedback">
            Location is required.
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Website</label>
          <input
            type="url"
            class="form-control"
            v-model="website"
            :class="{ 'is-invalid': submitted && !website }"
            placeholder="https://example.com"
          />
          <div v-if="submitted && !website" class="invalid-feedback">
            Website is required.
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Phone Number</label>
          <input
            type="tel"
            class="form-control"
            v-model="phone"
            :class="{ 'is-invalid': submitted && (!phone || !isValidPhone(phone)) }"
            placeholder="Enter your phone number"
          />
          <div v-if="submitted && !phone" class="invalid-feedback">
            Phone number is required.
          </div>
          <div v-else-if="submitted && phone && !isValidPhone(phone)" class="invalid-feedback">
            Phone number must contain only digits.
          </div>
        </div>


        <!-- Submit Button -->
        <button class="btn bg-purple text-white fw-bold w-100 p-3 mt-3" @click="handleEmployerSubmit">
          Submit Company Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRegisterStore } from '@/stores/registerStore'
import { useUserStore } from '@/stores/userStore'
import { useEmployerStore } from '@/stores/employerStore'
import { useRouter } from 'vue-router'

const registerStore = useRegisterStore()
const userStore = useUserStore()
const employerStore = useEmployerStore()
const router = useRouter()

onMounted(() => {
  const { fullName, email, password } = registerStore.step1Data

  console.log("fulll name = ", fullName);

  if (!fullName || !email || !password) {
    router.push('/register')
  }
})



// Local form data
const companyName = ref('')
const companyBio = ref('')
const location = ref('')
const website = ref('')
const phone = ref('')
const profileImageUrl = ref(null)
const companyLogoUrl = ref(null)
const submitted = ref(false)

// Default images
const defaultProfileImage = "https://cdn-icons-png.flaticon.com/512/847/847969.png"
const defaultCompanyLogo = 'https://images.ui8.net/uploads/3_1615170250124.png'

// Handle image uploads
const handleProfileImageUpload = (e) => {
  const file = e.target.files[0]
  if (file) profileImageUrl.value = URL.createObjectURL(file)
}

const handleLogoUpload = (e) => {
  const file = e.target.files[0]
  if (file) companyLogoUrl.value = URL.createObjectURL(file)
}


function isValidPhone(value) {
  return /^\d+$/.test(value) // only digits, no letters, no special characters
}


// Submit handler
const handleEmployerSubmit = async () => {
  submitted.value = true


  if (
  !companyName.value ||
  !companyBio.value ||
  !location.value ||
  !website.value ||
  !phone.value ||
  !isValidPhone(phone.value)
) {
  return
}


  try {
    const step1Data = registerStore.step1Data

    const userPayload = {
      name: step1Data.fullName,
      email: step1Data.email,
      password: step1Data.password,
      role: 'employer',
      profile_picture: profileImageUrl.value || defaultProfileImage,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const createdUser = await userStore.createUser(userPayload)

    const employerPayload = {
      user_id: createdUser.id,
      company_name: companyName.value,
      company_website: website.value,
      company_logo: companyLogoUrl.value || defaultCompanyLogo,
      bio: companyBio.value,
      phone: phone.value,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    await employerStore.createEmployer(employerPayload)

    registerStore.clearData()
    router.push('/login')
  } catch (error) {
    console.error('Error creating employer:', error)
  }
}
</script>

<style scoped>
.bg-purple {
  background-color: #6f42c1;
}
</style>
