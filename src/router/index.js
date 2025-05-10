import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/components/welcome.vue'
import CandidateApplication from '@/views/Candidate/candidateApplication.vue'
import CandidatePublicProfile from '@/views/Candidate/candidatePublicProfile.vue'
import CandidateViewJobsPage from '@/views/Candidate/candidateViewJobsPage.vue'
import AllApplicantsPage from '@/views/Employer/allApplicantsPage.vue'
import JobListingPage from '@/views/Employer/jobListingPage.vue'
import PostJob from '@/views/Employer/PostJob.vue'
import EditJobPage from '@/views/Employer/EditJobPage.vue'
import Login from '@/views/login/login.vue'

const routes = [
    // Public Routes
    {
        path: '/',
        name: 'welcome',
        component: Welcome
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },

    // Candidate Routes
    {
        path: '/candidate/dashboard',
        name: 'CandidateDashboard',
        component: CandidateViewJobsPage,
        meta: { requiresAuth: true, role: 'candidate' }
    },
    {
        path: '/candidate/applications',
        name: 'CandidateApplications',
        component: CandidateApplication,
        meta: { requiresAuth: true, role: 'candidate' }
    },
    {
        path: '/candidate/jobs',
        name: 'CandidateJobs',
        component: CandidateViewJobsPage,
        meta: { requiresAuth: true, role: 'candidate' }
    },
    {
        path: '/candidate/profile',
        name: 'CandidateProfile',
        component: CandidatePublicProfile,
        meta: { requiresAuth: true, role: 'candidate' }
    },

    // Employer Routes
    {
        path: '/employer/dashboard',
        name: 'EmployerDashboard',
        component: JobListingPage,
        meta: { requiresAuth: true, role: 'employer' }
    },
    {
        path: '/employer/job-listing',
        name: 'EmployerJobListing',
        component: JobListingPage,
        meta: { requiresAuth: true, role: 'employer' }
    },
    {
        path: '/employer/all-applicants',
        name: 'EmployerViewAllApplicants',
        component: AllApplicantsPage,
        meta: { requiresAuth: true, role: 'employer' }
    },
    {
        path: '/employer/post-job',
        name: 'PostJob',
        component: PostJob,
        meta: { requiresAuth: true, role: 'employer' }
    },
    {
        path: '/employer/edit-job/:id',
        name: 'EditJob',
        component: EditJobPage,
        props: true,
        meta: { requiresAuth: true, role: 'employer' }
    },
    {
        path: '/employer/job/:id/applicants',
        name: 'JobApplicants',
        component: AllApplicantsPage,
        meta: { requiresAuth: true, role: 'employer' }
    },

    // Test Route (can be removed in production)
    {
        path: '/test',
        name: 'test',
        component: CandidateViewJobsPage
    },

    // 404 Catch-all
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
    const isAuthenticated = /* your auth check logic */ true
    const userRole = /* get user role from store */ 'employer' // or 'candidate'

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
    } else if (to.meta.role && to.meta.role !== userRole) {
        next('/') // or to their dashboard based on role
    } else {
        next()
    }
})

export default router