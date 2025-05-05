<template>
    <div class="container-fluid p-4 bg-light min-vh-100">
  
      <!-- Search Bar -->
      <div class="bg-white p-3 rounded shadow-sm mb-4">
        <div class="row g-2 align-items-center">
          <div class="col-md-5">
            <input type="text" class="form-control" placeholder="Job title or keyword" />
          </div>
          <div class="col-md-4">
            <input type="text" class="form-control" placeholder="Location (e.g. Florence, Italy)" />
          </div>
          <div class="col-md-3">
            <button class="btn btn-primary w-100">Search</button>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="row">
        
        <!-- Sidebar Filters -->
        <div class="col-md-3">
          <div class="bg-white p-3 rounded shadow-sm mb-4">
            <h6 class="fw-bold">Type of Employment</h6>
            <div class="form-check" v-for="type in ['Full-time', 'Part-Time', 'Remote', 'Internship', 'Contract']" :key="type">
              <input class="form-check-input" type="checkbox" :id="type" />
              <label class="form-check-label" :for="type">{{ type }}</label>
            </div>
          </div>
  
          <div class="bg-white p-3 rounded shadow-sm mb-4">
            <h6 class="fw-bold">Categories</h6>
            <div class="form-check" v-for="cat in ['Design', 'Sales', 'Marketing', 'Business', 'HR', 'Finance', 'Engineering', 'Tech']" :key="cat">
              <input class="form-check-input" type="checkbox" :id="cat" />
              <label class="form-check-label" :for="cat">{{ cat }}</label>
            </div>
          </div>
  
          <div class="bg-white p-3 rounded shadow-sm">
            <h6 class="fw-bold">Job Level</h6>
            <div class="form-check" v-for="level in ['Entry Level', 'Mid Level', 'Senior Level', 'Director', 'VP or Above']" :key="level">
              <input class="form-check-input" type="checkbox" :id="level" />
              <label class="form-check-label" :for="level">{{ level }}</label>
            </div>
          </div>
        </div>
  
        <!-- Job Listings -->
        <div class="col-md-9">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="fw-bold mb-0">All Jobs</h6>
            <select class="form-select w-auto">
              <option>Most relevant</option>
              <option>Newest</option>
              <option>Popular</option>
            </select>
          </div>
  
          <div v-for="job in jobList" :key="job.id" class="bg-white p-3 rounded shadow-sm mb-3">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="fw-bold mb-1">{{ job.title }}</h6>
                <p class="mb-1 text-muted">{{ job.company }} · {{ job.location }}</p>
                <div class="d-flex gap-2 flex-wrap">
                  <span class="badge bg-success">{{ job.type }}</span>
                  <span class="badge bg-warning text-dark">{{ job.category }}</span>
                  <span class="badge bg-primary">{{ job.domain }}</span>
                </div>
              </div>
              <div class="text-end">
                <button class="btn btn-primary">Apply</button>
                <div class="small mt-2 text-muted">
                  {{ job.applied }} applied of {{ job.capacity }} capacity
                </div>
              </div>
            </div>
          </div>
  
        </div>
  
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        jobList: [
          {
            id: 1,
            title: "Social Media Assistant",
            company: "Nomad",
            location: "Paris, France",
            type: "Full-Time",
            category: "Marketing",
            domain: "Design",
            applied: 5,
            capacity: 10
          },
          {
            id: 2,
            title: "Brand Designer",
            company: "Dropbox",
            location: "San Francisco, USA",
            type: "Full-Time",
            category: "Marketing",
            domain: "Design",
            applied: 2,
            capacity: 10
          },
          {
            id: 3,
            title: "Interactive Developer",
            company: "Terraform",
            location: "Hamburg, Germany",
            type: "Full-Time",
            category: "Marketing",
            domain: "Design",
            applied: 8,
            capacity: 12
          },
          // Add more jobs as needed
        ]
      };
    }
  };
  </script>
  