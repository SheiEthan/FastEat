<template>
  <div class="col-lg-6">
    <NuxtLink :to="`/restaurants/${restaurantSlug}`">
      <div class="card text-bg-dark">
        <div class="image h-100">
          <img :src="restaurant.image" class="card-img-top h-100" :alt="restaurant.name" />
        </div>
        <div class="card-img-overlay">
          <h5 class="card-title">{{ restaurant.name }}</h5>
          <p class="card-text">{{ restaurant.city }}</p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Restaurant } from "~/modules/restaurant/types";
import { createRestaurantSlug } from "~/utils/slugs";

// Définir les props
const props = defineProps<{
  restaurant: Restaurant;
}>();

// Créer le slug pour le restaurant
const restaurantSlug = computed(() => createRestaurantSlug(props.restaurant));
</script>

<style scoped>

</style>