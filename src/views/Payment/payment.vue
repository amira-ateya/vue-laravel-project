<template>
  <div class="p-8 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">ادفع مقابل نشر الوظيفة</h2>

    <form @submit.prevent="startCheckout">
      <div class="mb-4">
        <label for="employer_id" class="block font-medium">Employer ID</label>
        <input v-model="form.employer_id" type="number" id="employer_id" class="border p-2 w-full rounded" required />
      </div>

      <div class="mb-4">
        <label for="job_id" class="block font-medium">Job ID</label>
        <input v-model="form.job_id" type="number" id="job_id" class="border p-2 w-full rounded" required />
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        الدفع باستخدام Stripe
      </button>
    </form>

    <p v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const form = ref({
  employer_id: '',
  job_id: ''
})

const errorMessage = ref('')

const startCheckout = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/create-checkout-session', form.value, {
      headers: {
        Accept: 'application/json',
        // لو عندك توكن JWT اكتبيه هنا:
        // Authorization: `Bearer <token>`
      }
    })

    if (response.data.checkout_url) {
      window.location.href = response.data.checkout_url
    }
  } catch (error) {
    console.error(error)
    errorMessage.value = 'حدث خطأ أثناء إنشاء جلسة الدفع.'
  }
}
</script>
