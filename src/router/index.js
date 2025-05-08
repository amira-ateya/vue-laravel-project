import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Public/Home.vue'
import CandidateApplication from '@/components/candidate/candidateApplication.vue'
import CandidateViewJobs from '@/components/candidate/candidateViewJobs.vue'
import CandidatePublicProfile from '@/components/candidate/candidatePublicProfile.vue'
import JobListingPage from '@/components/employer/jobListingPage/jobListingPage.vue'
import AllApplicantsPage from '@/components/employer/AllApplicantsPage/allApplicantsPage.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: { title: 'Home' }
    },
    {
        path: '/candidate/applications',
        name: 'CandidateApplications',
        component: CandidateApplication,
        meta: { title: 'My Applications' }
    },
    {
        path: '/candidate/jobs',
        name: 'CandidateJobs',
        component: CandidateViewJobs,
        meta: { title: 'Browse Jobs' }
    },
    {
        path: '/candidate/profile',
        name: 'CandidateProfile',
        component: CandidatePublicProfile,
        meta: { title: 'My Profile' }
    },
    {
        path: '/employer/job-listing',
        name: 'EmployerJobListing',
        component: JobListingPage,
        meta: { title: 'Job Listings' },
        children: [{
                path: 'new',
                name: 'CreateJob',
                component: () =>
                    import ('@/components/employer/jobListingPage/JobPostForm.vue'),
                meta: { title: 'Create Job' }
            },
            {
                path: 'edit/:id',
                name: 'EditJob',
                component: () =>
                    import ('@/components/employer/jobListingPage/JobPostForm.vue'),
                meta: { title: 'Edit Job' },
                props: true
            }
        ]
    },
    {
        path: '/employer/all-applicants',
        name: 'EmployerViewAllApplicants',
        component: AllApplicantsPage,
        meta: { title: 'All Applicants' }
    },
    {
        path: '/employer/jobs/new',
        name: 'CreateJobStandalone',
        component: () =>
            import ('@/views/Employer/EmployerFormView.vue'),
        meta: { title: 'Create Job' }
    },
    {
        path: '/employer/jobs/edit/:id',
        name: 'EditJobStandalone',
        component: () =>
            import ('@/views/Employer/EmployerFormView.vue'),
        meta: { title: 'Edit Job' },
        props: true
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 }
    }
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? `${to.meta.title} | JobHuntly` : 'JobHuntly'
    next()
})

export default router