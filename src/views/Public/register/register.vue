<template>
    <div class="d-flex vh-100">
      <!-- banner in the left -->
      <img src="./login.png" alt="banner" class="img-fluid h-100 w-auto" />
  
      <!-- register form on the right -->
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
          <h1 class="text-center fw-bold mb-4">{{ isJobSeeker ? 'Get More Opportunties' : 'Get High Quality Candidate' }}</h1>
  
          <!-- Google register -->
          <button class="btn border-text-purple p-3 fw-bold rounded-0 w-100 mb-3 d-flex align-items-center justify-content-center">
            <img src="https://www.svgrepo.com/show/355037/google.svg" width="20" class="me-2" />
            Sign up with Google
          </button>
  
          <!-- Divider -->
          <div class="d-flex align-items-center text-muted mb-3">
            <hr class="flex-grow-1" />
            <span class="mx-2">Or sign up with us</span>
            <hr class="flex-grow-1" />
          </div>


          <!-- ful name -->
          <div class="mb-3">
            <label class="form-label fw-bold fs-5 text-muted">Full Name</label>
            <input type="email" class="form-control p-3 rounded-0" placeholder="Enter full name" />
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


        <!-- confirm Password -->
        <div class="mb-3">
            <label class="form-label fw-bold fs-5 text-muted">Confirm Password</label>
            <input type="confirmPassword" class="form-control p-3 rounded-0" placeholder="Enter password again" />
          </div>
  
          <!-- Remember me -->
          <div class="form-check mb-3">
            <input type="checkbox" class="form-check-input" id="rememberMe" />
            <label class="form-check-label" for="rememberMe">Remember me</label>
          </div>
  
          <!-- Register button -->
          <a :href="isJobSeeker ? '/candidateRegister' : '/employerRegister'" class="btn bg-purple rounded-0 text-white fw-bold p-3 fs-5 w-100 mb-3">Continue</a>
  
          <!-- Sign up link -->
          <p class="text-muted">
            Already have an account?
            <a href="/login" class="text-primary text-decoration-none">login</a>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
    // toggle between job seeker and company login
    const isJobSeeker = ref(true);

    // clicking in the button should send us to  another regiter page contain the other data needed

    //  if he is employer: redirect it to antoher page relatd to contiue the data for the employer:
        // - add image profile
        // - add company name
        // - add company logo
        // - add bio
        // - add company website

    //  if the candidare: redirect it to another page related to contue the dat to the candiate
        // - add iamge profile
        // - add location
        // - add level experience
        // - add linkedin link
        // - add default resume
        // - phone
        // - email   


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