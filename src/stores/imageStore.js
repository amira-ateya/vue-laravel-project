// imageStore.js (Store File)

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useImageStore = defineStore('imageStore', () => {
  const profileImageUrl = ref('')
  const companyLogoUrl = ref('')

  // Simulate image upload
  const uploadProfileImage = (file) => {
    // Simulate uploading and save the image to a folder
    const imageUrl = URL.createObjectURL(file)
    profileImageUrl.value = imageUrl  // Save the image URL in the store
  }

  const uploadCompanyLogo = (file) => {
    // Simulate uploading and save the image to a folder
    const imageUrl = URL.createObjectURL(file)
    companyLogoUrl.value = imageUrl  // Save the image URL in the store
  }

  return {
    profileImageUrl,
    companyLogoUrl,
    uploadProfileImage,
    uploadCompanyLogo
  }
})
