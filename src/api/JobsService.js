// src/services/JobsService.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // لو بتستخدمي Sanctum
});

export default {
  getAllJobs() {
    return API.get('/usersjobs');
  },
  createJob(data) {
    return API.post('/usersjobs', data);
  },
  getJob(id) {
    return API.get(`/usersjobs/${id}`);
  },
  updateJob(id, data) {
    return API.put(`/usersjobs/${id}`, data);
  },
  deleteJob(id) {
    return API.delete(`/usersjobs/${id}`);
  },
};
