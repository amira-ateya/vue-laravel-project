<template>
  <div class="form-container">
    <h2 class="form-title">Edit Job</h2>
    <form @submit.prevent="updateJob" class="form">
      <input v-model="form.title" type="text" placeholder="Job Title" class="input" required />

      <select v-model="form.work_type" class="input" required>
        <option disabled value="">Select Work Type</option>
        <option v-for="type in workTypes" :key="type" :value="type">{{ type }}</option>
      </select>

      <input v-model="form.location" type="text" placeholder="Location" class="input" />

      <select v-model="form.category_id" class="input" required>
        <option disabled value="">Select Category</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.category_name }}
        </option>
      </select>

      <input v-model.number="form.salary_from" type="number" placeholder="Salary From" class="input" />
      <input v-model.number="form.salary_to" type="number" placeholder="Salary To" class="input" />
      <input v-model="form.deadline" type="date" class="input" required />

      <textarea v-model="form.description" placeholder="Description" class="input" required></textarea>
      <textarea v-model="form.responsibilities" placeholder="Responsibilities" class="input"></textarea>
      <textarea v-model="form.benefits" placeholder="Benefits" class="input"></textarea>

      <button type="submit" class="submit-button">Update Job</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const jobId = route.params.id

const form = ref({
  title: '',
  work_type: '',
  location: '',
  category_id: '',
  salary_from: '',
  salary_to: '',
  deadline: '',
  description: '',
  responsibilities: '',
  benefits: '',
})

const categories = ref([])
const workTypes = ref([])

const fetchCategories = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/categories')
    categories.value = res.data
  } catch (err) {
    console.error('Failed to load categories', err)
  }
}

const fetchWorkTypes = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/job/options')
    workTypes.value = res.data.work_types
  } catch (err) {
    console.error('Failed to load work types', err)
  }
}

const fetchJob = async () => {
  if (!jobId) return

  try {
    const res = await axios.get(`http://localhost:8000/api/employer/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    const job = res.data

    form.value = {
      title: job.title || '',
      work_type: job.work_type || '',
      location: job.location || '',
      category_id: job.category_id || '',
      salary_from: job.salary_from || '',
      salary_to: job.salary_to || '',
      deadline: job.deadline ? job.deadline.slice(0, 10) : '',
      description: job.description || '',
      responsibilities: job.responsibilities || '',
      benefits: job.benefits || '',
    }

  } catch (err) {
    console.error('Failed to fetch job data', err)
    alert('Failed to load job data')
  }
}

const updateJob = async () => {
  try {
    await axios.put(`http://localhost:8000/api/employer/jobs/${jobId}`, form.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    alert('Job updated successfully!')
    router.push('/employer/job-listing') // ✅ تعديل المسار بعد التحديث
  } catch (error) {
    console.error('Failed to update job', error.response?.data || error.message)
    alert('Failed to update job')
  }
}

onMounted(() => {
  fetchCategories()
  fetchWorkTypes()
  fetchJob()
})

// ✅ في حال تغيّر id أثناء التنقل بين الصفحات دون إعادة تحميل
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchJob()
  }
})
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.form-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 100%;
}
.submit-button {
  background-color: #2e8b57;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
}
.submit-button:hover {
  background-color: #256d47;
}
</style>