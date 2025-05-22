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

<template>
  <div class="app-layout">
    
    <!-- SIDEBAR -->
    <Dashboard
      v-if="!isAuthPage"
      class="sidebar"
    />

    <!-- HEADER -->
    <HeaderPerPage
      v-if="!isAuthPage"
      class="header"
    />

    <!-- MAIN CONTENT CONTAINER -->
    <div
      class="content-wrapper"
      :style="!isAuthPage ? 'margin-left: 250px; margin-top: 60px;' : ''"
    >
      <div class="page-content">
        <RouterView />
      </div>
    </div>

  </div>
</template>

<style scoped>
.app-layout {
  height: 100vh;
  width: 100%;
  overflow: hidden; /* prevents body scroll */
  position: relative;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  overflow-y: auto; /* scroll inside sidebar */
  z-index: 1040;
}

.header {
  position: fixed;
  top: 0;
  left: 250px;
  width: calc(100% - 250px);
  height: 60px;
  z-index: 1030;
  background-color: white; /* add bg if needed */
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.1); /* subtle shadow */
}

.content-wrapper {
  height: calc(100vh - 60px);
  overflow-y: auto; /* scroll main content */
  padding: 1rem;
  margin-left: 250px;
  margin-top: 60px;
}

.page-content {
  min-height: 100%;
}
</style>
