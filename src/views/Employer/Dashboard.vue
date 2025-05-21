<template>
  <div class="employer-dashboard">
    <!-- Header Section -->
    <div class="dashboard-header">
      <div>
        <h1>Welcome, {{ employerData.user.name }}</h1>
        <p>Overview of your job postings and applications</p>
      </div>
      <div class="header-actions">
        <button class="btn-primary" @click="navigateTo('/employer/post-job')">
          <i class="fas fa-plus"></i> Post New Job
        </button>
        <div class="user-dropdown">
          <img :src="employerData.user.profile_picture || 'https://via.placeholder.com/40'" 
               @click="toggleDropdown">
          <div v-if="dropdownOpen" class="dropdown-menu">
            <router-link to="/employer/profile">Profile</router-link>
            <router-link to="/settings">Settings</router-link>
            <a @click="logout">Logout</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon bg-blue-100">
          <i class="fas fa-briefcase text-blue-600"></i>
        </div>
        <div class="stat-content">
          <h3>Total Jobs</h3>
          <p>{{ stats.jobs }}</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon bg-green-100">
          <i class="fas fa-file-alt text-green-600"></i>
        </div>
        <div class="stat-content">
          <h3>Applications</h3>
          <p>{{ stats.applications }}</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon bg-yellow-100">
          <i class="fas fa-check-circle text-yellow-600"></i>
        </div>
        <div class="stat-content">
          <h3>Active Jobs</h3>
          <p>{{ stats.active_jobs }}</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon bg-purple-100">
          <i class="fas fa-user-check text-purple-600"></i>
        </div>
        <div class="stat-content">
          <h3>Hired Candidates</h3>
          <p>{{ stats.hired_candidates }}</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="dashboard-content">
      <!-- Recent Jobs -->
      <div class="dashboard-card">
        <div class="card-header">
          <h2>Recent Job Postings</h2>
          <router-link to="/employer/jobs">View All</router-link>
        </div>
        <div v-if="loading" class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <div v-else class="card-body">
          <table class="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Applications</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="job in latestJobs" :key="job.id">
                <td>{{ job.title }}</td>
                <td>{{ job.location }}</td>
                <td>{{ job.applications_count }}</td>
                <td>
                  <span :class="`status-badge ${job.status}`">
                    {{ job.status }}
                  </span>
                </td>
                <td>
                  <button @click="viewJob(job.id)" class="btn-icon">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button @click="editJob(job.id)" class="btn-icon">
                    <i class="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Recent Applications -->
      <div class="dashboard-card">
        <div class="card-header">
          <h2>Recent Applications</h2>
          <router-link to="/employer/applications">View All</router-link>
        </div>
        <div v-if="loading" class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <div v-else class="card-body">
          <table class="data-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Job Title</th>
                <th>Applied On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="app in latestApplications" :key="app.id">
                <td>
                  <div class="candidate-info">
                    <img :src="app.candidate?.profile_picture || 'https://via.placeholder.com/40'">
                    {{ app.candidate?.user?.name }}
                  </div>
                </td>
                <td>{{ app.job?.title }}</td>
                <td>{{ formatDate(app.created_at) }}</td>
                <td>
                  <span :class="`status-badge ${app.status}`">
                    {{ app.status }}
                  </span>
                </td>
                <td>
                  <button @click="viewApplication(app.id)" class="btn-text">
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="quick-stats">
      <div class="stats-section">
        <h3>Applications Status</h3>
        <div class="status-chart">
          <div class="chart-item pending">
            <span>{{ applicationsStatus.pending }}</span>
            <p>Pending</p>
          </div>
          <div class="chart-item approved">
            <span>{{ applicationsStatus.approved }}</span>
            <p>Approved</p>
          </div>
          <div class="chart-item rejected">
            <span>{{ applicationsStatus.rejected }}</span>
            <p>Rejected</p>
          </div>
        </div>
      </div>
      
      <div class="stats-section">
        <h3>Top Jobs</h3>
        <div class="top-jobs">
          <div v-for="job in topJobs" :key="job.id" class="job-item">
            <p>{{ job.title }}</p>
            <span>{{ job.applications_count }} applications</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      employerData: {
        user: {
          name: '',
          profile_picture: ''
        }
      },
      stats: {
        jobs: 0,
        applications: 0,
        active_jobs: 0,
        hired_candidates: 0
      },
      latestJobs: [],
      latestApplications: [],
      applicationsStatus: {
        pending: 0,
        approved: 0,
        rejected: 0
      },
      topJobs: [],
      loading: true,
      dropdownOpen: false
    }
  },
  async created() {
    await this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        
        const [
          profileRes, 
          statsRes, 
          jobsRes, 
          appsRes,
          statusRes,
          
        ] = await Promise.all([
          axios.get('/employer/profile', { headers }),
          axios.get('/employer/stats', { headers }),
          axios.get('/employer/latest-jobs', { headers }),
          axios.get('/employer/latest-applications', { headers }),
          axios.get('/employer/applications-status', { headers })
        ]);

        this.employerData = profileRes.data;
        this.stats = statsRes.data;
        this.latestJobs = jobsRes.data;
        this.latestApplications = appsRes.data;
        this.applicationsStatus = statusRes.data;

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    viewJob(id) {
      this.$router.push(`/employer/job/${id}`);
    },
    editJob(id) {
      this.$router.push(`/employer/edit-job/${id}`);
    },
    viewApplication(id) {
      this.$router.push(`/employer/applications/${id}`);
    },
    navigateTo(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>
.employer-dashboard {
  padding: 2rem;
  background-color: #f8fafc;
  min-height: 100vh;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 1.8rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.dashboard-header p {
  color: #64748b;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-dropdown {
  position: relative;
}

.user-dropdown img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  min-width: 150px;
  z-index: 10;
}

.dropdown-menu a {
  display: block;
  padding: 0.5rem 1rem;
  color: #334155;
  text-decoration: none;
}

.dropdown-menu a:hover {
  background-color: #f1f5f9;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.stat-content h3 {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.stat-content p {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.dashboard-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  .dashboard-content {
    grid-template-columns: 1fr 1fr;
  }
}

.dashboard-card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  font-size: 1.25rem;
  color: #1e293b;
  margin: 0;
}

