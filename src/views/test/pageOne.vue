<template>
    <div class="p-4">
      <h2>Page One</h2>
  
      <input v-model="formData.name" placeholder="Enter name" class="form-control mb-2" />
      <input v-model="formData.email" placeholder="Enter email" class="form-control mb-2" />
      <input v-model="formData.phone" placeholder="Enter phone" class="form-control mb-2" />
      <input v-model="formData.linkedin" placeholder="LinkedIn URL" class="form-control mb-2" />
  
      <button @click="goToPageTwo" class="btn btn-primary">Send to Page Two</button>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  // All form fields in one object
  const formData = reactive({
    name: '',
    email: '',
    phone: '',
    linkedin: ''
  })
  
  function goToPageTwo() {
    router.push({
      path: '/page-two',
      state: { ...formData } // spread into plain object
    })
  }
  </script>
  