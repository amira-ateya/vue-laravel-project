<template>
  <div class="search-container animate__animated animate__fadeIn">
    <div class="search-box">
      <!-- Keyword input with animation -->
      <div class="search-input animate__animated" :class="{'animate__pulse': animateKeyword}">
        <i class="fas fa-search icon"></i>
        <input 
          type="text" 
          v-model="title"
          class="form-control" 
          placeholder="Job title or keyword"
          @keyup.enter="searchJobs"
          @focus="animateKeyword = true"
          @blur="animateKeyword = false"
        />
      </div>

      <!-- Location input with animation -->
      <div class="search-input animate__animated" :class="{'animate__pulse': animateLocation}">
        <i class="fas fa-map-marker-alt icon"></i>
        <input 
          type="text" 
          v-model="location"
          class="form-control" 
          placeholder="Location"
          @keyup.enter="searchJobs"
          @focus="animateLocation = true"
          @blur="animateLocation = false"
        />
        <i class="fas fa-chevron-down dropdown-icon"></i>
      </div>

      <!-- Search button with animation -->
      <button 
        @click="searchJobs"
        class="search-btn animate__animated"
        :class="{'animate__pulse': animateButton}"
        @mouseenter="animateButton = true"
        @mouseleave="animateButton = false"
      >
        <span class="btn-text">Search</span>
        <i class="fas fa-arrow-right btn-icon"></i>
      </button>
    </div>

    <!-- Popular searches with animation -->
    <div class="popular-searches animate__animated animate__fadeInUp">
      <span class="popular-title">Popular:</span>
      <span 
        v-for="(term, index) in popularTerms" 
        :key="index"
        class="popular-term"
        @click="selectPopularTerm(term)"
      >
        {{ term }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('')
const location = ref('')
const animateKeyword = ref(false)
const animateLocation = ref(false)
const animateButton = ref(false)

const popularTerms = ['UI Designer', 'UX Researcher', 'Android Developer', 'Administrator']

const emit = defineEmits(['search'])

function searchJobs() {
  emit('search', { title: title.value, location: location.value })
}

function selectPopularTerm(term) {
  title.value = term
  searchJobs()
}
</script>

<style scoped>
.search-container {
  width: 100%;
}

.search-box {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.search-input {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-right: 1px solid #eee;
  transition: all 0.3s ease;
}

.search-input:hover {
  background: rgba(0, 0, 0, 0.02);
}

.icon {
  color: #6c757d;
  margin-right: 12px;
  font-size: 1.2rem;
}

.dropdown-icon {
  color: #6c757d;
  margin-left: 12px;
  font-size: 0.9rem;
}

.form-control {
  border: none;
  padding: 18px 0;
  font-size: 1rem;
  background: transparent;
  flex: 1;
}

.form-control:focus {
  box-shadow: none;
}

.search-btn {
  background: linear-gradient(135deg, #4444dc, #6a11cb);
  color: white;
  border: none;
  padding: 18px 30px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: linear-gradient(135deg, #6a11cb, #4444dc);
}

.btn-icon {
  transition: transform 0.3s ease;
}

.search-btn:hover .btn-icon {
  transform: translateX(3px);
}

.popular-searches {
  margin-top: 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  color: #6c757d;
}

.popular-title {
  font-weight: 500;
}

.popular-term {
  background: rgba(108, 117, 125, 0.1);
  padding: 5px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.popular-term:hover {
  background: rgba(68, 68, 220, 0.1);
  color: #4444dc;
}

/* Responsive */
@media (max-width: 768px) {
  .search-box {
    flex-direction: column;
    border-radius: 12px;
  }
  
  .search-input {
    width: 100%;
    padding: 15px;
    border-right: none;
    border-bottom: 1px solid #eee;
  }
  
  .search-btn {
    width: 100%;
    justify-content: center;
    padding: 15px;
  }
  
  .popular-searches {
    gap: 8px;
  }
  
  .popular-term {
    padding: 4px 10px;
    font-size: 0.9rem;
  }
}
</style>