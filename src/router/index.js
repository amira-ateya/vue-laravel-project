import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Public/Home.vue'
import Dashboard from '@/components/dashboard/dashboard.vue'
import CandidateApplication from '@/components/candidate/candidateApplication.vue'
import CandidateViewJobs from '@/components/candidate/candidateViewJobs.vue'
import CandidatePublicProfile from '@/components/candidate/candidatePublicProfile.vue'
import HeaderPerPage from '@/components/dashboard/headerPerPage.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/candidate/applications', name: 'CandidateApplications', component: CandidateApplication},
  { path: '/candidate/jobs', name: 'CandidateJobs', component: CandidateViewJobs},
  { path: '/candidate/profile', name: 'CandidateProfile', component: CandidatePublicProfile},

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
