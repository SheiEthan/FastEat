import { defineNuxtRouteMiddleware, navigateTo, useNuxtApp } from '#imports'
import { useBoAuthStore } from '../stores/user/boAuthStore'

export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) return

  const boAuth = useBoAuthStore()
  boAuth.loadFromStorage()
  const user = boAuth.user

  // Redirection automatique si déjà connecté au BO
  if (to.path === '/bo' && user) {
    if (user.role === 'admin') return navigateTo('/bo/admin', { replace: true })
    if (user.role === 'restaurateur') return navigateTo('/bo/restaurateur', { replace: true })
  }

  // Protection des routes BO (hors /bo)
  if (to.path.startsWith('/bo/') && to.path !== '/bo') {
    if (!user) return navigateTo('/bo', { replace: true })
    if (to.path.startsWith('/bo/admin') && user.role !== 'admin') return navigateTo('/bo', { replace: true })
    if (to.path.startsWith('/bo/restaurateur') && user.role !== 'restaurateur') return navigateTo('/bo', { replace: true })
  }
})
