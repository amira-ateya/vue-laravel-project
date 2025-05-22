<template>
    <div class="container-fluid d-flex justify-content-between border p-3 m-0">
    
    <!-- FOR CANDIDATE ------------------->
    <template v-if="userRole === 'candidate'">

        <div> <!-- changable part -->
            <h2 v-if="pageSection === 'applications'">My Applications</h2>
            <h2 v-else-if="pageSection === 'jobs'">Find Jobs</h2>
            <h2 v-else-if="pageSection === 'profile'">My Public Profile</h2>
            <h2 v-else-if="pageSection === 'job'">Job Details</h2>            
            <h2 v-else>404 NOT FOUND</h2>
        
        </div>

        
        <div class="d-flex justify-content-center align-items-center me-5">
            <!-- button to back to home -->
            <button class="btn btn-outline-primary rounded-0 me-4">Back To homepage</button>
            <!-- anchor contain notification symbol -->
            <a href="#"><i class="fa-regular fa-bell fa-2x"></i></a>
        </div>

    </template>

    <!-- FOR EMPLOYER ----------------------->
    <template v-else-if="userRole === 'employer'">

        <div class="container-fluid d-flex justify-content-between">

            <!-- employer company -->
            <div class="d-flex align-items-center">
                <img src="./../../../public/company.png" alt="company" width="50">
                <div class="ms-2"> <!-- company text -->
                    <div class="company-text">Company</div>
                    <div class="nomad-text">Nomad</div>
                </div>
            </div>

            <!-- buttons -->
            <div class="d-flex justify-content-center align-items-center">
                <a href="#"><i class="fa-regular fa-bell fa-2x"></i></a> <!-- notify -->
                <a href="/employer/post-job" class="btn btn-primary rounded-0 ms-4">+ Post a Job</a> <!-- add post -->
            </div>


        </div>

    </template>

    </div>
</template>


<script setup>

// get the url
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageSection = ref('')
const userRole = ref('')

///////////////MONITOR/THE/CHANGE/IN/URL/////////////////////////////////////
const updateRouteInfo = () => {
    const pathParts = route.path.split('/')
    userRole.value = pathParts[1] || ''
    pageSection.value = pathParts[2] || ''
}
watch(route, updateRouteInfo, { immediate: true })
onMounted(updateRouteInfo)
//////////////////////////////////////////////////////////////////////////////

</script>

<style scoped>
.company-text {
  font-size: 1rem;
  color: #6c757d;
}
.nomad-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a2e45;
}
</style>
