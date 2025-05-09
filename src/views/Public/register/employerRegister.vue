<template>
    <div class="d-flex vh-100">
  
      <!-- Left image (fixed top-left) -->
      <div class="left-banner-container">
        <!-- https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?fit=crop&w=500&q=80 -->
        <img src="./login.png" alt="banner" class="left-banner-img" />
      </div>
  
      <!-- Register Form -->
      <div class="container d-flex align-items-center justify-content-center">
        <div class="w-100" style="max-width: 500px">
          <!-- Role Switch -->
          <div class="d-flex justify-content-center mb-3">
            <button class="btn rounded-0 fs-5 fw-semibold bg-text-purple">Company</button>
          </div>
  
          <!-- Image Upload Section -->
          <div class="d-flex justify-content-between mb-4">
            <!-- Profile Image -->
            <div class="me-2 w-50">
              <label class="form-label">Profile Image</label>
              <img
                :src="profileImageUrl || defaultImage"
                alt="Profile Preview"
                class="img-fluid rounded border preview-img mb-2"
              />
              <input type="file" class="form-control" @change="handleProfileImageUpload" />
            </div>
  
            <!-- Company Logo -->
            <div class="ms-2 w-50">
              <label class="form-label">Company Logo</label>
              <img
                :src="companyLogoUrl || defaultImage"
                alt="Company Logo Preview"
                class="img-fluid rounded border preview-img mb-2"
              />
              <input type="file" class="form-control" @change="handleLogoUpload" />
            </div>
          </div>
  
          <!-- Company Name -->
          <div class="mb-3">
            <label for="companyName" class="form-label">Company Name</label>
            <input type="text" class="form-control" id="companyName" placeholder="Enter your company name" />
          </div>
  
          <!-- Company Bio -->
          <div class="mb-3">
            <label for="companyBio" class="form-label">Company Bio</label>
            <textarea class="form-control" id="companyBio" placeholder="Tell us about your company"></textarea>
          </div>
  
          <!-- Company Location -->
          <div class="mb-3">
            <label for="companyLocation" class="form-label">Location</label>
            <input type="text" class="form-control" id="companyLocation" placeholder="City, Country" />
          </div>
  
          <!-- Company Website -->
          <div class="mb-3">
            <label for="companyWebsite" class="form-label">Website</label>
            <input type="url" class="form-control" id="companyWebsite" placeholder="https://example.com" />
          </div>


          <!-- Phone number -->
          <div class="mb-3">
            <label for="PhoneNumber" class="form-label">Phone Number</label>
            <input type="text" class="form-control" id="PhoneNumber" placeholder="enter your phone number" />
          </div>
  
          <!-- Agree Policy -->
          <div class="form-check mb-3">
            <input type="checkbox" class="form-check-input" id="agreePolicy" />
            <label class="form-check-label" for="agreePolicy">Agree the policy and rules</label>
          </div>
  
          <!-- Sign Up Button -->
          <button class="btn bg-purple rounded-0 text-white fw-bold p-3 fs-5 w-100 mb-3">Sign Up</button>
  
          <!-- Login Redirect -->
          <p class="text-muted text-center">
            Already have an account?
            <a href="/login" class="text-primary text-decoration-none">Login</a>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Online placeholder preview image
  const defaultImage = 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
  
  const profileImageUrl = ref(null)
  const companyLogoUrl = ref(null)
  
  function handleProfileImageUpload(event) {
    const file = event.target.files[0]
    if (file) {
      profileImageUrl.value = URL.createObjectURL(file)
    }
  }
  
  function handleLogoUpload(event) {
    const file = event.target.files[0]
    if (file) {
      companyLogoUrl.value = URL.createObjectURL(file)
    }
  }
  </script>
  
  <style scoped>
  .text-purple {
    color: #4444dc !important;
  }
  
  .bg-purple {
    background-color: #4444dc !important;
  }
  
  .bg-text-purple {
    background-color: #e9ebfd;
    color: #4444dc;
  }
  
  .preview-img {
    height: 120px;
    width: 100%;
    object-fit: cover;
    background-color: #f0f0f0;
  }
  
  .left-banner-container {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100vh;
  }
  
  .left-banner-img {
    height: 100vh;
    width: auto;
    object-fit: cover;
  }
  </style>
  