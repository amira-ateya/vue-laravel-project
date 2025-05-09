<template>
  <div class="container-fluid">
    <!-- Searhc Row -->
    <SearchJob/>

    <hr> <!-- horizintal line -->

    <!-- Main Content Row -->
    <div class="row">
      
      <!-- Filters -->
      <div class="col-3">
        <JobFilters @filter-changed="onFilterChanged" />
      </div>

      <!-- Jobs -->
      <div class="col">
         <AvailableJobs />
      </div>

    </div>
  </div>
</template>




<script>
import AvailableJobs from '@/components/candidate/candidateViewJobs/availableJobs.vue';
import JobFilters from '@/components/candidate/candidateViewJobs/JobFilters.vue';
import SearchJob from '@/components/candidate/candidateViewJobs/searchJob.vue';


export default {
  components: {
    JobFilters,
    AvailableJobs,
    SearchJob
  },

  
  methods: {
    onFilterChanged(filters) {
      // You can apply filter logic here or pass it to Vuex/store
    }
  }
};
</script>