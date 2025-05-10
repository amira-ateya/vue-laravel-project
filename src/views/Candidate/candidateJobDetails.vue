<template>
  <div v-if="job && job.id" class="container my-5">
    
    <!-- HEADER SECTION -->
    <section class="bg">
      <div class="container p-4">
        <div class="d-flex justify-content-between align-items-start mb-4 bg-light p-3">
          <div>
            <h1 class="h3">{{ job.title }}</h1>
            <p class="text-muted">{{ job.employer_name }} • {{ job.location }} • Full-Time</p>
          </div>
          <div>
            <i class="bi bi-share subtle-bg me-2"></i>
            <router-link :to="{ name: 'applyModel', params: { jobId: job.id } }">
              <button class="btn btn-primary">Apply</button>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN CONTENT SECTION -->
    <div class="row">
      <!-- LEFT COLUMN SECTION -->
      <section class="col-lg-8">
        <div class="mb-4">
          <h5>Description</h5>
          <p>{{ job.description }}</p>
        </div>

        <div class="mb-4">
          <h5>Responsibilities</h5>
          <ul class="list-unstyled">
            <li v-for="(r, i) in job.responsibilities" :key="i" class="mb-2">
              <i class="bi bi-check-circle text-success subtle-bg me-2"></i>
              {{ r }}
            </li>
          </ul>
        </div>

        <div class="mb-4">
          <h5>Who You Are</h5>
          <ul class="list-unstyled">
            <li v-for="(w, i) in whoYouAre" :key="i" class="mb-2">
              <i class="bi bi-check-circle-fill text-success me-2"></i>{{ w }}
            </li>
          </ul>
        </div>

        <div class="mb-4">
          <h5>Nice-To-Haves</h5>
          <ul class="list-unstyled">
            <li v-for="(n, i) in niceToHaves" :key="i" class="mb-2">
              <i class="bi bi-check-circle-fill text-success me-2"></i>{{ n }}
            </li>
          </ul>
        </div>
      </section>

      <!-- RIGHT COLUMN SECTION -->
      <section class="col-lg-4">
        <div class="card border-0 shadow-none">
          <div class="card-body">
            <h6 class="card-title">About this role</h6>
            <p class="mb-2"><i class="bi bi-people me-2"></i>   {{ job.candidates_id.length }} applied of 10 capacity</p>
            <div>Apply Before    {{ formatDate(job.deadline) }}</div>
            <div>Posted On  {{ formatDate(job.created_at) }}</div>
            <div>Job Type      {{ job.work_type }}</div>
            <div>Salary       {{ job.salary_from }} - {{ job.salary_to }} USD</div>
          </div>
        </div>

        <hr>

        <div class="card border-0 shadow-none">
          <div class="card-body">
            <h6 class="fs-4 fw-2">Categories</h6>
            <div class="d-flex flex-wrap gap-2">
              <span v-for="(cat, i) in job.categories_id" :key="i" class="badge bg-primary-subtle text-primary me-1">
                Category {{ cat }}
              </span>
            </div>
          </div>
        </div>

        <hr>

        <div class="card border-0 shadow-none">
          <div class="card-body">
            <h6 class="fw-bold mb-3">Required Skills</h6>
            <div class="d-flex flex-wrap gap-2">
              <span
                v-for="(skill, i) in job.skills"
                :key="i"
                class="skill-tag"
              >
                {{ skill }}
              </span>
              <span
                v-for="(tech, i) in job.technologies"
                :key="`tech-${i}`"
                class="skill-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
<hr>
    <!-- PERKS & BENEFITS SECTION -->
    <section class="container my-5">
      <h2 class="fw-bold">Perks & Benefits</h2>
      <p class="text-muted mb-4">This job comes with several perks and benefits</p>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div v-for="(perk, index) in perks" :key="index" class="col">
          <div class="card h-100 shadow-sm border-0">
            <div class="card-body">
              <div class="mb-3 fs-2 text-primary">
                <i :class="perk.icon"></i>
              </div>
              <h5 class="card-title fw-semibold">{{ perk.title }}</h5>
              <p class="card-text text-muted">{{ perk.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>



<script setup>
import { ref, onMounted, computed } from 'vue';
import { useJobStore } from '@/stores/jobStore';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const jobStore = useJobStore();
const { jobs } = storeToRefs(jobStore);

const route = useRoute();
const jobId = ref(parseInt(route.params.id));
// const job = computed(() =>
//   jobs.value.find(j => j.id === jobId.value) || {}

// );
const job = computed(() => {

  const foundJob = jobs.value.find(j => j.id === jobId.value.toString());
  console.log('Found job:', foundJob); // Log the found job for debugging

  return foundJob || {}; // If job not found, return an empty object
});


// console.log('Found job:', foundJob);
console.log('Job ID from route:', jobId.value);

onMounted(async () => {
  await jobStore.fetchJobs();
  console.log('Fetched jobs:', jobs.value);
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
const perks = [
  {
    icon: 'bi bi-heart-pulse', // Replace with your custom SVG or icon class
    title: 'Full Healthcare',
    description: 'We believe in thriving communities and that starts with our team being happy and healthy.',
  },
  {
    icon: 'bi bi-airplane-engines',
    title: 'Unlimited Vacation',
    description: 'You should have a flexible schedule that makes space for family, wellness, and fun.',
  },
  {
    icon: 'bi bi-lightbulb',
    title: 'Skill Development',
    description: 'We believe in always learning and leveling up our skills. Whether it’s a conference or course.',
  },
  {
    icon: 'bi bi-people',
    title: 'Team Summits',
    description: 'Every 6 months we have a full team summit to have fun, reflect, and plan the quarter.',
  },
  {
    icon: 'bi bi-house-door',
    title: 'Remote Working',
    description: 'Work from home, coffee shop or anywhere you perform best.',
  },
  {
    icon: 'bi bi-truck',
    title: 'Commuter Benefits',
    description: 'We’re grateful for the time and energy each team member puts into getting to work.',
  },
  {
    icon: 'bi bi-gift',
    title: 'We Give Back',
    description: 'We anonymously match employee donations (up to $600) for causes they care about.',
  },
];
</script>
<style scoped>
  .card-title {
  font-size: 1.2rem;
}
.skill-tag {
  background-color: #f5f7ff; /* Light blue background */
  color: #4f46e5;            /* Indigo-ish text color */
  font-size: 0.875rem;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 12px;
  white-space: nowrap;
}
.subtle-bg {
    background-color: #f1f8f1; /* Light, subtle background color */
    border-radius: 50%;        /* Rounded background */
    padding: 5px;              /* Padding around the icon */
  }
  .bg{
    background-color: rgb(210, 223, 238);
  }

</style>