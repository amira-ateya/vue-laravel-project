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
import { createRouter, createWebHistory } from 'vue-router'



const routes = [

  { path: '/', name: 'welcome', component: Welcome},
  { path: '/register', name: 'Register', component: Register},
  { path: '/candidateRegister', name: 'ContiureRegisterCandidate', component: CandidateRegister },
  { path: '/employerRegister', name: 'ContiureRegisterEmployer', component: EmployerRegister },

  // CANDIDATE
  { path: '/login', name: 'Login', component: Login},
  { path: '/candidate/applications', name: 'CandidateApplications', component: CandidateApplication},
  { path: '/candidate/jobs', name: 'theJobPage', component: CandidateViewJobsPage},
  { path: '/candidate/profile', name: 'CandidateProfile', component: CandidatePublicProfile},



  // // EMPLOYER
  { path: '/employer/job-listing', name: 'EmployerJobListing', component: JobListingPage},
  { path: '/employer/all-applicants', name: 'EmployerViewAllApplicants', component: AllApplicantsPage},




]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
