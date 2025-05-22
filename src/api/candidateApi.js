import axios from 'axios'

export default {
  async getProfile() {
    
    return await axios.get('/api/candidate/profile')
  },
  
  async getApplications() {
    return await axios.get('/api/candidate/applications')
  },
  
  async updateProfile(data) {
    return await axios.put('/api/candidate/profile', data)
  },
  
  async uploadResume(formData) {
    return await axios.post('/api/candidate/upload-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  
  async withdrawApplication(applicationId) {
    return await axios.delete(`/api/candidate/applications/${applicationId}`)
  },
  
  async getJobs() {
    return await axios.get('/api/jobs')
  },
  async getCandidateProfile(candidateId) {
    return await axios.get(`/api/candidates/${candidateId}`)
  },
  
  async getCandidateApplications(candidateId) {
    return await axios.get(`/api/candidates/${candidateId}/applications`)
  },
}