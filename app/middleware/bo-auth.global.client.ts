import { defineNuxtRouteMiddleware, navigateTo } from '#imports'
import { useBoAuthStore } from '../stores/user/boAuthStore'

export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) return

  const boAuth = useBoAuthStore()
  boAuth.loadFromStorage()
  const user = boAuth.user

  // Redirection automatique si déjà connecté au BO
  if (to.path === '/bo' && user) {
    if (user.role === 'ADMIN') return navigateTo('/bo/admin', { replace: true })
    if (user.role === 'RESTAURANT') return navigateTo('/bo/restaurateur', { replace: true })
  }

  // Protection des routes BO (hors /bo)
  if (to.path.startsWith('/bo/') && to.path !== '/bo') {
    if (!user) return navigateTo('/bo', { replace: true })
    if (to.path.startsWith('/bo/admin') && user.role !== 'ADMIN') return navigateTo('/bo', { replace: true })
    if (to.path.startsWith('/bo/restaurateur') && user.role !== 'RESTAURANT') return navigateTo('/bo', { replace: true })
  }
})
