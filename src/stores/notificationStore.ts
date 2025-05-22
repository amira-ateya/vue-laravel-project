import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<any[]>([]) 
  const loading = ref(false)
  const error = ref<string | null>(null)

  const addNotification = (notification: any) => {
    const id = Date.now()
    notifications.value.push({
      ...notification,
      id,
      createdAt: new Date()
    })

    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }

  const removeNotification = (id: number) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  const clearNotifications = () => {
    notifications.value = []
  }

  const filterByType = (type: string) => {
    return notifications.value.filter(n => n.type === type)
  }

  return {
    notifications,
    loading,
    error,
    addNotification,
    removeNotification,
    clearNotifications,
    filterByType
  }
})
