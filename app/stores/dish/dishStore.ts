import { defineStore } from 'pinia'
import type { Dish } from '~/modules/dish/types'

export const useDishStore = defineStore('dish', {
  state: () => ({
    dishes: [] as Dish[],
    selectedDish: null as Dish | null,
    categories: [] as string[],
  }),
  actions: {
    setDishes(dishes: Dish[]) {
      this.dishes = dishes
    },
    selectDish(dish: Dish) {
      this.selectedDish = dish
    },
    setCategories(categories: string[]) {
      this.categories = categories
    },
    clearSelection() {
      this.selectedDish = null
    },
  },
  persist: true,
})
