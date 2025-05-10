// src/stores/notificationStore.js
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notificationStore', {
  state: () => ({
    notifications: [],
  }),
  actions: {
    fetchNotifications(userId) {
      // logic here
    },
    addNotification(notification) {
      // logic here
    },
    clearNotification(id) {
      // logic here
    }
  }
})
