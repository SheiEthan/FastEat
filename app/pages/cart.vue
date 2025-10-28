<template>
  <div class="cart-container">
    <div class="container-fluid">
      <h1 class="cart-title">{{ $t('your_cart') }}</h1>
      
      <!-- Panier vide -->
      <div v-if="cartListStore.dishes.length === 0" class="empty-cart">
        <div class="empty-cart-icon">🍽️</div>
        <h3>{{ $t('cart_empty') }}</h3>
        <p>{{ $t('add_dishes') }}</p>
        <NuxtLink to="/restaurants" class="btn btn-primary">
          {{ $t('discover_restaurants_btn') }}
        </NuxtLink>
      </div>

      <!-- Panier avec contenu -->
      <div v-else class="row">
        <!-- Colonne gauche: Plats groupés par restaurant -->
        <div class="col-lg-8">
          <div class="cart-items">
            <div 
              v-for="restaurant in restaurantGroups" 
              :key="restaurant.id" 
              class="restaurant-card"
            >
              <div class="restaurant-header">
                <h3>{{ restaurant.name }}</h3>
                <span class="dish-count">{{ restaurant.dishes.length }} {{ $t('dishes_count') }}</span>
              </div>
              
              <div class="dishes-list">
                <div 
                  v-for="dish in restaurant.dishes" 
                  :key="dish.id"
                  class="dish-item"
                >
                  <img :src="dish.image" :alt="dish.name" class="dish-image" />
                  <div class="dish-details">
                    <h4>{{ dish.name }}</h4>
                    <p class="dish-category">{{ dish.category }}</p>
                    <p class="dish-description">{{ dish.description }}</p>
                  </div>
                  <div class="dish-actions">
                    <span class="dish-price">{{ dish.price }}</span>
                    <div class="quantity-controls">
                      <button @click="decrementQuantity(dish)" aria-label="Diminuer la quantité" :disabled="(dish.quantity ?? 1) <= 1">−</button>
                      <span>{{ dish.quantity ?? 1 }}</span>
                      <button @click="incrementQuantity(dish)" aria-label="Augmenter la quantité">+</button>
                    </div>
                    <button @click="removeDish(dish)" class="btn-remove" aria-label="Retirer ce plat">
                      <i class="bi bi-trash" style="font-size: 1.5rem; color: #e74c3c;"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Colonne droite: Récapitulatif et checkout -->
        <div class="col-lg-4">
          <div class="checkout-card p-4">
            <h3>{{ $t('summary') }}</h3>
            
            <div class="order-summary">
              <div class="summary-line">
                <span>{{ $t('subtotal') }} ({{ totalItems }} {{ $t('dishes') }})</span>
                <span>{{ subtotal }}€</span>
              </div>
              <div class="summary-line">
                <span>{{ $t('delivery_fees') }}</span>
                <span>3.99€</span>
              </div>
              <div class="summary-line">
                <span>{{ $t('service_fees') }}</span>
                <span>1.50€</span>
              </div>
              <div class="summary-line total">
                <strong>
                  <span>{{ $t('total') }} </span>
                  <span>{{ totalPrice }}€</span>
                </strong>
              </div>
            </div>

            <button class="btn-checkout" @click="passOrder">
              {{ $t('place_order') }} - {{ totalPrice }}€
            </button>
            
            <div class="security-info">
              <small>{{ $t('secure_payment') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from 'nuxt/app'

useSeoMeta({
  title: 'Mon Panier - FastEat',
  description: 'Consultez et gérez votre panier avant de passer commande sur FastEat.',
  ogTitle: 'Mon Panier - FastEat',
  ogDescription: 'Consultez et gérez votre panier avant de passer commande sur FastEat.',
  ogType: 'website'
})


import { useCartListStore } from "~/stores/cart/cartListStore";
import { useOrderStore } from "~/stores/orders/orderStore";
import type { Dish } from "~/modules/dish/types";

const cartListStore = useCartListStore();
const orderStore = useOrderStore();

// Récupération des données des restaurants
const restaurants = await $fetch('/api/restaurants');

// Grouper les plats par restaurant
const restaurantGroups = computed(() => {
  const groups: Record<number, { id: number; name: string; dishes: Dish[] }> = {};
  
  cartListStore.dishes.forEach(dish => {
    const restaurant = restaurants.find((r: any) => r.id === dish.restaurantId);
    if (restaurant) {
      if (!groups[restaurant.id]) {
        groups[restaurant.id] = {
          id: restaurant.id,
          name: restaurant.name,
          dishes: []
        };
      }
      groups[restaurant.id]?.dishes.push(dish);
    }
  });
  
  return Object.values(groups);
});

// Calculs du panier
const totalItems = computed(() => cartListStore.dishes.reduce((sum, dish) => sum + (dish.quantity || 1), 0));

const subtotal = computed(() => {
  return cartListStore.dishes.reduce((sum, dish) => sum + dish.price * (dish.quantity || 1), 0).toFixed(2);
});

const totalPrice = computed(() => {
  const sub = parseFloat(subtotal.value);
  const delivery = 3.99;
  const service = 1.50;
  return (sub + delivery + service).toFixed(2);
});

// Actions
const removeDish = (dish: Dish) => {
  cartListStore.removeDish(dish);
};

const incrementQuantity = (dish: Dish) => {
  cartListStore.incrementQuantity(dish)
}
const decrementQuantity = (dish: Dish) => {
  cartListStore.decrementQuantity(dish)
}

const passOrder = () => {
  orderStore.placeOrder(cartListStore, parseFloat(totalPrice.value))
}
</script>

<style scoped>
</style>