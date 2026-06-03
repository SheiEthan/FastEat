import { defineStore } from 'pinia'
import type { Order } from '~/modules/order/types'
import { useClientAuthStore } from '~/stores/user/clientAuthStore'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [] as Order[],
  }),

  getters: {
    getAllOrders: (state) =>
      [...state.orders].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
  },

  actions: {
    async fetchOrders() {
      const clientAuth = useClientAuthStore()
      clientAuth.loadFromStorage()
      const token = clientAuth.user?.token
      const userId = clientAuth.user?.id
      if (!token || !userId) return

      try {
        const result = await $fetch<{ data: Order[] }>(`/api/users/${userId}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.orders = result.data ?? []
      } catch (e) {
        console.error('Erreur chargement commandes:', e)
      }
    },

    async placeOrder(cartListStore: any) {
      const clientAuth = useClientAuthStore()
      clientAuth.loadFromStorage()
      const token = clientAuth.user?.token
      if (!token) {
        navigateTo('/auth')
        return
      }

      const firstRestaurantId = cartListStore.dishes[0]?.restaurantId
      if (!firstRestaurantId) return

      const deliveryAddress = clientAuth.user?.street || '1 Rue de la Livraison'
      const deliveryCity = clientAuth.user?.city || 'Paris'

      const order = await $fetch<Order>('/api/orders', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: {
          restaurantId: firstRestaurantId,
          deliveryAddress,
          deliveryCity,
          items: cartListStore.dishes.map((d: any) => ({
            dishId: d.id,
            quantity: d.quantity ?? 1,
          })),
        },
      })

      this.orders.unshift(order)
      cartListStore.dishes.length = 0
      navigateTo('/order')
    },
  },

  persist: false,
})
