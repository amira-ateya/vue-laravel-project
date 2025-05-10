import { defineStore } from 'pinia';

export const useJobStore = defineStore('jobStore', {
  state: () => ({
    jobs: [],
  }),
  actions: {
    async fetchJobs() {
      try {
        const response = await fetch('http://localhost:3000/jobs'); // URL to json-server
        const data = await response.json();
        
        // Store the fetched jobs
        this.jobs = data;
        // console.log('Fetched jobs:', this.jobs); 
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    },
    addJob(newJob) {
      this.jobs.push(newJob);
    },
    updateJob(id, updatedData) {
      const index = this.jobs.findIndex(job => job.id === id);
      if (index !== -1) {
        this.jobs[index] = { ...this.jobs[index], ...updatedData };
      }
    },
    deleteJob(id) {
      this.jobs = this.jobs.filter(job => job.id !== id);
    },
    approveJob(id) {
      const index = this.jobs.findIndex(job => job.id === id);
      if (index !== -1) {
        this.jobs[index].status = 'approved';
      }
    },
    filterJobs(filters) {
      // Filtering logic here
    }
  }
});
