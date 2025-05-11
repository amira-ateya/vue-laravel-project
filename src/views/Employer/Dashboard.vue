<template>
    <div class="employer-dashboard">
      <header class="dashboard-header">
        <h1>Welcome back, {{ employer?.name }}</h1>
        <p>Here's what's happening with your jobs today</p>
      </header>
  
      <div class="stats-grid">
        <StatsCard 
          v-for="stat in statsCards"
          :key="stat.title"
          :title="stat.title"
          :value="stat.value"
          :icon="stat.icon"
          :color="stat.color"
        />
      </div>
  
      <div class="dashboard-content">
        <div class="recent-jobs">
          <RecentJobs :jobs="recentJobs" />
        </div>
        <div class="recent-applications">
          <RecentApplications :applications="recentApplications" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { onMounted } from 'vue'

onMounted(() => {
  console.log('Component mounted')
})
  import { useEmployerStore } from '@/stores/employerStore'
  import { useJobStore } from '@/stores/jobStore'
  import { useApplicationStore } from '@/stores/applicationStore.ts'
  import StatsCard from '@/components/employer/StatsCard.vue'
  import RecentJobs from '@/components/employer/RecentJobs.vue'
  import RecentApplications from '@/components/employer/RecentApplications.vue'
  
  const employerStore = useEmployerStore()
  const jobStore = useJobStore()
  const applicationStore = useApplicationStore()
  
  const employer = computed(() => employerStore.employer)
  const stats = computed(() => employerStore.stats)
  
  const statsCards = computed(() => [
    { title: 'Total Jobs', value: stats.value.totalJobs, icon: 'briefcase', color: '#4640DE' },
    { title: 'Active Jobs', value: stats.value.activeJobs, icon: 'check-circle', color: '#4CAF50' },
    { title: 'Applications', value: stats.value.totalApplications, icon: 'users', color: '#FF9800' },
    { title: 'Pending', value: stats.value.pendingApplications, icon: 'clock', color: '#F44336' }
  ])
  
  const recentJobs = computed(() => jobStore.jobs.slice(0, 5))
  const recentApplications = computed(() => applicationStore.applications.slice(0, 5))
  
  onMounted(async () => {
    await employerStore.fetchEmployerProfile(2) // Assuming employer ID is 2
    await employerStore.fetchEmployerStats(1) // Assuming employer record ID is 1
    await jobStore.fetchJobs()
    await applicationStore.fetchApplications()
  })
  </script>
  
  <style scoped>
  .employer-dashboard {
    padding: 2rem;
    background-color: #f8f9fa;
    min-height: 100vh;
  }
  
  .dashboard-header {
    margin-bottom: 2rem;
  }
  
  .dashboard-header h1 {
    font-size: 2rem;
    color: #202430;
    margin-bottom: 0.5rem;
  }
  
  .dashboard-header p {
    color: #6c757d;
    font-size: 1rem;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .dashboard-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 992px) {
    .dashboard-content {
      grid-template-columns: 1fr;
    }
  }
  
  .recent-jobs, .recent-applications {
    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .recent-jobs h2, .recent-applications h2 {
    color: #202430;
    font-size: 1.25rem;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #eee;
  }
  </style>