<template>
    <div class="recent-applications">
      <h2>Recent Applications</h2>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <table class="applications-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Job</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="app in applications" :key="app.id">
              <td>{{ app.candidate?.user?.name }}</td>
              <td>{{ app.job?.title }}</td>

              <td>
                <span class="status-badge" :class="app.status">{{ app.status }}</span>
              </td>
              <td>{{ formatDate(app.created_at) }}</td>
            </tr>
          </tbody>
        </table>
        <router-link to="/employer/applications" class="view-all">
          View All Applications <i class="fas fa-arrow-right"></i>
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { format } from 'date-fns'
  
  defineProps({
    applications: Array,
    loading: Boolean
  })
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy')
  }
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