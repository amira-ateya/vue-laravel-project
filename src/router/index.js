import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/components/welcome.vue'
import CandidateApplication from '@/views/Candidate/candidateApplication.vue'
import CandidatePublicProfile from '@/views/Candidate/candidatePublicProfile.vue'
import CandidateViewJobsPage from '@/views/Candidate/candidateViewJobsPage.vue'
import AllApplicantsPage from '@/views/Employer/allApplicantsPage.vue'
import JobListingPage from '@/views/Employer/jobListingPage.vue'
import Login from '@/views/login/login.vue'
import CandidateRegister from '@/views/Public/register/candidateRegister.vue'
import EmployerRegister from '@/views/Public/register/employerRegister.vue'
import Register from '@/views/Public/register/register.vue'

import { useAuthStore } from '@/stores/authStore'

const routes = [
  { path: '/', name: 'welcome', component: Welcome },
  { path: '/register', name: 'Register', component: Register },
  { path: '/candidateRegister', name: 'ContiureRegisterCandidate', component: CandidateRegister },
  { path: '/employerRegister', name: 'ContiureRegisterEmployer', component: EmployerRegister },

  // Login
  { path: '/login', name: 'Login', component: Login },

  // Candidate Routes (Require Auth)
  {
    path: '/candidate',
    name: 'Candidate',  // Base route for candidate
    component: { template: '<router-view />' },  // No component, just acts as a parent route
    meta: { requiresAuth: true },
    children: [
      {
        path: 'applications',
        name: 'CandidateApplications',
        component: CandidateApplication,
        meta: { requiresAuth: true }
      },
      {
        path: 'jobs',
        name: 'theJobPage',
        component: CandidateViewJobsPage,
        meta: { requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'CandidateProfile',
        component: CandidatePublicProfile,
        meta: { requiresAuth: true }
      },
    ]
  },

  // Employer Routes (Require Auth)
  {
    path: '/employer',
    name: 'Employer',  // Base route for employer
    component: { template: '<router-view />' },  // No component, just acts as a parent route
    meta: { requiresAuth: true },
    children: [
      {
        path: 'job-listing',
        name: 'EmployerJobListing',
        component: JobListingPage,
        meta: { requiresAuth: true }
      },
      {
        path: 'all-applicants',
        name: 'EmployerViewAllApplicants',
        component: AllApplicantsPage,
        meta: { requiresAuth: true }
      },
    ]
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

// global navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    const isAuthenticated = await authStore.checkAuth()
    if (!isAuthenticated) {
      next('/login') // >>>>>>>>>login
    } else {
      next() // allow
    }
  } else {
    next() // public route
  }
})


export default router
