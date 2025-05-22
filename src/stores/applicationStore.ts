import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useApplicationStore = defineStore('application', () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  type Application = {
    id: string | number
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

  // جلب جميع التطبيقات مع تفاصيل المرشح والوظيفة
  const fetchApplications = async () => {
    loading.value = true
    error.value = null
    try {
      const [appsRes, candidatesRes, jobsRes, usersRes] = await Promise.all([
        axios.get(apiUrl),
        axios.get('http://localhost:3000/candidates'),
        axios.get('http://localhost:3000/jobs'),
        axios.get('http://localhost:3000/users')
      ])

      const usersMap = Object.fromEntries(usersRes.data.map((u: any) => [u.id, u]))
      const candidatesMap = Object.fromEntries(candidatesRes.data.map((c: any) => [c.id, {
        ...c,
        user: usersMap[c.user_id]
      }]))
      const jobsMap = Object.fromEntries(jobsRes.data.map((j: any) => [j.id, j]))

      applications.value = appsRes.data.map((app: any) => ({
        ...app,
        candidate: candidatesMap[app.candidate_id],
        job: jobsMap[app.job_id],
        id: Number(app.id) || app.id
      }))
    } catch (err: unknown) {
      error.value = 'Failed to load applications'
    } finally {
      loading.value = false
    }
  }

  // حسب الوظيفة
  const fetchByJob = async (jobId: number) => {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get(`${apiUrl}?job_id=${jobId}`)
      applications.value = res.data
    } catch (err) {
      error.value = 'Failed to load job applications'
    } finally {
      loading.value = false
    }
  }

  // حسب المرشح
  const fetchByCandidate = async (candidateId: number) => {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get(`${apiUrl}?candidate_id=${candidateId}`)
      applications.value = res.data
    } catch (err) {
      error.value = 'Failed to load candidate applications'
    } finally {
      loading.value = false
    }
  }

  // إنشاء طلب تقديم جديد
  const createApplication = async (applicationData: any) => {
    try {
      const res = await axios.post(apiUrl, applicationData)
      applications.value.push(res.data)
    } catch (err) {
      error.value = 'Failed to send request'
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
    } catch (err) {
      error.value = 'Failed to update application status'
    }
  }

  // حذف الطلب
  const deleteApplication = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/${id}`)
      applications.value = applications.value.filter(app => app.id !== id)
    } catch (err) {
      error.value = 'Failed to delete request'
    }
  }

  return {
    applications,
    loading,
    error,
    fetchApplications,
    fetchByJob,
    fetchByCandidate,
    createApplication,
    updateApplicationStatus,
    deleteApplication
  }
})
