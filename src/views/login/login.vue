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
        <h1 class="text-center fw-bold mb-4">
          Welcome Back, {{ isJobSeeker ? 'Dude' : 'Employer' }}
        </h1>

        <!-- Google login -->
        <button
          class="btn border-text-purple p-3 fw-bold rounded-0 w-100 mb-3 d-flex align-items-center justify-content-center"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            width="20"
            class="me-2"
          />
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
          <input
            v-model="email"
            type="email"
            class="form-control p-3 rounded-0"
            :class="{
              'is-invalid': emailTouched && emailError,
              'is-valid': emailTouched && !emailError
            }"
            @blur="emailTouched = true"
            placeholder="Enter email address"
          />
          <div class="invalid-feedback">{{ emailError }}</div>
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label class="form-label fw-bold fs-5 text-muted">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control p-3 rounded-0"
            :class="{
              'is-invalid': passwordTouched && passwordError,
              'is-valid': passwordTouched && !passwordError
            }"
            @blur="passwordTouched = true"
            placeholder="Enter password"
          />
          <div class="invalid-feedback">{{ passwordError }}</div>
        </div>

        <!-- Remember me -->
        <div class="form-check mb-3">
          <input type="checkbox" class="form-check-input" id="rememberMe" />
          <label class="form-check-label" for="rememberMe">Remember me</label>
        </div>

        <!-- Login button -->
        <button
          class="btn bg-purple rounded-0 text-white fw-bold p-3 fs-5 w-100 mb-3"
          @click="handleLogin"
        >
          Login
        </button>

        <!-- Sign up link -->
        <p class="text-muted">
          Don’t have an account?
          <a href="/register" class="text-primary text-decoration-none">Sign Up</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// imports
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { useAuthStore } from '@/stores/authStore'; 


// variables
const isJobSeeker = ref(true);
const email = ref('');
const password = ref('');
const emailTouched = ref(false);
const passwordTouched = ref(false);
const emailError = ref('');
const passwordError = ref('');

// stores + route
const userStore = useUserStore();
const authStore = useAuthStore(); 
const router = useRouter();


// validations
const validateForm = () => {
  emailError.value = '';
  passwordError.value = '';

  if (!email.value) {
    emailError.value = 'Email is required.';
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = 'Invalid email format.';
  }

  if (!password.value) {
    passwordError.value = 'Password is required.';
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters.';
  }

  return !emailError.value && !passwordError.value;
};


// functions
const handleLogin = async () => {

  //  that mean it is touched
  emailTouched.value = true;
  passwordTouched.value = true;

  // check + get 
  if (validateForm()) {
    if (userStore.users.length === 0) {
      //-------------------------
      await userStore.fetchUsers();
      //-------------------------
    }

    // DEBUG: [see all users]
    console.log('users:', userStore.users); // debug: wonderfu : get the array of users
    console.log("the password we input it : password.value = ", password.value);

    // send email, password to authStore
    const credentials = { email: email.value,password: password.value};

    //-------------------------------------------
    const response = await authStore.login(credentials);
    //-------------------------------------------

    console.log('login.vue : login : response  = ', response);

    // if everything is fine ==> route
    if (response.status === 200) {
      const user = response.data; 
      console.log(user)

      if (user.role === 'candidate') {
        router.push('/candidate/');
      } else if (user.role === 'employer') {
        router.push('/employer/dashboard');
      }else if (user.role === 'admin') {
        router.push('/admin');
      }
      
    } else {
      // show error
      emailError.value = 'Invalid email or password.';
      passwordError.value = 'Invalid email or password.';
    }
  }
};


onMounted(() => {
  // add something here like a preloading but later
});
</script>

<style scoped>
.text-purple {
  color: #4444dc !important;
}
.bg-purple {
  background-color: #4444dc !important;
}
.border-text-purple {
  border-color: #4444dc !important;
  color: #4444dc !important;
}
.bg-text-purple {
  background-color: #e9ebfd;
  color: #4444dc;
}
</style>
