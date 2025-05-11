<template>
    <span :class="['status-chip', status]">
      {{ status }}
    </span>
  </template>
  
  <script setup>
  defineProps({
    status: {
      type: String,
      required: true,
      validator: (value) => ['pending', 'accepted', 'rejected'].includes(value)
    }
  })
  </script>
  
  <style scoped>
  .status-chip {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: capitalize;
  }
  
  .status-chip.pending {
    background-color: #fef3c7;
    color: #92400e;
  }
  
  .status-chip.accepted {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  .status-chip.rejected {
    background-color: #fee2e2;
    color: #991b1b;
  }
  </style>