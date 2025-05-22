<template>
  <div class="jobhuntly-app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm sticky-top">
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
              </a>
            </li>
          
            
          </ul>
          <div class="d-flex align-items-center">
            <a href="/login" class="btn btn-outline-primary me-2 px-3 rounded-pill fw-medium">Login</a>
            <a href="/register" class="btn btn-primary px-3 rounded-pill fw-medium shadow-sm">
              <i class="bi bi-person-plus me-1"></i> Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section py-5 bg-light">
      <div class="container py-4">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <h1 class="display-4 fw-bold mb-4">
              Discover your <span class="text-gradient">dream job</span> with us
            </h1>
            <p class="lead text-muted mb-4">
              Great platform for job seekers searching for new career heights and passionate about startups.
            </p>
            <div class="search-container bg-white rounded-4 shadow-sm p-3 mb-3">
              <div class="input-group">
                <span class="input-group-text bg-transparent border-0">
                  <i class="bi bi-search text-muted"></i>
                </span>
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  class="form-control border-0" 
                  placeholder="Job title, keywords, or company"
                  @keyup.enter="searchJobs"
                >
             
                <button 
                  class="btn btn-primary px-4 rounded-pill fw-medium" 
                  @click="searchJobs"
                >
                  Search Jobs
                </button>
              </div>
            </div>
            
          </div>
          <div class="col-lg-6">
            <div class="hero-image position-relative">
          
           
            
            </div>
          </div>
        </div>
      </div>
    </section>

     <!-- Featured Jobs -->
    <section class="py-5">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <h2 class="fw-bold mb-2">Featured <span class="text-gradient">jobs</span></h2>
            <p class="text-muted">Recently added top jobs</p>
          </div>
          <a href="#" class="btn btn-outline-primary rounded-pill px-4 fw-medium">
            View all jobs <i class="bi bi-arrow-right ms-1"></i>
          </a>
        </div>
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="job in featuredJobs" :key="job.id">
            <div class="job-card card border-0 rounded-4 h-100 shadow-sm-hover transition-all">
              <div class="card-body p-4">
                <div class="d-flex align-items-start mb-3">
                  <img :src="job.logo" alt="Company logo" class="rounded-3 me-3" width="50" height="50">
                  <div>
                    <span class="badge bg-primary bg-opacity-10 text-primary float-end">{{ job.type || 'Full Time' }}</span>
                    <h5 class="card-title fw-bold mb-1">{{ job.title }}</h5>
                    <p class="text-muted small mb-2">{{ job.company }} • {{ job.location }}</p>
                  </div>
                </div>
                <p class="card-text text-muted small mb-3">{{ job.description || 'No description available' }}</p>
                <div class="d-flex flex-wrap mb-3">
                  <span class="badge bg-light text-dark me-2 mb-2" v-for="tag in job.tags" :key="tag">
                    {{ tag }}
                  </span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="text-success fw-medium">${{ job.salary || 'Negotiable' }}</span>
                  <span class="text-muted small">{{ job.posted || 'Recently' }}</span>
                </div>
              </div>
              <div class="card-footer bg-transparent border-top-0 pt-0 pb-3 px-4">
                <a class="btn btn-outline-primary w-100 rounded-pill fw-medium" href="/login">
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trusted Companies -->
    <section class="py-4 bg-white">
      <div class="container">
        <p class="text-center text-muted mb-4">Trusted by leading companies worldwide</p>
        <div class="d-flex flex-wrap justify-content-center align-items-center company-logos">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Vodafone_icon.svg" height="40" class="mx-4 my-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg" height="40" class="mx-4 my-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" height="40" class="mx-4 my-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/AMD_Logo.svg" height="40" class="mx-4 my-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" height="40" class="mx-4 my-2">
        </div>
      </div>
    </section>

    
   

    <!-- CTA Banner -->
    <section class="cta-banner py-5 bg-primary text-white">
      <div class="container py-4">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <h2 class="fw-bold mb-3">Start posting jobs today</h2>
            <p class="mb-4">Reach thousands of qualified candidates with our affordable job posting plans.</p>
            <div class="d-flex flex-wrap">
              <a class="btn btn-light text-primary fw-medium me-3 mb-2 px-4 rounded-pill shadow-sm" href="/login">
                Post a Job 
              </a>
            
            </div>
          </div>
          <div class="col-lg-6">
            <img 
              src="https://illustrations.popsy.co/amber/business-3d-businessman-with-curriculum.svg" 
              alt="Hiring illustration" 
              class="img-fluid rounded-4 shadow"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold mb-3">Success <span class="text-gradient">stories</span></h2>
          <p class="text-muted mx-auto" style="max-width: 600px;">
            Hear from people who found their dream jobs through JobHuntly
          </p>
        </div>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="testimonial-card bg-white p-4 rounded-4 h-100 shadow-sm">
              <div class="d-flex align-items-center mb-3">
                <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="User" class="rounded-circle me-3" width="50">
                <div>
                  <h6 class="mb-0 fw-bold">Sarah Johnson</h6>
                  <small class="text-muted">Product Designer at Google</small>
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
            <div class="testimonial-card bg-white p-4 rounded-4 h-100 shadow-sm">
              <div class="d-flex align-items-center mb-3">
                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="User" class="rounded-circle me-3" width="50">
                <div>
                  <h6 class="mb-0 fw-bold">Michael Chen</h6>
                  <small class="text-muted">Senior Developer at Tesla</small>
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
            <div class="testimonial-card bg-white p-4 rounded-4 h-100 shadow-sm">
              <div class="d-flex align-items-center mb-3">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" class="rounded-circle me-3" width="50">
                <div>
                  <h6 class="mb-0 fw-bold">Emma Rodriguez</h6>
                  <small class="text-muted">Marketing Manager at Intel</small>
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

    <!-- Footer -->
    <footer class="bg-dark text-white pt-5 pb-4">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4 mb-4">
            <div class="d-flex align-items-center mb-3">
              <i class="bi bi-search-heart-fill fs-3 text-primary me-2"></i>
              <span class="fs-3 fw-bold">JobHuntly</span>
            </div>
            <p class="text-white-50 mb-4">
              Great platform for job seekers passionate about startups. Find your dream job easier and faster with our curated listings.
            </p>
            <div class="social-icons">
              <a href="#" class="text-white me-3"><i class="bi bi-facebook fs-5"></i></a>
              <a href="#" class="text-white me-3"><i class="bi bi-twitter fs-5"></i></a>
              <a href="#" class="text-white me-3"><i class="bi bi-linkedin fs-5"></i></a>
              <a href="#" class="text-white"><i class="bi bi-instagram fs-5"></i></a>
            </div>
          </div>
          <div class="col-md-4 col-lg-2 mb-4">
            <h5 class="fw-bold mb-3">For Candidates</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="#" class="text-white-50 hover-white">Browse Jobs</a></li>
              <li class="mb-2"><a href="#" class="text-white-50 hover-white">Browse Companies</a></li>
              <li class="mb-2"><a href="#" class="text-white-50 hover-white">Candidate Dashboard</a></li>
              <li class="mb-2"><a href="#" class="text-white-50 hover-white">Saved Jobs</a></li>
              <li><a href="#" class="text-white-50 hover-white">Career Advice</a></li>
            </ul>
          </div>
          <div class="col-md-4 col-lg-2 mb-4">
            <h5 class="fw-bold mb-3">For Employers</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="#" class="text-white-50 hover-white">Post a Job</a></li>
              <li class="mb-2"><a href="#" class="text-white-50 hover-white">Browse Candidates</a></li>
              <li class="mb-2"><a href="#" class="text-white-50 hover-white">Employer Dashboard</a></li>
              <li class="mb-2"><a href="#" class="text-white-50 hover-white">Pricing Plans</a></li>
              <li><a href="#" class="text-white-50 hover-white">Recruitment Tips</a></li>
            </ul>
          </div>
          <div class="col-md-4 col-lg-4 mb-4">
            <h5 class="fw-bold mb-3">Stay Updated</h5>
            <p class="text-white-50 mb-3">
              Subscribe to our newsletter for the latest job postings and career advice.
            </p>
            <div class="input-group mb-3">
              <input 
                type="email" 
                class="form-control bg-dark border-secondary text-white" 
                placeholder="Your email address"
              >
              <button class="btn btn-primary" type="button">
                <i class="bi bi-envelope-fill"></i>
              </button>
            </div>
            <p class="text-white-50 small mb-0">
              We'll never share your email with anyone else.
            </p>
          </div>
        </div>
        <hr class="my-4 bg-secondary">
        <div class="row">
          <div class="col-md-6 mb-3 mb-md-0">
            <p class="text-white-50 small mb-0">
              &copy; 2023 JobHuntly. All rights reserved.
            </p>
          </div>
          <div class="col-md-6 text-md-end">
            <a href="#" class="text-white-50 small me-3 hover-white">Privacy Policy</a>
            <a href="#" class="text-white-50 small me-3 hover-white">Terms of Service</a>
            <a href="#" class="text-white-50 small hover-white">Cookies</a>
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
      searchQuery: '',
      categories: [],
      featuredJobs: []
    };
  },
 methods: {
  
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
  }
}
,
  mounted() {
    // fetch('http://localhost:8000/api/categories')
    
    //   .then(res => {
    //     if (!res.ok) throw new Error('Failed to fetch categories');
    //     return res.json();
       
    //   })
    //   .then(data => {
    //     console.log(data)
    //     this.categories = data.map(cat => ({
    //       name: cat.category_name,
    //       icon: cat.category_icon || 'bi bi-folder',  
    //       jobs: 0, 
    //     }));
    //   })
    //   .catch(err => {
    //     console.error('Error fetching categories:', err);
    //     // fallback if needed
    //   });
    fetch('http://localhost:8000/api/jobs')
      .then(res => {
        console.log('Raw Response:', res);
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        console.log('Parsed JSON:', data);
        this.featuredJobs = data.slice(0, 6).map(job => ({
          ...job,
          posted: this.formatDate(job.posted || new Date())
        }));
        
      })
      .catch(err => {
        console.error('Error fetching featured jobs:', err);
        // Fallback data if API fails
        
      });
      
  }
};
</script>

