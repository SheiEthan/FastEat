import { defineStore } from 'pinia'
import type { Client } from '~/modules/client/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as Client | null,
    role: '' as string,
    isAuthenticated: false,
  }),
  actions: {
    setUser(user: Client, role: string) {
      this.user = user
      this.role = role
      this.isAuthenticated = true
    },
    logout() {
      this.user = null
      this.role = ''
      this.isAuthenticated = false
    },
  },
  persist: true,
})
