<script setup lang="ts">
definePageMeta({
  title: 'Restaurants - UberEat',
  meta: [
    { name: 'description', content: 'Explorez une sélection de restaurants exceptionnels près de chez vous.' },
    { property: 'og:title', content: 'Restaurants - UberEat' },
    { property: 'og:description', content: 'Explorez une sélection de restaurants exceptionnels près de chez vous.' },
    { property: 'og:type', content: 'website' }
  ]
})
import { useRestaurantStore } from '~/stores/restaurant/restaurantStore'
const restaurantStore = useRestaurantStore()
const { data: restaurants } = await useAsyncData("restaurants", () => $fetch("/api/restaurants"))
restaurantStore.setRestaurants(restaurants.value || [])
const filteredRestaurants = computed(() => {
  if (!restaurantStore.searchQuery) return restaurantStore.restaurants
  return restaurantStore.restaurants.filter(r =>
    r.name.toLowerCase().includes(restaurantStore.searchQuery.toLowerCase())
  )
})
</script>

<template>
  <div class="page-restaurants-index">
    <!-- Header de la page -->
    <div class="restaurants-header">
      <div class="container">
        <div class="header-content">
          <h1>🍽️ Découvrez nos Restaurants</h1>
          <p>Explorez une sélection de restaurants exceptionnels près de chez vous</p>
          <div class="header-stats">
            <div class="stat-item">
              <span class="stat-number">{{ restaurantStore.restaurants.length }}</span>
              <span class="stat-label">Restaurants</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">25-35</span>
              <span class="stat-label">min de livraison</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">4.5</span>
              <span class="stat-label">⭐ Note moyenne</span>
            </div>
          </div>
          <input
            v-model="restaurantStore.searchQuery"
            type="text"
            class="form-control search-bar"
            placeholder="Rechercher un restaurant..."
          />
        </div>
      </div>
    </div>

    <!-- Section des restaurants -->
    <div class="restaurants-section">
      <div class="container">
  <div v-if="restaurantStore.restaurants.length === 0" class="no-restaurants">
          <div class="no-restaurants-icon">🏪</div>
          <h3>Aucun restaurant disponible</h3>
          <p>Nous ajoutons régulièrement de nouveaux restaurants à notre plateforme</p>
        </div>

        <div v-else class="row g-3">
          <RestaurantItem 
            :restaurant="restaurant" 
            v-for="restaurant in filteredRestaurants" 
            :key="restaurant.id"
            class="restaurant-card" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  max-width: 400px;
  margin: 2rem auto 1.5rem auto;
  display: block;
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(39, 174, 96, 0.08);
  border: 1.5px solid #e0e0e0;
  transition: border 0.2s;
}
.search-bar:focus {
  border: 1.5px solid #27ae60;
  outline: none;
}
</style>