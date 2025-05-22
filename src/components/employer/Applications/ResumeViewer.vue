<template>
    <div class="resume-viewer">
      <iframe 
        v-if="resumeUrl"
        :src="resumeUrl"
        class="resume-iframe"
        frameborder="0"
      ></iframe>
      <div v-else class="no-resume">
        <svg xmlns="http://www.w3.org/2000/svg" class="no-resume-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
        </svg>
        <h3>No Resume Available</h3>
        <p>The candidate has not uploaded a resume.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    resumeUrl: {
      type: String,
      default: ''
    }
  })
  </script>
  
  <style scoped>
  .resume-viewer {
    height: 70vh;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .resume-iframe {
    width: 100%;
    height: 100%;
  }
  
  .no-resume {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
  }
  
  .no-resume-icon {
    width: 3rem;
    height: 3rem;
    color: #cbd5e1;
    margin-bottom: 1rem;
  }
  
  .no-resume h3 {
    margin: 0 0 0.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
  }
  
  .no-resume p {
    color: #64748b;
    margin: 0;
  }
  </style>