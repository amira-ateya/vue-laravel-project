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
            to="/employer/all-applicants"
            :class="['nav-link d-flex align-items-center px-2 py-2', route.path === '/employer/all-applicants' ? 'active-link' : 'text-secondary']"
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

      <hr><!-- LINE ----------------------------------------------------------------------------->

      <!-- TITLE SECTION -->
      <small class="text-uppercase text-muted px-2">Settings</small>

      <nav class="nav flex-column mt-2">
        <!-- settings -->
       <!-- settings -->
<router-link
  :to="`/${userRole}/settings`"
  :class="['nav-link d-flex align-items-center px-2 py-2', route.path === `/${userRole}/settings` ? 'active-link' : 'text-secondary']"
>
  <i class="fas fa-cog me-2"></i> Settings
</router-link>

<!-- help -->
<router-link
  :to="`/${userRole}/help`"
  :class="['nav-link d-flex align-items-center px-2 py-2', route.path === `/${userRole}/help` ? 'active-link' : 'text-secondary']"
>
  <i class="fas fa-question-circle me-2"></i> Help Center
</router-link>

      </nav>
    </div>
<!-- USER INFO -->
    <div class="d-flex align-items-center p-2 mt-4">
      <img src="https://i.pravatar.cc/40" class="rounded-circle me-2" alt="Avatar" width="40" height="40"> <!-- userimage -->
      <div>
        <div class="fw-bold">Jake Gyll</div> <!-- username -->
        <div class="text-muted" style="font-size: 0.875rem;">jakegyll@email.com</div> <!-- email -->
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userRole = ref('candidate') //DEFAULT
///////////////MONITOR/THE/CHANGE/IN/URL/////////////////////////////////////
const updateUserRole = () => {userRole.value = route.path.split('/')[1] || ''}
watch(route, updateUserRole, { immediate: true })
onMounted(updateUserRole)
//////////////////////////////////////////////////////////////////////////////
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