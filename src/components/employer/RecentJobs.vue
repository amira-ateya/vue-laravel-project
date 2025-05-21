<template>
  <div class="bg-white rounded-2xl p-6 shadow">
    <h3 class="text-xl font-bold text-[#4640DE] mb-4">آخر الوظائف</h3>
    <ul>
      <li
        v-for="job in jobs"
        :key="job.id"
        class="flex justify-between items-center py-2 border-b"
      >
        <span>{{ job.title }}</span>
        <span class="text-sm text-gray-500">{{ new Date(job.created_at).toLocaleDateString() }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps(['jobs'])
</script>

  
  <style scoped>
  .jobs-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .jobs-table th {
    text-align: left;
    padding: 0.75rem 1rem;
    color: #6c757d;
    font-weight: 500;
    font-size: 0.875rem;
    border-bottom: 1px solid #eee;
  }
  
  .jobs-table td {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    color: #202430;
  }
  
  .status-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: capitalize;
  }
  
  .status-badge.approved {
    background-color: #e8f5e9;
    color: #4caf50;
  }
  
  .status-badge.pending {
    background-color: #fff8e1;
    color: #ff9800;
  }
  
  .status-badge.rejected {
    background-color: #ffebee;
    color: #f44336;
  }
  
  .action-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    margin-right: 0.5rem;
    transition: background-color 0.2s;
  }
  
  .action-btn.view {
    color: #4640DE;
  }
  
  .action-btn.edit {
    color: #FF9800;
  }
  
  .action-btn:hover {
    background-color: #f5f5f5;
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