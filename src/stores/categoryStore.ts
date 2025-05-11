import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get('http://localhost:3000/category')
      categories.value = response.data
    } catch (err) {
      error.value = 'Failed to fetch categories'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const getCategoryNameById = (id: number | string) => {
    const category = categories.value.find(cat => cat.id == id)
    return category ? category.category_name : 'Unknown'
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
    getCategoryNameById
  }
})
