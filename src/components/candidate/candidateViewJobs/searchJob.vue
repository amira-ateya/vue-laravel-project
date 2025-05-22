<script setup>
import { ref, defineEmits } from 'vue'

const title = ref('')
const location = ref('')

const emit = defineEmits(['search'])

function searchJobs() {
  emit('search', { title: title.value, location: location.value })
}
</script>

<template>
  <div class="px-5 pt-4">
    <div class="d-flex align-items-center border rounded-0 p-4 gap-3">

      <!-- Keyword input -->
      <div class="d-flex align-items-center flex-grow-1 border-end pe-3">
        <i class="fas fa-search me-2 text-muted fa-2x"></i>
        <input 
          type="text" 
          v-model="title"
          class="form-control border-0 p-0 ms-2" 
          placeholder="Job title or keyword"
          @keyup.enter="searchJobs"
        />
      </div>

      <!-- Location input -->
      <div class="d-flex align-items-center flex-grow-1 ps-3">
        <i class="fas fa-map-marker-alt me-2 text-muted fa-2x"></i>
        <input 
          type="text" 
          v-model="location"
          class="form-control border-0 p-0 ms-2" 
          placeholder="Florence, Italy"
          @keyup.enter="searchJobs"
        />
        <i class="fas fa-chevron-down ms-2 text-muted"></i>
      </div>

      <!-- Search button -->
      <button 
        @click="searchJobs"
        class="btn bg-purple text-white fw-bold fs-5 px-5 py-3 rounded-0"
      >
        Search
      </button>

    </div>

    <h5 class="text-secondary mt-3">Popular: UI Designer, UX researcher, Android, Admin</h5>
  </div>
</template>

<style scoped>
.bg-purple {
  background-color: #4444dc !important;
}
</style>
