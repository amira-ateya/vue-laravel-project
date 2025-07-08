<template>
  <div class="jobhuntly-app" :class="{'dark-mode': darkMode}">
    <!-- Dark Mode Toggle -->
    <button class="dark-mode-toggle" @click="toggleDarkMode">
      <i :class="darkMode ? 'bi bi-sun-fill' : 'bi bi-moon-fill'"></i>
    </button>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light py-3 shadow-sm sticky-top">
      <div class="container">
        <a class="navbar-brand fw-bold fs-3 text-gradient" href="#">
          <i class="bi bi-search-heart-fill me-2"></i>JobHuntly
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item mx-2">
              <a class="nav-link fw-medium position-relative" href="/login">
                Find Jobs
                <span class="nav-link-underline"></span>
              </a>
            </li>
            <li class="nav-item mx-2">
              <a class="nav-link fw-medium position-relative" href="#companies">
                Companies
                <span class="nav-link-underline"></span>
              </a>
            </li>
            <li class="nav-item mx-2">
              <a class="nav-link fw-medium position-relative" href="#testimonials">
                Testimonials
                <span class="nav-link-underline"></span>
              </a>
            </li>
          </ul>
          <div class="d-flex align-items-center">
            <a href="/login" class="btn btn-outline-primary me-2 px-3 rounded-pill fw-medium btn-hover-animate">
              Login
            </a>
            <a href="/register" class="btn btn-primary px-3 rounded-pill fw-medium shadow-sm btn-hover-scale">
              <i class="bi bi-person-plus me-1"></i> Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section py-5 position-relative overflow-hidden">
      <div class="hero-bg-animation"></div>
      <div class="container py-4 position-relative">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <h1 class="display-4 fw-bold mb-4 slide-in-left">
              Discover your <span class="text-gradient">dream job</span> with us
            </h1>
            <p class="lead mb-4 slide-in-left delay-1">
              Great platform for job seekers searching for new career heights and passionate about startups.
            </p>
            <div class="search-container rounded-4 shadow-sm p-3 mb-3 slide-in-left delay-2">
              <div class="input-group">
                <span class="input-group-text bg-transparent border-0">
                  <i class="bi bi-search"></i>
                </span>
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  class="form-control border-0" 
                  placeholder="Job title, keywords, or company"
                  @keyup.enter="searchJobs"
                >
                <button 
                  class="btn btn-primary px-4 rounded-pill fw-medium btn-hover-scale" 
                  @click="searchJobs"
                >
                  Search Jobs
                </button>
              </div>
            </div>
            <div class="d-flex flex-wrap slide-in-left delay-3">
              <span class="me-3 mb-2">Popular searches:</span>
              <a href="#" class="badge bg-secondary text-white me-2 mb-2 hover-scale">Developer</a>
              <a href="#" class="badge bg-secondary text-white me-2 mb-2 hover-scale">Designer</a>
              <a href="#" class="badge bg-secondary text-white me-2 mb-2 hover-scale">Marketing</a>
              <a href="#" class="badge bg-secondary text-white mb-2 hover-scale">Remote</a>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image position-relative float-in">
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                alt="Job search illustration" 
                class="img-fluid rounded-4 shadow"
              >
              <div class="floating-badge bg-primary text-white shadow">
                <i class="bi bi-check-circle-fill me-1"></i> 10K+ Jobs
              </div>
              <div class="floating-badge bg-success text-white shadow">
                <i class="bi bi-people-fill me-1"></i> 5K+ Hired
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-4">
      <div class="container">
        <div class="row g-4 stats-counter">
          <div class="col-6 col-md-3 text-center">
            <div class="stat-card p-3 rounded-4 hover-scale">
              <h3 class="fw-bold text-primary mb-0 counter" data-target="12500">0</h3>
              <p class="mb-0">Live Jobs</p>
            </div>
          </div>
          <div class="col-6 col-md-3 text-center">
            <div class="stat-card p-3 rounded-4 hover-scale">
              <h3 class="fw-bold text-primary mb-0 counter" data-target="8500">0</h3>
              <p class="mb-0">Companies</p>
            </div>
          </div>
          <div class="col-6 col-md-3 text-center">
            <div class="stat-card p-3 rounded-4 hover-scale">
              <h3 class="fw-bold text-primary mb-0 counter" data-target="50000">0</h3>
              <p class="mb-0">Candidates</p>
            </div>
          </div>
          <div class="col-6 col-md-3 text-center">
            <div class="stat-card p-3 rounded-4 hover-scale">
              <h3 class="fw-bold text-primary mb-0 counter" data-target="1200">0</h3>
              <p class="mb-0">New Jobs Daily</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Jobs -->
    <section class="py-5">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div class="slide-in-left">
            <h2 class="fw-bold mb-2">Featured <span class="text-gradient">jobs</span></h2>
            <p>Recently added top jobs</p>
          </div>
          <a href="#" class="btn btn-outline-primary rounded-pill px-4 fw-medium btn-hover-animate slide-in-right">
            View all jobs <i class="bi bi-arrow-right ms-1"></i>
          </a>
        </div>
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="(job, index) in featuredJobs" :key="job.id">
            <div 
              class="job-card card border-0 rounded-4 h-100 shadow-sm-hover transition-all" 
              :style="`animation-delay: ${index * 0.1}s`"
            >
              <div class="card-body p-4">
                <div class="d-flex align-items-start mb-3">
                  <img :src="job.logo" alt="Company logo" class="rounded-3 me-3" width="50" height="50">
                  <div>
                    <span class="badge bg-primary bg-opacity-10 text-primary float-end">{{ job.type || 'Full Time' }}</span>
                    <h5 class="card-title fw-bold mb-1">{{ job.title }}</h5>
                    <p class="small mb-2">{{ job.company }} • {{ job.location }}</p>
                  </div>
                </div>
                <p class="card-text small mb-3">{{ job.description || 'No description available' }}</p>
                <div class="d-flex flex-wrap mb-3">
                  <span class="badge bg-secondary text-white me-2 mb-2" v-for="tag in job.tags" :key="tag">
                    {{ tag }}
                  </span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="text-success fw-medium">${{ job.salary || 'Negotiable' }}</span>
                  <span class="small">{{ job.posted || 'Recently' }}</span>
                </div>
              </div>
              <div class="card-footer bg-transparent border-top-0 pt-0 pb-3 px-4">
                <a class="btn btn-outline-primary w-100 rounded-pill fw-medium btn-hover-animate" href="/login">
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Job Categories -->
    <section class="py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold mb-3">Popular <span class="text-gradient">Categories</span></h2>
          <p class="mx-auto" style="max-width: 600px;">
            Browse jobs by your preferred category and find the perfect match for your skills
          </p>
        </div>
        <div class="row g-4">
          <div class="col-6 col-md-4 col-lg-2" v-for="(category, index) in categories" :key="category.name">
            <div 
              class="category-card rounded-4 p-3 text-center hover-scale" 
              :style="`animation-delay: ${index * 0.05}s`"
            >
              <div class="icon-container bg-primary bg-opacity-10 text-primary rounded-3 mx-auto mb-3">
                <i :class="`${category.icon} fs-4`"></i>
              </div>
              <h6 class="fw-bold mb-1">{{ category.name }}</h6>
              <small>{{ category.jobs || 0 }} jobs</small>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trusted Companies -->
    <section class="py-4" id="companies">
      <div class="container">
        <p class="text-center mb-4 slide-in-bottom">Trusted by leading companies worldwide</p>
        <div class="d-flex flex-wrap justify-content-center align-items-center company-logos">
          <img 
            src="https://logos-world.net/wp-content/uploads/2020/11/Vodafone-Logo.png" 
            height="40" 
            class="mx-4 my-2 hover-scale" 
            alt="Vodafone"
            style="filter: brightness(0) invert(var(--logo-invert))"
          >
          <img 
            src="https://logos-world.net/wp-content/uploads/2020/11/Intel-Logo.png" 
            height="40" 
            class="mx-4 my-2 hover-scale" 
            alt="Intel"
            style="filter: brightness(0) invert(var(--logo-invert))"
          >
          <img 
            src="https://logos-world.net/wp-content/uploads/2020/04/Tesla-Logo.png" 
            height="40" 
            class="mx-4 my-2 hover-scale" 
            alt="Tesla"
            style="filter: brightness(0) invert(var(--logo-invert))"
          >
          <img 
            src="https://logos-world.net/wp-content/uploads/2020/11/AMD-Logo.png" 
            height="40" 
            class="mx-4 my-2 hover-scale" 
            alt="AMD"
            style="filter: brightness(0) invert(var(--logo-invert))"
          >
          <img 
            src="https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png" 
            height="40" 
            class="mx-4 my-2 hover-scale" 
            alt="Google"
            style="filter: brightness(0) invert(var(--logo-invert))"
          >
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold mb-3">How <span class="text-gradient">JobHuntly</span> Works</h2>
          <p class="mx-auto" style="max-width: 600px;">
            Get your dream job in 4 simple steps
          </p>
        </div>
        <div class="row g-4">
          <div class="col-md-6 col-lg-3">
            <div class="step-card rounded-4 p-4 text-center position-relative hover-scale">
              <div class="step-number bg-primary text-white rounded-circle">1</div>
              <div class="icon-container bg-primary bg-opacity-10 text-primary rounded-3 mx-auto mb-3">
                <i class="bi bi-person-circle fs-4"></i>
              </div>
              <h5 class="fw-bold mb-2">Create Profile</h5>
              <p class="small mb-0">Register and build your professional profile to stand out</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="step-card rounded-4 p-4 text-center position-relative hover-scale">
              <div class="step-number bg-primary text-white rounded-circle">2</div>
              <div class="icon-container bg-primary bg-opacity-10 text-primary rounded-3 mx-auto mb-3">
                <i class="bi bi-search fs-4"></i>
              </div>
              <h5 class="fw-bold mb-2">Search Jobs</h5>
              <p class="small mb-0">Find jobs that match your skills and preferences</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="step-card rounded-4 p-4 text-center position-relative hover-scale">
              <div class="step-number bg-primary text-white rounded-circle">3</div>
              <div class="icon-container bg-primary bg-opacity-10 text-primary rounded-3 mx-auto mb-3">
                <i class="bi bi-send fs-4"></i>
              </div>
              <h5 class="fw-bold mb-2">Apply</h5>
              <p class="small mb-0">Submit your application with just one click</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="step-card rounded-4 p-4 text-center position-relative hover-scale">
              <div class="step-number bg-primary text-white rounded-circle">4</div>
              <div class="icon-container bg-primary bg-opacity-10 text-primary rounded-3 mx-auto mb-3">
                <i class="bi bi-briefcase fs-4"></i>
              </div>
              <h5 class="fw-bold mb-2">Get Hired</h5>
              <p class="small mb-0">Start your new career journey</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="cta-banner py-5 bg-primary text-white position-relative overflow-hidden">
      <div class="cta-bg-animation"></div>
      <div class="container py-4 position-relative">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <h2 class="fw-bold mb-3 slide-in-left">Start posting jobs today</h2>
            <p class="mb-4 slide-in-left delay-1">Reach thousands of qualified candidates with our affordable job posting plans.</p>
            <div class="d-flex flex-wrap slide-in-left delay-2">
              <a class="btn btn-light text-primary fw-medium me-3 mb-2 px-4 rounded-pill shadow-sm btn-hover-scale" href="/login">
                Post a Job 
              </a>
              <a class="btn btn-outline-light fw-medium mb-2 px-4 rounded-pill btn-hover-animate" href="#">
                Learn More
              </a>
            </div>
          </div>
          <div class="col-lg-6 float-in">
            <img 
              src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Hiring illustration" 
              class="img-fluid rounded-4 shadow"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-5" id="testimonials">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold mb-3">Success <span class="text-gradient">stories</span></h2>
          <p class="mx-auto slide-in-bottom" style="max-width: 600px;">
            Hear from people who found their dream jobs through JobHuntly
          </p>
        </div>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="testimonial-card p-4 rounded-4 h-100 shadow-sm slide-in-left">
              <div class="d-flex align-items-center mb-3">
                <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="User" class="rounded-circle me-3" width="50">
                <div>
                  <h6 class="mb-0 fw-bold">Sarah Johnson</h6>
                  <small>Product Designer at Google</small>
                </div>
              </div>
              <p class="mb-0">"JobHuntly helped me find my dream job in just 2 weeks! The platform is so easy to use and the job recommendations were spot on."</p>
              <div class="rating mt-3 text-warning">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="testimonial-card p-4 rounded-4 h-100 shadow-sm slide-in-bottom">
              <div class="d-flex align-items-center mb-3">
                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="User" class="rounded-circle me-3" width="50">
                <div>
                  <h6 class="mb-0 fw-bold">Michael Chen</h6>
                  <small>Senior Developer at Tesla</small>
                </div>
              </div>
              <p class="mb-0">"I was skeptical at first, but after applying to jobs through JobHuntly, I got 5 interview requests in the first week. Highly recommended!"</p>
              <div class="rating mt-3 text-warning">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-half"></i>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="testimonial-card p-4 rounded-4 h-100 shadow-sm slide-in-right">
              <div class="d-flex align-items-center mb-3">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" class="rounded-circle me-3" width="50">
                <div>
                  <h6 class="mb-0 fw-bold">Emma Rodriguez</h6>
                  <small>Marketing Manager at Intel</small>
                </div>
              </div>
              <p class="mb-0">"The quality of jobs on JobHuntly is exceptional. I found a position that matched all my criteria, and the application process was seamless."</p>
              <div class="rating mt-3 text-warning">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-5">
      <div class="container">
        <div class="newsletter-card rounded-4 p-4 p-lg-5 position-relative overflow-hidden">
          <div class="newsletter-bg-animation"></div>
          <div class="row align-items-center position-relative">
            <div class="col-lg-6 mb-4 mb-lg-0">
              <h3 class="fw-bold mb-3">Get job alerts in your inbox</h3>
              <p class="mb-0">Subscribe to our newsletter and be the first to know about new job postings that match your profile.</p>
            </div>
            <div class="col-lg-6">
              <div class="input-group">
                <input 
                  type="email" 
                  class="form-control rounded-pill border-0 shadow-sm" 
                  placeholder="Your email address"
                >
                <button class="btn btn-dark rounded-pill px-4 fw-medium btn-hover-scale">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="pt-5 pb-4">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4 mb-4">
            <div class="d-flex align-items-center mb-3">
              <i class="bi bi-search-heart-fill fs-3 text-primary me-2"></i>
              <span class="fs-3 fw-bold">JobHuntly</span>
            </div>
            <p class="mb-4">
              Great platform for job seekers passionate about startups. Find your dream job easier and faster with our curated listings.
            </p>
            <div class="social-icons">
              <a href="#" class="me-3 hover-scale"><i class="bi bi-facebook fs-5"></i></a>
              <a href="#" class="me-3 hover-scale"><i class="bi bi-twitter fs-5"></i></a>
              <a href="#" class="me-3 hover-scale"><i class="bi bi-linkedin fs-5"></i></a>
              <a href="#" class="hover-scale"><i class="bi bi-instagram fs-5"></i></a>
            </div>
          </div>
          <div class="col-md-4 col-lg-2 mb-4">
            <h5 class="fw-bold mb-3">For Candidates</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="#" class="hover-white">Browse Jobs</a></li>
              <li class="mb-2"><a href="#" class="hover-white">Browse Companies</a></li>
              <li class="mb-2"><a href="#" class="hover-white">Candidate Dashboard</a></li>
              <li class="mb-2"><a href="#" class="hover-white">Saved Jobs</a></li>
              <li><a href="#" class="hover-white">Career Advice</a></li>
            </ul>
          </div>
          <div class="col-md-4 col-lg-2 mb-4">
            <h5 class="fw-bold mb-3">For Employers</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="#" class="hover-white">Post a Job</a></li>
              <li class="mb-2"><a href="#" class="hover-white">Browse Candidates</a></li>
              <li class="mb-2"><a href="#" class="hover-white">Employer Dashboard</a></li>
              <li class="mb-2"><a href="#" class="hover-white">Pricing Plans</a></li>
              <li><a href="#" class="hover-white">Recruitment Tips</a></li>
            </ul>
          </div>
          <div class="col-md-4 col-lg-4 mb-4">
            <h5 class="fw-bold mb-3">Stay Updated</h5>
            <p class="mb-3">
              Subscribe to our newsletter for the latest job postings and career advice.
            </p>
            <div class="input-group mb-3">
              <input 
                type="email" 
                class="form-control" 
                placeholder="Your email address"
              >
              <button class="btn btn-primary btn-hover-scale" type="button">
                <i class="bi bi-envelope-fill"></i>
              </button>
            </div>
            <p class="small mb-0">
              We'll never share your email with anyone else.
            </p>
          </div>
        </div>
        <hr class="my-4">
        <div class="row">
          <div class="col-md-6 mb-3 mb-md-0">
            <p class="small mb-0">
              &copy; 2023 JobHuntly. All rights reserved.
            </p>
          </div>
          <div class="col-md-6 text-md-end">
            <a href="#" class="small me-3 hover-white">Privacy Policy</a>
            <a href="#" class="small me-3 hover-white">Terms of Service</a>
            <a href="#" class="small hover-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkMode: false,
      searchQuery: '',
      categories: [
        { name: 'Development', icon: 'bi bi-code-slash', jobs: 1250 },
        { name: 'Design', icon: 'bi bi-brush', jobs: 850 },
        { name: 'Marketing', icon: 'bi bi-megaphone', jobs: 620 },
        { name: 'Finance', icon: 'bi bi-cash-stack', jobs: 480 },
        { name: 'Healthcare', icon: 'bi bi-heart-pulse', jobs: 750 },
        { name: 'Remote', icon: 'bi bi-laptop', jobs: 1560 }
      ],
      featuredJobs: [
        {
          id: 1,
          title: 'Senior Frontend Developer',
          company: 'TechCorp',
          location: 'San Francisco, CA',
          type: 'Full Time',
          salary: '120,000 - 150,000',
          posted: '2 days ago',
          tags: ['React', 'Vue', 'JavaScript'],
          logo: 'https://logo.clearbit.com/techcorp.com',
          description: 'We are looking for an experienced frontend developer to join our team.'
        },
        {
          id: 2,
          title: 'UX/UI Designer',
          company: 'DesignHub',
          location: 'Remote',
          type: 'Contract',
          salary: '80 - 100/hr',
          posted: '1 week ago',
          tags: ['Figma', 'Sketch', 'Adobe XD'],
          logo: 'https://logo.clearbit.com/designhub.io',
          description: 'Join our design team to create beautiful user experiences.'
        },
        {
          id: 3,
          title: 'Product Manager',
          company: 'InnovateCo',
          location: 'New York, NY',
          type: 'Full Time',
          salary: '110,000 - 140,000',
          posted: '3 days ago',
          tags: ['Agile', 'Scrum', 'Product'],
          logo: 'https://logo.clearbit.com/techcorp.com',
          description: 'Lead product development from conception to launch.'
        },
        {
          id: 4,
          title: 'Backend Engineer',
          company: 'DataSystems',
          location: 'Austin, TX',
          type: 'Full Time',
          salary: '130,000 - 160,000',
          posted: 'Just now',
          tags: ['Node.js', 'Python', 'AWS'],
          logo: 'https://logo.clearbit.com/datasystems.com',
          description: 'Build scalable backend systems for our growing platform.'
        },
        {
          id: 5,
          title: 'DevOps Specialist',
          company: 'CloudTech',
          location: 'Remote',
          type: 'Full Time',
          salary: '140,000 - 170,000',
          posted: '5 days ago',
          tags: ['Docker', 'Kubernetes', 'CI/CD'],
          logo: 'https://logo.clearbit.com/datasystems.com',
          description: 'Help us build and maintain our cloud infrastructure.'
        },
        {
          id: 6,
          title: 'Data Scientist',
          company: 'AnalyticsPro',
          location: 'Boston, MA',
          type: 'Full Time',
          salary: '150,000 - 180,000',
          posted: '1 day ago',
          tags: ['Python', 'Machine Learning', 'SQL'],
          logo: 'https://logo.clearbit.com/designhub.io',
          description: 'Extract insights from large datasets to drive business decisions.'
        }
      ]
    };
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      document.documentElement.style.setProperty('--logo-invert', this.darkMode ? '1' : '0');
    },
    searchJobs() {
      console.log("Searching for:", this.searchQuery);
      if (!this.searchQuery.trim()) return;

      fetch(`http://localhost:8000/api/usersjobs/search?query=${encodeURIComponent(this.searchQuery)}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to search jobs');
          return res.json();
        })
        .then(data => {
          this.featuredJobs = data.map(job => ({
            ...job,
            posted: this.formatDate(job.created_at || new Date())
          }));
        })
        .catch(err => {
          console.error('Error searching jobs:', err);
        });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      return date.toLocaleDateString();
    },
    animateCounters() {
      const counters = document.querySelectorAll('.counter');
      const speed = 200;
      
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(this.animateCounters, 1);
        } else {
          counter.innerText = target.toLocaleString();
        }
      });
    }
  },
  mounted() {
    // Initialize dark mode
    document.documentElement.style.setProperty('--logo-invert', '0');
    
    // Initialize animations
    this.animateCounters();
    
    // Add scroll animation triggers
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, {
      threshold: 0.1
    });
    
    document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-bottom, .float-in').forEach(el => {
      observer.observe(el);
    });
  }
};
</script>

<style scoped>
:root {
  --logo-invert: 0;
}

.jobhuntly-app {
  overflow-x: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: all 0.3s ease;
}

.jobhuntly-app:not(.dark-mode) {
  --bg-color: #ffffff;
  --text-color: #212529;
  --secondary-bg: #f8f9fa;
  --card-bg: #ffffff;
  --border-color: #dee2e6;
  --hover-bg: #f1f1f1;
}

.jobhuntly-app.dark-mode {
  --bg-color: #121212;
  --text-color: #f8f9fa;
  --secondary-bg: #1e1e1e;
  --card-bg: #1e1e1e;
  --border-color: #333;
  --hover-bg: #2a2a2a;
}

/* Dark Mode Toggle */
.dark-mode-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--card-bg);
  color: var(--text-color);
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dark-mode-toggle:hover {
  transform: scale(1.1);
}

/* Text gradient */
.text-gradient {
  background: linear-gradient(90deg, #0d6efd, #00b4d8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline;
}

/* Navbar styles */
.navbar {
  padding: 0.75rem 0;
  transition: all 0.3s ease;
  background-color: var(--card-bg) !important;
}

.nav-link {
  position: relative;
  padding: 0.5rem 1rem;
  color: var(--text-color) !important;
}

.nav-link-underline {
  position: absolute;
  bottom: 0;
  left: 1rem;
  right: 1rem;
  height: 2px;
  background-color: #0d6efd;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.nav-link:hover .nav-link-underline {
  transform: scaleX(1);
  transform-origin: left;
}

/* Hero section */
.hero-section {
  background: var(--secondary-bg);
  position: relative;
  overflow: hidden;
}

.hero-bg-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(13, 110, 253, 0.03) 0%, rgba(0, 180, 216, 0.03) 100%);
  z-index: 0;
}

.search-container {
  border: 1px solid var(--border-color);
  background-color: var(--card-bg);
  transition: all 0.3s ease;
}

.search-container:focus-within {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  border-color: #0d6efd;
}

.form-control {
  background-color: var(--card-bg);
  color: var(--text-color);
  border-color: var(--border-color);
}

.form-control::placeholder {
  color: var(--text-color);
  opacity: 0.7;
}

/* Floating badges */
.floating-badge {
  position: absolute;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  animation: float 3s ease-in-out infinite;
}

.floating-badge:nth-child(2) {
  top: 20%;
  right: 10%;
  animation-delay: 0.5s;
}

.floating-badge:nth-child(3) {
  bottom: 15%;
  left: 10%;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Animation classes */
.slide-in-left {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.5s ease-out;
}

.slide-in-right {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.5s ease-out;
}

.slide-in-bottom {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.5s ease-out;
}

.float-in {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
}

.delay-1 { transition-delay: 0.1s !important; }
.delay-2 { transition-delay: 0.2s !important; }
.delay-3 { transition-delay: 0.3s !important; }

.animate {
  opacity: 1;
  transform: translate(0);
}

/* Hover effects */
.hover-scale {
  transition: all 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}

.btn-hover-animate {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-hover-animate::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  transition: width 0.3s ease;
  z-index: -1;
}

.btn-hover-animate:hover::before {
  width: 100%;
}

.btn-hover-scale:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.hover-white:hover {
  color: white !important;
  text-decoration: none;
}

/* Job cards */
.job-card {
  transition: all 0.3s ease;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color) !important;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

.job-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

/* Category cards */
.category-card {
  transition: all 0.3s ease;
  cursor: pointer;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
  background-color: var(--hover-bg) !important;
}

/* Company logos */
.company-logos img {
  opacity: 0.8;
  transition: all 0.3s ease;
}

.company-logos img:hover {
  opacity: 1;
  transform: scale(1.1);
}

/* Step cards */
.step-card {
  transition: all 0.3s ease;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
}

.step-number {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
}

/* CTA Banner */
.cta-banner {
  background: linear-gradient(135deg, #0d6efd 0%, #00b4d8 100%);
  position: relative;
  overflow: hidden;
}

.cta-bg-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  z-index: 0;
}

/* Newsletter card */
.newsletter-card {
  background: linear-gradient(135deg, #0d6efd 0%, #00b4d8 100%);
  position: relative;
  overflow: hidden;
}

.newsletter-bg-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  z-index: 0;
}

/* Testimonial cards */
.testimonial-card {
  transition: all 0.3s ease;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.rating i {
  margin-right: 2px;
}

/* Stats counter animation */
.counter {
  font-size: 2rem;
}

.stat-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(13, 110, 253, 0.1);
  background-color: var(--card-bg);
}

.stat-card:hover {
  background-color: var(--hover-bg) !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transform: translateY(-3px);
}

/* Badges */
.badge {
  transition: all 0.3s ease;
}

/* Footer */
footer {
  background-color: var(--secondary-bg);
  color: var(--text-color);
}

hr {
  background-color: var(--border-color);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section {
    text-align: center;
  }
  
  .search-container {
    margin-left: auto;
    margin-right: auto;
  }
  
  .slide-in-left, .slide-in-right, .slide-in-bottom {
    transform: translateY(20px);
  }
}
</style>