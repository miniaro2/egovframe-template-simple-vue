// src/composables/useStorage.js
import { reactive } from 'vue'

export const useStorage = () => {
  const storage = reactive({
    getSessionItem(key) {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : null
    },
    
    setSessionItem(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value))
    }
  })

  return storage
}