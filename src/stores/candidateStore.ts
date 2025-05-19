import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCandidateStore = defineStore('candidate', () => {
  const candidates = ref([])
  const loading = ref(false)
  const error = ref(null)

  //[UPDATED]
  const apiUrl = 'http://localhost:8000/api/candidates'

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

  /*
  here we taking the candidate data as input
  and make the method post to the url, we have
  */
  const createCandidate = async (candidateData: any) => {
    try {
      
      // the most important code line-------------------
      const res = await axios.post(apiUrl, candidateData)
      //-------------------------------------------------

      //[UPDATED]
      candidates.value.push(res.data.candidate)

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
