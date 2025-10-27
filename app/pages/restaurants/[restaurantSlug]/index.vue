<script setup lang="ts">
import DishItem from "~/components/DishItem.vue";
import type { Restaurant } from "~/modules/restaurant/types";
import type { Dish } from "~/modules/dish/types";
import { extractIdFromSlug } from "~/utils/slugs";

const route = useRoute();
const restaurantSlug = route.params.restaurantSlug as string;
const restaurant_id: number = extractIdFromSlug(restaurantSlug);

// Récupérer les données du restaurant
const { data: restaurant } = await useAsyncData("restaurant", () =>
  $fetch<Restaurant>(`/api/restaurants/${restaurant_id}`)
);

// Récupérer tous les plats
const { data: allDishes } = await useAsyncData("dishes", () =>
  $fetch<Dish[]>("/api/dishes")
);

// Filtrer les plats pour ce restaurant
const restaurantDishes = computed(() => {
  return allDishes.value?.filter(dish => dish.restaurantId === restaurant_id) || [];
});

if (!restaurant.value) {
  throw createError({
    statusCode: 404,
  });
}
</script>

<template>
  <div class="page-restaurant-details">
    <!-- Banner du restaurant -->
    <div class="restaurant-banner">
      <div class="banner-image">
        <img :src="restaurant?.image" :alt="restaurant?.name" class="restaurant-cover">
        <div class="banner-overlay">
          <div class="restaurant-info">
            <h1>{{ restaurant?.name }}</h1>
            <p>{{ restaurant?.description }}</p>
            <div class="restaurant-meta">
              <span class="rating">⭐ 4.5</span>
              <span class="delivery">🚚 25-35 min</span>
              <span class="price">💰 €€</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section des plats -->
    <div class="dishes-section">
      <div class="container">
        <div class="section-header">
          <h2>🍽️ Notre Carte</h2>
          <p>Découvrez tous nos délicieux plats</p>
        </div>

        <div v-if="restaurantDishes.length === 0" class="no-dishes">
          <div class="no-dishes-icon">🍽️</div>
          <h3>Aucun plat disponible</h3>
          <p>Ce restaurant met à jour sa carte régulièrement</p>
        </div>

        <div v-else class="dishes-grid row g-3">
          <DishItem 
            :dish="dish" 
            :restaurant-name="restaurant?.name || ''" 
            v-for="dish in restaurantDishes" 
            :key="dish.id" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
