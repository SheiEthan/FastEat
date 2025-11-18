<template>
  <div v-if="!authLoading">
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
            <NuxtLink to="/restaurants" class="mx-3"><i class="bi bi-house"></i> {{ t('restaurants') }}</NuxtLink>
            <NuxtLink to="/profil" class="mx-3"><i class="bi bi-person"></i> {{ t('profile') }}</NuxtLink>
            <NuxtLink to="/order" class="mx-3"><i class="bi bi-arrow-counterclockwise"></i> {{ t('orders') }}</NuxtLink>
            <!-- Sélecteur de langue -->
            <div class="mx-3">
              <label for="language-selector" class="visually-hidden">{{ t('select_language') }}</label>
              <select id="language-selector" :value="locale" @change="changeLocale" class="form-select form-select-sm lang-select" aria-label="Sélection de la langue">
                <option value="fr">🇫🇷 Français</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>
            <!-- Info utilisateur et déconnexion -->
            <div class="mx-3 user-info d-flex align-items-center">
              <button @click="logout" class="btn btn-outline-danger btn-sm">
                <i class="bi bi-box-arrow-right"></i> {{ t('logout') }}
              </button>
            </div>
          </div>
        </div>
    </div>
    </nav>
    <div class="main">
      <slot />
      <CartPopup />
    </div>
  </div>
  <div v-else class="auth-loading-guard">
    <div class="loading-spinner"></div>
  </div>
</template>

<script setup lang="ts">
import { useCartListStore } from '~/stores/cart/cartListStore'
import CartPopup from '~/components/CartPopup.vue'
import { useClientAuthStore } from '@/stores/user/clientAuthStore'
const cartStore = useCartListStore()
const clientAuth = useClientAuthStore()
const authLoading = ref(true)


onMounted(() => {
  if (typeof window !== 'undefined') {
    clientAuth.loadFromStorage()
    setTimeout(() => {
      authLoading.value = false
    }, 100)
  }
})

const logout = () => {
  clientAuth.logout()
  navigateTo('/auth')
}
import { useI18n } from '#i18n'
const { t, locale, setLocale } = useI18n()
const changeLocale = async (event: Event) => {
  const newLocale = (event.target as HTMLSelectElement).value as 'fr' | 'en'
  await setLocale(newLocale)
  document.cookie = `i18n_locale=${newLocale};path=/;max-age=31536000`
}
</script>

<style scoped>
.auth-loading-guard {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: #fff;
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
}
.loading-spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #764ba2;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
 </style>
/* Sélecteur de langue stylé */
.lang-select {
  min-width: 120px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background: #f8fafc;
  font-size: 0.95rem;
  padding: 0.2rem 0.7rem;
  margin-right: 0.5rem;
  outline: none;
  transition: border 0.2s;
}
.lang-select:focus {
  border-color: #764ba2;
}
