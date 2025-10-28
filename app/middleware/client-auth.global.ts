import { defineNuxtRouteMiddleware, navigateTo } from '#imports'
import { useClientAuthStore } from '../stores/user/clientAuthStore'

export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) return

  const clientAuth = useClientAuthStore()
  clientAuth.loadFromStorage()
  const user = clientAuth.user

  // Redirection automatique si déjà connecté côté client
  if (to.path === '/auth' && user) {
    return navigateTo('/', { replace: true })
  }

  // Protection des pages client (hors /auth et /bo)
  if (!to.path.startsWith('/bo') && to.path !== '/auth') {
    if (!user) return navigateTo('/auth', { replace: true })
  }
})
