<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="auth-header">
        <h1>🍽️ FastEat</h1>
        <p>{{ $t('connect_to_order') }}</p>
      </div>

      <div class="auth-tabs">
        <button 
          @click="currentTab = 'login'" 
          :class="{ active: currentTab === 'login' }"
          class="tab-btn"
        >
          Connexion
        </button>
        <button 
          @click="currentTab = 'register'" 
          :class="{ active: currentTab === 'register' }"
          class="tab-btn"
        >
          Inscription
        </button>
      </div>
      <!-- Test -->
      <!-- Formulaire de connexion -->
      <div v-if="currentTab === 'login'" class="auth-form">
        <h2>Se connecter</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="loginForm.email"
              type="email"
              required
              class="form-control"
              placeholder="votre@email.com"
            />
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input
              id="password"
              v-model="loginForm.password"
              type="password"
              required
              class="form-control"
              placeholder="••••••••"
            />
          </div>
          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>
      </div>

      <!-- Formulaire d'inscription -->
      <div v-if="currentTab === 'register'" class="auth-form">
        <h2>S'inscrire</h2>
        <form @submit.prevent="handleRegister">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                id="firstName"
                v-model="registerForm.firstName"
                type="text"
                required
                class="form-control"
                placeholder="John"
              />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input
                id="lastName"
                v-model="registerForm.lastName"
                type="text"
                required
                class="form-control"
                placeholder="Doe"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="register-email">Email</label>
            <input
              id="register-email"
              v-model="registerForm.email"
              type="email"
              required
              class="form-control"
              placeholder="votre@email.com"
            />
          </div>
          <div class="form-group">
            <label for="register-password">Mot de passe</label>
            <input
              id="register-password"
              v-model="registerForm.password"
              type="password"
              required
              class="form-control"
              placeholder="••••••••"
            />
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirmer le mot de passe</label>
            <input
              id="confirm-password"
              v-model="registerForm.confirmPassword"
              type="password"
              required
              class="form-control"
              placeholder="••••••••"
            />
          </div>
          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Inscription...' : "S'inscrire" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentTab = ref('login')
const error = ref('')
const loading = ref(false)

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  
  try {
    // Appel API pour la connexion client
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: loginForm.value.email,
        password: loginForm.value.password
      }
    }) as { user: any; message: string }
    
    if (response.user) {
      // Sauvegarder l'utilisateur
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(response.user))
        
        // Définir le cookie d'authentification
        const authCookie = useCookie('auth', {
          default: () => '',
          httpOnly: false,
          secure: false,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30 // 30 jours
        })
        authCookie.value = JSON.stringify(response.user)
      }
      
      // Rediriger vers l'accueil
      await navigateTo('/')
    }
  } catch (e: any) {
    error.value = e.data?.message || 'Erreur de connexion'
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  error.value = ''
  loading.value = true

  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    error.value = 'Passwords do not match'
    loading.value = false
    return
  }

  try {
    // Appel API pour l'inscription client
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        firstName: registerForm.value.firstName,
        lastName: registerForm.value.lastName,
        email: registerForm.value.email,
        password: registerForm.value.password
      }
    }) as { user: any; message: string }
    
    if (response.user) {
      // Sauvegarder l'utilisateur
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(response.user))
        
        // Définir le cookie d'authentification
        const authCookie = useCookie('auth', {
          default: () => '',
          httpOnly: false,
          secure: false,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30 // 30 jours
        })
        authCookie.value = JSON.stringify(response.user)
      }
      
      // Rediriger vers l'accueil
      await navigateTo('/')
    }
  } catch (e: any) {
    error.value = e.data?.message || "Erreur lors de l'inscription"
  } finally {
    loading.value = false
  }
}

definePageMeta({ layout: false })
</script>

<style scoped>

</style>