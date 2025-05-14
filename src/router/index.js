import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/components/welcome.vue'

// [MOVED] import CandidatePublicProfile from '@/components/candidate/candidatePublicProfile.vue'

// [REPEATED: removed]

// [NEW]: 
// employer
  import ApplicationDetails from '@/views/Employer/ApplicationDetails.vue'
  import PostJob from '@/views/Employer/PostJob.vue'
  import EditJobPage from '@/views/Employer/EditJobPage.vue'

// [OLD: master]

  // auth
  import Login from '@/views/login/login.vue'
  import { useAuthStore } from '@/stores/authStore'
  import Register from '@/views/Public/register/register.vue'
  import CandidateRegister from '@/views/Public/register/candidateRegister.vue'
  import EmployerRegister from '@/views/Public/register/employerRegister.vue'


  // candidate [ profile + findJobs + applyPage + (apply control)]
  import CandidateApplication from '@/views/Candidate/candidateApplication.vue'
  import CandidatePublicProfile from '@/views/Candidate/candidatePublicProfile.vue'
  import CandidateViewJobsPage from '@/views/Candidate/candidateViewJobsPage.vue'

  // employer [ viewAllApplicant, jobListingPage ]
  import AllApplicantsPage from '@/views/Employer/allApplicantsPage.vue'
  import JobListingPage from '@/views/Employer/jobListingPage.vue'

  // NEW IMPORT
  // [REPEAT] import ApplicationDetails from '@/views/Employer/ApplicationDetails.vue'



const routes = [

  // AUTH
  { path: '/', name: 'welcome', component: Welcome },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/candidateRegister', name: 'ContiureRegisterCandidate', component: CandidateRegister },
  { path: '/employerRegister', name: 'ContiureRegisterEmployer', component: EmployerRegister },

  
  // CANDIDATE
  {
    path: '/candidate',
    name: 'Candidate',
    component: () => import('@/views/Candidate/candidateLayout.vue'),
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

  // EMPLOYER
  {
    path: '/employer',
    name: 'Employer',  
    component: ()=> import('@/views/Employer/employerLayout.vue'), // Base route for employer
    meta: { requiresAuth: true },
    children: [

      // view specific application on job
      {
        path: 'applications/:id',
        name: 'application-details',
        component: () => import('@/views/Employer/ApplicationDetails.vue'),
        props: true
      },

      // employer dashboard added
      {
        path: 'dashboard',
        name: 'EmployerDashboard',
        component: () => import('@/views/Employer/Dashboard.vue'),
        meta: { requiresAuth: true, role: 'employer' }
      },
      // another employer dashboard added
      {
        path: 'dashboard_2',
        name: 'employer-dashboard',
        component: () => import('@/views/Employer/Dashboard.vue'),
        meta: { requiresAuth: true, role: 'employer' }
      },
      // application details added
      {
        path: 'applications/:id',
        name: 'ApplicationDetails',
        component: ApplicationDetails,
        meta: { requiresAuth: true, role: 'employer' }
      },
      // employers applications added
      {
        path: 'applications',
        name: 'employer-applications',
        component: () => import('@/views/Employer/Applications.vue'),
        meta: { requiresAuth: true, role: 'employer' }
      },
      // post jobs added
      {
        path: 'post-job',
        name: 'PostJob',
        component: PostJob,
        meta: { requiresAuth: true, role: 'employer' }
      },
      // edit job added
      {
        path: 'edit-job/:id',
        name: 'EditJob',
        component: EditJobPage,
        props: true,
        meta: { requiresAuth: true, role: 'employer' }
      },
      // shwo applicant for specific job added
      {
        path: 'job/:id/applicants',
        name: 'JobApplicants',
        component: AllApplicantsPage,
        meta: { requiresAuth: true, role: 'employer' }
    },
      
      {
        path: 'job-listing',
        name: 'EmployerJobListing',
        component: JobListingPage,
        meta: { requiresAuth: true }
      }
    ]
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


///////////////////////////////////////////////////////////////////////////////////////
// router.beforeEach((to, from, next) => {
    // const isAuthenticated = /* your auth check logic */ true
    // const userRole = /* get user role from store */ 'employer' // or 'candidate'
////////////////////////////////////////////////////////////////////////////////////////



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
