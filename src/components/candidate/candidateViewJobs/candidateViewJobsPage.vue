<template>
  <div class="container-fluid">
    <!-- Search Row ------------------------->
    <div class="search-container">
      <div class="search-form">
        <!-- Search keyword input -->
        <div class="search-input-group">
          <div class="search-icon">
            <i class="fas fa-search"></i>
          </div>
          <input 
            type="text" 
            class="search-input" 
            placeholder="Job title or keyword"
          >
        </div>
        
        <!-- Search location input -->
        <div class="search-input-group location-input-group">
          <div class="search-icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <input 
            type="text" 
            class="search-input" 
            placeholder="Florence, Italy"
          >
          <div class="dropdown-icon">
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>
        
        <!-- Search button -->
        <button class="search-button rounded-0 fw-bold">
          Search
        </button>
      </div>
    </div>
    <!-- --------------------------------------- -->

    <!-- Main Content Row -->
    <div class="row">
      
      <!-- Filters Column -->
      <div class="col-3">
        <JobFilters @filter-changed="onFilterChanged" />
      </div>

      <!-- Jobs Column -->
      <div class="col p-0">

        <!-- hero sectoion for job -->
        <div class="container-fluid p-3 d-flex justify-content-between align-items-center">

          <div>
            <h2 class="fw-bold">All Jobs</h2>
            <h5>Showing 73 results</h5>
          </div>

        </div>



        <!-- the box -->
        <div class="container-fluid border p-3 d-flex justify-content-between align-items-center">

          <!-- Left side: company image + title + location + categories -->
          <div class="d-flex align-items-center">
            
            <!-- company logo -->
            <div class="me-3">
              <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" alt="company logo" style="width: 80px; height: 80px;">
            </div>

            <!-- text info -->
            <div class="d-flex flex-column">
              <h3 class="mb-1">Social Media Assistant</h3>
              <h6 class="text-secondary mb-1">Nomad · Paris, France</h6>
              <span>
                <span class="badge border rounded-pill me-2 p-2 border-text-yellow">Marketing</span>
                <span class="badge border rounded-pill p-2 border-text-purple">Sales</span>
              </span>
            </div>

          </div>

          <!-- Right side: apply button + number of applicants -->
          <div style="width: 200px;">

            <!-- button -->
            <button class="btn mb-1 w-100 rounded-0 px-5 py-3 fw-bold bg-purple text-white">Apply</button>

            <!-- progres -->
            <div class="container p-0 mt-1">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>


             

            <!-- number of applied people -->
            <div class="text-muted">
              <span class="fw-bold">5 applied</span> 
              <span class="text-secondary"> of 10 capacity</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import JobFilters from './JobFilters.vue';

export default {
  components: {
    JobFilters
  },


  methods: {
    onFilterChanged(filters) {
      // You can apply filter logic here or pass it to Vuex/store
    }
  }
};
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


.progress {
  height: 6px;
  border-radius: 0px;
}

.progress-bar {
  background-color: #73cda9;
}

</style>



<style scoped>
.search-container {
  padding: 20px;
  width: 100%;
}

.search-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px;
  background-color: white;
}

.search-input-group {
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
  border-right: 1px solid #e0e0e0;
  padding-right: 20px;
}

.location-input-group {
  border-right: none;
  padding-left: 20px;
}

.search-icon {
  color: #666;
  margin-right: 12px;
}

.search-input {
  border: none;
  outline: none;
  font-size: 16px;
  width: 100%;
  color: #333;
}

.search-input::placeholder {
  color: #999;
}

.dropdown-icon {
  color: #999;
  margin-left: 10px;
}

.search-button {
  background-color: #5145e5;
  color: white;
  border: none;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-left: 20px;
}

.search-button:hover {
  background-color: #4338ca;
}
</style>