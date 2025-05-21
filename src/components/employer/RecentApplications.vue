<!-- components/employer/LatestApplications.vue -->
<template>
  <div class="bg-white rounded-2xl p-6 shadow">
    <h3 class="text-xl font-bold text-[#4640DE] mb-4">آخر الطلبات</h3>
    <ul>
      <li
        v-for="app in applications"
        :key="app.id"
        class="flex justify-between items-center py-2 border-b"
      >
        <div>
          <p class="font-semibold">{{ app.candidate_name }}</p>
          <p class="text-sm text-gray-500">{{ app.job_title }}</p>
        </div>
        <span class="text-sm text-gray-400">{{ new Date(app.created_at).toLocaleDateString() }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps(['applications'])
</script>

  
  <style scoped>
  .applications-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .applications-table th {
    text-align: left;
    padding: 0.75rem 1rem;
    color: #6c757d;
    font-weight: 500;
    font-size: 0.875rem;
    border-bottom: 1px solid #eee;
  }
  
  .applications-table td {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    color: #202430;
    font-size: 0.875rem;
  }
  
  .status-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: capitalize;
  }
  
  .status-badge.pending {
    background-color: #fff8e1;
    color: #ff9800;
  }
  
  .status-badge.reviewed {
    background-color: #e3f2fd;
    color: #2196f3;
  }
  
  .status-badge.hired {
    background-color: #e8f5e9;
    color: #4caf50;
  }
  
  .status-badge.rejected {
    background-color: #ffebee;
    color: #f44336;
  }
  
  .view-all {
    display: inline-block;
    margin-top: 1rem;
    color: #4640DE;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.875rem;
  }
  
  .view-all i {
    margin-left: 0.5rem;
    transition: transform 0.2s;
  }
  
  .view-all:hover i {
    transform: translateX(4px);
  }
  </style>