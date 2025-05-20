<template>
  <aside class="bg-light d-flex flex-column justify-content-between p-3" style="width: 250px; height: 100vh;">
    <div> <!-- TOP SECTION -->
      <nav class="nav flex-column">

        <!-- logo -->
        <img src="./../../../public/logo.svg" alt="logo" class="mb-3">

        <!-- Conditional Rendering for Candidate View -->
        <template v-if="userRole === 'candidate'">
          <!-- candidate dashboard -->
          <router-link
            to="/candidate/dashboard"
            :class="['nav-link d-flex align-items-center px-2 py-2', route.path === '/candidate/dashboard' ? 'active-link' : 'text-secondary']"
          > <i class="fas fa-home me-2"></i> Dashboard
          </router-link>
          <!-- candidate applications -->
          <router-link
            to="/candidate/applications"
            :class="['nav-link d-flex align-items-center px-2 py-2', route.path === '/candidate/applications' ? 'active-link' : 'text-secondary']"
          > <i class="fas fa-file-alt me-2"></i> My Applications
          </router-link>
          <!-- candidate find jobs -->
          <router-link
            to="/candidate/jobs"
            :class="['nav-link d-flex align-items-center px-2 py-2', route.path === '/candidate/jobs' ? 'active-link' : 'text-secondary']"
          > <i class="fas fa-search me-2"></i> Find Jobs
          </router-link>
          <!-- candidate profile -->
          <router-link
            to="/candidate/profile"
            :class="['nav-link d-flex align-items-center px-2 py-2', route.path === '/candidate/profile' ? 'active-link' : 'text-secondary']"
          > <i class="fas fa-user me-2"></i> My Public Profile
          </router-link>
        </template>

        <!--==========================EMPLOYER VIEW==============================-->
        <template v-else-if="userRole === 'employer'">
          <!-- employer dashboard -->
          <router-link
            to="/employer/dashboard"
            :class="['nav-link d-flex align-items-center px-2 py-2', route.path === '/employer/dashboard' ? 'active-link' : 'text-secondary']"
          > <i class="fas fa-home me-2"></i> Dashboard
          </router-link>
          <!-- employer manage jobs -->
          <router-link
            to="/employer/applications"
            :class="['nav-link d-flex align-items-center px-2 py-2', route.path === '/employer/applications' ? 'active-link' : 'text-secondary']"
          > <i class="fas fa-briefcase me-2"></i> All Applicants
          </router-link>
          <!-- employer view applicants -->
          <router-link
            to="/employer/job-listing"
            :class="['nav-link d-flex align-items-center px-2 py-2', route.path === '/employer/job-listing' ? 'active-link' : 'text-secondary']"
          > <i class="fas fa-users me-2"></i> Job Listing
          </router-link>
        </template>
      </nav>

      </hr><!-- LINE ----------------------------------------------------------------------------->

      <!-- TITLE SECTION -->
      <small class="text-uppercase text-muted px-2">Settings</small>

      <nav class="nav flex-column mt-2">
        <!-- settings -->
        <router-link
          :to="`/${userRole}/settings`"
          :class="['nav-link d-flex align-items-center px-2 py-2', route.path === `/${userRole}/settings` ? 'active-link' : 'text-secondary']"
        > <i class="fas fa-cog me-2"></i> Settings
        </router-link>
        <!-- help -->
        <router-link
          :to="`/${userRole}/help`"
          :class="['nav-link d-flex align-items-center px-2 py-2', route.path === `/${userRole}/help` ? 'active-link' : 'text-secondary']"
        > <i class="fas fa-question-circle me-2"></i> Help Center
        </router-link>

        <button class="btn text-secondary text-start" @click="logout">
          <i class="fa-solid fa-right-from-bracket"></i>
          logout
        </button>

      </nav>
    </div>
<!-- USER INFO -->
    <div class="d-flex align-items-center p-2 mt-4">
      <img :src="userImage" class="rounded-circle me-2" alt="Avatar" width="60" height="60">
      <div>
        <div class="fw-bold">{{ user.name  }}</div> <!-- username -->
        <div class="text-muted" style="font-size: 0.875rem;">{{ user.email }}</div> <!-- email -->
      </div>
    </div>
  </aside>
</template>

<script setup>
// imports
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore' // <-- make sure the path is correct
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const userRole = ref('candidate')


//=========GET USER IMAGE + EMAIL============

const user = ref({});
const base = 'http://localhost:8000/storage/';
const userImage = ref('');

// first add the token in the header
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

onMounted(async() =>{
  const res = await axios.get('http://localhost:8000/api/user');
  user.value = res.data;
  userImage.value = base + res.data.profile_picture;
  console.log("user image = ", userImage.value);
  console.log("[Dashboard] user.value = ",user.value); //debug
})

//===========================================

// Update role based on current path
const updateUserRole = () => {
  userRole.value = route.path.split('/')[1] || ''
}
watch(route, updateUserRole, { immediate: true })
onMounted(updateUserRole)

// Logout handler
const logout = () => {
  authStore.logout()
  router.push('/login') // redirect to login page
}
</script>


<style>
.active-link {
  background-color: #e9ebfd;
  color: #4640de !important;
  border-radius: 8px;
}

.nav-link:hover {
  color: #007bff; /* Adjust hover color */
  background-color: #f1f1f1; /* Adjust hover background */
  border-radius: 8px;
}
</style>


<!-- https://i.pravatar.cc/40 -->