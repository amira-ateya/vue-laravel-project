import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCategoryStore = defineStore('category', () => {


  // INTERFACE
  interface Category{
    "id": String,
    "category_icon": String,
    "category_name": String,
    "category_description": String 
  };

  // VARS
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)



  // FETCH CATS
  const fetchCategories = async () => {

    // vars
    loading.value = true
    error.value = null

    try {
      // get data-------------------------------------------------------
      const response = await axios.get('http://localhost:3000/category')
      categories.value = response.data
      //----------------------------------------------------------------

    } 
    //failing message
    catch (err) {
      error.value = 'Failed to fetch categories'
      console.error(err)

    } 
    // stop loading anyway
    finally {
      loading.value = false
    }
  }

  // GET CAT NAME BY ID
  const getCategoryNameById = (id: number | string) => {
    const category = categories.value.find(cat => cat.id == id)
    return category ? category.category_name : 'Unknown'
  }



///////////////////////////////////////////////////////////////////
  return {
    categories,
    loading,
    error,
    fetchCategories,
    getCategoryNameById
  }
})
