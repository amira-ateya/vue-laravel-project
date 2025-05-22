<template>
  <div class="employer-dashboard">
    <!-- Header Section -->
    <header class="dashboard-header">
      <div class="header-info">
        <h1>Welcome, {{ employerData.user.name }}</h1>
        <p>{{ employerData.employer.company_name }} Dashboard</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" @click="navigateTo('/employer/post-job')">
          <i class="fas fa-plus"></i> Post New Job
        </button>
        <div class="user-dropdown" @click.stop="toggleDropdown">
          <div class="user-avatar">
            <img :src="userImage || defaultAvatar" alt="Profile">
          </div>
          <transition name="fade">
            <div v-if="dropdownOpen" class="dropdown-menu">
              <router-link to="/employer/profile" class="dropdown-item">
                <i class="fas fa-user"></i> Profile
              </router-link>
              <router-link to="/settings" class="dropdown-item">
                <i class="fas fa-cog"></i> Settings
              </router-link>
              <a class="dropdown-item" @click="logout">
                <i class="fas fa-sign-out-alt"></i> Logout
              </a>
            </div>
          </transition>
        </div>
      </div>
    </header>

    <!-- Stats Cards -->
    <section class="stats-grid">
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
    </section>

    <!-- Main Content -->
    <main class="dashboard-content">
      <!-- Recent Jobs -->
      <div class="dashboard-card">
        <div class="card-header">
          <h2>Recent Job Postings</h2>
          <router-link to="/employer/job-listing" class="view-all-link">
            View All <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>
        <div v-if="loading" class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i> Loading...
        </div>
        <div v-else-if="latestJobs.length === 0" class="empty-state">
          <i class="fas fa-briefcase"></i>
          <p>No job postings yet</p>
          <button class="btn btn-primary" @click="navigateTo('/employer/post-job')">
            Post Your First Job
          </button>
        </div>
        <div v-else class="card-body">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Work Type</th>
                  <th>Salary</th>
                  <th>Deadline</th>
                  <th>Applications</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="job in latestJobs" :key="job.id">
                  <td>
                    <router-link :to="`/employer/job/${job.id}`" class="job-title">
                      {{ job.title }}
                    </router-link>
                  </td>
                  <td>{{ job.location }}</td>
                  <td>
                    <span class="work-type-badge" :class="job.work_type">
                      {{ formatWorkType(job.work_type) }}
                    </span>
                  </td>
                  <td>
                    <span v-if="job.salary_from && job.salary_to">
                      {{ formatSalary(job.salary_from) }} - {{ formatSalary(job.salary_to) }}
                    </span>
                    <span v-else>Not specified</span>
                  </td>
                  <td :class="{'text-red-500': isDeadlinePassed(job.deadline)}">
                    {{ formatDate(job.deadline) }}
                  </td>
                  <td>
                    <span class="applications-count" :class="{highlight: job.applications_count > 0}">
                      {{ job.applications_count }}
                    </span>
                  </td>
                  <td>
                    <span :class="`status-badge ${job.status}`">
                      {{ job.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Recent Applications -->
      <div class="dashboard-card">
        <div class="card-header">
          <h2>Recent Applications</h2>
          <router-link to="/employer/applications" class="view-all-link">
            View All <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>
        <div v-if="loading" class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i> Loading...
        </div>
        <div v-else-if="latestApplications.length === 0" class="empty-state">
          <i class="fas fa-file-alt"></i>
          <p>No applications yet</p>
        </div>
        <div v-else class="card-body">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Job Title</th>
                  <th>Applied On</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="app in latestApplications" :key="app.id">
                  <td>
                    <div class="candidate-info">
                      <img :src="defaultAvatar" :alt="app.candidate_name">
                      <div>
                        <span class="candidate-name">{{ app.candidate_name }}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <router-link to="#" class="job-title">
                      {{ app.job_title }}
                    </router-link>
                  </td>
                  <td>{{ formatDate(app.created_at) }}</td>
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
    </main>
  </div>
</template>

<script>
import axios from 'axios';


//OPTIONAL APPROACH

export default {
  name: 'EmployerDashboard',
  data() {
    return {
      employerData: {
        user: {
          name: '',
          profile_picture: ''
        },
        employer: {
          company_name: ''
        }
      },
      stats: {
        jobs: 0,
        applications: 0
      },
      latestJobs: [],
      latestApplications: [],
      loading: true,
      dropdownOpen: false,
      defaultAvatar: 'https://ui-avatars.com/api/?background=random&name=U',
      user: {}, // [SENU]
      base: 'http://localhost:8000/storage/', // [SENU]
      userImage: '' // [SENU]
    }
  },
  async created() {
    await this.fetchDashboardData();
    document.addEventListener('click', this.closeDropdown);

    const token = localStorage.getItem('token'); // [SENU]
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token; // [SENU]
    const res = await axios.get('http://localhost:8000/api/user'); // [SENU]
    this.user = res.data; // [SENU]
    this.userImage = this.base + res.data.profile_picture; // [SENU]
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  },
  methods: {

    // FETCH ALL THE DATA FOR THE PAGE
    async fetchDashboardData() {
      try {
        this.loading = true;
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        
        const [
          profileRes, 
          statsRes, 
          jobsRes, 
          appsRes
        ] = await Promise.all([
          axios.get('/employer/profile', { headers }),
          axios.get('/employer/stats', { headers }),
          axios.get('/employer/latest-jobs', { headers }),
          axios.get('/employer/latest-applications', { headers })
        ]);

        this.employerData = profileRes.data;
        console.log("employer data = ", this.employerData); //DEBUG: (worked)

        this.stats = statsRes.data;
        console.log("stats = ", statsRes.data); //DEBUG: (gave me zerossss)

        this.latestJobs = jobsRes.data;
        // console.log("latest jobs = ", this.latestJobs); //DEBUG

        this.latestApplications = appsRes.data;

        // Set default avatar with initials
        if (this.employerData.user.name) {
          const initials = this.employerData.user.name.split(' ').map(n => n[0]).join('');
          this.defaultAvatar = `https://ui-avatars.com/api/?background=random&name=${initials}`;
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },
    formatWorkType(type) {
      const types = {
        'full-time': 'Full Time',
        'part-time': 'Part Time',
        'contract': 'Contract',
        'freelance': 'Freelance',
        'hybrid': 'Hybrid',
        'remote': 'Remote'
      };
      return types[type] || type;
    },
    formatSalary(amount) {
      if (!amount) return '';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EGP',
        maximumFractionDigits: 0
      }).format(amount);
    },
    isDeadlinePassed(deadline) {
      if (!deadline) return false;
      return new Date(deadline) < new Date();
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdown(e) {
      if (!this.$el.contains(e.target)) {
        this.dropdownOpen = false;
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
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
  color: #334155;
}

/* Header Styles */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-info h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.header-info p {
  color: #64748b;
  font-size: 0.95rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-dropdown {
  position: relative;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #e2e8f0;
  transition: border-color 0.2s;
}

.user-avatar:hover {
  border-color: #cbd5e1;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 0.5rem 0;
  min-width: 180px;
  z-index: 50;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  color: #334155;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background-color 0.2s;
}

.dropdown-item i {
  margin-right: 0.75rem;
  width: 20px;
  text-align: center;
}

.dropdown-item:hover {
  background-color: #f1f5f9;
  color: #1e40af;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.stat-content h3 {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.stat-content p {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

/* Dashboard Content */
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
  transition: transform 0.2s, box-shadow 0.2s;
}

.dashboard-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.view-all-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.view-all-link i {
  margin-left: 0.25rem;
  font-size: 0.7rem;
}

.view-all-link:hover {
  text-decoration: underline;
  color: #2563eb;
}

.card-body {
  padding: 1.5rem;
}

.loading-spinner {
  padding: 2rem;
  text-align: center;
  color: #3b82f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.loading-spinner i {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: #64748b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.empty-state i {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #cbd5e1;
}

.empty-state p {
  margin-bottom: 1.5rem;
}

.table-responsive {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.data-table th {
  text-align: left;
  padding: 0.75rem;
  color: #64748b;
  font-weight: 500;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e2e8f0;
}

.data-table td {
  padding: 1rem 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
  vertical-align: middle;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.job-title {
  color: #1e40af;
  text-decoration: none;
  font-weight: 500;
}

.job-title:hover {
  text-decoration: underline;
}

.work-type-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
  display: inline-block;
}

.work-type-badge.full-time {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.work-type-badge.part-time {
  background-color: #f0fdf4;
  color: #15803d;
}

.work-type-badge.hybrid {
  background-color: #fef3c7;
  color: #b45309;
}

.work-type-badge.remote {
  background-color: #ecfdf5;
  color: #047857;
}

.work-type-badge.contract {
  background-color: #f5f3ff;
  color: #7c3aed;
}

.work-type-badge.freelance {
  background-color: #fef2f2;
  color: #b91c1c;
}

.applications-count {
  display: inline-block;
  min-width: 24px;
  text-align: center;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  background-color: #f1f5f9;
  font-weight: 500;
}

.applications-count.highlight {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.status-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  display: inline-block;
}

.status-badge.pending {
  background-color: #fef3c7;
  color: #d97706;
}

.status-badge.active {
  background-color: #dcfce7;
  color: #16a34a;
}

.status-badge.closed {
  background-color: #fee2e2;
  color: #dc2626;
}

.candidate-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.candidate-info img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.candidate-name {
  font-weight: 500;
  color: #1e293b;
}

.btn-text {
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  padding: 0;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
}

.btn-text:hover {
  text-decoration: underline;
}

.text-red-500 {
  color: #ef4444;
}

/* Button Styles */
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.btn i {
  margin-right: 0.5rem;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>