<template>
  <div class="page-orders">
    <div class="container">
      <h1>📦 Mes Commandes</h1>
      
      <div v-if="orderStore.orders.length === 0" class="no-orders">
        <p>Aucune commande pour le moment</p>
        <NuxtLink to="/restaurants" class="btn btn-primary">
          Découvrir les restaurants
        </NuxtLink>
      </div>
      
      <div v-else class="orders-list">
        <div v-for="order in orderStore.getAllOrders" :key="order.id" class="order-card">
          <div class="order-header">
            <h3>{{ order.date }}</h3>
            <span class="total-price">{{ order.total.toFixed(2) }}€</span>
          </div>
          
          <div class="order-items">
            <div v-for="item in order.items" :key="item.id" class="order-item">
              <img :src="item.image" :alt="item.name" class="item-image">
              <div class="item-details">
                <span class="item-name">{{ item.name }} <span v-if="item.quantity && item.quantity > 1" class="text-success">x{{ item.quantity }}</span></span>
                <span class="item-price">{{ item.price }}€</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Mes Commandes - UberEat',
  meta: [
    { name: 'description', content: 'Consultez l’historique de vos commandes sur UberEat.' },
    { property: 'og:title', content: 'Mes Commandes - UberEat' },
    { property: 'og:description', content: 'Consultez l’historique de vos commandes sur UberEat.' },
    { property: 'og:type', content: 'website' }
  ]
})
import { useOrderStore } from '~/stores/orders/orderStore'

const orderStore = useOrderStore()
</script>