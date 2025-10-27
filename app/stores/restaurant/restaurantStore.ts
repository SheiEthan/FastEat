import { defineStore } from 'pinia'
import type { Restaurant } from '~/modules/restaurant/types'

export const useRestaurantStore = defineStore('restaurant', {
  state: () => ({
    restaurants: [] as Restaurant[],
    selectedRestaurant: null as Restaurant | null,
    searchQuery: '',
  }),
  actions: {
    setRestaurants(restaurants: Restaurant[]) {
      this.restaurants = restaurants
    },
    selectRestaurant(restaurant: Restaurant) {
      this.selectedRestaurant = restaurant
    },
    setSearchQuery(query: string) {
      this.searchQuery = query
    },
    clearSelection() {
      this.selectedRestaurant = null
    },
  },
  persist: true,
})
