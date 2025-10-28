import { useClientAuthStore } from '@/stores/user/clientAuthStore'
import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const clientAuth = useClientAuthStore()
  // Si la page est protégée client et que l'utilisateur n'est pas authentifié, on redirige
  if (!to.path.startsWith('/bo') && to.path !== '/auth' && !clientAuth.isAuthenticated) {
    return navigateTo('/auth')
  }
  // Redirection automatique si déjà connecté
  if (to.path === '/auth' && clientAuth.isAuthenticated) {
    return navigateTo('/')
  }
})
