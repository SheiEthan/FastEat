<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <div class="logo">
            <NuxtLink to="/restaurants" class="mx-3 cart-link"><img src="/logo.svg" alt="EatFast"></NuxtLink>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <div class="float-end d-flex align-items-center">
            <NuxtLink to="/restaurants" class="mx-3"><i class="bi bi-house"></i> Restaurants</NuxtLink>
            <NuxtLink to="/profil" class="mx-3"><i class="bi bi-person"></i> Mon Profil</NuxtLink>
            <NuxtLink to="/order" class="mx-3"><i class="bi bi-arrow-counterclockwise"></i> Mes Commandes</NuxtLink>
            <NuxtLink to="/cart" class="mx-3 cart-link">
              <i class="bi bi-cart"></i>
              <span v-if="cartStore.dishes.length > 0" class="cart-badge">{{ cartStore.dishes.length }}</span>
            </NuxtLink>
            
            <!-- Info utilisateur et déconnexion -->
            <div class="mx-3 user-info d-flex align-items-center">
              <button @click="logout" class="btn btn-outline-danger btn-sm">
                <i class="bi bi-box-arrow-right"></i> Déconnexion
              </button>
            </div>
          </div>
        </div>
    </div>
    </nav>
  <div class="main">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useCartListStore } from '~/stores/cart/cartListStore'

const cartStore = useCartListStore()
const user = ref<any>(null)

// Charger les infos utilisateur
onMounted(() => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user')
    if (userData) {
      user.value = JSON.parse(userData)
    }
  }
})

// Info utilisateur formatée
const userInfo = computed(() => {
  if (user.value) {
    return `${user.value.prenom} ${user.value.nom}`
  }
  return ''
})

// Fonction de déconnexion
const logout = () => {
  if (typeof window !== 'undefined') {
    // Supprimer les données du localStorage
    localStorage.removeItem('user')
    
    // Supprimer le cookie d'authentification
    const authCookie = useCookie('auth')
    authCookie.value = null
  }
  
  // Rediriger vers la page d'authentification
  navigateTo('/auth')
}
</script>
