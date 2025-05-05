<template>
  <div class="container-fluid d-flex">
    <Dashboard />

    <!-- right side -->
    <div class="container-fluid d-flex flex-column  p-0">
      <HeaderPerPage/>
      <RouterView />
    </div>
  </div>

</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Dashboard from './components/dashboard/dashboard.vue';
import HeaderPerPage from './components/dashboard/headerPerPage.vue';



</script>



<style scoped>

</style>
