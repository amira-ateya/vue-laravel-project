<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">JobHuntly</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#">Find Jobs</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Browse Companies</a>
            </li>
          </ul>
          <div>
            <a href="/login" class="btn btn-link">Login</a>
            <a href="/register" class="btn btn-primary">Sign Up</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="py-5 bg-light text-center">
      <div class="container">
        <h1 class="display-4 fw-bold">Discover more than <span class="text-primary">5000+ Jobs</span></h1>
        <p class="text-muted mt-3 mb-4">Great platform for the job seeker that searching for new career heights and passionate about startups.</p>
        <div class="input-group mb-3 mx-auto" style="max-width: 700px;">
          <input type="text" class="form-control" placeholder="Job title or keyword">
          <select class="form-select">
            <option selected>Florence, Italy</option>
          </select>
         <input v-model="searchQuery" type="text" class="form-control" placeholder="Job title or keyword">
<button class="btn btn-primary" @click="searchJobs">Search my job</button>
        </div>
        <small class="text-muted">Popular: UI Designer, UX Researcher, Android, Admin</small>
      </div>
    </section>

    <!-- Company Logos -->
    <section class="py-4 bg-white">
      <div class="container text-center d-flex justify-content-around flex-wrap">
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Vodafone_icon.svg" height="40" class="mx-2 grayscale">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg" height="40" class="mx-2 grayscale">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" height="40" class="mx-2 grayscale">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/AMD_Logo.svg" height="40" class="mx-2 grayscale">
      </div>
    </section>

    <!-- Categories -->
    <section class="py-5">
      <div class="container">
        <div class="d-flex justify-content-between mb-4">
          <h3>Explore by <span class="text-primary">category</span></h3>
          <a href="#">Show all jobs →</a>
        </div>
        <div class="row g-4">
          <div class="col-md-3" v-for="cat in categories" :key="cat.name">
            <div class="border rounded p-4 text-center h-100 category-card">
              <i :class="cat.icon" class="fs-1 text-primary mb-3"></i>
              <h6>{{ cat.name }}</h6>
              <p class="text-muted">{{ cat.jobs }} jobs available</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="bg-primary text-white py-5">
      <div class="container d-flex justify-content-between align-items-center flex-wrap">
        <div class="mb-3">
          <h3 class="fw-bold">Start posting jobs today</h3>
          <p>Start posting jobs for only $10.</p>
          <button class="btn btn-light fw-semibold">Sign Up For Free</button>
        </div>
        <img src="https://preview.cruip.com/maillink/images/dashboard.png" alt="Dashboard" class="img-fluid" style="max-width: 45%;">
      </div>
    </section>

    <!-- Featured Jobs -->
    <section class="py-5">
      <div class="container">
        <div class="d-flex justify-content-between mb-4">
          <h3>Featured <span class="text-primary">jobs</span></h3>
          <a href="#">Show all jobs →</a>
        </div>
        <div class="row g-4">
          <div class="col-md-4" v-for="job in featuredJobs" :key="job.id">
            <div class="card h-100">
              <div class="card-body">
                <span class="badge bg-primary float-end">Full Time</span>
                <h5 class="card-title">{{ job.title }}</h5>
                <p class="text-muted">{{ job.company }} - {{ job.location }}</p>
                <div>
                  <span class="badge bg-warning text-dark me-1" v-for="tag in job.tags" :key="tag">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h5>JobHuntly</h5>
            <p>Great platform for the job seeker passionate about startups. Find your dream job easier.</p>
          </div>
          <div class="col-md-2">
            <h6>About</h6>
            <ul class="list-unstyled">
              <li><a href="#" class="text-white-50">Companies</a></li>
              <li><a href="#" class="text-white-50">Pricing</a></li>
              <li><a href="#" class="text-white-50">Terms</a></li>
              <li><a href="#" class="text-white-50">Advice</a></li>
            </ul>
          </div>
          <div class="col-md-2">
            <h6>Resources</h6>
            <ul class="list-unstyled">
              <li><a href="#" class="text-white-50">Help Docs</a></li>
              <li><a href="#" class="text-white-50">Guide</a></li>
              <li><a href="#" class="text-white-50">Updates</a></li>
              <li><a href="#" class="text-white-50">Contact</a></li>
            </ul>
          </div>
          <div class="col-md-4">
            <h6>Get job notifications</h6>
            <p>The latest job news, articles, sent to your inbox weekly.</p>
            <div class="input-group">
              <input type="email" class="form-control" placeholder="Email Address">
              <button class="btn btn-primary">Subscribe</button>
            </div>
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
      categories: [
        { name: 'Design', jobs: 235, icon: 'bi bi-pencil' },
        { name: 'Sales', jobs: 756, icon: 'bi bi-bar-chart' },
        { name: 'Marketing', jobs: 140, icon: 'bi bi-megaphone' },
        { name: 'Finance', jobs: 325, icon: 'bi bi-cash-stack' },
        { name: 'Technology', jobs: 436, icon: 'bi bi-cpu' },
        { name: 'Engineering', jobs: 542, icon: 'bi bi-gear' },
        { name: 'Business', jobs: 211, icon: 'bi bi-briefcase' },
        { name: 'Human Resource', jobs: 346, icon: 'bi bi-people' },
      ],
      featuredJobs: []
    };
  },
  methods:{
searchJobs() {
    if (!this.searchQuery.trim()) return;

    fetch(`http://localhost:8000/api/search-jobs?query=${this.searchQuery}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to search jobs');
        return res.json();
      })
      .then(data => {
        this.featuredJobs = data;
      })
      .catch(err => {
        console.error('Error searching jobs:', err);
      });
  }
  },
  mounted() {
   fetch('http://localhost:8000/api/jobs')
  .then(res => {
    console.log('Raw Response:', res);
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json(); // this line can also fail if response is not JSON
  })
  .then(data => {
    console.log('Parsed JSON:', data);
    this.featuredJobs = data.slice(0, 6); // Show top 6 jobs
  })
  .catch(err => {
    console.error('Error fetching featured jobs:', err);
  });

  }
};
</script>

<style>
body {
  font-family: 'Segoe UI', sans-serif;
}
.grayscale {
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}
.grayscale:hover {
  filter: none;
  opacity: 1;
}
.category-card:hover {
  border-color: #0d6efd;
  transform: translateY(-5px);
}
</style>
