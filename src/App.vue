<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Dashboard from './components/dashboard/dashboard.vue';
import HeaderPerPage from './components/dashboard/headerPerPage.vue';

const route = useRoute();

// Hide Sidebar and Header on login pages AND home page
const isAuthPage = computed(() => {
  return ['/', '/login', '/register', '/candidateRegister', '/employerRegister'].includes(route.path);
});
</script>

<template>
  <div class="app-layout d-flex">
    
    <!-- SIDEBAR (Fixed Left) -->
    <Dashboard v-if="!isAuthPage" class="sidebar" />

    <!-- RIGHT SIDE: HEADER + CONTENT -->
    <div class="main-content d-flex flex-column flex-grow-1">
      
      <!-- HEADER (Fixed Top) -->
      <HeaderPerPage v-if="!isAuthPage" class="header" />

      <!-- CONTENT (Scrollable) -->
      <div class="page-content flex-grow-1 overflow-auto">
        <RouterView />
      </div>
      
    </div>
    
  </div>
</template>
