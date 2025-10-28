import { defineStore } from 'pinia'
import type { Client } from '~/modules/client/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as Client | null,
    isAuthenticated: false,
  }),
  actions: {
    setUser(user: Client) {
      this.user = user
      this.isAuthenticated = true
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
    },
  },
  persist: true,
})
