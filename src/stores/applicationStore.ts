import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useApplicationStore = defineStore('application', () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  type Application = {
    id: string | number  // تعديل ليقبل النوعين
    job_id: number
    candidate_id: number
    status: string
    contact_email: string
    contact_phone: string
    resume_snapshot: string
    created_at: string
    [key: string]: any
  }

  const applications = ref<Application[]>([])
  const apiUrl = 'http://localhost:3000/applications'

  // جلب جميع التطبيقات
  const fetchApplications = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get(apiUrl)
      console.log("API Response:", res.data)
      applications.value = res.data.map((app: any) => ({
        ...app,
        id: Number(app.id) || app.id // تحويل ID لرقم إذا أمكن
      }))
    } catch (err: unknown) {
      console.error("Error details:", err instanceof Error ? err.message : err)
      error.value = 'Failed to load applications'
    } finally {
      loading.value = false
    }
  }

  // جلب التطبيقات حسب الوظيفة
  const fetchByJob = async (jobId: number) => {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get(`${apiUrl}?job_id=${jobId}`)
      applications.value = res.data
    } catch (err: unknown) {
      error.value = 'Failed to load job applications'
    } finally {
      loading.value = false
    }
  }

  // جلب التطبيقات حسب المرشح
  const fetchByCandidate = async (candidateId: number) => {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get(`${apiUrl}?candidate_id=${candidateId}`)
      applications.value = res.data
    } catch (err: unknown) {
      error.value = 'Failed to load candidate applications'
    } finally {
      loading.value = false
    }
  }

  // تحديث حالة الطلب
  const updateApplicationStatus = async (id: number, status: string) => {
    try {
      const res = await axios.patch(`${apiUrl}/${id}`, { status })
      const index = applications.value.findIndex(app => app.id === id)
      if (index !== -1) {
        applications.value[index] = res.data
      }
    } catch (err: unknown) {
      error.value = 'Failed to update application status'
    }
  }

  // حذف التطبيق
  const deleteApplication = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/${id}`)
      applications.value = applications.value.filter(app => app.id !== id)
    } catch (err: unknown) {
      error.value = 'Failed to delete application'
    }
  }

  return {
    applications,
    loading,
    error,
    fetchApplications,
    fetchByJob,
    fetchByCandidate,
    updateApplicationStatus,
    deleteApplication
  }
})
