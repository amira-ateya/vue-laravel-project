<template>
  <main class="container py-5">
    <!-- Profile Header -->
    <section class="row mb-4">
      <article class="col-md-9">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body d-flex align-items-center p-4">
            <img
              :src="user.photo || placeholderImage"
              alt="Profile Photo"
              class="rounded-circle border me-4"
              width="100"
              height="100"
              loading="lazy"
            />
            <div>
              <h1 class="h3 fw-semibold mb-1">{{ user.name }}</h1>
              <p class="text-muted mb-0">
                <i class="fas fa-briefcase me-2" aria-hidden="true"></i>
                {{ candidate.title }} at <strong>{{ candidate.company }}</strong>
              </p>
              <p class="text-muted mb-1">
                <i class="fas fa-map-marker-alt me-2" aria-hidden="true"></i>
                {{ candidate.location }}
              </p>
              <span class="badge bg-success px-3 py-1">
                <i class="fas fa-smile me-1" aria-hidden="true"></i>
                Open for Opportunities
              </span>
            </div>
            <div class="ms-auto">
              <button type="button" class="btn btn-primary btn-sm px-4 py-2" aria-label="Edit Profile">
                <i class="fas fa-edit me-2" aria-hidden="true"></i> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </article>

      <aside class="col-md-3">
        <div class="card mb-3 shadow-sm border-0 rounded-4">
          <div class="card-body">
            <h2 class="h6 text-uppercase fw-bold text-muted small mb-3">
              <i class="fas fa-info-circle me-2" aria-hidden="true"></i>Additional Details
            </h2>
            <p class="mb-2">
              <i class="fas fa-envelope me-2" aria-hidden="true"></i>
              <strong>Email:</strong>
              <a :href="`mailto:${user.email}`">{{ user.email }}</a>
            </p>
            <p class="mb-2">
              <i class="fas fa-phone me-2" aria-hidden="true"></i>
              <strong>Phone:</strong> {{ candidate.phone_number || 'N/A' }}
            </p>
            <p>
              <i class="fas fa-language me-2" aria-hidden="true"></i>
              <strong>Languages:</strong> {{ candidate.languages || 'N/A' }}
            </p>
          </div>
        </div>

        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body">
            <h2 class="h6 text-uppercase fw-bold text-muted small mb-3">
              <i class="fas fa-link me-2" aria-hidden="true"></i>Social Links
            </h2>
            <p v-if="candidate.linkedin_profile">
              <i class="fab fa-linkedin me-2" aria-hidden="true"></i>
              <a
                :href="candidate.linkedin_profile"
                target="_blank"
                rel="noopener noreferrer"
                class="text-decoration-none"
              >
                LinkedIn Profile
              </a>
            </p>
            <p v-else class="text-muted">No social links available.</p>
          </div>
        </div>
      </aside>
    </section>

    <!-- About Me -->
    <section class="card mb-4 shadow-sm border-0 rounded-4">
      <div class="card-body">
        <h2 class="h5 fw-semibold mb-3">
          <i class="fas fa-user me-2" aria-hidden="true"></i>About Me
        </h2>
        <p class="text-muted">{{ user.about || 'This user has not added an about section yet.' }}</p>
      </div>
    </section>

    <!-- Experience -->
    <section class="card mb-4 shadow-sm border-0 rounded-4">
      <div class="card-body">
        <h2 class="h5 fw-semibold mb-3">
          <i class="fas fa-briefcase me-2" aria-hidden="true"></i>Experience
        </h2>
        <ul class="list-unstyled mb-0">
          <li><i class="fas fa-briefcase me-2" aria-hidden="true"></i><strong>Position:</strong> {{ candidate.title }}</li>
          <li><i class="fas fa-chart-line me-2" aria-hidden="true"></i><strong>Experience Level:</strong> {{ candidate.experience_level }}</li>
          <li><i class="fas fa-map-marker-alt me-2" aria-hidden="true"></i><strong>Location:</strong> {{ candidate.location }}</li>
        </ul>
      </div>
    </section>
  </main>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const candidate = ref({});
const user = ref({});
const loading = ref(false);
const error = ref(null);

const placeholderImage = 'https://via.placeholder.com/100';

const fetchUserAndCandidate = async () => {
  loading.value = true;
  try {
    // 1. Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. User is not logged in.');
    }

    // 2. Set token as default Authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // 3. Fetch the authenticated user
    const userRes = await axios.get('http://localhost:8000/api/user');
    user.value = userRes.data;

    // 4. Fetch candidate data using user ID
    const candidateRes = await axios.get(`http://localhost:8000/api/candidates?user_id=${user.value.id}`);
    candidate.value = candidateRes.data[0] || {}; // assuming one candidate per user

  } catch (err) {
    console.error(err);
    error.value = 'Failed to fetch user or candidate data.';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUserAndCandidate);
</script>

<style scoped>
h1,
h2 {
  letter-spacing: 0.02em;
}

.card-body {
  line-height: 1.5;
}

.badge {
  font-size: 0.85rem;
}

a {
  color: #0d6efd;
}

a:hover,
a:focus {
  text-decoration:none
}
</style>
