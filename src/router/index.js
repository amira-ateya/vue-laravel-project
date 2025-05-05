import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Public/Home.vue'
import CandidateApplication from '@/components/candidate/candidateApplication.vue'
import CandidateViewJobs from '@/components/candidate/candidateViewJobs.vue'
import CandidatePublicProfile from '@/components/candidate/candidatePublicProfile.vue'
import JobListingPage from '@/components/employer/jobListingPage/jobListingPage.vue'
import AllApplicantsPage from '@/components/employer/AllApplicantsPage/allApplicantsPage.vue'

const routes = [

  // CANDIDATE
  { path: '/', name: 'Home', component: Home },
  { path: '/candidate/applications', name: 'CandidateApplications', component: CandidateApplication},
  { path: '/candidate/jobs', name: 'CandidateJobs', component: CandidateViewJobs},
  { path: '/candidate/profile', name: 'CandidateProfile', component: CandidatePublicProfile},



  // EMPLOYER
  { path: '/employer/job-listing', name: 'EmployerJobListing', component: JobListingPage},
  { path: '/employer/all-applicants', name: 'EmployerViewAllApplicants', component: AllApplicantsPage},




]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
