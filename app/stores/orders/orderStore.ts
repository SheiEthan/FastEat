import { defineStore } from 'pinia'
import type { Dish } from '~/modules/dish/types'
import type { Order } from '~/modules/order/types'

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
        id: Date.now(),
        date: new Date().toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        items: [...items],
        total: total
      }
      this.orders.push(newOrder)
    },

    placeOrder(cartListStore: any, totalPrice: number) {
      if (cartListStore.dishes.length > 0) {
        this.addOrder(cartListStore.dishes, totalPrice)
        cartListStore.dishes.length = 0
        navigateTo('/order')
      }
    }
  },
  persist: true
})