import { defineStore } from 'pinia'
import type { Dish } from '~/modules/dish/types'

export interface Order {
  id: number
  date: string
  items: Dish[]
  total: number
}

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [] as Order[]
  }),

  getters: {
    getAllOrders: (state) => state.orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  },

  actions: {
    addOrder(items: Dish[], total: number) {
      const newOrder: Order = {
        id: Date.now(), // ID simple basé sur timestamp
        date: new Date().toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        items: [...items], // Copie des items
        total: total
      }
      
      this.orders.push(newOrder)
    }
  },
  persist: true
})