.card-header a {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
}

.card-header a:hover {
  text-decoration: underline;
}

.card-body {
  padding: 1.5rem;
}

.loading-spinner {
  padding: 2rem;
  text-align: center;
  color: #3b82f6;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 0.75rem;
  color: #64748b;
  font-weight: 500;
  font-size: 0.875rem;
  border-bottom: 1px solid #e2e8f0;
}

.data-table td {
  padding: 1rem 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
  font-size: 0.875rem;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
  display: inline-block;
}

.status-badge.pending {
  background-color: #fef3c7;
  color: #d97706;
}

.status-badge.approved {
  background-color: #dcfce7;
  color: #16a34a;
}

.status-badge.rejected {
  background-color: #fee2e2;
  color: #dc2626;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-icon {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
}

.btn-icon:hover {
  color: #3b82f6;
}

.btn-text {
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  padding: 0;
  font-size: 0.875rem;
}

.candidate-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.candidate-info img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.quick-stats {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

@media (min-width: 768px) {
  .quick-stats {
    grid-template-columns: 1fr 1fr;
  }
}

.stats-section {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stats-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #1e293b;
}

.status-chart {
  display: flex;
  gap: 1rem;
}

.chart-item {
  flex: 1;
  text-align: center;
  padding: 1rem;
  border-radius: 0.5rem;
}

.chart-item.pending {
  background-color: #fef3c7;
}

.chart-item.approved {
  background-color: #dcfce7;
}

.chart-item.rejected {
  background-color: #fee2e2;
}

.chart-item span {
  font-size: 1.5rem;
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
}

.top-jobs {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.job-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.job-item:last-child {
  border-bottom: none;
}

.job-item p {
  margin: 0;
  color: #334155;
}

.job-item span {
  color: #64748b;
  font-size: 0.875rem;
}
</style>