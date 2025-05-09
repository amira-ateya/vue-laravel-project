<template>
    <div class="d-flex vh-100">
      <!-- banner on the left -->
      <img src="./login.png" alt="banner" class="img-fluid h-100 w-auto" />
  
      <!-- form on the right -->
      <div class="container d-flex align-items-center justify-content-center">
        <div class="w-100" style="max-width: 1100px">
          <h1 class="text-center fw-bold mb-4">Just a step to Go</h1>
  
          <div class="row">
            <!-- Left Column: Profile + Inputs -->
            <div class="col-md-3">
              <!-- Profile Image -->
              <div class="mb-4">
                <div class="d-flex flex-column justify-content-center align-items-center gap-3">
                  <img
                    :src="imagePreview"
                    alt="Profile Preview"
                    class="rounded"
                    style="width: 200px; height: 200px; object-fit: cover; margin-right: 15px;"
                  />
                  <input type="file" accept="image/*" @change="handleImageUpload" class="form-control" />
                </div>
              </div>
  
              <!-- Phone -->
              <div class="mb-3">
                <label class="form-label fw-bold fs-5 text-muted">Phone Number</label>
                <input type="tel" class="form-control p-3 rounded-0" placeholder="Enter phone number" />
              </div>
  
              <!-- LinkedIn -->
              <div class="mb-3">
                <label class="form-label fw-bold fs-5 text-muted">LinkedIn Profile</label>
                <input type="url" class="form-control p-3 rounded-0" placeholder="Paste your LinkedIn URL" />
              </div>
  
              <!-- Submit -->
              <button class="btn bg-purple rounded-0 text-white fw-bold p-3 fs-5 w-100 mt-4">Submit Profile</button>
            </div>
  
            <!-- Right Column: Resume PDF -->
            <div class="col-md-6">
              <div class="mb-4">
                <iframe
                  :src="pdfPreview"
                  style="width: 100%; height: 200px; border: 1px solid #ccc;"
                ></iframe>
                <input type="file" accept=".pdf" class="form-control mt-2 mb-3" @change="handlePdfUpload" />
              </div>


              <!-- Location -->
              <div class="mb-3">
                <label class="form-label fw-bold fs-5 text-muted">Location</label>
                <input type="text" class="form-control p-3 rounded-0" placeholder="Enter your location" />
              </div>
  
              <!-- Experience Level -->
              <div class="mb-3">
                <label class="form-label fw-bold fs-5 text-muted">Experience Level</label>
                <select class="form-select p-3 rounded-0">
                  <option>Entry Level</option>
                  <option>Mid Level</option>
                  <option>Senior Level</option>
                </select>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const imagePreview = ref("https://cdn-icons-png.flaticon.com/512/847/847969.png");
  const pdfPreview = ref("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");
  
  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      imagePreview.value = URL.createObjectURL(file);
    }
  }
  
  function handlePdfUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      pdfPreview.value = URL.createObjectURL(file);
    }
  }
  </script>
  
  <style scoped>
  .bg-purple {
    background-color: #4444dc !important;
  }
  </style>
  