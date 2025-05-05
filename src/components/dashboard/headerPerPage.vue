<template>
    <div class="container-fluid d-flex justify-content-between border p-3 m-0">

    
    <div> <!-- changable part -->


        <!-- FOR CANDIDATE -->
        <h2 v-if="pageSection === 'applications'">My Applications</h2>
        <h2 v-else-if="pageSection === 'jobs'">Find Jobs</h2>
        <h2 v-else-if="pageSection === 'profile'">My Public Profile</h2>
        <h2 v-else>404 NOT FOUND</h2>

        <!-- FOR EMPOLOYER -->
         

    </div>

        
         <div class="d-flex justify-content-center align-items-center">

            <!-- button to back to home -->
            <button class="btn btn-outline-primary rounded-0 me-4">Back To homepage</button>

            <!-- anchor contain notification symbol -->
            <a href="#"><i class="fa-regular fa-bell fa-2x"></i></a>
        </div>


    </div>
</template>


<script setup>

// get the url
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageSection = ref('')

///////////////MONITOR/THE/CHANGE/IN/URL/////////////////////////////////////
const updatePageSection = () => {pageSection.value = route.path.split('/')[2] || ''}
watch(route, updatePageSection, { immediate: true })
onMounted(updatePageSection)
//////////////////////////////////////////////////////////////////////////////



</script>
