<template>
  <transition name="cart-popup-fade">
    <NuxtLink v-if="cartItems.length > 0" to="/cart" class="cart-fab">
      <i class="bi bi-cart"></i>
      <span class="cart-fab-badge">{{ totalCount }}</span>
    </NuxtLink>
  </transition>
</template>

<script setup lang="ts">
import { useCartListStore } from '~/stores/cart/cartListStore';
import { computed } from 'vue';
import type { CartDish } from '~/stores/cart/cartListStore';
const cartStore = useCartListStore();
const cartItems = computed<CartDish[]>(() => cartStore.dishes || []);
const totalCount = computed(() => cartItems.value.reduce((acc: number, item: CartDish) => acc + (item.quantity || 1), 0));
</script>

<style scoped>
.cart-fab {
  position: fixed;
  right: 1.2rem;
  bottom: 1.2rem;
  width: 54px;
  height: 54px;
  background: #27ae60;
  color: #fff;
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba(0,0,0,0.14);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background 0.2s;
}
.cart-fab:hover {
  background: #219150;
}
.cart-fab-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #219150;
  color: #fff;
  border-radius: 50%;
  padding: 1px 5px;
  font-size: 0.75rem;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
}
.cart-fab i {
  font-size: 1.25rem;
}
.cart-popup-fade-enter-active, .cart-popup-fade-leave-active {
  transition: opacity 0.3s;
}
.cart-popup-fade-enter-from, .cart-popup-fade-leave-to {
  opacity: 0;
}
</style>
