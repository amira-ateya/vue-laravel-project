import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export interface Candidate {
    id: string;
    user_id: string;
    resume: string;
    linkedin_profile: string;
    phone_number: string;
    twitter_profile: string;
    instagram_profile: string;
    website: string;
    experience_level: 'junior' | 'mid' | 'senior' | string; // use specific levels if known
    location: string;
    gender: 'Male' | 'Female' | 'Other' | string;
    date_of_birth: string; // Format: YYYY-MM-DD
    languages: string; // Could be parsed into string[]
    address: string;
    bio: string;
    current_job: string;
    highest_qualification: string;
    experience_years: number;
    skills: string; // Could be parsed into string[]
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
  }
  

export const useCandidateStore = defineStore('candidate', () => {
  const candidates = ref<Candidate[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const apiUrl = 'http://localhost:3000/candidates'

  const fetchCandidates = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get(apiUrl)
      candidates.value = res.data
    } catch (err) {
        error.value = 'Failed to load candidate data'
    } finally {
      loading.value = false
    }
  }

  const createCandidate = async (candidateData: any) => {
    try {
      const res = await axios.post(apiUrl, candidateData)
      candidates.value.push(res.data)
    } catch (err) {
        error.value = 'Failed to create candidate account'
    }
  }

  return {
    candidates,
    loading,
    error,
    fetchCandidates,
    createCandidate
  }
})
