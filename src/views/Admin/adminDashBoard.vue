<template>
  <div class="container py-5">
    <div class="mb-4 d-flex justify-content-between align-items-center">
      <h2 class="fw-bold mb-0">Admin Dashboard</h2>
      <span class="badge bg-primary fs-6">Manage Job Posts</span>
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="d-flex justify-content-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <!-- Jobs List -->
    <div v-else>
      <div v-if="jobs.length === 0" class="alert alert-info">
        No job posts found.
      </div>

      <div class="d-flex flex-column gap-3">
        <div v-for="job in jobs" :key="job.id" class="card shadow-sm border-0">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <!-- Job Info Section -->
              <div class="flex-grow-1">
                <h5 class="fw-bold text-primary mb-1">{{ job.title }}</h5>
                <p class="mb-1 text-muted"><i class="bi bi-geo-alt-fill me-1"></i>{{ job.location }}</p>
                <p class="mb-1"><strong>Work Type:</strong> {{ job.work_type }}</p>
                <p class="mb-0">
                  <strong>Status:</strong>
                  <span :class="[
                    'badge',
                    job.status === 'approved' ? 'bg-success' : 
                    job.status === 'rejected' ? 'bg-danger' : 
                    'bg-warning text-dark'
                  ]">
                    {{ job.status }}
                  </span>
                </p>
              </div>

              <!-- Action Buttons -->
              <div class="d-flex gap-2">
                <button
                  class="btn btn-outline-success"
                  @click="updateStatus(job.id, 'approved')"
                  :disabled="job.status === 'approved'"
                >
                  Approve
                </button>
                <button
                  class="btn btn-outline-danger"
                  @click="updateStatus(job.id, 'rejected')"
                  :disabled="job.status === 'rejected'"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
// Remove jwt-decode, it's not applicable for Sanctum plain text tokens
// import { jwtDecode } from 'jwt-decode';

const jobs = ref([]);
const loading = ref(true);
const isAdmin = ref(false);

// Refactor to get token dynamically inside functions for robustness
// const token = localStorage.getItem('token'); // Can remove this global declaration

const fetchJobs = async () => {
  const token = localStorage.getItem('token');
  
  // get token
  if (!token) {
    console.error('No token found for fetching jobs.');
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get('http://localhost:8000/api/jobs', {
      headers: { Authorization: `Bearer ${token}`},
    });

    jobs.value = response.data;
   console.log(jobs.value ); //DEBUG
  } catch (error) {
    console.error('Error fetching jobs:', error);
    // Handle specific error codes if needed, e.g., 401 for unauthorized
    if (error.response && error.response.status === 401) {
      console.log('Token expired or invalid, please log in again.');
      // Optional: Redirect to login page or clear token
      localStorage.removeItem('token');
      isAdmin.value = false; // Ensure UI reflects unauthorized state
    }
  } finally {
    loading.value = false;
  }
};

console.log( jobs.value )
const updateStatus = async (jobId, status) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found for updating job status.');
    return;
  }
  try {
    const response = await axios.put(`http://localhost:8000/api/jobs/${jobId}/status`, {
      status,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    // Update locally after success
    const index = jobs.value.findIndex(j => j.id === jobId);
    if (index !== -1) {
      jobs.value[index].status = status;
    }

  } catch (error) {
    console.error('Error updating job status:', error);
     if (error.response && error.response.status === 401) {
      console.log('Token expired or invalid, please log in again.');
      localStorage.removeItem('token');
      isAdmin.value = false;
    }
  }
};

// New function to fetch user details
// const fetchUserDetails = async () => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     console.warn('No token found, cannot fetch user details.');
//     return null;
//   }
//   try {
//     const response = await axios.get('http://localhost:8000/api/user', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data; // This should contain user details including role
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     if (error.response && error.response.status === 401) {
//       console.log('Token invalid or expired when fetching user details. Please log in again.');
//       localStorage.removeItem('token'); // Clear the bad token
//     }
//     return null;
//   }
// };

onMounted(async () => {
  // const token = localStorage.getItem('token');
  // console.log('Token from localStorage:', token);

  // if (token) {
  //   const user = await fetchUserDetails(); // Fetch user details
  //   if (user && user.role === 'admin') { // Check the role from the fetched user object
  //     isAdmin.value = true;
  //   } else {
  //     console.warn('User is not an admin or user details could not be fetched.');
  //     isAdmin.value = false;
  //   }
  // } else {
  //   console.warn('No token found in localStorage.');
  //   isAdmin.value = false;
  // }

  // // Only fetch jobs if the user is determined to be an admin
  // if (isAdmin.value) {
    fetchJobs();
  // }/status
});
</script>