<template>
  <div class="col-lg-3">
    <div class="position-relative h-100">
      <NuxtLink :to="`/restaurants/${restaurantSlug}/plats/${dishSlug}`" class="dish-card">
          <div class="card">
              <img :src="props.dish.image" class="card-img-top" :alt="props.dish.name" />
              <div class="card-body">
                  <h5 class="card-title">{{ props.dish.name }}</h5>
                  <div class="price">{{ props.dish.price }} €</div>
                  <p class="card-text">{{ props.dish.description }}</p>
              </div>
          </div>
      </NuxtLink>    
      <button
          @click="addCart"
          class="btn btn-primary"
          >
          Ajouter au panier
      </button>
      <ToastNotification :message="toastMessage" :visible="showToast" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Dish } from "~/modules/dish/types";
import { useCartListStore } from "~/stores/cart/cartListStore";
import { createRestaurantSlug, createDishSlug } from "~/utils/slugs";
import ToastNotification from '@/components/ToastNotification.vue'

const props = defineProps<{
  dish: Dish;
  restaurantName: string;
}>();

const cartListStore = useCartListStore();
const showToast = ref(false);
const toastMessage = ref("");
const quantity = ref(1);

const addCart = () => {
  cartListStore.addDish({ ...props.dish, quantity: quantity.value });
  toastMessage.value = `${quantity.value}x "${props.dish.name}" ajouté au panier !`;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 5000);
};

const dishSlug = computed(() => createDishSlug(props.dish));
const restaurantSlug = computed(() => createRestaurantSlug({ 
  id: props.dish.restaurantId, 
  name: props.restaurantName 
}));
</script>

<style scoped>
</style>