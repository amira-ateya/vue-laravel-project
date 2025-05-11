<template>
    <div class="recent-jobs">
      <h2>Recent Job Postings</h2>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <table class="jobs-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Applications</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="job in jobs" :key="job.id">
              <td>{{ job.title }}</td>
              <td>{{ job.applications_count || 0 }}</td>
              <td>
                <span class="status-badge" :class="job.status">{{ job.status }}</span>
              </td>
              <td>
                <button class="action-btn view">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit">
                  <i class="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <router-link to="/employer/jobs" class="view-all">
          View All Jobs <i class="fas fa-arrow-right"></i>
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    jobs: Array,
    loading: Boolean
  })
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