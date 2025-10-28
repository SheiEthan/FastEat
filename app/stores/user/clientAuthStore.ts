import { defineStore } from 'pinia'

export const useClientAuthStore = defineStore('clientAuth', {
  state: () => ({
    user: null as null | { id: string; [key: string]: any },
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    setUser(user: any) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
    loadFromStorage() {
      const data = localStorage.getItem('user')
      if (data) {
        try {
          this.user = JSON.parse(data)
        } catch {
          this.user = null
          localStorage.removeItem('user')
        }
      } else {
        this.user = null
      }
    },
    saveToStorage() {
      if (this.user) {
        localStorage.setItem('user', JSON.stringify(this.user))
      } else {
        localStorage.removeItem('user')
      }
    },
    logout() {
      this.clearUser()
      localStorage.removeItem('user')
    }
  },
  persist: true,
})
