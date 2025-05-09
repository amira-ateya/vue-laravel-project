<template>
    <div class="stats-card" :style="{ borderLeft: `4px solid ${color}` }">
      <div class="stats-icon" :style="{ backgroundColor: color + '20' }">
        <i :class="`fas fa-${icon}`" :style="{ color }"></i>
      </div>
      <div class="stats-content">
        <h3>{{ title }}</h3>
        <p>{{ value }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    title: String,
    value: [String, Number],
    icon: String,
    color: String
  })
  </script>
  
  <style scoped>
  .stats-card {
    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .stats-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    font-size: 1.25rem;
  }
  
  .stats-content h3 {
    color: #6c757d;
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
    font-weight: 500;
  }
  
  .stats-content p {
    color: #202430;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }
  </style>