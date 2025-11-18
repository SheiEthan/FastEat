<template>
  <div class="error-page">
    <div class="error-container">
      <h1>{{ error?.statusCode || 'Erreur' }}</h1>
      <p>{{ error?.statusMessage || 'Une erreur est survenue' }}</p>
      
      <div v-if="error?.statusCode === 401 || error?.statusCode === 403" class="auth-error">
        <p>Vous devez être connecté pour accéder à cette page.</p>
        <button @click="goToLogin" class="btn btn-primary">Se connecter</button>
      </div>
      
      <div v-else>
        <button @click="goHome" class="btn btn-secondary">Retour à l'accueil</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

interface ErrorProps {
  error: {
    statusCode?: number
    statusMessage?: string
  }
}

const props = defineProps<ErrorProps>()

const goToLogin = () => {
  navigateTo('/bo')
}

const goHome = () => {
  navigateTo('/')
}

// Redirection automatique pour les erreurs d'auth
onMounted(() => {
  if (props.error?.statusCode === 401 || props.error?.statusCode === 403) {
    setTimeout(() => {
      navigateTo('/bo')
    }, 2000)
  }
})
</script>

<style scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.error-container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  max-width: 400px;
}

.error-container h1 {
  color: #e74c3c;
  margin-bottom: 1rem;
  font-size: 3rem;
}

.error-container p {
  color: #666;
  margin-bottom: 1.5rem;
}

.auth-error {
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}
</style>