<template>
  <div class="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg mt-10">
    <h2 class="text-2xl font-bold mb-4 text-center text-[#4640DE]">ملف صاحب العمل</h2>

    <div v-if="loading" class="text-gray-500">جاري تحميل البيانات...</div>
    <div v-else-if="error" class="text-red-500">حدث خطأ: {{ error }}</div>
    <div v-else>
      <p><strong>الاسم:</strong> {{ profile.user.name }}</p>
      <p><strong>البريد الإلكتروني:</strong> {{ profile.user.email }}</p>
      <p><strong>رقم الهاتف:</strong> {{ profile.employer.phone }}</p>
      <p><strong>اسم الشركة:</strong> {{ profile.employer.company_name }}</p>
      <p><strong>الوصف:</strong> {{ profile.employer.bio }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EmployerProfile',
  data() {
    return {
      profile: {
        user: {},
        employer: {}
      },
      loading: true,
      error: null
    };
  },
  mounted() {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:8000/api/employer/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("📦 Full Response:", response.data);
      this.profile.user = response.data.user;
      this.profile.employer = response.data.employer;
      this.loading = false;
    })
    .catch(error => {
      console.error("❌ Error fetching profile:", error.response?.data || error.message);
      this.error = error.response?.data?.message || 'خطأ في جلب البيانات';
      this.loading = false;
    });
  }
};
</script>
