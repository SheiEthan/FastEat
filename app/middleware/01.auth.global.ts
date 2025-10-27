export default defineNuxtRouteMiddleware((to) => {
  // Vérifier côté client uniquement
  if (import.meta.client) {
    
    // === AUTHENTIFICATION BACK OFFICE ===
    const boUserData = localStorage.getItem('bo-user')
    
    // Si on va sur /bo et qu'on est déjà connecté au BO, rediriger vers la bonne page
    if (to.path === '/bo' && boUserData) {
      try {
        const user = JSON.parse(boUserData)
        
        // Rediriger selon le rôle
        if (user.role === 'admin') {
          return navigateTo('/bo/admin', { replace: true })
        }
        
        if (user.role === 'restaurateur') {
          return navigateTo('/bo/restaurateur', { replace: true })
        }
        
      } catch (e) {
        // Données corrompues, supprimer et rester sur /bo
        localStorage.removeItem('bo-user')
      }
    }
    
    // Vérifier les routes protégées du back office
    if (to.path.startsWith('/bo/') && to.path !== '/bo') {
      if (!boUserData) {
        // Pas connecté au BO, redirection vers la page de connexion BO
        return navigateTo('/bo', { replace: true })
      }
      
      try {
        const user = JSON.parse(boUserData)
        
        // Vérifier les permissions selon la route
        if (to.path.startsWith('/bo/admin') && user.role !== 'admin') {
          return navigateTo('/bo', { replace: true })
        }
        
        if (to.path.startsWith('/bo/restaurateur') && user.role !== 'restaurateur') {
          return navigateTo('/bo', { replace: true })
        }
        
      } catch (e) {
        // Données corrompues
        localStorage.removeItem('bo-user')
        return navigateTo('/bo', { replace: true })
      }
    }
    
    // === AUTHENTIFICATION CLIENT ===
    const clientUserData = localStorage.getItem('user')
    
    // Si on va sur /auth et qu'on est déjà connecté côté client, rediriger vers l'accueil
    if (to.path === '/auth' && clientUserData) {
      try {
        JSON.parse(clientUserData) // Vérifier que les données sont valides
        return navigateTo('/', { replace: true })
      } catch (e) {
        // Données corrompues, supprimer et rester sur /auth
        localStorage.removeItem('user')
      }
    }
    
    // Protéger toutes les pages sauf /auth et /bo/*
    if (!to.path.startsWith('/bo') && to.path !== '/auth') {
      if (!clientUserData) {
        // Pas connecté côté client, redirection vers la page d'authentification
        return navigateTo('/auth', { replace: true })
      }
      
      try {
        JSON.parse(clientUserData) // Vérifier que les données sont valides
      } catch (e) {
        // Données corrompues
        localStorage.removeItem('user')
        return navigateTo('/auth', { replace: true })
      }
    }
  }
})