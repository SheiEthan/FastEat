import { useBoAuthStore } from '@/stores/user/boAuthStore'
import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const boAuth = useBoAuthStore()
  // Si la page est protégée BO et que l'utilisateur n'est pas authentifié, on redirige
  if ((to.path.startsWith('/bo/admin') || to.path.startsWith('/bo/restaurateur')) && !boAuth.isAuthenticated) {
    return navigateTo('/bo')
  }
  // Redirection automatique selon le rôle
  if (to.path === '/bo' && boAuth.isAuthenticated) {
    if (boAuth.user?.role === 'admin') return navigateTo('/bo/admin')
    if (boAuth.user?.role === 'restaurateur') return navigateTo('/bo/restaurateur')
  }
})
