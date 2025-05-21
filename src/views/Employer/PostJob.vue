<template>
  <div class="form-container">
    <h2 class="form-title">Post a New Job</h2>
    <form @submit.prevent="postJob" class="form">
      <input v-model="form.title" type="text" placeholder="Job Title" class="input" required />
      
      <select v-model="form.work_type" class="input" required>
        <option disabled value="">Select Work Type</option>
        <option v-for="type in workTypes" :key="type" :value="type">
          {{ type }}
        </option>
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

      <button type="submit" class="submit-button">Post Job</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

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

onMounted(() => {
  fetchCategories()
  fetchWorkTypes()
})

const postJob = async () => {
  try {
    const res = await axios.post('http://localhost:8000/api/employer/jobs', form.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    alert('Job posted successfully!')
    console.log(res.data)
  } catch (error) {
    console.error('Error posting job', error.response?.data || error.message)
    alert('Failed to post job')
  }
}
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
