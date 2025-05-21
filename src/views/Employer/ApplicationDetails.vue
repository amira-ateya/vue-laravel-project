<template>
  <div class="application-details">
    <h1 class="main-title">Application Details</h1>

    <div v-if="loading" class="message loading">Loading...</div>
    <div v-else-if="error" class="message error">Something went wrong!</div>
    <div v-else class="card">
      <!-- Job Info -->
      <div class="section">
        <h2 class="section-title">🧾 Job Information</h2>
        <div class="row"><span>Title:</span><strong>{{ app.job.title }}</strong></div>
        <div class="row"><span>Location:</span><strong>{{ app.job.location }}</strong></div>
        <div class="row"><span>Work Type:</span><strong>{{ app.job.work_type }}</strong></div>
        <div class="row"><span>Salary:</span><strong>{{ app.job.salary_from }} - {{ app.job.salary_to }} EGP</strong></div>
        <div class="row"><span>Description:</span><p>{{ app.job.description }}</p></div>
      </div>

      <!-- Candidate Info -->
      <div class="section">
        <h2 class="section-title">👤 Candidate Information</h2>
        <div class="row"><span>Name:</span><strong>{{ app.candidate.user.name }}</strong></div>
        <div class="row"><span>Email:</span><strong>{{ app.candidate.user.email }}</strong></div>
        <div class="row"><span>Current Job:</span><strong>{{ app.candidate.current_job }}</strong></div>
        <div class="row"><span>Experience Level:</span><strong>{{ app.candidate.experience_level }}</strong></div>
        <div class="row"><span>Location:</span><strong>{{ app.candidate.location }}</strong></div>
        <div class="row">
          <span>LinkedIn:</span>
          <a :href="app.candidate.linkedin_profile" target="_blank">View Profile</a>
        </div>
      </div>

      <!-- Application Info -->
      <div class="section">
        <h2 class="section-title">📄 Application Info</h2>
        <div class="row"><span>Phone:</span><strong>{{ app.contact_phone }}</strong></div>
        <div class="row"><span>Status:</span>
          <span :class="['status-pill', app.status]">{{ app.status }}</span>
        </div>
        <div class="row">
          <span>Resume:</span>
          <a :href="`http://localhost:8000/storage/${app.resume_snapshot}`" target="_blank">View Resume</a>
        </div>
        <div class="row"><span>Applied On:</span><strong>{{ formatDate(app.created_at) }}</strong></div>
      </div>

      <!-- Action Buttons -->
      <div class="actions">
        <button class="btn approve" @click="updateStatus('approved')">Approve</button>
        <button class="btn reject" @click="updateStatus('rejected')">Reject</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const app = ref(null)
const loading = ref(true)
const error = ref(false)

const fetchApplication = async () => {
  try {
    const res = await axios.get(`http://localhost:8000/api/employer/applications/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    app.value = res.data
  } catch (err) {
    console.error(err)
    error.value = true
  } finally {
    loading.value = false
  }
}

const updateStatus = async (status) => {
  try {
    await axios.put(`http://localhost:8000/api/employer/applications/${route.params.id}`, { status }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    app.value.status = status
    alert(`Status updated to "${status}" successfully!`)
  } catch (err) {
    alert('Failed to update status')
    console.error(err)
  }
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

onMounted(fetchApplication)
</script>

<style scoped>
.application-details {
  max-width: 950px;
  margin: 50px auto;
  background: #fff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
}

.main-title {
  font-size: 32px;
  font-weight: 700;
  color: #4640DE;
  text-align: center;
  margin-bottom: 40px;
}

.message {
  text-align: center;
  font-size: 18px;
  padding: 20px;
  color: #555;
}
.message.error {
  color: #d9534f;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 35px;
}

.section {
  background: #f9f9ff;
  border-radius: 12px;
  padding: 25px 30px;
  border-left: 6px solid #4640DE;
}

.section-title {
  font-size: 20px;
  color: #333;
  font-weight: 600;
  margin-bottom: 18px;
}

.row {
  display: flex;
  gap: 10px;
  margin: 10px 0;
  font-size: 15px;
  color: #444;
}
.row span {
  width: 150px;
  font-weight: 500;
  color: #222;
}
.row a {
  color: #007BFF;
  text-decoration: underline;
}

.status-pill {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
  text-transform: capitalize;
  color: #fff;
}
.status-pill.approved {
  background-color: #28a745;
}
.status-pill.rejected {
  background-color: #dc3545;
}
.status-pill.pending {
  background-color: #ffc107;
  color: #000;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 20px;
}

.btn {
  padding: 12px 28px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
}
.btn.approve {
  background-color: #28a745;
  color: white;
}
.btn.reject {
  background-color: #dc3545;
  color: white;
}
.btn:hover {
  opacity: 0.9;
}
</style>
