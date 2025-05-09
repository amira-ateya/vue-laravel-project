<template>
  
  <div class="container-fluid d-flex">
    <!-- Show only if NOT on login or register paths -->
    <Dashboard v-if="!isAuthPage" />
    <div class="container-fluid d-flex flex-column p-0">
      <HeaderPerPage v-if="!isAuthPage" />
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Dashboard from './components/dashboard/dashboard.vue';
import HeaderPerPage from './components/dashboard/headerPerPage.vue';




const route = useRoute();

const isAuthPage = computed(() => {
  return ['/login', '/register', '/candidateRegister', '/employerRegister'].includes(route.path);
});

</script>
