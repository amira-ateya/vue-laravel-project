<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <!-- Logo Section with Animation -->
      <div class="logo-container" @click="toggleCollapse">
        <img src="./../../../public/logo.svg" alt="Logo" class="logo" :class="{ 'logo-collapsed': isCollapsed }">
      </div>

      <!-- Navigation Links -->
      <nav class="nav-links">
        <!-- Candidate View -->
        <template v-if="userRole === 'candidate'">
          <router-link
            to="/candidate/dashboard"
            class="nav-item"
            :class="{ active: route.path === '/candidate/dashboard' }"
          >
            <div class="nav-icon">
              <i class="fas fa-home"></i>
            </div>
            <span class="nav-text" :class="{ 'text-collapsed': isCollapsed }">Dashboard</span>
            <div class="active-indicator" v-if="route.path === '/candidate/dashboard'"></div>
          </router-link>
          
          <router-link
            to="/candidate/applications"
            class="nav-item"
            :class="{ active: route.path === '/candidate/applications' }"
          >
            <div class="nav-icon">
              <i class="fas fa-file-alt"></i>
            </div>
            <span class="nav-text" :class="{ 'text-collapsed': isCollapsed }">My Applications</span>
            <div class="active-indicator" v-if="route.path === '/candidate/applications'"></div>
          </router-link>
          
          <router-link
            to="/candidate/jobs"
            class="nav-item"
            :class="{ active: route.path === '/candidate/jobs' }"
          >
            <div class="nav-icon">
              <i class="fas fa-search"></i>
            </div>
            <span class="nav-text" :class="{ 'text-collapsed': isCollapsed }">Find Jobs</span>
            <div class="active-indicator" v-if="route.path === '/candidate/jobs'"></div>
          </router-link>
          
          <router-link
            to="/candidate/profile"
            class="nav-item"
            :class="{ active: route.path === '/candidate/profile' }"
          >
            <div class="nav-icon">
              <i class="fas fa-user"></i>
            </div>
            <span class="nav-text" :class="{ 'text-collapsed': isCollapsed }">My Profile</span>
            <div class="active-indicator" v-if="route.path === '/candidate/profile'"></div>
          </router-link>
        </template>

        <!-- Employer View -->
        <template v-else-if="userRole === 'employer'">
          <router-link
            to="/employer/dashboard"
            class="nav-item"
            :class="{ active: route.path === '/employer/dashboard' }"
          >
            <div class="nav-icon">
              <i class="fas fa-home"></i>
            </div>
            <span class="nav-text" :class="{ 'text-collapsed': isCollapsed }">Dashboard</span>
            <div class="active-indicator" v-if="route.path === '/employer/dashboard'"></div>
          </router-link>
          
          <router-link
            to="/employer/applications"
            class="nav-item"
            :class="{ active: route.path === '/employer/applications' }"
          >
            <div class="nav-icon">
              <i class="fas fa-briefcase"></i>
            </div>
            <span class="nav-text" :class="{ 'text-collapsed': isCollapsed }">All Applicants</span>
            <div class="active-indicator" v-if="route.path === '/employer/applications'"></div>
          </router-link>
          
          <router-link
            to="/employer/job-listing"
            class="nav-item"
            :class="{ active: route.path === '/employer/job-listing' }"
          >
            <div class="nav-icon">
              <i class="fas fa-users"></i>
            </div>
            <span class="nav-text" :class="{ 'text-collapsed': isCollapsed }">Job Listing</span>
            <div class="active-indicator" v-if="route.path === '/employer/job-listing'"></div>
          </router-link>
        </template>
      </nav>
    </div>

    <!-- User Profile Section -->
    <div class="user-profile" :class="{ 'profile-collapsed': isCollapsed }">
      <div class="user-avatar">
        <img :src="userImage" alt="User Avatar">
      </div>
      <div class="user-details" v-if="!isCollapsed">
        <div class="user-name">{{ user.name }}</div>
        <div class="user-email">{{ user.email }}</div>
      </div>
      <button class="logout-btn" @click="logout" :title="isCollapsed ? 'Logout' : ''">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const userRole = ref('candidate');
const isCollapsed = ref(false);

const user = ref({});
const base = 'http://localhost:8000/storage/';
const userImage = ref('');

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

onMounted(async () => {
  const res = await axios.get('http://localhost:8000/api/user');
  user.value = res.data;
  userImage.value = base + res.data.profile_picture;
});

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const updateUserRole = () => {
  userRole.value = route.path.split('/')[1] || '';
};
watch(route, updateUserRole, { immediate: true });
onMounted(updateUserRole);

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.sidebar {
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #1a237e 0%, #303f9f 100%);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
  transition: all 0.3s ease;
}

.sidebar.collapsed {
  width: 80px;
}

.logo-container {
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo {
  max-width: 160px;
  height: auto;
  transition: all 0.3s ease;
}

.logo-collapsed {
  max-width: 40px;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px;
  transition: all 0.3s ease;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateX(5px);
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 500;
}

.nav-item.active .active-indicator {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: white;
  border-radius: 4px 0 0 4px;
  animation: slideIn 0.3s ease;
}

.nav-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 16px;
  flex-shrink: 0;
}

.nav-text {
  font-size: 15px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.text-collapsed {
  opacity: 0;
  width: 0;
  margin-right: 0;
  position: absolute;
}

.user-profile {
  display: flex;
  align-items: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.profile-collapsed {
  justify-content: center;
  padding: 16px 8px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.profile-collapsed .user-avatar {
  margin-right: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  flex: 1;
  transition: all 0.3s ease;
  overflow: hidden;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 2px;
  white-space: nowrap;
}

.user-email {
  font-size: 12px;
  opacity: 0.8;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.logout-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: rotate(180deg);
}

/* Scrollbar styling */
.sidebar-content::-webkit-scrollbar {
  width: 6px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.sidebar-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Animations */
@keyframes slideIn {
  from {
    transform: translateX(-10px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Hover effects for collapsed state */
.sidebar.collapsed .nav-item {
  padding: 12px;
  justify-content: center;
}

.sidebar.collapsed .nav-item:hover .nav-text {
  display: block;
  position: absolute;
  left: 100%;
  background: #303f9f;
  padding: 12px 16px;
  border-radius: 0 8px 8px 0;
  margin-left: 8px;
  opacity: 1;
  width: auto;
  z-index: 100;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>