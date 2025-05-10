<template>
<!-- JOB CARD WRAPPER -->
<div class="mx-5">


  <!-- hero sectoion for job -->
  <div class="p-3 d-flex justify-content-between align-items-center">
      <div>
          <h2 class="fw-bold">All Jobs</h2>
          <h5>Showing 73 results</h5>
      </div>
  </div>

  <!-- JOB CARD -->
  <div class="border p-4 d-flex justify-content-between align-items-center">

    <!-- Left side: company image + title + location + categories -->
    <div class="d-flex">
      <!-- company logo -->
      <div class="me-4">
        <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" alt="company logo" style="width: 60px; height: 60px;">
      </div>

      <!-- text info -->
      <div class="d-flex flex-column gap-1">
        <h3 class="">Social Media Assistant</h3>
        <h5 class="text-secondary mb-3">Nomad · Paris, France</h5>
        <span>
          <span class="badge rounded-pill me-4 cstm-bg-text-green" style="font-size: 1.1rem; padding: 0.5em 0.9em;">Full Time</span>
          <span class="badge border rounded-pill me-2 border-text-yellow" style="font-size: 1.1rem; padding: 0.5em 0.9em;">Marketing</span>
          <span class="badge badge-lg border rounded-pill p-2 border-text-purple" style="font-size: 1.1rem; padding: 0.5em 0.9em;">Sales</span>
        </span>
      </div>
    </div>

    <!-- Right side: apply button + number of applicants -->
    <div style="width: 200px;" class="d-flex flex-column justify-content-between gap-3">
    <!-- JOB CARD LOOP -->
<div v-for="job in jobStore.jobs" :key="job.id" class="border p-4 d-flex justify-content-between align-items-center">
  <!-- Your job card content here -->

  <!-- Router link will now work correctly -->
  <router-link
    :to="{ name: 'CandidatejobDetails', params: { id: job.id } }"
    class="btn w-100 rounded-0 px-5 py-3 fw-bold fs-5 bg-purple text-white"
  >
    Apply
  </router-link>
</div>


      <div class="progress">
        <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
      </div>

      <div style="font-size: 1.15rem;">
        <span class="fw-bold">5 applied</span> 
        <span class="text-secondary"> of 10 capacity</span>
      </div>
    </div>


  </div>
</div>


</template>
<script setup>
import { useJobStore } from '@/stores/jobStore';
import { onMounted } from 'vue';

// Access the job store
const jobStore = useJobStore();

// Fetch the jobs when the component is mounted
onMounted(() => {
  jobStore.fetchJobs();
});
</script>
<style scoped>
.border-text-yellow{
  border-color: #fcc24a !important;;
  color: #fcc24a !important; ;
}

.border-text-purple{
  border-color: #4444dc !important;;
  color: #4444dc !important;;
}

.bg-purple{
  background-color: #4444dc !important;
}

/* type of job */
.cstm-bg-text-green{
  background-color: #effaf7;
  color: #64d1b3;
}


.progress {
  height: 6px;
  border-radius: 0px;
}

.progress-bar {
  background-color: #73cda9;
}

</style>
