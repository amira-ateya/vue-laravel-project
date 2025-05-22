<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Dashboard from './components/dashboard/dashboard.vue';
import HeaderPerPage from './components/dashboard/headerPerPage.vue';

const route = useRoute();

// Define which pages are auth pages (no sidebar or header)
const isAuthPage = computed(() => {
  return ['/','/login', '/register', '/candidateRegister', '/employerRegister'].includes(route.path);
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
      :class="['content-wrapper', { 'with-sidebar-header': !isAuthPage }]"
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
  overflow: hidden;
  position: relative;
}

/* SIDEBAR */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  overflow-y: auto;
  z-index: 1040;
}

/* HEADER */
.header {
  position: fixed;
  top: 0;
  left: 250px;
  width: calc(100% - 250px);
  height: 60px;
  z-index: 1030;
  background-color: white;
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.1);
}

/* Main content wrapper shared base */
.content-wrapper {
  height: 100vh;
  padding: 1rem;
  overflow-y: auto;
}

/* Extra spacing only when sidebar and header are visible */
.content-wrapper.with-sidebar-header {
  margin-left: 250px;
  margin-top: 60px;
  height: calc(100vh - 60px); /* Account for header */
}

/* Page content area */
.page-content {
  min-height: 100%;
}
</style>
