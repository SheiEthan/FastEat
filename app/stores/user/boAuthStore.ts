import { defineStore } from 'pinia'

export const useBoAuthStore = defineStore('boAuth', {
  state: () => ({
    user: null as null | { id: string; role: string; [key: string]: any },
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
      const data = localStorage.getItem('bo-user')
      if (data) {
        try {
          this.user = JSON.parse(data)
        } catch {
          this.user = null
          localStorage.removeItem('bo-user')
        }
      } else {
        this.user = null
      }
    },
    saveToStorage() {
      if (this.user) {
        localStorage.setItem('bo-user', JSON.stringify(this.user))
      } else {
        localStorage.removeItem('bo-user')
      }
    },
    logout() {
      this.clearUser()
      localStorage.removeItem('bo-user')
    }
  },
  persist: true,
})
