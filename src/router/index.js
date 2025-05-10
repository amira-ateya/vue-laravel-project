import Welcome from '@/components/welcome.vue'
import CandidateApplication from '@/views/Candidate/candidateApplication.vue'
import CandidatePublicProfile from '@/views/Candidate/candidatePublicProfile.vue'
import CandidateViewJobsPage from '@/views/Candidate/candidateViewJobsPage.vue'
import AllApplicantsPage from '@/views/Employer/allApplicantsPage.vue'
import JobListingPage from '@/views/Employer/jobListingPage.vue'
import Login from '@/views/login/login.vue'
import { createRouter, createWebHistory } from 'vue-router'
import CandidateJobDetails from '@/views/Candidate/candidateJobDetails.vue'
import CandidateApplyModel from '@/views/Candidate/candidateApplyModel.vue'


const routes = [

  { path: '/', name: 'welcome', component: Welcome},
  { path: '/test', name: 'test', component: CandidateViewJobsPage},

  // CANDIDATE
  { path: '/login', name: 'Login', component: Login},
  { path: '/candidate/applications', name: 'CandidateApplications', component: CandidateApplication},
  { path: '/candidate/jobs', name: 'theJobPage', component: CandidateViewJobsPage},
  { path: '/candidate/profile', name: 'CandidateProfile', component: CandidatePublicProfile},
  // { path: '/candidate/jobDetails', name: 'CandidatejobDetails', component: CandidateJobDetails},
{path:'/candidate/applyModel' ,name:'applyModel', component:CandidateApplyModel},
  {
    path: '/job/:id',
    name: 'CandidatejobDetails',
    component: () => import('@/views/Candidate/candidateJobDetails.vue')
  },

  // // EMPLOYER
  { path: '/employer/job-listing', name: 'EmployerJobListing', component: JobListingPage},
  { path: '/employer/all-applicants', name: 'EmployerViewAllApplicants', component: AllApplicantsPage},




]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
