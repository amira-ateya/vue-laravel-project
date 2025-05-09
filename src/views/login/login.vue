<template>
    <div class="d-flex vh-100">
      <!-- banner in the left -->
      <img src="./login.png" alt="banner" class="img-fluid h-100 w-auto" />
  
      <!-- login form on the right -->
      <div class="container d-flex align-items-center justify-content-center">


        <div class="w-100" style="max-width: 500px">
          <!-- Toggle buttons -->
          <div class="d-flex justify-content-center mb-3">
            <button
              class="btn rounded-0 fs-5 fw-semibold"
              :class="isJobSeeker ? 'bg-text-purple' : 'text-purple'"
              @click="isJobSeeker = true"
            >
              Job Seeker
            </button>
            <button
              class="btn rounded-0 fs-5 fw-semibold"
              :class="!isJobSeeker ? 'bg-text-purple' : 'text-purple'"
              @click="isJobSeeker = false"
            >
              Company
            </button>
          </div>
  
          <!-- Heading -->
          <h1 class="text-center fw-bold mb-4">Welcome Back, {{ isJobSeeker ? 'Dude' : 'Employer' }}</h1>
  
          <!-- Google login -->
          <button class="btn border-text-purple p-3 fw-bold rounded-0 w-100 mb-3 d-flex align-items-center justify-content-center">
            <img src="https://www.svgrepo.com/show/355037/google.svg" width="20" class="me-2" />
            Login with Google
          </button>
  
          <!-- Divider -->
          <div class="d-flex align-items-center text-muted mb-3">
            <hr class="flex-grow-1" />
            <span class="mx-2">Or login with email</span>
            <hr class="flex-grow-1" />
          </div>
  
          <!-- Email -->
          <div class="mb-3">
            <label class="form-label fw-bold fs-5 text-muted">Email Address</label>
            <input type="email" class="form-control p-3 rounded-0" placeholder="Enter email address" />
          </div>
  
          <!-- Password -->
          <div class="mb-3">
            <label class="form-label fw-bold fs-5 text-muted">Password</label>
            <input type="password" class="form-control p-3 rounded-0" placeholder="Enter password" />
          </div>
  
          <!-- Remember me -->
          <div class="form-check mb-3">
            <input type="checkbox" class="form-check-input" id="rememberMe" />
            <label class="form-check-label" for="rememberMe">Remember me</label>
          </div>
  
          <!-- Login button -->
          <button class="btn bg-purple rounded-0 text-white fw-bold p-3 fs-5 w-100 mb-3">Login</button>
  
          <!-- Sign up link -->
          <p class="text-muted">
            Don’t have an account?
            <a href="#" class="text-primary text-decoration-none">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isJobSeeker = ref(true); // toggle between job seeker and company login
  </script>
  


<style scoped>

.text-purple{
    color: #4444dc !important;;
}

.bg-purple{
    background-color: #4444dc !important;;
}

.border-text-purple{
  border-color: #4444dc !important;;
  color: #4444dc !important;;
}

.bg-text-purple{
    background-color: #e9ebfd;
    color: #4444dc;

}

</style>