<style scoped>
.jobhuntly-app {
  overflow-x: hidden;
}

.text-gradient {
  background: linear-gradient(90deg, #0d6efd, #00b4d8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline;
}

.navbar {
  padding: 0.75rem 0;
}

.nav-link {
  position: relative;
  padding: 0.5rem 1rem;
}

.nav-link:hover::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 1rem;
  right: 1rem;
  height: 2px;
  background-color: #0d6efd;
}

.hero-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.search-container {
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.hero-image {
  max-width: 100%;
  height: auto;
}

.stats-card {
  width: 140px;
}

.company-logos img {
  filter: grayscale(100%);
  opacity: 0.6;
  transition: all 0.3s ease;
}

.company-logos img:hover {
  filter: grayscale(0%);
  opacity: 1;
}


.category-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.icon-container {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}


.job-card {
  transition: all 0.3s ease;
}

.job-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.cta-banner {
  background: linear-gradient(135deg, #0d6efd 0%, #00b4d8 100%);
}

.testimonial-card {
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.rating i {
  margin-right: 2px;
}

.hover-white:hover {
  color: white !important;
  text-decoration: none;
}

.transition-all {
  transition: all 0.3s ease;
}

.shadow-sm-hover:hover {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

@media (max-width: 768px) {
  .hero-section {
    text-align: center;
  }
  
  .search-container {
    margin-left: auto;
    margin-right: auto;
  }
  
  .stats-card {
    width: 120px;
  }
}
</style>