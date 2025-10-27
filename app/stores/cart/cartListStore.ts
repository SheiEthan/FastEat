import { defineStore } from "pinia";


import type { Dish } from "~/modules/dish/types";

export type CartDish = Dish & { quantity: number };

export const useCartListStore = defineStore("cartList", {
  state: () => {
    return {
  dishes: [] as CartDish[],
    };
  },
  getters: {
    isDishInCart: (state) => (dish: Dish) => {
      return state.dishes.some((d: CartDish) => d.id === dish.id);
    },
  },
  actions: {
    addDish(dish: Dish & { quantity?: number }) {
      const found = this.dishes.find((d: CartDish) => d.id === dish.id);
      const qtyToAdd = dish.quantity && dish.quantity > 0 ? dish.quantity : 1;
      if (found) {
        found.quantity = found.quantity + qtyToAdd;
      } else {
        this.dishes.push({ ...dish, quantity: qtyToAdd });
      }
    },
    removeDish(dish: Dish) {
      this.dishes = this.dishes.filter(
        (dishItem: CartDish) => dishItem.id !== dish.id
      );
    },
    incrementQuantity(dish: Dish) {
      const found = this.dishes.find((d: CartDish) => d.id === dish.id);
      if (found) {
        found.quantity = found.quantity + 1;
      }
    },
    decrementQuantity(dish: Dish) {
      const found = this.dishes.find((d: CartDish) => d.id === dish.id);
      if (found && found.quantity > 1) {
        found.quantity -= 1;
      }
    },
  },
  persist: true,
});
