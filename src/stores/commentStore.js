// src/stores/commentStore.js
import { defineStore } from 'pinia'

export const useCommentStore = defineStore('commentStore', {
  state: () => ({
    comments: [],
  }),
  actions: {
    fetchComments(jobId) {
      // logic here
    },
    addComment(comment) {
      // logic here
    },
    deleteComment(id) {
      // logic here (admin moderation)
    }
  }
})
