<template>
  <div v-if="job && job.id" class="container my-5">
    <!-- HEADER SECTION -->
    <section class="bg rounded shadow-sm mb-4">
      <div class="container p-4">
        <div class="d-flex justify-content-between align-items-start bg-light p-4 rounded">
          <div>
            <h2 class="fw-bold">{{ job.title }}</h2>
            <span class="badge border border-primary text-primary rounded-pill px-3 py-2 fw-semibold fs-6 me-2">{{ job.location }}</span>
            <span class="badge border border-danger text-danger rounded-pill px-3 py-2 fw-semibold fs-6">{{ job.work_type }}</span>
          </div>
          <div class="d-flex align-items-center">
            <i class="bi bi-share subtle-bg me-3 fs-4"></i>
            <router-link to="/candidate/apply/2">
              <button class="btn bg-purple text-light rounded-0 p-4 fw-bold fs">Apply</button>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN CONTENT -->
    <div class="row">
      <!-- LEFT COLUMN -->
      <section class="col-lg-8 mt-3">
        <div class="mb-4 p-4 bg-white rounded shadow-sm">
          <h4 class="fw-semibold">Description</h4>
          <p class="fs-5 text-muted">{{ job.description }}</p>
        </div>

        <div class="mb-4 p-4 bg-white rounded shadow-sm">
          <h4 class="fw-semibold">Responsibilities</h4>
          <ul class="list-unstyled mt-3">
            <li v-for="(r, i) in responsibilitiesList" :key="i" class="mb-2">
              <i class="bi bi-check-circle text-success me-2"></i> {{ r }}
            </li>
          </ul>
        </div>

        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <h4 class="fw-semibold mb-3">Required Skills</h4>
            <div class="d-flex flex-wrap gap-2">
              <span v-for="(skill, i) in job.skills" :key="i" class="skill-tag">{{ skill }}</span>
              <span v-for="(tech, i) in job.technologies" :key="`tech-${i}`" class="skill-tag">{{ tech }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- RIGHT COLUMN -->
      <section class="col-lg-4 mt-3">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body">
            <span class="fw-semibold mb-3 me-3 fs-5">Category: </span>
            <span class="badge bg-primary-subtle text-primary p-3 fs-6">
              {{ job.category?.category_name || 'Unknown' }}
            </span>
          </div>
        </div>

        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body">
            <p><strong>Apply Before:</strong> {{ formatDate(job.deadline) }}</p>
            <p><strong>Posted On:</strong> {{ formatDate(job.created_at) }}</p>
            <p><strong>Job Type:</strong> {{ job.work_type }}</p>
            <p><strong>Salary:</strong> {{ job.salary_from }} - {{ job.salary_to }} USD</p>
          </div>
        </div>
      </section>
    </div>

    <!-- PERKS & BENEFITS -->
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
              <h4 class="card-title fw-semibold">{{ perk.title }}</h4>
              <p class="card-text text-muted">{{ perk.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// imports
import { ref, computed, onMounted } from 'vue';
import { useJobStore } from '@/stores/jobStore';
import { useRoute } from 'vue-router';

// variables
const jobStore = useJobStore();
const route = useRoute();
const jobId = ref(route.params.id);

// fetching the data
onMounted(async () => {
  await jobStore.fetchJobs();
});

// get the job data
const job = computed(() => {
  return jobStore.jobs.find(j => j.id == jobId.value) || {};
});

// handle responsibilities
const responsibilitiesList = computed(() => {
  if (!job.value.responsibilities) return [];
  return job.value.responsibilities
    .split('.')
    .map(r => r.trim())
    .filter(r => r.length > 0);
});

// format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// perks data
const perks = [
  {
    icon: 'bi bi-heart-pulse',
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
.bg-purple {
  background-color: #4444dc !important;
}

.bg {
  background-color: #e9f2fb;
}

.card-title {
  font-size: 1.2rem;
}

.skill-tag {
  background-color: #f5f7ff;
  color: #4f46e5;
  font-size: 1.25rem;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 12px;
  white-space: nowrap;
}

.subtle-bg {
  background-color: #f1f8f1;
  border-radius: 50%;
  padding: 5px;
}
</style>
