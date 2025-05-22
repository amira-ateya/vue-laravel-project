<template>
    <div class="stats-grid">
      <!-- Total Applications Card -->
      <div class="stat-card stat-total">
        <div class="stat-content">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div class="stat-info">
            <h3 class="stat-title">Total Applications</h3>
            <p class="stat-value">{{ stats.total }}</p>
          </div>
        </div>
      </div>
  
      <!-- Pending Applications Card -->
      <div class="stat-card stat-pending">
        <div class="stat-content">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="stat-info">
            <h3 class="stat-title">Pending</h3>
            <p class="stat-value">{{ stats.pending }}</p>
          </div>
        </div>
      </div>
  
      <!-- Accepted Applications Card -->
      <div class="stat-card stat-accepted">
        <div class="stat-content">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="stat-info">
            <h3 class="stat-title">Accepted</h3>
            <p class="stat-value">{{ stats.accepted }}</p>
          </div>
        </div>
      </div>
  
      <!-- Rejected Applications Card -->
      <div class="stat-card stat-rejected">
        <div class="stat-content">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div class="stat-info">
            <h3 class="stat-title">Rejected</h3>
            <p class="stat-value">{{ stats.rejected }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    stats: {
      type: Object,
      required: true,
      default: () => ({
        total: 0,
        pending: 0,
        accepted: 0,
        rejected: 0
      })
    }
  })
  </script>
  
  <style scoped>
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }
  
  .stat-card {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .stat-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
  }
  
  .stat-total::before { background-color: #4a6cf7; }
  .stat-pending::before { background-color: #f59e0b; }
  .stat-accepted::before { background-color: #10b981; }
  .stat-rejected::before { background-color: #ef4444; }
  
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .stat-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .stat-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .stat-total .stat-icon {
    background-color: rgba(74, 108, 247, 0.1);
    color: #4a6cf7;
  }
  
  .stat-pending .stat-icon {
    background-color: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
  }
  
  .stat-accepted .stat-icon {
    background-color: rgba(16, 185, 129, 0.1);
    color: #10b981;
  }
  
  .stat-rejected .stat-icon {
    background-color: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
  
  .stat-icon svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .stat-info {
    flex: 1;
  }
  
  .stat-title {
    font-size: 0.875rem;
    color: #718096;
    margin: 0 0 0.25rem;
    font-weight: 500;
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2d3748;
    margin: 0;
    line-height: 1;
  }
  
  /* Animation for stats change */
  .stat-card:hover .stat-value {
    animation: pulse 0.5s ease;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  </style>